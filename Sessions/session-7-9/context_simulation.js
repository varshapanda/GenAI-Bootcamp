// Simulating a chat system with a limited context window

// Step 1: Array to store chat messages
let chatHistory = [];

// Step 2: Maximum messages the chat can remember
const MAX_CONTEXT = 5;

// Step 3: Function to add a message
function addMessage(message) {
    chatHistory.push(message);

    // Step 4: Remove oldest messages if over limit
    if (chatHistory.length > MAX_CONTEXT) {
        chatHistory.shift(); // removes the first (oldest) message
    }

    // Display current chat history
    console.log("Current Chat History:", chatHistory);
}

// Step 5: Simulate a conversation
addMessage("Hi!");
addMessage("Hello, how are you?");
addMessage("I'm good, thanks!");
addMessage("What are you working on?");
addMessage("A hackathon project!");
addMessage("Cool, tell me more!");
addMessage("Sure, we are building an AI-powered app.");
