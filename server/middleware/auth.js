const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { store, isMongooseConnected } = require('../config/inMemoryStore');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nimcet_prep_pro_jwt_secret_2024');
      
      if (!isMongooseConnected(mongoose)) {
        const user = store.users.find(u => u._id === decoded.id);
        if (!user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        const { password, ...safeUser } = user;
        req.user = safeUser;
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      next();
    } catch (error) {
      console.error('Auth protect error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const optionalProtect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nimcet_prep_pro_jwt_secret_2024');
      if (!isMongooseConnected(mongoose)) {
        const user = store.users.find(u => u._id === decoded.id);
        if (user) {
          const { password, ...safeUser } = user;
          req.user = safeUser;
        }
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }
    } catch (e) {
      // Ignore token failure for optional protect
    }
  }
  next();
};

module.exports = { protect, optionalProtect };
