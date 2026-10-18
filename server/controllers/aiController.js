const mongoose = require('mongoose');
const Question = require('../models/Question');
const { generateExplanation } = require('../utils/geminiAI');
const { store, isMongooseConnected } = require('../config/inMemoryStore');

const explainQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.body;
    
    let question;
    if (!isMongooseConnected(mongoose)) {
      question = store.questions.find(q => q._id === questionId);
    } else {
      question = await Question.findById(questionId);
    }

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    let explanationText = "";

    // If API key is available, call Gemini AI
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      try {
        const aiResult = await generateExplanation(question.questionText, question.options, question.correctAnswer);
        if (aiResult && aiResult.summary && !aiResult.summary.includes('failed')) {
          explanationText = `💡 AI Tutor Breakdown:\n${aiResult.summary}\n\nConcept: ${aiResult.conceptUsed || 'NIMCET Core Concept'}`;
          if (aiResult.tips && aiResult.tips.length > 0) {
            explanationText += `\n\n📌 Pro Tip: ${aiResult.tips.join(' ')}`;
          }
        }
      } catch (err) {
        console.warn('Gemini API call skipped/failed, using structured solution:', err.message);
      }
    }

    // Fallback to the rich built-in mathematical step-by-step explanation
    if (!explanationText && question.explanation) {
      const exp = question.explanation;
      explanationText = `🤖 AI Step-by-Step Guidance:\n${exp.summary || ''}\n\nKey Concept: ${exp.conceptUsed || 'Mathematical Core'}`;
      if (exp.stepByStep && exp.stepByStep.length > 0) {
        const steps = exp.stepByStep.map(s => `Step ${s.stepNumber} (${s.title}): ${s.content} ${s.formula ? '$' + s.formula + '$' : ''} ${s.calculation || ''}`).join('\n');
        explanationText += `\n\nSolution Walkthrough:\n${steps}`;
      }
      if (exp.tips && exp.tips.length > 0) {
        explanationText += `\n\n⚡ Exam Tip: ${exp.tips.join(', ')}`;
      }
      if (exp.commonMistakes && exp.commonMistakes.length > 0) {
        explanationText += `\n\n⚠️ Caution (Common Mistake): ${exp.commonMistakes.join(', ')}`;
      }
    }

    res.json({
      explanation: explanationText || "Step-by-step breakdown: Analyze the given question, identify fundamental definitions, and evaluate line-by-line."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { explainQuestion };
