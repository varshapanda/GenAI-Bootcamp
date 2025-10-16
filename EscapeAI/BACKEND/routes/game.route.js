const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  startGame,
  chooseOption,
  getGameSummary,
} = require("../controllers/gameController");

router.post("/start", startGame);
router.post("/choose", chooseOption);
router.post("/summary/:sessionId", getGameSummary);
module.exports = router;
