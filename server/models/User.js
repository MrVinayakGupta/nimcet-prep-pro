const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function() { return this.authProvider !== 'google'; } 
  },
  avatar: { type: String, default: '' },
  phone: { type: String, default: '' },
  college: { type: String, default: '' },
  targetYear: { type: String, default: '2025' },
  targetNit: { type: String, default: 'NIT Trichy' },
  mathLevel: { type: String, default: 'Basic / Weak (Building Fundamentals)' },
  aimRank: { type: String, default: 'AIR 1' },
  bio: { type: String, default: '' },
  authProvider: { type: String, default: 'local' }, // 'local' or 'google'
  googleId: { type: String, default: '' },
  role: { type: String, default: 'student' },
  questionsAttempted: { type: Number, default: 0 },
  questionsCorrect: { type: Number, default: 0 },
  answeredQuestions: [{
    questionId: { type: String, required: true },
    selectedAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  progress: {
    type: Map,
    of: {
      topicsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
      questionsAttempted: { type: Number, default: 0 },
      questionsCorrect: { type: Number, default: 0 },
      totalTimeSpent: { type: Number, default: 0 }
    },
    default: () => new Map()
  },
  mockTestHistory: [{
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'MockTest' },
    score: Number,
    totalQuestions: Number,
    timeTaken: Number,
    date: { type: Date, default: Date.now },
    subjectWise: { type: Map, of: { correct: Number, attempted: Number, total: Number } }
  }],
  bookmarkedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.password || !this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
