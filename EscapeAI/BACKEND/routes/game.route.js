const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  startGame,
  chooseOption,
  getGameSummary,
} = require("../controllers/gameController");

router.post("/start", authMiddleware, startGame);
router.post("/choose", authMiddleware, chooseOption);
router.post("/summary/:sessionId", authMiddleware, getGameSummary);
module.exports = router;
