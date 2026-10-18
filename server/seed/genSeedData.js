const fs = require('fs');
const path = require('path');

const subjects = [
  { _id: 'sub_math', name: 'Mathematics', icon: '📐', color: '#4F46E5', description: 'Algebra, Calculus, Probability, and more', order: 1 },
  { _id: 'sub_analytical', name: 'Analytical Ability & Logical Reasoning', icon: '🧩', color: '#059669', description: 'Logical reasoning, puzzles, and analytical thinking', order: 2 },
  { _id: 'sub_computer', name: 'Computer Awareness', icon: '💻', color: '#DC2626', description: 'Computer fundamentals, networking, and basics', order: 3 },
  { _id: 'sub_english', name: 'General English', icon: '📝', color: '#D97706', description: 'Grammar, vocabulary, comprehension', order: 4 }
];

const mathChapterNames = [
  "Set Theory & Relations", "Functions", "Trigonometry", "Algebra (Quadratic Equations, Complex Numbers)",
  "Matrices & Determinants", "Sequences & Series (AP, GP, HP)", "Differential Calculus (Limits, Continuity, Derivatives)",
  "Integral Calculus", "Differential Equations", "Probability & Statistics", "Linear Programming",
  "Coordinate Geometry (2D & 3D)", "Vectors", "Number System & Divisibility"
];
const analyticalChapterNames = [
  "Number Series & Patterns", "Blood Relations", "Direction Sense", "Coding-Decoding", "Syllogisms",
  "Data Interpretation (Tables, Graphs)", "Puzzles & Seating Arrangements", "Clocks & Calendars",
  "Venn Diagrams", "Statement & Conclusions"
];
const computerChapterNames = [
  "Computer Fundamentals & History", "Number Systems (Binary, Octal, Hex)", "Operating Systems Basics",
  "Networking & Internet", "Database Basics", "Programming Fundamentals"
];
const englishChapterNames = [
  "Reading Comprehension", "Grammar (Tenses, Articles, Prepositions)", "Vocabulary & Synonyms/Antonyms",
  "Sentence Correction & Rearrangement", "Idioms & Phrases", "Fill in the Blanks"
];

let chapters = [];
let topics = [];
let questions = [];

function createChapters(subjectId, names, startIndex) {
  return names.map((name, idx) => ({
    _id: `ch_${subjectId}_${idx+1}`,
    subjectId,
    name,
    description: `Comprehensive coverage of ${name}`,
    order: startIndex + idx
  }));
}

chapters = [
  ...createChapters('sub_math', mathChapterNames, 1),
  ...createChapters('sub_analytical', analyticalChapterNames, 100),
  ...createChapters('sub_computer', computerChapterNames, 200),
  ...createChapters('sub_english', englishChapterNames, 300)
];

// Generate topics
chapters.forEach(ch => {
  for (let i = 1; i <= 3; i++) {
    topics.push({
      _id: `top_${ch._id}_${i}`,
      chapterId: ch._id,
      name: `${ch.name} Concepts Part ${i}`,
      description: `Fundamental principles of ${ch.name}, section ${i}`,
      prerequisites: ['Basic Math', 'Logical Thinking'],
      order: i
    });
  }
});

// Seed some high-quality math questions
let qId = 1;
function getMathExplanation(a, b, unionResult, common) {
    return {
        summary: 'The union of sets A and B contains all elements that are in A or B or both.',
        prerequisites: [
            { topic: 'Set Notation', description: 'Understanding of how sets are represented', importance: 'essential' },
            { topic: 'Union Operation', description: 'The union symbol ∪ means combining all elements', importance: 'essential' }
        ],
        stepByStep: [
            { stepNumber: 1, title: 'Identify the sets', content: `We have A = {${a}} and B = {${b}}`, formula: `A = \\{${a}\\}, B = \\{${b}\\}`, calculation: '' },
            { stepNumber: 2, title: 'Apply Union Definition', content: 'Union means taking ALL elements from both sets without repetition', formula: 'A \\cup B = \\{x : x \\in A \\text{ or } x \\in B\\}', calculation: `Elements: ${a.split(',')[0]} (from A), ${common} (common), etc.` },
            { stepNumber: 3, title: 'Write the result', content: 'Combine all unique elements', formula: `A \\cup B = \\{${unionResult}\\}`, calculation: '' }
        ],
        conceptUsed: 'Set Theory - Union of Sets',
        tips: ['Always remember: Union = ALL elements, Intersection = COMMON elements', 'No element is repeated in a set'],
        commonMistakes: ['Confusing union with intersection', 'Repeating common elements']
    };
}

