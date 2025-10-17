# Iterative Prompt Refinement and Evaluation 

## Refined Prompt
Generate a personalized 7-day learning plan for a learner based on the following inputs:

- Goal: {learner_goal}
- Available time per day: {learner_time}
- Learning style: {learner_preference}

Requirements:
1. Structure the plan day-wise (Day 1 → Day 7)
2. Include specific actionable tasks: watch videos, read articles, practice exercises, and mini-projects
3. Allocate estimated time for each activity
4. Ensure the plan is motivating, realistic, and aligns with the learner’s goal and constraints
5. Use bullet points or tables for clarity
6. Keep the format consistent for any learner input

## Example Learner Inputs
- Goal: Crack coding interviews in 3 months
- Available time per day: 2 hours
- Learning preference: Project-based + Video content

## Generated 7-Day Learning Plan

**Day 1:**  
- Watch: Abdul Bari – Arrays Overview (YouTube, 45 mins)  
- Practice: Solve 5 basic array problems on LeetCode (60 mins)  
- Review: Write notes summarizing array time complexities (15 mins)

**Day 2:**  
- Watch: Love Babbar – DSA Sheet Overview (YouTube, 30 mins)  
- Practice: Solve 3 medium-level array problems (1.5 hrs)

**Day 3:**  
- Watch: Abdul Bari – Stack & Queue Introduction (YouTube, 40 mins)  
- Practice: Implement stack and queue problems (60 mins)  
- Mini Project: Build a simple calculator using stack (20 mins)

**Day 4:**  
- Watch: William Fiset – Linked List Basics (YouTube, 35 mins)  
- Practice: Solve 3 linked list problems (1 hr)  
- Review: Diagram linked list operations (25 mins)

**Day 5:**  
- Watch: GeeksforGeeks – Recursion Techniques (YouTube, 30 mins)  
- Practice: Solve 2 recursion-based problems (60 mins)  
- Mini Project: Implement recursive Fibonacci (30 mins)

**Day 6:**  
- Watch: CodeHelp – Sorting Algorithms (YouTube, 45 mins)  
- Practice: Solve 3 sorting problems (60 mins)  
- Review: Compare algorithm time complexity (15 mins)

**Day 7:**  
- Practice: Mock interview simulation – 2 problems per topic covered (2 hrs)  
- Review: Write reflection notes on problem-solving strategies (optional)

## Summary of Iterations
1. **Initial Prompt:** Started with a simple “generate 7-day plan” instruction. Output lacked consistency and structure.  
2. **First Iteration:** Added requirements for day-wise structure, time allocation, and actionable tasks. Output became more structured.  
3. **Second Iteration:** Specified format (bullet points), motivation, and adaptability for any learner. Output now looks realistic and ready for submission.
