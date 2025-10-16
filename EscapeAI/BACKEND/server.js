const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDatabase = require("./config/database.js");
const authRoutes = require("./routes/authRoutes.js");
const gameSessionRoutes = require("./routes/sessionRoutes.js");
const gameRoutes = require("./routes/game.route");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
connectDatabase();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to EscapeAI Backend");
});
app.use("/auth", authRoutes);
app.use("/session", gameSessionRoutes);
app.use("/game", gameRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
