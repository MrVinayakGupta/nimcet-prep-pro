const bcrypt = require('bcryptjs');
const { subjects, chapters, topics, questions } = require('../seed/seedData');

// In-Memory store with deterministic IDs for instant zero-dependency execution
const store = {
  subjects: [...subjects],
  chapters: [...chapters],
  topics: [...topics],
  questions: questions.map((q, idx) => ({
    _id: q._id || `q_${q.topicId || 'top'}_${q.questionNumber || idx + 1}`,
    ...q
  })),
  users: [
    {
      _id: 'user_demo_1',
      name: 'Vinayak Gupta',
      email: 'student@nimcet.com',
      password: bcrypt.hashSync('password123', 10),
      avatar: 'V',
      role: 'student',
      createdAt: new Date().toISOString(),
      answers: {},
      progress: {
        sub_math: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
        sub_analytical: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
        sub_computer: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
        sub_english: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 }
      },
      recentActivity: [],
      bookmarkedQuestions: [],
      mockTestHistory: []
    }
  ],
  mockTests: []
};

// Check if mongoose is actively connected to a real database
const isMongooseConnected = (mongoose) => {
  return mongoose && mongoose.connection && mongoose.connection.readyState === 1;
};

// Helper: Find or initialize user
const findUserById = (userId) => {
  return store.users.find(u => u._id === userId) || null;
};

const findUserByEmail = (email) => {
  return store.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || null;
};

const createUser = ({ name, email, password }) => {
  const newUser = {
    _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    avatar: name.trim().charAt(0).toUpperCase(),
    phone: '',
    college: '',
    targetYear: '2025',
    targetNit: 'NIT Trichy',
    mathLevel: 'Basic / Weak (Building Fundamentals)',
    aimRank: 'AIR 1',
    bio: '',
    authProvider: 'local',
    googleId: '',
    role: 'student',
    createdAt: new Date().toISOString(),
    answers: {},
    progress: {
      sub_math: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
      sub_analytical: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
      sub_computer: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
      sub_english: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 }
    },
    recentActivity: [],
    bookmarkedQuestions: [],
    mockTestHistory: []
  };
  store.users.push(newUser);
  return newUser;
};

const googleAuthUser = ({ email, name, avatar, googleId }) => {
  let user = findUserByEmail(email);
  if (!user) {
    user = {
      _id: 'user_google_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: name ? name.trim() : 'Google Student',
      email: email.trim().toLowerCase(),
      avatar: avatar || (name ? name.trim().charAt(0).toUpperCase() : 'G'),
      phone: '',
      college: '',
      targetYear: '2025',
      targetNit: 'NIT Trichy',
      mathLevel: 'Basic / Weak (Building Fundamentals)',
      aimRank: 'AIR 1',
      bio: 'Preparing for NIMCET AIR 1 with dedicated DILR and Mathematics practice.',
      authProvider: 'google',
      googleId: googleId || '',
      role: 'student',
      createdAt: new Date().toISOString(),
      answers: {},
      progress: {
        sub_math: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
        sub_analytical: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
        sub_computer: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 },
        sub_english: { questionsAttempted: 0, questionsCorrect: 0, totalTimeSpent: 0 }
      },
      recentActivity: [],
      bookmarkedQuestions: [],
      mockTestHistory: []
    };
    store.users.push(user);
  } else {
    if (avatar && (!user.avatar || !user.avatar.startsWith('http'))) {
      user.avatar = avatar;
    }
    if (googleId) user.googleId = googleId;
  }
  return user;
};

