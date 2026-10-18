const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, enum: ['Mathematics', 'Analytical Ability & Logical Reasoning', 'Computer Awareness', 'General English'] },
  icon: { type: String },
  color: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
