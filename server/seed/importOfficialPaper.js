const mongoose = require('mongoose');
const dns = require('dns');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Question = require('../models/Question');

/**
 * NIMCET Official 120-Question Paper Blueprint:
 * - Mathematics: Questions 1 to 50 (50 Questions x 12 Marks = 600 Marks, -3 Negative)
 * - Analytical Ability & Logical Reasoning: Questions 51 to 90 (40 Questions x 6 Marks = 240 Marks, -1.5 Negative)
 * - Computer Awareness: Questions 91 to 100 (10 Questions x 8 Marks = 80 Marks, -2 Negative)
 * - General English: Questions 101 to 120 (20 Questions x 4 Marks = 80 Marks, -1 Negative)
 * Total: 120 Questions = 1000 Marks
 */

async function importPaper(paperData) {
  try {
    let mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing from environment');
    }

    if (mongoUri.startsWith('mongodb+srv://')) {
      if (mongoUri.includes('.mongodb.net/?')) {
        mongoUri = mongoUri.replace('.mongodb.net/?', '.mongodb.net/nimcet_prep?');
      } else if (mongoUri.endsWith('.mongodb.net/')) {
        mongoUri = mongoUri + 'nimcet_prep?retryWrites=true&w=majority';
      } else if (mongoUri.endsWith('.mongodb.net')) {
        mongoUri = mongoUri + '/nimcet_prep?retryWrites=true&w=majority';
      }
    }

    console.log(`Connecting to MongoDB Atlas for importing NIMCET ${paperData.year} official paper...`);
    await mongoose.connect(mongoUri, { 
      serverSelectionTimeoutMS: 25000 
    });
    console.log('Connected to Atlas!');

    // Fetch existing subjects and chapters
    const subjects = await Subject.find();
    const chapters = await Chapter.find();
    const topics = await Topic.find();

    const subjectMap = {
      'Mathematics': subjects.find(s => s.name.toLowerCase().includes('math')),
      'Analytical Ability': subjects.find(s => s.name.toLowerCase().includes('analytical') || s.name.toLowerCase().includes('reasoning')),
      'Computer Awareness': subjects.find(s => s.name.toLowerCase().includes('computer')),
      'General English': subjects.find(s => s.name.toLowerCase().includes('english'))
    };

    console.log(`Found subjects in DB: Math=${!!subjectMap['Mathematics']}, Reasoning=${!!subjectMap['Analytical Ability']}, Computer=${!!subjectMap['Computer Awareness']}, English=${!!subjectMap['General English']}`);

    // Remove existing paper questions for this year if overwrite flag is true
    if (paperData.overwrite) {
      const delResult = await Question.deleteMany({ year: paperData.year, isFromPreviousYear: true });
      console.log(`Cleared ${delResult.deletedCount} existing questions for NIMCET ${paperData.year}.`);
    }

    const docsToInsert = [];

    for (const q of paperData.questions) {
      // Determine subject
      let sub = subjectMap[q.subject];
      if (!sub) {
        if (q.questionNumber <= 50) sub = subjectMap['Mathematics'];
        else if (q.questionNumber <= 90) sub = subjectMap['Analytical Ability'];
        else if (q.questionNumber <= 100) sub = subjectMap['Computer Awareness'];
        else sub = subjectMap['General English'];
      }

      // Find matching chapter or fallback to first chapter of subject
      const subChapters = chapters.filter(c => c.subjectId && c.subjectId.toString() === sub._id.toString());
      let matchedChapter = subChapters.find(c => q.chapter && c.name.toLowerCase().includes(q.chapter.toLowerCase()));
      if (!matchedChapter && subChapters.length > 0) {
        matchedChapter = subChapters[0];
      }

      // Find topic
      let matchedTopic = topics.find(t => matchedChapter && t.chapterId && t.chapterId.toString() === matchedChapter._id.toString());
      if (!matchedTopic && topics.length > 0) {
        matchedTopic = topics[0];
      }

      // Marking scheme based on NIMCET official format
      let positiveMarks = 12;
      let negativeMarks = 3;
      if (q.questionNumber > 50 && q.questionNumber <= 90) {
        positiveMarks = 6;
        negativeMarks = 1.5;
      } else if (q.questionNumber > 90 && q.questionNumber <= 100) {
        positiveMarks = 8;
        negativeMarks = 2;
      } else if (q.questionNumber > 100) {
        positiveMarks = 4;
        negativeMarks = 1;
      }

      docsToInsert.push({
        topicId: matchedTopic._id,
        chapterId: matchedChapter ? matchedChapter._id : subChapters[0]._id,
        subjectId: sub._id,
        year: paperData.year,
        questionNumber: q.questionNumber,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        difficulty: q.difficulty || 'moderate',
        explanation: q.explanation || {
          summary: `Step-by-step solution for NIMCET ${paperData.year} official Question ${q.questionNumber}.`,
          stepByStep: [{ stepNumber: 1, title: 'Concept & Solution', content: q.solution || 'Refer to standard formula.', formula: '', calculation: '' }]
        },
        tags: ['nimcet-official', `nimcet-${paperData.year}`, q.chapter || 'past-paper'],
        isFromPreviousYear: true
      });
    }

    console.log(`Inserting ${docsToInsert.length} official questions for NIMCET ${paperData.year}...`);
    const result = await Question.insertMany(docsToInsert);
    console.log(`Successfully imported ${result.length} questions into MongoDB Atlas!`);

    await mongoose.disconnect();
    console.log('MongoDB connection closed cleanly.');
    return result.length;
  } catch (error) {
    console.error('Import Error:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

module.exports = { importPaper };
