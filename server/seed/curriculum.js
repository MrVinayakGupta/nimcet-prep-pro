const fs = require('fs');
const path = require('path');

const subjects = [
  { _id: 'sub_math', name: 'Mathematics', icon: '📐', color: '#4F46E5', description: '50 Questions (600 Marks) — Core focus for AIR 1', order: 1 },
  { _id: 'sub_analytical', name: 'Analytical Ability & Logical Reasoning', icon: '🧩', color: '#059669', description: '40 Questions (240 Marks) — Puzzles, Series & Logic', order: 2 },
  { _id: 'sub_computer', name: 'Computer Awareness', icon: '💻', color: '#DC2626', description: '10 Questions (80 Marks) — Binary, OS, Gates & Architecture', order: 3 },
  { _id: 'sub_english', name: 'General English', icon: '📝', color: '#D97706', description: '20 Questions (80 Marks) — Grammar, Vocabulary & Comprehension', order: 4 }
];

// 1. Math Chapters & Topics
const mathData = [
  {
    name: "Set Theory & Relations",
    topics: [
      { name: "Sets, Subsets & Venn Diagrams", desc: "Types of sets, power sets, Venn diagram representations" },
      { name: "Union, Intersection & Complement", desc: "Set operations, De Morgan's laws, cardinality formulas" },
      { name: "Cartesian Product & Relations", desc: "Domain, range, reflexive, symmetric and transitive relations" }
    ]
  },
  {
    name: "Functions",
    topics: [
      { name: "Domain & Range of Functions", desc: "Algebraic, trigonometric, logarithmic and exponential domains" },
      { name: "Types of Functions (One-One & Onto)", desc: "Injective, surjective, bijective and periodic functions" },
      { name: "Composite & Inverse Functions", desc: "Composition of functions (fog, gof) and invertible conditions" }
    ]
  },
  {
    name: "Trigonometry",
    topics: [
      { name: "Trigonometric Identities & Formulas", desc: "Compound angles, multiple and sub-multiple angle identities" },
      { name: "Trigonometric Equations", desc: "Principal solutions and general solutions of trig equations" },
      { name: "Inverse Trigonometric Functions", desc: "Principal value branches and transformation properties" }
    ]
  },
  {
    name: "Algebra (Quadratic Equations & Complex Numbers)",
    topics: [
      { name: "Quadratic Equations & Nature of Roots", desc: "Discriminant, relation between roots and coefficients" },
      { name: "Complex Numbers & Argand Plane", desc: "Modulus, argument, polar and exponential forms" },
      { name: "Cube Roots of Unity & Geometry", desc: "Properties of omega (ω) and complex geometry formulas" }
    ]
  },
  {
    name: "Matrices & Determinants",
    topics: [
      { name: "Properties of Determinants", desc: "Expansion, row/column operations, singular matrices" },
      { name: "Inverse of Matrix & Adjoint", desc: "Cofactor matrix, adjoint formulas, matrix multiplication" },
      { name: "System of Linear Equations", desc: "Cramer's rule, consistency, unique and infinite solutions" }
    ]
  },
  {
    name: "Sequences & Series (AP, GP, HP)",
    topics: [
      { name: "Arithmetic Progression (AP)", desc: "nth term, sum of first n terms, arithmetic mean" },
      { name: "Geometric Progression (GP)", desc: "nth term, infinite GP sum, geometric mean properties" },
      { name: "Harmonic Progression & Special Series", desc: "Relation between AM, GM, HM and sum of cubes/squares" }
    ]
  },
  {
    name: "Differential Calculus (Limits, Continuity, Derivatives)",
    topics: [
      { name: "Limits & Indeterminate Forms", desc: "Standard limits, L'Hôpital's Rule, factorization, rationalization" },
      { name: "Continuity & Differentiability", desc: "Left/right hand limits, removable & non-removable discontinuities" },
      { name: "Derivatives & Applications (Maxima/Minima)", desc: "Chain rule, tangents, normals, critical points and extrema" }
    ]
  },
  {
    name: "Integral Calculus",
    topics: [
      { name: "Indefinite Integrals & Substitution", desc: "Standard integrals, integration by parts and partial fractions" },
      { name: "Definite Integrals & Properties", desc: "King's property, odd/even functions, periodic integrals" },
      { name: "Area Under Curves", desc: "Area bounded between parabolas, lines, circles and trigonometrics" }
    ]
  },
  {
    name: "Differential Equations",
    topics: [
      { name: "Order & Degree of Differential Equations", desc: "Identification of order, degree and polynomial conditions" },
      { name: "Variable Separable & Homogeneous", desc: "First order first degree separable equations and substitutions" },
      { name: "Linear Differential Equations", desc: "Integrating factor (IF) method for dy/dx + Py = Q" }
    ]
  },
  {
    name: "Probability & Statistics",
    topics: [
      { name: "Classical & Conditional Probability", desc: "Sample spaces, addition theorem, multiplication theorem" },
      { name: "Bayes' Theorem & Independent Events", desc: "Total probability law, conditional probabilities of causes" },
      { name: "Binomial Distribution & Measures of Dispersion", desc: "Mean, variance, standard deviation and Bernoulli trials" }
    ]
  },
  {
    name: "Linear Programming",
    topics: [
      { name: "Formulation of LPP & Feasible Region", desc: "Decision variables, objective function, constraint plotting" },
      { name: "Corner Point Method & Optimal Solution", desc: "Finding maximum/minimum values at bounded/unbounded corners" }
    ]
  },
  {
    name: "Coordinate Geometry (2D & 3D)",
    topics: [
      { name: "Straight Lines & Slopes", desc: "Intercept forms, angle between lines, distance from a point" },
      { name: "Circles & Tangents", desc: "Standard equation, radius, centre, condition of tangency" },
      { name: "Conic Sections (Parabola, Ellipse, Hyperbola)", desc: "Eccentricity, focus, directrix, latus rectum properties" }
    ]
  },
  {
    name: "Vectors",
    topics: [
      { name: "Dot Product & Projections", desc: "Scalar product, angle between vectors, component projections" },
      { name: "Cross Product & Area", desc: "Vector product, area of triangle and parallelogram" },
      { name: "Scalar & Vector Triple Products", desc: "Volume of parallelepiped, coplanar conditions, Lagrange identity" }
    ]
  },
  {
    name: "Number System & Divisibility",
    topics: [
      { name: "Divisibility Rules & Remainder Theorem", desc: "Euler totient, Fermat's little theorem, cyclicity of powers" },
      { name: "GCD, LCM & Prime Factorization", desc: "Highest common factor, least common multiple relationships" }
    ]
  }
];

