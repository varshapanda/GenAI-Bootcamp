const express = require('express');
const router = express.Router();
const { googleLogin, refreshToken, logout, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', googleLogin);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

module.exports = router;