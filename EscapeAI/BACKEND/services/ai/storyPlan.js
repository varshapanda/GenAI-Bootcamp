const { callAI } = require("./aiBase.js");

const generateStoryPlan = async ({
  theme,
  difficulty,
  numRoomsGoal,
  roomType,
}) => {
  const prompt = `
SYSTEM:
You are a strict JSON generator that outputs a high-level story outline for an MCQ escape room game.
You must output ONLY one valid JSON array. No extra text.

SCHEMA:
[
  {
    "room_id": "string",
    "goal": "string",
    "summary": "string"
  },
  ...
]

REQUIREMENTS:
- Create between 4 and 5 rooms total (numRoomsGoal is a hint, not strict).
- Each room should have a short goal and summary, describing what happens or needs to be solved.
- The last room must represent either an escape or failure outcome.
- Keep the story coherent and thematically consistent.
- Return only the JSON array.

USER:
Create a concise story plan for an MCQ escape room game.

Theme: ${theme}
Difficulty: ${difficulty}
Number of rooms goal: ${numRoomsGoal}
Room type: ${roomType}
`;

  return await callAI(prompt);
};

module.exports = { generateStoryPlan };
