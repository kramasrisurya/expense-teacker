// File: backend/middleware/authMiddleware.js
// Purpose: Protects routes by verifying JWT token from the request header

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  // Format: "Bearer <token>"
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object so route handlers can use it
    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
