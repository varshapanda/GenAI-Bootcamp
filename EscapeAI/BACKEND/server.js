const express = require("express");
const app = express();
const connectDatabase = require("./config/database.js");

app.use(express.json());
connectDatabase();


app.get("/", (req, res)=>{
    res.status(200).send("Welcome to EscapeAI Backend");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
