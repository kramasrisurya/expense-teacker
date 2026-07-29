// File: backend/database.js
// Purpose: Simple file-based database using JSON files
// No MongoDB needed - data is stored in data/*.json files

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Database {
  constructor(filename) {
    this.filePath = path.join(DATA_DIR, filename);
    this.data = [];
    this.load();
  }

  // Load data from the JSON file (or create empty file)
  load() {
    try {
      const raw = fs.readFileSync(this.filePath, 'utf8');
      this.data = JSON.parse(raw);
    } catch (err) {
      this.data = [];
      this.save();
    }
  }

  // Save data to the JSON file
  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  // Find all records matching a query
  find(query = {}) {
    return this.data.filter((item) => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }

  // Find one record matching a query
  findOne(query) {
    return this.find(query)[0] || null;
  }

  // Find by ID
  findById(id) {
    return this.data.find((item) => item._id === id) || null;
  }

  // Insert a new record
  insert(doc) {
    const item = { _id: uuidv4(), ...doc };
    this.data.push(item);
    this.save();
    return item;
  }

  // Update a record by ID
  update(id, updates) {
    const idx = this.data.findIndex((item) => item._id === id);
    if (idx === -1) return null;
    this.data[idx] = { ...this.data[idx], ...updates };
    this.save();
    return this.data[idx];
  }

  // Delete a record by ID
  delete(id) {
    const idx = this.data.findIndex((item) => item._id === id);
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    this.save();
    return true;
  }
}

module.exports = Database;
