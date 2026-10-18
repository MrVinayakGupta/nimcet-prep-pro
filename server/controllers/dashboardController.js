const mongoose = require('mongoose');
const User = require('../models/User');
const Question = require('../models/Question');
const { 
  store, 
  isMongooseConnected, 
  getUserStats, 
  getUserSubjectProgress, 
  getUserRecentActivity,
  getUserWeakAreas,
  findUserById
} = require('../config/inMemoryStore');

const DEFAULT_SUBJECTS = [
  { _id: 'sub_math', name: 'Mathematics', progress: 0, attempted: 0, total: 168, accuracy: 0, color: '#4F46E5' },
  { _id: 'sub_analytical', name: 'Analytical Ability & Reasoning', progress: 0, attempted: 0, total: 132, accuracy: 0, color: '#059669' },
  { _id: 'sub_computer', name: 'Computer Awareness', progress: 0, attempted: 0, total: 72, accuracy: 0, color: '#DC2626' },
  { _id: 'sub_english', name: 'General English', progress: 0, attempted: 0, total: 72, accuracy: 0, color: '#D97706' },
];

const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    let totalQuestionsAttempted = 0;
    let totalQuestionsCorrect = 0;
    let totalTimeSpent = 0;
    let streak = 0;

    // 1. Check MongoDB if user is authenticated
    if (userId && isMongooseConnected(mongoose)) {
      const user = await User.findById(userId);
      if (user) {
        if (user.answeredQuestions && user.answeredQuestions.length > 0) {
          totalQuestionsAttempted = user.answeredQuestions.length;
          totalQuestionsCorrect = user.answeredQuestions.filter(a => a.isCorrect).length;
        } else if (user.questionsAttempted > 0) {
          totalQuestionsAttempted = user.questionsAttempted;
          totalQuestionsCorrect = user.questionsCorrect || 0;
        }
      }
    }

    // 2. Check in-memory store fallback (including guest session)
    if (totalQuestionsAttempted === 0) {
      const memStats = getUserStats(userId || 'guest_user');
      if (memStats && memStats.totalQuestionsAttempted > 0) {
        totalQuestionsAttempted = memStats.totalQuestionsAttempted;
        totalQuestionsCorrect = memStats.totalQuestionsCorrect;
      }
    }

    streak = totalQuestionsAttempted > 0 ? 1 : 0;
    const accuracy = totalQuestionsAttempted > 0 
      ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100) 
      : 0;
    totalTimeSpent = Math.round(totalQuestionsAttempted * 2.5); // ~2.5 mins per question

    res.json({
      totalQuestions: totalQuestionsAttempted,
      totalQuestionsAttempted,
      totalQuestionsCorrect,
      accuracy,
      timeSpent: totalTimeSpent,
      currentStreak: streak,
      streak,
      performanceTrend: [
        { name: 'Mon', accuracy: Math.max(10, accuracy - 12) },
        { name: 'Tue', accuracy: Math.max(15, accuracy - 8) },
        { name: 'Wed', accuracy: Math.max(20, accuracy - 4) },
        { name: 'Thu', accuracy },
        { name: 'Fri', accuracy },
        { name: 'Sat', accuracy },
        { name: 'Sun', accuracy }
      ]
    });
  } catch (error) {
    next(error);
  }
};

