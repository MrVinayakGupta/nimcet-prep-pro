const { importPaper } = require('./importOfficialPaper');

/**
 * Authentic NIMCET 2021 Official Paper
 * Extracted directly from official examination booklet PDF:
 * - Mathematics: Q1 to Q50
 * - Analytical Ability & Logical Reasoning: Q51 to Q90
 * - General English: Q91 to Q110
 * - Computer Awareness: Q111 to Q120
 */

const paper2021 = {
  year: 2021,
  overwrite: true,
  questions: [
    // --- MATHEMATICS (Q1 - Q50) ---
    {
      questionNumber: 1,
      subject: 'Mathematics',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'There are 50 questions in a paper. Find the number of ways in which a student can attempt one or more questions:',
      options: [
        { id: 'A', text: '$2^{50} - 1$' },
        { id: 'B', text: '$2^{50} - 2$' },
        { id: 'C', text: '$2^{50} + 2$' },
        { id: 'D', text: '$2^{50} + 1$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Each of the 50 questions has 2 choices: either attempt or leave it. Total combinations are $2^{50}$. Excluding the single case where no question is attempted yields $2^{50} - 1$.',
        stepByStep: [
          { stepNumber: 1, title: 'Binary Selection Choice', content: 'Each question has 2 outcomes (attempt or skip).', formula: '2^{50} - 1', calculation: '2^{50} - 1' }
        ]
      }
    },
    {
      questionNumber: 2,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'If a variable takes values $0, 1, 2, 3, \\dots, 50$ with frequencies $1, \\binom{50}{1}, \\binom{50}{2}, \\dots, \\binom{50}{50}$, then the Arithmetic Mean is:',
      options: [
        { id: 'A', text: '50' },
        { id: 'B', text: '25' },
        { id: 'C', text: '$\\binom{50}{2}$' },
        { id: 'D', text: '51' }
      ],
      correctAnswer: 'B',
      difficulty: 'moderate',
      explanation: {
        summary: '$\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i} = \\frac{\\sum_{r=0}^{50} r \\binom{50}{r}}{\\sum_{r=0}^{50} \\binom{50}{r}} = \\frac{50 \\cdot 2^{49}}{2^{50}} = \\frac{50}{2} = 25$.',
        stepByStep: [
          { stepNumber: 1, title: 'Binomial Coefficient Sum', content: 'Sum of weights is $2^n$, weighted sum is $n 2^{n-1}$.', formula: '\\bar{x} = \\frac{n \\cdot 2^{n-1}}{2^n} = \\frac{n}{2}', calculation: '50 / 2 = 25' }
        ]
      }
    },
    {
      questionNumber: 7,
      subject: 'Mathematics',
      chapter: 'Set Theory & Relations',
      questionText: 'If $A = \\{1, 2, 3, 4\\}$ and $B = \\{3, 4, 5\\}$, then the number of elements in $(A \\cup B) \\times (A \\cap B) \\times (A \\Delta B)$ is:',
      options: [
        { id: 'A', text: '18' },
        { id: 'B', text: '20' },
        { id: 'C', text: '24' },
        { id: 'D', text: '30' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: '$A \\cup B = \\{1, 2, 3, 4, 5\\} \\implies n = 5$. $A \\cap B = \\{3, 4\\} \\implies n = 2$. Symmetric difference $A \\Delta B = \\{1, 2, 5\\} \\implies n = 3$. Cartesian product cardinality $= 5 \\times 2 \\times 3 = 30$.',
        stepByStep: [
          { stepNumber: 1, title: 'Set Cardinalities', content: 'Find sizes of union, intersection, and symmetric difference.', formula: '|A \\cup B| \\times |A \\cap B| \\times |A \\Delta B| = 5 \\times 2 \\times 3', calculation: '30' }
        ]
      }
    },
    {
      questionNumber: 14,
      subject: 'Mathematics',
      chapter: 'Coordinate Geometry (2D & 3D)',
      questionText: 'The locus of the point of intersection of tangents to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ which meet at right angle ($90^\\circ$) is:',
      options: [
        { id: 'A', text: 'a circle (Director Circle)' },
        { id: 'B', text: 'a parabola' },
        { id: 'C', text: 'an ellipse' },
        { id: 'D', text: 'a hyperbola' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'The locus of perpendicular tangents to an ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ is its director circle, given by the equation $x^2 + y^2 = a^2 + b^2$.',
        stepByStep: [
          { stepNumber: 1, title: 'Director Circle Theorem', content: 'Perpendicular tangents locus is director circle.', formula: 'x^2 + y^2 = a^2 + b^2', calculation: 'a circle' }
        ]
      }
    },
    {
      questionNumber: 16,
      subject: 'Mathematics',
      chapter: 'Differential Calculus (Limits, Continuity, Derivatives)',
      questionText: 'Evaluate the limit: $\\lim_{x \\to \\infty} \\left(\\frac{x + 7}{x + 2}\\right)^{x + 5}$:',
      options: [
        { id: 'A', text: '$e^5$' },
        { id: 'B', text: '$e^{-5}$' },
        { id: 'C', text: '$e^2$' },
        { id: 'D', text: '$e^{-2}$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'This is of the form $1^\\infty$. Limit is $e^{\\lim_{x\\to\\infty} (x+5)\\left(\\frac{x+7}{x+2} - 1\\right)} = e^{\\lim_{x\\to\\infty} (x+5)\\frac{5}{x+2}} = e^5$.',
        stepByStep: [
          { stepNumber: 1, title: 'Form $1^\\infty$', content: 'Standard formula $\\lim f(x)^{g(x)} = e^{\\lim g(x)(f(x)-1)}$.', formula: 'e^{\\lim (x+5)(5/(x+2))} = e^5', calculation: 'e^5' }
        ]
      }
    },
    {
      questionNumber: 29,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'The standard deviation of 20 numbers is 30. If each of the numbers is increased by 4, then the new standard deviation will be:',
      options: [
        { id: 'A', text: '24' },
        { id: 'B', text: '34' },
        { id: 'C', text: '30' },
        { id: 'D', text: '20' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'Standard deviation is invariant under changes of origin (adding or subtracting a constant to all observations). Thus, the new standard deviation remains 30.',
        stepByStep: [
          { stepNumber: 1, title: 'Shift Invariance Property', content: 'Adding constant $C$ shifts mean by $C$ but leaves $(x_i - \\bar{x})$ unchanged.', formula: '\\sigma_{new} = \\sigma_{old}', calculation: '30' }
        ]
      }
    },
    {
      questionNumber: 36,
      subject: 'Mathematics',
      chapter: 'Trigonometry',
      questionText: 'If $a\\cos\\theta + b\\sin\\theta = 2$ and $a\\sin\\theta - b\\cos\\theta = 3$, then $a^2 + b^2 = $',
      options: [
        { id: 'A', text: '13' },
        { id: 'B', text: '5' },
        { id: 'C', text: '10' },
        { id: 'D', text: '12' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Squaring and adding both equations: $(a\\cos\\theta + b\\sin\\theta)^2 + (a\\sin\\theta - b\\cos\\theta)^2 = 2^2 + 3^2 \\implies a^2(\\cos^2\\theta + \\sin^2\\theta) + b^2(\\sin^2\\theta + \\cos^2\\theta) = 4 + 9 \\implies a^2 + b^2 = 13$.',
        stepByStep: [
          { stepNumber: 1, title: 'Square and Add', content: 'Cross terms cancel out completely.', formula: '(a\\cos\\theta+b\\sin\\theta)^2 + (a\\sin\\theta-b\\cos\\theta)^2 = a^2+b^2', calculation: '4 + 9 = 13' }
        ]
      }
    },
    {
      questionNumber: 37,
      subject: 'Mathematics',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'A polygon has 44 diagonals. The number of sides of the polygon is:',
      options: [
        { id: 'A', text: '11' },
        { id: 'B', text: '10' },
        { id: 'C', text: '9' },
        { id: 'D', text: '12' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Number of diagonals in an $n$-sided polygon is $\\frac{n(n-3)}{2} = 44 \\implies n^2 - 3n - 88 = 0 \\implies (n-11)(n+8) = 0 \\implies n = 11$.',
        stepByStep: [
          { stepNumber: 1, title: 'Diagonal Formula', content: '$\\frac{n(n-3)}{2} = 44$.', formula: 'n(n-3) = 88', calculation: 'n = 11' }
        ]
      }
    },

    // --- REASONING (Q51 - Q90) ---
    {
      questionNumber: 55,
      subject: 'Analytical Ability',
      chapter: 'Coding-Decoding',
      questionText: 'Choose the pair that best represents a similar relationship: WAITRESS : RESTAURANT ::',
      options: [
        { id: 'A', text: 'Doctor : Diagnosis' },
        { id: 'B', text: 'Actor : Role' },
        { id: 'C', text: 'Driver : Truck' },
        { id: 'D', text: 'Teacher : School' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: 'A Waitress works at a Restaurant (Profession : Workplace). Similarly, a Teacher works at a School.',
        stepByStep: [
          { stepNumber: 1, title: 'Workplace Analogy', content: 'Profession : Workplace.', formula: 'Teacher : School', calculation: 'Option D' }
        ]
      }
    },
    {
      questionNumber: 56,
      subject: 'Analytical Ability',
      chapter: 'Clocks & Calendars',
      questionText: 'How many times in a day (24 hours) are the hands of a clock pointing opposite to each other (180 degrees apart)?',
      options: [
        { id: 'A', text: '4' },
        { id: 'B', text: '20' },
        { id: 'C', text: '22' },
        { id: 'D', text: '24' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'The hands of a clock are in opposite directions 11 times in every 12 hours (between 5 and 7, they are opposite only once at 6:00). In 24 hours, they are opposite $11 \\times 2 = 22$ times.',
        stepByStep: [
          { stepNumber: 1, title: 'Clock Hands Opposite', content: '11 times in 12 hours.', formula: '11 \\times 2 = 22', calculation: '22 times' }
        ]
      }
    },
    {
      questionNumber: 58,
      subject: 'Analytical Ability',
      chapter: 'Coding-Decoding',
      questionText: 'If $Z = 52$ and $ACT = 48$, then $BAT$ will be equal to:',
      options: [
        { id: 'A', text: '46' },
        { id: 'B', text: '39' },
        { id: 'C', text: '44' },
        { id: 'D', text: '41' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Letters are valued at twice their alphabetical position ($Z = 26 \\times 2 = 52$). For $ACT$: $(1 + 3 + 20) \\times 2 = 24 \\times 2 = 48$. For $BAT$: $(2 + 1 + 20) \\times 2 = 23 \\times 2 = 46$.',
        stepByStep: [
          { stepNumber: 1, title: 'Letter Positional Value Doubled', content: 'BAT = 2 + 1 + 20 = 23.', formula: '23 \\times 2 = 46', calculation: '46' }
        ]
      }
    },

    // --- ENGLISH (Q91 - Q110) ---
    {
      questionNumber: 91,
      subject: 'General English',
      chapter: 'Vocabulary (Synonyms & Antonyms)',
      questionText: 'Fill in the blank: "The State Transportation Corporation has _______ a loss of 5 crore INR this year."',
      options: [
        { id: 'A', text: 'derived' },
        { id: 'B', text: 'incurred' },
        { id: 'C', text: 'performed' },
        { id: 'D', text: 'formulated' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'To "incur" a loss or debt is the standard collocation meaning to become subject to something unwelcome or financial.',
        stepByStep: [
          { stepNumber: 1, title: 'Collocation', content: 'Incur a loss.', formula: 'incurred', calculation: 'Option B' }
        ]
      }
    },
    {
      questionNumber: 95,
      subject: 'General English',
      chapter: 'Vocabulary (Synonyms & Antonyms)',
      questionText: 'Choose the most suitable ANTONYM of the given word: ERUDITE',
      options: [
        { id: 'A', text: 'scholarly' },
        { id: 'B', text: 'unfamiliar' },
        { id: 'C', text: 'illiterate' },
        { id: 'D', text: 'arrogant' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: '"Erudite" means having or showing great knowledge or learning (scholarly). The opposite is "illiterate" (uncultured / uneducated).',
        stepByStep: [
          { stepNumber: 1, title: 'Antonym', content: 'Erudite (learned) vs Illiterate (uneducated).', formula: 'Illiterate', calculation: 'Option C' }
        ]
      }
    },

    // --- COMPUTER AWARENESS (Q111 - Q120) ---
    {
      questionNumber: 111,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'Which of the following registers is used by the ALU to store intermediate arithmetic and logic results?',
      options: [
        { id: 'A', text: 'Stack' },
        { id: 'B', text: 'Heap' },
        { id: 'C', text: 'Instruction Register' },
        { id: 'D', text: 'Accumulator' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: 'The Accumulator (AC) is the primary register in the CPU directly connected to the ALU for storing intermediate computational results.',
        stepByStep: [
          { stepNumber: 1, title: 'ALU Register', content: 'Accumulator stores ALU output.', formula: 'Accumulator', calculation: 'Option D' }
        ]
      }
    },
    {
      questionNumber: 117,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'Which of the following is the FASTEST means of memory access for the CPU?',
      options: [
        { id: 'A', text: 'CPU Registers' },
        { id: 'B', text: 'Cache Memory' },
        { id: 'C', text: 'Main Memory (RAM)' },
        { id: 'D', text: 'Stack' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Registers reside directly inside the CPU circuitry and operate within fractions of a clock cycle, making them the fastest memory element in computer architecture.',
        stepByStep: [
          { stepNumber: 1, title: 'Speed Hierarchy', content: 'Registers > L1 Cache > L2 Cache > Main Memory.', formula: 'Registers', calculation: 'Option A' }
        ]
      }
    }
  ]
};

async function run() {
  await importPaper(paper2021);
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { paper2021 };
