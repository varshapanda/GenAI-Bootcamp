const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUserSessions,
  getSessionDetails,
} = require("../controllers/sessionController");
const router = express.Router();

router.get("/:sessionId", authMiddleware,getSessionDetails );
router.get("/history/all", authMiddleware, getAllUserSessions);

module.exports = router;

