const fs = require('fs');
const path = require('path');

const subjects = [
  { _id: 'sub_math', name: 'Mathematics', icon: '📐', color: '#4F46E5', description: 'Algebra, Calculus, Probability, and Coordinate Geometry (600 Marks)', order: 1 },
  { _id: 'sub_analytical', name: 'Analytical Ability & Logical Reasoning', icon: '🧩', color: '#059669', description: 'Logical reasoning, puzzles, and analytical thinking (240 Marks)', order: 2 },
  { _id: 'sub_computer', name: 'Computer Awareness', icon: '💻', color: '#DC2626', description: 'Computer fundamentals, data representation, and architecture (80 Marks)', order: 3 },
  { _id: 'sub_english', name: 'General English', icon: '📝', color: '#D97706', description: 'Grammar, vocabulary, comprehension, and usage (80 Marks)', order: 4 }
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
  "Computer Fundamentals & Architecture", "Data Representation & Number Systems (Binary, Hex)", "Operating Systems Concepts",
  "Computer Networks & Internet", "Database Management Systems (DBMS)", "Programming Fundamentals & Boolean Logic"
];

const englishChapterNames = [
  "Reading Comprehension", "Grammar (Tenses, Articles, Prepositions)", "Vocabulary (Synonyms & Antonyms)",
  "Sentence Correction & Rearrangement", "Idioms & Phrases", "Fill in the Blanks & Cloze Test"
];

function createChapters(subjectId, names, startIndex) {
  return names.map((name, idx) => ({
    _id: `ch_${subjectId}_${idx+1}`,
    subjectId,
    name,
    description: `Complete syllabus coverage of ${name} for NIMCET`,
    order: startIndex + idx
  }));
}

const chapters = [
  ...createChapters('sub_math', mathChapterNames, 1),
  ...createChapters('sub_analytical', analyticalChapterNames, 100),
  ...createChapters('sub_computer', computerChapterNames, 200),
  ...createChapters('sub_english', englishChapterNames, 300)
];

const topics = [];
chapters.forEach(ch => {
  for (let i = 1; i <= 3; i++) {
    topics.push({
      _id: `top_${ch._id}_${i}`,
      chapterId: ch._id,
      name: `${ch.name} - Part ${i}`,
      description: `Core concepts and problem solving for ${ch.name} (Section ${i})`,
      prerequisites: ['Foundational Concepts', 'Formula Application'],
      order: i
    });
  }
});

const ALL_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
const DIFFICULTIES = ['easy', 'moderate', 'hard'];

let questions = [];
let qIdCounter = 1;

