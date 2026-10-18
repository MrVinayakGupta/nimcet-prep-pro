const { subjects, chapters, topics, questions } = require('../seed/seedData');
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Question = require('../models/Question');

async function autoSeed() {
  const subjectMap = {};
  const chapterMap = {};
  const topicMap = {};

  for (const sub of subjects) {
    const { _id, ...subData } = sub;
    const newSub = await Subject.create(subData);
    subjectMap[_id] = newSub._id;
  }

  for (const ch of chapters) {
    const { _id, subjectId, ...chData } = ch;
    chData.subjectId = subjectMap[subjectId];
    const newCh = await Chapter.create(chData);
    chapterMap[_id] = newCh._id;
  }

  const chapterToSubjectStr = {};
  for (const ch of chapters) {
    chapterToSubjectStr[ch._id] = ch.subjectId;
  }

  for (const top of topics) {
    const { _id, chapterId, subjectId: topSubjectId, prerequisites, ...topData } = top;
    if (prerequisites && Array.isArray(prerequisites)) {
      topData.prerequisites = prerequisites.map(p => ({
        topicName: p,
        description: `Prerequisite: ${p}`
      }));
    }
    topData.chapterId = chapterMap[chapterId];
    const derivedSubjectStr = topSubjectId || chapterToSubjectStr[chapterId];
    topData.subjectId = subjectMap[derivedSubjectStr];
    const newTop = await Topic.create(topData);
    topicMap[_id] = newTop._id;
  }

  for (const q of questions) {
    const { _id, topicId, chapterId, subjectId, ...qData } = q;
    qData.topicId = topicMap[topicId];
    qData.chapterId = chapterMap[chapterId];
    qData.subjectId = subjectMap[subjectId];
    await Question.create(qData);
  }
}

module.exports = { autoSeed };
