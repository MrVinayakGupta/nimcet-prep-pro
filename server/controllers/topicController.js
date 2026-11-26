const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const Chapter = require('../models/Chapter');
const { store, isMongooseConnected } = require('../config/inMemoryStore');
const { resolveMemoryChapterId, resolveMongoChapterId } = require('../utils/idResolver');

const getTopicsByChapter = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const chapterId = resolveMemoryChapterId(req.params.chapterId);
      const topics = store.topics.filter(t => t.chapterId === chapterId);
      return res.json(topics);
    }

    const chapterId = await resolveMongoChapterId(req.params.chapterId, Chapter);
    if (!chapterId) {
      return res.json([]);
    }

    const topics = await Topic.find({ chapterId }).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    next(error);
  }
};

const getTopicById = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const topic = store.topics.find(t => t._id === req.params.topicId);
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }
      const chapter = store.chapters.find(c => c._id === topic.chapterId) || { name: 'Chapter' };
      const subject = store.subjects.find(s => s._id === (topic.subjectId || chapter.subjectId)) || { name: 'Mathematics' };
      return res.json({
        ...topic,
        chapterId: chapter,
        subjectId: subject
      });
    }

    const topic = await Topic.findById(req.params.topicId)
      .populate('chapterId')
      .populate('subjectId');
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTopicsByChapter, getTopicById };