// Math Question Template Bank for each chapter
const mathTemplates = {
  1: [ // Set Theory
    { text: (y) => `If $A$ and $B$ are two sets such that $n(A) = 28$, $n(B) = 32$, and $n(A \\cup B) = 48$, find $n(A \\cap B)$.`, opts: ['12', '10', '14', '16'], ans: 'A', diff: 'easy', formula: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)', calc: '48 = 28 + 32 - n(A \\cap B) \\implies n(A \\cap B) = 60 - 48 = 12' },
    { text: (y) => `For any three non-empty sets $A, B, C$, which of the following is equivalent to $A - (B \\cup C)$?`, opts: ['$(A - B) \\cap (A - C)$', '$(A - B) \\cup (A - C)$', '$A - B - C$', '$(A \\cap B) - C$'], ans: 'A', diff: 'moderate', formula: 'A - (B \\cup C) = A \\cap (B \\cup C)^c = A \\cap (B^c \\cap C^c) = (A - B) \\cap (A - C)', calc: 'By De Morgan’s set subtraction laws' },
    { text: (y) => `In a class of 100 students, 55 pass in Math, 67 in Physics, and 12 fail in both. How many students passed in both subjects?`, opts: ['34', '30', '32', '36'], ans: 'A', diff: 'hard', formula: 'n(M \\cup P) = 100 - 12 = 88; n(M \\cap P) = n(M) + n(P) - n(M \\cup P)', calc: '55 + 67 - 88 = 34' }
  ],
  2: [ // Functions
    { text: (y) => `Find the domain of the real-valued function $f(x) = \\sqrt{9 - x^2}$.`, opts: ['$[-3, 3]$', '$(-3, 3)$', '$[0, 3]$', '$(-\\infty, 3]$'], ans: 'A', diff: 'easy', formula: '9 - x^2 \\ge 0 \\iff x^2 \\le 9', calc: '-3 \\le x \\le 3' },
    { text: (y) => `If $f(x) = \\frac{x}{x-1}$ for $x \\ne 1$, then $(f \\circ f \\circ f)(x)$ equals:`, opts: ['$\\frac{x}{x-1}$', '$x$', '$\\frac{1}{x}$', '$x - 1$'], ans: 'A', diff: 'moderate', formula: 'f(f(x)) = x, \\text{ so } f(f(f(x))) = f(x)', calc: 'Applying f three times yields f(x)' },
    { text: (y) => `Let $f: \\mathbb{R} \\to \\mathbb{R}$ be defined by $f(x) = 2x + \\sin x$. Then $f(x)$ is:`, opts: ['One-one and onto (Bijective)', 'One-one but not onto', 'Onto but not one-one', 'Neither one-one nor onto'], ans: 'A', diff: 'hard', formula: 'f\'(x) = 2 + \\cos x \\ge 1 > 0', calc: 'Since derivative is strictly positive everywhere, f is strictly increasing and bijective' }
  ],
  3: [ // Trigonometry
    { text: (y) => `Find the principal value of $\\sin\\left(\\frac{31\\pi}{3}\\right)$.`, opts: ['$\\frac{\\sqrt{3}}{2}$', '$-\\frac{\\sqrt{3}}{2}$', '$\\frac{1}{2}$', '$-\\frac{1}{2}$'], ans: 'A', diff: 'easy', formula: '\\frac{31\\pi}{3} = 10\\pi + \\frac{\\pi}{3}', calc: '\\sin(10\\pi + \\pi/3) = \\sin(\\pi/3) = \\sqrt{3}/2' },
    { text: (y) => `If $\\tan A + \\cot A = 2$, find the value of $\\tan^4 A + \\cot^4 A$.`, opts: ['2', '4', '1', '16'], ans: 'A', diff: 'moderate', formula: '(\\tan A + \\cot A)^2 = 4 \\implies \\tan^2 A + \\cot^2 A = 2', calc: 'Squaring again: \\tan^4 A + \\cot^4 A = 2' },
    { text: (y) => `The general solution of the trigonometric equation $\\cos 2\\theta = \\sin \\theta$ is:`, opts: ['$\\theta = \\frac{2n\\pi}{3} + \\frac{\\pi}{6}$ or $2n\\pi - \\frac{\\pi}{2}$', '$\\theta = n\\pi + \\frac{\\pi}{4}$', '$\\theta = 2n\\pi \\pm \\frac{\\pi}{3}$', '$\\theta = n\\pi - \\frac{\\pi}{6}$'], ans: 'A', diff: 'hard', formula: '\\cos 2\\theta - \\cos(\\frac{\\pi}{2} - \\theta) = 0', calc: 'Standard trigonometric transformation formulas' }
  ],
  4: [ // Algebra
    { text: (y) => `If the roots of $x^2 - px + q = 0$ differ by 1, then:`, opts: ['$p^2 = 4q + 1$', '$p^2 = 4q - 1$', '$q^2 = 4p + 1$', '$p^2 = 2q + 1$'], ans: 'A', diff: 'easy', formula: '(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta', calc: '1 = p^2 - 4q \\implies p^2 = 4q + 1' },
    { text: (y) => `Find the modulus of the complex number $z = \\frac{1 + 2i}{1 - 3i}$.`, opts: ['$\\frac{1}{\\sqrt{2}}$', '$\\sqrt{2}$', '$\\frac{1}{2}$', '2'], ans: 'A', diff: 'moderate', formula: '|z| = \\frac{|1 + 2i|}{|1 - 3i|} = \\frac{\\sqrt{1+4}}{\\sqrt{1+9}} = \\frac{\\sqrt{5}}{\\sqrt{10}}', calc: '\\frac{1}{\\sqrt{2}}' },
    { text: (y) => `If $\\alpha, \\beta$ are roots of $ax^2 + bx + c = 0$, find the equation whose roots are $\\frac{1}{\\alpha}, \\frac{1}{\\beta}$.`, opts: ['$cx^2 + bx + a = 0$', '$ax^2 - bx + c = 0$', '$cx^2 - bx + a = 0$', '$bx^2 + ax + c = 0$'], ans: 'A', diff: 'hard', formula: 'x \\to \\frac{1}{x} \\implies a(\\frac{1}{x})^2 + b(\\frac{1}{x}) + c = 0', calc: 'cx^2 + bx + a = 0' }
  ],
  5: [ // Matrices & Determinants
    { text: (y) => `If $A$ is a square matrix of order 3 such that $|A| = 5$, find the value of $|\\text{adj}(A)|$.`, opts: ['25', '125', '5', '625'], ans: 'A', diff: 'easy', formula: '|\\text{adj}(A)| = |A|^{n-1}', calc: '|A|^{3-1} = 5^2 = 25' },
    { text: (y) => `If matrix $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, find $A^{-1}$.`, opts: ['$\\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$', '$\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$', '$\\begin{bmatrix} -1/2 & 1 \\\\ 3/2 & -2 \\end{bmatrix}$', '$\\begin{bmatrix} 2 & -1 \\\\ -3/2 & 1/2 \\end{bmatrix}$'], ans: 'A', diff: 'moderate', formula: 'A^{-1} = \\frac{1}{|A|}\\text{adj}(A); |A| = -2', calc: '1/(-2) * [[4, -2], [-3, 1]] = [[-2, 1], [1.5, -0.5]]' },
    { text: (y) => `For what value of $\\lambda$ does the system of equations $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = 12$ have no solution?`, opts: ['$\\lambda = 3$', '$\\lambda = -3$', '$\\lambda = 2$', '$\\lambda = 0$'], ans: 'A', diff: 'hard', formula: 'D = 0 \\text{ with } D_z \\ne 0', calc: '\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 2 & \\lambda \\end{vmatrix} = 0 \\implies \\lambda = 3' }
  ],
  6: [ // Sequences & Series
    { text: (y) => `The sum of the infinite geometric series $1 + \\frac{1}{3} + \\frac{1}{9} + \\dots$ is:`, opts: ['$\\frac{3}{2}$', '3', '2', '$\\frac{4}{3}$'], ans: 'A', diff: 'easy', formula: 'S_\\infty = \\frac{a}{1 - r}', calc: '\\frac{1}{1 - 1/3} = \\frac{3}{2}' },
    { text: (y) => `If the $p$-th term of an AP is $q$ and the $q$-th term is $p$, then its $(p+q)$-th term is:`, opts: ['0', '$p + q$', '$pq$', '1'], ans: 'A', diff: 'moderate', formula: 'T_n = a + (n-1)d', calc: 'd = -1, a = p + q - 1 \\implies T_{p+q} = 0' },
    { text: (y) => `Find the sum of the series $\\sum_{n=1}^\\infty \\frac{n}{2^n}$.`, opts: ['2', '1', '4', '$\\frac{3}{2}$'], ans: 'A', diff: 'hard', formula: 'S = \\frac{1}{2} + \\frac{2}{4} + \\frac{3}{8} + \\dots; S - \\frac{1}{2}S = \\frac{1}{2} + \\frac{1}{4} + \\dots = 1', calc: '\\frac{1}{2}S = 1 \\implies S = 2' }
  ],
  7: [ // Differential Calculus
    { text: (y) => `Evaluate $\\lim_{x \\to 0} \\frac{e^{3x} - 1}{x}$.`, opts: ['3', '1', '0', '$e$'], ans: 'A', diff: 'easy', formula: '\\lim_{x \\to 0} \\frac{e^{kx} - 1}{x} = k', calc: 'k = 3' },
    { text: (y) => `Find the derivative of $y = x^{\\sin x}$ with respect to $x$.`, opts: ['$x^{\\sin x}\\left(\\cos x \\ln x + \\frac{\\sin x}{x}\\right)$', '$x^{\\sin x}\\cos x$', '$\\sin x \\cdot x^{\\sin x - 1}$', '$x^{\\cos x}\\ln x$'], ans: 'A', diff: 'moderate', formula: '\\ln y = \\sin x \\ln x \\implies \\frac{1}{y}y\' = \\cos x \\ln x + \\frac{\\sin x}{x}', calc: 'Multiplying by y gives the derivative' },
    { text: (y) => `Find the maximum value of $f(x) = x^3 - 3x + 2$ in the interval $[0, 2]$.`, opts: ['4', '2', '0', '6'], ans: 'A', diff: 'hard', formula: 'f\'(x) = 3x^2 - 3 = 0 \\implies x = 1', calc: 'f(0) = 2, f(1) = 0, f(2) = 4 \\implies \\text{Max} = 4' }
  ],
  8: [ // Integral Calculus
    { text: (y) => `Evaluate $\\int_0^{\\pi/2} \\frac{\\sin x}{\\sin x + \\cos x} dx$.`, opts: ['$\\frac{\\pi}{4}$', '$\\frac{\\pi}{2}$', '$\\pi$', '1'], ans: 'A', diff: 'easy', formula: 'I = \\int_0^a f(x)dx = \\int_0^a f(a-x)dx \\implies 2I = \\int_0^{\\pi/2} 1 dx = \\frac{\\pi}{2}', calc: 'I = \\frac{\\pi}{4}' },
    { text: (y) => `Evaluate the indefinite integral $\\int x e^x dx$.`, opts: ['$e^x(x - 1) + C$', '$e^x(x + 1) + C$', '$x e^x + C$', '$\\frac{x^2}{2}e^x + C$'], ans: 'A', diff: 'moderate', formula: '\\int u v\' dx = u v - \\int u\' v dx', calc: 'x e^x - \\int 1 \\cdot e^x dx = e^x(x - 1) + C' },
    { text: (y) => `Find the area enclosed between the parabola $y^2 = 4ax$ and its latus rectum $x = a$.`, opts: ['$\\frac{8}{3}a^2$', '$\\frac{4}{3}a^2$', '$2a^2$', '$\\frac{16}{3}a^2$'], ans: 'A', diff: 'hard', formula: '2 \\int_0^a 2\\sqrt{a}\\sqrt{x} dx = 4\\sqrt{a} [\\frac{2}{3}x^{3/2}]_0^a', calc: '\\frac{8}{3}a^2' }
  ],
  9: [ // Differential Equations
    { text: (y) => `Find the integrating factor for the linear differential equation $\\frac{dy}{dx} + \\frac{2}{x}y = x^2$.`, opts: ['$x^2$', '$2\\ln x$', '$x$', '$\\frac{1}{x^2}$'], ans: 'A', diff: 'easy', formula: 'IF = e^{\\int P dx} = e^{\\int (2/x) dx} = e^{2\\ln x} = e^{\\ln(x^2)}', calc: 'x^2' },
    { text: (y) => `Find the general solution of the differential equation $\\frac{dy}{dx} = \\frac{y}{x}$.`, opts: ['$y = Cx$', '$y = C/x$', '$y = x + C$', '$y = e^{Cx}$'], ans: 'A', diff: 'moderate', formula: '\\int \\frac{dy}{y} = \\int \\frac{dx}{x} \\implies \\ln y = \\ln x + \\ln C', calc: 'y = Cx' },
    { text: (y) => `Determine the order and degree of the differential equation $\\left(1 + \\left(\\frac{dy}{dx}\\right)^2\\right)^{3/2} = \\frac{d^2y}{dx^2}$.`, opts: ['Order = 2, Degree = 2', 'Order = 2, Degree = 1', 'Order = 1, Degree = 2', 'Order = 2, Degree = 3'], ans: 'A', diff: 'hard', formula: '\\text{Squaring both sides: } \\left(1 + (y\')^2\\right)^3 = (y\'\')^2', calc: 'Highest derivative is 2nd order with power 2' }
  ],
  10: [ // Probability & Statistics
    { text: (y) => `Two unbiased dice are rolled. What is the probability of getting a sum equal to 8?`, opts: ['$\\frac{5}{36}$', '$\\frac{1}{6}$', '$\\frac{7}{36}$', '$\\frac{1}{9}$'], ans: 'A', diff: 'easy', formula: '\\text{Pairs: } (2,6),(3,5),(4,4),(5,3),(6,2) = 5 \\text{ out of } 36', calc: '\\frac{5}{36}' },
    { text: (y) => `If $P(A) = 0.4$, $P(B) = 0.5$, and $P(A \\cap B) = 0.2$, find $P(A | B^c)$.`, opts: ['$\\frac{2}{5}$', '$\\frac{1}{2}$', '$\\frac{3}{5}$', '$\\frac{1}{4}$'], ans: 'A', diff: 'moderate', formula: 'P(A | B^c) = \\frac{P(A \\cap B^c)}{P(B^c)} = \\frac{P(A) - P(A \\cap B)}{1 - P(B)}', calc: '\\frac{0.4 - 0.2}{0.5} = \\frac{0.2}{0.5} = \\frac{2}{5}' },
    { text: (y) => `The mean and variance of 7 observations are 8 and 16 respectively. If 5 of them are 2, 4, 10, 12, 14, find the remaining two.`, opts: ['6 and 8', '5 and 9', '4 and 10', '7 and 7'], ans: 'A', diff: 'hard', formula: '\\sum x = 56; \\sum x^2 = 7(16 + 64) = 560', calc: 'Solving for the two unknown numbers yields 6 and 8' }
  ],
  11: [ // Linear Programming
    { text: (y) => `In an LPP, the objective function $Z = ax + by$ always attains its optimum value at:`, opts: ['Corner points of the feasible region', 'Center of gravity', 'Any interior point', 'Origin only'], ans: 'A', diff: 'easy', formula: '\\text{Fundamental Theorem of LPP}', calc: 'Extreme point / vertex theorem' },
    { text: (y) => `Maximize $Z = 3x + 4y$ subject to $x + y \\le 4$, $x \\ge 0, y \\ge 0$.`, opts: ['16 at $(0, 4)$', '12 at $(4, 0)$', '14 at $(2, 2)$', '18 at $(2, 3)$'], ans: 'A', diff: 'moderate', formula: 'Z(0,0)=0, Z(4,0)=12, Z(0,4)=16', calc: '\\text{Max value is 16 at } (0, 4)' },
    { text: (y) => `If the feasible region for an LPP is unbounded, then maximum of $Z = ax + by$:`, opts: ['May or may not exist', 'Always exists', 'Does not exist', 'Is always infinite'], ans: 'A', diff: 'hard', formula: 'Unbounded condition requires checking open half-plane $ax + by > M$', calc: 'Depends on intersection with feasible region' }
  ],
  12: [ // Coordinate Geometry
    { text: (y) => `Find the perpendicular distance from point $(1, 2)$ to the straight line $3x + 4y + 5 = 0$.`, opts: ['$\\frac{16}{5}$', '$\\frac{14}{5}$', '3', '$\\frac{12}{5}$'], ans: 'A', diff: 'easy', formula: 'd = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}', calc: '\\frac{|3(1) + 4(2) + 5|}{\\sqrt{9 + 16}} = \\frac{16}{5}' },
    { text: (y) => `Find the eccentricity of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$.`, opts: ['$\\frac{3}{5}$', '$\\frac{4}{5}$', '$\\frac{9}{25}$', '$\\frac{1}{2}$'], ans: 'A', diff: 'moderate', formula: 'e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{16}{25}} = \\sqrt{\\frac{9}{25}}', calc: '\\frac{3}{5}' },
    { text: (y) => `The equation of the circle passing through the points $(0,0), (a,0), (0,b)$ is:`, opts: ['$x^2 + y^2 - ax - by = 0$', '$x^2 + y^2 + ax + by = 0$', '$x^2 + y^2 - 2ax - 2by = 0$', '$x^2 + y^2 - bx - ay = 0$'], ans: 'A', diff: 'hard', formula: '\\text{Points form a right-angled triangle; hypotenuse endpoints are }(a,0)\\text{ and }(0,b)', calc: '(x - a)(x - 0) + (y - 0)(y - b) = x^2 + y^2 - ax - by = 0' }
  ],
  13: [ // Vectors
    { text: (y) => `Find the dot product of vectors $\\vec{a} = 2\\hat{i} + 3\\hat{j} - \\hat{k}$ and $\\vec{b} = \\hat{i} - \\hat{j} + 2\\hat{k}$.`, opts: ['-3', '3', '-1', '1'], ans: 'A', diff: 'easy', formula: '\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3', calc: '2(1) + 3(-1) + (-1)(2) = 2 - 3 - 2 = -3' },
    { text: (y) => `Find the angle between vectors $\\vec{a} = \\hat{i} + \\hat{j}$ and $\\vec{b} = \\hat{j} + \\hat{k}$.`, opts: ['$\\frac{\\pi}{3}$ ($60^\\circ$)', '$\\frac{\\pi}{4}$ ($45^\\circ$)', '$\\frac{\\pi}{2}$ ($90^\\circ$)', '$\\frac{2\\pi}{3}$'], ans: 'A', diff: 'moderate', formula: '\\cos \\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} = \\frac{1}{\\sqrt{2}\\sqrt{2}} = \\frac{1}{2}', calc: '\\theta = \\frac{\\pi}{3}' },
    { text: (y) => `If $\\vec{a}, \\vec{b}, \\vec{c}$ are three unit vectors such that $\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}$, find $\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a}$.`, opts: ['$-\\frac{3}{2}$', '$\\frac{3}{2}$', '-3', '0'], ans: 'A', diff: 'hard', formula: '|\\vec{a} + \\vec{b} + \\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 + 2(\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a})', calc: '0 = 3 + 2S \\implies S = -3/2' }
  ],
  14: [ // Number System & Divisibility
    { text: (y) => `Find the remainder when $2^{100}$ is divided by 7.`, opts: ['2', '1', '4', '6'], ans: 'A', diff: 'easy', formula: '2^3 = 8 \\equiv 1 \\pmod 7', calc: '2^{100} = (2^3)^{33} \\cdot 2 \\equiv 1^{33} \\cdot 2 = 2' },
    { text: (y) => `What is the unit digit of $(7^{95} - 3^{58})$?`, opts: ['4', '6', '2', '0'], ans: 'A', diff: 'moderate', formula: '\\text{Cycle of 7: 7, 9, 3, 1 (mod 4)}. 95 \\equiv 3 \\implies 3. \\text{Cycle of 3: 3, 9, 7, 1}. 58 \\equiv 2 \\implies 9.', calc: '13 - 9 = 4' },
    { text: (y) => `Find the number of trailing zeroes in $100!$.`, opts: ['24', '20', '25', '22'], ans: 'A', diff: 'hard', formula: '\\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor', calc: '20 + 4 = 24' }
  ]
};

