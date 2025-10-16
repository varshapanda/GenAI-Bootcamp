const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  gameSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameSession",
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  roomName: String,
  description: String,
  puzzle: {
    question: String,
    options: [String],
    correctAnswer: String,
    hint: String,
    generatedAt: Date,
  },
  playerAttempts: [
    {
      attemptNumber: Number,
      playerAnswer: String,
      isCorrect: Boolean,
      timestamp: Date,
      timeTakenSeconds: Number,
    },
  ],
  hintsRequested: {
    type: Number,
    default: 0,
  },
  hintsHistory: [
    {
      hintNumber: Number,
      hintText: String,
      requestedAt: Date,
      aiReasoning: String,
    },
  ],
  isSolved: {
    type: Boolean,
    default: false,
  },
  solvedAt: Date,
  // NEW: Time when player ENTERED this room
  enteredAt: Date,
  // NEW: Total time spent in this room (in seconds)
  timeSpentInRoom: {
    type: Number,
    default: 0,
  },
  totalAttempts: {
    type: Number,
    default: 0,
  },
  estimatedDifficulty: {
    type: Number,
    default: 1,
  },
  playerStruggleLevel: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
