const express = require('express');
const router = express.Router();
const { getTopicsByChapter, getTopicById } = require('../controllers/topicController');

router.get('/chapter/:chapterId', getTopicsByChapter);
router.get('/:topicId', getTopicById);

module.exports = router;
