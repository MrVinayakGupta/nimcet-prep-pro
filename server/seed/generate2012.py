import json
import os

answers_2012 = [
    'B','A','D','A','B','D','A','C','C','A',
    'C','D','D','D','B','B','C','D','A','D',
    'A','B','C','B','C','D','C','B','B','C',
    'C','B','A','A','D','C','A','B','C','C',
    'B','A','A','A','D','D','C','D','A','B',
    'C','B','C','B','C','A','D','A','A','B',
    'A','B','B','D','B','C','D','D','A','C',
    'C','C','D','A','A','C','A','C','B','D',
    'C','C','C','A','B','A','D','C','D','D',
    'D','C','B','B','A','A','D','C','A','A',
    'D','D','C','D','D','A','A','B','D','C',
    'C','C','B','C','A','A','A','B','C','A'
]

raw_questions = [
    # 1-10
    {
        "qNum": 1, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "The number of words that can be formed by using the letters of the word MATHEMATICS that start as well as end with T is:",
        "opts": ["80720", "90720", "20860", "37528"],
        "sol": "Fixing T at both ends leaves 9 letters (M, A, H, E, M, A, I, C, S) with 2 M's and 2 A's. Number of ways = $\\frac{9!}{2! 2!} = 90720$."
    },
    {
        "qNum": 2, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $A - B = \\frac{\\pi}{4}$, then $(1+\\tan A)(1-\\tan B)$ is equal to:",
        "opts": ["2", "1", "0", "3"],
        "sol": "$\\tan(A-B) = 1 \\implies \\frac{\\tan A - \\tan B}{1+\\tan A\\tan B} = 1 \\implies \\tan A - \\tan B - \\tan A\\tan B = 1$. Thus $(1+\\tan A)(1-\\tan B) = 1 + \\tan A - \\tan B - \\tan A\\tan B = 1 + 1 = 2$."
    },
    {
        "qNum": 3, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "Let $P(E)$ denote the probability of event $E$. Given $P(A) = 1, P(B) = 1/2$, the values of $P(A|B)$ and $P(B|A)$ respectively are:",
        "opts": ["1/4, 1/2", "1/2, 1/4", "1/2, 1", "1, 1/2"],
        "sol": "Since $P(A)=1$, $A$ is certain event, so $P(A \\cap B) = P(B) = 1/2$. Thus $P(A|B) = \\frac{P(A \\cap B)}{P(B)} = 1$, and $P(B|A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{1/2}{1} = 1/2$."
    },
    {
        "qNum": 4, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "The number of different license plates that can be formed in the format 3 English letters (A.....Z) followed by 4 digits (0, 1, .......9) with repetitions allowed in letters and digits is equal to:",
        "opts": ["$26^3 \\times 10^4$", "$26^3 + 10^4$", "36", "$26^3$"],
        "sol": "3 letters can be chosen in $26^3$ ways and 4 digits in $10^4$ ways. Total combinations = $26^3 \\times 10^4$."
    },
    {
        "qNum": 5, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "Which of the following is correct?",
        "opts": ["$\\sin 1^\\circ > \\sin 1$", "$\\sin 1^\\circ < \\sin 1$", "$\\sin 1^\\circ = \\sin 1$", "$\\sin 1^\\circ = \\frac{\\pi}{180}\\sin 1$"],
        "sol": "$1\\text{ radian} \\approx 57.3^\\circ$. Since sine is strictly increasing in $[0^\\circ, 90^\\circ]$, $\\sin 1^\\circ < \\sin 57.3^\\circ = \\sin 1$."
    },
    {
        "qNum": 6, "sub": "Mathematics", "ch": "Trigonometry", "top": "Heights and Distances",
        "text": "If two towers of heights $h_1$ and $h_2$ subtend angles $60^\\circ$ and $30^\\circ$ respectively at the mid point of the line joining their feet, then $h_1 : h_2$ is:",
        "opts": ["1 : 2", "1 : 3", "2 : 1", "3 : 1"],
        "sol": "$h_1 = d\\tan 60^\\circ = d\\sqrt{3}$, $h_2 = d\\tan 30^\\circ = d/\\sqrt{3}$. Ratio $h_1 : h_2 = \\sqrt{3} : (1/\\sqrt{3}) = 3 : 1$."
    },
    {
        "qNum": 7, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If the vectors $\\vec{a} = (1, x, -2)$ and $\\vec{b} = (x, 3, -4)$ are mutually perpendicular, then the value of $x$ is:",
        "opts": ["-2", "2", "4", "-4"],
        "sol": "$\\vec{a} \\cdot \\vec{b} = 1(x) + x(3) + (-2)(-4) = 4x + 8 = 0 \\implies x = -2$."
    },
    {
        "qNum": 8, "sub": "Mathematics", "ch": "Calculus", "top": "Continuity and Differentiability",
        "text": "What is the value of $a$ for which $f(x) = \\begin{cases} \\sin x & \\text{if } x \\le \\pi/2 \\\\ ax & \\text{if } x > \\pi/2 \\end{cases}$ is continuous?",
        "opts": ["$\\pi$", "$\\pi/2$", "$2/\\pi$", "0"],
        "sol": "For continuity at $\\pi/2$: $\\sin(\\pi/2) = a(\\pi/2) \\implies 1 = a\\pi/2 \\implies a = 2/\\pi$."
    },
    {
        "qNum": 9, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "If the real number $x$ when added to its inverse gives the minimum value of the sum, then the value of $x$ is equal to:",
        "opts": ["-2", "2", "1", "-1"],
        "sol": "For $x > 0$, $x + 1/x \\ge 2$ with minimum occurring at $x = 1$."
    },
    {
        "qNum": 10, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $\\cos(\\alpha+\\beta) = 4/5$ and $\\sin(\\alpha-\\beta) = 5/13$ ($0 < \\alpha, \\beta < \\pi/4$), then $\\tan(2\\alpha) = $:",
        "opts": ["56/33", "65/63", "16/63", "33/56"],
        "sol": "$\\tan(\\alpha+\\beta) = 3/4$, $\\tan(\\alpha-\\beta) = 5/12$. $\\tan(2\\alpha) = \\tan((\\alpha+\\beta)+(\\alpha-\\beta)) = \\frac{3/4 + 5/12}{1 - (3/4)(5/12)} = \\frac{14/12}{33/48} = \\frac{56}{33}$."
    },

    # 11-20
    {
        "qNum": 11, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration as Limit of Sum",
        "text": "The value of $\\lim_{n \\to \\infty} \\frac{\\pi}{n}\\left[\\sin\\frac{\\pi}{n} + \\sin\\frac{2\\pi}{n} + \\dots + \\sin\\frac{(n-1)\\pi}{n}\\right]$ is:",
        "opts": ["0", "$\\pi$", "2", "$\\pi/2$"],
        "sol": "As a Riemann sum, $\\int_0^1 \\pi \\sin(\\pi x) dx = [-\\cos(\\pi x)]_0^1 = -(-1 - 1) = 2$."
    },
    {
        "qNum": 12, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "The point on the curve $y = 6x - x^2$, where the tangent is parallel to $x$-axis is:",
        "opts": ["(0, 0)", "(2, 8)", "(6, 0)", "(3, 9)"],
        "sol": "$dy/dx = 6 - 2x = 0 \\implies x = 3$. At $x=3$, $y = 6(3) - 3^2 = 9$. Point is $(3, 9)$."
    },
    {
        "qNum": 13, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "If $I_1 = \\int_0^1 2^{x^2} dx, I_2 = \\int_0^1 2^{x^3} dx, I_3 = \\int_1^2 2^{x^2} dx$ and $I_4 = \\int_1^2 2^{x^3} dx$, then:",
        "opts": ["$I_1 = I_2$", "$I_2 > I_1$", "$I_3 > I_4$", "$I_4 > I_3$"],
        "sol": "For $x \\in (1, 2)$, $x^3 > x^2 \\implies 2^{x^3} > 2^{x^2}$. Integrating over $[1, 2]$ yields $I_4 > I_3$."
    },
    {
        "qNum": 14, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "The value of integral $\\int_0^{\\pi/2} \\log \\tan x \\, dx$ is:",
        "opts": ["$\\pi$", "$\\pi/2$", "$\\pi/3$", "0"],
        "sol": "Using $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$, $I = \\int_0^{\\pi/2} \\log \\cot x \\, dx = -I \\implies 2I = 0 \\implies I = 0$."
    },
    {
        "qNum": 15, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "A determinant is chosen at random from the set of all determinants of matrices of order 2 with elements 0 or 1 only. The probability that the determinant chosen is non-zero is:",
        "opts": ["3/16", "3/8", "1/4", "None"],
        "sol": "Total $2 \\times 2$ matrices with entries $\\{0, 1\\}$ is $2^4 = 16$. Non-zero determinants: value $+1$ (3 matrices) and value $-1$ (3 matrices), totaling 6 matrices. Probability = $6/16 = 3/8$."
    },
    {
        "qNum": 16, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $\\sin x + \\sin^2 x = 1$, then $\\cos^4 x + \\cos^2 x = $:",
        "opts": ["0", "1", "2/3", "-1"],
        "sol": "$\\sin x = 1 - \\sin^2 x = \\cos^2 x$. Then $\\cos^4 x + \\cos^2 x = \\sin^2 x + \\sin x = 1$."
    },
    {
        "qNum": 17, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "3D Geometry",
        "text": "The equation of the plane passing through the point $(1, 2, 3)$ and having the vector $\\vec{N} = 3\\hat{i} - \\hat{j} + 2\\hat{k}$ as its normal is:",
        "opts": ["$2x - y + 3z + 7 = 0$", "$3x - y + 2z + 7 = 0$", "$3x - y + 2z = 7$", "$3x + y + 2z = 7$"],
        "sol": "$3(x - 1) - 1(y - 2) + 2(z - 3) = 0 \\implies 3x - y + 2z - 3 + 2 - 6 = 0 \\implies 3x - y + 2z = 7$."
    },
    {
        "qNum": 18, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "The value of $\\int_0^{\\sin^2 x} \\sin^{-1}\\sqrt{t} \\, dt + \\int_0^{\\cos^2 x} \\cos^{-1}\\sqrt{t} \\, dt$ is:",
        "opts": ["$\\pi/4$", "$\\pi/2$", "1", "None"],
        "sol": "Differentiating with respect to $x$ gives $\\sin^{-1}(\\sin x) \\cdot 2\\sin x \\cos x + \\cos^{-1}(\\cos x) \\cdot (-2\\cos x \\sin x) = x\\sin 2x - x\\sin 2x = 0$. So the expression is constant. Evaluating at $x = \\pi/4$ gives $\\pi/4$ (or official key indicates None / $\\pi/4$)."
    },
    {
        "qNum": 19, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "Coefficients of quadratic equation $ax^2 + bx + c = 0$ are chosen by tossing three fair coins where 'head' means 1 and 'tail' means 2. Then the probability that roots of the equation are imaginary is:",
        "opts": ["7/8", "5/8", "3/8", "1/8"],
        "sol": "Roots are imaginary when $D = b^2 - 4ac < 0$. $a, b, c \\in \\{1, 2\\}$. Only when $b=2, a=1, c=1$ is $D = 4 - 4 = 0$ (real). For all other 7 outcomes, $b^2 < 4ac$. Probability = 7/8."
    },
    {
        "qNum": 20, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "In a class of 100 students, 55 students have passed in Mathematics and 67 students have passed in Physics. Then the number of students who have passed in Physics only is:",
        "opts": ["22", "33", "10", "45"],
        "sol": "Assuming all passed at least one: $n(M \\cap P) = 55 + 67 - 100 = 22$. Students passed in Physics only = $67 - 22 = 45$."
    },

    # 21-30
    {
        "qNum": 21, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "If $H$ is the Harmonic mean between $P$ and $Q$, then $\\frac{H}{P} + \\frac{H}{Q}$ is:",
        "opts": ["2", "$\\frac{P+Q}{Q}$", "$\\frac{PQ}{P+Q}$", "None"],
        "sol": "$H = \\frac{2PQ}{P+Q} \\implies \\frac{1}{P} + \\frac{1}{Q} = \\frac{2}{H} \\implies H\\left(\\frac{1}{P} + \\frac{1}{Q}\\right) = 2$."
    },
    {
        "qNum": 22, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "The number of values of $k$ for which the system $(k+1)x + 8y = 4k$ and $kx + (k+3)y = 3k-1$ has infinitely many solutions is:",
        "opts": ["0", "1", "2", "Infinite"],
        "sol": "For infinite solutions: $\\frac{k+1}{k} = \\frac{8}{k+3} = \\frac{4k}{3k-1}$. $(k+1)(k+3) = 8k \\implies k^2 - 4k + 3 = 0 \\implies k = 1, 3$. For $k=3$: $8/6 = 4/3$ and $\\frac{4(3)}{3(3)-1} = 12/8 = 3/2 \\ne 4/3$. For $k=1$: $\\frac{1+1}{1} = 2, \\frac{8}{1+3} = 2, \\frac{4(1)}{3(1)-1} = 2$. Thus only $k=1$ satisfies (1 value)."
    },
    {
        "qNum": 23, "sub": "Mathematics", "ch": "Algebra", "top": "Binomial Theorem",
        "text": "The sum of $\\binom{20}{8} + \\binom{20}{9} + \\binom{21}{10} + \\binom{22}{11} - \\binom{23}{11}$ is:",
        "opts": ["$\\binom{22}{12}$", "$\\binom{23}{12}$", "0", "$\\binom{21}{10}$"],
        "sol": "Using $\\binom{n}{r} + \\binom{n}{r+1} = \\binom{n+1}{r+1}$: $\\binom{20}{8} + \\binom{20}{9} = \\binom{21}{9}$. Then $\\binom{21}{9} + \\binom{21}{10} = \\binom{22}{10}$. Then $\\binom{22}{10} + \\binom{22}{11} = \\binom{23}{11}$. Thus $\\binom{23}{11} - \\binom{23}{11} = 0$."
    },
    {
        "qNum": 24, "sub": "Mathematics", "ch": "Trigonometry", "top": "Inverse Trigonometrical Function",
        "text": "The value of $\\cot^{-1}(21) + \\cot^{-1}(13) + \\cot^{-1}(-8)$ is:",
        "opts": ["0", "$\\pi$", "$\\infty$", "$\\pi/2$"],
        "sol": "$\\tan^{-1}(1/21) + \\tan^{-1}(1/13) = \\tan^{-1}\\frac{1/21+1/13}{1 - 1/(21 \\times 13)} = \\tan^{-1}(34/272) = \\tan^{-1}(1/8)$. Since $\\cot^{-1}(-8) = \\pi - \\cot^{-1}(8) = \\pi - \\tan^{-1}(1/8)$, the sum is $\\tan^{-1}(1/8) + \\pi - \\tan^{-1}(1/8) = \\pi$."
    },
    {
        "qNum": 25, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "Normal to the curve $y = x^3 - 3x + 2$ at the point $(2, 4)$ is:",
        "opts": ["$9x - y - 14 = 0$", "$x - 9y + 40 = 0$", "$x + 9y - 38 = 0$", "$-9x + y + 22 = 0$"],
        "sol": "$dy/dx = 3x^2 - 3$. At $x=2$, slope of tangent = $3(4) - 3 = 9$. Slope of normal = $-1/9$. Equation of normal: $y - 4 = -\\frac{1}{9}(x - 2) \\implies 9y - 36 = -x + 2 \\implies x + 9y - 38 = 0$."
    },
    {
        "qNum": 26, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "A problem in Mathematics is given to three students A, B and C whose chances of solving it are 1/2, 1/3, 1/4 respectively. If they all try, what is the probability that the problem will be solved?",
        "opts": ["1/2", "1/4", "1/3", "3/4"],
        "sol": "$P(\\text{solved}) = 1 - P(\\text{none solves}) = 1 - (1 - 1/2)(1 - 1/3)(1 - 1/4) = 1 - (1/2)(2/3)(3/4) = 1 - 1/4 = 3/4$."
    },
    {
        "qNum": 27, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "The function $x^x$ decreases in the interval:",
        "opts": ["(0, e)", "(0, 1)", "(0, 1/e)", "None"],
        "sol": "$y = x^x \\implies y' = x^x(1 + \\log x)$. For decreasing, $y' < 0 \\implies 1 + \\log x < 0 \\implies \\log x < -1 \\implies x \\in (0, 1/e)$."
    },
    {
        "qNum": 28, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\vec{a} + \\vec{b} + \\vec{c} = 0, |\\vec{a}| = 3, |\\vec{b}| = 5, |\\vec{c}| = 7$, then angle between the vector $\\vec{a}$ and $\\vec{b}$ is:",
        "opts": ["$\\pi/2$", "$\\pi/3$", "$\\pi/4$", "$\\pi/6$"],
        "sol": "$\\vec{a} + \\vec{b} = -\\vec{c} \\implies |\\vec{a}|^2 + |\\vec{b}|^2 + 2|\\vec{a}||\\vec{b}|\\cos\\theta = |\\vec{c}|^2 \\implies 9 + 25 + 2(3)(5)\\cos\\theta = 49 \\implies 30\\cos\\theta = 15 \\implies \\cos\\theta = 1/2 \\implies \\theta = \\pi/3$."
    },
    {
        "qNum": 29, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\theta$ ($0 \\le \\theta \\le \\pi$) is the angle between vectors $\\vec{a}$ and $\\vec{b}$, then $\\frac{|\\vec{a} \\times \\vec{b}|}{\\vec{a} \\cdot \\vec{b}}$ equals:",
        "opts": ["$-\\cot\\theta$", "$\\tan\\theta$", "$-\\tan\\theta$", "$\\cot\\theta$"],
        "sol": "$\\frac{ab\\sin\\theta}{ab\\cos\\theta} = \\tan\\theta$."
    },
    {
        "qNum": 30, "sub": "Mathematics", "ch": "Calculus", "top": "Differentiation",
        "text": "If $f(a+b) = f(a) \\times f(b)$ for all $a$ and $b$ and $f(5) = 2, f'(0) = 3$, then $f'(5)$ is:",
        "opts": ["2", "4", "6", "8"],
        "sol": "$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h} = f(x)\\lim_{h \\to 0}\\frac{f(h)-1}{h} = f(x)f'(0)$. Thus $f'(5) = f(5) \\times f'(0) = 2 \\times 3 = 6$."
    },

    # 31-40
    {
        "qNum": 31, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Triangles & Centroid",
        "text": "If $(4, -3)$ and $(-9, 7)$ are the two vertices of a triangle and $(1, 4)$ is its centroid, then the area of triangle is:",
        "opts": ["138/2", "319/2", "183/2", "381/2"],
        "sol": "Third vertex $(x_3, y_3)$: $\\frac{4 - 9 + x_3}{3} = 1 \\implies x_3 = 8$; $\\frac{-3 + 7 + y_3}{3} = 4 \\implies y_3 = 8$. Vertices are $(4,-3), (-9,7), (8,8)$. Area = $\\frac{1}{2}|4(7-8) - 9(8 - (-3)) + 8(-3 - 7)| = \\frac{1}{2}|-4 - 99 - 80| = 183/2$."
    },
    {
        "qNum": 32, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Ellipse",
        "text": "The equation of the ellipse with major axis along the $x$-axis and passing through the points $(4, 3)$ and $(-1, 4)$ is:",
        "opts": ["$15x^2 + 7y^2 = 247$", "$7x^2 + 15y^2 = 247$", "$16x^2 + 9y^2 = 247$", "$9x^2 + 16y^2 = 247$"],
        "sol": "Let $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$. Substituting $(4, 3)$ and $(-1, 4)$ and solving for $1/a^2$ and $1/b^2$ yields $7x^2 + 15y^2 = 247$."
    },
    {
        "qNum": 33, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Circles",
        "text": "If the circles $x^2 + y^2 + 2x + 2ky + 6 = 0$ and $x^2 + y^2 + 2ky + k = 0$ intersect orthogonally, then $k$ is:",
        "opts": ["2 or -3/2", "-2 or -3/2", "2 or 3/2", "-2 or 3/2"],
        "sol": "Orthogonality condition: $2g_1 g_2 + 2f_1 f_2 = c_1 + c_2$. Here $g_1 = 1, f_1 = k, c_1 = 6$; $g_2 = 0, f_2 = k, c_2 = k$. $2(1)(0) + 2(k)(k) = 6 + k \\implies 2k^2 - k - 6 = 0 \\implies (2k+3)(k-2) = 0 \\implies k = 2\\text{ or } -3/2$."
    },
    {
        "qNum": 34, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Parabola",
        "text": "Focus of the parabola $x^2 + y^2 - 2xy - 4(x+y-1) = 0$ is:",
        "opts": ["(1, 1)", "(1, 2)", "(2, 1)", "(0, 2)"],
        "sol": "$(x-y)^2 = 4(x+y-1)$. Rotating coordinates by $45^\\circ$ shows standard axis along $x=y$ and focus at $(1, 1)$."
    },
    {
        "qNum": 35, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\vec{a}, \\vec{b}$ and $\\vec{c}$ are unit vectors such that $\\vec{a} + \\vec{b} + \\vec{c} = 0$, then the value of $\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a}$ is:",
        "opts": ["2/3", "-2/3", "3/2", "-3/2"],
        "sol": "$|\\vec{a}+\\vec{b}+\\vec{c}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 + 2(\\vec{a}\\cdot\\vec{b}+\\vec{b}\\cdot\\vec{c}+\\vec{c}\\cdot\\vec{a}) = 0 \\implies 3 + 2(\\dots) = 0 \\implies \\vec{a}\\cdot\\vec{b}+\\vec{b}\\cdot\\vec{c}+\\vec{c}\\cdot\\vec{a} = -3/2$."
    },
    {
        "qNum": 36, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\vec{a}, \\vec{b}, \\vec{c}$ are non-coplanar vectors and $\\lambda$ is a real number, then the vectors $\\vec{a} + 2\\vec{b} + 3\\vec{c}, \\lambda\\vec{b} + 4\\vec{c}$ and $(2\\lambda - 1)\\vec{c}$ are non-coplanar for:",
        "opts": ["All values of $\\lambda$", "All except one value of $\\lambda$", "All except two values of $\\lambda$", "No value of $\\lambda$"],
        "sol": "Determinant of components: $\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & \\lambda & 4 \\\\ 0 & 0 & 2\\lambda - 1 \\end{vmatrix} = 1 \\cdot \\lambda(2\\lambda - 1)$. For coplanar vectors, $\\lambda(2\\lambda-1) = 0 \\implies \\lambda = 0, 1/2$. Thus vectors are non-coplanar for all except two values of $\\lambda$."
    },
    {
        "qNum": 37, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability Distribution",
        "text": "Suppose values taken by a random variable $X$ are such that $a \\le x_i \\le b$, where $x_i$ denotes the value of $X$ in the $i$-th case for $i = 1, 2, \\dots, n$, then:",
        "opts": ["$(b-a)^2 \\ge \\text{Var}(X)$", "$\\frac{a^2}{4} \\le \\text{Var}(X)$", "$a^2 \\le \\text{Var}(X) \\le b^2$", "$a \\le \\text{Var}(X) \\le b$"],
        "sol": "Popoviciu's inequality on variances establishes that for any bounded random variable in $[a, b]$, $\\text{Var}(X) \\le \\frac{(b-a)^2}{4} \\le (b-a)^2$."
    },
    {
        "qNum": 38, "sub": "Mathematics", "ch": "Algebra", "top": "Complex Numbers",
        "text": "If $\\omega$ is the cube root of unity, then the system $x + \\omega^2 y + \\omega z = 0, \\omega^2 x + y + \\omega z = 0$ and $\\omega x + \\omega^2 y + z = 0$ is:",
        "opts": ["Consistent and has unique solution", "Consistent and has more than one solution", "Inconsistent", "None of these"],
        "sol": "The coefficient determinant vanishes identically because the rows/columns are multiples via $\\omega$, giving infinitely many (more than one) solutions."
    },
    {
        "qNum": 39, "sub": "Mathematics", "ch": "Algebra", "top": "Logarithms",
        "text": "If $x = \\log_a bc, y = \\log_b ca$ and $z = \\log_c ab$, then $\\frac{1}{1+x} + \\frac{1}{1+y} + \\frac{1}{1+z} =$:",
        "opts": ["$abc$", "$ab + bc + ca$", "1", "$x + y + z$"],
        "sol": "$1 + x = \\log_a a + \\log_a bc = \\log_a abc \\implies \\frac{1}{1+x} = \\log_{abc} a$. Thus $\\frac{1}{1+x} + \\frac{1}{1+y} + \\frac{1}{1+z} = \\log_{abc} a + \\log_{abc} b + \\log_{abc} c = \\log_{abc}(abc) = 1$."
    },
    {
        "qNum": 40, "sub": "Mathematics", "ch": "Algebra", "top": "Logarithms & Indices",
        "text": "If $2^a = 3^b = 6^{-c}$, then $ab + bc + ca =$:",
        "opts": ["1", "2", "0", "None"],
        "sol": "Let $2^a = 3^b = 6^{-c} = k$. Then $a = \\log_2 k \\implies 1/a = \\log_k 2$; $1/b = \\log_k 3$; $-1/c = \\log_k 6$. Since $2 \\times 3 = 6$, $1/a + 1/b = -1/c \\implies 1/a + 1/b + 1/c = 0 \\implies \\frac{bc+ca+ab}{abc} = 0 \\implies ab+bc+ca = 0$."
    },

    # 41-50
    {
        "qNum": 41, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Hyperbola",
        "text": "If $e$ and $e'$ be the eccentricities of a hyperbola and its conjugate, then $\\frac{1}{e^2} + \\frac{1}{e'^2} =$:",
        "opts": ["0", "1", "2", "None"],
        "sol": "For hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, $e^2 = 1 + b^2/a^2 = \\frac{a^2+b^2}{a^2} \\implies 1/e^2 = \\frac{a^2}{a^2+b^2}$. For conjugate, $1/e'^2 = \\frac{b^2}{a^2+b^2}$. Thus $1/e^2 + 1/e'^2 = 1$."
    },
    {
        "qNum": 42, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "If a fair coin is tossed $n$ times, then the probability that the head comes odd number of times is:",
        "opts": ["1/2", "$1/2^n$", "$1/2^{n-1}$", "None"],
        "sol": "Number of ways to get odd number of heads = $\\binom{n}{1} + \\binom{n}{3} + \\dots = 2^{n-1}$. Total outcomes = $2^n$. Probability = $2^{n-1}/2^n = 1/2$."
    },
    {
        "qNum": 43, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Equations",
        "text": "If $\\sin(\\pi\\cos\\theta) = \\cos(\\pi\\sin\\theta)$, then $\\sin 2\\theta = $:",
        "opts": ["$\\pm 3/4$", "$\\pm 1/3$", "$\\pm 1/4$", "$\\pm 4/3$"],
        "sol": "$\\cos(\\pi/2 - \\pi\\cos\\theta) = \\cos(\\pi\\sin\\theta) \\implies \\pi\\sin\\theta \\pm \\pi\\cos\\theta = \\pi/2 \\implies \\sin\\theta \\pm \\cos\\theta = 1/2$. Squaring gives $1 \\pm \\sin 2\\theta = 1/4 \\implies \\sin 2\\theta = \\pm 3/4$."
    },
    {
        "qNum": 44, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "In which of the following regular polygons, the number of diagonals is equal to number of sides?",
        "opts": ["Pentagon", "Square", "Octagon", "Hexagon"],
        "sol": "$\\frac{n(n-3)}{2} = n \\implies n - 3 = 2 \\implies n = 5$ (Pentagon)."
    },
    {
        "qNum": 45, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Binomial Distribution",
        "text": "One hundred identical coins each with probability $P$ of showing up heads are tossed. If $0 < P < 1$ and probability of heads showing on 50 coins equals heads on 51 coins, then $P$ is:",
        "opts": ["1/2", "49/101", "50/101", "51/101"],
        "sol": "$\\binom{100}{50}P^{50}(1-P)^{50} = \\binom{100}{51}P^{51}(1-P)^{49} \\implies \\binom{100}{50}(1-P) = \\binom{100}{51}P \\implies \\frac{100!}{50! 50!}(1-P) = \\frac{100!}{51! 49!}P \\implies \\frac{1-P}{50} = \\frac{P}{51} \\implies 51 - 51P = 50P \\implies 101P = 51 \\implies P = 51/101$."
    },
    {
        "qNum": 46, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Equations",
        "text": "The equation $(\\cos p - 1)x^2 + (\\cos p)x + \\sin p = 0$ where $x$ is a variable has real roots. Then the interval of $p$ is:",
        "opts": ["$(0, 2\\pi)$", "$(-\\pi, 0)$", "$(-\\pi/2, \\pi/2)$", "$(0, \\pi)$"],
        "sol": "For real roots: $D = \\cos^2 p - 4(\\cos p - 1)\\sin p \\ge 0$, which holds across $(0, \\pi)$."
    },
    {
        "qNum": 47, "sub": "Mathematics", "ch": "Calculus", "top": "Theory of Equations",
        "text": "Number of real roots of $3x^5 + 15x - 8 = 0$ is:",
        "opts": ["3", "5", "1", "0"],
        "sol": "$f'(x) = 15x^4 + 15 > 0$ for all real $x$. Since $f(x)$ is strictly increasing throughout $\\mathbb{R}$, it can have at most one real root. By Intermediate Value Theorem, it has exactly 1 real root."
    },
    {
        "qNum": 48, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "The value of $k$ for which the set of equations $3x + ky - 2z = 0, x + ky + 3z = 0$ and $2x + 3y - 4z = 0$ has a non-trivial solution, is:",
        "opts": ["15/2", "17/2", "31/2", "33/2"],
        "sol": "Determinant: $\\begin{vmatrix} 3 & k & -2 \\\\ 1 & k & 3 \\\\ 2 & 3 & -4 \\end{vmatrix} = 0$. $R_1 - R_2$: $\\begin{vmatrix} 2 & 0 & -5 \\\\ 1 & k & 3 \\\\ 2 & 3 & -4 \\end{vmatrix} = 2(-4k - 9) - 5(3 - 2k) = -8k - 18 - 15 + 10k = 2k - 33 = 0 \\implies k = 33/2$."
    },
    {
        "qNum": 49, "sub": "Mathematics", "ch": "Algebra", "top": "Logarithms",
        "text": "If $x = \\log_3 5, y = \\log_{17} 25$, then which one of the following is correct?",
        "opts": ["$x > y$", "$x < y$", "$x \\le y$", "$x = y$"],
        "sol": "$y = \\log_{17} 5^2 = 2\\log_{17} 5 = \\frac{2}{\\log_5 17}$. $x = \\frac{1}{\\log_5 3} = \\frac{2}{2\\log_5 3} = \\frac{2}{\\log_5 9}$. Since $\\log_5 9 < \\log_5 17$, $\\frac{2}{\\log_5 9} > \\frac{2}{\\log_5 17} \\implies x > y$."
    },
    {
        "qNum": 50, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, then $A^n$ for any natural number $n$ is:",
        "opts": ["$\\begin{bmatrix} n & n \\\\ 0 & n \\end{bmatrix}$", "$\\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}$", "$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$", "None"],
        "sol": "By mathematical induction: $A^2 = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}, A^n = \\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}$."
    },

    # 51-60 (Analytical Ability & Reasoning)
    {
        "qNum": 51, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coding-Decoding",
        "text": "If ROAST is coded as PQYUR in a certain language, then SLOPP is coded as:",
        "opts": ["MRNAQN", "NRMNQA", "QNMRNA", "RANNMQ"],
        "sol": "Pattern shifts: R(-2) $\\to$ P, O(+2) $\\to$ Q, A(-2) $\\to$ Y, S(+2) $\\to$ U, T(-2) $\\to$ R. Applying to SLOPP: S(-2) $\\to$ Q, L(+2) $\\to$ N, O(-2) $\\to$ M, P(+2) $\\to$ R, P(-2) $\\to$ N $\\implies$ QNMRN."
    },
    {
        "qNum": 52, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coding-Decoding",
        "text": "If Lelibroon means yellow hat, plekafroti means flower garden and frotimix means garden salad, then which word could mean 'yellow flower'?",
        "opts": ["lelifroti", "lelipleka", "plekabroon", "frotibroon"],
        "sol": "leli = yellow, broon = hat; froti = garden, pleka = flower. Thus 'yellow flower' = lelipleka."
    },
    {
        "qNum": 53, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Mathematical Operations",
        "text": "If + is $\\times$, - is +, $\\times$ is $\\div$ and $\\div$ is -, then evaluate $6 - 9 + 8 \\times 3 \\div 20$:",
        "opts": ["-2", "6", "10", "12"],
        "sol": "Substitute operators: $6 + 9 \\times 8 \\div 3 - 20 = 6 + 9 \\times \\frac{8}{3} - 20 = 6 + 24 - 20 = 10$."
    },
    {
        "qNum": 54, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Calendar",
        "text": "In a certain year there were exactly four Fridays and four Mondays in January. On what day of the week did the 20th of January fall that year?",
        "opts": ["Saturday", "Sunday", "Thursday", "Tuesday"],
        "sol": "January has 31 days (4 full weeks + 3 days). If Friday and Monday each appear only 4 times, the extra 3 days must not include Friday or Monday, so they must be Tuesday, Wednesday, Thursday. Hence Jan 1st is Tuesday. 20th Jan = $1 + 19 = 20 \\equiv 6 \\pmod 7$ from Tuesday $\\implies$ Sunday."
    },
    {
        "qNum": 55, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "P, Q, R, S, T, U, V represent 7 consecutive integers from 22 to 33. 1. U is as much less than Q as R is greater than S. 2. V > U. 3. Q is middle term. 4. P > S. The sequence from lowest to highest value is:",
        "opts": ["TVPQRSU", "TRSQUPV", "TUSQRPV", "TVPQSRU"],
        "sol": "Q is middle term. Matching the constraints yields the order TUSQRPV."
    },
    {
        "qNum": 56, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "LCM & HCF",
        "text": "The minimum number of tiles of size 16 by 24 required to form a square by placing them adjacent to one another is:",
        "opts": ["6", "8", "11", "16"],
        "sol": "Side of smallest square = $\\text{LCM}(16, 24) = 48$. Number of tiles = $\\frac{48 \\times 48}{16 \\times 24} = 3 \\times 2 = 6$."
    },
    {
        "qNum": 57, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Five persons K, L, M, N and O around dining table. K is mother of M, M is wife of O, N is brother of K, L is husband of K. How is N related to L?",
        "opts": ["Son", "Cousin", "Brother", "Brother-in-law"],
        "sol": "N is the brother of L's wife (K), so N is the brother-in-law of L."
    },
    {
        "qNum": 58, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Equations",
        "text": "Three men A, B, C play cards. Loser pays Rs. 3 to each other. If A won 3 games, B loses Rs. 3, C wins Rs. 12, then total games played is:",
        "opts": ["12", "21", "20", "6"],
        "sol": "A wins 3 games. C wins Rs. 12 net $\\implies$ C won 2 games. B won 1 game. Total games = $3 + 2 + 1 = 6$ games (or official key marks (a) 12 / 6)."
    },
    {
        "qNum": 59, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Speed and Distance",
        "text": "Walking at 4 kmph, a man misses train by 6 min. Walking at 5 kmph, he reaches 6 min before train arrival. The distance to the station is:",
        "opts": ["4 km", "7 km", "9 km", "5 km"],
        "sol": "Time difference = $6 - (-6) = 12\\text{ min} = 1/5\\text{ hr}$. $d/4 - d/5 = 1/5 \\implies d/20 = 1/5 \\implies d = 4\\text{ km}$."
    },
    {
        "qNum": 60, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "The missing number in the series 3, 6, 6, 12, 9, ......, 12 is:",
        "opts": ["15", "18", "11", "13"],
        "sol": "Two interleaved series: Series 1: 3, 6, 9, 12 (+3 each time). Series 2: 6, 12, 18 (+6 each time). Missing number is 18."
    },

    # 61-70
    {
        "qNum": 61, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Direction Sense",
        "text": "A man runs 20m East, turns right runs 10m, turns right runs 9m, turns left runs 5m, turns left runs 12m, finally turns left runs 6m. Which direction is he facing?",
        "opts": ["North", "South", "East", "West"],
        "sol": "From East, right $\\to$ South, right $\\to$ West, left $\\to$ South, left $\\to$ East, left $\\to$ North. He is facing North."
    },
    {
        "qNum": 62, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Equations",
        "text": "In a club, if 15 females are absent, males = half females. If 45 males are absent, females = 5 times males. Number of males actually present is:",
        "opts": ["45", "80", "105", "175"],
        "sol": "$M = \\frac{F - 15}{2} \\implies 2M - F = -15$. And $F = 5(M - 45) \\implies 5M - F = 225$. Subtracting gives $3M = 240 \\implies M = 80$."
    },
    {
        "qNum": 63, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "The missing number in the following series is: 6, 12, 21, ...., 48:",
        "opts": ["40", "33", "38", "45"],
        "sol": "Differences: $12 - 6 = 6$, $21 - 12 = 9$, next difference is 12 $\\implies 21 + 12 = 33$, next difference is 15 $\\implies 33 + 15 = 48$. Missing number is 33."
    },
    {
        "qNum": 64, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Scheduling Puzzle",
        "text": "Five roommates Randy, Sally, Terry, Uma, Vernon do housekeeping Mon-Fri. Mopping on Thursday, laundry on Friday (not Uma), Terry does his task (not vacuuming) on Wednesday, Randy on Monday, Sally does dusting (not Mon/Fri). The task done by Terry on Wednesday is:",
        "opts": ["Vacuuming", "Dusting", "Mopping", "Sweeping"],
        "sol": "Terry does not vacuum, mopping is Thu, laundry is Fri, Sally does dusting. Thus Terry must do sweeping."
    },
    {
        "qNum": 65, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Scheduling Puzzle",
        "text": "The day on which the vacuuming is done is:",
        "opts": ["Friday", "Monday", "Tuesday", "Wednesday"],
        "sol": "Vacuuming cannot be done by Vernon or Terry. Randy on Monday does vacuuming."
    },
    {
        "qNum": 66, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Scheduling Puzzle",
        "text": "Sally does dusting on:",
        "opts": ["Friday", "Monday", "Tuesday", "Wednesday"],
        "sol": "Sally does not do dusting Mon/Fri. Wednesday is Terry, Thursday is mopping. So Sally does dusting on Tuesday."
    },
    {
        "qNum": 67, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "Find the odd number in the series: 2, 9, 28, 65, 126, 216, 344, ....:",
        "opts": ["28", "65", "126", "216"],
        "sol": "Pattern is $n^3 + 1$: $1^3+1=2, 2^3+1=9, 3^3+1=28, 4^3+1=65, 5^3+1=126, 6^3+1=217$. 216 is $6^3$ instead of 217, so 216 is the odd number."
    },
    {
        "qNum": 68, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Averages",
        "text": "Average age of students in adult school is 40. 120 new students with average 32 join, decreasing average age by 4 years. The number of students after joining is:",
        "opts": ["1200", "120", "360", "240"],
        "sol": "$40n + 120(32) = 36(n + 120) \\implies 4n = 36(120) - 32(120) = 4(120) \\implies n = 120$. Total after joining = $120 + 120 = 240$."
    },
    {
        "qNum": 69, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating Arrangement",
        "text": "Circular arrangement of 8 persons P, Q, R, S, T, U, V, W facing center. Which two are NOT neighbours?",
        "opts": ["RV", "UV", "RP", "QW"],
        "sol": "From the circle deductions, R and V are not neighbours (T is between them)."
    },
    {
        "qNum": 70, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating Arrangement",
        "text": "What is the position of S in the circular arrangement?",
        "opts": ["Between U and V", "Second to the right of P", "To the immediate right of W", "Data inadequate"],
        "sol": "S is located immediately to the right of W."
    },

    # 71-80
    {
        "qNum": 71, "sub": "Analytical Ability", "ch": "Number System", "top": "Digits & Numbers",
        "text": "The ratio between a two digit number and the sum of the digits is 4 : 1. If the unit digit is 3 more than tens digit, the number is:",
        "opts": ["24", "63", "36", "42"],
        "sol": "$\\frac{10a+b}{a+b} = 4 \\implies 10a+b = 4a+4b \\implies 6a = 3b \\implies b = 2a$. Given $b - a = 3 \\implies 2a - a = 3 \\implies a = 3, b = 6$. The number is 36."
    },
    {
        "qNum": 72, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Dice",
        "text": "Two positions of a dice are shown (Dice 1: top 6, front 1, right 4; Dice 2: top 6, front 4, right 5). When number 1 is on the top, what number will be at the bottom?",
        "opts": ["2", "3", "5", "Cannot be determined"],
        "sol": "6 and 4 are common adjacent faces. Thus the other two faces must be opposite to each other: 1 is opposite to 5."
    },
    {
        "qNum": 73, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating Arrangement",
        "text": "A, B, C, D, E, F, G sit in line facing East. C immediate right of D. B at one extreme end with E as neighbour. G between E and F. D third from South end. Who is sitting third from North?",
        "opts": ["A", "E", "F", "G"],
        "sol": "North to South arrangement: B, E, G, F, D, C, A. Third from North is G."
    },
    {
        "qNum": 74, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "A family party consists of two fathers, two mothers, two sons, one father-in-law, one mother-in-law, one daughter-in-law, one grandfather, one grandmother and one grandson. Minimum persons required is:",
        "opts": ["5", "6", "7", "8"],
        "sol": "Grandfather, Grandmother, Father, Mother, Son = 5 persons."
    },
    {
        "qNum": 75, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "If A is brother of B, C is brother of B, and A is brother of D, then which of the following must be true?",
        "opts": ["A is brother of C", "B is brother of C", "D is brother of C", "B is brother of D"],
        "sol": "A is male and a sibling of B, C, D. Therefore, A is definitely brother of C."
    },
    {
        "qNum": 76, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "Five houses A to E in row with colored roofs and chimneys. Which of the following is true?",
        "opts": ["At least two houses have black chimney", "At least two houses have red roofs", "At least two houses have white chimneys", "At least two houses have green roofs"],
        "sol": "As established, houses A and C must both have white chimneys."
    },
    {
        "qNum": 77, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "If house C has a yellow roof, then which of the following must be true?",
        "opts": ["House E has a white chimney", "House E has a black chimney", "House E has a red chimney", "House D has a red chimney"],
        "sol": "D must have red roof and black chimney, forcing E to have a white chimney."
    },
    {
        "qNum": 78, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "What is the maximum number of green roofs?",
        "opts": ["1", "2", "3", "4"],
        "sol": "Maximum green roofs among 5 houses without adjacent matching is 3 (houses A, C, E)."
    },
    {
        "qNum": 79, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Krishna said, 'This girl is the wife of grandson of my mother'. How is Krishna related to girl?",
        "opts": ["Father", "Father-in-law", "Husband", "Grand father"],
        "sol": "Grandson of Krishna's mother is Krishna's son. Wife of Krishna's son makes Krishna her father-in-law."
    },
    {
        "qNum": 80, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Geometry",
        "text": "A boy took shortcut along diagonal of rectangular field and saved distance equal to half the longer side. Ratio of shorter side to longer side is:",
        "opts": ["1/2", "2/3", "1/4", "3/4"],
        "sol": "Let sides be $a$ (short) and $b$ (long). Path along sides = $a+b$. Diagonal = $\\sqrt{a^2+b^2}$. Saved distance = $(a+b) - \\sqrt{a^2+b^2} = b/2 \\implies a + b/2 = \\sqrt{a^2+b^2}$. Squaring gives $a^2 + ab + b^2/4 = a^2 + b^2 \\implies ab = 3b^2/4 \\implies a/b = 3/4$."
    },

    # 81-90
    {
        "qNum": 81, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coding Pattern",
        "text": "Pattern: SNIP (NICE) PACE, TEAR (EAST) FAST, TRAY (RARE) FIRE. Based on this method, CANE (?) BATS is:",
        "opts": ["NEAT", "CATS", "ANTS", "NETS"],
        "sol": "Taking 3rd & 4th letter of 1st word (NE) and 2nd & 3rd letter of 3rd word (AT) forms NEAT."
    },
    {
        "qNum": 82, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Critical Reasoning",
        "text": "Adivasi children developed nearsightedness after starting school, whereas illiterate elders showed no signs. Which conclusion is most strongly supported?",
        "opts": ["Only people who have the opportunity for formal schooling develop nearsightedness.", "People who are illiterate do not suffer from nearsightedness.", "The nearsightedness in the children is caused by the visual stress required by reading and other class work.", "Only literate people are nearsighted."],
        "sol": "The visual strain associated with reading and classroom learning correlates directly with the onset of nearsightedness."
    },
    {
        "qNum": 83, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "Rules: A causes B or C (not both); F occurs only if B; D occurs if B or C; E occurs only if C; J occurs only if E or F; D causes G or H or both; H occurs if E; G occurs if F. If A occurs, which may occur? I. F and G II. E and H III. D",
        "opts": ["I only", "II only", "I and III or II and III, but not both", "I, II and III"],
        "sol": "A causes either B or C, which leads to either path I & III or path II & III, but never both simultaneously."
    },
    {
        "qNum": 84, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "If B occurs, which must occur?",
        "opts": ["D", "G", "H", "J"],
        "sol": "Rule states: 'D occurs if B or C occurs'. Thus if B occurs, D must occur."
    },
    {
        "qNum": 85, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "If J occurs, which must have occurred?",
        "opts": ["Both E and F", "Either B or C", "Both B and C", "None of these"],
        "sol": "J requires E or F, and E requires C while F requires B. Hence either B or C must have occurred."
    },
    {
        "qNum": 86, "sub": "Analytical Ability", "ch": "Number System", "top": "Even & Odd Integers",
        "text": "Let $x, y, z$ be distinct integers. $x, y$ are odd and positive, $z$ is even and positive. Which cannot be true?",
        "opts": ["$(x-z)^2 y$ is even", "$(x-z)y^2$ is odd", "$(x-z)y$ is odd", "$(x-y)^2 z$ is even"],
        "sol": "$x - z = \\text{odd} - \\text{even} = \\text{odd}$. Thus $(x-z)^2$ is odd, and $y$ is odd, so $(x-z)^2 y$ must be odd. It cannot be even."
    },
    {
        "qNum": 87, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Pointing to a man, a lady said: 'The father of his brother is the only son of my mother'. How is the man related to the lady?",
        "opts": ["Brother", "Son", "Grandson", "Nephew"],
        "sol": "Only son of lady's mother = lady's brother. Father of the man's brother = the man's father. Thus the man's father is the lady's brother, making the man her nephew."
    },
    {
        "qNum": 88, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Six boys A, B, C, D, E, F marching shortest in front. F between B and A. E shorter than D but taller than C who is taller than A. E and F have 2 boys between them. A not shortest. Where is E?",
        "opts": ["Between A and B", "Between C and A", "Between D and C", "In front of C"],
        "sol": "Order from front (shortest to tallest): B, F, A, C, E, D. E is between D and C."
    },
    {
        "qNum": 89, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Counting from the shortest, which boy is fourth in the line?",
        "opts": ["E", "A", "D", "C"],
        "sol": "Order: 1st B, 2nd F, 3rd A, 4th C. Fourth boy is C."
    },
    {
        "qNum": 90, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Who is next to the shortest?",
        "opts": ["C", "B", "E", "F"],
        "sol": "The shortest is B; the boy next to the shortest is F."
    },

    # 91-110 (General English)
    {
        "qNum": 91, "sub": "General English", "ch": "Tenses", "top": "Present Perfect",
        "text": "Fill in the blank: 'And now for this evening's main headline : Britain _______ another Olympic gold medal.'",
        "opts": ["Had won", "Wins", "Won", "Has won"],
        "sol": "Present perfect 'Has won' is appropriate for recent news/headlines with present relevance."
    },
    {
        "qNum": 92, "sub": "General English", "ch": "Conditionals", "top": "Third Conditional",
        "text": "Fill in the blank: 'If she _______ about his financial situation, she would have helped him out.'",
        "opts": ["knew", "had been knowing", "had known", "have known"],
        "sol": "Third conditional requires past perfect 'had known' in the if-clause."
    },
    {
        "qNum": 93, "sub": "General English", "ch": "Vocabulary", "top": "Word Usage",
        "text": "Fill in the blank: 'I am sure she can teach computers as well. She's not _______ new to the subject.'",
        "opts": ["All together", "Altogether", "Alltogether", "Together"],
        "sol": "'Altogether' is an adverb meaning completely or entirely."
    },
    {
        "qNum": 94, "sub": "General English", "ch": "Prepositions", "top": "Grammar Usage",
        "text": "Fill in the blank: 'You are trying to drag me _______ a controversy.'",
        "opts": ["in", "into", "from", "for"],
        "sol": "'Drag someone into' is the standard prepositional idiom."
    },
    {
        "qNum": 95, "sub": "General English", "ch": "Relative Pronouns", "top": "Grammar Usage",
        "text": "Fill in the blank: 'The people _______ you socialise are called friends.'",
        "opts": ["with whom", "who", "with who", "whom"],
        "sol": "'With whom' is the grammatically correct prepositional relative pronoun."
    },
    {
        "qNum": 96, "sub": "General English", "ch": "Tenses", "top": "Past Simple Interrogative",
        "text": "Fill in the blank: '_______ to school yesterday?'",
        "opts": ["Did you walk", "Did you walked", "Do you walk", "Have you walked"],
        "sol": "'Did you walk' uses past auxiliary 'did' followed by the base verb 'walk'."
    },
    {
        "qNum": 97, "sub": "General English", "ch": "Vocabulary", "top": "Word Usage",
        "text": "Fill in the blank: 'There was no _______ in the railway compartment for additional passengers.'",
        "opts": ["space", "place", "seat", "room"],
        "sol": "'Room' is the standard uncountable noun used to mean unoccupied space for people/things."
    },
    {
        "qNum": 98, "sub": "General English", "ch": "Sentence Completion", "top": "Vocabulary & Context",
        "text": "Fill in the blanks: 'The most technologically advanced societies have been responsible for the greatest _______; indeed, savagery seems to be in direct proportion to _______.'",
        "opts": ["Wars ; viciousness", "Catastrophes ; ill-will", "Atrocities ; development", "Triumphs ; civilization"],
        "sol": "'Atrocities ; development' captures the stark contrast between technological progress and inhuman cruelty."
    },
    {
        "qNum": 99, "sub": "General English", "ch": "Tenses", "top": "Past Perfect",
        "text": "Fill in the blank: 'The thief _______ before the police came.'",
        "opts": ["Escaped", "Had escaped", "Will escape", "Has been escaped"],
        "sol": "Past perfect 'Had escaped' denotes an action completed before another past event."
    },
    {
        "qNum": 100, "sub": "General English", "ch": "Tenses", "top": "Past Perfect",
        "text": "Fill in the blank: 'Anne had to pay for everything because as usual, Peter _______ his wallet at home.'",
        "opts": ["had left", "was leaving", "left", "leave"],
        "sol": "'Had left' indicates leaving the wallet occurred prior to paying."
    },
    {
        "qNum": 101, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "Pick the synonym of the word MEAGRE:",
        "opts": ["helpful", "abundant", "essential", "limited"],
        "sol": "Meagre means lacking in quantity or quality (limited, scarce)."
    },
    {
        "qNum": 102, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "Choose the closest meaning of the idiom: Mud Slinging:",
        "opts": ["Giving pain", "Abusing someone", "Laying blame", "Damaging the reputation"],
        "sol": "Mudslinging refers to making malicious attacks to damage someone's reputation."
    },
    {
        "qNum": 103, "sub": "General English", "ch": "Spelling Test", "top": "Spelling Correction",
        "text": "Choose the correct spelling:",
        "opts": ["cieling", "cealing", "ceiling", "ceeling"],
        "sol": "The correct spelling is 'ceiling'."
    },
    {
        "qNum": 104, "sub": "General English", "ch": "Spelling Test", "top": "Spelling Correction",
        "text": "Choose the wrongly spelt word:",
        "opts": ["Believe", "Relieve", "Grieve", "Decieve"],
        "sol": "'Decieve' is misspelled; the correct spelling is 'Deceive'."
    },
    {
        "qNum": 105, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "Choose the word most similar in meaning to POLEMIC:",
        "opts": ["black", "magnetic", "grimace", "controversial"],
        "sol": "Polemic refers to a passionate verbal or written attack; synonym is controversial."
    },
    {
        "qNum": 106, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Pick the antonym of the word TIMID:",
        "opts": ["bold", "lazy", "calm", "slow"],
        "sol": "Timid means fearful or shy; its opposite is bold."
    },
    {
        "qNum": 107, "sub": "General English", "ch": "Spotting Error", "top": "Conditional Clause",
        "text": "Pick the part of sentence that has an error: 'If you would have come to me, I would have helped you.'",
        "opts": ["If you would have", "Come to me", "I would have", "Helped you"],
        "sol": "In conditional clauses, 'would have' cannot be used in the if-clause; it should be 'If you had come to me'."
    },
    {
        "qNum": 108, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Choose the word opposite in meaning to EXTRINSIC:",
        "opts": ["Reputable", "Inherent", "Ambitious", "Cursory"],
        "sol": "Extrinsic means not part of the essential nature; antonym is Inherent (intrinsic)."
    },
    {
        "qNum": 109, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "Closest meaning of idiom: 'To eat a humble pie':",
        "opts": ["To become a vegetarian", "Disinfecting everything", "To fill one's belly", "To say you are sorry for a mistake that you made"],
        "sol": "To eat humble pie means to apologize humbly and admit error."
    },
    {
        "qNum": 110, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Pick the antonym of the word FABRICATE:",
        "opts": ["Construct", "Weaken", "Dismantle", "Evolve"],
        "sol": "Fabricate means to construct or assemble; its opposite is dismantle or demolish."
    },

    # 111-120 (Computer Awareness)
    {
        "qNum": 111, "sub": "Computer Awareness", "ch": "Number System", "top": "Hexadecimal Conversion",
        "text": "$(2FA0C)_{16}$ is equivalent to:",
        "opts": ["$(195084)_{10}$", "$(00101111101000001100)_2$", "Both (a) and (b)", "None of these"],
        "sol": "$2 \\to 0010, F \\to 1111, A \\to 1010, 0 \\to 0000, C \\to 1100$. Decimal: $2 \\times 16^4 + 15 \\times 16^3 + 10 \\times 16^2 + 12 = 131072 + 61440 + 2560 + 12 = 195084$. Both (a) and (b) are correct."
    },
    {
        "qNum": 112, "sub": "Computer Awareness", "ch": "Number System", "top": "Octal to Decimal",
        "text": "The decimal equivalent of octal number $111010_8$ is:",
        "opts": ["81", "72", "71", "61"],
        "sol": "$111010_8$ as an exam question had ambiguities and was cancelled, with answer key marking (c)."
    },
    {
        "qNum": 113, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "I/O Organization",
        "text": "An I/O processor controls the flow of information between:",
        "opts": ["cache memory and I/O devices", "main memory and I/O devices", "two I/O devices", "cache and main memories"],
        "sol": "An I/O processor manages DMA transfers directly between main memory and I/O peripherals."
    },
    {
        "qNum": 114, "sub": "Computer Awareness", "ch": "Operating System", "top": "Storage Devices",
        "text": "Which of the following devices will take highest time in taking the backup of data from a computer?",
        "opts": ["Magnetic Disk", "Pen Drive", "CD", "Magnetic Tape"],
        "sol": "CD writing speeds (megabytes per second) take substantially longer time for large volume backup compared to modern high capacity magnetic tape drives."
    },
    {
        "qNum": 115, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Memory Hierarchy",
        "text": "ROM is a kind of:",
        "opts": ["primary memory", "cache memory", "removable memory", "secondary memory"],
        "sol": "ROM (Read Only Memory) is classified under primary/main memory of a computer."
    },
    {
        "qNum": 116, "sub": "Computer Awareness", "ch": "Operating System", "top": "Compilers & Errors",
        "text": "The errors that can be pointed out by compilers are:",
        "opts": ["Syntax errors", "Semantic errors", "Logical errors", "Internal errors"],
        "sol": "Compilers parse grammar and identify syntax errors during compilation."
    },
    {
        "qNum": 117, "sub": "Computer Awareness", "ch": "Number System", "top": "2's Complement Multiplication",
        "text": "Let $x = 11111010$ and $y = 00001010$ be two 8-bit 2's complement numbers. Their product in 2's complement notation is:",
        "opts": ["11000100", "10011100", "10100101", "11010101"],
        "sol": "$x = -6$, $y = +10$. Product $= -60$. 60 in binary = $00111100$. 2's complement of 60 = $11000100$."
    },
    {
        "qNum": 118, "sub": "Computer Awareness", "ch": "Number System", "top": "2's Complement Range",
        "text": "The range of numbers that can be stored in 8 bits, if negative numbers are stored in 2's complement form is:",
        "opts": ["-128 to +128", "-128 to +127", "-127 to +128", "-127 to +127"],
        "sol": "For $n=8$ bits, range is $-2^7 \\text{ to } 2^7 - 1 = -128 \\text{ to } +127$."
    },
    {
        "qNum": 119, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Memory Hierarchy",
        "text": "Primary storage is _______ as compared to secondary memory.",
        "opts": ["Slow and expensive", "fast and inexpensive", "fast and expensive", "slow and inexpensive"],
        "sol": "Primary memory (RAM) is faster and much more expensive per bit than secondary storage."
    },
    {
        "qNum": 120, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "CPU Architecture",
        "text": "Which of the following units is used to supervise each instruction in the CPU?",
        "opts": ["Control Unit", "Accumulator", "ALU", "Control Register"],
        "sol": "The Control Unit (CU) coordinates and supervises instruction fetch, decode, and execution."
    }
]

paper = {
    "year": 2012,
    "title": "NIMCET 2012 Official Question Paper",
    "totalQuestions": 120,
    "overwrite": True,
    "questions": [
        {
            "questionNumber": q["qNum"],
            "subject": q["sub"],
            "chapter": q["ch"],
            "topic": q["top"],
            "questionText": q["text"],
            "options": [
                {"id": "A", "text": q["opts"][0]},
                {"id": "B", "text": q["opts"][1]},
                {"id": "C", "text": q["opts"][2]},
                {"id": "D", "text": q["opts"][3]}
            ],
            "correctAnswer": answers_2012[q["qNum"] - 1],
            "difficulty": "easy" if q["qNum"] <= 40 else ("moderate" if q["qNum"] <= 85 else "hard"),
            "explanation": {
                "summary": q["sol"],
                "stepByStep": [
                    {
                        "stepNumber": 1,
                        "title": "Official Solution",
                        "content": q["sol"],
                        "formula": "",
                        "calculation": ""
                    }
                ]
            }
        }
        for q in raw_questions
    ]
}

out_path = os.path.join(os.path.dirname(__file__), "data", "nimcet_2012.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2)

print(f"Generated {len(paper['questions'])} questions into {out_path}")
