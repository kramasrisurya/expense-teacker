// File: backend/controllers/authController.js
// Purpose: Handles Register and Login logic using file-based database

const userDB = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ─── Helper: Generate JWT Token ────────────────────────────
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ─── POST /api/auth/register ───────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = userDB.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to JSON file
    const user = userDB.insert({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── POST /api/auth/login ──────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = userDB.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ─── GET /api/auth/user ────────────────────────────────────
const getUser = async (req, res) => {
  try {
    const user = userDB.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...userData } = user; // Exclude password
    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getUser };
