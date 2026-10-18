const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  name: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  icon: { type: String }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

chapterSchema.virtual('totalQuestions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'chapterId',
  count: true
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;
