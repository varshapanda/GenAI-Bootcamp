const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameSessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
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
      timestamp: { type: Date, default: Date.now },
      ref: "Room",
    },
  ],
  currentRoom: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },

  gameEnding: { type: String, default: "continue" },

  conversationHistory: [
    {
      role: String,
      content: String,
      timestamp: Date,
      roomId: Schema.Types.ObjectId,
    },
  ],

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

  totalWrongChoices: {
    type: Number,
    default: 0,
  },
  inventory: {
    type: [
      {
        item_id: { type: String, required: true },
        item_name: { type: String, required: true },
        item_description: { type: String, required: true },
      },
    ],
    default: undefined,
  },
  summary: {
    escaped: { type: Boolean },
    summary_text: { type: String },
    rooms_completed: { type: Number },
    wrong_attempts: { type: Number },
    hints_used: { type: Number },
    time_taken_seconds: { type: Number },
    score: { type: Number },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GameSession", gameSessionSchema);
