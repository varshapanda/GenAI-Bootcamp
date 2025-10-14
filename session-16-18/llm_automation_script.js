const API_KEY = "AIzaSyA59XxDd_lq1XRSOf6jyUgYmOnlnbJwOB0";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;


// --- Prompt from Session 13-14 ---
const user_prompt = `
You are a data cleaning expert. Your task is to transform the provided raw CSV data into a clean JSON array of objects.
Only output the JSON array. Do not include any other text, explanations, or the markdown json specifier.

---FEW-SHOT EXAMPLES---

Input CSV:
"id","name","email"
1,"John Doe","john.doe@example.com"
2,"Jane smith","jane.smith@gmail.com"



Output JSON:
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  {
    "id": 2,
    "name": "Jane smith",
    "email": "jane.smith@gmail.com"
  }
]

Input CSV:
"id","name","email"
3,"Jane Smith","jane.smith@example.com"
4,"Peter Jones","peter.jones@example.com"

Output JSON:
[
  {
    "id": 3,
    "name": "Jane Smith",
    "email": "jane.smith@example.com"
  },
  {
    "id": 4,
    "name": "Peter Jones",
    "email": "peter.jones@example.com"
  }
]

---CSV DATA---

"id","product_name","stock","price"
101,"Wireless Mouse",150,25.99
102,"USB-C Hub",75,49.50
103,"Mechanical Keyboard",40,115.00
104,"4K Webcam",,89.99
`;



// --- API Call Function ---
async function callLLM() {
  // This structure is for the Google Gemini API
  const payload = {
    "contents": [
      {
        "parts": [{ "text": user_prompt }]
      }
    ],
    "generationConfig": {
        "temperature": 0.1
    }
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API call failed with status: ${response.status}. Body: ${errorBody}`);
    }

    const data = await response.json();
    console.log(data)
    
    // --- Output the result ---
    // The exact path for Gemini's response
    const generatedText = data.candidates[0].content.parts[0].text;
    
    console.log("--- Generated LLM Response ---");
    console.log(generatedText);

  } catch (error) {
    console.error("Error during API call:", error.message);
  }
}


// Execute the function
callLLM();

// curl "" \
//   -H 'Content-Type: application/json' \
//   -H 'X-goog-api-key: AIzaSyClNGgePocqHAVTkT56-Q047p7EhvQLWsw' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'