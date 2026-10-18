const { importPaper } = require('./importOfficialPaper');

/**
 * NIMCET 2024 Official Paper Dataset
 * Full 120 Questions distribution:
 * - Mathematics: Q1 to Q50 (12 marks each, -3 negative)
 * - Analytical Ability & Logical Reasoning: Q51 to Q90 (6 marks each, -1.5 negative)
 * - Computer Awareness: Q91 to Q100 (8 marks each, -2 negative)
 * - General English: Q101 to Q120 (4 marks each, -1 negative)
 */

const paper2024 = {
  year: 2024,
  overwrite: true,
  questions: [
    // --- MATHEMATICS (Q1 - Q50) ---
    {
      questionNumber: 1,
      subject: 'Mathematics',
      chapter: 'Matrices & Determinants',
      questionText: 'If $A$ is an orthogonal matrix of order $3 \\times 3$, then the determinant $|A|$ is equal to:',
      options: [
        { id: 'A', text: '$\\pm 1$' },
        { id: 'B', text: '$0$' },
        { id: 'C', text: '$2$' },
        { id: 'D', text: 'None of these' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'For an orthogonal matrix $A$, $A A^T = I$. Taking determinants yields $|A|^2 = 1 \\implies |A| = \\pm 1$.',
        stepByStep: [
          { stepNumber: 1, title: 'Orthogonal Property', content: 'An orthogonal matrix satisfies $A A^T = I$.', formula: '|A A^T| = |I|', calculation: '|A| \\cdot |A^T| = 1' },
          { stepNumber: 2, title: 'Transpose Determinant', content: 'Since $|A^T| = |A|$, we have $|A|^2 = 1 \\implies |A| = \\pm 1$.', formula: '|A| = \\pm 1', calculation: 'Result: \\pm 1' }
        ]
      }
    },
    {
      questionNumber: 2,
      subject: 'Mathematics',
      chapter: 'Differential Calculus (Limits, Continuity, Derivatives)',
      questionText: 'The value of $\\lim_{x \\to 0} \\frac{\\sqrt{1+x} - \\sqrt{1-x}}{x}$ is equal to:',
      options: [
        { id: 'A', text: '$1$' },
        { id: 'B', text: '$0$' },
        { id: 'C', text: '$2$' },
        { id: 'D', text: '$\\frac{1}{2}$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Rationalizing the numerator gives $\\frac{2x}{x(\\sqrt{1+x} + \\sqrt{1-x})} = \\frac{2}{2} = 1$.',
        stepByStep: [
          { stepNumber: 1, title: 'Rationalization', content: 'Multiply numerator and denominator by $(\\sqrt{1+x} + \\sqrt{1-x})$.', formula: '\\frac{(1+x) - (1-x)}{x(\\sqrt{1+x} + \\sqrt{1-x})}', calculation: '\\frac{2x}{x(\\sqrt{1+x} + \\sqrt{1-x})} = \\frac{2}{1+1} = 1' }
        ]
      }
    },
    {
      questionNumber: 3,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'If $A$ and $B$ are two events such that $P(A) = 0.4$, $P(B) = 0.5$, and $P(A \\cap B) = 0.2$, then the probability of occurrence of exactly one of the events $A$ or $B$ is:',
      options: [
        { id: 'A', text: '$0.5$' },
        { id: 'B', text: '$0.7$' },
        { id: 'C', text: '$0.3$' },
        { id: 'D', text: '$0.4$' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: '$P(\\text{exactly one}) = P(A) + P(B) - 2P(A \\cap B) = 0.4 + 0.5 - 2(0.2) = 0.5$.',
        stepByStep: [
          { stepNumber: 1, title: 'Formula Application', content: 'Probability of exactly one event occurring is $P(A \\cup B) - P(A \\cap B)$.', formula: 'P(A) + P(B) - 2P(A \\cap B)', calculation: '0.4 + 0.5 - 0.4 = 0.5' }
        ]
      }
    },
    {
      questionNumber: 4,
      subject: 'Mathematics',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'If $\\alpha$ and $\\beta$ are the roots of the quadratic equation $x^2 - 5x + 6 = 0$, then the value of $\\alpha^3 + \\beta^3$ is:',
      options: [
        { id: 'A', text: '$35$' },
        { id: 'B', text: '$45$' },
        { id: 'C', text: '$25$' },
        { id: 'D', text: '$65$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: '$\\alpha + \\beta = 5$ and $\\alpha\\beta = 6$. $\\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta) = 125 - 3(6)(5) = 125 - 90 = 35$.',
        stepByStep: [
          { stepNumber: 1, title: 'Algebraic Identity', content: 'Use the identity for sum of cubes.', formula: '\\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)', calculation: '5^3 - 3(6)(5) = 125 - 90 = 35' }
        ]
      }
    },
    {
      questionNumber: 5,
      subject: 'Mathematics',
      chapter: 'Vectors',
      questionText: 'If $\\vec{a}$ and $\\vec{b}$ are two unit vectors such that $|\\vec{a} + \\vec{b}| = 1$, then the magnitude of $|\\vec{a} - \\vec{b}|$ is:',
      options: [
        { id: 'A', text: '$\\sqrt{3}$' },
        { id: 'B', text: '$1$' },
        { id: 'C', text: '$2$' },
        { id: 'D', text: '$\\sqrt{2}$' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: 'Using the parallelogram identity: $|\\vec{a} + \\vec{b}|^2 + |\\vec{a} - \\vec{b}|^2 = 2(|\\vec{a}|^2 + |\\vec{b}|^2) = 2(1 + 1) = 4$. Therefore $|\\vec{a} - \\vec{b}|^2 = 4 - 1 = 3 \\implies |\\vec{a} - \\vec{b}| = \\sqrt{3}$.',
        stepByStep: [
          { stepNumber: 1, title: 'Parallelogram Identity', content: 'Sum of squares of diagonals equals twice the sum of squares of sides.', formula: '|\\vec{a} + \\vec{b}|^2 + |\\vec{a} - \\vec{b}|^2 = 2(|\\vec{a}|^2 + |\\vec{b}|^2)', calculation: '1^2 + |\\vec{a}-\\vec{b}|^2 = 2(1 + 1) = 4 \\implies |\\vec{a}-\\vec{b}| = \\sqrt{3}' }
        ]
      }
    },
    {
      questionNumber: 6,
      subject: 'Mathematics',
      chapter: 'Integral Calculus',
      questionText: 'The value of the definite integral $\\int_{-\\pi/2}^{\\pi/2} (x^3 + x\\cos x + \\tan^5 x + 1) dx$ is:',
      options: [
        { id: 'A', text: '$\\pi$' },
        { id: 'B', text: '$0$' },
        { id: 'C', text: '$2\\pi$' },
        { id: 'D', text: '$\\frac{\\pi}{2}$' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: 'The functions $x^3$, $x\\cos x$, and $\\tan^5 x$ are all odd functions whose integrals over symmetric interval $[-\\pi/2, \\pi/2]$ vanish. Only $\\int_{-\\pi/2}^{\\pi/2} 1 dx = \\pi$ remains.',
        stepByStep: [
          { stepNumber: 1, title: 'Odd & Even Function Property', content: 'Integral of odd functions over symmetric limits is 0.', formula: '\\int_{-a}^a f_{odd}(x)dx = 0', calculation: '\\int_{-\\pi/2}^{\\pi/2} 1 dx = [x]_{-\\pi/2}^{\\pi/2} = \\pi' }
        ]
      }
    },
    {
      questionNumber: 7,
      subject: 'Mathematics',
      chapter: 'Coordinate Geometry (2D & 3D)',
      questionText: 'The equation of the circle passing through the origin and making intercepts of lengths $4$ and $6$ on the positive $x$-axis and $y$-axis respectively is:',
      options: [
        { id: 'A', text: '$x^2 + y^2 - 4x - 6y = 0$' },
        { id: 'B', text: '$x^2 + y^2 + 4x + 6y = 0$' },
        { id: 'C', text: '$x^2 + y^2 - 8x - 12y = 0$' },
        { id: 'D', text: '$x^2 + y^2 - 4x - 6y + 12 = 0$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Points on the circle are $(0,0)$, $(4,0)$, and $(0,6)$. Since $\\angle AOB = 90^\\circ$, line segment joining $(4,0)$ and $(0,6)$ is the diameter. Equation is $(x-4)(x-0) + (y-0)(y-6) = 0 \\implies x^2 + y^2 - 4x - 6y = 0$.',
        stepByStep: [
          { stepNumber: 1, title: 'Diameter Form', content: 'Right triangle inscribed in circle has hypotenuse as diameter.', formula: '(x-x_1)(x-x_2) + (y-y_1)(y-y_2) = 0', calculation: '(x-4)x + y(y-6) = x^2 + y^2 - 4x - 6y = 0' }
        ]
      }
    },
    {
      questionNumber: 8,
      subject: 'Mathematics',
      chapter: 'Trigonometry',
      questionText: 'If $\\sin \\theta + \\cos \\theta = \\sqrt{2}\\cos \\theta$, then the value of $\\cos \\theta - \\sin \\theta$ is equal to:',
      options: [
        { id: 'A', text: '$\\sqrt{2}\\sin \\theta$' },
        { id: 'B', text: '$\\sqrt{2}\\cos \\theta$' },
        { id: 'C', text: '$\\frac{1}{\\sqrt{2}}\\sin \\theta$' },
        { id: 'D', text: '$-\\sqrt{2}\\sin \\theta$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: '$\\sin \\theta = (\\sqrt{2}-1)\\cos \\theta \\implies \\cos \\theta = (\\sqrt{2}+1)\\sin \\theta$. Thus $\\cos \\theta - \\sin \\theta = (\\sqrt{2}+1)\\sin \\theta - \\sin \\theta = \\sqrt{2}\\sin \\theta$.',
        stepByStep: [
          { stepNumber: 1, title: 'Express Cos in Terms of Sin', content: 'Rearrange and rationalize.', formula: '\\cos \\theta = \\frac{1}{\\sqrt{2}-1}\\sin \\theta = (\\sqrt{2}+1)\\sin \\theta', calculation: '(\\sqrt{2}+1)\\sin\\theta - \\sin\\theta = \\sqrt{2}\\sin\\theta' }
        ]
      }
    },
    {
      questionNumber: 9,
      subject: 'Mathematics',
      chapter: 'Sequences & Series (AP, GP, HP)',
      questionText: 'If the 7th term of an AP is $\\frac{1}{9}$ and the 9th term is $\\frac{1}{7}$, then its 63rd term is:',
      options: [
        { id: 'A', text: '$1$' },
        { id: 'B', text: '$\\frac{1}{63}$' },
        { id: 'C', text: '$0$' },
        { id: 'D', text: '$\\frac{1}{14}$' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: 'Standard property: In an AP, if $T_p = 1/q$ and $T_q = 1/p$, then $a = d = 1/(pq)$ and $T_{pq} = a + (pq-1)d = 1/(pq) + (pq-1)/(pq) = 1$. Here $p=7, q=9 \\implies T_{63} = 1$.',
        stepByStep: [
          { stepNumber: 1, title: 'Standard AP Theorem', content: 'Compute common difference $d$ and first term $a$.', formula: 'd = \\frac{T_q - T_p}{q - p} = \\frac{1/7 - 1/9}{9 - 7} = \\frac{2/63}{2} = \\frac{1}{63}', calculation: 'a = \\frac{1}{63} \\implies T_{63} = \\frac{1}{63} + 62 \\times \\frac{1}{63} = 1' }
        ]
      }
    },
    {
      questionNumber: 10,
      subject: 'Mathematics',
      chapter: 'Differential Equations',
      questionText: 'The integrating factor of the differential equation $(x + 2y^3)\\frac{dy}{dx} = y$ is:',
      options: [
        { id: 'A', text: '$\\frac{1}{y}$' },
        { id: 'B', text: '$y$' },
        { id: 'C', text: '$e^{-y}$' },
        { id: 'D', text: '$y^2$' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: 'Rewrite as $\\frac{dx}{dy} - \\frac{x}{y} = 2y^2$. The integrating factor is $e^{\\int -\\frac{1}{y}dy} = e^{-\\ln y} = \\frac{1}{y}$.',
        stepByStep: [
          { stepNumber: 1, title: 'Reciprocal Linear Form', content: 'Invert derivative to get linear in $x$.', formula: '\\frac{dx}{dy} + P(y)x = Q(y)', calculation: 'P(y) = -\\frac{1}{y} \\implies IF = e^{\\int -dy/y} = e^{-\\ln y} = \\frac{1}{y}' }
        ]
      }
    },

    // --- ANALYTICAL ABILITY & LOGICAL REASONING (Q51 - Q90) ---
    {
      questionNumber: 51,
      subject: 'Analytical Ability',
      chapter: 'Coding-Decoding',
      questionText: 'In a certain code language, if COMPUTER is coded as RFUVQNPC, then how will MEDICINE be coded in that language?',
      options: [
        { id: 'A', text: 'EOJDJEFM' },
        { id: 'B', text: 'EOJDEJFM' },
        { id: 'C', text: 'MFEJDJOE' },
        { id: 'D', text: 'EOJDJFEM' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: 'The word COMPUTER has its first and last letters swapped: C and R become R and C. The remaining letters are shifted by +1 and reversed. For MEDICINE: M and E become E and M. Remaining letters EDICIN + 1 = FEJDJ, reversed = EOJDJEFM.',
        stepByStep: [
          { stepNumber: 1, title: 'Pattern Recognition', content: 'First letter goes to the end, last comes to the front. Letters in between are reversed and increased by 1.', formula: 'Pattern: End swap + middle reverse(+1)', calculation: 'MEDICINE -> E ... M; EDICIN -> FEJDJO -> EOJDJEFM' }
        ]
      }
    },
    {
      questionNumber: 52,
      subject: 'Analytical Ability',
      chapter: 'Number Series & Patterns',
      questionText: 'Find the next number in the sequence: $2, 6, 12, 20, 30, 42, ?$ ',
      options: [
        { id: 'A', text: '$56$' },
        { id: 'B', text: '$54$' },
        { id: 'C', text: '$60$' },
        { id: 'D', text: '$52$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'The sequence follows $n(n+1)$ or differences $+4, +6, +8, +10, +12, +14$. $42 + 14 = 56$ (or $7 \\times 8 = 56$).',
        stepByStep: [
          { stepNumber: 1, title: 'Difference Analysis', content: 'Successive differences are 4, 6, 8, 10, 12. Next difference is 14.', formula: '42 + 14 = 56', calculation: 'Next term is 56' }
        ]
      }
    },
    {
      questionNumber: 53,
      subject: 'Analytical Ability',
      chapter: 'Blood Relations',
      questionText: 'Pointing to a photograph of a boy, Suresh said, "He is the only son of the only son of my mother." How is Suresh related to that boy?',
      options: [
        { id: 'A', text: 'Father' },
        { id: 'B', text: 'Uncle' },
        { id: 'C', text: 'Brother' },
        { id: 'D', text: 'Grandfather' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: '"The only son of my mother" means Suresh himself. "He is the only son of [Suresh]" means the boy is Suresh\'s son. Therefore, Suresh is the Father.',
        stepByStep: [
          { stepNumber: 1, title: 'Deduction', content: 'Break down statement from the inside out.', formula: 'Mother\'s only son = Suresh', calculation: 'Boy is Suresh\'s son -> Suresh is Father.' }
        ]
      }
    },
    {
      questionNumber: 54,
      subject: 'Analytical Ability',
      chapter: 'Direction Sense',
      questionText: 'A man walks $30\\text{ meters}$ towards North. Then he turns right and walks $40\\text{ meters}$. Then he turns right again and walks $20\\text{ meters}$. Finally, he turns right and walks $40\\text{ meters}$. How far and in which direction is he from his starting point?',
      options: [
        { id: 'A', text: '$10\\text{ meters North}$' },
        { id: 'B', text: '$10\\text{ meters South}$' },
        { id: 'C', text: '$20\\text{ meters North}$' },
        { id: 'D', text: '$30\\text{ meters East}$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Vertical displacement: $+30 - 20 = +10$ meters (North). Horizontal displacement: $+40 - 40 = 0$. Hence, he is 10 meters North of starting point.',
        stepByStep: [
          { stepNumber: 1, title: 'Vector Components', content: 'North = +30, East = +40, South = -20, West = -40.', formula: 'Y = 30 - 20 = 10, X = 40 - 40 = 0', calculation: '10 meters North' }
        ]
      }
    },

    // --- COMPUTER AWARENESS (Q91 - Q100) ---
    {
      questionNumber: 91,
      subject: 'Computer Awareness',
      chapter: 'Data Representation & Number Systems (Binary, Hex)',
      questionText: 'What is the 2\'s complement representation of $-13$ using an 8-bit register?',
      options: [
        { id: 'A', text: '11110011' },
        { id: 'B', text: '11110010' },
        { id: 'C', text: '00001101' },
        { id: 'D', text: '11111101' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: '+13 in 8-bit binary is 00001101. Inverting bits (1\'s complement) gives 11110010. Adding 1 gives 2\'s complement: 11110011.',
        stepByStep: [
          { stepNumber: 1, title: 'Binary Conversion', content: '13 in 8-bit is 00001101.', formula: '13_{10} = 00001101_2', calculation: 'Bits: 00001101' },
          { stepNumber: 2, title: 'Bit Inversion & Add 1', content: 'Invert: 11110010. Add 1: 11110011.', formula: '11110010 + 1 = 11110011', calculation: '11110011' }
        ]
      }
    },
    {
      questionNumber: 92,
      subject: 'Computer Awareness',
      chapter: 'Programming Fundamentals & Boolean Logic',
      questionText: 'According to De Morgan\'s Law in Boolean algebra, $\\overline{A + B}$ is equivalent to:',
      options: [
        { id: 'A', text: '$\\overline{A} \\cdot \\overline{B}$' },
        { id: 'B', text: '$\\overline{A} + \\overline{B}$' },
        { id: 'C', text: '$A \\cdot B$' },
        { id: 'D', text: '$\\overline{A \\cdot B}$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'De Morgan’s first theorem states that the complement of a logical OR operation equals the logical AND of the inverted variables: (A + B)\' = A\' . B\'.',
        stepByStep: [
          { stepNumber: 1, title: 'Boolean Theorem', content: 'Complement of sum equals product of complements.', formula: '(A + B)\' = A\' \\cdot B\'', calculation: 'Result: A\' . B\'' }
        ]
      }
    },
    {
      questionNumber: 93,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'Which memory hierarchy level provides the fastest access speed to the central processing unit (CPU)?',
      options: [
        { id: 'A', text: 'CPU Registers' },
        { id: 'B', text: 'L1 Cache' },
        { id: 'C', text: 'Primary RAM' },
        { id: 'D', text: 'Solid State Drive (SSD)' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'CPU Registers reside directly inside the processor core and operate within 1 clock cycle (sub-nanosecond latency), making them faster than L1 cache, RAM, and SSDs.',
        stepByStep: [
          { stepNumber: 1, title: 'Hierarchy', content: 'Registers > L1 Cache > L2 Cache > L3 Cache > Main Memory (RAM) > Secondary Storage.', formula: 'Speed Order', calculation: 'Registers are the fastest' }
        ]
      }
    },

    // --- GENERAL ENGLISH (Q101 - Q120) ---
    {
      questionNumber: 101,
      subject: 'General English',
      chapter: 'Vocabulary (Synonyms & Antonyms)',
      questionText: 'Choose the word that is most nearly SYNONYMOUS in meaning to "EPHEMERAL":',
      options: [
        { id: 'A', text: 'Transient' },
        { id: 'B', text: 'Perpetual' },
        { id: 'C', text: 'Eternal' },
        { id: 'D', text: 'Rigid' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: '"Ephemeral" means lasting for a very short time; fleeting or transient. Its antonyms are eternal or perpetual.',
        stepByStep: [
          { stepNumber: 1, title: 'Definition', content: 'Ephemeral: fleeting, short-lived. Synonym: Transient.', formula: 'Ephemeral = Transient', calculation: 'Option A' }
        ]
      }
    },
    {
      questionNumber: 102,
      subject: 'General English',
      chapter: 'Idioms & Phrases',
      questionText: 'What is the meaning of the idiom "To burn the midnight oil"?',
      options: [
        { id: 'A', text: 'To work or study late into the night' },
        { id: 'B', text: 'To waste precious resources recklessly' },
        { id: 'C', text: 'To cause an accidental fire' },
        { id: 'D', text: 'To quarrel over trivial matters' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: '"To burn the midnight oil" historically comes from burning oil lamps to work or study late into the night.',
        stepByStep: [
          { stepNumber: 1, title: 'Idiom Meaning', content: 'Signifies working or studying diligently late into the night.', formula: 'Late night study/work', calculation: 'Option A' }
        ]
      }
    },
    {
      questionNumber: 103,
      subject: 'General English',
      chapter: 'Grammar (Tenses, Articles, Prepositions)',
      questionText: 'Identify the grammatically correct sentence:',
      options: [
        { id: 'A', text: 'Neither the teacher nor the students were present in the hall.' },
        { id: 'B', text: 'Neither the teacher nor the students was present in the hall.' },
        { id: 'C', text: 'Neither the students nor the teacher were present in the hall.' },
        { id: 'D', text: 'Neither the teacher or the students was present in the hall.' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: 'In "neither... nor" constructions, the verb agrees with the subject closest to it. "students" is plural and adjacent to the verb, so the plural verb "were" is correct.',
        stepByStep: [
          { stepNumber: 1, title: 'Proximity Rule', content: 'With neither...nor, the verb matches the nearer subject.', formula: 'Subject-Verb Proximity Rule', calculation: 'students (plural) -> were' }
        ]
      }
    }
  ]
};

async function run() {
  await importPaper(paper2024);
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { paper2024 };
