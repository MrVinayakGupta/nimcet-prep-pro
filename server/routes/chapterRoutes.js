const express = require('express');
const router = express.Router();
const { getChaptersBySubject, getChapterById } = require('../controllers/chapterController');

router.get('/subject/:subjectId', getChaptersBySubject);
router.get('/:chapterId', getChapterById);

module.exports = router;
