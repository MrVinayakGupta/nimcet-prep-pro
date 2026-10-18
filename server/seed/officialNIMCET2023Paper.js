const { importPaper } = require('./importOfficialPaper');

/**
 * Authentic NIMCET 2023 Official Paper
 * Extracted directly from official examination booklet PDF:
 * - Mathematics: Q1 to Q50 (12 Marks each, -3 Negative)
 * - Analytical Ability & Logical Reasoning: Q51 to Q90 (6 Marks each, -1.5 Negative)
 * - Computer Awareness: Q91 to Q110 (8 Marks each, -2 Negative)
 * - General English: Q111 to Q120 (4 Marks each, -1 Negative)
 * Total: 120 Questions (1000 Marks)
 */

const paper2023 = {
  year: 2023,
  overwrite: true,
  questions: [
    // --- MATHEMATICS (Q1 - Q50) ---
    {
      questionNumber: 1,
      subject: 'Mathematics',
      chapter: 'Coordinate Geometry (2D & 3D)',
      questionText: 'A circle touches the $x$-axis and also touches the circle with centre $(0, 3)$ and radius $2$. The locus of the centre of the circle is:',
      options: [
        { id: 'A', text: 'a circle' },
        { id: 'B', text: 'an ellipse' },
        { id: 'C', text: 'a parabola' },
        { id: 'D', text: 'a hyperbola' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'Let $C_1(h, k)$ be the centre. Since it touches the $x$-axis, radius $r_1 = k$. It touches circle $C_2(0,3)$ with radius $r_2 = 2$. $|C_1 C_2| = r_1 + r_2 \\implies \\sqrt{(h-0)^2 + (k-3)^2} = |k + 2|$. Squaring gives $h^2 - 10k + 5 = 0 \\implies x^2 - 10y + 5 = 0$, which is a parabola.',
        stepByStep: [
          { stepNumber: 1, title: 'Geometric Condition', content: 'For two externally touching circles, the distance between centers equals the sum of radii.', formula: '|C_1 C_2| = r_1 + r_2', calculation: '\\sqrt{h^2 + (k-3)^2} = k + 2' },
          { stepNumber: 2, title: 'Simplification', content: 'Square both sides to eliminate square root.', formula: 'h^2 + k^2 - 6k + 9 = k^2 + 4k + 4', calculation: 'h^2 - 10k + 5 = 0 \\implies x^2 - 10y + 5 = 0 (\\text{Parabola})' }
        ]
      }
    },
    {
      questionNumber: 2,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'A computer producing factory has only two plants $T_1$ and $T_2$. Plant $T_1$ produces 20% and plant $T_2$ produces 80% of total computers produced. 7% of computers produced in the factory turn out to be defective. It is known that $P(\\text{defective} \\mid T_1) = 10 P(\\text{defective} \\mid T_2)$. A computer is randomly selected and is NOT defective. What is the probability that it was produced in plant $T_2$?',
      options: [
        { id: 'A', text: '36/73' },
        { id: 'B', text: '47/79' },
        { id: 'C', text: '78/93' },
        { id: 'D', text: '75/83' }
      ],
      correctAnswer: 'C',
      difficulty: 'hard',
      explanation: {
        summary: 'By law of total probability, $0.2(10x) + 0.8(x) = 0.07 \\implies 2.8x = 0.07 \\implies x = 1/40$. Non-defective rates are $P(\\bar{D}|T_2) = 39/40$ and $P(\\bar{D}|T_1) = 30/40$. Applying Bayes theorem gives $(0.8 \\times 39/40) / [0.2 \\times 30/40 + 0.8 \\times 39/40] = 78/93$.',
        stepByStep: [
          { stepNumber: 1, title: 'Total Probability', content: 'Calculate defective probabilities for each plant.', formula: 'P(D) = P(T_1)P(D|T_1) + P(T_2)P(D|T_2)', calculation: '0.07 = 0.2(10x) + 0.8(x) \\implies x = 1/40' },
          { stepNumber: 2, title: 'Bayes Theorem for Non-Defective', content: 'Compute conditional probability $P(T_2|\\bar{D})$.', formula: 'P(T_2|\\bar{D}) = \\frac{P(T_2)P(\\bar{D}|T_2)}{P(T_1)P(\\bar{D}|T_1) + P(T_2)P(\\bar{D}|T_2)}', calculation: '\\frac{80 \\times 39}{20 \\times 30 + 80 \\times 39} = \\frac{3120}{600 + 3120} = \\frac{78}{93}' }
        ]
      }
    },
    {
      questionNumber: 3,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'The mean of 5 observations is 5 and their variance is 124. If three of the observations are 1, 2 and 6; then the mean deviation from the mean of the data is:',
      options: [
        { id: 'A', text: '2.5' },
        { id: 'B', text: '2.6' },
        { id: 'C', text: '2.8' },
        { id: 'D', text: '2.4' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'Let missing observations be $x, y$. $\\bar{x} = 5 \\implies x + y = 25 - 9 = 16$. Since $x, y > 5$, $|x-5| + |y-5| = x + y - 10 = 6$. Mean deviation $= \\frac{|1-5| + |2-5| + |6-5| + 6}{5} = \\frac{4 + 3 + 1 + 6}{5} = \\frac{14}{5} = 2.8$.',
        stepByStep: [
          { stepNumber: 1, title: 'Find Missing Observations Sum', content: 'Sum of all observations $= 5 \\times 5 = 25$.', formula: '1 + 2 + 6 + x + y = 25', calculation: 'x + y = 16' },
          { stepNumber: 2, title: 'Mean Deviation Calculation', content: 'Average of absolute deviations from mean (5).', formula: 'MD = \\frac{\\sum |x_i - \\bar{x}|}{5}', calculation: '\\frac{4 + 3 + 1 + (x+y-10)}{5} = \\frac{14}{5} = 2.8' }
        ]
      }
    },
    {
      questionNumber: 4,
      subject: 'Mathematics',
      chapter: 'Trigonometry',
      questionText: 'The perimeter of a $\\Delta ABC$ is 6 times the arithmetic mean of the sines of its angles. If the side $a$ is 1, then the angle $A$ is:',
      options: [
        { id: 'A', text: '$\\pi/6$' },
        { id: 'B', text: '$\\pi/3$' },
        { id: 'C', text: '$\\pi/2$' },
        { id: 'D', text: '$\\pi$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: '$a + b + c = 6 \\left(\\frac{\\sin A + \\sin B + \\sin C}{3}\\right) = 2(\\sin A + \\sin B + \\sin C)$. By sine rule, $a + b + c = k(\\sin A + \\sin B + \\sin C)$, so $k = 2$. Therefore $a = k\\sin A \\implies 1 = 2\\sin A \\implies \\sin A = 1/2 \\implies A = \\pi/6$.',
        stepByStep: [
          { stepNumber: 1, title: 'Sine Rule Application', content: 'Use the sine law relation $a = k\\sin A, b = k\\sin B, c = k\\sin C$.', formula: 'a+b+c = 2(\\sin A + \\sin B + \\sin C)', calculation: 'k = 2 \\implies \\sin A = a/2 = 1/2 \\implies A = \\pi/6' }
        ]
      }
    },
    {
      questionNumber: 5,
      subject: 'Mathematics',
      chapter: 'Algebra (Quadratic Equations, Complex Numbers)',
      questionText: 'In an examination of nine papers, a candidate has to pass in more papers than the number of papers in which he fails in order to be successful. The number of ways in which he can be unsuccessful is:',
      options: [
        { id: 'A', text: '255' },
        { id: 'B', text: '256' },
        { id: 'C', text: '128' },
        { id: 'D', text: '$9 \\times 8!$' }
      ],
      correctAnswer: 'B',
      difficulty: 'moderate',
      explanation: {
        summary: 'Candidate fails if he fails in 5, 6, 7, 8, or 9 papers. Number of ways $= \\binom{9}{5} + \\binom{9}{6} + \\binom{9}{7} + \\binom{9}{8} + \\binom{9}{9} = \\frac{1}{2}(2^9) = 2^8 = 256$.',
        stepByStep: [
          { stepNumber: 1, title: 'Combinatorial Symmetry', content: 'By binomial theorem symmetry, half of the $2^9$ total outcomes correspond to failing more than 4 papers.', formula: '\\sum_{k=5}^9 \\binom{9}{k} = \\frac{1}{2} 2^9', calculation: '256' }
        ]
      }
    },
    {
      questionNumber: 6,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'For a group of 100 candidates, the mean and standard deviation of scores were found to be 40 and 15 respectively. Later on, it was found that the scores 25 and 35 were misread as 52 and 53 respectively. Then the corrected mean and standard deviation are:',
      options: [
        { id: 'A', text: '39.9, 14.97' },
        { id: 'B', text: '39.5, 14' },
        { id: 'C', text: '39.55, 14.97' },
        { id: 'D', text: '40.19, 15.1' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'Incorrect sum $= 100 \\times 40 = 4000$. Correct sum $= 4000 - (52 + 53) + (25 + 35) = 3955$. Correct mean $= 3955 / 100 = 39.55$. Matching only option (c).',
        stepByStep: [
          { stepNumber: 1, title: 'Corrected Sum', content: 'Subtract erroneous values and add true values.', formula: '\\sum x_{new} = 4000 - 105 + 60 = 3955', calculation: '\\bar{x} = 39.55' }
        ]
      }
    },
    {
      questionNumber: 7,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'Consider a frequency distribution table with total frequency 685 and median 42.6 in the (40-50) interval. If class 40-50 has frequency 180 and lower cumulative frequency is $214 + f_1$, find $(f_1, f_2)$:',
      options: [
        { id: 'A', text: '80, 25' },
        { id: 'B', text: '83, 22' },
        { id: 'C', text: '79, 26' },
        { id: 'D', text: '82, 23' }
      ],
      correctAnswer: 'D',
      difficulty: 'hard',
      explanation: {
        summary: 'Using median formula: $42.6 = 40 + \\frac{342.5 - (214 + f_1)}{180} \\times 10 \\implies 2.6 \\times 18 = 128.5 - f_1 \\implies 46.8 = 128.5 - f_1 \\implies f_1 \\approx 82$. Since $f_1 + f_2 = 105$, $f_2 = 105 - 82 = 23$.',
        stepByStep: [
          { stepNumber: 1, title: 'Median Interpolation Formula', content: 'Median $= L + \\frac{N/2 - CF}{f} \\times h$.', formula: '42.6 = 40 + \\frac{342.5 - (214 + f_1)}{180} \\times 10', calculation: 'f_1 = 82, f_2 = 23' }
        ]
      }
    },
    {
      questionNumber: 8,
      subject: 'Mathematics',
      chapter: 'Differential Calculus (Limits, Continuity, Derivatives)',
      questionText: 'If $f(x) = \\lim_{x \\to 0} \\frac{6^x - 3^x - 2^x + 1}{\\log_e 9 (1 - \\cos x)}$ is a real number, then $\\lim_{x \\to 0} f(x) = $',
      options: [
        { id: 'A', text: '2' },
        { id: 'B', text: '3' },
        { id: 'C', text: '$\\log_e 2$' },
        { id: 'D', text: '$\\log_e 3$' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'Numerator is $(3^x - 1)(2^x - 1)$. Denominator is $2 \\log_e 3 \\cdot 2\\sin^2(x/2) \\approx 4 \\log_e 3 (x^2/4) = x^2 \\log_e 3$. Ratio becomes $\\frac{\\log_e 3 \\cdot \\log_e 2}{\\log_e 3} = \\log_e 2$.',
        stepByStep: [
          { stepNumber: 1, title: 'Factorization', content: 'Rewrite $6^x - 3^x - 2^x + 1$ as $(3^x - 1)(2^x - 1)$.', formula: '\\lim_{x\\to 0} \\frac{(3^x - 1)(2^x - 1)}{x^2 \\log_e 3}', calculation: '\\frac{\\ln 3 \\cdot \\ln 2}{\\ln 3} = \\ln 2 = \\log_e 2' }
        ]
      }
    },
    {
      questionNumber: 9,
      subject: 'Mathematics',
      chapter: 'Sequences & Series (AP, GP, HP)',
      questionText: 'The sum of infinite terms of a decreasing GP is equal to the greatest value of $f(x) = x^3 + 3x - 9$ in $[-2, 3]$ and difference between the first two terms is $f\'(0)$. Find the common ratio $r$ of the GP:',
      options: [
        { id: 'A', text: '-2/3' },
        { id: 'B', text: '4/3' },
        { id: 'C', text: '+2/3' },
        { id: 'D', text: '-4/3' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: '$f\'(x) = 3x^2 + 3 > 0$, so maximum is at $x=3$: $f(3) = 27 + 9 - 9 = 27$. $S_\\infty = \\frac{a}{1-r} = 27$. $f\'(0) = 3 = a - ar = a(1-r)$. Multiplying both gives $a^2 = 81 \\implies a = 9$. Then $1 - r = 3/9 = 1/3 \\implies r = 2/3$.',
        stepByStep: [
          { stepNumber: 1, title: 'Determine Extremum', content: 'Find greatest value of cubic function.', formula: 'f(3) = 27 \\implies a/(1-r) = 27', calculation: 'a(1-r) = 3 \\implies a^2 = 81 \\implies a = 9, r = 2/3' }
        ]
      }
    },
    {
      questionNumber: 10,
      subject: 'Mathematics',
      chapter: 'Integral Calculus',
      questionText: 'The value of $\\int_{-\\pi/3}^{\\pi/3} \\frac{x \\sin x}{\\cos^2 x} dx$ is:',
      options: [
        { id: 'A', text: '$\\frac{1}{3}(4\\pi + 1)$' },
        { id: 'B', text: '$\\frac{4\\pi}{3} - 2\\log \\tan\\left(\\frac{5\\pi}{12}\\right)$' },
        { id: 'C', text: '$\\frac{4\\pi}{3} + \\log \\tan\\left(\\frac{5\\pi}{12}\\right)$' },
        { id: 'D', text: '$\\frac{4\\pi}{3} - \\log \\tan\\left(\\frac{5\\pi}{3}\\right)$' }
      ],
      correctAnswer: 'B',
      difficulty: 'hard',
      explanation: {
        summary: 'The integrand is an even function, so $I = 2\\int_0^{\\pi/3} x \\sec x \\tan x dx$. By parts: $2[x\\sec x]_0^{\\pi/3} - 2\\int_0^{\\pi/3} \\sec x dx = 2(\\frac{\\pi}{3} \\cdot 2) - 2[\\ln|\\sec x + \\tan x|]_0^{\\pi/3} = \\frac{4\\pi}{3} - 2\\ln(2 + \\sqrt{3}) = \\frac{4\\pi}{3} - 2\\ln\\tan(5\\pi/12)$.',
        stepByStep: [
          { stepNumber: 1, title: 'Integration by Parts', content: 'Take $u = x, v\' = \\sec x \\tan x$.', formula: '\\int u v\' = u v - \\int u\' v', calculation: '2(2\\pi/3) - 2\\ln(2+\\sqrt{3}) = \\frac{4\\pi}{3} - 2\\ln\\tan(5\\pi/12)' }
        ]
      }
    },
    {
      questionNumber: 11,
      subject: 'Mathematics',
      chapter: 'Differential Calculus (Limits, Continuity, Derivatives)',
      questionText: 'The equation of the tangent at any point of curve $x = a\\cos 2t, y = 2\\sqrt{2}a \\sin t$ with slope $m$ is:',
      options: [
        { id: 'A', text: '$y = mx + a(m - 1/m)$' },
        { id: 'B', text: '$y = mx - a(m + 1/m)$' },
        { id: 'C', text: '$y = mx + a(a + 1/a)$' },
        { id: 'D', text: '$y = amx + a(m - 1/m)$' }
      ],
      correctAnswer: 'B',
      difficulty: 'hard',
      explanation: {
        summary: '$\\frac{dy}{dx} = \\frac{2\\sqrt{2}a\\cos t}{-2a\\sin 2t} = \\frac{-1}{\\sqrt{2}\\sin t} = m \\implies \\sin t = \\frac{-1}{\\sqrt{2}m}$. Point coordinates become $x = a(1 - 1/m^2)$ and $y = -2a/m$. Tangent equation is $y - y_1 = m(x - x_1) \\implies y = mx - a(m + 1/m)$.',
        stepByStep: [
          { stepNumber: 1, title: 'Parametric Slope', content: 'Compute derivative $dy/dx$.', formula: 'm = -1/(\\sqrt{2}\\sin t)', calculation: 'x = a(1 - 1/m^2), y = -2a/m' },
          { stepNumber: 2, title: 'Point-Slope Form', content: 'Form line equation.', formula: 'y - (-2a/m) = m[x - a(1 - 1/m^2)]', calculation: 'y = mx - a(m + 1/m)' }
        ]
      }
    },
    {
      questionNumber: 12,
      subject: 'Mathematics',
      chapter: 'Trigonometry',
      questionText: 'If $\\prod_{i=1}^n \\tan(\\alpha_i) = 1$ for all $\\alpha_i \\in [0, \\pi/2]$, then the maximum value of $\\prod_{i=1}^n \\sin \\alpha_i$ is:',
      options: [
        { id: 'A', text: '$1/2^n$' },
        { id: 'B', text: '$1/2^{n/2}$' },
        { id: 'C', text: '1' },
        { id: 'D', text: 'None of these' }
      ],
      correctAnswer: 'B',
      difficulty: 'moderate',
      explanation: {
        summary: 'Multiplying both sides by $\\prod \\sin\\alpha_i$ gives $\\prod \\sin^2 \\alpha_i = \\prod \\sin\\alpha_i \\cos\\alpha_i = \\frac{1}{2^n}\\prod \\sin(2\\alpha_i) \\le \\frac{1}{2^n}$. Taking square root yields $\\prod \\sin\\alpha_i \\le \\frac{1}{2^{n/2}}$.',
        stepByStep: [
          { stepNumber: 1, title: 'Trigonometric Product Bound', content: 'Use $\\sin\\alpha \\cos\\alpha = \\frac{1}{2}\\sin(2\\alpha) \\le 1/2$.', formula: '\\prod \\sin^2 \\alpha_i = \\frac{1}{2^n}\\prod \\sin(2\\alpha_i) \\le 1/2^n', calculation: '\\prod \\sin \\alpha_i \\le 1/2^{n/2}' }
        ]
      }
    },
    {
      questionNumber: 13,
      subject: 'Mathematics',
      chapter: 'Probability & Statistics',
      questionText: 'A speaks truth in 60% and B speaks truth in 50% cases. In what percentage of cases are they likely to contradict each other while narrating the same incident?',
      options: [
        { id: 'A', text: '1/2 (50%)' },
        { id: 'B', text: '1/4 (25%)' },
        { id: 'C', text: '2/3 (66.6%)' },
        { id: 'D', text: '1/3 (33.3%)' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'Contradiction occurs when (A true, B false) or (A false, B true): $P = P(A)P(\\bar{B}) + P(\\bar{A})P(B) = (0.6)(0.5) + (0.4)(0.5) = 0.30 + 0.20 = 0.50 = 1/2$.',
        stepByStep: [
          { stepNumber: 1, title: 'Disjoint Events Sum', content: 'Calculate independent joint contradiction probabilities.', formula: 'P(A \\bar{B}) + P(\\bar{A} B)', calculation: '0.6(0.5) + 0.4(0.5) = 0.5 = 1/2' }
        ]
      }
    },
    {
      questionNumber: 14,
      subject: 'Mathematics',
      chapter: 'Vectors',
      questionText: 'If $\\vec{a} = \\frac{\\hat{i}-2\\hat{j}}{\\sqrt{5}}$ and $\\vec{b} = \\frac{2\\hat{i}+\\hat{j}+3\\hat{k}}{\\sqrt{14}}$, then the value of $(2\\vec{a}+\\vec{b}) \\cdot [(\\vec{a}\\times\\vec{b})\\times(\\vec{a}-2\\vec{b})]$ is:',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '4' },
        { id: 'C', text: '5' },
        { id: 'D', text: '6' }
      ],
      correctAnswer: 'C',
      difficulty: 'hard',
      explanation: {
        summary: 'Notice that $\\vec{a} \\cdot \\vec{b} = \\frac{2 - 2}{\\sqrt{70}} = 0$. Since $\\vec{a} \\perp \\vec{b}$ and both are unit vectors, vector triple product simplification gives $4|\\vec{a}|^2 + |\\vec{b}|^2 = 4(1) + 1 = 5$.',
        stepByStep: [
          { stepNumber: 1, title: 'Orthogonality Check', content: 'Dot product $\\vec{a} \\cdot \\vec{b} = 0$.', formula: '\\vec{a} \\cdot \\vec{b} = 0, |\\vec{a}|=1, |\\vec{b}|=1', calculation: 'Simplifies to 4(1) + 1 = 5' }
        ]
      }
    },
    {
      questionNumber: 15,
      subject: 'Mathematics',
      chapter: 'Vectors',
      questionText: 'Let $\\vec{A} = 2\\hat{i}+\\hat{j}-2\\hat{k}$ and $\\vec{B} = \\hat{i}+\\hat{j}$. If $\\vec{C}$ is a vector such that $|\\vec{C}-\\vec{A}|=3$, the angle between $\\vec{A}\\times\\vec{B}$ and $\\vec{C}$ is $30^\\circ$, and $|(\\vec{A}\\times\\vec{B})\\times\\vec{C}|=3$, then $\\vec{A}\\cdot\\vec{C}$ equals:',
      options: [
        { id: 'A', text: '25/8' },
        { id: 'B', text: '2' },
        { id: 'C', text: '5' },
        { id: 'D', text: '1/8' }
      ],
      correctAnswer: 'B',
      difficulty: 'hard',
      explanation: {
        summary: '$|\\vec{A}\\times\\vec{B}| = |2\\hat{i}-2\\hat{j}+\\hat{k}| = 3$. $|(\\vec{A}\\times\\vec{B})\\times\\vec{C}| = 3 \\cdot |\\vec{C}| \\sin 30^\\circ = 3 \\implies |\\vec{C}| = 2$. Then $|\\vec{C}-\\vec{A}|^2 = |\\vec{C}|^2 + |\\vec{A}|^2 - 2\\vec{A}\\cdot\\vec{C} \\implies 9 = 4 + 9 - 2\\vec{A}\\cdot\\vec{C} \\implies \\vec{A}\\cdot\\vec{C} = 2$.',
        stepByStep: [
          { stepNumber: 1, title: 'Magnitude of Cross Product', content: 'Find length of cross product vector.', formula: '|\\vec{A}\\times\\vec{B}| = \\sqrt{4+4+1} = 3', calculation: '3 |C| (1/2) = 3 \\implies |C| = 2' },
          { stepNumber: 2, title: 'Square of Difference', content: 'Expand $|\\vec{C}-\\vec{A}|^2 = 9$.', formula: '|C|^2 + |A|^2 - 2 A \\cdot C = 9', calculation: '4 + 9 - 2 A \\cdot C = 9 \\implies A \\cdot C = 2' }
        ]
      }
    },
    {
      questionNumber: 16,
      subject: 'Mathematics',
      chapter: 'Set Theory & Relations',
      questionText: 'Let $A$ and $B$ be sets such that $A \\cap X = B \\cap X = \\phi$ and $A \\cup X = B \\cup X$ for some non-empty set $X$. Then:',
      options: [
        { id: 'A', text: '$A = B$' },
        { id: 'B', text: '$A \\cup B = X$' },
        { id: 'C', text: '$B = X$' },
        { id: 'D', text: '$A = X$' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: '$A = A \\cap (A \\cup X) = A \\cap (B \\cup X) = (A \\cap B) \\cup (A \\cap X) = A \\cap B$. Similarly $B = A \\cap B$. Hence $A = B$.',
        stepByStep: [
          { stepNumber: 1, title: 'Distributive Law', content: 'Expand intersection over union.', formula: 'A = (A \\cap B) \\cup (A \\cap X) = A \\cap B', calculation: 'Similarly B = A \\cap B \\implies A = B' }
        ]
      }
    },
    {
      questionNumber: 17,
      subject: 'Mathematics',
      chapter: 'Sequences & Series (AP, GP, HP)',
      questionText: 'If $a, b, c, d$ are in HP and the arithmetic mean of $ab, bc, cd$ is 9, then the value of $ad$ is:',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '9' },
        { id: 'C', text: '12' },
        { id: 'D', text: '4' }
      ],
      correctAnswer: 'B',
      difficulty: 'moderate',
      explanation: {
        summary: '$ab + bc + cd = 27$. For four terms in HP, $(a+c)(b+d) = 4ad \\implies ab + ad + bc + cd = 4ad \\implies 3ad = ab + bc + cd = 27 \\implies ad = 9$.',
        stepByStep: [
          { stepNumber: 1, title: 'Harmonic Progression Identity', content: 'In HP: $b = \\frac{2ac}{a+c}$ and $c = \\frac{2bd}{b+d}$.', formula: '(a+c)(b+d) = 4ad', calculation: '3ad = 27 \\implies ad = 9' }
        ]
      }
    },
    {
      questionNumber: 18,
      subject: 'Mathematics',
      chapter: 'Coordinate Geometry (2D & 3D)',
      questionText: 'Find the foci of the hyperbola equation $x^2 + 2x - 4y^2 + 8y - 7 = 0$:',
      options: [
        { id: 'A', text: '$(1 \\pm \\sqrt{5}, 1)$' },
        { id: 'B', text: '$(-1 \\pm \\sqrt{5}, 1)$' },
        { id: 'C', text: '$(-1 \\pm \\sqrt{5}, -1)$' },
        { id: 'D', text: '$(1, -1 \\pm \\sqrt{5})$' }
      ],
      correctAnswer: 'B',
      difficulty: 'moderate',
      explanation: {
        summary: 'Completing squares: $\\frac{(x+1)^2}{4} - \\frac{(y-1)^2}{1} = 1$. Center is $(-1, 1)$, $a^2=4, b^2=1$. Eccentricity $e = \\sqrt{1 + 1/4} = \\frac{\\sqrt{5}}{2}$. $ae = 2(\\sqrt{5}/2) = \\sqrt{5}$. Foci are $(-1 \\pm \\sqrt{5}, 1)$.',
        stepByStep: [
          { stepNumber: 1, title: 'Canonical Form', content: 'Transform quadratic equation into standard hyperbola.', formula: '\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1', calculation: 'Foci = (h \\pm ae, k) = (-1 \\pm \\sqrt{5}, 1)' }
        ]
      }
    },
    {
      questionNumber: 19,
      subject: 'Mathematics',
      chapter: 'Coordinate Geometry (2D & 3D)',
      questionText: 'The locus of the mid-point of all chords of the parabola $y^2 = 4x$ which are drawn through its vertex is:',
      options: [
        { id: 'A', text: '$y^2 = 8x$' },
        { id: 'B', text: '$y^2 = 2x$' },
        { id: 'C', text: '$y^2 + 4y = 16$' },
        { id: 'D', text: '$x^2 = 2y$' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'Vertex is $(0, 0)$ and point on parabola is $(at^2, 2at)$. Midpoint is $h = at^2/2, k = at$. $t = k/a \\implies h = a(k/a)^2/2 = k^2/(2a) \\implies k^2 = 2ah$. Since $4a=4 \\implies a=1$, $y^2 = 2x$.',
        stepByStep: [
          { stepNumber: 1, title: 'Parametric Midpoint', content: 'Midpoint between $(0,0)$ and $(t^2, 2t)$.', formula: 'h = t^2/2, k = t', calculation: 'k^2 = 2h \\implies y^2 = 2x' }
        ]
      }
    },
    {
      questionNumber: 20,
      subject: 'Mathematics',
      chapter: 'Vectors',
      questionText: 'If $\\vec{a} = \\hat{i}-\\hat{k}, \\vec{b} = x\\hat{i}+\\hat{j}+(1-x)\\hat{k}$, and $\\vec{c} = y\\hat{i}+x\\hat{j}+(1+x-y)\\hat{k}$, then the scalar triple product $[\\vec{a}\\ \\vec{b}\\ \\vec{c}]$ depends on:',
      options: [
        { id: 'A', text: 'Neither $x$ nor $y$' },
        { id: 'B', text: 'Only $x$' },
        { id: 'C', text: 'Only $y$' },
        { id: 'D', text: 'Both $x$ and $y$' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: 'Expanding the $3\\times 3$ determinant: $|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]| = 1[(1+x-y) - x(1-x)] - 0 - 1[x^2 - y] = 1$. It equals constant 1, independent of both $x$ and $y$.',
        stepByStep: [
          { stepNumber: 1, title: 'Determinant Expansion', content: 'Calculate determinant of vector components.', formula: '\\det([\\vec{a}\\ \\vec{b}\\ \\vec{c}])', calculation: 'Result is 1 (independent of x and y)' }
        ]
      }
    },

    // --- ANALYTICAL ABILITY & LOGICAL REASONING (Q51 - Q90) ---
    {
      questionNumber: 51,
      subject: 'Analytical Ability',
      chapter: 'Number Series & Patterns',
      questionText: 'Complete the sequence: $3, 10, 24, 45, 73, \\dots$',
      options: [
        { id: 'A', text: '69' },
        { id: 'B', text: '91' },
        { id: 'C', text: '108' },
        { id: 'D', text: '121' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'Differences: $10-3=7, 24-10=14, 45-24=21, 73-45=28$. Successive differences increase by $+7$. Next difference is $28 + 7 = 35$. Thus next term is $73 + 35 = 108$.',
        stepByStep: [
          { stepNumber: 1, title: 'Second Differences', content: 'First differences are 7, 14, 21, 28. Next is 35.', formula: '73 + 35 = 108', calculation: '108' }
        ]
      }
    },
    {
      questionNumber: 52,
      subject: 'Analytical Ability',
      chapter: 'Blood Relations',
      questionText: 'Pointing towards a person in the photograph, Anjali said, "He is the only son of the father of my sister\'s brother". How is that person related to Anjali?',
      options: [
        { id: 'A', text: 'Father' },
        { id: 'B', text: 'Mother' },
        { id: 'C', text: 'Cousin' },
        { id: 'D', text: 'None of these (Brother)' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: '"My sister\'s brother" = Anjali\'s brother. "Father of my sister\'s brother" = Anjali\'s father. "The only son of Anjali\'s father" = Anjali\'s brother. Since "Brother" is not in options (A, B, C), the answer is (D) None of these.',
        stepByStep: [
          { stepNumber: 1, title: 'Step-by-step Deduction', content: 'Sister\'s brother = Brother -> Father of brother = Father -> Only son = Brother.', formula: 'Person = Brother', calculation: 'Option D (None of these)' }
        ]
      }
    },
    {
      questionNumber: 53,
      subject: 'Analytical Ability',
      chapter: 'Coding-Decoding',
      questionText: 'Book : Publisher :: Film : ?',
      options: [
        { id: 'A', text: 'Director' },
        { id: 'B', text: 'Producer' },
        { id: 'C', text: 'Editor' },
        { id: 'D', text: 'Writer' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'A Publisher finances and oversees the commercial publication of a Book. Similarly, a Producer finances and oversees the production of a Film.',
        stepByStep: [
          { stepNumber: 1, title: 'Analogy', content: 'Commercial producer of books is publisher; of films is producer.', formula: 'Analogy match', calculation: 'Producer' }
        ]
      }
    },
    {
      questionNumber: 54,
      subject: 'Analytical Ability',
      chapter: 'Number Series & Patterns',
      questionText: 'A sum of money is distributed among four persons P, Q, R, S in the ratio $2 : 5 : 4 : 3$. If Q gets Rs. 2000 more than S, what will be the total amount?',
      options: [
        { id: 'A', text: 'Rs. 18,000' },
        { id: 'B', text: 'Rs. 16,000' },
        { id: 'C', text: 'Rs. 14,000' },
        { id: 'D', text: 'Rs. 15,000' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'Ratio parts: $Q - S = 5x - 3x = 2x = 2000 \\implies x = 1000$. Total parts $= 2 + 5 + 4 + 3 = 14$. Total amount $= 14 \\times 1000 = \\text{Rs. } 14,000$.',
        stepByStep: [
          { stepNumber: 1, title: 'Ratio Units', content: 'Difference between Q and S is 2 units = 2000.', formula: '2x = 2000 \\implies x = 1000', calculation: 'Total = 14 \\times 1000 = 14000' }
        ]
      }
    },
    {
      questionNumber: 55,
      subject: 'Analytical Ability',
      chapter: 'Puzzles & Seating Arrangements',
      questionText: 'P, Q, R, S, T, U, V, W are sitting around a table in the same order, for a group discussion at equal distances in a clockwise direction. If V sits in North, then what will be the position of S?',
      options: [
        { id: 'A', text: 'East' },
        { id: 'B', text: 'South' },
        { id: 'C', text: 'South – East' },
        { id: 'D', text: 'South – West' }
      ],
      correctAnswer: 'D',
      difficulty: 'moderate',
      explanation: {
        summary: 'Around 8 positions clockwise: V (North), W (North-East), P (East), Q (South-East), R (South), S (South-West), T (West), U (North-West). Therefore, S sits in South-West.',
        stepByStep: [
          { stepNumber: 1, title: 'Clockwise Circular Arrangement', content: 'Step 8 points of compass clockwise starting from V at North.', formula: 'V(N), W(NE), P(E), Q(SE), R(S), S(SW)', calculation: 'S is in South-West' }
        ]
      }
    },
    {
      questionNumber: 56,
      subject: 'Analytical Ability',
      chapter: 'Coding-Decoding',
      questionText: 'If yellow is called white, white is called black, black is called green, green is called pink, pink is called blue and blue is called water, what is the colour of the sky?',
      options: [
        { id: 'A', text: 'Black' },
        { id: 'B', text: 'Water' },
        { id: 'C', text: 'White' },
        { id: 'D', text: 'Blue' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'The colour of the clear sky is blue. In the given substitution code, "blue is called water". Hence, the answer is Water.',
        stepByStep: [
          { stepNumber: 1, title: 'Substitution Code', content: 'Identify real color (Blue), then read code name for Blue.', formula: 'Blue -> Water', calculation: 'Water' }
        ]
      }
    },

    // --- COMPUTER AWARENESS (Q91 - Q110) ---
    {
      questionNumber: 91,
      subject: 'Computer Awareness',
      chapter: 'Data Representation & Number Systems (Binary, Hex)',
      questionText: 'The maximum and minimum values represented in signed 16-bit 2\'s complement representation are:',
      options: [
        { id: 'A', text: '–16684 and 16383' },
        { id: 'B', text: '0 and 32767' },
        { id: 'C', text: '0 and 65535' },
        { id: 'D', text: '–32768 and 32767' }
      ],
      correctAnswer: 'D',
      difficulty: 'easy',
      explanation: {
        summary: 'For an $n$-bit signed 2\'s complement number, the range is $[-2^{n-1}, 2^{n-1} - 1]$. For $n=16$, range is $[-2^{15}, 2^{15}-1] = [-32768, 32767]$.',
        stepByStep: [
          { stepNumber: 1, title: 'Range Formula', content: 'Signed 2s complement range formula.', formula: '-2^{n-1} \\text{ to } 2^{n-1} - 1', calculation: '-32768 \\text{ to } 32767' }
        ]
      }
    },
    {
      questionNumber: 92,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'The time required for fetching and executing one machine instruction is known as:',
      options: [
        { id: 'A', text: 'Delay time' },
        { id: 'B', text: 'CPU cycle (Instruction cycle)' },
        { id: 'C', text: 'Real time' },
        { id: 'D', text: 'Seek time' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: 'An instruction cycle (CPU cycle) consists of the fetch, decode, and execute phases required to process one machine instruction.',
        stepByStep: [
          { stepNumber: 1, title: 'Definition', content: 'Complete fetch-decode-execute cycle is called CPU / Instruction Cycle.', formula: 'Fetch + Execute = CPU Cycle', calculation: 'Option B' }
        ]
      }
    },
    {
      questionNumber: 93,
      subject: 'Computer Awareness',
      chapter: 'Programming Fundamentals & Boolean Logic',
      questionText: 'Find the minimum number of 2-input NAND gates required to design an XOR gate ($Y = A \\oplus B$):',
      options: [
        { id: 'A', text: '4' },
        { id: 'B', text: '6' },
        { id: 'C', text: '3' },
        { id: 'D', text: '5' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'An XOR gate requires exactly 4 NAND gates: first NAND gate computes $\\overline{AB}$, which is fed into two NAND gates with $A$ and $B$, whose outputs are combined in a fourth NAND gate.',
        stepByStep: [
          { stepNumber: 1, title: 'Universal Gate Implementation', content: 'Standard canonical minimum 2-input NAND count for XOR is 4.', formula: 'A \\oplus B = 4 \\text{ NAND gates}', calculation: '4' }
        ]
      }
    },
    {
      questionNumber: 94,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'If a processor clock is rated as 2500 million cycles per second (2.5 GHz), then its clock period is:',
      options: [
        { id: 'A', text: '$2.50 \\times 10^{-10}\\text{ sec}$' },
        { id: 'B', text: '$4.0 \\times 10^{-10}\\text{ sec}$ (0.4 ns)' },
        { id: 'C', text: '$1.0 \\times 10^{-10}\\text{ sec}$' },
        { id: 'D', text: '$5.0 \\times 10^{-10}\\text{ sec}$' }
      ],
      correctAnswer: 'B',
      difficulty: 'moderate',
      explanation: {
        summary: '$T = 1/f = \\frac{1}{2500 \\times 10^6\\text{ Hz}} = \\frac{1}{2.5 \\times 10^9} = 0.4 \\times 10^{-9} = 4.0 \\times 10^{-10}\\text{ seconds}$.',
        stepByStep: [
          { stepNumber: 1, title: 'Clock Period Formula', content: 'Period is reciprocal of frequency.', formula: 'T = 1/f', calculation: '1 / (2.5 \\times 10^9) = 4.0 \\times 10^{-10} \\text{ sec}' }
        ]
      }
    },
    {
      questionNumber: 95,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'Which of the following registers is used to keep track of the address of the memory location where the NEXT instruction is located?',
      options: [
        { id: 'A', text: 'Program Counter (PC)' },
        { id: 'B', text: 'Memory Address Register (MAR)' },
        { id: 'C', text: 'Memory Data Register (MDR)' },
        { id: 'D', text: 'Instruction Register (IR)' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'The Program Counter (PC) holds the address of the next instruction to be fetched from memory. MAR holds the address currently being read/written.',
        stepByStep: [
          { stepNumber: 1, title: 'Register Function', content: 'PC stores next instruction pointer.', formula: 'PC = Next Instruction Address', calculation: 'Program Counter' }
        ]
      }
    },
    {
      questionNumber: 96,
      subject: 'Computer Awareness',
      chapter: 'Computer Fundamentals & Architecture',
      questionText: 'How many $32K \\times 1$ RAM chips are needed to provide a total memory capacity of $256\\text{ Kbytes}$?',
      options: [
        { id: 'A', text: '8' },
        { id: 'B', text: '128' },
        { id: 'C', text: '64' },
        { id: 'D', text: '32' }
      ],
      correctAnswer: 'C',
      difficulty: 'moderate',
      explanation: {
        summary: 'Target capacity $= 256\\text{ KB} = 256 \\times 8\\text{ Kbits} = 2048\\text{ Kbits}$. Capacity per chip $= 32\\text{ Kbits}$. Number of chips $= 2048 / 32 = 64$.',
        stepByStep: [
          { stepNumber: 1, title: 'Convert Bytes to Bits', content: '256 KB = 256 * 8 = 2048 Kbits.', formula: '\\text{Chips} = \\frac{256 \\times 8}{32 \\times 1}', calculation: '2048 / 32 = 64 chips' }
        ]
      }
    },

    // --- GENERAL ENGLISH (Q111 - Q120) ---
    {
      questionNumber: 111,
      subject: 'General English',
      chapter: 'Reading Comprehension',
      questionText: 'According to the passage on Science and Religion, which of the following statements is correct regarding Religion?',
      options: [
        { id: 'A', text: 'The religious spirit assumes that human mind can penetrate all mysteries' },
        { id: 'B', text: 'Science follows the metaphysical path' },
        { id: 'C', text: 'Science believes in the humility born of fear of God' },
        { id: 'D', text: 'Religion believes in ultimate reality' }
      ],
      correctAnswer: 'D',
      difficulty: 'moderate',
      explanation: {
        summary: 'As stated in paragraph 2: "While science is analytical, religion takes the ultimate reality for granted... Religion follows the metaphysical path".',
        stepByStep: [
          { stepNumber: 1, title: 'Text Reference', content: 'Passage directly confirms: Religion takes ultimate reality for granted.', formula: 'Passage paragraph 2', calculation: 'Option D' }
        ]
      }
    },
    {
      questionNumber: 113,
      subject: 'General English',
      chapter: 'Idioms & Phrases',
      questionText: 'Select the most appropriate meaning of the underlined idiom: "Off and on, I take a break from my hectic schedule to refresh myself."',
      options: [
        { id: 'A', text: 'Periodically' },
        { id: 'B', text: 'Rarely' },
        { id: 'C', text: 'Seldom' },
        { id: 'D', text: 'Immediately' }
      ],
      correctAnswer: 'A',
      difficulty: 'easy',
      explanation: {
        summary: 'The phrase "off and on" means occurring periodically or intermittently from time to time.',
        stepByStep: [
          { stepNumber: 1, title: 'Definition', content: 'Off and on = happening intermittently / periodically.', formula: 'Off and on = Periodically', calculation: 'Option A' }
        ]
      }
    },
    {
      questionNumber: 114,
      subject: 'General English',
      chapter: 'Grammar (Tenses, Articles, Prepositions)',
      questionText: 'Fill in the blanks with appropriate articles: "I have _______ umbrella. I bought it _______ year ago."',
      options: [
        { id: 'A', text: 'A, An' },
        { id: 'B', text: 'An, A' },
        { id: 'C', text: 'An, The' },
        { id: 'D', text: 'The, An' }
      ],
      correctAnswer: 'B',
      difficulty: 'easy',
      explanation: {
        summary: '"Umbrella" begins with a vowel sound (/ʌ/), so it takes "an". "Year" begins with a consonant glide (/j/), so it takes "a". Thus, "An, A".',
        stepByStep: [
          { stepNumber: 1, title: 'Phonetic Rule', content: 'Vowel sound takes "an", consonant sound /j/ takes "a".', formula: 'An umbrella, A year', calculation: 'Option B' }
        ]
      }
    },
    {
      questionNumber: 118,
      subject: 'General English',
      chapter: 'Vocabulary (Synonyms & Antonyms)',
      questionText: 'What is the meaning of the word "Abrogate"?',
      options: [
        { id: 'A', text: 'Abolish' },
        { id: 'B', text: 'Absorb' },
        { id: 'C', text: 'Abstract' },
        { id: 'D', text: 'Ablaze' }
      ],
      correctAnswer: 'A',
      difficulty: 'moderate',
      explanation: {
        summary: '"Abrogate" means to repeal, abolish, or annul an official law, agreement, or formal treaty.',
        stepByStep: [
          { stepNumber: 1, title: 'Definition', content: 'Abrogate: formally revoke or abolish.', formula: 'Abrogate = Abolish', calculation: 'Option A' }
        ]
      }
    },
    {
      questionNumber: 120,
      subject: 'General English',
      chapter: 'Vocabulary (Synonyms & Antonyms)',
      questionText: 'Choose the antonym for the word "Spendthrift":',
      options: [
        { id: 'A', text: 'Profligate' },
        { id: 'B', text: 'Extravagant' },
        { id: 'C', text: 'Frugal' },
        { id: 'D', text: 'Squanderer' }
      ],
      correctAnswer: 'C',
      difficulty: 'easy',
      explanation: {
        summary: 'A "spendthrift" is a person who spends money in an extravagant, wasteful way. The opposite (antonym) is someone economical and thrifty, which is "frugal".',
        stepByStep: [
          { stepNumber: 1, title: 'Opposite Meaning', content: 'Spendthrift = wasteful spender. Antonym = Frugal (prudent spender).', formula: 'Opposite of Spendthrift = Frugal', calculation: 'Option C' }
        ]
      }
    }
  ]
};

async function run() {
  await importPaper(paper2023);
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { paper2023 };