const getSubjectProgress = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    // Check in-memory first if offline or guest has activity
    if (!isMongooseConnected(mongoose) || !userId) {
      const memProgress = getUserSubjectProgress(userId || 'guest_user');
      if (memProgress && memProgress.some(s => s.attempted > 0)) {
        return res.json(memProgress);
      }
      if (!isMongooseConnected(mongoose)) {
        return res.json(DEFAULT_SUBJECTS);
      }
    }

    if (!userId) {
      return res.json(DEFAULT_SUBJECTS);
    }

    const user = await User.findById(userId);
    if (!user || !user.answeredQuestions || user.answeredQuestions.length === 0) {
      return res.json(DEFAULT_SUBJECTS);
    }

    // Get all answered question IDs to group by subject
    const qIds = user.answeredQuestions.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: qIds } }).select('_id subjectId');
    
    // Build map of qId -> subjectId string
    const qSubMap = {};
    questions.forEach(q => {
      qSubMap[q._id.toString()] = q.subjectId ? q.subjectId.toString() : 'sub_math';
    });

    // Also look at inMemory questions if not found in Mongo
    store.questions.forEach(q => {
      if (!qSubMap[q._id]) {
        qSubMap[q._id] = q.subjectId;
      }
    });

    const subCounts = {
      sub_math: { attempted: 0, correct: 0 },
      sub_analytical: { attempted: 0, correct: 0 },
      sub_computer: { attempted: 0, correct: 0 },
      sub_english: { attempted: 0, correct: 0 }
    };

    user.answeredQuestions.forEach(ans => {
      let sub = qSubMap[ans.questionId] || 'sub_math';
      // Normalize subject
      if (sub.includes('math')) sub = 'sub_math';
      else if (sub.includes('analyt') || sub.includes('reason')) sub = 'sub_analytical';
      else if (sub.includes('comp')) sub = 'sub_computer';
      else if (sub.includes('eng')) sub = 'sub_english';
      else sub = 'sub_math';

      if (subCounts[sub]) {
        subCounts[sub].attempted += 1;
        if (ans.isCorrect) subCounts[sub].correct += 1;
      }
    });

    const result = DEFAULT_SUBJECTS.map(s => {
      const counts = subCounts[s._id] || { attempted: 0, correct: 0 };
      const attempted = counts.attempted;
      const correct = counts.correct;
      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      const progress = Math.min(100, Math.round((attempted / s.total) * 100));

      return {
        ...s,
        attempted,
        accuracy,
        progress
      };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getRecentActivity = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    // Check in-memory store
    const memActivity = getUserRecentActivity(userId || 'guest_user');
    if (memActivity && memActivity.length > 0) {
      return res.json(memActivity);
    }

    if (userId && isMongooseConnected(mongoose)) {
      const user = await User.findById(userId);
      if (user && user.answeredQuestions && user.answeredQuestions.length > 0) {
        const recent = user.answeredQuestions.slice(-10).reverse();
        const qIds = recent.map(r => r.questionId);
        const questions = await Question.find({ _id: { $in: qIds } })
          .populate('topicId')
          .populate('chapterId');
        
        const qMap = {};
        questions.forEach(q => { qMap[q._id.toString()] = q; });

        const mapped = recent.map((ans, idx) => {
          const q = qMap[ans.questionId];
          const topicName = q?.topicId?.name || q?.chapterId?.name || 'NIMCET Practice Problem';
          const title = q?.questionText ? (q.questionText.replace(/\$[^$]+\$/g, '').substring(0, 50) + '...') : `Question #${idx+1}`;
          
          return {
            id: `act_${ans.questionId}_${idx}`,
            type: 'practice',
            title,
            topic: topicName,
            status: ans.isCorrect ? 'Correct' : 'Incorrect',
            score: ans.isCorrect ? 4 : -1,
            timeAgo: 'Recently'
          };
        });

        return res.json(mapped);
      }
    }

    res.json([]);
  } catch (error) {
    next(error);
  }
};

const getWeakAreas = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const memWeak = getUserWeakAreas(userId || 'guest_user');
    if (memWeak && memWeak.length > 0) {
      return res.json(memWeak);
    }

    // Default recommendations if no weak areas detected yet
    res.json([
      { topic: 'Calculus (Derivatives & Limits)', accuracy: 45, recommendedAction: 'Practice line-by-line step solutions & review L\'Hopital\'s rule' },
      { topic: 'Probability & Bayes Theorem', accuracy: 50, recommendedAction: 'Master conditional probability formulas & solve 10 questions' },
      { topic: 'CAT DILR Circular Seating Arrangement', accuracy: 55, recommendedAction: 'Practice diagram constraint elimination for speed' }
    ]);
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  getDashboardStats, 
  getSubjectProgress, 
  getRecentActivity,
  getWeakAreas
};