for(let i=0; i<60; i++) {
  let a = [1+i, 2+i, 3+i].join(', ');
  let b = [2+i, 3+i, 4+i].join(', ');
  let u = [1+i, 2+i, 3+i, 4+i].join(', ');
  questions.push({
    topicId: `top_ch_sub_math_1_1`,
    chapterId: `ch_sub_math_1`,
    subjectId: 'sub_math',
    year: 2020 + (i % 5),
    questionNumber: qId++,
    questionText: `If $A = \\{${a}\\}$ and $B = \\{${b}\\}$, find $A \\cup B$.`,
    options: [
      { id: 'A', text: `$\\{${u}\\}$` },
      { id: 'B', text: `$\\{${[2+i, 3+i].join(', ')}\\}$` },
      { id: 'C', text: `$\\{${[1+i, 4+i].join(', ')}\\}$` },
      { id: 'D', text: `$\\{${[1+i, 2+i, 3+i, 4+i, 5+i].join(', ')}\\}$` }
    ],
    correctAnswer: 'A',
    difficulty: 'easy',
    explanation: getMathExplanation(a, b, u, `${2+i}, ${3+i}`),
    tags: ['set-theory', 'union', 'basic-operations'],
    isFromPreviousYear: true
  });
}

// Generate Analytical (30)
for(let i=0; i<30; i++) {
  questions.push({
    topicId: `top_ch_sub_analytical_1_1`,
    chapterId: `ch_sub_analytical_1`,
    subjectId: 'sub_analytical',
    year: 2023,
    questionNumber: qId++,
    questionText: `Find the next number in the series: ${i+1}, ${i+3}, ${i+5}, ${i+7}, ?`,
    options: [
      { id: 'A', text: `${i+8}` },
      { id: 'B', text: `${i+9}` },
      { id: 'C', text: `${i+10}` },
      { id: 'D', text: `${i+11}` }
    ],
    correctAnswer: 'B',
    difficulty: 'easy',
    explanation: {
      summary: 'The difference between consecutive terms is constant.',
      prerequisites: [{ topic: 'Basic Arithmetic', description: 'Addition', importance: 'essential' }],
      stepByStep: [{ stepNumber: 1, title: 'Find difference', content: 'Each number increases by 2.', formula: 'd = 2', calculation: `${i+3} - ${i+1} = 2` }],
      conceptUsed: 'Arithmetic Progression',
      tips: ['Look for common differences first.'],
      commonMistakes: ['Miscalculating simple addition.']
    },
    tags: ['series', 'reasoning'],
    isFromPreviousYear: false
  });
}

// Generate Computer (15)
for(let i=0; i<15; i++) {
  questions.push({
    topicId: `top_ch_sub_computer_1_1`,
    chapterId: `ch_sub_computer_1`,
    subjectId: 'sub_computer',
    year: 2022,
    questionNumber: qId++,
    questionText: `What does RAM stand for in computer memory (${i})?`,
    options: [
      { id: 'A', text: 'Read Access Memory' },
      { id: 'B', text: 'Random Access Memory' },
      { id: 'C', text: 'Run Access Memory' },
      { id: 'D', text: 'Real Access Memory' }
    ],
    correctAnswer: 'B',
    difficulty: 'easy',
    explanation: {
      summary: 'RAM stands for Random Access Memory.',
      prerequisites: [{ topic: 'Hardware basics', description: 'Memory types', importance: 'essential' }],
      stepByStep: [{ stepNumber: 1, title: 'Acronym', content: 'R=Random, A=Access, M=Memory.', formula: '', calculation: '' }],
      conceptUsed: 'Memory basics',
      tips: ['RAM is volatile memory.'],
      commonMistakes: ['Confusing with ROM.']
    },
    tags: ['memory', 'basics'],
    isFromPreviousYear: false
  });
}

// Generate English (15)
for(let i=0; i<15; i++) {
  questions.push({
    topicId: `top_ch_sub_english_2_1`,
    chapterId: `ch_sub_english_2`,
    subjectId: 'sub_english',
    year: 2021,
    questionNumber: qId++,
    questionText: `Choose the correct article: She is ___ honest woman. (${i})`,
    options: [
      { id: 'A', text: 'a' },
      { id: 'B', text: 'an' },
      { id: 'C', text: 'the' },
      { id: 'D', text: 'no article' }
    ],
    correctAnswer: 'B',
    difficulty: 'easy',
    explanation: {
      summary: 'Use "an" before a vowel sound.',
      prerequisites: [{ topic: 'Articles', description: 'A vs An', importance: 'essential' }],
      stepByStep: [{ stepNumber: 1, title: 'Sound check', content: 'Honest starts with a vowel sound (o).', formula: '', calculation: '' }],
      conceptUsed: 'Grammar - Articles',
      tips: ['Focus on sound, not spelling.'],
      commonMistakes: ['Using "a" because H is a consonant.']
    },
    tags: ['grammar', 'articles'],
    isFromPreviousYear: false
  });
}

const fileContent = `
const subjects = ${JSON.stringify(subjects, null, 2)};
const chapters = ${JSON.stringify(chapters, null, 2)};
const topics = ${JSON.stringify(topics, null, 2)};
const questions = ${JSON.stringify(questions, null, 2)};

module.exports = {
  subjects,
  chapters,
  topics,
  questions
};
`;

fs.writeFileSync(path.join(__dirname, 'seedData.js'), fileContent);
console.log('Successfully generated seedData.js');
