const mongoose = require("mongoose");
const GameSession = require("../models/GameSession");
const Room = require("../models/Room");
const { generateInitialRoom } = require("../services/ai/initialRoom");
const { generateNextRoom } = require("../services/ai/nextRoom");
const { generateSummary } = require("../services/ai/summary");

const startGame = async (req, res) => {
  try {
    const { difficulty, theme, roomType, numberOfRooms } = req.body;
    const userId = req.userId;

    // Basic validation
    if (!difficulty || !theme || !roomType || !numberOfRooms) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Step 1: Call AI to generate initial room
    const aiRoom = await generateInitialRoom({
      theme,
      difficulty,
      numRoomsGoal: numberOfRooms,
      hintMode: true, // optional, can be dynamic
    });

    // Step 2: Creat a new room
    if (!aiRoom) {
      return res
        .status(500)
        .json({ error: "AI failed to generate a valid room" });
    }

    // console.log(aiRoom);

    const newRoom = new Room(aiRoom);

    // Step 3: Create new game session
    const newSession = new GameSession({
      userId,
      difficulty,
      theme,
      roomType,
      numberOfRooms,
      rooms: [],
      currentRoom: newRoom._id,
      conversationHistory: [
        {
          role: "system",
          content: "Game started",
          timestamp: new Date(),
          roomId: null,
        },
      ],
      startTime: new Date(),
      inventory: aiRoom.inventory_items || [],
    });
    await newRoom.save();
    await newSession.save();

    // Step 4: Return initial room to frontend
    return res.status(200).json({
      sessionId: newSession._id,
      room: aiRoom,
      roomType: roomType,
      theme: theme,
    });
  } catch (err) {
    console.error("Start game error:", err);
    return res.status(500).json({ error: "Failed to start new game" });
  }
};

const chooseOption = async (req, res) => {
  try {
    const { sessionId, selectedOptionId, timeTaken, hintUsed } = req.body;
    const userId = req.userId; // assuming auth middleware

    if (!sessionId || !selectedOptionId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Step 1: Fetch session
    const session = await GameSession.findOne({
      _id: sessionId,
      userId,
    }).populate("currentRoom rooms");
    if (!session) return res.status(404).json({ error: "Session not found" });

    if (session.status !== "active") {
      return res
        .status(400)
        .json({ error: "Game is already completed or abandoned" });
    }

    const currentRoom = session.currentRoom;
    if (!currentRoom) {
      return res.status(500).json({ error: "Current room data missing" });
    }

    // Step 2: Find the selected option
    const selectedOption = currentRoom.options.find(
      (o) => o.id === selectedOptionId
    );
    if (!selectedOption) {
      return res.status(400).json({ error: "Selected option invalid" });
    }

    // Step 3: Update stats
    if (selectedOption.is_correct === false) {
      session.totalWrongChoices += 1;
    }

    if (hintUsed) {
      session.totalHintsUsed += 1;
    }

    if (typeof timeTaken === "number") {
      session.totalTimeTaken = (session.totalTimeTaken || 0) + timeTaken;
    }

    await session.save();

    // Step 7: Call AI to generate next room
    const nextRoom = await generateNextRoom({
      sessionState: session, // you can serialize minimal session for AI prompt
      chosenOptionId: selectedOptionId,
    });

    const newRoom = new Room(nextRoom);
    await newRoom.save();

    // Step 4: Update inventory if needed
    if (nextRoom?.inventory_changes?.added) {
      for (let item of nextRoom?.inventory_changes?.added) {
        if (!session.inventory.find((i) => i.item_id === item.item_id)) {
          session.inventory.push(item);
        }
      }
    }
    if (nextRoom?.inventory_changes?.removed) {
      for (let item of nextRoom?.inventory_changes?.removed) {
        const index = session.inventory.findIndex(
          (i) => i.item_id === item.item_id
        );
        if (index !== -1) {
          session.inventory.splice(index, 1);
        }
      }
    }

    // Step 5: Save current room to history before moving to next
    session.conversationHistory.push({
      role: "player",
      content: selectedOption.text,
      timestamp: new Date(),
      roomId: currentRoom.room_id,
    });
    session.rooms = session.rooms || [];
    session.rooms.push(currentRoom._id);

    // Step 6: Check if the game ends
    if (
      nextRoom.end_condition === "escaped" ||
      nextRoom.end_condition === "failed"
    ) {
      session.status = "completed";
      session.summary.escaped = nextRoom.end_condition === "escaped";
      session.gameEnding = nextRoom.end_condition;
      session.endTime = new Date();
    }

    // Step 8: Update session with new current room
    session.currentRoom = newRoom._id;
    await session.save();

    // Step 9: Return next room to frontend
    return res.status(200).json({
      sessionId: session._id,
      inventory: session.inventory,
      room: nextRoom,
      stats: {
        totalWrongChoices: session.totalWrongChoices,
        totalHintsUsed: session.totalHintsUsed,
        totalTimeTaken: session.totalTimeTaken,
      },
      gameEnding: session.gameEnding,
      roomType: session.roomType,
      theme: session.theme,
    });
  } catch (err) {
    console.error("Choose option error:", err);
    return res.status(500).json({ error: "Failed to process user choice" });
  }
};

const getGameSummary = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.userId;

    if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: "Invalid sessionId format" });
    }

    const session = await GameSession.findOne({ _id: sessionId, userId })
      .populate("rooms")
      .populate("currentRoom");

    if (!session) return res.status(404).json({ error: "Session not found" });
    if (session.status !== "completed")
      return res.status(400).json({ error: "Game is not yet completed" });

    if (!session.summary || !session.summary.summary_text) {
      const sessionState = {
        rooms: session.rooms.map((room) => room.room_id || room._id),
        inventory: session.inventory || [],
        totalHintsUsed: session.totalHintsUsed || 0,
        totalWrongChoices: session.totalWrongChoices || 0,
        totalTimeTaken: session.totalTimeTaken || 0,
      };

      const aiSummary = await generateSummary({ sessionState });

      // Save summary in session
      session.summary = {
        escaped: session.summary?.escaped || false,
        summary_text: aiSummary.summary_text,
        rooms_completed: aiSummary.rooms_completed,
        wrong_attempts: aiSummary.wrong_attempts,
        hints_used: aiSummary.hints_used,
        time_taken_seconds: aiSummary.time_taken_seconds,
        score: aiSummary.score,
      };
      session.summaryGeneratedAt = new Date();

      await session.save();
    }

    return res.status(200).json({
      sessionId: session._id,
      summary: session.summary,
    });
  } catch (err) {
    console.error("Get summary error:", err);
    return res.status(500).json({ error: "Failed to generate game summary" });
  }
};

const getCurrentSession = async (req, res) => {
  try {
    const userId = req.userId;

    const session = await GameSession.findOne({ userId })
      .sort({ createdAt: -1 }) // sort by newest first
      .populate("currentRoom");

    if (!session) return res.status(404).json({ error: "Session not found" });

    return res.status(200).json({
      sessionId: session._id,
      currentRoom: session.currentRoom,
      inventory: session.inventory,
      status: session.status,
      roomType: session.roomType,
      theme: session.theme,
    });
  } catch (err) {
    console.error("Get current session error:", err);
    return res
      .status(500)
      .json({ error: "Failed to retrieve current session" });
  }
};

module.exports = {
  startGame,
  chooseOption,
  getGameSummary,
  getCurrentSession,
};
