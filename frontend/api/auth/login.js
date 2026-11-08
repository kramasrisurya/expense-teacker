const { signToken, users, DEMO_USER_ID, expenses } = require('../_store.js');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  let user = users.get(email.toLowerCase());
  if (!user) {
    // Graceful onboarding: create session user
    const userId = 'usr_' + Date.now();
    user = {
      _id: userId,
      name: email.split('@')[0],
      email: email.toLowerCase(),
      createdAt: new Date().toISOString()
    };
    users.set(email.toLowerCase(), user);

    const starterExpenses = [
      { _id: 'exp_' + Date.now() + '_1', userId, title: 'Supermarket Groceries', amount: 850, category: 'Food', date: new Date().toISOString().split('T')[0], description: 'Fresh supplies', createdAt: new Date().toISOString() },
      { _id: 'exp_' + Date.now() + '_2', userId, title: 'Transit Pass', amount: 350, category: 'Transport', date: new Date().toISOString().split('T')[0], description: 'Metro travel', createdAt: new Date().toISOString() },
      { _id: 'exp_' + Date.now() + '_3', userId, title: 'Utility Bill Payment', amount: 600, category: 'Bills', date: new Date().toISOString().split('T')[0], description: 'Electricity', createdAt: new Date().toISOString() }
    ];
    starterExpenses.forEach(e => expenses.set(e._id, e));
  }

  const token = signToken(user._id);

  return res.status(200).json({
    token,
    user: { id: user._id, name: user.name, email: user.email }
  });
};
