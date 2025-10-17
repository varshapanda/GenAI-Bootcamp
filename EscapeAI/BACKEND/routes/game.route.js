const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  startGame,
  chooseOption,
  getGameSummary,
  getCurrentSession,
} = require("../controllers/gameController");

router.post("/start", authMiddleware, startGame);
router.post("/choose", authMiddleware, chooseOption);
router.post("/summary/:sessionId", authMiddleware, getGameSummary);
router.get("/current", authMiddleware, getCurrentSession);
module.exports = router;
