// services/ai/initialRoom.js
const { callAI } = require("./aiBase.js");

const generateSummary = async ({ sessionState }) => {
  const prompt = `
 SYSTEM: Return exactly JSON matching the final summary schema. No extra text.

USER:
Summarize the player's run using the provided session history.

Input:
{ "rooms_history": [${sessionState.rooms} ], "inventory": [${sessionState.inventory} ], "stats": { "hints_used": ${sessionState.totalHintsUsed}, "wrong_attempts": ${sessionState.totalWrongChoices}, "time_taken_seconds": ${sessionState.totalTimeTaken} } }

Rules:
- Provide escaped: true/false, summary_text (one paragraph), rooms_completed, wrong_attempts, hints_used, time_taken_seconds, score.
- Score formula guidance: base = rooms_completed * 100; subtract 20 per wrong attempt and 10 per hint; subtract floor(time_taken_seconds/60)*5.
Return JSON only.

`;

  const aiSummary = await callAI(prompt);

  // Validate structure

  if (
    !aiSummary ||
    typeof aiSummary.escaped !== "boolean" ||
    !aiSummary.summary_text ||
    typeof aiSummary.rooms_completed !== "number" ||
    typeof aiSummary.wrong_attempts !== "number" ||
    typeof aiSummary.hints_used !== "number" ||
    typeof aiSummary.time_taken_seconds !== "number" ||
    typeof aiSummary.score !== "number"
  ) {
    throw new Error("Invalid AI summary structure");
  } else {
    return aiSummary;
  }
};

module.exports = { generateSummary };
