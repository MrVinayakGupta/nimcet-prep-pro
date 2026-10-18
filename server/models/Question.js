const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  year: { type: Number },
  questionNumber: { type: Number },
  questionText: { type: String, required: true },
  options: [{
    id: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
    text: { type: String, required: true }
  }],
  correctAnswer: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
  difficulty: { type: String, enum: ['easy', 'moderate', 'hard'], default: 'moderate' },
  explanation: {
    summary: String,
    prerequisites: [{ topic: String, description: String, importance: String }],
    stepByStep: [{ stepNumber: Number, title: String, content: String, formula: String, calculation: String }],
    conceptUsed: String,
    tips: [String],
    commonMistakes: [String]
  },
  tags: [String],
  isFromPreviousYear: { type: Boolean, default: false }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
