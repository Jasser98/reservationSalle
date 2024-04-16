
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).send('Authentication failed: No token provided');
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send('Authentication failed: User not found');
    }

    req.user = { _id: userId, role: user.role };
    next();
  } catch (error) {
    return res.status(401).send('Authentication failed: Invalid token');
  }
};



module.exports = authenticate;
