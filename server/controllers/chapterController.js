const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const { store, isMongooseConnected } = require('../config/inMemoryStore');

const getChaptersBySubject = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const chaptersWithDetails = store.chapters
        .filter(c => c.subjectId === req.params.subjectId)
        .map(c => {
          const topicCount = store.topics.filter(t => t.chapterId === c._id).length;
          return {
            ...c,
            topicCount
          };
        });
      return res.json(chaptersWithDetails);
    }

    const chapters = await Chapter.find({ subjectId: req.params.subjectId }).sort({ order: 1 }).lean();
    
    const chaptersWithDetails = await Promise.all(chapters.map(async (chapter) => {
      const topicCount = await Topic.countDocuments({ chapterId: chapter._id });
      return {
        ...chapter,
        topicCount
      };
    }));

    res.json(chaptersWithDetails);
  } catch (error) {
    next(error);
  }
};

const getChapterById = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const chapter = store.chapters.find(c => c._id === req.params.chapterId);
      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }
      const topics = store.topics.filter(t => t.chapterId === chapter._id);
      return res.json({ ...chapter, topics });
    }

    const chapter = await Chapter.findById(req.params.chapterId).lean();
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }
    const topics = await Topic.find({ chapterId: chapter._id }).sort({ order: 1 });
    res.json({ ...chapter, topics });
  } catch (error) {
    next(error);
  }
};

module.exports = { getChaptersBySubject, getChapterById };
