const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_title: { type: String, required: true },
  room_description: { type: String, required: true },
  options: [
    {
      id: { type: String, required: true },
      effect: { type: String, required: true },
      text: { type: String, required: true },
      is_correct: { type: Boolean, required: true },
    },
  ],
  // Optional inventory_items, but if present, all fields required
  inventory_items: {
    type: [
      {
        item_id: { type: String, required: true },
        item_name: { type: String, required: true },
        item_description: { type: String, required: true },
      },
    ],
    default: undefined, // makes the array optional
  },
  hints: [String],
  end_condition: { type: String, required: true },
  metadata: {
    expected_time_seconds: Number,
  },
  // inventory_changes optional
  inventory_changes: {
    added: {
      type: [
        {
          item_id: { type: String, required: true },
          item_name: { type: String, required: true },
          item_description: { type: String, required: true },
        },
      ],
      default: undefined, // makes it optional
    },
    removed: {
      type: [
        {
          item_id: { type: String, required: true },
          item_name: { type: String, required: true },
          item_description: { type: String, required: true },
        },
      ],
      default: undefined, // makes it optional
    },
  },
  result_message: String,
  player_choice: { type: String, enum: ["o1", "o2", "o3", "o4"] },
});

module.exports = mongoose.model("Room", roomSchema);
