const { verifyToken, expenses, DEMO_USER_ID } = require('../_store.js');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization || '';
  const decoded = verifyToken(authHeader);
  const userId = decoded?.id || DEMO_USER_ID;

  if (req.method === 'GET') {
    const userExpenses = [];
    for (const exp of expenses.values()) {
      if (exp.userId === userId || exp.userId === DEMO_USER_ID) {
        userExpenses.push(exp);
      }
    }
    userExpenses.sort((a, b) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime());
    return res.status(200).json(userExpenses);
  }

  if (req.method === 'POST') {
    const { title, amount, category, date, description } = req.body || {};

    if (!title || !amount) {
      return res.status(400).json({ message: 'Title and amount are required' });
    }

    const newExpense = {
      _id: 'exp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      userId,
      title,
      amount: Math.round(Number(amount)),
      category: category || 'Other',
      date: date || new Date().toISOString().split('T')[0],
      description: description || '',
      createdAt: new Date().toISOString()
    };

    expenses.set(newExpense._id, newExpense);
    return res.status(201).json(newExpense);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