// 2. Analytical Reasoning Chapters & Topics
const analyticalData = [
  {
    name: "Number & Letter Series",
    topics: [
      { name: "Number Series Patterns", desc: "Arithmetic, geometric, alternating, square and cube differences" },
      { name: "Letter & Alphanumeric Sequences", desc: "Alphabet positions, reverse positions, skipping patterns" }
    ]
  },
  {
    name: "Blood Relations",
    topics: [
      { name: "Direct Relations & Family Trees", desc: "Generational chart mapping, paternal vs maternal relations" },
      { name: "Coded Blood Relations", desc: "Symbolic expressions like A + B means A is father of B" }
    ]
  },
  {
    name: "Direction Sense Test",
    topics: [
      { name: "Cardinal Directions & Distance Calculation", desc: "Pythagoras theorem on turns, North-East bearings" },
      { name: "Shadow & Clock Direction Problems", desc: "Sun position, morning/evening shadows, rotational directions" }
    ]
  },
  {
    name: "Coding-Decoding",
    topics: [
      { name: "Letter Shifting & Substitution", desc: "Forward/backward shifts (+3, -2), opposite letter pairs" },
      { name: "Matrix & Sentence Coding", desc: "Deciphering common code words from given statements" }
    ]
  },
  {
    name: "Syllogisms",
    topics: [
      { name: "Two & Three Statement Syllogisms", desc: "All, Some, No, Some Not rules using Euler Venn diagrams" },
      { name: "Possibility Cases in Syllogisms", desc: "Evaluating can be, may be, and either-or conditions" }
    ]
  },
  {
    name: "Puzzles & Seating Arrangement",
    topics: [
      { name: "Linear & Circular Seating Arrangement", desc: "Facing center vs facing outward, left/right alignments" },
      { name: "Floor & Box Puzzles", desc: "Multi-variable scheduling, day/color/person matching" }
    ]
  },
  {
    name: "Clocks & Calendars",
    topics: [
      { name: "Clock Angles & Coincidence", desc: "Angle between hour and minute hands, faulty clocks" },
      { name: "Calendar Odd Days & Repetition", desc: "Leap year identification, finding day of the week for any date" }
    ]
  },
  {
    name: "Data Interpretation (Tables & Graphs)",
    topics: [
      { name: "Bar Graphs & Pie Charts", desc: "Percentage change, ratio comparison, sector angle calculations" },
      { name: "Tabular Data & Line Charts", desc: "Growth rates, averages, composite table analysis" }
    ]
  },
  {
    name: "Venn Diagrams & Set Logic",
    topics: [
      { name: "Geometric Venn Diagrams", desc: "Triangles, circles, rectangles representing professions" },
      { name: "Three-Set Intersections", desc: "Formula: n(A ∪ B ∪ C) and exactly two category counts" }
    ]
  },
  {
    name: "Statement & Conclusions",
    topics: [
      { name: "Statement & Arguments", desc: "Strong vs weak arguments, practical logic evaluation" },
      { name: "Statement & Assumptions/Conclusions", desc: "Implicit facts vs unwarranted extrapolations" }
    ]
  },
  {
    name: "CAT Advanced Reasoning Masterclass (2015-2024)",
    topics: [
      { name: "CAT Matrix Puzzles & Arrangement Grids", desc: "4-attribute matching, circular & double row constraints, deductive matrix analysis" },
      { name: "CAT Games, Tournaments & Round-Robin Scheduling", desc: "Win/loss points tables, knockout match trees, goal differential deductions" },
      { name: "CAT Binary Logic, Truth-Tellers & Liars", desc: "Knights & Knaves, alternating truth/lie conditions, hypothesis testing grids" },
      { name: "CAT Multi-Set Maxima-Minima & Network Flows", desc: "3 & 4 overlapping set optimization, route capacities, bottleneck scheduling" }
    ]
  }
];

