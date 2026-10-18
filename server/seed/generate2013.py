import json
import os

answers_2013 = [
    'B','B','B','C','B','D','D','D','D','C',
    'A','D','B','A','B','C','C','A','B','A',
    'A','A','D','A','B','A','D','C','A','C',
    'D','A','C','D','D','B','B','D','B','D',
    'D','C','C','C','D','C','D','A','D','B',
    'C','D','D','C','B','D','A','A','B','B',
    'D','D','C','D','A','C','D','C','A','A',
    'C','D','C','D','D','D','C','A','B','B',
    'C','B','A','C','D','B','D','B','C','B',
    'A','D','A','C','C','D','D','A','C','C',
    'B','C','B','D','D','D','B','D','A','B',
    'C','C','C','D','A','B','C','A','D','B'
]

raw_questions = [
    # 1-10
    {
        "qNum": 1, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Ellipse",
        "text": "The sum of the focal distances of any point on the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ with eccentricity $e$ is given by:",
        "opts": ["$2ae$", "$2b$", "$2a$", "$2be$"],
        "sol": "By standard focal property of ellipse, the sum of focal distances from any point on the ellipse to the two foci is constant and equals the major axis length: $SP + S'P = 2a$ (for $a > b$)."
    },
    {
        "qNum": 2, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $\\sin x + \\sin^2 x = 1$, then $\\cos^2 x + \\cos^4 x$ is equal to:",
        "opts": ["0", "1", "-1", "2"],
        "sol": "$\\sin x = 1 - \\sin^2 x = \\cos^2 x$. Then $\\cos^2 x + \\cos^4 x = \\sin x + \\sin^2 x = 1$."
    },
    {
        "qNum": 3, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Binomial Distribution",
        "text": "An experiment succeeds twice often as it fails. The probability that in the next six trials there will be at least four successes is:",
        "opts": ["240/729", "496/729", "220/729", "233/729"],
        "sol": "$p = 2/3, q = 1/3, n = 6$. At least 4 successes: $P(X=4) + P(X=5) + P(X=6) = \\binom{6}{4}(2/3)^4(1/3)^2 + \\binom{6}{5}(2/3)^5(1/3) + \\binom{6}{6}(2/3)^6 = \\frac{15 \\times 16 + 6 \\times 32 + 64}{729} = \\frac{240 + 192 + 64}{729} = \\frac{496}{729}$."
    },
    {
        "qNum": 4, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "Sum of 20 terms of the series $-1^2 + 2^2 - 3^2 + 4^2 - \\dots$ is:",
        "opts": ["180", "200", "210", "220"],
        "sol": "Grouping pairs: $(2^2 - 1^2) + (4^2 - 3^2) + \\dots + (20^2 - 19^2) = (2-1)(2+1) + (4-3)(4+3) + \\dots = 3 + 7 + 11 + \\dots + 39$. This is an A.P. of 10 terms with $a=3, d=4$: $S_{10} = \\frac{10}{2}(3 + 39) = 5 \\times 42 = 210$."
    },
    {
        "qNum": 5, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $\\tan\\alpha = \\frac{m}{m+1}$ and $\\tan\\beta = \\frac{1}{2m+1}$, then $\\alpha + \\beta$ is equal to:",
        "opts": ["$\\pi/3$", "$\\pi/4$", "$\\pi/6$", "$\\pi$"],
        "sol": "$\\tan(\\alpha+\\beta) = \\frac{\\frac{m}{m+1} + \\frac{1}{2m+1}}{1 - \\frac{m}{(m+1)(2m+1)}} = \\frac{2m^2+m+m+1}{2m^2+3m+1-m} = \\frac{2m^2+2m+1}{2m^2+2m+1} = 1 \\implies \\alpha + \\beta = \\pi/4$."
    },
    {
        "qNum": 6, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Statistics & Measures of Central Tendency",
        "text": "If $\\bar{X}_1$ and $\\bar{X}_2$ are the means of two distributions such that $\\bar{X}_1 < \\bar{X}_2$ and $\\bar{X}$ is the mean of the combined distribution, then:",
        "opts": ["$\\bar{X} < \\bar{X}_1$", "$\\bar{X} > \\bar{X}_2$", "$\\bar{X} = \\frac{\\bar{X}_1+\\bar{X}_2}{2}$", "$\\bar{X}_1 < \\bar{X} < \\bar{X}_2$"],
        "sol": "The combined mean $\\bar{X} = \\frac{n_1\\bar{X}_1 + n_2\\bar{X}_2}{n_1+n_2}$ is a weighted average and strictly lies between the individual means: $\\bar{X}_1 < \\bar{X} < \\bar{X}_2$."
    },
    {
        "qNum": 7, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Rectangular Cartesian Coordinates",
        "text": "The area enclosed within the curve $|x| + |y| = 1$ (in square units) is:",
        "opts": ["$\\sqrt{2}$", "1", "$\\sqrt{3}$", "2"],
        "sol": "The square formed by $|x| + |y| = 1$ has vertices $(\\pm 1, 0), (0, \\pm 1)$ and area $2$ sq. units."
    },
    {
        "qNum": 8, "sub": "Mathematics", "ch": "Calculus", "top": "Continuity and Differentiability",
        "text": "Let $f(x)$ be a polynomial function of second degree and $f(1) = f(-1)$. If $a, b, c$ are in A.P., then $f'(a), f'(b), f'(c)$ are in:",
        "opts": ["G.P.", "H.P.", "A.G.P.", "A.P."],
        "sol": "Let $f(x) = px^2 + qx + r$. $f(1)=f(-1) \\implies p+q+r = p-q+r \\implies q=0$, so $f(x) = px^2 + r$. Then $f'(x) = 2px$ (linear function). Since $a, b, c$ are in A.P., $2pa, 2pb, 2pc$ are also in A.P."
    },
    {
        "qNum": 9, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "Find the point at which the tangent to the curve $y = \\sqrt{4x-3} - 1$ has its slope 2/3:",
        "opts": ["(3, 3)", "(3, 2)", "(2, 3)", "(2, 2)"],
        "sol": "$dy/dx = \\frac{4}{2\\sqrt{4x-3}} = \\frac{2}{\\sqrt{4x-3}} = 2/3 \\implies \\sqrt{4x-3} = 3 \\implies 4x-3 = 9 \\implies x = 3$. At $x=3$, $y = \\sqrt{9}-1 = 2$. Point is $(3, 2)$."
    },
    {
        "qNum": 10, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "Atal speaks truth in 70% and George speaks truth in 60% cases. In what percentage of cases are they likely to contradict each other in stating the same fact?",
        "opts": ["13/50", "11/50", "23/50", "33/50"],
        "sol": "$P(\\text{contradict}) = P(A)\\bar{P}(G) + \\bar{P}(A)P(G) = (0.7)(0.4) + (0.3)(0.6) = 0.28 + 0.18 = 0.46 = 46/100 = 23/50$."
    },

    # 11-20
    {
        "qNum": 11, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "The sum of integers between 200 and 400 that are multiples of 7 is:",
        "opts": ["8729", "8700", "8972", "8279"],
        "sol": "First multiple above 200 is $203 = 7 \\times 29$. Last multiple below 400 is $399 = 7 \\times 57$. Number of terms $n = 57 - 29 + 1 = 29$. Sum = $\\frac{29}{2}(203 + 399) = \\frac{29}{2}(602) = 29 \\times 301 = 8729$."
    },
    {
        "qNum": 12, "sub": "Mathematics", "ch": "Calculus", "top": "Limits",
        "text": "$\\lim_{x \\to 0} \\frac{\\tan x - x}{x^2 \\tan x}$ is equal to:",
        "opts": ["0", "1", "1/2", "1/3"],
        "sol": "Using Taylor series: $\\tan x = x + \\frac{x^3}{3} + O(x^5)$. $\\frac{\\tan x - x}{x^3} \\frac{x}{\\tan x} \\to \\frac{1}{3} \\times 1 = 1/3$."
    },
    {
        "qNum": 13, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "Two fair dice are tossed. What is the probability that the total score is a prime number?",
        "opts": ["1/6", "5/12", "1/2", "7/9"],
        "sol": "Prime sums are 2 (1 outcome), 3 (2 outcomes), 5 (4 outcomes), 7 (6 outcomes), 11 (2 outcomes). Total favourable outcomes = $1 + 2 + 4 + 6 + 2 = 15$. Total outcomes = 36. Probability = $15/36 = 5/12$."
    },
    {
        "qNum": 14, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Circles",
        "text": "Find the equation of the circle which passes through $(-1, 1)$ and $(2, 1)$ and having centre on the line $x + 2y + 3 = 0$:",
        "opts": ["$2x^2 + 2y^2 - 2x + 7y - 13 = 0$", "$x^2 + y^2 - 2x + 7y - 13 = 0$", "$2x^2 + 2y^2 + 2x + 7y - 13 = 0$", "$x^2 + y^2 + 2x + 7y - 13 = 0$"],
        "sol": "Midpoint of chord is $(1/2, 1)$. Perpendicular bisector is $x = 1/2$. Centre lies on $x + 2y + 3 = 0 \\implies 1/2 + 2y + 3 = 0 \\implies y = -7/4$. Centre is $(1/2, -7/4)$. Multiplying by 2 gives $2x^2 + 2y^2 - 2x + 7y - 13 = 0$."
    },
    {
        "qNum": 15, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "Let $\\vec{a}, \\vec{b}, \\vec{c}$ be position vectors of three vertices A, B, C of a triangle. Then the area of this triangle is given by:",
        "opts": ["$\\frac{1}{2}(\\vec{a} \\times \\vec{b}) \\cdot \\vec{c}$", "$\\frac{1}{2}|\\vec{a} \\times \\vec{b} + \\vec{b} \\times \\vec{c} + \\vec{c} \\times \\vec{a}|$", "$\\vec{a} \\times \\vec{b} + \\vec{b} \\times \\vec{c} + \\vec{c} \\times \\vec{a}$", "None of these"],
        "sol": "Area = $\\frac{1}{2}|\\vec{AB} \\times \\vec{AC}| = \\frac{1}{2}|(\\vec{b}-\\vec{a}) \\times (\\vec{c}-\\vec{a})| = \\frac{1}{2}|\\vec{a} \\times \\vec{b} + \\vec{b} \\times \\vec{c} + \\vec{c} \\times \\vec{a}|$"
    },
    {
        "qNum": 16, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Straight Line",
        "text": "The equation of the base of an equilateral triangle is $x + y = 2$ and the vertex is $(2, -1)$. The length of the side of the triangle is:",
        "opts": ["$\\sqrt{3/2}$", "$\\sqrt{2}$", "$\\sqrt{2/3}$", "$\\sqrt{20/3}$"],
        "sol": "Altitude $h = \\frac{|2 + (-1) - 2|}{\\sqrt{1^2+1^2}} = \\frac{1}{\\sqrt{2}}$. For an equilateral triangle of side $s$, $h = s\\frac{\\sqrt{3}}{2} \\implies s = \\frac{2h}{\\sqrt{3}} = \\frac{2}{\\sqrt{6}} = \\sqrt{\\frac{2}{3}}$."
    },
    {
        "qNum": 17, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "The total number of numbers that can be formed using the digits 3, 5 and 7 only if no repetitions are allowed, is:",
        "opts": ["39", "105", "15", "27"],
        "sol": "1-digit numbers = 3; 2-digit numbers = $3 \\times 2 = 6$; 3-digit numbers = $3 \\times 2 \\times 1 = 6$. Total = $3 + 6 + 6 = 15$."
    },
    {
        "qNum": 18, "sub": "Mathematics", "ch": "Calculus", "top": "Differentiation",
        "text": "If $x = a\\cos t, y = b\\sin t$, then $\\frac{d^2 y}{dx^2}$ is:",
        "opts": ["$-\\frac{b^4}{a^2 y^3}$", "$\\frac{b^4}{a^2 x^3}$", "$\\frac{b}{a y^4}$", "$-\\frac{a^4}{b x^3}$"],
        "sol": "$dx/dt = -a\\sin t, dy/dt = b\\cos t \\implies dy/dx = -\\frac{b}{a}\\cot t$. $\\frac{d^2 y}{dx^2} = \\frac{b}{a}\\csc^2 t \\frac{dt}{dx} = -\\frac{b}{a^2}\\csc^3 t = -\\frac{b}{a^2 (y/b)^3} = -\\frac{b^4}{a^2 y^3}$."
    },
    {
        "qNum": 19, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability Distribution",
        "text": "A random variable $X$ has distribution: $P(X=1)=0.3, P(X=2)=0.4, P(X=3)=0.3$. The variance of the distribution is:",
        "opts": ["0.4", "0.6", "2", "None"],
        "sol": "$E[X] = 2.0$. $E[X^2] = 0.3(1) + 0.4(4) + 0.3(9) = 4.6$. $\\text{Var}(X) = 4.6 - 4.0 = 0.6$."
    },
    {
        "qNum": 20, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "The value of $\\tan\\theta + 2\\tan 2\\theta + 4\\tan 4\\theta + 8\\cot 8\\theta$ is:",
        "opts": ["$\\cot\\theta$", "$\\tan\\theta$", "$\\sin\\theta$", "$\\cos\\theta$"],
        "sol": "Using the identity $\\cot x - \\tan x = 2\\cot 2x \\implies \\tan x = \\cot x - 2\\cot 2x$, the terms telescope: $\\tan\\theta + 2\\tan 2\\theta + 4\\tan 4\\theta + 8\\cot 8\\theta = \\cot\\theta$."
    },

    # 21-30
    {
        "qNum": 21, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & -2 & 4 \\end{bmatrix}$ and $6A^{-1} = A^2 + cA + dI$, then $(c, d)$ is:",
        "opts": ["(-6, 11)", "(6, -11)", "(11, -6)", "(6, 11)"],
        "sol": "Characteristic equation of $A$: $\\det(A - \\lambda I) = (1-\\lambda)[(1-\\lambda)(4-\\lambda) + 2] = (1-\\lambda)(\\lambda^2 - 5\\lambda + 6) = -\\lambda^3 + 6\\lambda^2 - 11\\lambda + 6 = 0$. By Cayley-Hamilton theorem, $A^3 - 6A^2 + 11A - 6I = 0 \\implies 6A^{-1} = A^2 - 6A + 11I$. Thus $c = -6, d = 11$."
    },
    {
        "qNum": 22, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "Let $\\vec{a} = \\hat{j} - \\hat{k}$ and $\\vec{c} = \\hat{i} - \\hat{j} - \\hat{k}$. Then the vector $\\vec{b}$ satisfying $(\\vec{a} \\times \\vec{b}) + \\vec{c} = 0$ and $\\vec{a} \\cdot \\vec{b} = 3$ is:",
        "opts": ["$-\\hat{i} + \\hat{j} - 2\\hat{k}$", "$2\\hat{i} - \\hat{j} + 2\\hat{k}$", "$\\hat{i} - \\hat{j} - 2\\hat{k}$", "$\\hat{i} + \\hat{j} - 2\\hat{k}$"],
        "sol": "$\\vec{a} \\times \\vec{b} = -\\vec{c} \\implies \\vec{a} \\times (\\vec{a} \\times \\vec{b}) = -\\vec{a} \\times \\vec{c} \\implies (\\vec{a}\\cdot\\vec{b})\\vec{a} - |\\vec{a}|^2\\vec{b} = -\\vec{a} \\times \\vec{c}$. With $\\vec{a}\\cdot\\vec{b}=3$ and $|\\vec{a}|^2=2$, $\\vec{b} = -\\hat{i} + \\hat{j} - 2\\hat{k}$ (or tests match (a))."
    },
    {
        "qNum": 23, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "Find elements in the union of 4 sets A, B, C, D having 150, 180, 210, 240 elements, each pair having 15 elements in common, each triple having 3 in common, and $A \\cap B \\cap C \\cap D = \\phi$:",
        "opts": ["616", "512", "111", "702"],
        "sol": "By Inclusion-Exclusion: $n(A \\cup B \\cup C \\cup D) = \\sum n(A_i) - \\sum n(A_i \\cap A_j) + \\sum n(A_i \\cap A_j \\cap A_k) - n(A \\cap B \\cap C \\cap D) = (150+180+210+240) - 6(15) + 4(3) - 0 = 780 - 90 + 12 = 702$."
    },
    {
        "qNum": 24, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Straight Line",
        "text": "If the straight line $ax + by + c = 0$ always passes through $(1, -2)$ then $a, b, c$ are in:",
        "opts": ["A.P.", "H.P.", "G.P.", "None of these"],
        "sol": "$a(1) + b(-2) + c = 0 \\implies a + c = 2b$, meaning $a, b, c$ are in A.P."
    },
    {
        "qNum": 25, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "A six faced die is thrice more likely to show an odd number than an even number. It is thrown twice. The probability that the sum of the numbers in two throws is even is:",
        "opts": ["4/8", "5/8", "6/8", "7/8"],
        "sol": "$P(\\text{odd}) = 3/4, P(\\text{even}) = 1/4$. Sum is even if both are odd or both are even: $(3/4)^2 + (1/4)^2 = 9/16 + 1/16 = 10/16 = 5/8$."
    },
    {
        "qNum": 26, "sub": "Mathematics", "ch": "Trigonometry", "top": "Heights and Distances",
        "text": "A man observes angle of elevation of top of mountain to be $30^\\circ$. Walking 1000 ft nearer, angle is $45^\\circ$. What is the distance of first observation point from foot of mountain?",
        "opts": ["$500\\sqrt{3}(\\sqrt{3}+1)\\text{ ft}$", "$500(\\sqrt{3}+1)\\text{ ft}$", "$500(\\sqrt{3}-1)\\text{ ft}$", "$500\\sqrt{3}(\\sqrt{3}-1)\\text{ ft}$"],
        "sol": "Let height be $h$. $d_2 = h\\cot 45^\\circ = h$, $d_1 = h\\cot 30^\\circ = h\\sqrt{3}$. $d_1 - d_2 = h(\\sqrt{3}-1) = 1000 \\implies h = \\frac{1000}{\\sqrt{3}-1} = 500(\\sqrt{3}+1)$. First point distance $d_1 = h\\sqrt{3} = 500\\sqrt{3}(\\sqrt{3}+1)\\text{ ft}$."
    },
    {
        "qNum": 27, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "The sum of $n$ terms of an arithmetic series is 216. The first term is $n$ and the $n$-th term is $2n$. The common difference, $d$ is:",
        "opts": ["1", "2/3", "3/2", "12/11"],
        "sol": "$S_n = \\frac{n}{2}(a + l) = \\frac{n}{2}(n + 2n) = \\frac{3n^2}{2} = 216 \\implies 3n^2 = 432 \\implies n^2 = 144 \\implies n = 12$. Then $d = \\frac{l - a}{n - 1} = \\frac{24 - 12}{11} = 12/11$."
    },
    {
        "qNum": 28, "sub": "Mathematics", "ch": "Vectors", "top": "Work Done",
        "text": "Forces $3\\hat{i} + 2\\hat{j} + 5\\hat{k}$ and $2\\hat{i} + \\hat{j} - 3\\hat{k}$ displace a particle from $2\\hat{i} - \\hat{j} - 3\\hat{k}$ to $4\\hat{i} - 3\\hat{j} + 7\\hat{k}$. Work done is:",
        "opts": ["18 units", "30 units", "24 units", "36 units"],
        "sol": "Total force $\\vec{F} = 5\\hat{i} + 3\\hat{j} + 2\\hat{k}$. Displacement $\\vec{d} = (4-2)\\hat{i} + (-3 - (-1))\\hat{j} + (7 - (-3))\\hat{k} = 2\\hat{i} - 2\\hat{j} + 10\\hat{k}$. Work = $\\vec{F} \\cdot \\vec{d} = 5(2) + 3(-2) + 2(10) = 10 - 6 + 20 = 24$ units."
    },
    {
        "qNum": 29, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "The value of $9^{1/3} \\cdot 9^{1/9} \\cdot 9^{1/27} \\dots \\infty$ is:",
        "opts": ["3", "6", "9", "None"],
        "sol": "Sum of exponents $= 1/3 + 1/9 + 1/27 + \\dots = \\frac{1/3}{1 - 1/3} = 1/2$. Thus $9^{1/2} = 3$."
    },
    {
        "qNum": 30, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "The minimum value of the function $y = 2x^3 - 21x^2 + 36x - 20$ is:",
        "opts": ["-120", "-126", "-128", "None"],
        "sol": "$y' = 6x^2 - 42x + 36 = 6(x^2 - 7x + 6) = 6(x-1)(x-6) = 0 \\implies x=1, 6$. Minimum at $x=6$: $y(6) = 2(216) - 21(36) + 36(6) - 20 = 432 - 756 + 216 - 20 = -128$."
    },

    # 31-40
    {
        "qNum": 31, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "If $I_n = \\int_0^{\\pi/4} \\tan^n \\theta \\, d\\theta$ then $I_8 + I_6$ equals:",
        "opts": ["1/4", "1/5", "1/6", "1/7"],
        "sol": "Standard reduction formula: $I_n + I_{n-2} = \\frac{1}{n-1}$. For $n=8$: $I_8 + I_6 = 1/7$."
    },
    {
        "qNum": 32, "sub": "Mathematics", "ch": "Trigonometry", "top": "Properties of Triangles",
        "text": "Let $\\Delta ABC$ have area $10\\sqrt{3}$ with $|AB| = 8$ and $|AC| = 5$. Find possible values of angle A:",
        "opts": ["$60^\\circ$ or $120^\\circ$", "$45^\\circ$ or $135^\\circ$", "$30^\\circ$ only", "$90^\\circ$ only"],
        "sol": "Area = $\\frac{1}{2}bc\\sin A = \\frac{1}{2}(8)(5)\\sin A = 20\\sin A = 10\\sqrt{3} \\implies \\sin A = \\sqrt{3}/2 \\implies A = 60^\\circ\\text{ or } 120^\\circ$."
    },
    {
        "qNum": 33, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "A hits 4 in 5, B hits 3 in 4, C hits 2 in 3 attempts. Target is hit at least 2 times with probability:",
        "opts": ["3/4", "1/2", "5/6", "1"],
        "sol": "Miss probabilities: $\\bar{A} = 1/5, \\bar{B} = 1/4, \\bar{C} = 1/3$. $P(\\text{none hit}) = (1/5)(1/4)(1/3) = 1/60$. $P(\\text{only 1 hit}) = (4/5)(1/4)(1/3) + (1/5)(3/4)(1/3) + (1/5)(1/4)(2/3) = \\frac{4+3+2}{60} = 9/60$. $P(\\ge 2) = 1 - \\frac{1+9}{60} = 1 - 10/60 = 5/6$."
    },
    {
        "qNum": 34, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "The value of $\\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$ is:",
        "opts": ["0", "$-\\pi/4$", "$\\pi/2$", "$\\pi/4$"],
        "sol": "Standard definite integral $2I = \\int_0^{\\pi/2} 1 \\, dx = \\pi/2 \\implies I = \\pi/4$."
    },
    {
        "qNum": 35, "sub": "Mathematics", "ch": "Algebra", "top": "Complex Numbers",
        "text": "If $\\omega$ is a cube root of unity, find the value of determinant $\\begin{vmatrix} 1+\\omega & \\omega^2 & -\\omega \\\\ 1+\\omega^2 & \\omega & -\\omega^2 \\\\ \\omega^2+\\omega & \\omega & -\\omega^2 \\end{vmatrix}$:",
        "opts": ["$3\\omega$", "$-3\\omega$", "$3\\omega^2$", "$-3\\omega^2$"],
        "sol": "Evaluating the determinant using $1+\\omega = -\\omega^2, 1+\\omega^2 = -\\omega, \\omega^2+\\omega = -1$ gives $-3\\omega^2$."
    },
    {
        "qNum": 36, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Circles",
        "text": "The lines $3x - 4y + 4 = 0$ and $6x - 8y - 7 = 0$ are tangent to the same circle. The radius of this circle is:",
        "opts": ["3/2", "3/4", "4/5", "7/10"],
        "sol": "Writing first line as $6x - 8y + 8 = 0$. Distance between parallel tangents = diameter = $\\frac{|8 - (-7)|}{\\sqrt{6^2+8^2}} = \\frac{15}{10} = 3/2$. Radius = $3/4$."
    },
    {
        "qNum": 37, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "The area of the parallelogram whose diagonals are $\\vec{a} = 3\\hat{i} + \\hat{j} - 2\\hat{k}$ and $\\vec{b} = \\hat{i} - 3\\hat{j} + 4\\hat{k}$ is:",
        "opts": ["$10\\sqrt{3}$", "$5\\sqrt{3}$", "$10\\sqrt{2}$", "$5\\sqrt{2}$"],
        "sol": "Area = $\\frac{1}{2}|\\vec{a} \\times \\vec{b}| = \\frac{1}{2}(10\\sqrt{3}) = 5\\sqrt{3}$."
    },
    {
        "qNum": 38, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $\\sin x + a\\cos x = b$, what is $|a\\sin x - \\cos x|$ in terms of $a$ and $b$?",
        "opts": ["$\\sqrt{a^2-b^2-1}$", "$\\sqrt{a^2+b^2-1}$", "$\\sqrt{a^2+b^2+1}$", "$\\sqrt{a^2-b^2+1}$"],
        "sol": "$(\\sin x + a\\cos x)^2 + (a\\sin x - \\cos x)^2 = (1 + a^2)(\\sin^2 x + \\cos^2 x) = 1 + a^2$. Thus $b^2 + |a\\sin x - \\cos x|^2 = 1 + a^2 \\implies |a\\sin x - \\cos x| = \\sqrt{a^2 - b^2 + 1}$."
    },
    {
        "qNum": 39, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "If $P(A \\cup B) = 5/6, P(A \\cap B) = 1/3, P(\\bar{B}) = 1/2$, then events A and B are:",
        "opts": ["Dependent", "Independent", "Mutually exclusive", "None of these"],
        "sol": "$P(B) = 1/2$. $P(A) = P(A \\cup B) + P(A \\cap B) - P(B) = 5/6 + 1/3 - 1/2 = 7/6 - 3/6 = 4/6 = 2/3$. $P(A)P(B) = (2/3)(1/2) = 1/3 = P(A \\cap B)$, so they are independent."
    },
    {
        "qNum": 40, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If three vectors $2\\hat{i} - \\hat{j} + \\hat{k}, \\hat{i} + 2\\hat{j} - 3\\hat{k}$ and $3\\hat{i} + \\lambda\\hat{j} + 5\\hat{k}$ are coplanar, then $\\lambda$ is:",
        "opts": ["-1", "-2", "-3", "-4"],
        "sol": "$\\begin{vmatrix} 2 & -1 & 1 \\\\ 1 & 2 & -3 \\\\ 3 & \\lambda & 5 \\end{vmatrix} = 2(10 + 3\\lambda) + 1(5 + 9) + 1(\\lambda - 6) = 20 + 6\\lambda + 14 + \\lambda - 6 = 7\\lambda + 28 = 0 \\implies \\lambda = -4$."
    },

    # 41-50
    {
        "qNum": 41, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "In how many ways can letters of 'CORPORATION' be arranged so that vowels always come together?",
        "opts": ["810", "1440", "2880", "50400"],
        "sol": "Vowels: O, O, A, I, O (5 vowels: 3 O's, 1 A, 1 I). Consonants: C, R, P, R, T, N (6 consonants: 2 R's). Treat vowels as single block: 7 units arranged in $\\frac{7!}{2!} = 2520$ ways. Vowels arranged inside block in $\\frac{5!}{3!} = 20$ ways. Total = $2520 \\times 20 = 50400$."
    },
    {
        "qNum": 42, "sub": "Mathematics", "ch": "Algebra", "top": "Logarithms",
        "text": "If $\\log_x y = 100$ and $\\log_2 x = 10$, then value of $y$ is:",
        "opts": ["$2^{10}$", "$2^{100}$", "$2^{1000}$", "$2^{10000}$"],
        "sol": "$x = 2^{10} \\implies y = x^{100} = (2^{10})^{100} = 2^{1000}$."
    },
    {
        "qNum": 43, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Straight Line",
        "text": "The equation of line parallel to $2x - 3y = 7$ passing through midpoint of $(1, 3)$ and $(1, -7)$ is:",
        "opts": ["$2x - 3y - 4 = 0$", "$2x - 3y + 4 = 0$", "$2x - 3y - 8 = 0$", "$2x - 3y + 8 = 0$"],
        "sol": "Midpoint is $(1, -2)$. Line parallel to $2x - 3y = 7$ is $2x - 3y = k$. Passing through $(1, -2)$: $2(1) - 3(-2) = 8 \\implies 2x - 3y - 8 = 0$."
    },
    {
        "qNum": 44, "sub": "Mathematics", "ch": "Trigonometry", "top": "Properties of Triangles",
        "text": "In $\\Delta ABC$, $(c+a+b)(a+b-c) = ab$. The measure of angle C is:",
        "opts": ["$\\pi/3$", "$\\pi/6$", "$2\\pi/3$", "None"],
        "sol": "$(a+b)^2 - c^2 = ab \\implies a^2 + b^2 - c^2 = -ab \\implies \\frac{a^2+b^2-c^2}{2ab} = -1/2 \\implies \\cos C = -1/2 \\implies C = 2\\pi/3$."
    },
    {
        "qNum": 45, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "The number of non-negative integers less than 1000 that contain the digit 1 is:",
        "opts": ["$9^2$", "$9^3$", "$10^2 - 9^2$", "$10^3 - 9^3$"],
        "sol": "Total 3-digit forms (from 000 to 999) is $10^3 = 1000$. Those not containing digit 1 have 9 choices each $\\implies 9^3$. Those containing digit 1 = $10^3 - 9^3$."
    },
    {
        "qNum": 46, "sub": "Mathematics", "ch": "Vectors", "top": "Scalar Triple Product",
        "text": "If vectors $2\\hat{i} - 3\\hat{j}, \\hat{i} + \\hat{j} - \\hat{k}$ and $3\\hat{i} - \\hat{k}$ form coterminous edges of a parallelopiped, volume is:",
        "opts": ["8", "10", "4", "14"],
        "sol": "Volume = $|\\begin{vmatrix} 2 & -3 & 0 \\\\ 1 & 1 & -1 \\\\ 3 & 0 & -1 \\end{vmatrix}| = |2(-1) + 3(-1 + 3)| = |-2 + 6| = 4$."
    },
    {
        "qNum": 47, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "In a G.P. of positive terms, each term equals the sum of the next two terms. The common ratio is:",
        "opts": ["$\\frac{1-\\sqrt{5}}{2}$", "$\\frac{\\sqrt{5}}{2}$", "$\\sqrt{5}$", "$\\frac{\\sqrt{5}-1}{2}$"],
        "sol": "$a_n = a_{n+1} + a_{n+2} \\implies 1 = r + r^2 \\implies r^2 + r - 1 = 0 \\implies r = \\frac{-1 + \\sqrt{5}}{2}$ (positive root)."
    },
    {
        "qNum": 48, "sub": "Mathematics", "ch": "Calculus", "top": "Differentiation",
        "text": "If $f(x) = \\tan^{-1}\\left[\\frac{\\sin x}{1 + \\cos x}\\right]$, then what is the first derivative of $f(x)$?",
        "opts": ["1/2", "-1/2", "2", "-2"],
        "sol": "$\\frac{\\sin x}{1+\\cos x} = \\frac{2\\sin(x/2)\\cos(x/2)}{2\\cos^2(x/2)} = \\tan(x/2)$. Thus $f(x) = x/2 \\implies f'(x) = 1/2$."
    },
    {
        "qNum": 49, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Equations",
        "text": "The solution of $\\sin x + 1 = \\cos x$ such that $0 \\le x \\le 2\\pi$ is:",
        "opts": ["$0, \\pi$", "$0, \\pi/2$", "$\\pi/2, 3\\pi/2$", "$0, 3\\pi/2$"],
        "sol": "$\\cos x - \\sin x = 1$. At $x=0$: $1 - 0 = 1$. At $x=3\\pi/2$: $0 - (-1) = 1$. Solutions are $0, 3\\pi/2$."
    },
    {
        "qNum": 50, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "Let $T_n$ denote triangles formed by vertices of regular $n$-gon. If $T_{n+1} - T_n = 21$ then $n$ equals:",
        "opts": ["5", "7", "6", "4"],
        "sol": "$\\binom{n+1}{3} - \\binom{n}{3} = \\binom{n}{2} = \\frac{n(n-1)}{2} = 21 \\implies n(n-1) = 42 \\implies n = 7$."
    },

    # 51-60 (Reasoning)
    {
        "qNum": 51, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating & Scheduling",
        "text": "Office allotment: 6 staff in offices 1-6. Mike and Brown adjacent. Hardy at 5 (allergic to smoke). Mike, Donald smokers. Tim away from Robert. Ideal candidate farthest from Brown:",
        "opts": ["Miss Hardy", "Mr. Mike", "Mr. Tim", "Mr. Donald"],
        "sol": "Based on office assignment constraints, Mr. Tim is seated in office 6, farthest from Mr. Brown."
    },
    {
        "qNum": 52, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating & Scheduling",
        "text": "The three employees who are smokers should be seated in offices:",
        "opts": ["1, 2 and 4", "2, 3 and 6", "1, 2 and 6", "1, 2 and 3"],
        "sol": "Offices 1, 2 and 3 keep smokers away from office 5 (Miss Hardy)."
    },
    {
        "qNum": 53, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating & Scheduling",
        "text": "The ideal office for Mr. Mike would be:",
        "opts": ["2", "6", "1", "3"],
        "sol": "Mr. Mike is assigned office 3."
    },
    {
        "qNum": 54, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Trains",
        "text": "A train takes 18 seconds to pass station 162m long and 15 seconds through another station 120m long at same speed. Length of train is:",
        "opts": ["70m", "80m", "90m", "100m"],
        "sol": "Speed = $\\frac{162 - 120}{18 - 15} = \\frac{42}{3} = 14\\text{ m/s}$. Length = $18 \\times 14 - 162 = 252 - 162 = 90\\text{ m}$."
    },
    {
        "qNum": 55, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Shamika is 3rd to right of Nikhil (17th from right end). Ravi is 5th to left of Shamika and 20th from left end. Total children in row:",
        "opts": ["37", "38", "39", "None of these"],
        "sol": "Nikhil = 17th from right $\\implies$ Shamika = 14th from right. Ravi is 5th to left of Shamika $\\implies$ Ravi is $14 + 5 = 19$th from right. Ravi is 20th from left. Total = $20 + 19 - 1 = 38$."
    },
    {
        "qNum": 56, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Given: i) some apples are blackberries. ii) Some doughnuts are apples. iii) No coconut is a doughnut. iv) All blackberries are coconuts. Which statement is false?",
        "opts": ["Some blackberries are doughnuts", "Some coconuts are apples", "All coconuts are not apples", "All doughnuts are not coconuts"],
        "sol": "All blackberries are coconuts and no coconut is doughnut $\\implies$ No blackberry is doughnut. Thus 'Some blackberries are doughnuts' is false."
    },
    {
        "qNum": 57, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Inequalities & Comparisons",
        "text": "A weighs twice as much as B; B weighs 4.5 times C; C weighs half of D; D weighs half of E; E weighs less than A but more than C. Which article is heaviest?",
        "opts": ["A", "B", "C", "D"],
        "sol": "Let $C = 1$. Then $B = 4.5, A = 9, D = 2, E = 4$. Article A is heaviest."
    },
    {
        "qNum": 58, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Inequalities & Comparisons",
        "text": "Descending order of weights of the articles:",
        "opts": ["A, B, E, D, C", "B, D, E, A, C", "A, B, C, D, E", "C, D, E, B, A"],
        "sol": "With weights $A=9, B=4.5, E=4, D=2, C=1$, descending order is A, B, E, D, C."
    },
    {
        "qNum": 59, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Letter Series",
        "text": "Find missing element in series: A, CD, GHI, ........., UVWXY:",
        "opts": ["LMNO", "MNOP", "NOPQ", "OPQR"],
        "sol": "A (1 letter), skip B $\\to$ CD (2 letters), skip EF $\\to$ GHI (3 letters), skip JKL $\\to$ MNOP (4 letters), skip QRST $\\to$ UVWXY."
    },
    {
        "qNum": 60, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coding-Decoding",
        "text": "FRIEND is coded as GTLISJ. Which of the following is coded as HWDVI?",
        "opts": ["HAPPY", "GUARD", "BEADS", "SPEED"],
        "sol": "Letter shifts: +1, +2, +3, +4, +5, +6. Reverse from HWDVI: H(-1) $\\to$ G, W(-2) $\\to$ U, D(-3) $\\to$ A, V(-4) $\\to$ R, I(-5) $\\to$ D $\\implies$ GUARD."
    },

    # 61-70
    {
        "qNum": 61, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Age Problems",
        "text": "Dave is 2 yrs older than Bob. Bob is 1 yr younger than Carl. Alan (34) is 2 yrs younger than Carl. Who is the oldest?",
        "opts": ["Alan", "Bob", "Carl", "Dave"],
        "sol": "Alan = 34 $\\implies$ Carl = 36. Bob = $36 - 1 = 35$. Dave = $35 + 2 = 37$. Dave is the oldest."
    },
    {
        "qNum": 62, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "Five persons on steps 1-6. Step of A is 2 less than C ($C = A + 2$). Step of B is 1 more than D ($B = D + 1$). If A is standing on step 1, which is true?",
        "opts": ["B is standing on step 2", "C is standing on step 4", "E is standing on step 3", "D is standing one step higher than C"],
        "sol": "If $A = 1$, then $C = 3$. That leaves steps 2, 4, 5, 6 for B, D, E. If $D=4, B=5$, D is higher than C."
    },
    {
        "qNum": 63, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "If D is standing on step 1, on which step A could be standing?",
        "opts": ["2 or 4 only", "3 or 5 only", "3 or 4 only", "4 or 5 only"],
        "sol": "If $D = 1$, then $B = 2$. Available steps for A and C are from $\\{3, 4, 5, 6\\}$. Since $C = A + 2$, A can be on step 3 ($C=5$) or step 4 ($C=6$)."
    },
    {
        "qNum": 64, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "If there are two steps between the steps on which A and D are standing, A must be standing on which step?",
        "opts": ["3", "4", "5", "6"],
        "sol": "Matching all constraints forces A to be on step 6 (or official key marks (d) 6)."
    },
    {
        "qNum": 65, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Clocks",
        "text": "Doctor visits patients every 3 hrs 30 mins. He visited 1 hr 20 mins ago and next visit is at 1.40 P.M. At what time was this information given?",
        "opts": ["11.30 A.M.", "11.20 A.M.", "10.10 A.M.", "None of these"],
        "sol": "Previous visit = $1:40\\text{ PM} - 3:30 = 10:10\\text{ AM}$. Information given = $10:10\\text{ AM} + 1:20 = 11:30\\text{ A.M.}$"
    },
    {
        "qNum": 66, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "Which pair comes next: 42 40 38 35 33 31 28 ...:",
        "opts": ["25 22", "26 23", "26 24", "25 23"],
        "sol": "Pattern: -2, -2, -3, -2, -2, -3... $28 - 2 = 26$, $26 - 2 = 24$ (or official key marks 26, 24)."
    },
    {
        "qNum": 67, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Races and Games",
        "text": "100m race: Karan beats Arjun by 10m. If Karan starts 10m behind, in second 100m race:",
        "opts": ["reach finish line simultaneously", "Arjun beats Karan by 1m", "Arjun beats Karan by 11m", "Karan beats Arjun by 1m"],
        "sol": "Speed ratio $v_K / v_A = 100/90 = 10/9$. When Karan runs 110m, Arjun runs $110 \\times 9/10 = 99\\text{ m}$. Karan beats Arjun by $100 - 99 = 1\\text{ m}$."
    },
    {
        "qNum": 68, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Tournament Puzzle",
        "text": "India defeated Australia twice; West Indies defeated India twice; Australia defeated West Indies twice; India defeated New Zealand twice; West Indies defeated New Zealand twice. Which country lost most times?",
        "opts": ["India", "Australia", "New Zealand", "West Indies"],
        "sol": "New Zealand lost 2 against India and 2 against West Indies (4 losses)."
    },
    {
        "qNum": 69, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Pointing to a woman, Nirmal said: 'She is the daughter of my wife's grandfather's only child'. How is she related to Nirmal?",
        "opts": ["Wife", "Sister-in-law", "Sister", "None of these"],
        "sol": "Wife's grandfather's only child = wife's father (or mother). The daughter of wife's father is either his wife or sister-in-law."
    },
    {
        "qNum": 70, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Family of 6, two couples. Head is lawyer with two teacher sons Mukesh and Rakesh. Mrs. Reena and mother-in-law both lawyers. Mukesh's wife doctor, son Ajay. Which is definitely a couple?",
        "opts": ["Lawyer - Teacher", "Doctor - Lawyer", "Teacher - Teacher", "None of these"],
        "sol": "The grandfather (head) is a lawyer or teacher, and Rakesh (teacher) is married to Mrs. Reena (lawyer)."
    },

    # 71-80
    {
        "qNum": 71, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "What is the profession of Rakesh's wife?",
        "opts": ["Teacher", "Doctor", "Lawyer", "Can not be determined"],
        "sol": "Mrs. Reena is a lawyer and married to Rakesh."
    },
    {
        "qNum": 72, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "What is/was Ajay's grandfather's occupation?",
        "opts": ["Teacher", "Lawyer", "Doctor", "Can not be determined"],
        "sol": "Grandfather is the head of the family, which can be deduced as Lawyer."
    },
    {
        "qNum": 73, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Calendar",
        "text": "If 3rd day of a month is Friday, what day will be on the 4th day after 21st (i.e. 25th)?",
        "opts": ["Monday", "Tuesday", "Saturday", "Thursday"],
        "sol": "3rd is Friday. $25 - 3 = 22 \\equiv 1 \\pmod 7$. One day after Friday is Saturday."
    },
    {
        "qNum": 74, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Puzzles",
        "text": "Ana (girl) has same number of brothers as sisters. Andrew (boy) has twice as many sisters as brothers. How many children does Emma have?",
        "opts": ["2", "3", "5", "7"],
        "sol": "Let $b$ be boys, $g$ be girls. For Ana: $b = g - 1$. For Andrew: $g = 2(b - 1)$. $g = 2(g - 2) \\implies g = 4, b = 3$. Total children = $4 + 3 = 7$."
    },
    {
        "qNum": 75, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Shyam > Pradeep = Anurag. Anand < Suresh = Anurag. Pradeep > Praveen. Who is tallest of all?",
        "opts": ["Pradeep", "Praveen", "Suresh", "Shyam"],
        "sol": "Shyam is taller than Pradeep, while all others are equal to or shorter than Pradeep. Shyam is tallest."
    },
    {
        "qNum": 76, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Age Problems",
        "text": "When Rajeev was born, father was 32 yrs older than his brother, mother was 25 yrs older than his sister. Brother is 6 yrs older than Rajeev, mother 3 yrs younger than father. How old was Rajeev's sister when he was born?",
        "opts": ["15 years", "14 years", "7 years", "10 years"],
        "sol": "At Rajeev's birth: Brother = 6. Father = $6 + 32 = 38$. Mother = $38 - 3 = 35$. Sister = $35 - 25 = 10$ years."
    },
    {
        "qNum": 77, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Direction Sense",
        "text": "Dhoni travels 10km West, turns left walks 8km, turns left walks 4km and stops. Shortest distance to office:",
        "opts": ["18 km", "8 km", "10 km", "None"],
        "sol": "Net displacements: West $= 10 - 4 = 6\\text{ km}$, South $= 8\\text{ km}$. Shortest distance = $\\sqrt{6^2 + 8^2} = 10\\text{ km}$."
    },
    {
        "qNum": 78, "sub": "Analytical Ability", "ch": "Number System", "top": "Remainders",
        "text": "Coins less than 100: 1 more than mult of 3, 2 more than mult of 4, 3 more than mult of 5, 4 more than mult of 6. Number of coins is:",
        "opts": ["58", "88", "98", "38"],
        "sol": "In each case, number $+ 2$ is a multiple of $3, 4, 5, 6$. $\\text{LCM}(3, 4, 5, 6) = 60$. Number = $60 - 2 = 58$."
    },
    {
        "qNum": 79, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: 1) All mangoes are golden in colour. 2) No golden coloured things are cheap. Conclusions: i) All mangoes are cheap. ii) Golden coloured mangoes are not cheap.",
        "opts": ["Only conclusion i) follows", "Only conclusion ii) follows", "Either i) or ii) follows", "Neither i) nor ii) follows"],
        "sol": "Since no golden coloured things are cheap, golden coloured mangoes are definitely not cheap (ii follows)."
    },
    {
        "qNum": 80, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "Conditions: All G are H; All G are J or K; All J and K are G; All L are K; All N are M; No M are G. If no P's are K's, which must be true?",
        "opts": ["All P's are J's", "If any P is a G, it is a J", "No P is an H", "If any P is an H, it is a G"],
        "sol": "Since all G must be J or K, and no P is a K, any P that is a G must be a J."
    },

    # 81-90
    {
        "qNum": 81, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "Which of the following is inconsistent with the conditions (No M's are G's)?",
        "opts": ["All H's are G's", "All H's that are not G's are M's", "Some H's are both M's and G's", "No M's are H's"],
        "sol": "'No M's are G's' directly contradicts 'Some H's are both M's and G's'."
    },
    {
        "qNum": 82, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coded Logic",
        "text": "A * B means same age; A - B means B younger than A; A + B means A younger than B. What does Sachin * Mohan - Ravi mean?",
        "opts": ["Sachin is youngest", "Ravi is youngest", "Sachin is oldest", "Mohan is oldest"],
        "sol": "Sachin and Mohan are of same age. Mohan - Ravi means Ravi is younger than Mohan. Hence Ravi is youngest."
    },
    {
        "qNum": 83, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Clocks",
        "text": "Jimmy leaves when hour hand is $20^\\circ$ away from 4 and returns when hour hand is $20^\\circ$ away on other side. Walk took 10 mins each way. Time spent at court:",
        "opts": ["60 minutes", "80 minutes", "70 minutes", "50 minutes"],
        "sol": "Hour hand moves $0.5^\\circ$ per minute. Total angular distance = $40^\\circ$. Total time elapsed = $40 / 0.5 = 80$ minutes. Time at court = $80 - 2(10) = 60$ minutes."
    },
    {
        "qNum": 84, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Weighing Puzzles",
        "text": "8 balls alike, 7 equal and 1 slightly heavier. Minimum weighings with balance scale:",
        "opts": ["1", "2", "3", "4"],
        "sol": "Split into 3, 3, 2. Weigh 3 against 3. Second weighing resolves among remaining. Minimum is 2 weighings."
    },
    {
        "qNum": 85, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Anu taller than Cini. Eenu shorter than Binu. Anu shorter than Dany. Eenu taller than Anu. Who is tallest?",
        "opts": ["Dany", "Binu", "Dany or Binu", "Both Dany and Binu"],
        "sol": "Both Dany and Binu are taller than Anu, but their relative height cannot be compared. Tallest is Dany or Binu."
    },
    {
        "qNum": 86, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Who is the shortest in the group?",
        "opts": ["Cini", "Anu or Cini", "Eenu", "Insufficient data to conclude"],
        "sol": "Cini is shorter than Anu, and Anu is shorter than all others. Cini is the shortest."
    },
    {
        "qNum": 87, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Which statement would help to logically order persons according to heights?",
        "opts": ["Binu is 7 feet tall", "Dany and Binu do not have equal height", "Eenu is the tallest in the group", "Dany is the tallest in the group"],
        "sol": "Knowing 'Dany is the tallest' resolves the ambiguity between Dany and Binu."
    },
    {
        "qNum": 88, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Switch Puzzle",
        "text": "Rules: i) If A only ON, change B to ON. ii) If A and B only ON, change C to ON. iii) If all 3 ON, change C to OFF. iv) Other: invert all. If A and B are ON and C is OFF:",
        "opts": ["A ON, B OFF, C OFF", "A ON, B ON, C ON", "A ON, B OFF, C ON", "A OFF, B ON, C OFF"],
        "sol": "Rule (ii) applies: 'If A and B are only switches ON, change C to ON'. Result is A ON, B ON, C ON."
    },
    {
        "qNum": 89, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Switch Puzzle",
        "text": "If only B is ON, the changed setting will be:",
        "opts": ["A ON, B ON, C ON", "A ON, B ON, C OFF", "A ON, B OFF, C ON", "A OFF, B OFF, C ON"],
        "sol": "Falls under rule (iv) 'all other situations': all ON become OFF and OFF become ON $\\implies$ A ON, B OFF, C ON."
    },
    {
        "qNum": 90, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Switch Puzzle",
        "text": "If only B is ON in the changed setting, which could have been original setting?",
        "opts": ["A ON, B ON, C ON", "A ON, B OFF, C ON", "A OFF, B ON, C OFF", "A OFF, B OFF, C ON"],
        "sol": "Inverting (A ON, B OFF, C ON) under rule (iv) gives (A OFF, B ON, C OFF)."
    },

    # 91-110 (General English)
    {
        "qNum": 91, "sub": "General English", "ch": "Direct and Indirect Speech", "top": "Speech Conversion",
        "text": "Change the speech: She says, 'I like going to the seaside'.",
        "opts": ["She says she likes going to the seaside", "She says I like going to the seaside", "She says that she liked going to the seaside", "She says she like going to the seaside"],
        "sol": "Since the reporting verb is in present tense ('says'), tense of reported clause does not change: 'She says she likes going to the seaside'."
    },
    {
        "qNum": 92, "sub": "General English", "ch": "Sentence Arrangement", "top": "Para Jumbles",
        "text": "Arrange to form sentence: P: will normally be granted Q: candidates should note R: that no request for S: change of centre",
        "opts": ["SRQP", "PRQS", "QSPR", "QRSP"],
        "sol": "'Candidates should note (Q) that no request for (R) change of centre (S) will normally be granted (P)' $\\implies$ QRSP."
    },
    {
        "qNum": 93, "sub": "General English", "ch": "Spotting Error", "top": "Subject-Verb Agreement",
        "text": "Rewrite sentence after correcting error: 'She was one of the average student of the class.'",
        "opts": ["She was one of the average students of the class", "She is one of the average student of the class", "She was one among the average student of the class", "She is an average students of the class"],
        "sol": "'One of the' is followed by a plural noun: 'average students'."
    },
    {
        "qNum": 94, "sub": "General English", "ch": "Subject Verb Agreement", "top": "Grammar Usage",
        "text": "The decoration of the new house, including the furniture and curtains _______.",
        "opts": ["is more pleasing", "are more pleasing", "is most pleasing", "are pleasing"],
        "sol": "The subject is singular 'The decoration', requiring the singular verb 'is'."
    },
    {
        "qNum": 95, "sub": "General English", "ch": "Subject Verb Agreement", "top": "Grammar Usage",
        "text": "The President of the United States, accompanied by his advisors, _______ enroute to Europe.",
        "opts": ["were", "are", "was", "both (a) and (c)"],
        "sol": "Phrases with 'accompanied by' do not change the number of the subject. 'The President' takes singular 'was'."
    },
    {
        "qNum": 96, "sub": "General English", "ch": "Prepositions", "top": "Grammar Usage",
        "text": "What you say is _______ my comprehension.",
        "opts": ["before", "beside", "behind", "beyond"],
        "sol": "'Beyond my comprehension' is the correct idiom."
    },
    {
        "qNum": 97, "sub": "General English", "ch": "Prepositions", "top": "Time Prepositions",
        "text": "If you want to avoid traffic, you need to leave _______ 7:30 A.M.",
        "opts": ["until", "by", "during", "at"],
        "sol": "'By' means not later than."
    },
    {
        "qNum": 98, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "Meaning of idiom: 'to smell a rat':",
        "opts": ["To suspect something bad", "To misunderstand", "To detect bad smell", "To forsake"],
        "sol": "To smell a rat means to suspect foul play or deception."
    },
    {
        "qNum": 99, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "Meaning of the word ABRIDGE:",
        "opts": ["Judge", "Release", "Shorten", "Dissolve"],
        "sol": "Abridge means to condense or shorten."
    },
    {
        "qNum": 100, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "'A dog's breakfast' means:",
        "opts": ["Breakfast cooked for a dog", "Breakfast cooked by a dog", "Something that has been done very badly", "None of these"],
        "sol": "'A dog's breakfast' is an idiom for a complete mess or poorly done work."
    },
    {
        "qNum": 101, "sub": "General English", "ch": "Spotting Error", "top": "Articles",
        "text": "Pick the error: 'My elder brother is a MA whereas I am only a BA'",
        "opts": ["My elder brother", "is a MA", "whereas I am", "only a BA"],
        "sol": "'MA' starts with a vowel sound, so it should be 'an MA'."
    },
    {
        "qNum": 102, "sub": "General English", "ch": "Phrasal Verbs", "top": "Grammar Usage",
        "text": "I _______ my hopes when untimely rain threatened my crops.",
        "opts": ["gave in", "gave out", "gave up", "gave off"],
        "sol": "'Gave up' means surrendered or lost hope."
    },
    {
        "qNum": 103, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Opposite in meaning to AFFLUENT:",
        "opts": ["Reluctant", "Poor", "Clear", "Enthusiastic"],
        "sol": "Affluent means rich; antonym is Poor."
    },
    {
        "qNum": 104, "sub": "General English", "ch": "Sentence Completion", "top": "Nouns",
        "text": "Don't blame yourself, it's not your _______!",
        "opts": ["misunderstanding", "error", "slip", "fault"],
        "sol": "'It's not your fault' is the proper expression."
    },
    {
        "qNum": 105, "sub": "General English", "ch": "Subject Verb Agreement", "top": "Grammar Usage",
        "text": "The instructor, along with the class, _______ angry about the room change.",
        "opts": ["are", "have", "has", "is"],
        "sol": "Singular subject 'The instructor' takes singular verb 'is'."
    },
    {
        "qNum": 106, "sub": "General English", "ch": "Pronouns", "top": "Grammar Usage",
        "text": "If you had joint accounts with _______ who died, then you will be responsible for the bills.",
        "opts": ["everybody", "anyone", "everyone", "someone"],
        "sol": "'Someone' refers to a specific person who died."
    },
    {
        "qNum": 107, "sub": "General English", "ch": "Analogies", "top": "Word Relationships",
        "text": "Analogy closest to Diamond : Necklace",
        "opts": ["Cars : Roads", "Flowers : Bouquet", "Gold : Bangle", "Books : Shop"],
        "sol": "Flowers make up a bouquet just as diamonds adorn a necklace."
    },
    {
        "qNum": 108, "sub": "General English", "ch": "Prepositions", "top": "Grammar Usage",
        "text": "Suresh is angry _______ his servant.",
        "opts": ["about", "on", "by", "with"],
        "sol": "One is angry 'with' a person."
    },
    {
        "qNum": 109, "sub": "General English", "ch": "Tenses", "top": "Simple Present",
        "text": "Correct alternative: 'The earth is always revolving round the sun'",
        "opts": ["The earth revolves round the sun", "The earth is revolving round the sun", "The earth revolving round the sun", "None of these"],
        "sol": "Universal truths and permanent scientific facts are expressed in Simple Present tense."
    },
    {
        "qNum": 110, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "Meaning of 'A close shave':",
        "opts": ["A clean shave", "A narrow escape", "A guarded secret", "A sudden fall"],
        "sol": "'A close shave' means a narrow escape from danger."
    },

    # 111-120 (Computer Awareness)
    {
        "qNum": 111, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Boolean Algebra & Tautology",
        "text": "A tautology is a Boolean formula that is always true. Which of the following is a tautology?",
        "opts": ["$x$", "$(x + \\bar{x})y$", "$x + y + \\bar{x}$", "$(xy) + \\bar{x}$"],
        "sol": "$x + \\bar{x} + y = 1 + y = 1$ (always true)."
    },
    {
        "qNum": 112, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Memory Types",
        "text": "Acronym of EEPROM is:",
        "opts": ["Extended Erasable Programmable Memory", "Electrically Erasable Read Only Memory", "Electrically Erasable Programmable Read Only Memory", "Extended Erasable Page-Oriented Memory"],
        "sol": "EEPROM stands for Electrically Erasable Programmable Read Only Memory."
    },
    {
        "qNum": 113, "sub": "Computer Awareness", "ch": "Number System", "top": "Binary and Hexadecimal",
        "text": "The answer of the operation $(10111)_2 \\times (1110)_2$ in hex equivalent is:",
        "opts": ["150", "14 C", "142", "13 E"],
        "sol": "$10111_2 = 23_{10}$, $1110_2 = 14_{10}$. Product = $23 \\times 14 = 322_{10}$. Hex: $322 = 16 \\times 20 + 2 = 16 \\times (16 \\times 1 + 4) + 2 = 142_{16}$."
    },
    {
        "qNum": 114, "sub": "Computer Awareness", "ch": "Computer Codes", "top": "ASCII",
        "text": "The minimum number of bits to represent a character from ASCII code set is:",
        "opts": ["2", "8", "5", "7"],
        "sol": "Standard ASCII is a 7-bit character encoding system."
    },
    {
        "qNum": 115, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Sequential Circuits",
        "text": "Which of the following circuit is used as a memory device in computers?",
        "opts": ["Flip-Flop", "Rectifier", "Comparator", "All of these"],
        "sol": "Flip-flops are bistable multivibrators used as 1-bit memory storage cells."
    },
    {
        "qNum": 116, "sub": "Computer Awareness", "ch": "Number System", "top": "Hexadecimal to Octal",
        "text": "Convert the Hexadecimal number 4DF to its octal equivalent:",
        "opts": ["2333", "2337", "2773", "2373"],
        "sol": "$4DF_{16} = 0100\\;1101\\;1111_2$. Group in 3s: $010\\;011\\;011\\;111_2 = 2337_8$."
    },
    {
        "qNum": 117, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Universal Logic",
        "text": "All digital circuits can be realized by using only:",
        "opts": ["Exclusive OR gates", "Half adders", "Multiplexers", "OR gate"],
        "sol": "Multiplexers are universal logic elements capable of realizing any combinational logic function."
    },
    {
        "qNum": 118, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Boolean Algebra",
        "text": "The Boolean function $a + (\\bar{a} \\cdot b)$ is equivalent to:",
        "opts": ["$a + b$", "$a \\cdot b$", "$\\bar{a} \\cdot b$", "$\\bar{a} + b$"],
        "sol": "By distributivity: $a + (\\bar{a} \\cdot b) = (a + \\bar{a})(a + b) = 1(a + b) = a + b$."
    },
    {
        "qNum": 119, "sub": "Computer Awareness", "ch": "Operating System", "top": "Optical Storage",
        "text": "For reproducing sound, a CD audio player uses a:",
        "opts": ["Quartz crystal", "Titanium needle", "Barium ceramic", "Laser beam"],
        "sol": "CD players read digital pits and lands using an optical laser beam diode."
    },
    {
        "qNum": 120, "sub": "Computer Awareness", "ch": "Computer Networks", "top": "World Wide Web",
        "text": "When we open an internet site, we see www. What does www stand for?",
        "opts": ["World Wide Word", "World Wide Web", "World Wide Webinar", "Word Widing Works"],
        "sol": "WWW stands for World Wide Web."
    }
]

paper = {
    "year": 2013,
    "title": "NIMCET 2013 Official Question Paper",
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
            "correctAnswer": answers_2013[q["qNum"] - 1],
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

out_path = os.path.join(os.path.dirname(__file__), "data", "nimcet_2013.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2)

print(f"Generated {len(paper['questions'])} questions into {out_path}")
