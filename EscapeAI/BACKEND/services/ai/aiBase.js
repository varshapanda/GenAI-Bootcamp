const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const callAI = async (prompt, options = {}) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // parse JSON strictly
    const rawResponse = response.text;
    const cleanedResponse = rawResponse
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();
    const data = JSON.parse(cleanedResponse);
    console.log("AI response:", data);
    return data;
  } catch (err) {
    console.error("AI call error:", err);
    throw new Error("AI service failed");
  }
};

module.exports = { callAI };
