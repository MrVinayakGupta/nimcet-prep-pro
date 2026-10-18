const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const https = require('https');
const { 
  store, 
  isMongooseConnected, 
  findUserById, 
  findUserByEmail, 
  createUser,
  googleAuthUser,
  getUserStats 
} = require('../config/inMemoryStore');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'nimcet_prep_pro_jwt_secret_2024', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

const formatUserPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar || user.name?.charAt(0).toUpperCase() || 'U',
  phone: user.phone || '',
  college: user.college || '',
  targetYear: user.targetYear || '2025',
  targetNit: user.targetNit || 'NIT Trichy',
  mathLevel: user.mathLevel || 'Basic / Weak (Building Fundamentals)',
  aimRank: user.aimRank || 'AIR 1',
  bio: user.bio || '',
  authProvider: user.authProvider || 'local',
  role: user.role || 'student',
  createdAt: user.createdAt
});

const verifyGoogleToken = (idToken) => {
  return new Promise((resolve) => {
    https.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error_description || parsed.error) {
            resolve(null);
          } else {
            resolve(parsed);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    if (!isMongooseConnected(mongoose)) {
      const exists = findUserByEmail(email);
      if (exists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const newUser = createUser({ name, email, password });
      const token = generateToken(newUser._id);
      const userPayload = formatUserPayload(newUser);

      return res.status(201).json({
        ...userPayload,
        user: userPayload,
        token
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      const token = generateToken(user._id);
      const userPayload = formatUserPayload(user);
      res.status(201).json({
        ...userPayload,
        user: userPayload,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (!isMongooseConnected(mongoose)) {
      const user = findUserByEmail(email);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user._id);
        const userPayload = formatUserPayload(user);
        return res.json({
          ...userPayload,
          user: userPayload,
          token
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      const userPayload = formatUserPayload(user);
      res.json({
        ...userPayload,
        user: userPayload,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

const googleLogin = async (req, res, next) => {
  try {
    const { credential, idToken, email, name, avatar } = req.body;
    let googleUser = null;

    if (credential || idToken) {
      const verified = await verifyGoogleToken(credential || idToken);
      if (verified && verified.email) {
        googleUser = {
          email: verified.email,
          name: verified.name || verified.given_name || 'Google User',
          avatar: verified.picture || '',
          googleId: verified.sub
        };
      }
    }

    if (!googleUser && email) {
      googleUser = {
        email: email.trim().toLowerCase(),
        name: name || 'Google Aspirant',
        avatar: avatar || 'https://lh3.googleusercontent.com/a/default-user',
        googleId: 'g_' + Date.now()
      };
    }

    if (!googleUser || !googleUser.email) {
      return res.status(400).json({ message: 'Google authentication failed: valid email required' });
    }

    if (!isMongooseConnected(mongoose)) {
      const user = googleAuthUser(googleUser);
      const token = generateToken(user._id);
      const userPayload = formatUserPayload(user);
      return res.json({
        ...userPayload,
        user: userPayload,
        token
      });
    }

    // MongoDB
    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.avatar,
        googleId: googleUser.googleId,
        authProvider: 'google',
        targetYear: '2025',
        targetNit: 'NIT Trichy',
        aimRank: 'AIR 1'
      });
    } else {
      if (googleUser.avatar && (!user.avatar || !user.avatar.startsWith('http'))) {
        user.avatar = googleUser.avatar;
        await user.save();
      }
    }

    const token = generateToken(user._id);
    const userPayload = formatUserPayload(user);
    res.json({
      ...userPayload,
      user: userPayload,
      token
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!isMongooseConnected(mongoose)) {
      const user = findUserById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const stats = getUserStats(user._id);
      const userPayload = formatUserPayload(user);
      return res.json({
        ...userPayload,
        user: userPayload,
        stats,
        mockTestHistory: user.mockTestHistory || []
      });
    }

    const user = await User.findById(req.user._id);
    if (user) {
      const userPayload = formatUserPayload(user);
      res.json({
        ...userPayload,
        user: userPayload,
        progress: user.progress,
        mockTestHistory: user.mockTestHistory || []
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { 
      name, 
      phone, 
      college, 
      targetYear, 
      targetNit, 
      mathLevel, 
      aimRank, 
      bio, 
      avatar, 
      password 
    } = req.body;

    if (!isMongooseConnected(mongoose)) {
      const user = findUserById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (name) user.name = name.trim();
      if (phone !== undefined) user.phone = phone.trim();
      if (college !== undefined) user.college = college.trim();
      if (targetYear !== undefined) user.targetYear = targetYear;
      if (targetNit !== undefined) user.targetNit = targetNit;
      if (mathLevel !== undefined) user.mathLevel = mathLevel;
      if (aimRank !== undefined) user.aimRank = aimRank;
      if (bio !== undefined) user.bio = bio;
      if (avatar !== undefined) user.avatar = avatar;
      if (password) user.password = bcrypt.hashSync(password, 10);

      const userPayload = formatUserPayload(user);
      return res.json({
        ...userPayload,
        user: userPayload,
        token: generateToken(user._id)
      });
    }

    const user = await User.findById(req.user._id);
    if (user) {
      if (name) user.name = name.trim();
      if (phone !== undefined) user.phone = phone.trim();
      if (college !== undefined) user.college = college.trim();
      if (targetYear !== undefined) user.targetYear = targetYear;
      if (targetNit !== undefined) user.targetNit = targetNit;
      if (mathLevel !== undefined) user.mathLevel = mathLevel;
      if (aimRank !== undefined) user.aimRank = aimRank;
      if (bio !== undefined) user.bio = bio;
      if (avatar !== undefined) user.avatar = avatar;
      if (password) user.password = password;

      const updatedUser = await user.save();
      const userPayload = formatUserPayload(updatedUser);
      res.json({
        ...userPayload,
        user: userPayload,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  googleLogin, 
  getUserProfile, 
  updateUserProfile 
};
