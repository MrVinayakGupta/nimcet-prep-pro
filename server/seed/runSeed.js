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

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nimcet_prep';

async function runSeed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected.');

    console.log('Clearing existing data...');
    await Subject.deleteMany({});
    await Chapter.deleteMany({});
    await Topic.deleteMany({});
    await Question.deleteMany({});

    const subjectMap = {};
    const chapterMap = {};
    const topicMap = {};

    console.log('Inserting subjects...');
    for (const sub of subjects) {
      const { _id, ...subData } = sub;
      const newSub = await Subject.create(subData);
      subjectMap[_id] = newSub._id;
    }

    console.log('Inserting chapters...');
    for (const ch of chapters) {
      const { _id, subjectId, ...chData } = ch;
      chData.subjectId = subjectMap[subjectId];
      if (!chData.subjectId) throw new Error(`Missing subject map for ${subjectId}`);
      
      const newCh = await Chapter.create(chData);
      chapterMap[_id] = newCh._id;
    }

    // Build a reverse map from chapter string ID to subject string ID
    const chapterToSubjectStr = {};
    for (const ch of chapters) {
      chapterToSubjectStr[ch._id] = ch.subjectId;
    }

    console.log('Inserting topics...');
    for (const top of topics) {
      const { _id, chapterId, subjectId: topSubjectId, prerequisites, ...topData } = top;
      
      // Update prerequisites from String to { topicName: String, description: String }
      if (prerequisites && Array.isArray(prerequisites)) {
        topData.prerequisites = prerequisites.map(p => ({
          topicName: p,
          description: `Prerequisite: ${p}`
        }));
      }
      
      topData.chapterId = chapterMap[chapterId];
      if (!topData.chapterId) throw new Error(`Missing chapter map for ${chapterId}`);
      
      // Derive subjectId from the chapter's subject
      const derivedSubjectStr = topSubjectId || chapterToSubjectStr[chapterId];
      topData.subjectId = subjectMap[derivedSubjectStr];
      if (!topData.subjectId) throw new Error(`Missing subject map for topic ${_id}, subjectStr: ${derivedSubjectStr}`);
      
      const newTop = await Topic.create(topData);
      topicMap[_id] = newTop._id;
    }

    console.log('Inserting questions...');
    for (const q of questions) {
      const { _id, topicId, chapterId, subjectId, ...qData } = q;
      
      qData.topicId = topicMap[topicId];
      qData.chapterId = chapterMap[chapterId];
      qData.subjectId = subjectMap[subjectId];
      
      if (!qData.topicId && topicId) throw new Error(`Missing topic map for ${topicId}`);
      if (!qData.chapterId && chapterId) throw new Error(`Missing chapter map for ${chapterId}`);
      if (!qData.subjectId && subjectId) throw new Error(`Missing subject map for ${subjectId}`);

      await Question.create(qData);
    }

    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

runSeed();