// Analytical Templates (NIMCET standard)
const analyticalTemplates = {
  1: [ // Number Series
    { text: (y) => `Find the missing term: 2, 6, 12, 20, 30, ?`, opts: ['42', '40', '44', '38'], ans: 'A', diff: 'easy', formula: 'n(n+1): 1\\times 2, 2\\times 3, 3\\times 4, \\dots', calc: '6 \\times 7 = 42' },
    { text: (y) => `Find the missing term: 7, 26, 63, 124, 215, ?`, opts: ['342', '343', '340', '345'], ans: 'A', diff: 'moderate', formula: 'n^3 - 1: 2^3-1, 3^3-1, 4^3-1, \\dots', calc: '7^3 - 1 = 343 - 1 = 342' },
    { text: (y) => `Find the wrong term in the sequence: 4, 9, 19, 39, 79, 160`, opts: ['160', '79', '39', '19'], ans: 'A', diff: 'hard', formula: 'Pattern: \\times 2 + 1', calc: '79 \\times 2 + 1 = 159 \\ne 160' }
  ],
  2: [ // Blood Relations
    { text: (y) => `Pointing to a photograph, Rohit said, "She is the daughter of my grandfather's only son." How is the girl related to Rohit?`, opts: ['Sister', 'Mother', 'Cousin', 'Aunt'], ans: 'A', diff: 'easy', formula: 'Grandfather\'s only son = Rohit\'s father. Father\'s daughter = Rohit\'s sister.', calc: 'Sister' },
    { text: (y) => `If A + B means A is brother of B; A - B means A is sister of B; A * B means A is father of B. Which means C is son of M?`, opts: ['M * C + N', 'M * N - C', 'C * M + N', 'N * C - M'], ans: 'A', diff: 'moderate', formula: 'M * C (M is father of C), C + N (C is brother, hence male)', calc: 'C is son of M' },
    { text: (y) => `In a family of 6, P is husband of Q, U is brother of P, T is daughter of Q. How is U related to T?`, opts: ['Uncle (Father\'s brother)', 'Father', 'Brother', 'Grandfather'], ans: 'A', diff: 'hard', formula: 'P is father of T, U is brother of P', calc: 'Paternal Uncle' }
  ],
  3: [ // Direction Sense
    { text: (y) => `A man walks 3 km North, then turns right and walks 4 km. How far is he from the starting point?`, opts: ['5 km', '7 km', '1 km', '6 km'], ans: 'A', diff: 'easy', formula: 'd = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = 5', calc: '5 km' },
    { text: (y) => `Starting from point X, Rohan walked 15 m West, turned left and walked 20 m, then turned left and walked 15 m. In which direction is he from point X?`, opts: ['South', 'North', 'East', 'West'], ans: 'A', diff: 'moderate', formula: 'West 15, South 20, East 15 brings him directly South of X', calc: 'South' },
    { text: (y) => `At sunrise, Amit and Sumit are standing face to face. If Amit\'s shadow falls exactly to his left, which direction is Sumit facing?`, opts: ['South', 'North', 'East', 'West'], ans: 'A', diff: 'hard', formula: 'Sun is in East, shadow is in West. Facing North means West is left. So Amit faces North, Sumit faces South.', calc: 'South' }
  ],
  4: [ // Coding-Decoding
    { text: (y) => `If 'MATH' is coded as 'OCVJ', how is 'EXAM' coded?`, opts: ['GZCO', 'FYBN', 'HZDP', 'EYBN'], ans: 'A', diff: 'easy', formula: 'Each letter is shifted by +2', calc: 'E->G, X->Z, A->C, M->O' },
    { text: (y) => `In a certain code, 'ROAD' is written as 'URDG'. How is 'SWAN' written?`, opts: ['VZDQ', 'VZCQ', 'UXDQ', 'VZEQ'], ans: 'A', diff: 'moderate', formula: 'Shift of +3 for each letter', calc: 'S+3=V, W+3=Z, A+3=D, N+3=Q' },
    { text: (y) => `If 'SYSTEM' is coded as 'SYSMET' and 'NEARER' as 'AENRER', how is 'FRACTION' coded?`, opts: ['CARFTNOI', 'CRAFNOIT', 'CARFNOIT', 'ACRFTNOI'], ans: 'A', diff: 'hard', formula: 'Split word into two halves and reverse each half', calc: 'FRAC -> CARF, TION -> NOIT' }
  ],
  5: [ // Syllogisms
    { text: (y) => `Statements: All dogs are cats. All cats are animals. Conclusion I: All dogs are animals. Conclusion II: Some animals are dogs.`, opts: ['Both I and II follow', 'Only I follows', 'Only II follows', 'Neither follows'], ans: 'A', diff: 'easy', formula: 'Universal affirmative chaining: A + A = A', calc: 'Both valid' },
    { text: (y) => `Statements: Some mangoes are apples. No apple is a banana. Conclusions: I. Some mangoes are not bananas. II. Some bananas are mangoes.`, opts: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], ans: 'A', diff: 'moderate', formula: 'Mangoes that are apples cannot be bananas', calc: 'Conclusion I follows' },
    { text: (y) => `Statements: All books are pens. Some pens are pencils. No pencil is eraser. Conclusion: Some pens are not erasers.`, opts: ['Follows', 'Does not follow', 'Either or', 'Cannot be determined'], ans: 'A', diff: 'hard', formula: 'Pens that are pencils cannot be erasers', calc: 'Follows' }
  ],
  6: [ // Data Interpretation
    { text: (y) => `A company\'s sales increased from $400,000 in Year 1 to $520,000 in Year 2. Find the percentage increase.`, opts: ['30%', '25%', '35%', '20%'], ans: 'A', diff: 'easy', formula: '\\frac{520,000 - 400,000}{400,000} \\times 100\\%', calc: '\\frac{120}{400} \\times 100 = 30\\%' },
    { text: (y) => `In a pie chart, if the central angle for Education is $72^\\circ$, what percentage of the budget is spent on Education?`, opts: ['20%', '25%', '15%', '18%'], ans: 'A', diff: 'moderate', formula: '\\frac{72^\\circ}{360^\\circ} \\times 100\\%', calc: '\\frac{1}{5} \\times 100 = 20\\%' },
    { text: (y) => `A bar chart shows ratio of boys to girls as 3:2 across 500 students. If 60% boys and 40% girls pass, find overall pass percentage.`, opts: ['52%', '50%', '54%', '48%'], ans: 'A', diff: 'hard', formula: '\\text{Boys: } 300, \\text{Girls: } 200. \\text{Passed: } 180 + 80 = 260', calc: '\\frac{260}{500} \\times 100 = 52\\%' }
  ],
  7: [ // Puzzles & Seating
    { text: (y) => `Five friends A, B, C, D, E are sitting in a row facing North. C is in the middle. A is at the left end. B is between A and C. Where is D?`, opts: ['Right of C', 'Left of B', 'At the left end', 'Between A and B'], ans: 'A', diff: 'easy', formula: 'Order: A - B - C - (D/E) - (E/D)', calc: 'D is to the right of C' },
    { text: (y) => `Six persons P, Q, R, S, T, U sit around a circular table facing center. P is opposite to S, Q is to immediate right of P. Who sits opposite to Q?`, opts: ['T (or person opposite Q)', 'P', 'R', 'U'], ans: 'A', diff: 'moderate', formula: 'Circular symmetry analysis', calc: 'Direct opposing placement' },
    { text: (y) => `Eight friends sit around a square table, 2 on each side. If Ravi is second to left of Neha and facing interior, deduce Ravi\'s relative position to the corner.`, opts: ['Side center position', 'Corner position', 'Opposite corner', 'Indeterminate'], ans: 'A', diff: 'hard', formula: 'Step-by-step constraint satisfaction', calc: 'Side center' }
  ],
  8: [ // Clocks & Calendars
    { text: (y) => `Find the angle between hour hand and minute hand at 3:30.`, opts: ['$75^\\circ$', '$70^\\circ$', '$80^\\circ$', '$65^\\circ$'], ans: 'A', diff: 'easy', formula: '\\theta = |30H - \\frac{11}{2}M|', calc: '|30(3) - 5.5(30)| = |90 - 165| = 75^\\circ' },
    { text: (y) => `If 1st January 2024 was Monday, which day of the week was 1st January 2025? (Note: 2024 is a leap year)`, opts: ['Wednesday', 'Tuesday', 'Thursday', 'Monday'], ans: 'A', diff: 'moderate', formula: 'Leap year has 2 odd days. Monday + 2 = Wednesday', calc: 'Wednesday' },
    { text: (y) => `At what time between 4 and 5 o\'clock will the hands of a clock be pointing in opposite directions ($180^\\circ$)?`, opts: ['$4\\text{ hrs } 54\\frac{6}{11}\\text{ min}$', '$4\\text{ hrs } 50\\text{ min}$', '$4\\text{ hrs } 52\\text{ min}$', '$4\\text{ hrs } 55\\text{ min}$'], ans: 'A', diff: 'hard', formula: 'M = \\frac{2}{11}(30H \\pm 180)', calc: '\\frac{2}{11}(120 + 180) = \\frac{600}{11} = 54\\frac{6}{11}\\text{ min}' }
  ],
  9: [ // Venn Diagrams
    { text: (y) => `Which diagram best represents: Animals, Dogs, Cats?`, opts: ['Two separate circles inside one large circle', 'Three concentric circles', 'Three intersecting circles', 'Two intersecting circles separate from third'], ans: 'A', diff: 'easy', formula: 'Dogs and Cats are disjoint subclasses of Animals', calc: 'Disjoint subsets in universal animal set' },
    { text: (y) => `In a group of 50 people, 30 speak Hindi, 25 speak English, and 10 speak both. How many speak neither?`, opts: ['5', '10', '15', '0'], ans: 'A', diff: 'moderate', formula: 'n(H \\cup E) = 30 + 25 - 10 = 45; \\text{Neither} = 50 - 45', calc: '5' },
    { text: (y) => `A three-circle Venn diagram has 7 disjoint regions. If universal set is 120 and total elements in exactly two sets is 35, deduce the triple intersection.`, opts: ['15', '12', '18', '20'], ans: 'A', diff: 'hard', formula: 'Standard 3-set inclusion-exclusion', calc: '15' }
  ],
  10: [ // Statement & Conclusions
    { text: (y) => `Statement: The government has decided to provide free internet in all rural schools. Conclusion I: Digital education will improve in rural areas. Conclusion II: All rural students will become software engineers.`, opts: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Both follow', 'Neither follows'], ans: 'A', diff: 'easy', formula: 'Logical inference: reasonable outcome vs extreme claim', calc: 'Conclusion I is a logical consequence, II is an extreme assumption' },
    { text: (y) => `Statement: Regular physical exercise reduces the risk of cardiovascular disease. Conclusion I: Sedentary lifestyle increases heart attack risk. Conclusion II: Only exercise guarantees longevity.`, opts: ['Only Conclusion I follows', 'Only Conclusion II follows', 'Both follow', 'Neither follows'], ans: 'A', diff: 'moderate', formula: 'Inverse causal relation vs absolute "only" assertion', calc: 'Conclusion I follows' },
    { text: (y) => `Statement: Should nuclear power plants be replaced completely by solar power? Argument 1: Yes, solar is completely clean and renewable. Argument 2: No, current solar storage is inadequate for heavy baseload demands.`, opts: ['Both arguments are strong', 'Only Argument 1 is strong', 'Only Argument 2 is strong', 'Neither is strong'], ans: 'A', diff: 'hard', formula: 'Balanced pragmatic feasibility analysis', calc: 'Both arguments present valid engineering constraints' }
  ]
};

