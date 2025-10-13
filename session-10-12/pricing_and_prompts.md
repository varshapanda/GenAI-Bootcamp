# Pricing and Prompts

## A. Pricing Research
- **Date of research:** 2025-10-13  
- **Sources checked:**  
  - [https://ai.google.dev/pricing](https://ai.google.dev/pricing)  
  - Google Cloud Vertex AI documentation (Gemini models)  

### Pricing Summary

| Model | Billing Unit | Input Cost (per 1M tokens) | Output Cost (per 1M tokens) | Notes |
|--------|---------------|-----------------------------|------------------------------|--------|
| **Gemini 1.5 Pro** | per 1M tokens | $3.50 | $10.50 | Best for reasoning-heavy tasks |
| **Gemini 1.5 Flash** | per 1M tokens | $0.35 | $1.05 | Fast and cost-efficient for chat or generation tasks |
| **Gemini 1.5 Flash (Free Tier)** | - | Free up to limited usage | - | Available on Google AI Studio for testing |

**Key Takeaways:**  
- Pricing is based on **tokens**, not per message.  
- “Input” = your prompt tokens; “Output” = model’s response tokens.  
- Gemini 1.5 Flash is **around 10× cheaper** than Pro, while maintaining good performance for most hackathon tasks.

**Recommendation:**  
> Our team will use **Gemini 1.5 Flash** since it offers the best balance of speed, quality, and affordability for our hackathon project.

---

## B. Cost Estimation Examples

### Example 1 — Small Prompt
**Assumption:** 1,000 input tokens + 500 output tokens  
- Input cost = (1,000 / 1,000,000) × $0.35 = **$0.00035**  
- Output cost = (500 / 1,000,000) × $1.05 = **$0.000525**  
**→ Total = $0.000875 per request**

---

### Example 2 — Larger Prompt
**Assumption:** 3,000 input tokens + 1,000 output tokens  
- Input cost = (3,000 / 1,000,000) × $0.35 = **$0.00105**  
- Output cost = (1,000 / 1,000,000) × $1.05 = **$0.00105**  
**→ Total = $0.0021 per request**

If our project makes ~1,000 such calls during the hackathon,  
**total estimated cost ≈ $2.10**, which is highly affordable.

---

## C. Prompt Refinement — Before / After (RTFC)

Each member refined one unclear prompt related to our hackathon project *EscapeAI – The Dynamic AI-Powered Escape Room.*

---

### Varsha
**Before:**  
> Write a description for our EscapeAI game.

**After (RTFC applied):**  
> **Role:** Act as a game design expert.  
> **Task:** Write a short, engaging description for our EscapeAI game to attract players.  
> **Format:** 3 bullet points with bold titles.  
> **Constraint:** Under 100 words, fun yet professional tone.

**Notes:**  
RTFC helped generate a more polished and promotional-style output suitable for project showcasing.

---

### Nidhish
**Before:**  
> Suggest puzzles for the project.

**After (RTFC applied):**  
> **Role:** Act as a game logic designer.  
> **Task:** Suggest 3 innovative puzzles that involve logic or pattern recognition.  
> **Format:** Bullet list with puzzle name + one-line concept.  
> **Constraint:** Solvable in under 5 minutes.

**Notes:**  
The refined prompt produced concise, creative, and playable puzzle concepts.

---

### Shravya
**Before:**  
> Generate clues for the escape room.

**After (RTFC applied):**  
> **Role:** Act as a puzzle designer.  
> **Task:** Generate 5 creative clues for an AI-themed escape room.  
> **Format:** Numbered list.  
> **Constraint:** Clues should increase in difficulty and mix logic + pattern recognition.

**Notes:**  
Adding a defined role and structure improved clarity and creativity in the responses.

---

### Yash
**Before:**  
> Make a question for players.

**After (RTFC applied):**  
> **Role:** Act as a quiz master for an AI-themed escape room.  
> **Task:** Create one multiple-choice question about AI basics.  
> **Format:** 1 question + 4 options (mark the correct one).  
> **Constraint:** Use simple language, suitable for beginners.

**Notes:**  
The refined prompt produced clear, ready-to-use quiz questions.

---

### Karthik
**Before:**  
> Give ideas for the escape room theme.

**After (RTFC applied):**  
> **Role:** Act as a creative director.  
> **Task:** Suggest 3 unique AI-based escape room themes.  
> **Format:** Numbered list with 1–2 sentence descriptions.  
> **Constraint:** Blend technology and mystery elements.

**Notes:**  
Specifying tone and format generated more interesting and on-theme ideas.

---

## D. Reflection

Through this activity, our team learned:

- How **token-based pricing** affects total LLM cost.  
- The difference between **input** and **output tokens**, and how prompt size impacts cost.  
- The value of **choosing the right model (Gemini 1.5 Flash)** for cost-effective experimentation.  
- Applying **RTFC (Role, Task, Format, Constraint)** made our prompts structured, precise, and reduced token waste.  
- Testing before/after prompts in **Google AI Studio** showed clear improvement in quality and consistency.  

We will continue to use **RTFC prompting** and **cost estimation** as part of our workflow for *EscapeAI* to ensure efficient, high-quality AI interactions.

---

**Team Members:**  
Varsha Vijayashwini Panda |  Nidhish Agarwal |  S. Shravya | Yash Kanwar | Karthik Patel 

**Project:** *EscapeAI – The Dynamic AI-Powered Escape Room*
