// File: backend/server.js
// Purpose: Main entry point - starts the Express server
// Uses file-based database (JSON files) - no MongoDB needed!

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ─── Middleware ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// ─── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Database: file-based (backend/data/*.json)');
});
