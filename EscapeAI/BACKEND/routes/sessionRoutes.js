const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createGameSession,
  startGameSession,
  getCurrentSession,
  endGameSession,
  getAllUserSessions,
} = require("../controllers/sessionController");
const router = express.Router();

router.post("/create", authMiddleware, createGameSession);
router.post("/start", authMiddleware, startGameSession);
router.get("/:gameSessionId", authMiddleware, getCurrentSession);
router.post("/end", authMiddleware, endGameSession);
router.get("/history/all", authMiddleware, getAllUserSessions);

module.exports = router

