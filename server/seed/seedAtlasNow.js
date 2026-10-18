require('dotenv').config();
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}
const mongoose = require('mongoose');
const { subjects, chapters, topics, questions } = require('./seedData');
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Question = require('../models/Question');

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 20000 });
    console.log('Connected to Atlas successfully.');

    console.log('Cleaning collections...');
    await Subject.deleteMany({});
    await Chapter.deleteMany({});
    await Topic.deleteMany({});
    await Question.deleteMany({});

    const subMap = {};
    console.log('Inserting 4 subjects...');
    for (const s of subjects) {
      const { _id, ...sData } = s;
      const created = await Subject.create(sData);
      subMap[_id] = created._id;
    }

    const chMap = {};
    const chSubjectMap = {};
    console.log('Inserting 36 chapters...');
    for (const c of chapters) {
      const { _id, subjectId, ...cData } = c;
      cData.subjectId = subMap[subjectId];
      chSubjectMap[_id] = cData.subjectId;
      const created = await Chapter.create(cData);
      chMap[_id] = created._id;
    }

    const topMap = {};
    console.log('Inserting 108 topics...');
    for (const t of topics) {
      const { _id, chapterId, subjectId, prerequisites, ...tData } = t;
      tData.chapterId = chMap[chapterId];
      tData.subjectId = chSubjectMap[chapterId];
      if (prerequisites && Array.isArray(prerequisites)) {
        tData.prerequisites = prerequisites.map(p => ({
          topicName: typeof p === 'string' ? p : p.topicName,
          description: typeof p === 'string' ? p : p.description
        }));
      }
      const created = await Topic.create(tData);
      topMap[_id] = created._id;
    }

    console.log(`Inserting ${questions.length} questions (years 2015 to 2026)...`);
    const formattedQuestions = questions.map(q => {
      const { _id, topicId, chapterId, subjectId, ...qData } = q;
      return {
        ...qData,
        topicId: topMap[topicId],
        chapterId: chMap[chapterId],
        subjectId: subMap[subjectId]
      };
    });

    // Insert in chunks of 100 for maximum reliability
    const chunkSize = 100;
    for (let i = 0; i < formattedQuestions.length; i += chunkSize) {
      const chunk = formattedQuestions.slice(i, i + chunkSize);
      await Question.insertMany(chunk);
      console.log(`Inserted batch ${Math.floor(i / chunkSize) + 1} of ${Math.ceil(formattedQuestions.length / chunkSize)}`);
    }

    const count = await Question.countDocuments();
    const years = await Question.distinct('year');
    console.log(`🎉 SUCCESS: Atlas now has ${count} questions across years:`, years.sort((a,b) => b-a));
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from Atlas.');
    process.exit(0);
  }
}

seed();
