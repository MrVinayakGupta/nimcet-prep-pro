const mongoose = require('mongoose');
const { store } = require('../config/inMemoryStore');

const SUBJECT_ALIASES = {
  sub_math: 'Mathematics',
  sub_analytical: 'Analytical Ability & Logical Reasoning',
  sub_computer: 'Computer Awareness',
  sub_english: 'General English',
  '6ac3cf03802e37c9c45fc2f4': 'Mathematics',
  '6ac3cf03802e37c9c45fc2f6': 'Analytical Ability & Logical Reasoning',
  '6ac3cf03802e37c9c45fc2f8': 'Computer Awareness',
  '6ac3cf03802e37c9c45fc2fa': 'General English'
};

const CHAPTER_OBJECTID_TO_NAME = {
  '6ac3cf04802e37c9c45fc2fc': 'Set Theory & Relations',
  '6ac3cf04802e37c9c45fc2fe': 'Functions',
  '6ac3cf04802e37c9c45fc300': 'Trigonometry',
  '6ac3cf04802e37c9c45fc302': 'Algebra (Quadratic Equations, Complex Numbers)',
  '6ac3cf04802e37c9c45fc304': 'Matrices & Determinants',
  '6ac3cf04802e37c9c45fc306': 'Sequences & Series (AP, GP, HP)',
  '6ac3cf04802e37c9c45fc308': 'Differential Calculus (Limits, Continuity, Derivatives)',
  '6ac3cf04802e37c9c45fc30a': 'Integral Calculus',
  '6ac3cf04802e37c9c45fc30c': 'Differential Equations',
  '6ac3cf04802e37c9c45fc30e': 'Probability & Statistics',
  '6ac3cf04802e37c9c45fc310': 'Linear Programming',
  '6ac3cf04802e37c9c45fc312': 'Coordinate Geometry (2D & 3D)',
  '6ac3cf04802e37c9c45fc314': 'Vectors',
  '6ac3cf04802e37c9c45fc316': 'Number System & Divisibility'
};

/**
 * Resolve any subject identifier (memory id, Mongo ObjectId, or name) to an inMemoryStore subject _id.
 */
function resolveMemorySubjectId(rawId) {
  if (!rawId) return rawId;
  if (store.subjects.some(s => s._id === rawId)) return rawId;
  const targetName = SUBJECT_ALIASES[rawId] || rawId;
  const match = store.subjects.find(s => s.name.toLowerCase() === targetName.toLowerCase());
  return match ? match._id : rawId;
}

/**
 * Resolve any chapter identifier (memory id, Mongo ObjectId, or name) to an inMemoryStore chapter _id.
 */
function resolveMemoryChapterId(rawId) {
  if (!rawId) return rawId;
  if (store.chapters.some(c => c._id === rawId)) return rawId;
  const targetName = CHAPTER_OBJECTID_TO_NAME[rawId] || rawId;
  const exact = store.chapters.find(c => c.name.toLowerCase() === targetName.toLowerCase());
  if (exact) return exact._id;
  const partial = store.chapters.find(c => c.name.toLowerCase().includes(targetName.toLowerCase()));
  return partial ? partial._id : rawId;
}

/**
 * Resolve any subject identifier to a MongoDB Subject ObjectId.
 */
async function resolveMongoSubjectId(rawId, SubjectModel) {
  if (!rawId) return null;
  if (mongoose.Types.ObjectId.isValid(rawId)) return rawId;
  const aliasName = SUBJECT_ALIASES[rawId];
  const found = await SubjectModel.findOne(
    aliasName ? { name: aliasName } : { name: new RegExp(rawId, 'i') }
  ).lean();
  return found ? found._id : null;
}

/**
 * Resolve any chapter identifier (including in-memory IDs like ch_sub_math_1) to a MongoDB Chapter ObjectId.
 */
async function resolveMongoChapterId(rawId, ChapterModel) {
  if (!rawId) return null;
  if (mongoose.Types.ObjectId.isValid(rawId)) return rawId;
  const memChapter = store.chapters.find(c => c._id === rawId);
  const query = memChapter
    ? { name: memChapter.name }
    : { name: new RegExp(rawId, 'i') };
  const found = await ChapterModel.findOne(query).lean();
  return found ? found._id : null;
}

module.exports = {
  SUBJECT_ALIASES,
  resolveMemorySubjectId,
  resolveMemoryChapterId,
  resolveMongoSubjectId,
  resolveMongoChapterId
};
