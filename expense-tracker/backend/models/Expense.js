// File: backend/models/Expense.js
// Purpose: Creates an "expenses" collection using the file-based database
// Each expense has: _id, userId, title, amount, category, date, description, createdAt

const Database = require('../database');

// This creates/reads the file: backend/data/expenses.json
const expenseDB = new Database('expenses.json');

module.exports = expenseDB;
