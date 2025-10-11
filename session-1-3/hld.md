
# High-Level Design (HLD) Document

## 1. Project Title
****EscapeAI** – The Dynamic AI-Powered Escape Room**

---

## 2. Team Members
- Nidhish Agarwal
- Varsha Vijayashwini Panda
- S Shravya 
- Yash Kanwar
- Karthik Patel 

---

## 3. Problem Statement
Traditional escape rooms are static, with fixed puzzles and narratives. Players often experience repetitive challenges with no adaptive assistance. There is no personalization based on skill, progress, or interaction patterns. EscapeAI solves this by creating a **dynamic, AI-powered escape room** where puzzles, storyline, and hints adapt in real-time based on player interactions, memory, and progress.  

---

## 4. Core Components

### 4.1 User Interface (UI)
- Text-based interface for player interaction (optional: visuals for room maps, items, or mini-puzzles).  
- Input handling for player commands (`look`, `pick up`, `use`, `solve puzzle`).  
- Output display for narrative responses, hints, inventory, and progress updates.

### 4.2 LLM API
- Large Language Model (LLM) for understanding player inputs and generating narrative responses.  
- Handles multi-turn reasoning, adaptive storytelling, hint generation, and dynamic puzzle creation.

### 4.3 Tools / Functions
- `pick_item(item_name)` → Adds item to inventory.  
- `solve_puzzle(puzzle_id)` → Updates game state when a puzzle is solved.  
- `give_hint()` → Provides contextual hints based on player progress and struggles.  
- `update_game_state()` → Tracks inventory, solved puzzles, and room state.  
- Optional: Image generation tool for dynamic room visuals or map layouts.  

---

## 5. LLM’s Primary Task
- Interpret player input using natural language processing (NLP).  
- Track player progress and memory.  
- Generate dynamic narrative and puzzle responses.  
- Decide multi-step actions (autonomy) and adapt difficulty in real-time.  

---

## 6. Inputs and Outputs

### 6.1 Input
- **Player Commands:**  
  - **Easy Mode:** Player selects from provided options (clickable choices).  
  - **Hard Mode:** Player types freely in chat space; AI interprets commands and dynamically adapts puzzles.  

- **Player Metadata:**  
  - Tracks time spent, attempts, previous actions, puzzles solved, hints provided.  
  - Used by AI agent to adapt difficulty, provide hints, and generate narrative responses.  

### 6.2 Output
- Narrative descriptions and story progression.  
- Game state updates (inventory, unlocked rooms, solved puzzles).  
- Contextual hints if the player is stuck.  
- Optional visuals or audio cues.

---

## 7. Expected Outcome
- Players experience a dynamic, interactive escape room.  
- Adaptive difficulty ensures challenges remain engaging.  
- Multiple endings based on player choices, providing replayability.  
- AI agent tracks performance, provides hints, and manages state autonomously.  

---

## 8. System Diagram

```text
+-----------------+          +---------------------+          +------------------+
|  Player / UI    |  ---->   |      LLM API        |  ---->   | Function / Tools |
|  (Text Input)   |          |  (Reasoning, Story, |          | pick_item()      |
|                 |          |  Puzzle Generation) |          | solve_puzzle()   |
+-----------------+          +---------------------+          | give_hint()      |
       ^                         |          ^                 | update_game_state|
       |                         |          |                 +------------------+
       |                         v          |
       |                   +---------------------+
       |                   |    RAG Knowledge    |
       |                   | (Hints, Puzzle Bank,|
       |                   |  Story Elements)    |
       |                   +---------------------+
       |
       v
+-----------------+
| Player Feedback |
| (Progress,      |
| Choices, Stats) |
+-----------------+

