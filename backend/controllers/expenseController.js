// File: backend/controllers/expenseController.js
// Purpose: Handles all CRUD operations for expenses using file-based database

const expenseDB = require('../models/Expense');

// ─── GET /api/expenses ─────────────────────────────────────
const getExpenses = async (req, res) => {
  try {
    // Get only the logged-in user's expenses
    let expenses = expenseDB.find({ userId: req.user });
    // Sort by date descending (newest first)
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── GET /api/expenses/:id ─────────────────────────────────
const getExpense = async (req, res) => {
  try {
    const expense = expenseDB.findById(req.params.id);
    if (!expense || expense.userId !== req.user) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── POST /api/expenses ────────────────────────────────────
const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    const expense = expenseDB.insert({
      userId: req.user,
      title,
      amount: Math.round(Number(amount)),
      category,
      date: date || new Date().toISOString().split('T')[0],
      description: description || '',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── PUT /api/expenses/:id ─────────────────────────────────
const updateExpense = async (req, res) => {
  try {
    const existing = expenseDB.findById(req.params.id);
    if (!existing || existing.userId !== req.user) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { title, amount, category, date, description } = req.body;
    const updated = expenseDB.update(req.params.id, {
      title,
      amount: Math.round(Number(amount)),
      category,
      date,
      description,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ─── DELETE /api/expenses/:id ──────────────────────────────
const deleteExpense = async (req, res) => {
  try {
    const existing = expenseDB.findById(req.params.id);
    if (!existing || existing.userId !== req.user) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenseDB.delete(req.params.id);
    res.json({ message: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getExpenses, getExpense, createExpense, updateExpense, deleteExpense };
