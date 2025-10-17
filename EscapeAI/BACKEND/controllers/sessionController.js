const GameSession = require("../models/GameSession.js");
const Room = require("../models/Room.js");
const User = require("../models/User.js");

// Get all user sessions
const getAllUserSessions = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "gameHistory",
      select:
        "difficulty theme status totalTimeTaken totalHintsUsed totalWrongChoices numberOfRooms createdAt gameEnding rooms",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const formattedSessions = user.gameHistory.map((session) => ({
      id: session._id,
      difficulty: session.difficulty,
      theme: session.theme,
      status: session.status,
      totalTime: session.totalTimeTaken,
      roomsCompleted: session.rooms?.length || 0,
      totalRooms: session.numberOfRooms,
      hintsUsed: session.totalHintsUsed,
      wrongChoices: session.totalWrongChoices,
      gameEnding: session.gameEnding,
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

// Get single session details
const getSessionDetails = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const session = await GameSession.findById(sessionId).populate("rooms");

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json({
      success: true,
      session: {
        id: session._id,
        difficulty: session.difficulty,
        theme: session.theme,
        status: session.status,
        totalTime: session.totalTimeTaken,
        roomsCompleted: session.rooms?.length || 0,
        totalRooms: session.numberOfRooms,
        hintsUsed: session.totalHintsUsed,
        wrongChoices: session.totalWrongChoices,
        gameEnding: session.gameEnding,
        summary: session.summary,
        createdAt: session.createdAt,
        startTime: session.startTime,
        endTime: session.endTime,
        conversationHistory: session.conversationHistory,
        inventory: session.inventory,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserSessions,
  getSessionDetails,
};