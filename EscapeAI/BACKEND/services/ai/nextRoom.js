const { callAI } = require("./aiBase.js");

const generateNextRoom = async ({ sessionState, chosenOptionId }) => {
  const prompt = `
  SYSTEM: You are a JSON-only interactive game author. Return exactly valid JSON with the fields required. No extra text.
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


Rules:
- Follow the predefined story plan to stay coherent.
- The game must end by room #${sessionState.numberOfRooms}.
- If this is the last planned room, set "end_condition" to "escaped" or "failed".
- If player went off track, you may generate one bonus room (max ${
    sessionState.numberOfRooms + 1
  } total).
- Interpret the player's choice and determine immediate result.
- Only set "end_condition" to "escaped" or "failed" if the player's latest chosen option leads directly to that outcome.
- If the current room contains such options but the player hasn't chosen them yet, keep "end_condition": "continue".
- If the chosen option reveals an item, include that in inventory_changes.added.
- If the choice triggers a trap or wrong attempt, increment wrong_attempts implicitly (backend will add 1).
- Return the next room JSON with the exact same schema as Initial Room Generator.
- Also include fields: inventory_changes (added/removed), result_message (one-sentence), and end_condition.
- Use branching: the next room's description must reflect the chosen option's effect so story remains coherent.
- Keep options to 4 again. If this choice should end the game (escaped/failed), set end_condition accordingly and provide a final short result_message.
- If the room represents a final escape or fail outcome, you may include no options at all — in that case, set options: []

Constraints:
- Keep outputs deterministic (temperature low).


USER:
Continue the MCQ escape-room story based on the following current game state and the player's chosen option.

Game state (JSON):
{  Story plan: ${JSON.stringify(sessionState.storyPlan, null, 2)},
  Current room index: ${sessionState.currentRoomIndex}
"theme": "${sessionState.theme}",
  "difficulty": "${sessionState.difficulty}",
  "current_room"${
    sessionState.currentRoom
      ? `: ${JSON.stringify(sessionState.currentRoom)}`
      : ": null"
  },
  "inventory": [${(sessionState.inventory || [])
    .map((i) => JSON.stringify(i))
    .join(",")}],
  "rooms_history": [ ${(sessionState.rooms || [])
    .map((r) => JSON.stringify(r))
    .join(",")}],
  "stats": { "hints_used": ${sessionState.totalHintsUsed}, "wrong_attempts": ${
    sessionState.totalWrongChoices
  }, "time_elapsed_seconds": ${sessionState.totalTimeTaken || 0} }
}

Player choice: "${chosenOptionId}" 

Now produce the JSON result.

`;

  return await callAI(prompt);
};

module.exports = { generateNextRoom };