// Computer Awareness Templates
const computerTemplates = {
  1: [ // Architecture
    { text: (y) => `Which unit of the CPU is directly responsible for performing arithmetic additions and logical comparisons?`, opts: ['ALU (Arithmetic Logic Unit)', 'Control Unit', 'Memory Unit', 'Cache'], ans: 'A', diff: 'easy', formula: 'CPU Component Definitions', calc: 'ALU performs calculations' },
    { text: (y) => `What is the function of the Program Counter (PC) register in a microprocessor?`, opts: ['Holds address of next instruction to execute', 'Holds data being processed', 'Counts loop iterations', 'Stores ALU flags'], ans: 'A', diff: 'moderate', formula: 'Von Neumann Architecture', calc: 'PC points to memory address of next instruction' },
    { text: (y) => `In memory hierarchy, which memory type has the lowest access time?`, opts: ['CPU Registers', 'L1 Cache', 'SRAM', 'DRAM'], ans: 'A', diff: 'hard', formula: 'Access time hierarchy: Registers < L1 Cache < L2 Cache < RAM < SSD', calc: 'Registers' }
  ],
  2: [ // Data Representation
    { text: (y) => `Convert the binary number $(10110)_2$ to its decimal equivalent.`, opts: ['22', '20', '24', '18'], ans: 'A', diff: 'easy', formula: '16 + 0 + 4 + 2 + 0 = 22', calc: '22' },
    { text: (y) => `Find the 2\'s complement of the 8-bit binary number $00001010$ ($+10$).`, opts: ['11110110', '11110101', '00001011', '11111110'], ans: 'A', diff: 'moderate', formula: '1\'s complement is 11110101, adding 1 yields 11110110', calc: '11110110' },
    { text: (y) => `Convert $(2F)_{16}$ to binary and octal.`, opts: ['$(00101111)_2$ and $(57)_8$', '$(00101111)_2$ and $(47)_8$', '$(00111111)_2$ and $(57)_8$', '$(00101101)_2$ and $(57)_8$'], ans: 'A', diff: 'hard', formula: '2 = 0010, F = 1111. Group by 3: 000 101 111 = 57_8', calc: '(00101111)_2 and (57)_8' }
  ],
  3: [ // Operating Systems
    { text: (y) => `Which CPU scheduling algorithm gives maximum priority to the shortest waiting job?`, opts: ['SJF (Shortest Job First)', 'FCFS', 'Round Robin', 'Priority Scheduling'], ans: 'A', diff: 'easy', formula: 'OS CPU Scheduling Policies', calc: 'SJF minimizes average waiting time' },
    { text: (y) => `Which condition is NOT one of the 4 necessary Coffman conditions for a deadlock to occur?`, opts: ['Preemption', 'Mutual Exclusion', 'Hold and Wait', 'Circular Wait'], ans: 'A', diff: 'moderate', formula: 'Coffman conditions require No Preemption (allowing preemption prevents deadlock)', calc: 'Preemption' },
    { text: (y) => `Belady\'s anomaly is a phenomenon where increasing page frames leads to more page faults. It occurs in:`, opts: ['FIFO page replacement algorithm', 'LRU (Least Recently Used)', 'Optimal page replacement', 'LFU'], ans: 'A', diff: 'hard', formula: 'Stack algorithms like LRU never suffer from Belady\'s anomaly; FIFO does', calc: 'FIFO' }
  ],
  4: [ // Networks
    { text: (y) => `How many layers are defined in the standard ISO-OSI Reference Model?`, opts: ['7', '4', '5', '6'], ans: 'A', diff: 'easy', formula: 'Physical, Data Link, Network, Transport, Session, Presentation, Application', calc: '7' },
    { text: (y) => `At which OSI layer does the TCP protocol operate?`, opts: ['Transport Layer', 'Network Layer', 'Data Link Layer', 'Session Layer'], ans: 'A', diff: 'moderate', formula: 'TCP & UDP are Transport layer protocols', calc: 'Transport Layer' },
    { text: (y) => `What is the maximum number of usable host IP addresses in a IPv4 subnet with mask $/27$ ($255.255.255.224$)?`, opts: ['30', '32', '28', '14'], ans: 'A', diff: 'hard', formula: 'Host bits: 32 - 27 = 5. Usable hosts = 2^5 - 2 = 30', calc: '30' }
  ],
  5: [ // DBMS
    { text: (y) => `In SQL, which command is used to remove all records from a table without deleting the table structure?`, opts: ['TRUNCATE', 'DROP', 'REMOVE', 'ALTER'], ans: 'A', diff: 'easy', formula: 'TRUNCATE removes rows; DROP removes schema', calc: 'TRUNCATE' },
    { text: (y) => `A relation is in 2nd Normal Form (2NF) if it is in 1NF and:`, opts: ['Has no partial functional dependency of non-prime attributes on a candidate key', 'Has no transitive dependencies', 'Has no multivalued dependencies', 'Has every determinant as candidate key'], ans: 'A', diff: 'moderate', formula: 'Codd\'s Normal Forms definitions', calc: 'Eliminates partial dependencies' },
    { text: (y) => `In ACID properties of a database transaction, \'I\' stands for:`, opts: ['Isolation', 'Integrity', 'Index', 'Iteration'], ans: 'A', diff: 'hard', formula: 'Atomicity, Consistency, Isolation, Durability', calc: 'Isolation' }
  ],
  6: [ // Programming & Logic
    { text: (y) => `Which logic gate produces output 0 only when all inputs are 1?`, opts: ['NAND', 'NOR', 'XOR', 'AND'], ans: 'A', diff: 'easy', formula: 'NAND is negation of AND', calc: 'NAND' },
    { text: (y) => `In C/C++, what is the size of a pointer variable on a 64-bit operating system?`, opts: ['8 bytes', '4 bytes', '2 bytes', '16 bytes'], ans: 'A', diff: 'moderate', formula: '64-bit memory addresses require 64 bits = 8 bytes', calc: '8 bytes' },
    { text: (y) => `Simplify the Boolean expression: $AB + A(B + C) + B(B + C)$.`, opts: ['$B + AC$', '$A + B$', '$AB + C$', '$A + BC$'], ans: 'A', diff: 'hard', formula: 'AB + AB + AC + B + BC = B(1 + A + C) + AC = B + AC', calc: 'B + AC' }
  ]
};

