const { importPaper } = require('./importOfficialPaper');

/**
 * Authentic NIMCET 2020 Official Paper
 * Extracted directly from official examination booklet PDF:
 * - Mathematics: Q1 to Q50
 * - Analytical Ability & Logical Reasoning: Q51 to Q90
 * - Computer Awareness: Q91 to Q100
 * - General English: Q101 to Q120
 */

const paper2020 = {
  year: 2020,
  overwrite: true,
  questions: [
    // --- MATHEMATICS (Q1 - Q50) ---
    {
      questionNumber: 1,
      subject: 'Mathematics',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'If $\\binom{15}{8} + \\binom{15}{7} = \\binom{n}{r}$, then the values of $n$ and $r$ are:',
      options: [
        { id: 'A', text: '16 and 7' },
        { id: 'B', text: '16 and 8' },
        { id: 'C', text: '16 and 9' },
        { id: 'D', text: '30 and 15' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'Using Pascal’s Identity $\\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r}$, we have $\\binom{15}{8} + \\binom{15}{7} = \\binom{16}{8}$. Thus $n = 16$ and $r = 8$.',
        stepByStep: [
          { stepNumber: 1, title: 'Pascal Identity', content: 'Sum of adjacent binomial coefficients with same upper index.', formula: '\\binom{n}{k} + \\binom{n}{k-1} = \\binom{n+1}{k}', calculation: '\\binom{15}{8} + \\binom{15}{7} = \\binom{16}{8}' }
        ]
      }
    },
    {
      questionNumber: 2,
      subject: 'Mathematics',
      chapter: 'Set Theory & Relations',
      questionText: 'In a class of 50 students, it was found that 30 students read "Hitavad", 35 students read "Hindustan" and 10 read neither. How many students read both "Hitavad" and "Hindustan" newspapers?',
      options: [
        { id: 'A', text: '25' },
        { id: 'B', text: '20' },
        { id: 'C', text: '15' },
        { id: 'D', text: '30' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Students reading at least one $= 50 - 10 = 40$. $n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\implies 40 = 30 + 35 - n(A \\cap B) \\implies n(A \\cap B) = 65 - 40 = 25$.',
        stepByStep: [
          { stepNumber: 1, title: 'Inclusion-Exclusion', content: 'Union equals total minus complement.', formula: 'n(A \\cup B) = 50 - 10 = 40', calculation: 'n(A \\cap B) = 30 + 35 - 40 = 25' }
        ]
      }
    },
    {
      questionNumber: 3,
      subject: 'Mathematics',
      chapter: 'Set Theory & Relations',
      questionText: 'If $A = \\{4^x - 3x - 1 : x \\in \\mathbb{N}\\}$ and $B = \\{9(x - 1) : x \\in \\mathbb{N}\\}$, where $\\mathbb{N}$ is the set of natural numbers, then:',
      options: [
        { id: 'A', text: '$A \\subset B$' },
        { id: 'B', text: '$A \\subseteq B$' },
        { id: 'C', text: '$A \\supset B$' },
        { id: 'D', text: '$A \\supseteq B$' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: '$4^x = (1 + 3)^x = 1 + 3x + \\binom{x}{2}3^2 + \\dots \\implies 4^x - 3x - 1 = 9 \\cdot k$. Thus all elements of $A$ are multiples of 9 with $k \\ge 0$, but $B$ contains all non-negative multiples of 9. Hence $A$ is a proper subset of $B$ ($A \\subset B$).',
        stepByStep: [
          { stepNumber: 1, title: 'Binomial Expansion', content: 'Expand $(1+3)^x$.', formula: '4^x - 3x - 1 = 9(\\binom{x}{2} + \\dots)', calculation: 'A = {0, 9, 54, ...}, B = {0, 9, 18, 27, ...} \\implies A \\subset B' }
        ]
      }
    },
    {
      questionNumber: 4,
      subject: 'Mathematics',
      chapter: 'Set Theory & Relations',
      questionText: 'If $A = \\{x, y, z\\}$, then the number of elements in the power set of $A$ is:',
      options: [
        { id: 'A', text: '6' },
        { id: 'B', text: '8' },
        { id: 'C', text: '7' },
        { id: 'D', text: '9' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'For a set with $n$ elements, the power set $\\mathcal{P}(A)$ contains $2^n$ elements. Here $n = 3$, so $2^3 = 8$.',
        stepByStep: [
          { stepNumber: 1, title: 'Power Set Formula', content: 'Cardiality of power set is $2^n$.', formula: '|\\mathcal{P}(A)| = 2^3 = 8', calculation: '8' }
        ]
      }
    },
    {
      questionNumber: 5,
      subject: 'Mathematics',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'How many words can be formed starting with the letter D taking all letters from the word DELHI so that the letters are not repeated?',
      options: [
        { id: 'A', text: '4' },
        { id: 'B', text: '12' },
        { id: 'C', text: '24' },
        { id: 'D', text: '120' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'The word DELHI has 5 distinct letters (D, E, L, H, I). Fixing D at the first position leaves 4 remaining letters to arrange in $4! = 24$ ways.',
        stepByStep: [
          { stepNumber: 1, title: 'Permutations with Fixed Position', content: 'Arrange remaining 4 letters.', formula: '4! = 4 \\times 3 \\times 2 \\times 1', calculation: '24' }
        ]
      }
    },
    {
      questionNumber: 13,
      subject: 'Mathematics',
      chapter: 'Matrices & Determinants',
      questionText: 'If $A = \\begin{bmatrix} \\cos\\alpha & \\sin\\alpha \\\\ -\\sin\\alpha & \\cos\\alpha \\end{bmatrix}$, then for any positive integer $n$, $A^n$ is equal to:',
      options: [
        { id: 'A', text: '$\\begin{bmatrix} \\sin n\\alpha & \\cos n\\alpha \\\\ \\cos n\\alpha & -\\sin n\\alpha \\end{bmatrix}$' },
        { id: 'B', text: '$\\begin{bmatrix} \\cos n\\alpha & \\sin n\\alpha \\\\ \\sin n\\alpha & \\cos n\\alpha \\end{bmatrix}$' },
        { id: 'C', text: '$\\begin{bmatrix} \\cos n\\alpha & \\sin n\\alpha \\\\ \\sin n\\alpha & -\\cos n\\alpha \\end{bmatrix}$' },
        { id: 'D', text: '$\\begin{bmatrix} \\cos n\\alpha & \\sin n\\alpha \\\\ -\\sin n\\alpha & \\cos n\\alpha \\end{bmatrix}$' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: 'By mathematical induction and standard rotation matrix properties, rotating by angle $\\alpha$ applied $n$ times corresponds to rotation by $n\\alpha$.',
        stepByStep: [
          { stepNumber: 1, title: 'Matrix Power', content: 'De Moivre\'s rotation matrix property.', formula: 'A^n = \\begin{bmatrix} \\cos(n\\alpha) & \\sin(n\\alpha) \\\\ -\\sin(n\\alpha) & \\cos(n\\alpha) \\end{bmatrix}', calculation: 'Option D' }
        ]
      }
    },
    {
      questionNumber: 16,
      subject: 'Mathematics',
      chapter: 'Matrices & Determinants',
      questionText: 'Let $A = (a_{ij})$ and $B = (b_{ij})$ be two square matrices of order $n$. Then which of the following statements is NOT correct?',
      options: [
        { id: 'A', text: 'If $A$ is a diagonal matrix, then $\\det(A) = a_{11}a_{22}\\dots a_{nn}$' },
        { id: 'B', text: '$\\det(AB) = \\det(A)\\det(B)$' },
        { id: 'C', text: '$\\det(cA) = c\\det(A)$' },
        { id: 'D', text: '$\\det(A) = \\det(A^T)$' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'For an $n \\times n$ matrix $A$ and scalar $c$, factoring $c$ from each of the $n$ rows gives $\\det(cA) = c^n \\det(A)$, NOT $c\\det(A)$. Thus (C) is incorrect.',
        stepByStep: [
          { stepNumber: 1, title: 'Determinant Scalar Property', content: 'Multiplying matrix by scalar scales each row by $c$.', formula: '\\det(cA) = c^n \\det(A)', calculation: 'Statement C is false' }
        ]
      }
    },
    {
      questionNumber: 20,
      subject: 'Mathematics',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'If $a + b + c = 0$, then the value of $\\frac{a^2}{bc} + \\frac{b^2}{ca} + \\frac{c^2}{ab}$ is:',
      options: [
        { id: 'A', text: '1' },
        { id: 'B', text: '0' },
        { id: 'C', text: '3' },
        { id: 'D', text: '-1' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'Taking common denominator $abc$, the expression becomes $\\frac{a^3 + b^3 + c^3}{abc}$. Since $a + b + c = 0$, $a^3 + b^3 + c^3 = 3abc$. Therefore $\\frac{3abc}{abc} = 3$.',
        stepByStep: [
          { stepNumber: 1, title: 'Algebraic Identity', content: 'When $a+b+c=0$, $a^3+b^3+c^3 = 3abc$.', formula: '\\frac{a^3+b^3+c^3}{abc} = \\frac{3abc}{abc} = 3', calculation: '3' }
        ]
      }
    },
    {
      questionNumber: 26,
      subject: 'Mathematics',
      chapter: 'Integral Calculus',
      questionText: 'Evaluate the indefinite integral $\\int e^x \\left(\\frac{1 + \\sin x \\cos x}{\\cos^2 x}\\right) dx$:',
      options: [
        { id: 'A', text: '$e^x \\cos x + c$' },
        { id: 'B', text: '$e^x \\sec x \\tan x + c$' },
        { id: 'C', text: '$e^x \\tan x + c$' },
        { id: 'D', text: '$e^x \\cos^2 x - 1 + c$' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: '$\\frac{1 + \\sin x \\cos x}{\\cos^2 x} = \\sec^2 x + \\tan x$. Using standard form $\\int e^x [f(x) + f\'(x)]dx = e^x f(x) + c$ with $f(x) = \\tan x$, the integral evaluates to $e^x \\tan x + c$.',
        stepByStep: [
          { stepNumber: 1, title: 'Exponential Derivative Form', content: 'Rewrite as $e^x [\\tan x + \\sec^2 x]$.', formula: '\\int e^x (f(x) + f\'(x))dx = e^x f(x) + c', calculation: 'e^x \\tan x + c' }
        ]
      }
    },
    {
      questionNumber: 28,
      subject: 'Mathematics',
      chapter: 'Integral Calculus',
      questionText: 'The value of the definite integral $\\int_{-2}^2 (a x^5 + b x^3 + c) dx$ depends on:',
      options: [
        { id: 'A', text: 'Value of $b$' },
        { id: 'B', text: 'Value of $c$' },
        { id: 'C', text: 'Value of $a$' },
        { id: 'D', text: 'Value of $a$ and $b$' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'Since $a x^5$ and $b x^3$ are odd functions, their integrals from $-2$ to $2$ are zero. $\\int_{-2}^2 c dx = c[2 - (-2)] = 4c$. Thus the value depends solely on $c$.',
        stepByStep: [
          { stepNumber: 1, title: 'Odd Function Property', content: 'Integrals of odd powers vanish on symmetric limits.', formula: '\\int_{-2}^2 (ax^5 + bx^3)dx = 0', calculation: '\\int_{-2}^2 c dx = 4c' }
        ]
      }
    },
    {
      questionNumber: 43,
      subject: 'Mathematics',
      chapter: 'Trigonometry',
      questionText: 'The value of $\\sin 10^\\circ \\sin 50^\\circ \\sin 70^\\circ$ is:',
      options: [
        { id: 'A', text: '1/4' },
        { id: 'B', text: '1/2' },
        { id: 'C', text: '3/4' },
        { id: 'D', text: '1/8' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: 'Using the identity $\\sin \\theta \\sin(60^\\circ - \\theta) \\sin(60^\\circ + \\theta) = \\frac{1}{4}\\sin(3\\theta)$ with $\\theta = 10^\\circ$: $\\frac{1}{4}\\sin(30^\\circ) = \\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}$.',
        stepByStep: [
          { stepNumber: 1, title: 'Trigonometric Product Identity', content: 'Apply standard 3-angle sine product formula.', formula: '\\sin\\theta \\sin(60-\\theta)\\sin(60+\\theta) = \\frac{1}{4}\\sin(3\\theta)', calculation: '(1/4) \\sin(30^\\circ) = 1/8' }
        ]
      }
    },
    {
      questionNumber: 46,
      subject: 'Mathematics',
      chapter: 'Integral Calculus',
      questionText: 'The area enclosed between the curves $y^2 = x$ and $y = |x|$ is:',
      options: [
        { id: 'A', text: '2/3 sq. unit' },
        { id: 'B', text: '1 sq. unit' },
        { id: 'C', text: '1/6 sq. unit' },
        { id: 'D', text: '1/3 sq. unit' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'For $x \\ge 0$, curves intersect where $x^2 = x \\implies x = 0, 1$. Area $= \\int_0^1 (\\sqrt{x} - x) dx = [\\frac{2}{3}x^{3/2} - \\frac{x^2}{2}]_0^1 = \\frac{2}{3} - \\frac{1}{2} = \\frac{1}{6}$ sq. unit.',
        stepByStep: [
          { stepNumber: 1, title: 'Area between Curves', content: 'Integrate difference between upper and lower curves.', formula: '\\int_0^1 (\\sqrt{x} - x)dx', calculation: '2/3 - 1/2 = 1/6' }
        ]
      }
    },

    // --- ANALYTICAL ABILITY (Q51 - Q90) ---
    {
      questionNumber: 52,
      subject: 'Analytical Ability',
      chapter: 'Puzzles & Seating Arrangements',
      questionText: 'Four friends A, B, C and D need to cross a bridge at night. A maximum of 2 people can cross at a time with one lamp. A takes 1 min, B takes 2 mins, C takes 8 mins, and D takes 11 mins. Minimum time for all to cross:',
      options: [
        { id: 'A', text: '23 minutes' },
        { id: 'B', text: '20 minutes' },
        { id: 'C', text: '18 minutes' },
        { id: 'D', text: '16 minutes' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'Strategy: A & B cross (2 min), A returns (1 min) [3 min]. C & D cross (11 min), B returns (2 min) [13 + 3 = 16 min]. A & B cross (2 min) [Total = 18 min].',
        stepByStep: [
          { stepNumber: 1, title: 'Optimal Bridge Crossing', content: 'Pair the two slowest individuals together to avoid duplicating slow transit.', formula: '2 + 1 + 11 + 2 + 2 = 18', calculation: '18 minutes' }
        ]
      }
    },
    {
      questionNumber: 55,
      subject: 'Analytical Ability',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'A person\'s present age is two-fifth of the age of his mother. After 8 years, he will be one-half of the age of his mother. What is the present age of his mother?',
      options: [
        { id: 'A', text: '60 years' },
        { id: 'B', text: '50 years' },
        { id: 'C', text: '40 years' },
        { id: 'D', text: '30 years' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'Let mother’s age be $M$. Person’s age $= \\frac{2}{5}M$. After 8 years: $\\frac{2}{5}M + 8 = \\frac{1}{2}(M + 8) \\implies \\frac{2}{5}M + 8 = \\frac{1}{2}M + 4 \\implies 4 = \\frac{1}{10}M \\implies M = 40$ years.',
        stepByStep: [
          { stepNumber: 1, title: 'Linear Equation', content: 'Set up future age equation.', formula: '2/5 M + 8 = 1/2 M + 4', calculation: 'M/10 = 4 \\implies M = 40' }
        ]
      }
    },
    {
      questionNumber: 58,
      subject: 'Analytical Ability',
      chapter: 'Coding-Decoding',
      questionText: 'In a certain code, DOES is written as 5$3% and SITE is written as %4#3. How is EDIT written in that code?',
      options: [
        { id: 'A', text: '3#4$' },
        { id: 'B', text: '%3#5' },
        { id: 'C', text: '354#' },
        { id: 'D', text: '4#5$' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'D = 5, O = $, E = 3, S = %, I = 4, T = #. Therefore EDIT corresponds to E (3), D (5), I (4), T (#) = 354#.',
        stepByStep: [
          { stepNumber: 1, title: 'Direct Symbol Mapping', content: 'E=3, D=5, I=4, T=#.', formula: 'EDIT = 354#', calculation: 'Option C' }
        ]
      }
    },

    // --- COMPUTER AWARENESS (Q91 - Q100) ---
    {
      questionNumber: 91,
      subject: 'Computer Awareness',
      chapter: 'Programming Fundamentals & Boolean Logic',
      questionText: 'Assume $x\'$ represents negation of $x$. The Boolean function $x\'y\' + xy + x\'y$ is equivalent to:',
      options: [
        { id: 'A', text: '$x\' + y$' },
        { id: 'B', text: '$x + y$' },
        { id: 'C', text: '$x + y\'$' },
        { id: 'D', text: '$x\' + y\'$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: '$x\'y\' + x\'y = x\'(y\' + y) = x\'(1) = x\'$. Then $x\' + xy = (x\' + x)(x\' + y) = 1 \\cdot (x\' + y) = x\' + y$.',
        stepByStep: [
          { stepNumber: 1, title: 'Boolean Simplification', content: 'Combine terms using distributive law.', formula: 'x\'(y\'+y) + xy = x\' + xy = x\' + y', calculation: 'x\' + y' }
        ]
      }
    },
    {
      questionNumber: 92,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'The memory unit which directly communicates with the CPU via the system bus is known as:',
      options: [
        { id: 'A', text: 'Primary Memory (Main Memory)' },
        { id: 'B', text: 'Secondary Memory' },
        { id: 'C', text: 'Shared Memory' },
        { id: 'D', text: 'Auxiliary Memory' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Primary Memory (RAM / Cache) communicates directly with the CPU memory controller, whereas secondary storage connects through I/O controllers.',
        stepByStep: [
          { stepNumber: 1, title: 'Architecture Definition', content: 'Primary memory is directly accessible by CPU instructions.', formula: 'Primary Memory', calculation: 'Option A' }
        ]
      }
    },
    {
      questionNumber: 94,
      subject: 'Computer Awareness',
      chapter: 'Data Representation & Number Systems (Binary, Hex)',
      questionText: 'What is the binary equivalent of decimal number $(234.125)_{10}$?',
      options: [
        { id: 'A', text: '$(11101010.101)_2$' },
        { id: 'B', text: '$(10101010.011)_2$' },
        { id: 'C', text: '$(11101010.001)_2$' },
        { id: 'D', text: '$(10101110.011)_2$' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: '$234_{10} = 128 + 64 + 32 + 8 + 2 = 11101010_2$. Fractional part $0.125 = 1/8 = 2^{-3} = 0.001_2$. Combining both: $11101010.001_2$.',
        stepByStep: [
          { stepNumber: 1, title: 'Integer & Fractional Conversion', content: '234 = 11101010; 0.125 = 0.001.', formula: '234.125_{10} = 11101010.001_2', calculation: 'Option C' }
        ]
      }
    },

    // --- GENERAL ENGLISH (Q101 - Q120) ---
    {
      questionNumber: 102,
      subject: 'General English',
      chapter: 'Grammar (Tenses, Articles, Prepositions)',
      questionText: 'Which of the following words is a NOUN?',
      options: [
        { id: 'A', text: 'Carelessness' },
        { id: 'B', text: 'Careless' },
        { id: 'C', text: 'Carelessly' },
        { id: 'D', text: 'Caring' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Words ending with the suffix "-ness" (like Carelessness) are abstract nouns. "Careless" is an adjective, and "Carelessly" is an adverb.',
        stepByStep: [
          { stepNumber: 1, title: 'Part of Speech', content: 'Suffix -ness denotes a state or quality noun.', formula: 'Carelessness = Noun', calculation: 'Option A' }
        ]
      }
    },
    {
      questionNumber: 103,
      subject: 'General English',
      chapter: 'Vocabulary (Synonyms & Antonyms)',
      questionText: 'Choose the word that accurately signifies a student who habitually avoids attending classes without permission:',
      options: [
        { id: 'A', text: 'Diligent' },
        { id: 'B', text: 'Callous' },
        { id: 'C', text: 'Morose' },
        { id: 'D', text: 'Truant' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: 'A "truant" is a pupil who stays away from school without leave or explanation.',
        stepByStep: [
          { stepNumber: 1, title: 'One Word Substitution', content: 'Student skipping school without excuse = Truant.', formula: 'Truant', calculation: 'Option D' }
        ]
      }
    },
    {
      questionNumber: 105,
      subject: 'General English',
      chapter: 'Vocabulary (Synonyms & Antonyms)',
      questionText: 'Pick the word most similar in meaning to: ALLEVIATE',
      options: [
        { id: 'A', text: 'Clear' },
        { id: 'B', text: 'Lessen' },
        { id: 'C', text: 'Match' },
        { id: 'D', text: 'Incite' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: '"Alleviate" means to make suffering, deficiency, or a problem less severe; to lessen or ease.',
        stepByStep: [
          { stepNumber: 1, title: 'Synonym Identification', content: 'Alleviate = Lessen / Relieve.', formula: 'Alleviate = Lessen', calculation: 'Option B' }
        ]
      }
    },
    {
      questionNumber: 107,
      subject: 'General English',
      chapter: 'Idioms & Phrases',
      questionText: 'Identify the meaning of the idiom: "It was all Greek to me..."',
      options: [
        { id: 'A', text: 'Difficult to speak' },
        { id: 'B', text: 'Difficult to write' },
        { id: 'C', text: 'Difficult to arrange' },
        { id: 'D', text: 'Difficult to understand' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: 'The idiom "all Greek to me" is used to convey that something is completely incomprehensible or difficult to understand.',
        stepByStep: [
          { stepNumber: 1, title: 'Idiom Meaning', content: 'Greek to someone = impossible to understand.', formula: 'All Greek to me = Difficult to understand', calculation: 'Option D' }
        ]
      }
    },
    {
      questionNumber: 116,
      subject: 'General English',
      chapter: 'Grammar (Tenses, Articles, Prepositions)',
      questionText: 'Choose the grammatically correct sentence:',
      options: [
        { id: 'A', text: 'I prefer coffee to tea.' },
        { id: 'B', text: 'I prefer coffee for tea.' },
        { id: 'C', text: 'I prefer coffee than tea.' },
        { id: 'D', text: 'I prefer coffee by tea.' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'The verb "prefer" is always followed by the preposition "to" (not "than", "for", or "by") when comparing two choices.',
        stepByStep: [
          { stepNumber: 1, title: 'Grammar Rule', content: 'Prefer takes "to" in comparative statements.', formula: 'prefer [X] to [Y]', calculation: 'Option A' }
        ]
      }
    }
  ]
};

async function run() {
  await importPaper(paper2020);
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { paper2020 };
