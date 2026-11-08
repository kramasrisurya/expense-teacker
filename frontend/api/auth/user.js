import { verifyToken, users } from '../_store.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers.authorization || '';
  const decoded = verifyToken(authHeader);

  if (!decoded || !decoded.id) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }

  let foundUser = null;
  for (const u of users.values()) {
    if (u._id === decoded.id) {
      foundUser = u;
      break;
    }
  }

  if (!foundUser) {
    foundUser = {
      _id: decoded.id,
      name: 'User',
      email: 'user@example.com'
    };
  }

  return res.status(200).json({
    _id: foundUser._id,
    name: foundUser.name,
    email: foundUser.email
  });
}
