const mongoose = require('mongoose');
const Question = require('../models/Question');
const User = require('../models/User');
const { generateExplanation } = require('../utils/geminiAI');
const { 
  store, 
  isMongooseConnected, 
  recordUserAnswer, 
  getUserAnswers, 
  findUserById, 
  getUserStats 
} = require('../config/inMemoryStore');

const attachMetadata = (q) => {
  const sub = store.subjects.find(s => s._id === q.subjectId);
  const ch = store.chapters.find(c => c._id === q.chapterId);
  const top = store.topics.find(t => t._id === q.topicId);
  return {
    ...q,
    subjectId: sub || { _id: q.subjectId, name: 'Subject' },
    chapterId: ch || { _id: q.chapterId, name: 'Chapter' },
    topicId: top || { _id: q.topicId, name: 'Topic' }
  };
};

const getQuestionsByTopic = async (req, res, next) => {
  try {
    const { difficulty, year, chapterId, type } = req.query;
    const topicId = req.params.topicId;

    if (!isMongooseConnected(mongoose)) {
      let filtered;
      if (topicId === 'all' && chapterId) {
        filtered = store.questions.filter(q => q.chapterId === chapterId);
      } else {
        filtered = store.questions.filter(q => q.topicId === topicId);
      }
      if (difficulty) {
        filtered = filtered.filter(q => (q.difficulty || '').toLowerCase() === difficulty.toLowerCase());
      }
      if (year) {
        filtered = filtered.filter(q => String(q.year) === String(year));
      }
      if (type === 'cat') {
        filtered = filtered.filter(q => q.examSource === 'CAT' || (q.tags && q.tags.includes('cat-reasoning')));
      } else if (type === 'pyq') {
        filtered = filtered.filter(q => q.isFromPreviousYear && q.examSource !== 'CAT');
      } else if (type === 'practice') {
        filtered = filtered.filter(q => !q.isFromPreviousYear);
      }
      return res.json(filtered.map(attachMetadata));
    }

    let filter = {};
    if (topicId === 'all' && chapterId) {
      filter.chapterId = chapterId;
    } else {
      filter.topicId = topicId;
    }
    if (difficulty) filter.difficulty = difficulty.toLowerCase();
    if (year) filter.year = Number(year);
    if (type === 'cat') {
      filter.$or = [{ examSource: 'CAT' }, { tags: 'cat-reasoning' }];
    } else if (type === 'pyq') {
      filter.isFromPreviousYear = true;
      filter.examSource = { $ne: 'CAT' };
    } else if (type === 'practice') {
      filter.isFromPreviousYear = false;
    }

    const questions = await Question.find(filter)
      .populate('subjectId')
      .populate('chapterId')
      .populate('topicId')
      .sort({ questionNumber: 1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

const getQuestionsByChapter = async (req, res, next) => {
  try {
    const { difficulty, year, type } = req.query;
    const chapterId = req.params.chapterId;

    if (!isMongooseConnected(mongoose)) {
      let filtered = store.questions.filter(q => q.chapterId === chapterId);
      if (difficulty) {
        filtered = filtered.filter(q => (q.difficulty || '').toLowerCase() === difficulty.toLowerCase());
      }
      if (year) {
        filtered = filtered.filter(q => String(q.year) === String(year));
      }
      if (type === 'cat') {
        filtered = filtered.filter(q => q.examSource === 'CAT' || (q.tags && q.tags.includes('cat-reasoning')));
      } else if (type === 'pyq') {
        filtered = filtered.filter(q => q.isFromPreviousYear && q.examSource !== 'CAT');
      } else if (type === 'practice') {
        filtered = filtered.filter(q => !q.isFromPreviousYear);
      }
      return res.json(filtered.map(attachMetadata));
    }

    const filter = { chapterId };
    if (difficulty) filter.difficulty = difficulty.toLowerCase();
    if (year) filter.year = Number(year);
    if (type === 'cat') {
      filter.$or = [{ examSource: 'CAT' }, { tags: 'cat-reasoning' }];
    } else if (type === 'pyq') {
      filter.isFromPreviousYear = true;
      filter.examSource = { $ne: 'CAT' };
    } else if (type === 'practice') {
      filter.isFromPreviousYear = false;
    }

    const questions = await Question.find(filter)
      .populate('subjectId')
      .populate('chapterId')
      .populate('topicId')
      .sort({ questionNumber: 1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

const getQuestionsBySubject = async (req, res, next) => {
  try {
    const { difficulty, year, type } = req.query;
    const subjectId = req.params.subjectId;

    if (!isMongooseConnected(mongoose)) {
      let filtered = store.questions.filter(q => q.subjectId === subjectId);
      if (difficulty) {
        filtered = filtered.filter(q => (q.difficulty || '').toLowerCase() === difficulty.toLowerCase());
      }
      if (year) {
        filtered = filtered.filter(q => String(q.year) === String(year));
      }
      if (type === 'cat') {
        filtered = filtered.filter(q => q.examSource === 'CAT' || (q.tags && q.tags.includes('cat-reasoning')));
      } else if (type === 'pyq') {
        filtered = filtered.filter(q => q.isFromPreviousYear && q.examSource !== 'CAT');
      } else if (type === 'practice') {
        filtered = filtered.filter(q => !q.isFromPreviousYear);
      }
      return res.json(filtered.map(attachMetadata));
    }

    const filter = { subjectId };
    if (difficulty) filter.difficulty = difficulty.toLowerCase();
    if (year) filter.year = Number(year);
    if (type === 'cat') {
      filter.$or = [{ examSource: 'CAT' }, { tags: 'cat-reasoning' }];
    } else if (type === 'pyq') {
      filter.isFromPreviousYear = true;
      filter.examSource = { $ne: 'CAT' };
    } else if (type === 'practice') {
      filter.isFromPreviousYear = false;
    }

    const questions = await Question.find(filter)
      .populate('subjectId')
      .populate('chapterId')
      .populate('topicId')
      .sort({ questionNumber: 1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

const getCatQuestions = async (req, res, next) => {
  try {
    const { year, difficulty } = req.query;
    if (!isMongooseConnected(mongoose)) {
      let filtered = store.questions.filter(q => q.examSource === 'CAT' || (q.tags && q.tags.includes('cat-reasoning')));
      if (year) filtered = filtered.filter(q => String(q.year) === String(year));
      if (difficulty) filtered = filtered.filter(q => (q.difficulty || '').toLowerCase() === difficulty.toLowerCase());
      return res.json(filtered.map(attachMetadata));
    }

    let filter = { $or: [{ examSource: 'CAT' }, { tags: 'cat-reasoning' }] };
    if (year) filter.year = Number(year);
    if (difficulty) filter.difficulty = difficulty.toLowerCase();

    const questions = await Question.find(filter)
      .populate('subjectId')
      .populate('chapterId')
      .populate('topicId')
      .sort({ year: -1, questionNumber: 1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

const getQuestionById = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const question = store.questions.find(q => q._id === req.params.questionId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      return res.json(question);
    }

    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    next(error);
  }
};

const getTopicStats = async (req, res, next) => {
  try {
    const questions = !isMongooseConnected(mongoose)
      ? store.questions.filter(q => q.topicId === req.params.topicId)
      : await Question.find({ topicId: req.params.topicId });

    const stats = {
      total: questions.length,
      byDifficulty: {
        easy: questions.filter(q => (q.difficulty || '').toLowerCase() === 'easy').length,
        moderate: questions.filter(q => (q.difficulty || '').toLowerCase() === 'moderate').length,
        hard: questions.filter(q => (q.difficulty || '').toLowerCase() === 'hard').length
      },
      byYear: {}
    };

    questions.forEach(q => {
      if (q.year) {
        stats.byYear[q.year] = (stats.byYear[q.year] || 0) + 1;
      }
    });

    res.json(stats);
  } catch (error) {
    next(error);
  }
};

const submitAnswer = async (req, res, next) => {
  try {
    const { answer } = req.body;
    let question;
    if (!isMongooseConnected(mongoose)) {
      question = store.questions.find(q => q._id === req.params.questionId);
    } else {
      question = await Question.findById(req.params.questionId);
    }
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const isCorrect = question.correctAnswer === answer;
    const userId = req.user?._id;

    // 1. Always record in in-memory store (instant response for guest & fallback)
    recordUserAnswer(userId || 'guest_user', question, answer, isCorrect);

    // 2. Dynamic recording for authenticated user in MongoDB
    if (userId && isMongooseConnected(mongoose)) {
      try {
        const user = await User.findById(userId);
        if (user) {
          user.questionsAttempted = (user.questionsAttempted || 0) + 1;
          if (isCorrect) {
            user.questionsCorrect = (user.questionsCorrect || 0) + 1;
          }
          if (!user.answeredQuestions) {
            user.answeredQuestions = [];
          }

          // Avoid duplicate answer entry for same question
          const qIdStr = question._id.toString();
          const prevIdx = user.answeredQuestions.findIndex(a => a.questionId === qIdStr);
          if (prevIdx !== -1) {
            user.answeredQuestions.splice(prevIdx, 1);
          }
          user.answeredQuestions.push({
            questionId: qIdStr,
            selectedAnswer: answer,
            isCorrect,
            timestamp: new Date()
          });

          // Subject Progress tracking
          if (!user.progress) {
            user.progress = new Map();
          }
          const subKey = question.subjectId ? question.subjectId.toString() : 'sub_math';
          if (!user.progress.has(subKey)) {
            user.progress.set(subKey, {
              topicsCompleted: [],
              questionsAttempted: 0,
              questionsCorrect: 0,
              totalTimeSpent: 0
            });
          }
          const subjectProgress = user.progress.get(subKey);
          subjectProgress.questionsAttempted = (subjectProgress.questionsAttempted || 0) + 1;
          if (isCorrect) {
            subjectProgress.questionsCorrect = (subjectProgress.questionsCorrect || 0) + 1;
          }

          user.markModified('progress');
          user.markModified('answeredQuestions');
          await user.save();
        }
      } catch (err) {
        console.error('Error saving user answer to MongoDB:', err.message);
      }
    }

    let explanation = question.explanation;
    if (!explanation || !explanation.summary) {
      explanation = await generateExplanation(question.questionText, question.options, question.correctAnswer);
      question.explanation = explanation;
      if (isMongooseConnected(mongoose)) {
        await question.save();
      }
    }

    const userStats = userId ? getUserStats(userId) : getUserStats('guest_user');

    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation,
      userStats
    });
  } catch (error) {
    next(error);
  }
};

const getUserAnswersList = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const answerMap = {};

    // 1. If in-memory has answers, populate
    const memAnswers = getUserAnswers(userId || 'guest_user');
    if (memAnswers && typeof memAnswers === 'object') {
      Object.assign(answerMap, memAnswers);
    }

    // 2. If user is authenticated in MongoDB, load answeredQuestions
    if (userId && isMongooseConnected(mongoose)) {
      const user = await User.findById(userId);
      if (user && user.answeredQuestions) {
        user.answeredQuestions.forEach(ans => {
          answerMap[ans.questionId] = {
            selectedAnswer: ans.selectedAnswer,
            isCorrect: ans.isCorrect,
            timestamp: ans.timestamp
          };
        });
      }
    }

    res.json(answerMap);
  } catch (error) {
    next(error);
  }
};

const toggleBookmark = async (req, res, next) => {
  try {
    const questionId = req.params.questionId;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Please log in to bookmark questions' });
    }
    
    if (!isMongooseConnected(mongoose)) {
      const user = findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.bookmarkedQuestions) user.bookmarkedQuestions = [];
      const idx = user.bookmarkedQuestions.indexOf(questionId);
      if (idx > -1) {
        user.bookmarkedQuestions.splice(idx, 1);
        return res.json({ bookmarked: false });
      } else {
        user.bookmarkedQuestions.push(questionId);
        return res.json({ bookmarked: true });
      }
    }

    const user = await User.findById(userId);
    const isBookmarked = user.bookmarkedQuestions.includes(questionId);
    
    if (isBookmarked) {
      user.bookmarkedQuestions = user.bookmarkedQuestions.filter(id => id.toString() !== questionId);
    } else {
      user.bookmarkedQuestions.push(questionId);
    }
    
    await user.save();
    res.json({ bookmarked: !isBookmarked });
  } catch (error) {
    next(error);
  }
};

const getBookmarkedQuestions = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.json([]);
    }

    if (!isMongooseConnected(mongoose)) {
      const user = findUserById(userId);
      if (!user || !user.bookmarkedQuestions) return res.json([]);
      const questions = store.questions
        .filter(q => user.bookmarkedQuestions.includes(q._id))
        .map(attachMetadata);
      return res.json(questions);
    }

    const user = await User.findById(userId).populate({
      path: 'bookmarkedQuestions',
      populate: { path: 'subjectId' }
    });
    res.json(user.bookmarkedQuestions || []);
  } catch (error) {
    next(error);
  }
};

const getAvailableYears = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const yearsSet = new Set(store.questions.map(q => q.year).filter(Boolean));
      const years = Array.from(yearsSet).sort((a, b) => b - a);
      return res.json(years.length > 0 ? years : []);
    }

    // If ?detail=true, return year objects with question counts
    if (req.query.detail === 'true') {
      const pipeline = [
        { $match: { isFromPreviousYear: true } },
        { $group: { _id: '$year', count: { $sum: 1 } } },
        { $sort: { _id: -1 } }
      ];
      const yearStats = await Question.aggregate(pipeline);
      return res.json(yearStats.map(y => ({
        year: y._id,
        questionCount: y.count,
        source: 'Official NIMCET PDF',
        verified: true
      })));
    }

    const years = await Question.distinct('year', { isFromPreviousYear: true });
    res.json(years.filter(Boolean).sort((a, b) => b - a));
  } catch (error) {
    next(error);
  }
};

const getQuestionsByYear = async (req, res, next) => {
  try {
    const targetYear = Number(req.params.year);

    if (!isMongooseConnected(mongoose)) {
      const questions = store.questions
        .filter(q => Number(q.year) === targetYear)
        .map(q => {
          const sub = store.subjects.find(s => s._id === q.subjectId);
          const ch = store.chapters.find(c => c._id === q.chapterId);
          return {
            ...q,
            subjectId: sub || { name: 'Mathematics' },
            chapterId: ch || { name: 'Chapter' }
          };
        });
      return res.json(questions);
    }

    const questions = await Question.find({ year: targetYear })
      .populate('subjectId')
      .populate('chapterId')
      .sort({ questionNumber: 1 });
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestionsByTopic,
  getQuestionsByChapter,
  getQuestionsBySubject,
  getCatQuestions,
  getQuestionById,
  getTopicStats,
  submitAnswer,
  toggleBookmark,
  getBookmarkedQuestions,
  getAvailableYears,
  getQuestionsByYear,
  getUserAnswersList
};
