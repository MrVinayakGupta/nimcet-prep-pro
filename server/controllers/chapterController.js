const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Subject = require('../models/Subject');
const { store, isMongooseConnected } = require('../config/inMemoryStore');
const {
  resolveMemorySubjectId,
  resolveMemoryChapterId,
  resolveMongoSubjectId,
  resolveMongoChapterId
} = require('../utils/idResolver');

const getChaptersBySubject = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const subjectId = resolveMemorySubjectId(req.params.subjectId);
      const chaptersWithDetails = store.chapters
        .filter(c => c.subjectId === subjectId)
        .map(c => ({
          ...c,
          topicCount: store.topics.filter(t => t.chapterId === c._id).length
        }));
      return res.json(chaptersWithDetails);
    }

    const subjectId = await resolveMongoSubjectId(req.params.subjectId, Subject);
    if (!subjectId) {
      return res.json([]);
    }

    const chapters = await Chapter.find({ subjectId }).sort({ order: 1 }).lean();
    const chaptersWithDetails = await Promise.all(
      chapters.map(async (chapter) => ({
        ...chapter,
        topicCount: await Topic.countDocuments({ chapterId: chapter._id })
      }))
    );

    res.json(chaptersWithDetails);
  } catch (error) {
    next(error);
  }
};

const getChapterById = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const chapterId = resolveMemoryChapterId(req.params.chapterId);
      const chapter = store.chapters.find(c => c._id === chapterId);
      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }
      const topics = store.topics.filter(t => t.chapterId === chapter._id);
      return res.json({ ...chapter, topics });
    }

    const chapterId = await resolveMongoChapterId(req.params.chapterId, Chapter);
    const chapter = chapterId ? await Chapter.findById(chapterId).lean() : null;
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
