// services/ai/initialRoom.js
const { callAI } = require("./aiBase.js");

function validateAIResponse(room) {
  if (
    !room.room_id ||
    !room.room_title ||
    !room.room_description ||
    !Array.isArray(room.options) ||
    room.options.length !== 4 ||
    !Array.isArray(room.inventory_items) ||
    !Array.isArray(room.hints) ||
    !room.metadata ||
    typeof room.metadata.expected_time_seconds !== "number"
  ) {
    throw new Error("Invalid AI room structure");
  }

  const allowedEffects = [
    "advance",
    "delay",
    "trap",
    "reveal_item",
    "reveal_clue",
    "nothing",
  ];
  for (let o of room.options) {
    if (!allowedEffects.includes(o.effect)) {
      throw new Error(`Invalid option effect: ${o.effect}`);
    }
  }

  return true;
}

const generateInitialRoom = async ({
  theme,
  difficulty,
  numRoomsGoal,
  hintMode,
  storyPlan,
}) => {
  const prompt = `
 SYSTEM:
You are a strict JSON generator for a text-based MCQ escape room game.
You must output EXACTLY one valid JSON object following the schema below.
Do not include any comments, explanations, or extra text.

SCHEMA (every key and value must follow these exact types):

{
  "room_id": "string",
  "room_title": "string",
  "room_description": "string",
  "options": [
    {
      "id": "o1" | "o2" | "o3" | "o4",
      "effect": "advance" | "delay" | "trap" | "reveal_item" | "reveal_clue" | "nothing",
      "text": "string",
      "is_correct": "boolean"
    },
    { 3 more option objects exactly like above }
  ],
  "inventory_items": [
    {
      "item_id": "string",
      "item_name": "string",
      "item_description": "string"
    }
  ] | [],
  "hints": ["string"],
  "end_condition": "continue" | "escaped" | "failed",
  "metadata": {
    "expected_time_seconds": number
  },
  "inventory_changes": {
    "added": [
      {
        "item_id": "string",
        "item_name": "string",
        "item_description": "string"
      }
    ] | [],
    "removed": [
      {
        "item_id": "string",
        "item_name": "string",
        "item_description": "string"
      }
    ] | []
  },
  "result_message": "string"
}

REQUIREMENTS:
- Return strictly valid JSON.
- Exactly 4 options with IDs o1, o2, o3, o4.
- Only ONE option should have "effect": "advance" and "is_correct": true.
- All others must have realistic outcomes.
- "inventory_items", "inventory_changes.added", and "inventory_changes.removed" may be empty arrays or omitted entirely.
- Include at least 1 short hint.
- "metadata.expected_time_seconds" must be a number (not string).
- "end_condition" is one of "continue", "escaped", or "failed".
- "result_message" gives a one-line summary of what happened.
- "player_choice" should be null or one of o1-o4 if known.
- No text outside of JSON.

USER:
Start the escape room adventure using this story outline:
${JSON.stringify(storyPlan, null, 2)}

Generate the first room (index 0) only.
Make sure the story aligns with the first goal and summary.
Keep all text brief and engaging.

Game preferences:
theme: ${theme}
difficulty: ${difficulty}
mode: "mcq"
num_rooms_goal: ${numRoomsGoal}
hint_mode: ${hintMode}

Now return only one JSON object adhering to all constraints.
`;

  const aiResponse = await callAI(prompt);

  try {
    validateAIResponse(aiResponse);
    return aiResponse;
  } catch (error) {
    console.error("AI response validation error:", error.message);
    throw new Error("Failed to generate valid initial room");
  }
};

module.exports = { generateInitialRoom };
