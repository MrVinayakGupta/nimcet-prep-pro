const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getSubjectProgress, 
  getRecentActivity,
  getWeakAreas 
} = require('../controllers/dashboardController');
const { optionalProtect } = require('../middleware/auth');

router.use(optionalProtect);

router.get('/stats', getDashboardStats);
router.get('/subject-progress', getSubjectProgress);
router.get('/recent-activity', getRecentActivity);
router.get('/weak-areas', getWeakAreas);

module.exports = router;
