const jwt = require('jsonwebtoken');

const authorized = (req, res, next) => {
  const token = req.cookies.token 
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('User authorized:', decoded);
    next(); 
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid token.' });
  }
};

module.exports = { authorized };
