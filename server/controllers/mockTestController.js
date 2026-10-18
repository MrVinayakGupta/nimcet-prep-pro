const mongoose = require('mongoose');
const MockTest = require('../models/MockTest');
const Question = require('../models/Question');
const User = require('../models/User');
const { store, isMongooseConnected } = require('../config/inMemoryStore');

const generateMockTest = async (req, res, next) => {
  try {
    const { numberOfQuestions, subjects, difficultyMix } = req.body;
    const count = numberOfQuestions || 15;

    if (!isMongooseConnected(mongoose)) {
      let pool = store.questions;
      if (subjects && subjects.length > 0) {
        pool = pool.filter(q => subjects.includes(q.subjectId));
      }
      const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);
      const testQuestions = shuffled.map(q => ({
        questionId: q,
        selectedAnswer: null,
        isCorrect: false,
        timeTaken: 0
      }));

      const newTest = {
        _id: 'test_' + Date.now(),
        userId: req.user?._id || 'guest',
        questions: testQuestions,
        totalQuestions: testQuestions.length,
        status: 'in-progress',
        createdAt: new Date().toISOString()
      };
      store.mockTests.push(newTest);
      return res.status(201).json(newTest);
    }

    const filter = {};
    if (subjects && subjects.length > 0) {
      filter.subjectId = { $in: subjects };
    }

    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: count } }
    ]);
    
    const testQuestions = questions.map(q => ({
      questionId: q._id,
      selectedAnswer: null,
      isCorrect: false,
      timeTaken: 0
    }));

    const mockTest = await MockTest.create({
      userId: req.user._id,
      questions: testQuestions,
      totalQuestions: testQuestions.length,
      status: 'in-progress'
    });

    res.status(201).json(mockTest);
  } catch (error) {
    next(error);
  }
};

const submitMockTest = async (req, res, next) => {
  try {
    const { answers, timeTaken } = req.body;

    if (!isMongooseConnected(mongoose)) {
      const test = store.mockTests.find(t => t._id === req.params.testId);
      if (!test) {
        return res.status(404).json({ message: 'Mock test not found' });
      }
      let score = 0;
      test.questions.forEach(tq => {
        const sub = (answers || []).find(a => a.questionId === (tq.questionId._id || tq.questionId));
        if (sub) {
          tq.selectedAnswer = sub.selectedAnswer;
          const qObj = typeof tq.questionId === 'object' ? tq.questionId : store.questions.find(q => q._id === tq.questionId);
          if (qObj && qObj.correctAnswer === sub.selectedAnswer) {
            tq.isCorrect = true;
            score += 1;
          }
        }
      });
      test.score = score;
      test.percentage = Math.round((score / test.totalQuestions) * 100);
      test.timeTaken = timeTaken || 0;
      test.status = 'completed';
      test.completedAt = new Date().toISOString();

      const user = store.users.find(u => u._id === req.user?._id);
      if (user) {
        if (!user.mockTestHistory) user.mockTestHistory = [];
        user.mockTestHistory.unshift({
          testId: test._id,
          score: test.score,
          totalQuestions: test.totalQuestions,
          percentage: test.percentage,
          timeTaken: test.timeTaken,
          date: test.completedAt
        });
      }

      return res.json(test);
    }

    const mockTest = await MockTest.findOne({ _id: req.params.testId, userId: req.user._id });
    if (!mockTest) {
      return res.status(404).json({ message: 'Mock test not found' });
    }

    let score = 0;
    for (let i = 0; i < mockTest.questions.length; i++) {
      const testQ = mockTest.questions[i];
      const submittedAnswer = answers.find(a => a.questionId === testQ.questionId.toString());
      
      if (submittedAnswer) {
        testQ.selectedAnswer = submittedAnswer.selectedAnswer;
        testQ.timeTaken = submittedAnswer.timeTaken;
        
        const question = await Question.findById(testQ.questionId);
        if (question && question.correctAnswer === submittedAnswer.selectedAnswer) {
          testQ.isCorrect = true;
          score += 1;
        } else {
          testQ.isCorrect = false;
        }
      }
    }

    mockTest.score = score;
    mockTest.percentage = (score / mockTest.totalQuestions) * 100;
    mockTest.timeTaken = timeTaken;
    mockTest.status = 'completed';
    mockTest.completedAt = Date.now();
    
    await mockTest.save();

    const user = await User.findById(req.user._id);
    if (user) {
      user.mockTestHistory.push({
        testId: mockTest._id,
        score: mockTest.score,
        totalQuestions: mockTest.totalQuestions,
        timeTaken: mockTest.timeTaken
      });
      await user.save();
    }

    res.json(mockTest);
  } catch (error) {
    next(error);
  }
};

const getMockTestResult = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const test = store.mockTests.find(t => t._id === req.params.testId);
      if (!test) return res.status(404).json({ message: 'Mock test not found' });
      return res.json(test);
    }

    const mockTest = await MockTest.findOne({ _id: req.params.testId, userId: req.user._id })
      .populate('questions.questionId');
      
    if (!mockTest) {
      return res.status(404).json({ message: 'Mock test not found' });
    }
    
    res.json(mockTest);
  } catch (error) {
    next(error);
  }
};

const getMockTestHistory = async (req, res, next) => {
  try {
    if (!isMongooseConnected(mongoose)) {
      const user = store.users.find(u => u._id === req.user?._id);
      return res.json(user?.mockTestHistory || []);
    }

    const history = await MockTest.find({ userId: req.user._id, status: 'completed' })
      .sort({ completedAt: -1 });
    res.json(history);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateMockTest,
  submitMockTest,
  getMockTestResult,
  getMockTestHistory
};
