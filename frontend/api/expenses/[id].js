import { verifyToken, expenses, DEMO_USER_ID } from '../_store.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const authHeader = req.headers.authorization || '';
  const decoded = verifyToken(authHeader);
  const userId = decoded?.id || DEMO_USER_ID;

  const target = expenses.get(id);

  if (req.method === 'GET') {
    if (!target) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    return res.status(200).json(target);
  }

  if (req.method === 'PUT') {
    if (!target) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    const { title, amount, category, date, description } = req.body || {};
    if (title) target.title = title;
    if (amount !== undefined) target.amount = Math.round(Number(amount));
    if (category) target.category = category;
    if (date) target.date = date;
    if (description !== undefined) target.description = description;

    expenses.set(id, target);
    return res.status(200).json(target);
  }

  if (req.method === 'DELETE') {
    expenses.delete(id);
    return res.status(200).json({ message: 'Expense deleted successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
