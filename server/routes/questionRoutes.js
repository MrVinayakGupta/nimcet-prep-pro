const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/questionController');
const { optionalProtect } = require('../middleware/auth');

router.get('/bookmarks', optionalProtect, getBookmarkedQuestions);
router.get('/years', getAvailableYears);
router.get('/cat', getCatQuestions);
router.get('/year/:year', getQuestionsByYear);
router.get('/user/answers', optionalProtect, getUserAnswersList);

router.get('/topic/:topicId', getQuestionsByTopic);
router.get('/chapter/:chapterId', getQuestionsByChapter);
router.get('/subject/:subjectId', getQuestionsBySubject);
router.get('/topic/:topicId/stats', getTopicStats);
router.get('/:questionId', getQuestionById);

router.post('/:questionId/submit', optionalProtect, submitAnswer);
router.post('/:questionId/bookmark', optionalProtect, toggleBookmark);

module.exports = router;
