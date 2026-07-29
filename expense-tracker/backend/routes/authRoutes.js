// File: backend/routes/authRoutes.js
// Purpose: Defines routes for authentication (Register, Login, Get User)

const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/auth/register → calls register controller
router.post('/register', register);

// POST /api/auth/login → calls login controller
router.post('/login', login);

// GET /api/auth/user → protected route, returns logged-in user data
router.get('/user', authMiddleware, getUser);

module.exports = router;