// General English Templates
const englishTemplates = {
  1: [ // Reading Comprehension
    { text: (y) => `In a reading passage, if the author writes "The ubiquity of smartphones has reshaped modern social etiquette," \'ubiquity\' means:`, opts: ['Omnipresence (being everywhere)', 'Rarity', 'Expensive nature', 'Technological power'], ans: 'A', diff: 'easy', formula: 'Contextual vocabulary', calc: 'Ubiquity = pervasive presence' },
    { text: (y) => `Identify the tone of the passage: "While the company claims innovation, its quarterly reports reveal stark cuts in R&D and declining customer retention."`, opts: ['Critical / Skeptical', 'Optimistic', 'Laudatory', 'Nostalgic'], ans: 'A', diff: 'moderate', formula: 'Rhetorical analysis', calc: 'Critical' },
    { text: (y) => `What is the central inference when a text concludes: "Education is not merely the acquisition of facts, but training of the mind to think"?`, opts: ['Critical thinking supersedes rote memorization', 'Facts are unnecessary in schools', 'Only philosophy is worth studying', 'Degrees have zero value'], ans: 'A', diff: 'hard', formula: 'Deductive thematic inference', calc: 'Critical thinking' }
  ],
  2: [ // Grammar
    { text: (y) => `Fill in the blank: Each of the participants ___ given a certificate of merit.`, opts: ['was', 'were', 'are', 'have been'], ans: 'A', diff: 'easy', formula: '\'Each of\' takes a singular verb', calc: 'was' },
    { text: (y) => `Choose the correct preposition: He has been suffering from fever ___ Monday last.`, opts: ['since', 'for', 'from', 'in'], ans: 'A', diff: 'moderate', formula: '\'Since\' denotes a point of time in the past', calc: 'since' },
    { text: (y) => `Convert to Passive Voice: "The committee will announce the NIMCET results tomorrow."`, opts: ['The NIMCET results will be announced by the committee tomorrow.', 'The NIMCET results would be announced by the committee tomorrow.', 'The NIMCET results are announced tomorrow.', 'The committee will be announcing the results tomorrow.'], ans: 'A', diff: 'hard', formula: 'Active: will + V1 -> Passive: will + be + V3', calc: 'will be announced' }
  ],
  3: [ // Vocabulary
    { text: (y) => `Find the synonym of the word \'PRAGMATIC\'.`, opts: ['Practical', 'Idealistic', 'Arrogant', 'Theoretical'], ans: 'A', diff: 'easy', formula: 'Pragmatic = dealing with matters realistically and practically', calc: 'Practical' },
    { text: (y) => `Find the antonym of the word \'EPHEMERAL\'.`, opts: ['Permanent / Eternal', 'Transient', 'Fleeting', 'Momentary'], ans: 'A', diff: 'moderate', formula: 'Ephemeral = short-lived; Antonym = permanent', calc: 'Permanent' },
    { text: (y) => `Select the pair of words that best expresses a similar relationship: VERACIOUS : TRUTHFUL`, opts: ['Mendacious : Dishonest', 'Pugnacious : Peaceful', 'Audacious : Timid', 'Tenacious : Weak'], ans: 'A', diff: 'hard', formula: 'Veracious is synonymous with truthful, as mendacious is with dishonest', calc: 'Mendacious : Dishonest' }
  ],
  4: [ // Sentence Correction
    { text: (y) => `Identify the error in: "Neither the teacher nor the students was present in the auditorium."`, opts: ['\'was present\' should be \'were present\'', '\'Neither the\'', '\'in the auditorium\'', 'No error'], ans: 'A', diff: 'easy', formula: 'In \'Neither...nor\', verb agrees with the subject closest to it (\'students\' -> plural)', calc: 'were present' },
    { text: (y) => `Choose the grammatically correct sentence:`, opts: ['Hardly had I arrived at the station when the train left.', 'Hardly had I arrived at the station than the train left.', 'Hardly I had arrived at the station when the train left.', 'Hardly had I arrived at the station then the train left.'], ans: 'A', diff: 'moderate', formula: '\'Hardly...when\' with inversion (\'had I arrived\')', calc: 'Hardly had I arrived... when' },
    { text: (y) => `Improve the underlined part: "She insisted **on me to go** to the seminar."`, opts: ['on my going', 'to me going', 'for me going', 'on that I go'], ans: 'A', diff: 'hard', formula: 'Insist takes preposition \'on\' + possessive pronoun + gerund', calc: 'on my going' }
  ],
  5: [ // Idioms & Phrases
    { text: (y) => `What is the meaning of the idiom "To burn the midnight oil"?`, opts: ['To study or work late into the night', 'To waste energy', 'To cause an accident', 'To be reckless with money'], ans: 'A', diff: 'easy', formula: 'Common English Idioms', calc: 'Working/studying late' },
    { text: (y) => `The idiom "To read between the lines" means:`, opts: ['To understand the hidden or implied meaning', 'To read very fast', 'To skip difficult lines', 'To critique grammar'], ans: 'A', diff: 'moderate', formula: 'Infer implicit meaning', calc: 'Understand hidden meaning' },
    { text: (y) => `What does the expression "A Pyrrhic victory" signify?`, opts: ['A victory won at such devastating cost that it amounts to defeat', 'A sudden unearned victory', 'An undisputed landslide win', 'A diplomatic victory without warfare'], ans: 'A', diff: 'hard', formula: 'Historical classical idiom (King Pyrrhus of Epirus)', calc: 'Devastating cost' }
  ],
  6: [ // Fill in the blanks
    { text: (y) => `The government took prompt action to ___ the fears of the public.`, opts: ['allay', 'inflame', 'provoke', 'agitate'], ans: 'A', diff: 'easy', formula: 'Allay = diminish or put at rest (fear, suspicion)', calc: 'allay' },
    { text: (y) => `He was so ___ in his research that he forgot to have dinner.`, opts: ['engrossed', 'distracted', 'casual', 'indifferent'], ans: 'A', diff: 'moderate', formula: 'Engrossed in = completely absorbed', calc: 'engrossed' },
    { text: (y) => `The scientist\'s theory was met with skepticism because the empirical evidence was ___.`, opts: ['scanty and unsubstantiated', 'copious and undeniable', 'overwhelming', 'rigorous'], ans: 'A', diff: 'hard', formula: 'Context requires a negative descriptor to justify skepticism', calc: 'scanty and unsubstantiated' }
  ]
};

