// File: backend/models/User.js
// Purpose: Creates a "users" collection using the file-based database
// Each user has: _id, name, email, password (hashed), createdAt

const Database = require('../database');

// This creates/reads the file: backend/data/users.json
const userDB = new Database('users.json');

module.exports = userDB;
