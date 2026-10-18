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

async function importPaper2026() {
  const jsonPath = path.join(__dirname, 'data/nimcet_2026.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`File not found: ${jsonPath}`);
  }

  const paperData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log(`\n========================================`);
  console.log(`Importing NIMCET ${paperData.year} (${paperData.questions.length} questions)...`);
  console.log(`========================================`);

  const subjects = await Subject.find();
  const chapters = await Chapter.find();
  const topics = await Topic.find();

  console.log(`Found ${subjects.length} subjects, ${chapters.length} chapters, ${topics.length} topics in DB.`);

  const subjectMap = {
    'Mathematics': subjects.find(s => s.name.toLowerCase().includes('math')),
    'Analytical Ability': subjects.find(s => s.name.toLowerCase().includes('analytical') || s.name.toLowerCase().includes('reasoning')),
    'Computer Awareness': subjects.find(s => s.name.toLowerCase().includes('computer')),
    'General English': subjects.find(s => s.name.toLowerCase().includes('english'))
  };

  // Clear existing questions for year 2026
  const del = await Question.deleteMany({ year: paperData.year });
  console.log(`Cleared ${del.deletedCount} existing records for year ${paperData.year}.`);

  const docsToInsert = [];

  for (const q of paperData.questions) {
    let sub = subjectMap[q.subject];
    if (!sub) {
      if (q.questionNumber <= 47) sub = subjectMap['Mathematics'];
      else if (q.questionNumber <= 58) sub = subjectMap['Computer Awareness'];
      else if (q.questionNumber <= 82) sub = subjectMap['Analytical Ability'];
      else if (q.questionNumber <= 84) sub = subjectMap['General English'];
      else sub = subjectMap['Computer Awareness'];
    }

    const subChapters = chapters.filter(c => c.subjectId && c.subjectId.toString() === sub._id.toString());
    let matchedChapter = subChapters.find(c => q.chapter && c.name.toLowerCase().includes(q.chapter.toLowerCase()));
    if (!matchedChapter && subChapters.length > 0) {
      matchedChapter = subChapters[0];
    }

    let matchedTopic = topics.find(t => matchedChapter && t.chapterId && t.chapterId.toString() === matchedChapter._id.toString());
    if (!matchedTopic && topics.length > 0) {
      matchedTopic = topics[0];
    }

    docsToInsert.push({
      topicId: matchedTopic ? matchedTopic._id : topics[0]._id,
      chapterId: matchedChapter ? matchedChapter._id : (subChapters[0] ? subChapters[0]._id : chapters[0]._id),
      subjectId: sub._id,
      year: paperData.year,
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty || 'moderate',
      explanation: q.explanation || {
        summary: `Official solution for Question ${q.questionNumber} of NIMCET ${paperData.year}.`,
        stepByStep: [{ stepNumber: 1, title: 'Concept Solution', content: q.questionText, formula: '', calculation: '' }]
      },
      tags: ['nimcet-official', `nimcet-${paperData.year}`, q.chapter || 'past-paper', 'maarula-paper'],
      isFromPreviousYear: true
    });
  }

  const result = await Question.insertMany(docsToInsert);
  console.log(`✅ NIMCET ${paperData.year}: Successfully loaded ${result.length} questions into MongoDB Atlas!`);
  return result.length;
}

async function main() {
  let mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI is missing!');

  if (mongoUri.startsWith('mongodb+srv://')) {
    if (mongoUri.includes('.mongodb.net/?')) {
      mongoUri = mongoUri.replace('.mongodb.net/?', '.mongodb.net/nimcet_prep?');
    } else if (mongoUri.endsWith('.mongodb.net/')) {
      mongoUri = mongoUri + 'nimcet_prep?retryWrites=true&w=majority';
    } else if (mongoUri.endsWith('.mongodb.net')) {
      mongoUri = mongoUri + '/nimcet_prep?retryWrites=true&w=majority';
    }
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 25000 });
  console.log('Connected!');

  await importPaper2026();

  const total2026 = await Question.countDocuments({ year: 2026 });
  const grandTotal = await Question.countDocuments();
  console.log(`\n🎉 Total Questions for 2026: ${total2026}`);
  console.log(`🎉 Grand Total Questions in MongoDB Atlas now: ${grandTotal}`);

  await mongoose.disconnect();
  console.log('Disconnected cleanly.');
}

main().catch(err => {
  console.error('Import Error:', err);
  process.exit(1);
});