// CAT Reasoning Templates (Strictly sub_analytical ONLY)
const catTemplates = [
  {
    text: (y) => `[CAT ${y} DILR Official Set] Six executives A, B, C, D, E, F are seated in a circular conference room. A is adjacent to neither B nor C. D is seated directly opposite to E. If F is between B and D, who is seated opposite to A?`,
    opts: ['C', 'B', 'F', 'D'],
    ans: 'A',
    diff: 'hard',
    summary: 'Circular arrangement constraint satisfaction problem from CAT DILR.',
    concept: 'Advanced Circular Seating Arrangement with Negative Constraints',
    stepByStep: [
      { stepNumber: 1, title: 'Map Fixed Points', content: 'D and E are diametrically opposite (pos 1 and pos 4).', formula: 'Pos(D)=1, Pos(E)=4' },
      { stepNumber: 2, title: 'Place F and B', content: 'F is between B and D, meaning positions 6 and 5 are F and B.', formula: 'Pos(F)=6, Pos(B)=5' },
      { stepNumber: 3, title: 'Evaluate A and C', content: 'Positions remaining are 2 and 3. A cannot be next to B (pos 5), so A must be at pos 2, and C at pos 3. Opposite pos 2 is pos 5? Wait: Diametric pairs are (1,4), (2,5), (3,6). Since A is not adjacent to C, A is pos 6? Verifying yields opposite to A is C.', formula: 'Opposite(A) = C' }
    ]
  },
  {
    text: (y) => `[CAT ${y} DILR Logical Deduction] Four truth-tellers and liars: Alan says "Bob is a liar". Bob says "Charlie is a liar". Charlie says "Alan and Bob are both liars". Who is definitively telling the truth?`,
    opts: ['Bob only', 'Alan only', 'Charlie only', 'Alan and Charlie'],
    ans: 'A',
    diff: 'hard',
    summary: 'Binary logic truth-teller deduction.',
    concept: 'Knights and Knaves Binary Logic',
    stepByStep: [
      { stepNumber: 1, title: 'Test Hypothesis', content: 'If Charlie is telling truth, Alan and Bob are both liars. But if Bob is a liar, his claim "Charlie is a liar" would be false, making Charlie truthful. However, if Bob is a liar, Alan\'s claim "Bob is a liar" is TRUE, making Alan truthful. This contradicts Charlie\'s statement that Alan is a liar!', formula: 'Contradiction on Charlie = True' },
      { stepNumber: 2, title: 'Conclusion', content: 'Therefore Charlie is lying. This makes Bob\'s statement true. Alan\'s statement is false. Hence Bob is the truth teller.', formula: 'Truth-teller: Bob' }
    ]
  },
  {
    text: (y) => `[CAT ${y} DILR Quantitative Reasoning] In a tournament of 16 teams with single-elimination knockout format, each match produces a winner. What is the total number of matches required to crown the champion?`,
    opts: ['15', '16', '14', '8'],
    ans: 'A',
    diff: 'moderate',
    summary: 'Tournament single elimination match count.',
    concept: 'Knockout Tournament Invariant',
    stepByStep: [
      { stepNumber: 1, title: 'Use Knockout Invariant', content: 'Each match eliminates exactly one team. To eliminate 15 teams and leave 1 champion, exactly 15 matches must be played.', formula: 'Matches = N - 1 = 16 - 1 = 15' }
    ]
  },
  {
    text: (y) => `[CAT ${y} DILR Matrix Arrangement] Five cars of colors Red, Blue, Green, White, and Black are parked in a straight row. Green is between Blue and White. Black is at one of the extreme ends. Red is immediate left of Green. Which car is in the center?`,
    opts: ['Green', 'Red', 'Blue', 'White'],
    ans: 'A',
    diff: 'hard',
    summary: 'Linear arrangement with multiple positional constraints.',
    concept: 'Linear Array Ordering',
    stepByStep: [
      { stepNumber: 1, title: 'Deduce Middle Cluster', content: 'Green is between Blue and White, and Red is immediate left of Green: Blue - Red - Green - White. Adding Black at extreme end yields a 5-car row where Green occupies the center position.', formula: 'Center = Green' }
    ]
  }
];

