const express = require('express');
const router = express.Router();
const {
  generateMockTest,
  submitMockTest,
  getMockTestResult,
  getMockTestHistory
} = require('../controllers/mockTestController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/generate', generateMockTest);
router.get('/history', getMockTestHistory);
router.post('/:testId/submit', submitMockTest);
router.get('/:testId/result', getMockTestResult);

module.exports = router;