const recordUserAnswer = (userId, question, selectedAnswer, isCorrect) => {
  let user = findUserById(userId);
  if (!user) {
    user = {
      _id: userId || 'guest_user',
      name: 'Student',
      email: 'student@nimcet.com',
      answers: {},
      progress: {},
      recentActivity: [],
      mockTestHistory: []
    };
    store.users.push(user);
  }

  if (!user.answers) user.answers = {};
  if (!user.progress) user.progress = {};
  if (!user.recentActivity) user.recentActivity = [];

  const now = new Date().toISOString();
  const subId = (question.subjectId && question.subjectId._id) ? question.subjectId._id : (question.subjectId || 'sub_math');
  const chId = (question.chapterId && question.chapterId._id) ? question.chapterId._id : question.chapterId;
  const topId = (question.topicId && question.topicId._id) ? question.topicId._id : question.topicId;

  const sub = store.subjects.find(s => s._id === subId);
  const ch = store.chapters.find(c => c._id === chId);
  const top = store.topics.find(t => t._id === topId);

  const prevAnswer = user.answers[question._id];
  const isFirstAttempt = !prevAnswer;

  user.answers[question._id] = {
    questionId: question._id,
    selectedAnswer,
    isCorrect,
    subjectId: subId,
    chapterId: chId,
    topicId: topId,
    timestamp: now
  };

  // Initialize subject progress if needed
  if (!user.progress[subId]) {
    user.progress[subId] = {
      questionsAttempted: 0,
      questionsCorrect: 0,
      totalTimeSpent: 0
    };
  }

  if (isFirstAttempt) {
    user.progress[subId].questionsAttempted += 1;
    if (isCorrect) user.progress[subId].questionsCorrect += 1;
    user.progress[subId].totalTimeSpent += 90; // ~90 sec estimated per question
  } else if (prevAnswer.isCorrect !== isCorrect) {
    // Answer was changed
    if (isCorrect && !prevAnswer.isCorrect) {
      user.progress[subId].questionsCorrect += 1;
    } else if (!isCorrect && prevAnswer.isCorrect) {
      user.progress[subId].questionsCorrect = Math.max(0, user.progress[subId].questionsCorrect - 1);
    }
  }

  // Activity title and detail
  const title = (top && top.name) || (ch && ch.name) || (sub && sub.name) || 'Practice Question';
  const activityItem = {
    id: 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    questionId: question._id,
    title,
    topicName: (top && top.name) || 'Topic Practice',
    subjectName: (sub && sub.name) || 'Subject Practice',
    subjectId: subId,
    topicId: topId,
    isCorrect,
    selectedAnswer,
    score: isCorrect ? '+4 (Correct)' : '-1 (Incorrect)',
    time: 'Just now',
    timestamp: now
  };

  user.recentActivity.unshift(activityItem);
  if (user.recentActivity.length > 50) {
    user.recentActivity = user.recentActivity.slice(0, 50);
  }

  return user;
};

// Calculate real dynamic stats for user
const getUserStats = (userId) => {
  const user = findUserById(userId);
  if (!user) {
    return {
      totalQuestions: 0,
      totalQuestionsAttempted: 0,
      totalQuestionsCorrect: 0,
      accuracy: 0,
      timeSpent: 0,
      currentStreak: 0,
      streak: 0,
      performanceTrend: [
        { name: 'Mon', accuracy: 0 },
        { name: 'Tue', accuracy: 0 },
        { name: 'Wed', accuracy: 0 },
        { name: 'Thu', accuracy: 0 },
        { name: 'Fri', accuracy: 0 },
        { name: 'Sat', accuracy: 0 },
        { name: 'Sun', accuracy: 0 }
      ]
    };
  }

  const answers = user.answers ? Object.values(user.answers) : [];
  const totalAttempted = answers.length;
  const totalCorrect = answers.filter(a => a.isCorrect).length;
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  let totalSeconds = totalAttempted * 90;
  if (user.mockTestHistory && user.mockTestHistory.length > 0) {
    user.mockTestHistory.forEach(t => {
      totalSeconds += (t.timeTaken || 0);
    });
  }
  const timeSpentHours = Math.round((totalSeconds / 3600) * 10) / 10;

  // Real 7-day trend based on user answers
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const trend = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dayStr = d.toISOString().split('T')[0];
    const dayName = daysOfWeek[d.getDay()];

    const dayAnswers = answers.filter(a => a.timestamp && a.timestamp.startsWith(dayStr));
    let dayAcc = 0;
    if (dayAnswers.length > 0) {
      const dayCorrect = dayAnswers.filter(a => a.isCorrect).length;
      dayAcc = Math.round((dayCorrect / dayAnswers.length) * 100);
    } else if (i === 0 && totalAttempted > 0) {
      dayAcc = accuracy;
    }
    trend.push({ name: dayName, accuracy: dayAcc });
  }

  return {
    totalQuestions: totalAttempted,
    totalQuestionsAttempted: totalAttempted,
    totalQuestionsCorrect: totalCorrect,
    accuracy,
    timeSpent: timeSpentHours,
    currentStreak: totalAttempted > 0 ? 1 : 0,
    streak: totalAttempted > 0 ? 1 : 0,
    performanceTrend: trend
  };
};