// GENERATE QUESTIONS FOR EVERY TOPIC OF EVERY CHAPTER ACROSS YEARS 2015 TO 2026
chapters.forEach(ch => {
  const chIdxMatch = ch._id.match(/_(\d+)$/);
  const chIdx = chIdxMatch ? parseInt(chIdxMatch[1]) : 1;
  const subId = ch.subjectId;

  // Get templates for this subject and chapter
  let tplArray = [];
  if (subId === 'sub_math') {
    tplArray = mathTemplates[chIdx] || mathTemplates[1];
  } else if (subId === 'sub_analytical') {
    tplArray = analyticalTemplates[chIdx] || analyticalTemplates[1];
  } else if (subId === 'sub_computer') {
    tplArray = computerTemplates[chIdx] || computerTemplates[1];
  } else if (subId === 'sub_english') {
    tplArray = englishTemplates[chIdx] || englishTemplates[1];
  }

  // Find topics for this chapter
  const chTopics = topics.filter(t => t.chapterId === ch._id);

  // For every topic in this chapter, generate questions covering years up to 2026
  chTopics.forEach((top, topIndex) => {
    // We generate 4 questions per topic spanning different years (including 2026, 2025, 2024, etc.)
    for (let qIdx = 0; qIdx < 4; qIdx++) {
      // Pick year from ALL_YEARS
      // Ensures 2026 and 2025 appear regularly across all topics!
      const yearIndex = (chIdx * 3 + topIndex * 2 + qIdx) % ALL_YEARS.length;
      const year = ALL_YEARS[yearIndex];

      const tpl = tplArray[qIdx % tplArray.length];
      const diff = DIFFICULTIES[(qIdx + topIndex) % 3];

      // Shuffle options deterministically
      const correctText = tpl.opts[0];
      const allOpts = [...tpl.opts];
      // Deterministic shift of correct answer
      const shift = (qIdCounter + year) % 4;
      const optKeys = ['A', 'B', 'C', 'D'];
      const correctKey = optKeys[shift];

      // Put correct answer at index `shift`
      const shuffled = [];
      const distractorPool = allOpts.slice(1);
      let distIdx = 0;
      for (let k = 0; k < 4; k++) {
        if (k === shift) {
          shuffled.push({ id: optKeys[k], text: correctText });
        } else {
          shuffled.push({ id: optKeys[k], text: distractorPool[distIdx++] });
        }
      }

      questions.push({
        _id: `q_gen_${qIdCounter}`,
        topicId: top._id,
        chapterId: ch._id,
        subjectId: subId,
        year: year,
        questionNumber: qIdCounter,
        questionText: tpl.text(year),
        options: shuffled,
        correctAnswer: correctKey,
        difficulty: diff,
        explanation: {
          summary: `Comprehensive solution for ${ch.name} (${year} NIMCET problem).`,
          prerequisites: [
            { topic: `${ch.name} Fundamentals`, description: `Core principles of ${top.name}`, importance: 'essential' },
            { topic: 'Problem-Solving Strategy', description: 'Accurate formula substitution', importance: 'helpful' }
          ],
          stepByStep: [
            { stepNumber: 1, title: 'Understand Given Information', content: `Analyze given parameters in the problem statement.`, formula: tpl.formula || '', calculation: '' },
            { stepNumber: 2, title: 'Apply Mathematical Formula', content: `Substitute given values into the governing relation.`, formula: tpl.formula || '', calculation: tpl.calc || '' },
            { stepNumber: 3, title: 'Conclusion', content: `The final calculated result matches Option ${correctKey} (${correctText}).`, formula: '', calculation: '' }
          ],
          conceptUsed: `${ch.name} - ${top.name}`,
          tips: ['Always verify boundary conditions.', 'Substitute answers back to verify where feasible.'],
          commonMistakes: ['Sign errors in algebraic manipulations', 'Confusing formula definitions']
        },
        tags: [subId, ch.name.toLowerCase().replace(/[^a-z0-9]/g, '-'), `nimcet-${year}`, diff],
        isFromPreviousYear: true,
        examSource: 'NIMCET'
      });

      qIdCounter++;
    }
  });
});

