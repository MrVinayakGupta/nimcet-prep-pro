const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const { store, isMongooseConnected } = require('../config/inMemoryStore');

const getSubjects = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const subjectsWithDetails = store.subjects.map(s => {
        const chapterCount = store.chapters.filter(c => c.subjectId === s._id).length;
        return {
          ...s,
          chapterCount
        };
      });
      return res.json(subjectsWithDetails);
    }

    const subjects = await Subject.find().sort({ order: 1 }).lean();
    
    const subjectsWithDetails = await Promise.all(subjects.map(async (subject) => {
      const chapterCount = await Chapter.countDocuments({ subjectId: subject._id });
      return {
        ...subject,
        chapterCount
      };
    }));

    res.json(subjectsWithDetails);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSubjects };
