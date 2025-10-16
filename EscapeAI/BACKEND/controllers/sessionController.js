const GameSession = require("../models/GameSession.js");
const Room = require("../models/Room.js");
const User = require("../models/User.js");

// Create new game session
const createGameSession = async (req, res) => {
  try {
    const { difficulty, theme, roomType, numberOfRooms } = req.body;
    const userId = req.user.id;

    if (!difficulty || !theme || !roomType || !numberOfRooms) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newGameSession = new GameSession({
      userId,
      gameId: `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      difficulty,
      theme,
      roomType,
      numberOfRooms,
    });

    const savedSession = await newGameSession.save();

    await User.findByIdAndUpdate(userId, {
      $push: { gameHistory: savedSession._id },
    });

    res.status(201).json({
      success: true,
      gameSessionId: savedSession._id,
      gameId: savedSession.gameId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Start game session
const startGameSession = async (req, res) => {
  try {
    const { gameSessionId } = req.body;
    const userId = req.user.id;

    const gameSession = await GameSession.findById(gameSessionId).populate(
      "rooms"
    );

    if (!gameSession) {
      return res.status(404).json({ error: "Game session not found" });
    }

    if (gameSession.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (gameSession.status !== "active") {
      return res.status(400).json({ error: "Game not in active status" });
    }

    // Set startTime when game actually starts
    gameSession.startTime = new Date();

    // Set enteredAt for first room
    const firstRoom = gameSession.rooms[0];
    firstRoom.enteredAt = new Date();

    await firstRoom.save();
    await gameSession.save();

    res.json({
      success: true,
      gameSessionId: gameSession._id,
      story: gameSession.storyIntro,
      firstRoom: {
        id: firstRoom._id,
        name: firstRoom.roomName,
        description: firstRoom.description,
        puzzle: firstRoom.puzzle.question,
        options: firstRoom.puzzle.options,
        roomNumber: firstRoom.roomNumber,
        totalRooms: gameSession.numberOfRooms,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current session
const getCurrentSession = async (req, res) => {
  try {
    const { gameSessionId } = req.params;
    const userId = req.user.id;

    const gameSession = await GameSession.findById(gameSessionId).populate(
      "rooms"
    );

    if (!gameSession) {
      return res.status(404).json({ error: "Game session not found" });
    }

    if (gameSession.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const currentRoom = gameSession.rooms[gameSession.currentRoomIndex];

    res.json({
      success: true,
      session: {
        id: gameSession._id,
        gameId: gameSession.gameId,
        status: gameSession.status,
        difficulty: gameSession.difficulty,
        theme: gameSession.theme,
        currentRoomIndex: gameSession.currentRoomIndex,
        totalRooms: gameSession.numberOfRooms,
        puzzlesSolved: gameSession.totalPuzzlesSolved,
        hintsUsed: gameSession.totalHintsUsed,
        performanceScore: gameSession.playerPerformanceScore,
      },
      currentRoom: {
        id: currentRoom._id,
        name: currentRoom.roomName,
        description: currentRoom.description,
        puzzle: currentRoom.puzzle.question,
        options: currentRoom.puzzle.options,
        roomNumber: currentRoom.roomNumber,
        attemptCount: currentRoom.playerAttempts.length,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// End game session
const endGameSession = async (req, res) => {
  try {
    const { gameSessionId, isCompleted } = req.body;
    const userId = req.user.id;

    const gameSession = await GameSession.findById(gameSessionId).populate(
      "rooms"
    );

    if (!gameSession || gameSession.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Calculate time for last room
    const lastRoom = gameSession.rooms[gameSession.currentRoomIndex];
    if (lastRoom && lastRoom.enteredAt) {
      const timeInRoom = Math.floor((new Date() - lastRoom.enteredAt) / 1000);
      lastRoom.timeSpentInRoom = timeInRoom;
      await lastRoom.save();
    }

    gameSession.status = isCompleted ? "completed" : "abandoned";
    gameSession.endTime = new Date();
    gameSession.totalTimeTaken = Math.floor(
      (gameSession.endTime - gameSession.startTime) / 1000
    );

    if (isCompleted) {
      gameSession.playerPerformanceScore = 100;
    }

    await gameSession.save();

    res.json({
      success: true,
      message: `Game ${isCompleted ? "completed" : "abandoned"}`,
      stats: {
        totalTime: gameSession.totalTimeTaken,
        puzzlesSolved: gameSession.totalPuzzlesSolved,
        totalPuzzles: gameSession.numberOfRooms,
        hintsUsed: gameSession.totalHintsUsed,
        performanceScore: gameSession.playerPerformanceScore,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all user sessions
const getAllUserSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "gameHistory",
      select:
        "gameId difficulty theme status totalTimeTaken totalPuzzlesSolved numberOfRooms totalHintsUsed createdAt",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const formattedSessions = user.gameHistory.map((session) => ({
      id: session._id,
      gameId: session.gameId,
      difficulty: session.difficulty,
      theme: session.theme,
      status: session.status,
      totalTime: session.totalTimeTaken,
      puzzlesSolved: session.totalPuzzlesSolved,
      totalPuzzles: session.numberOfRooms,
      hintsUsed: session.totalHintsUsed,
      createdAt: session.createdAt,
    }));

    res.json({
      success: true,
      totalGames: formattedSessions.length,
      sessions: formattedSessions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGameSession,
  startGameSession,
  getCurrentSession,
  endGameSession,
  getAllUserSessions,
};
