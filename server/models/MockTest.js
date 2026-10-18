const mongoose = require('mongoose');

const mockTestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedAnswer: { type: String, enum: ['A', 'B', 'C', 'D', null], default: null },
    isCorrect: { type: Boolean, default: false },
    timeTaken: { type: Number, default: 0 }
  }],
  totalQuestions: { type: Number, required: true },
  score: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  timeTaken: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  status: { type: String, enum: ['in-progress', 'completed', 'abandoned'], default: 'in-progress' }
}, { timestamps: true });

const MockTest = mongoose.model('MockTest', mockTestSchema);
module.exports = MockTest;