// Calculate real dynamic syllabus progress by subject
const getUserSubjectProgress = (userId) => {
  const user = findUserById(userId);
  const answers = (user && user.answers) ? Object.values(user.answers) : [];

  const subjectMeta = [
    { _id: 'sub_math', name: 'Mathematics', color: '#4F46E5' },
    { _id: 'sub_analytical', name: 'Analytical Ability', color: '#059669' },
    { _id: 'sub_computer', name: 'Computer Awareness', color: '#DC2626' },
    { _id: 'sub_english', name: 'General English', color: '#D97706' }
  ];

  return subjectMeta.map(sub => {
    const totalSubjectQuestions = store.questions.filter(q => q.subjectId === sub._id).length || 1;
    const attemptedInSub = answers.filter(a => a.subjectId === sub._id).length;
    const correctInSub = answers.filter(a => a.subjectId === sub._id && a.isCorrect).length;

    const progressPercent = Math.min(100, Math.round((attemptedInSub / totalSubjectQuestions) * 100));
    const accuracy = attemptedInSub > 0 ? Math.round((correctInSub / attemptedInSub) * 100) : 0;

    return {
      _id: sub._id,
      name: sub.name,
      progress: progressPercent,
      attempted: attemptedInSub,
      total: totalSubjectQuestions,
      correct: correctInSub,
      accuracy,
      color: sub.color
    };
  });
};

// Get user's recent activity
const getUserRecentActivity = (userId) => {
  const user = findUserById(userId);
  if (!user || !user.recentActivity) return [];
  return user.recentActivity.slice(0, 10);
};

// Get user's weak / focus areas
const getUserWeakAreas = (userId) => {
  const user = findUserById(userId);
  if (!user || !user.answers) return [];

  const answers = Object.values(user.answers);
  const topicStats = {};

  answers.forEach(a => {
    if (!a.topicId) return;
    if (!topicStats[a.topicId]) {
      topicStats[a.topicId] = { attempted: 0, correct: 0, subjectId: a.subjectId };
    }
    topicStats[a.topicId].attempted += 1;
    if (a.isCorrect) topicStats[a.topicId].correct += 1;
  });

  const weak = [];
  for (const [topId, s] of Object.entries(topicStats)) {
    const acc = Math.round((s.correct / s.attempted) * 100);
    if (acc < 75) {
      const top = store.topics.find(t => t._id === topId);
      const sub = store.subjects.find(sb => sb._id === s.subjectId);
      if (top) {
        weak.push({
          topicId: topId,
          topicName: top.name,
          subjectName: sub ? sub.name : 'Mathematics',
          accuracy: acc,
          attempted: s.attempted
        });
      }
    }
  }

  return weak.sort((a, b) => a.accuracy - b.accuracy).slice(0, 4);
};

// Get all answers submitted by user
const getUserAnswers = (userId) => {
  const user = findUserById(userId);
  return user?.answers || {};
};

module.exports = {
  store,
  isMongooseConnected,
  findUserById,
  findUserByEmail,
  createUser,
  googleAuthUser,
  recordUserAnswer,
  getUserStats,
  getUserSubjectProgress,
  getUserRecentActivity,
  getUserWeakAreas,
  getUserAnswers
};
