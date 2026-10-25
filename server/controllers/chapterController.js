const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Subject = require('../models/Subject');
const { store, isMongooseConnected } = require('../config/inMemoryStore');

const ALIAS_MAP = {
  'sub_math': 'Mathematics',
  'sub_analytical': 'Analytical Ability & Logical Reasoning',
  'sub_computer': 'Computer Awareness',
  'sub_english': 'General English'
};

const getChaptersBySubject = async (req, res, next) => {
  try {
    let { subjectId } = req.params;

    if (!isMongooseConnected(mongoose)) {
      const chaptersWithDetails = store.chapters
        .filter(c => c.subjectId === subjectId)
        .map(c => {
          const topicCount = store.topics.filter(t => t.chapterId === c._id).length;
          return {
            ...c,
            topicCount
          };
        });
      return res.json(chaptersWithDetails);
    }

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      const aliasName = ALIAS_MAP[subjectId];
      const foundSub = await Subject.findOne(aliasName ? { name: aliasName } : { name: new RegExp(subjectId, 'i') });
      if (foundSub) {
        subjectId = foundSub._id;
      } else {
        return res.json([]);
      }
    }

    const chapters = await Chapter.find({ subjectId }).sort({ order: 1 }).lean();
    
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
    const { chapterId } = req.params;

    if (!isMongooseConnected(mongoose)) {
      const chapter = store.chapters.find(c => c._id === chapterId);
      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }
      const topics = store.topics.filter(t => t.chapterId === chapter._id);
      return res.json({ ...chapter, topics });
    }

    if (!mongoose.Types.ObjectId.isValid(chapterId)) {
      const chapter = await Chapter.findOne({ name: new RegExp(chapterId, 'i') }).lean();
      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }
      const topics = await Topic.find({ chapterId: chapter._id }).sort({ order: 1 });
      return res.json({ ...chapter, topics });
    }

    const chapter = await Chapter.findById(chapterId).lean();
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
