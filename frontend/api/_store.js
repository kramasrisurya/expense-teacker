import crypto from 'crypto';

const SECRET = 'expense-tracker-jwt-secret-2026';

export function signToken(userId) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ id: userId, exp: Math.floor(Date.now() / 1000) + 30 * 86400 })).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${sig}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const clean = token.startsWith('Bearer ') ? token.slice(7) : token;
  const parts = clean.split('.');
  if (parts.length !== 3) return null;
  const [header, payload, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET).update(`${header}.${payload}`).digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data;
  } catch (e) {
    return null;
  }
}

// In-memory persistent database for serverless container lifecycle
export const users = new Map();
export const expenses = new Map();

// Seed initial demo user and expenses
export const DEMO_USER_ID = 'demo-user-surya-01';
users.set('demo@example.com', {
  _id: DEMO_USER_ID,
  name: 'Rama Sri Surya',
  email: 'demo@example.com',
  createdAt: new Date().toISOString()
});

const initialExpenses = [
  { _id: 'exp-01', userId: DEMO_USER_ID, title: 'Grocery & Organic Market', amount: 1450, category: 'Food', date: '2026-11-06', description: 'Weekly groceries', createdAt: new Date().toISOString() },
  { _id: 'exp-02', userId: DEMO_USER_ID, title: 'Metro & Fuel Card Recharge', amount: 800, category: 'Transport', date: '2026-11-05', description: 'Commute expenses', createdAt: new Date().toISOString() },
  { _id: 'exp-03', userId: DEMO_USER_ID, title: 'Fiber Broadband Internet Bill', amount: 999, category: 'Bills', date: '2026-11-04', description: 'Monthly high-speed internet', createdAt: new Date().toISOString() },
  { _id: 'exp-04', userId: DEMO_USER_ID, title: 'Tech Books & Cloud Hosting', amount: 2400, category: 'Entertainment', date: '2026-11-02', description: 'Vercel & Domain subscriptions', createdAt: new Date().toISOString() },
  { _id: 'exp-05', userId: DEMO_USER_ID, title: 'Medical & Dental Checkup', amount: 1200, category: 'Health', date: '2026-10-29', description: 'Routine checkup', createdAt: new Date().toISOString() }
];

initialExpenses.forEach(exp => expenses.set(exp._id, exp));