// 3. Computer Awareness Chapters & Topics
const computerData = [
  {
    name: "Computer Fundamentals & Architecture",
    topics: [
      { name: "CPU Organization & Memory Hierarchy", desc: "ALU, Control Unit, Registers, Cache, RAM, ROM" },
      { name: "Input/Output Devices & System Bus", desc: "Address bus, data bus, control bus, DMA controller" }
    ]
  },
  {
    name: "Number Systems & Binary Arithmetic",
    topics: [
      { name: "Radix Conversions (Binary, Octal, Hex)", desc: "Base-2, Base-8, Base-10, Base-16 conversions" },
      { name: "1's and 2's Complement Representation", desc: "Signed number arithmetic, overflow conditions" }
    ]
  },
  {
    name: "Boolean Algebra & Logic Gates",
    topics: [
      { name: "Logic Gates & Truth Tables", desc: "AND, OR, NOT, NAND, NOR, XOR, XNOR operations" },
      { name: "Boolean Laws & Karnaugh Maps (K-Map)", desc: "De Morgan's laws, SOP, POS, simplification techniques" }
    ]
  },
  {
    name: "Operating Systems Basics",
    topics: [
      { name: "Process Management & Scheduling", desc: "Process states, FCFS, Round Robin, SJF, context switching" },
      { name: "Deadlocks & Memory Management", desc: "Banker's algorithm, Paging, Segmentation, Virtual Memory" }
    ]
  },
  {
    name: "Data Structures & Programming Basics",
    topics: [
      { name: "Linear Structures (Arrays, Stacks, Queues)", desc: "LIFO, FIFO, infix-to-postfix, push/pop operations" },
      { name: "Trees, Graphs & Time Complexity", desc: "Binary trees, BST traversal, Big-O notation, searching/sorting" }
    ]
  },
  {
    name: "Computer Networks & Databases",
    topics: [
      { name: "OSI & TCP/IP Model Layers", desc: "7 layers, IP addressing, TCP vs UDP, HTTP, DNS, ARP" },
      { name: "DBMS Fundamentals & SQL", desc: "Relational model, primary keys, foreign keys, normalization" }
    ]
  }
];