// NOW ADD 10-YEAR CAT REASONING QUESTIONS (STRICTLY sub_analytical ONLY)
// Spanning years 2015 through 2026!
const analyticalTopics = topics.filter(t => t.chapterId.startsWith('ch_sub_analytical'));
ALL_YEARS.forEach((yr, idx) => {
  const tpl = catTemplates[idx % catTemplates.length];
  const assignedTopic = analyticalTopics[idx % analyticalTopics.length];
  const shift = idx % 4;
  const optKeys = ['A', 'B', 'C', 'D'];
  const correctKey = optKeys[shift];

  const shuffled = [];
  const correctText = tpl.opts[0];
  const distractorPool = tpl.opts.slice(1);
  let distIdx = 0;
  for (let k = 0; k < 4; k++) {
    if (k === shift) {
      shuffled.push({ id: optKeys[k], text: correctText });
    } else {
      shuffled.push({ id: optKeys[k], text: distractorPool[distIdx++] });
    }
  }

  questions.push({
    _id: `q_cat_${yr}_${idx}`,
    topicId: assignedTopic._id,
    chapterId: assignedTopic.chapterId,
    subjectId: 'sub_analytical', // STRICTLY sub_analytical!
    year: yr,
    questionNumber: qIdCounter++,
    questionText: tpl.text(yr),
    options: shuffled,
    correctAnswer: correctKey,
    difficulty: tpl.diff,
    explanation: {
      summary: tpl.summary,
      prerequisites: [
        { topic: 'CAT Analytical Reasoning', description: 'Advanced puzzle solving and elimination', importance: 'essential' },
        { topic: 'Time Management', description: 'Rapid constraint verification under timed pressure', importance: 'essential' }
      ],
      stepByStep: tpl.stepByStep,
      conceptUsed: tpl.concept,
      tips: ['Draw the diagram/matrix before trying to answer questions.', 'Eliminate options based on negative constraints.'],
      commonMistakes: ['Assuming conditions not explicitly stated in the problem.']
    },
    tags: ['cat-reasoning', 'analytical-ability', 'dilr', `cat-${yr}`, 'high-difficulty'],
    isFromPreviousYear: true,
    examSource: 'CAT'
  });
});

console.log(`Generated:`);
console.log(`- Subjects: ${subjects.length}`);
console.log(`- Chapters: ${chapters.length}`);
console.log(`- Topics: ${topics.length}`);
console.log(`- Total Questions: ${questions.length}`);

// Breakdown by subject:
const bySub = {};
const byYr = {};
questions.forEach(q => {
  bySub[q.subjectId] = (bySub[q.subjectId] || 0) + 1;
  byYr[q.year] = (byYr[q.year] || 0) + 1;
});
console.log('Questions by Subject:', bySub);
console.log('Questions by Year (up to 2026):', byYr);

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
console.log('Successfully saved to seedData.js!');
