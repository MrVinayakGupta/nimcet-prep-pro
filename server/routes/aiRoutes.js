const express = require('express');
const router = express.Router();
const { explainQuestion } = require('../controllers/aiController');
const { optionalProtect } = require('../middleware/auth');

router.post('/explain', optionalProtect, explainQuestion);

module.exports = router;
