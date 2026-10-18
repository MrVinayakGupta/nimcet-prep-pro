const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  name: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  prerequisites: [{
    topicName: String,
    description: String
  }]
}, { timestamps: true });

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