// 4. General English Chapters & Topics
const englishData = [
  {
    name: "Reading Comprehension",
    topics: [
      { name: "Passage Inference & Central Theme", desc: "Understanding implicit message, tone of author, main idea" },
      { name: "Contextual Vocabulary in Comprehension", desc: "Meaning of phrases and words as used in the passage" }
    ]
  },
  {
    name: "Grammar & Parts of Speech",
    topics: [
      { name: "Tenses & Subject-Verb Agreement", desc: "Rules of singular/plural verbs, present, past, future tenses" },
      { name: "Articles, Prepositions & Conjunctions", desc: "Correct usage of a, an, the, in, at, on, between, among" }
    ]
  },
  {
    name: "Vocabulary, Synonyms & Antonyms",
    topics: [
      { name: "High-Frequency NIMCET Synonyms", desc: "Crucial academic and analytical vocabulary definitions" },
      { name: "Antonyms & Word Pairs", desc: "Exact opposites, negative prefixes, contextual contrasts" }
    ]
  },
  {
    name: "Sentence Correction & Spotting Errors",
    topics: [
      { name: "Error Detection in Sentences", desc: "Modifiers, parallel structure, pronoun-antecedent agreement" },
      { name: "Sentence Improvement & Phrasal Replacements", desc: "Selecting the grammatically superior alternative" }
    ]
  },
  {
    name: "Idioms & Phrases",
    topics: [
      { name: "Common Idioms & Figurative Expressions", desc: "Origin, metaphorical meanings, correct usage" },
      { name: "Phrasal Verbs", desc: "Look up, give up, put off, bring about, break down" }
    ]
  },
  {
    name: "Sentence Rearrangement & Cloze Test",
    topics: [
      { name: "Para Jumbles & Rearrangement", desc: "Finding opening sentence, transition words, logical sequence" },
      { name: "Cloze Test (Fill in the Blanks)", desc: "Filling coherent words into continuous passage blanks" }
    ]
  }
];

// Assemble chapters and topics
const chapters = [];
const topics = [];

function registerSubjectChapters(subjectId, sourceList, startIdx) {
  sourceList.forEach((chObj, cIdx) => {
    const chId = `ch_${subjectId}_${cIdx + 1}`;
    chapters.push({
      _id: chId,
      subjectId,
      name: chObj.name,
      description: `Comprehensive NIMCET syllabus: ${chObj.name}`,
      order: startIdx + cIdx
    });

    chObj.topics.forEach((topObj, tIdx) => {
      const topId = `top_${chId}_${tIdx + 1}`;
      topics.push({
        _id: topId,
        chapterId: chId,
        subjectId,
        name: topObj.name,
        description: topObj.desc,
        prerequisites: ['Basic Fundamentals', 'Analytical Logic'],
        order: tIdx + 1
      });
    });
  });
}

registerSubjectChapters('sub_math', mathData, 1);
registerSubjectChapters('sub_analytical', analyticalData, 100);
registerSubjectChapters('sub_computer', computerData, 200);
registerSubjectChapters('sub_english', englishData, 300);

console.log(`Generated ${chapters.length} chapters and ${topics.length} topics.`);

module.exports = {
  subjects,
  chapters,
  topics
};
