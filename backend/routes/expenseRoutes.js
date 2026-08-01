// File: backend/routes/expenseRoutes.js
// Purpose: Defines CRUD routes for expenses (all routes are protected)

const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

// All expense routes require authentication
router.use(authMiddleware);

// GET  /api/expenses     → Get all expenses
// POST /api/expenses     → Create a new expense
router.route('/').get(getExpenses).post(createExpense);

// GET   /api/expenses/:id → Get single expense
// PUT   /api/expenses/:id → Update expense
// DELETE /api/expenses/:id → Delete expense
router.route('/:id').get(getExpense).put(updateExpense).delete(deleteExpense);

module.exports = router;
