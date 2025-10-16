const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameId: {
    type: String,
    unique: true,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Hard"],
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  currentRoomIndex: {
    type: Number,
    default: 0,
  },
  storyIntro: String,
  currentNarrative: String,
  gameEnding: String,

  conversationHistory: [
    {
      role: String,
      content: String,
      timestamp: Date,
      roomId: Schema.Types.ObjectId,
    },
  ],

  adaptiveDifficulty: {
    type: Number,
    default: 1,
  },
  playerPerformanceScore: {
    type: Number,
    default: 50,
  },

  status: {
    type: String,
    enum: ["active", "completed", "abandoned"],
    default: "active",
  },

  // FIXED: Removed default, set only when game ACTUALLY starts
  startTime: Date,

  endTime: Date,
  totalTimeTaken: Number,

  totalHintsUsed: {
    type: Number,
    default: 0,
  },

  totalPuzzlesSolved: {
    type: Number,
    default: 0,
  },

  totalAttempts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GameSession", gameSessionSchema);
