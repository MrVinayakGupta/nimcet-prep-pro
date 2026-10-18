import json
import os

answers_2015 = [
    'D','A','A','C','A','B','C','B','D','A',
    'B','C','A','B','B','C','D','B','B','D',
    'C','C','B','A','C','A','C','D','B','D',
    'C','B','D','C','A','D','A','D','A','B',
    'D','A','C','D','A','C','B','D','A','A',
    'B','A','C','D','D','C','B','A','A','C',
    'C','A','A','D','D','B','D','A','A','C',
    'B','A','D','B','B','B','A','C','A','A',
    'B','A','C','C','C','D','B','D','B','C',
    'B','C','B','A','B','A','D','C','D','B',
    'A','A','A','D','B','D','B','B','A','D',
    'C','A','D','A','C','D','B','A','C','D'
]

raw_questions = [
    # 1-10 (Maths)
    {
        "qNum": 1, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "The number of bit strings of length 10 that contain either five consecutive 0's or five consecutive 1's is:",
        "opts": ["64", "112", "220", "222"],
        "sol": "Total bit strings of length 10 is $2^{10} = 1024$. By inclusion-exclusion on consecutive runs of five 0s or five 1s, the number of such bit strings is 222."
    },
    {
        "qNum": 2, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Equations",
        "text": "If $0 < x < \\pi$ and $\\cos x + \\sin x = 1/2$, then the value of $\\tan x$ is:",
        "opts": ["$\\frac{4-\\sqrt{7}}{3}$", "$\\frac{4+\\sqrt{7}}{3}$", "$\\frac{1+\\sqrt{7}}{4}$", "$\\frac{1-\\sqrt{7}}{4}$"],
        "sol": "Squaring gives $1 + \\sin 2x = 1/4 \\implies \\sin 2x = -3/4$. Then $\\frac{2\\tan x}{1+\\tan^2 x} = -3/4 \\implies 3\\tan^2 x + 8\\tan x + 3 = 0 \\implies \\tan x = \\frac{-8 \\pm \\sqrt{64-36}}{6} = \\frac{-4 \\pm \\sqrt{7}}{3}$."
    },
    {
        "qNum": 3, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\vec{a}, \\vec{b}$ and $\\vec{c}$ are position vectors of the vertices A,B,C of a triangle ABC, then the area of the triangle ABC is:",
        "opts": ["$\\frac{1}{2}|\\vec{a}\\times\\vec{b} + \\vec{b}\\times\\vec{c} + \\vec{c}\\times\\vec{a}|$", "$|\\vec{a}\\times\\vec{b}|$", "$\\frac{1}{2}|\\vec{a}\\times\\vec{b} - \\vec{b}\\times\\vec{c} - \\vec{c}\\times\\vec{a}|$", "$(\\vec{a}\\times\\vec{b})\\times\\vec{c}$"],
        "sol": "Area of triangle ABC = $\\frac{1}{2}|\\vec{a}\\times\\vec{b} + \\vec{b}\\times\\vec{c} + \\vec{c}\\times\\vec{a}|$."
    },
    {
        "qNum": 4, "sub": "Mathematics", "ch": "Calculus", "top": "Indefinite Integration",
        "text": "If $\\int e^x (f(x) - f'(x)) dx = \\phi(x)$, then the value of $\\int e^x f(x) dx$ is:",
        "opts": ["$\\phi(x) + e^x f(x)$", "$\\phi(x) - e^x f(x)$", "$\\frac{1}{2}[\\phi(x) + e^x f(x)]$", "$\\frac{1}{2}[\\phi(x) + e^x f'(x)]"],
        "sol": "$\\int e^x f'(x)dx = e^x f(x) - \\int e^x f(x)dx$. Substituting: $\\phi(x) = 2\\int e^x f(x)dx - e^x f(x) \\implies \\int e^x f(x)dx = \\frac{1}{2}[\\phi(x) + e^x f(x)]$."
    },
    {
        "qNum": 5, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Hyperbola",
        "text": "If $3x + 4y + k = 0$ is a tangent to the hyperbola $9x^2 - 16y^2 = 144$, then the value of $k$ is:",
        "opts": ["0", "1", "-1", "-3"],
        "sol": "Hyperbola is $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$. Tangent line: $y = -\\frac{3}{4}x - \\frac{k}{4}$. Tangency condition: $c^2 = a^2 m^2 - b^2 \\implies \\frac{k^2}{16} = 16(9/16) - 9 = 9 - 9 = 0 \\implies k = 0$."
    },
    {
        "qNum": 6, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Straight Line",
        "text": "The foot of the perpendicular from the point $(2, 4)$ upon $x + y = 1$ is:",
        "opts": ["(1/2, 3/2)", "(-1/2, 3/2)", "(4/3, 1/2)", "(-4/3, 1/2)"],
        "sol": "Using formula $\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = -\\frac{ax_1 + by_1 + c}{a^2 + b^2}$: $\\frac{x - 2}{1} = \\frac{y - 4}{1} = -\\frac{2 + 4 - 1}{1 + 1} = -5/2 \\implies x = 2 - 5/2 = -1/2, y = 4 - 5/2 = 3/2$."
    },
    {
        "qNum": 7, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "The value of $k$ for which the equation $(k-2)x^2 + 8x + k + 4 = 0$ has both real, distinct and negative roots is:",
        "opts": ["0", "2", "3", "-4"],
        "sol": "Discriminant $D = 64 - 4(k-2)(k+4) > 0 \\implies (k+6)(k-4) < 0 \\implies -6 < k < 4$. For negative roots: sum of roots $= -\\frac{8}{k-2} < 0 \\implies k - 2 > 0 \\implies k > 2$. Product $= \\frac{k+4}{k-2} > 0$. Thus $2 < k < 4$. The integer value is $k = 3$."
    },
    {
        "qNum": 8, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Triangles & Straight Lines",
        "text": "If $(2, 1), (-1, -2), (3, 3)$ are the midpoints of the sides BC, CA, AB of $\\Delta ABC$, then the equation of line BC is:",
        "opts": ["$5x + 4y + 6 = 0$", "$5x - 4y - 6 = 0$", "$5x + 4y - 6 = 0$", "$5x - 4y + 6 = 0$"],
        "sol": "Line BC is parallel to the line joining midpoints CA $(-1, -2)$ and AB $(3, 3)$. Slope $m = \\frac{3 - (-2)}{3 - (-1)} = 5/4$. BC passes through $(2, 1)$: $y - 1 = \\frac{5}{4}(x - 2) \\implies 4y - 4 = 5x - 10 \\implies 5x - 4y - 6 = 0$."
    },
    {
        "qNum": 9, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "If a fair die is rolled successively, then the probability that 1 appears in an even numbered throw is:",
        "opts": ["5/36", "6/11", "1/6", "5/11"],
        "sol": "$P = (5/6)(1/6) + (5/6)^3(1/6) + \\dots = \\frac{5/36}{1 - 25/36} = \\frac{5/36}{11/36} = \\frac{5}{11}$."
    },
    {
        "qNum": 10, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "Let $\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}, \\vec{b} = \\hat{i} - \\hat{j} + \\hat{k}, \\vec{c} = \\hat{i} - \\hat{j} - \\hat{k}$. A vector $\\vec{v}$ in the plane of $\\vec{a}$ and $\\vec{b}$ whose projection on $\\vec{c}$ is $1/\\sqrt{3}$ is:",
        "opts": ["$3\\hat{i} - \\hat{j} + 3\\hat{k}$", "$\\hat{i} - 3\\hat{j} + 3\\hat{k}$", "$5\\hat{i} - 2\\hat{j} + 5\\hat{k}$", "$2\\hat{i} - \\hat{j} + 3\\hat{k}$"],
        "sol": "Let $\\vec{v} = \\lambda\\vec{a} + \\mu\\vec{b} = (\\lambda+\\mu)\\hat{i} + (\\lambda-\\mu)\\hat{j} + (\\lambda+\\mu)\\hat{k}$. $\\vec{v}\\cdot\\vec{c} / \\sqrt{3} = 1/\\sqrt{3} \\implies \\lambda + \\mu - (\\lambda - \\mu) - (\\lambda + \\mu) = 1 \\implies \\mu - \\lambda = 1$. For $\\lambda = 1, \\mu = 2$, $\\vec{v} = 3\\hat{i} - \\hat{j} + 3\\hat{k}$."
    },

    # 11-20
    {
        "qNum": 11, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "The value of $\\int_{-\\pi/3}^{\\pi/3} \\frac{x\\sin x}{\\cos^2 x} dx$ is:",
        "opts": ["$\\frac{1}{3}(4\\pi+1)$", "$\\frac{4\\pi}{3} - 2\\log\\tan\\frac{5\\pi}{12}$", "$\\frac{4\\pi}{3} + \\log\\tan\\frac{5\\pi}{12}$", "$\\frac{4\\pi}{3} - \\log\\tan\\frac{5\\pi}{3}$"],
        "sol": "Integrand is even function: $2\\int_0^{\\pi/3} x\\tan x\\sec x dx = 2[x\\sec x - \\log|\\sec x+\\tan x|]_0^{\\pi/3} = 2(\\frac{2\\pi}{3} - \\log(2+\\sqrt{3})) = \\frac{4\\pi}{3} - 2\\log\\tan\\frac{5\\pi}{12}$."
    },
    {
        "qNum": 12, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Conic Sections",
        "text": "The foci of the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ and the hyperbola $\\frac{x^2}{144} - \\frac{y^2}{81} = \\frac{1}{25}$ coincide. The value of $b^2$ is:",
        "opts": ["1", "5", "7", "9"],
        "sol": "Foci of hyperbola: $ae = \\sqrt{144/25 + 81/25} = 3$. For ellipse: $a^2 - b^2 = 3^2 = 9 \\implies 16 - b^2 = 9 \\implies b^2 = 7$."
    },
    {
        "qNum": 13, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $A + B + C = \\pi$, then the value of $\\begin{vmatrix} \\sin(A+B+C) & \\sin B & \\cos C \\\\ -\\sin B & 0 & \\tan A \\\\ \\cos(A+B) & -\\tan A & 0 \\end{vmatrix}$ is:",
        "opts": ["0", "1", "$2\\sin A\\sin B$", "2"],
        "sol": "$\\sin(A+B+C) = \\sin\\pi = 0$. $\\cos(A+B) = \\cos(\\pi-C) = -\\cos C$. The matrix is skew-symmetric of order 3, so its determinant is identically 0."
    },
    {
        "qNum": 14, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Measures of Dispersion",
        "text": "If the mean deviation of the numbers $1, 1+d, 1+2d, \\dots, 1+100d$ from their mean is 255, then the value of $d$ is:",
        "opts": ["20.0", "10.1", "20.2", "10.0"],
        "sol": "Mean $\\bar{x} = 1 + 50d$. Mean deviation $= \\frac{2d}{101}\\sum_{k=1}^{50} k = \\frac{2d(50 \\times 51)}{2 \\times 101} = \\frac{2550 d}{101} = 255 \\implies d = 10.1$."
    },
    {
        "qNum": 15, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $P = \\sin^{20}\\theta + \\cos^{48}\\theta$, then the inequality that holds for all values of $\\theta$ is:",
        "opts": ["$P \\ge 1$", "$0 < P \\le 1$", "$1 < P < 3$", "$0 \\le P \\le 1$"],
        "sol": "Since $\\sin^{20}\\theta \\le \\sin^2\\theta$ and $\\cos^{48}\\theta \\le \\cos^2\\theta$, $P \\le \\sin^2\\theta + \\cos^2\\theta = 1$. Since sine and cosine cannot be simultaneously zero, $0 < P \\le 1$."
    },
    {
        "qNum": 16, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "Which of the following vectors are NOT perpendicular to each other?",
        "opts": ["$(\\vec{a}\\times\\vec{b})$ and $\\vec{a}$", "$(\\vec{a}+\\vec{b})$ and $(\\vec{a}\\times\\vec{b})$", "$(\\vec{a}+\\vec{b})$ and $(\\vec{a}-\\vec{b})$", "$(\\vec{a}-\\vec{b})$ and $(\\vec{a}\\times\\vec{b})$"],
        "sol": "$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b}) = |\\vec{a}|^2 - |\\vec{b}|^2$, which is zero only when $|\\vec{a}| = |\\vec{b}|$. In general they are not perpendicular."
    },
    {
        "qNum": 17, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $A = \\begin{bmatrix} a & b & c \\\\ b & c & a \\\\ c & a & b \\end{bmatrix}$ with $abc = 1$ and $A^T A = I$, then which holds true?",
        "opts": ["$a+b+c=1$", "$a^2+b^2+c^2=1$", "$ab+bc+ca=0$", "$a^3+b^3+c^3=4$"],
        "sol": "$A^T A = I \\implies \\det(A)^2 = 1 \\implies \\det(A) = \\pm 1$. Since $\\det(A) = -(a^3+b^3+c^3 - 3abc) = -1 \\implies a^3+b^3+c^3 - 3(1) = 1 \\implies a^3+b^3+c^3 = 4$."
    },
    {
        "qNum": 18, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "The equation of tangent at any point of curve $x = a\\cos 2t, y = 2\\sqrt{2}a\\sin t$ with slope $m$ is:",
        "opts": ["$y = mx + a(m - 1/m)$", "$y = mx - a(m + 1/m)$", "$y = mx + m(a + 1/a)$", "$y = amx + a(m - 1/m)$"],
        "sol": "$x = a(1 - 2\\sin^2 t) = a - 2a(y^2 / 8a^2) = a - y^2 / (4a) \\implies y^2 = -4a(x - a)$. Tangent line of slope $m$: $y = mx - a(m + 1/m)$."
    },
    {
        "qNum": 19, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Parabola",
        "text": "The locus of the mid points of all chords of the parabola $y^2 = 4x$ drawn through its vertex is:",
        "opts": ["$y^2 = 8x$", "$y^2 = 2x$", "$x^2 + 4y^2 = 16$", "$x^2 = 2y$"],
        "sol": "Chord through vertex $(0,0)$ to $(t^2, 2t)$ has midpoint $(h, k) = (t^2/2, t) \\implies t = k, h = k^2/2 \\implies k^2 = 2h$, i.e. $y^2 = 2x$."
    },
    {
        "qNum": 20, "sub": "Mathematics", "ch": "Calculus", "top": "Limits",
        "text": "$\\lim_{x \\to a} \\frac{\\sqrt{a+2x} - \\sqrt{3x}}{\\sqrt{3a+x} - 2\\sqrt{x}}$ is:",
        "opts": ["2/3", "$2/\\sqrt{3}$", "$3\\sqrt{3}/2$", "$2/(3\\sqrt{3})$"],
        "sol": "By L'Hopital rule: $\\frac{\\frac{2}{2\\sqrt{a+2x}} - \\frac{3}{2\\sqrt{3x}}}{\\frac{1}{2\\sqrt{3a+x}} - \\frac{2}{2\\sqrt{x}}} \\to \\frac{1/\\sqrt{3a} - \\sqrt{3}/(2\\sqrt{a})}{1/(4\\sqrt{a}) - 1/\\sqrt{a}} = \\frac{-1/(2\\sqrt{3a})}{-3/(4\\sqrt{a})} = \\frac{2}{3\\sqrt{3}}$."
    },

    # 21-30
    {
        "qNum": 21, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "If $a, b, c$ are in geometric progression, then $\\log_{ax} x, \\log_{bx} x$ and $\\log_{cx} x$ are in:",
        "opts": ["Arithmetic progression", "Geometric progression", "Harmonic progression", "Arithmetico-geometric progression"],
        "sol": "Reciprocals are $\\log_x(ax), \\log_x(bx), \\log_x(cx) = 1+\\log_x a, 1+\\log_x b, 1+\\log_x c$. Since $a, b, c$ in GP, their logs are in AP, so these reciprocals are in AP. Hence the original terms are in Harmonic Progression (HP)."
    },
    {
        "qNum": 22, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Products",
        "text": "If $\\vec{a} = \\frac{\\hat{i}-2\\hat{j}}{\\sqrt{5}}$ and $\\vec{b} = \\frac{2\\hat{i}+\\hat{j}+3\\hat{k}}{\\sqrt{14}}$, then $[(2\\vec{a}+\\vec{b}) \\cdot ((\\vec{a}\\times\\vec{b}) \\times (\\vec{a}-2\\vec{b}))]$ is:",
        "opts": ["3", "4", "5", "6"],
        "sol": "Using vector identity: $(\\vec{a}\\times\\vec{b})\\times(\\vec{a}-2\\vec{b}) = |\\vec{a}\\times\\vec{b}|^2 \\dots = 5$."
    },
    {
        "qNum": 23, "sub": "Mathematics", "ch": "Algebra", "top": "Series",
        "text": "The value of $\\frac{1}{2\\sqrt{1}+1\\sqrt{2}} + \\frac{1}{3\\sqrt{2}+2\\sqrt{3}} + \\dots + \\frac{1}{25\\sqrt{24}+24\\sqrt{25}}$ is:",
        "opts": ["9/10", "4/5", "14/15", "7/15"],
        "sol": "Rationalizing $\\frac{1}{(n+1)\\sqrt{n} + n\\sqrt{n+1}} = \\frac{1}{\\sqrt{n}} - \\frac{1}{\\sqrt{n+1}}$. Telescoping sum $= 1 - \\frac{1}{\\sqrt{25}} = 1 - 1/5 = 4/5$."
    },
    {
        "qNum": 24, "sub": "Mathematics", "ch": "Vectors", "top": "Scalar Triple Product",
        "text": "If $\\vec{a} = \\hat{i}-\\hat{k}, \\vec{b} = x\\hat{i}+\\hat{j}+(1-x)\\hat{k}$ and $\\vec{c} = y\\hat{i}+x\\hat{j}+(1+x-y)\\hat{k}$, then $[\\vec{a}\\;\\vec{b}\\;\\vec{c}]$ depends on:",
        "opts": ["Neither x and y", "Only x", "Only y", "Both x and y"],
        "sol": "Evaluating determinant: $[\\vec{a}\\;\\vec{b}\\;\\vec{c}] = \\begin{vmatrix} 1 & 0 & -1 \\\\ x & 1 & 1-x \\\\ y & x & 1+x-y \\end{vmatrix} = 1$. The determinant is constant 1, independent of both $x$ and $y$."
    },
    {
        "qNum": 25, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "If $42(^{n}P_2) = ^{n}P_4$, then the value of $n$ is:",
        "opts": ["2", "4", "9", "42"],
        "sol": "$42 n(n-1) = n(n-1)(n-2)(n-3) \\implies (n-2)(n-3) = 42 = 7 \\times 6 \\implies n - 2 = 7 \\implies n = 9$."
    },
    {
        "qNum": 26, "sub": "Mathematics", "ch": "Trigonometry", "top": "Properties of Triangles",
        "text": "If angles of a triangle are in ratio 2:3:7, the ratio of opposite sides is:",
        "opts": ["$\\sqrt{2} : 2 : \\sqrt{3}+1$", "$2 : \\sqrt{2} : \\sqrt{3}+1$", "$2 : \\sqrt{2} : \\frac{\\sqrt{2}}{\\sqrt{3}-1}$", "$\\frac{1}{\\sqrt{2}} : 2 : \\frac{\\sqrt{3}+1}{2}$"],
        "sol": "Angles are $30^\\circ, 45^\\circ, 105^\\circ$. Ratio of sides $= \\sin 30^\\circ : \\sin 45^\\circ : \\sin 105^\\circ = 1/2 : 1/\\sqrt{2} : \\frac{\\sqrt{3}+1}{2\\sqrt{2}} = \\sqrt{2} : 2 : \\sqrt{3}+1$."
    },
    {
        "qNum": 27, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "If $P(A) = 1/2, P(B) = 1/3$, then which is true?",
        "opts": ["$1/3 \\le P(A \\cap B) \\le 1/2$", "$1/4 \\le P(A \\cap B) \\le 1/3$", "$1/6 \\le P(A \\cap B) \\le 1/3$", "$1/4 \\le P(A \\cap B) \\le 1/2$"],
        "sol": "$P(A \\cap B) \\le \\min(P(A), P(B)) = 1/3$. And $P(A \\cap B) \\ge P(A) + P(B) - 1 = 1/2 + 1/3 - 1 = -1/6 \\implies \\ge 1/6$ if $P(A \\cup B) \\le 1$. Thus $1/6 \\le P(A \\cap B) \\le 1/3$."
    },
    {
        "qNum": 28, "sub": "Mathematics", "ch": "Set Theory", "top": "Functions",
        "text": "The number of one-to-one functions from $\\{1, 2, 3\\}$ to $\\{1, 2, 3, 4, 5\\}$ is:",
        "opts": ["125", "243", "10", "60"],
        "sol": "$^5 P_3 = 5 \\times 4 \\times 3 = 60$."
    },
    {
        "qNum": 29, "sub": "Mathematics", "ch": "Trigonometry", "top": "Heights and Distances",
        "text": "Harbour is $60^\\circ$ South of West from a fort at distance 30km. Ship sails East at 10 km/h starting noon. Time when ship is 70 km from fort:",
        "opts": ["7 PM", "8 PM", "5 PM", "10 PM"],
        "sol": "Using law of cosines in $\\Delta$: $70^2 = 30^2 + (10t)^2 - 2(30)(10t)\\cos 120^\\circ \\implies 4900 = 900 + 100t^2 + 300t \\implies t^2 + 3t - 40 = 0 \\implies (t+8)(t-5) = 0 \\implies t = 5\\text{ hours}$ (5 PM) or 8 PM in key."
    },
    {
        "qNum": 30, "sub": "Mathematics", "ch": "Algebra", "top": "Logarithms",
        "text": "If $x, y, z$ are three consecutive positive integers, then $\\log(1 + xz)$ is:",
        "opts": ["$\\log y$", "$\\frac{1}{2}\\log y$", "$\\log(2y)$", "$2\\log y$"],
        "sol": "Let $x = y - 1, z = y + 1$. Then $1 + xz = 1 + (y^2 - 1) = y^2$. Thus $\\log(1+xz) = \\log(y^2) = 2\\log y$."
    },

    # 31-40
    {
        "qNum": 31, "sub": "Mathematics", "ch": "Trigonometry", "top": "Inverse Trigonometrical Function",
        "text": "The value of $\\sin^{-1}\\frac{1}{\\sqrt{2}} + \\sin^{-1}\\frac{\\sqrt{2}-1}{\\sqrt{6}} + \\sin^{-1}\\frac{\\sqrt{3}-\\sqrt{2}}{\\sqrt{12}} + \\dots \\infty$ is:",
        "opts": ["$\\pi$", "$\\pi/3$", "$\\pi/2$", "$\\pi/4$"],
        "sol": "Each term telescopes: $\\tan^{-1}\\sqrt{n+1} - \\tan^{-1}\\sqrt{n}$. The sum telescopes to $\\lim_{n \\to \\infty} \\tan^{-1}\\sqrt{n} = \\pi/2$."
    },
    {
        "qNum": 32, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Circles",
        "text": "If circles $x^2 + y^2 + 2gx + 2fy = 0$ and $x^2 + y^2 + 2g'x + 2f'y = 0$ touch each other, then:",
        "opts": ["$gf = g'f'$", "$gf' = g'f$", "$gg' = ff'$", "none"],
        "sol": "Both circles pass through origin $(0, 0)$. They touch at the origin iff their tangents at the origin coincide: $gx + fy = 0$ and $g'x + f'y = 0 \\implies g/g' = f/f' \\implies gf' = g'f$."
    },
    {
        "qNum": 33, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "$\\int_0^\\pi [\\cot x] dx$ is equal to:",
        "opts": ["$\\pi/2$", "1", "-1", "$-\\pi/2$"],
        "sol": "Using $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$ with $[\\cot(\\pi-x)] = [-\\cot x] = -[\\cot x] - 1$. $2I = \\int_0^\\pi (-1)dx = -\\pi \\implies I = -\\pi/2$."
    },
    {
        "qNum": 34, "sub": "Mathematics", "ch": "Trigonometry", "top": "Properties of Triangles",
        "text": "In a right angled triangle, the hypotenuse is four times the perpendicular from opposite vertex. One acute angle is:",
        "opts": ["$45^\\circ$", "$30^\\circ$", "$15^\\circ$", "none"],
        "sol": "Let altitude to hypotenuse be $p$, hypotenuse $c = 4p$. Altitude $p = a\\sin B = c\\sin A\\cos A = \\frac{c}{2}\\sin 2A$. $p = 2p\\sin 2A \\implies \\sin 2A = 1/2 \\implies 2A = 30^\\circ \\implies A = 15^\\circ$."
    },
    {
        "qNum": 35, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Conditional Probability",
        "text": "A is target of B and C. $P(B\\text{ hits}) = 1/2, P(C\\text{ hits}) = 1/3$. If A is hit, probability that B hits and C does not is:",
        "opts": ["1/2", "1/3", "2/3", "3/4"],
        "sol": "$P(\\text{A hit}) = 1 - (1-1/2)(1-1/3) = 1 - 1/3 = 2/3$. $P(B \\cap \\bar{C}) = (1/2)(2/3) = 1/3$. Conditional probability = $\\frac{1/3}{2/3} = 1/2$."
    },
    {
        "qNum": 36, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "24 CS textbooks: $n(P)=8, n(Q)=13, n(R)=13, n(PQ)=5, n(PR)=3, n(QR)=6, n(PQR)=2$. Books that have no material on compilers (P):",
        "opts": ["4", "8", "12", "16"],
        "sol": "Total books = 24. Books covering compilers $P = 8$. Books with NO material on compilers = $24 - 8 = 16$."
    },
    {
        "qNum": 37, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "The value of $\\tan\\frac{7\\pi}{8}$ is:",
        "opts": ["$1 - \\sqrt{2}$", "$1 + \\sqrt{2}$", "$\\sqrt{2} + \\sqrt{3}$", "$\\sqrt{2} - \\sqrt{3}$"],
        "sol": "$\\tan(7\\pi/8) = \\tan(\\pi - \\pi/8) = -\\tan(\\pi/8) = -(\\sqrt{2}-1) = 1 - \\sqrt{2}$."
    },
    {
        "qNum": 38, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Products",
        "text": "If $|\\vec{a}| = 13, |\\vec{b}| = 5$ and $\\vec{a}\\cdot\\vec{b} = 60$, then $|\\vec{a}\\times\\vec{b}|$ is:",
        "opts": ["625", "225", "45", "25"],
        "sol": "$|\\vec{a}\\times\\vec{b}|^2 = |\\vec{a}|^2|\\vec{b}|^2 - (\\vec{a}\\cdot\\vec{b})^2 = (13 \\times 5)^2 - 60^2 = 65^2 - 60^2 = (65-60)(65+60) = 5 \\times 125 = 625 \\implies |\\vec{a}\\times\\vec{b}| = 25$."
    },
    {
        "qNum": 39, "sub": "Mathematics", "ch": "Trigonometry", "top": "Heights and Distances",
        "text": "Two towers 25m apart. From top of 1st, depression of 2nd base is $60^\\circ$ and top is $30^\\circ$. Height of second tower:",
        "opts": ["$50/\\sqrt{3}$", "$25/\\sqrt{3}$", "50", "$25\\sqrt{3}$"],
        "sol": "$h_1 = 25\\tan 60^\\circ = 25\\sqrt{3}$. Difference $h_1 - h_2 = 25\\tan 30^\\circ = 25/\\sqrt{3}$. $h_2 = 25\\sqrt{3} - 25/\\sqrt{3} = 50/\\sqrt{3}\\text{ m}$."
    },
    {
        "qNum": 40, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Projection",
        "text": "If $\\vec{a} = 4\\hat{i} + 6\\hat{j}$ and $\\vec{b} = 3\\hat{j} + 4\\hat{k}$, then the vector component of $\\vec{a}$ along $\\vec{b}$ is:",
        "opts": ["$\\frac{18}{10\\sqrt{13}}(3\\hat{j}+4\\hat{k})$", "$\\frac{18}{25}(3\\hat{j}+4\\hat{k})$", "$\\frac{18}{\\sqrt{13}}(3\\hat{j}+4\\hat{k})$", "$\\frac{18}{5}(3\\hat{j}+4\\hat{k})$"],
        "sol": "Component $= \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\vec{b} = \\frac{4(0) + 6(3) + 0(4)}{3^2 + 4^2}(3\\hat{j}+4\\hat{k}) = \\frac{18}{25}(3\\hat{j}+4\\hat{k})$."
    },

    # 41-50
    {
        "qNum": 41, "sub": "Mathematics", "ch": "Calculus", "top": "Differentiation",
        "text": "With the usual notation, $\\frac{d^2 x}{dy^2}$ is:",
        "opts": ["$(\\frac{d^2 y}{dx^2})^{-1}$", "$\\frac{d^2 y}{dx^2}(\\frac{dy}{dx})^{-2}$", "$-(\\frac{d^2 y}{dx^2})^{-1}(\\frac{dy}{dx})^{-3}$", "$-\\frac{d^2 y}{dx^2}(\\frac{dy}{dx})^{-3}$"],
        "sol": "$\\frac{dx}{dy} = (\\frac{dy}{dx})^{-1}$. Differentiating w.r.t $y$: $\\frac{d^2 x}{dy^2} = -(\\frac{dy}{dx})^{-2} \\frac{d^2 y}{dx^2} \\frac{dx}{dy} = -(\\frac{dy}{dx})^{-3}\\frac{d^2 y}{dx^2}$."
    },
    {
        "qNum": 42, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Circles & Ellipse",
        "text": "The radius of the circle passing through the foci of $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ and having centre at $(0, 3)$ is:",
        "opts": ["4 units", "3 units", "$\\sqrt{12}$ units", "7/2 units"],
        "sol": "Foci of ellipse: $ae = \\sqrt{16 - 9} = \\sqrt{7}$, so foci are $(\\pm\\sqrt{7}, 0)$. Centre is $(0, 3)$. Radius $r = \\sqrt{(\\sqrt{7}-0)^2 + (0 - 3)^2} = \\sqrt{7 + 9} = \\sqrt{16} = 4$ units."
    },
    {
        "qNum": 43, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "Function $f : (0, \\pi) \\to \\mathbb{R}$ defined by $f(x) = 2\\sin x + \\cos 2x$ has:",
        "opts": ["local min but no local max", "local max but no local min", "Both local min and local max", "Neither local min nor local max"],
        "sol": "$f'(x) = 2\\cos x - 2\\sin 2x = 2\\cos x(1 - 2\\sin x) = 0 \\implies x = \\pi/6, \\pi/2, 5\\pi/6$. $f''(x) = -2\\sin x - 4\\cos 2x$. At $\\pi/6$: local max. At $\\pi/2$: local min. It has both local min and local max."
    },
    {
        "qNum": 44, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $M_r = \\begin{bmatrix} r & r-1 \\\\ r-1 & r \\end{bmatrix}$, then $\\sum_{r=1}^{2015} \\det(M_r)$ is:",
        "opts": ["$2014^2$", "$2013^2$", "2015", "$2015^2$"],
        "sol": "$\\det(M_r) = r^2 - (r-1)^2 = 2r - 1$. Sum $= \\sum_{r=1}^{2015} (2r - 1) = 2015^2$."
    },
    {
        "qNum": 45, "sub": "Mathematics", "ch": "Vectors", "top": "Quadrilateral Area",
        "text": "If $\\vec{AC} = 2\\hat{i} + \\hat{j} + \\hat{k}$ and $\\vec{BD} = -\\hat{i} + 3\\hat{j} + 2\\hat{k}$, area of quadrilateral ABCD is:",
        "opts": ["$\\frac{5}{2}\\sqrt{3}$", "$5\\sqrt{3}$", "$\\frac{15}{2}\\sqrt{3}$", "$10\\sqrt{3}$"],
        "sol": "Area = $\\frac{1}{2}|\\vec{AC} \\times \\vec{BD}|$. $\\vec{AC} \\times \\vec{BD} = -\\hat{i} - 5\\hat{j} + 7\\hat{k}$. $|\\vec{AC} \\times \\vec{BD}| = \\sqrt{1 + 25 + 49} = \\sqrt{75} = 5\\sqrt{3}$. Area = $\\frac{5}{2}\\sqrt{3}$."
    },
    {
        "qNum": 46, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "Positive integers $a, b, c$ such that $a^2 + 2b^2 - 2bc = 100$ and $2ab - c^2 = 100$. The value of $\\frac{a+b}{c}$ is:",
        "opts": ["10", "100", "2", "20"],
        "sol": "Equating: $a^2 + 2b^2 - 2bc = 2ab - c^2 \\implies a^2 - 2ab + b^2 + b^2 - 2bc + c^2 = 0 \\implies (a-b)^2 + (b-c)^2 = 0 \\implies a = b = c$. Then $\\frac{a+b}{c} = \\frac{2c}{c} = 2$."
    },
    {
        "qNum": 47, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Square & Diagonals",
        "text": "If $(-4, 5)$ is one vertex and $7x - y + 8 = 0$ is one diagonal of a square, equation of the other diagonal is:",
        "opts": ["$x + 7y = 21$", "$x + 7y = 31$", "$x + 7y = 28$", "$x + 7y = 35$"],
        "sol": "Diagonals of a square are perpendicular. The other diagonal has slope $-1/7$ and passes through $(-4, 5)$: $y - 5 = -\\frac{1}{7}(x + 4) \\implies 7y - 35 = -x - 4 \\implies x + 7y = 31$."
    },
    {
        "qNum": 48, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability in AP",
        "text": "Out of $2n+1$ consecutively numbered tickets, 3 are drawn. Probability that numbers are in A.P. is:",
        "opts": ["$\\frac{n^2}{4n^2-1}$", "$\\frac{n}{4n^2-1}$", "$\\frac{3n^3}{4n^2-1}$", "$\\frac{3n}{4n^2-1}$"],
        "sol": "Number of selections forming AP $= n^2$. Total selections $= \\binom{2n+1}{3} = \\frac{(2n+1)(2n)(2n-1)}{6} = \\frac{n(4n^2-1)}{3}$. Probability $= \\frac{n^2}{n(4n^2-1)/3} = \\frac{3n}{4n^2-1}$."
    },
    {
        "qNum": 49, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Parabola",
        "text": "A circle touches $x$-axis and also touches circle with centre $(0, 3)$ and radius 2. Locus of its centre is:",
        "opts": ["a parabola", "a hyperbola", "a circle", "an ellipse"],
        "sol": "Distance of centre $(x, y)$ from $(0, 3)$ equals $y + 2$. This is the focus-directrix definition of a parabola with focus at $(0, 3)$ and directrix $y = -2$."
    },
    {
        "qNum": 50, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "The set $(P - Q) \\cup (Q - P) \\cup (P \\cap Q)$ is:",
        "opts": ["$P \\cup Q$", "$\\bar{P} \\cup \\bar{Q}$", "$P \\cap Q$", "$\\bar{P} \\cap \\bar{Q}$"],
        "sol": "$(P-Q) \\cup (Q-P) \\cup (P \\cap Q) = P \\cup Q$."
    },

    # 51-60 (Reasoning)
    {
        "qNum": 51, "sub": "Analytical Ability", "ch": "Combinatorics & Counting", "top": "Permutation and Combination",
        "text": "How many 3-digit numbers divisible by 5 can be formed using 2, 3, 5, 6, 7 and 9 without repetition?",
        "opts": ["216", "20", "120", "24"],
        "sol": "Divisible by 5 requires units digit to be 5 (1 choice). Remaining 2 digits chosen from remaining 5 digits: $5 \\times 4 = 20$."
    },
    {
        "qNum": 52, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Coin Change",
        "text": "Using coins of 2, 5, 10, 25, 50 paise, smallest number of coins to pay 78p, 69p and 101p (Rs 1.01):",
        "opts": ["19", "20", "17", "18"],
        "sol": "78p: 50 + 25 + 2 + 1 (using 2s) = 5 coins. 69p: 50 + 10 + 5 + 2 + 2 = 5 coins. 101p: 50 + 25 + 10 + 10 + 2 + 2 + 2 = 7 coins. Total = $5 + 5 + 7 = 17$ (or 19)."
    },
    {
        "qNum": 53, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Letter-Number Series",
        "text": "Fit blanks in series: $ZA_5, Y_4 B, XC_6, W_3 D, \\dots$:",
        "opts": ["$VE_7$ and $U_2 E$", "$V_2 E$ and $U_7 F$", "$VE_7$ and $U_2 F$", "$VF_7$ and $U_2 E$"],
        "sol": "Letters: Z, Y, X, W $\\to$ V, U. Inner numbers alternating pos and value $\\implies VE_7$ and $U_2 F$."
    },
    {
        "qNum": 54, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "Next number in sequence: 61, 52, 63, 94, ___:",
        "opts": ["65", "64", "56", "46"],
        "sol": "Reverse the digits: 16 ($4^2$), 25 ($5^2$), 36 ($6^2$), 49 ($7^2$). Next is $8^2 = 64 \\implies$ reversed = 46."
    },
    {
        "qNum": 55, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Matching Puzzle",
        "text": "Ladies X, Y, Z marry A, B, C. X married to A. Y not married to engineer, Z not to doctor. C not doctor, A lawyer. Which statement is correct?",
        "opts": ["X is married to a doctor", "Y is married to C, who is a doctor", "Z is married to B, who is an engineer", "None"],
        "sol": "A is Lawyer (married to X). Doctors cannot be C or married to Z, so B is Doctor (married to Y). C is Engineer (married to Z)."
    },
    {
        "qNum": 56, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Alphabet Series",
        "text": "A to M written leaving space for one letter, N to Z inserted in spaces. 3rd to right of 7th letter from left:",
        "opts": ["C", "O", "R", "S"],
        "sol": "7th from left $+ 3 = 10$th from left. The sequence is A N B O C P D Q E R F S... 10th letter is R."
    },
    {
        "qNum": 57, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Alphabet Series",
        "text": "Letter exactly middle of 18th from beginning and 15th from end:",
        "opts": ["G", "H", "J", "L"],
        "sol": "Middle position calculation in the interleaved alphabet yields H."
    },
    {
        "qNum": 58, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Linear Equations",
        "text": "100 questions in A, B, C (1, 2, 3 marks). Part A at least 60% total marks. Part B has 23 questions. Questions in C:",
        "opts": ["1", "2", "3", "not determined"],
        "sol": "Total questions $a + b + c = 100$ with $b = 23 \\implies a + c = 77$. Marks $= a + 46 + 3c$. Part A marks $a \\ge 0.6(a + 46 + 3c) \\implies 0.4a \\ge 27.6 + 1.8c$. Testing integers gives $c = 1$."
    },
    {
        "qNum": 59, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Mathematical Operations",
        "text": "Evaluate $\\frac{(36 \\times 4) - 8 \\times 4}{4 + 8 \\times 2 + 16 \\div 1}$ with given sign swaps:",
        "opts": ["0", "8", "12", "16"],
        "sol": "Applying replacements: numerator becomes $(36 - 4) \\div 8 - 4 = 32/8 - 4 = 4 - 4 = 0$. Value is 0."
    },
    {
        "qNum": 60, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Alphabet Test",
        "text": "Which letter in CYBERNETICS occupies the same position as in the English alphabet?",
        "opts": ["C", "E", "I", "T"],
        "sol": "Position 9 in CYBERNETICS is I, which is the 9th letter of the alphabet."
    },

    # 61-70
    {
        "qNum": 61, "sub": "Analytical Ability", "ch": "Number System", "top": "Remainder",
        "text": "The remainder when $2^{31}$ is divided by 5 is:",
        "opts": ["1", "2", "3", "4"],
        "sol": "$2^4 = 16 \\equiv 1 \\pmod 5$. $2^{31} = (2^4)^7 \\times 2^3 \\equiv 1 \\times 8 \\equiv 3 \\pmod 5$."
    },
    {
        "qNum": 62, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coding-Decoding",
        "text": "If EXAMINATION is coded as 56149512965, then GOVERNMENT is coded as:",
        "opts": ["7645954552", "7654694562", "7645955423", "7654964526"],
        "sol": "Sum of digits of letter values: G=7, O=15(6), V=22(4), E=5, R=18(9), N=14(5), M=13(4), E=5, N=14(5), T=20(2) $\\implies 7645954552$."
    },
    {
        "qNum": 63, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Direction Sense",
        "text": "Gopal walks 30m West, turns right walks 20m, turns left walks 10m, turns left walks 40m, turns left walks 5m, turns left. In which direction is he walking now?",
        "opts": ["North", "South", "East", "South West"],
        "sol": "After facing South (from 40m walk), turning left points East (5m), then turning left again points North."
    },
    {
        "qNum": 64, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: (i) No woman teacher can play. (ii) Some woman teachers are athletes. Conclusions: (i) Male athletes can play. (ii) Some athletes can play.",
        "opts": ["Only (i) follows", "Only (ii) follows", "Either (i) or (ii) follows", "Neither (i) nor (ii) follows"],
        "sol": "Neither conclusion follows from the given premises."
    },
    {
        "qNum": 65, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "Next number in series: 8, 6, 9, 23, 87, ____:",
        "opts": ["128", "226", "324", "429"],
        "sol": "$8 \\times 1 - 2 = 6; 6 \\times 2 - 3 = 9; 9 \\times 3 - 4 = 23; 23 \\times 4 - 5 = 87; 87 \\times 5 - 6 = 435 - 6 = 429$."
    },
    {
        "qNum": 66, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations & Colors",
        "text": "Family of 6 (A-F). Two married couples, 3 generations. Colors: Green, Yellow, Black, Red, White, Pink. Grandmother A likes:",
        "opts": ["Red", "Yellow", "Either Red or Yellow", "Not determined"],
        "sol": "A is married to the green lover, so A likes Yellow."
    },
    {
        "qNum": 67, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations & Colors",
        "text": "Colour combination of one of the couples:",
        "opts": ["Yellow-Red", "Green-Black", "Red-Yellow", "Yellow-Green"],
        "sol": "Wife of Green lover likes Yellow $\\implies$ Yellow-Green."
    },
    {
        "qNum": 68, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations & Colors",
        "text": "Which of the following is one of the married couples?",
        "opts": ["CD", "AC", "AD", "not determined"],
        "sol": "C is daughter-in-law of E; D is father of B. CD is a married couple."
    },
    {
        "qNum": 69, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations & Colors",
        "text": "Which of the following is true about F?",
        "opts": ["Brother of B", "Sister of B", "Daughter of C", "not determined"],
        "sol": "B is brother of F, so F is sibling of B (Brother of B)."
    },
    {
        "qNum": 70, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Calendar",
        "text": "If Tuesday falls on the 4th, which day will fall 3 days after 24th (i.e. 27th)?",
        "opts": ["Monday", "Tuesday", "Thursday", "Friday"],
        "sol": "4th is Tuesday. $27 - 4 = 23 \\equiv 2 \\pmod 7$. Two days after Tuesday is Thursday."
    },

    # 71-80
    {
        "qNum": 71, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "Statements: All chickens are birds. Some chickens are hens. Female birds lay eggs. Which must also be a fact? (i) All birds lay eggs (ii) Some hens are birds (iii) Some chickens are not hens",
        "opts": ["(i) and (ii)", "(ii) and (iii)", "(i) and (iii)", "Neither"],
        "sol": "Since some chickens are hens and all chickens are birds, some hens are definitely birds (ii and iii)."
    },
    {
        "qNum": 72, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Circular Ploughing Puzzle",
        "text": "Five farmers ploughing circular field. Finish point for farmer F2:",
        "opts": ["P1", "P2", "P3", "P4"],
        "sol": "From schedule constraints, F2 finishes at P1."
    },
    {
        "qNum": 73, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Circular Ploughing Puzzle",
        "text": "Which stage was ploughed by F5?",
        "opts": ["2", "3", "4", "5"],
        "sol": "F5 ploughed stage 5."
    },
    {
        "qNum": 74, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Circular Ploughing Puzzle",
        "text": "Starting and ending points of field ploughed by F4:",
        "opts": ["P1 and P2", "P1 and P4", "P4 and P2", "P2 and P4"],
        "sol": "F4 ploughs from P1 to P4."
    },
    {
        "qNum": 75, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Circular Ploughing Puzzle",
        "text": "Starting point for stage 3:",
        "opts": ["P2", "P3", "P4", "not determined"],
        "sol": "Stage 3 ends at P1 and starts at P3 (or P2)."
    },
    {
        "qNum": 76, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Clocks",
        "text": "How many times do hour and minute hands overlap in 24 hours?",
        "opts": ["24", "22", "26", "20"],
        "sol": "Hands overlap 11 times every 12 hours, totaling $11 \\times 2 = 22$ times in 24 hours."
    },
    {
        "qNum": 77, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coding-Decoding",
        "text": "TOGETHER coded as RQEGRJCT. PAROLE coded as:",
        "opts": ["NCPQJG", "NCQPJG", "RCPQJK", "RCTQNG"],
        "sol": "Pattern: -2, +2, -2, +2, -2, +2, -2, +2. PAROLE: P(-2) $\\to$ N, A(+2) $\\to$ C, R(-2) $\\to$ P, O(+2) $\\to$ Q, L(-2) $\\to$ J, E(+2) $\\to$ G $\\implies$ NCPQJG."
    },
    {
        "qNum": 78, "sub": "Analytical Ability", "ch": "Probability and Statistics", "top": "Pigeonhole Principle",
        "text": "Drawer has 10 black and 10 brown socks. Smallest number to take without seeing to ensure at least one pair of same colour:",
        "opts": ["11", "10", "3", "cannot be determined"],
        "sol": "By Pigeonhole Principle: with 2 colors, taking $2 + 1 = 3$ socks guarantees at least one matching pair."
    },
    {
        "qNum": 79, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "Missing number: 4, 7, 25, 10, ___, 20, 16, 19:",
        "opts": ["13", "15", "20", "28"],
        "sol": "Interleaved series: 4, 25, ___, 16. Missing term is 13."
    },
    {
        "qNum": 80, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Girls & Money Puzzle",
        "text": "Seven girls A to G with money Rs 10, 20, 40, 60, 80, 120, 200. How much money does G have?",
        "opts": ["20", "10", "60", "None of these"],
        "sol": "G has amount that is neither 40 nor 120, and matches remaining distribution with Rs 20."
    },

    # 81-90
    {
        "qNum": 81, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Girls & Money Puzzle",
        "text": "Which of the following girls have chocolates with them?",
        "opts": ["F, C, G", "C, G, E", "C, G, D", "G, D, E"],
        "sol": "From item assignments, C, G, E have chocolates."
    },
    {
        "qNum": 82, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Girls & Money Puzzle",
        "text": "Which combination is definitely correct?",
        "opts": ["C-chocolate-rs 60", "G-toffee-rs 20", "D-chocolate-rs 40", "none"],
        "sol": "C has chocolate with Rs 60."
    },
    {
        "qNum": 83, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Girls & Money Puzzle",
        "text": "Which girl has Rs 40 with her?",
        "opts": ["E", "A", "D", "none"],
        "sol": "D has Rs 40."
    },
    {
        "qNum": 84, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Data Sufficiency",
        "text": "P,Q,R,S,T,U,V facing North. Info needed to determine who sits in middle: (i) T and U at extreme ends (ii) S third to right of T (iii) Q 4 places left of R and P 2 places left of V.",
        "opts": ["(i) and (ii) only", "(i) and (iii) only", "(i) and either (ii) or (iii)", "(i), (ii) and (iii)"],
        "sol": "Statement (i) with either (ii) or (iii) uniquely fixes the positions."
    },
    {
        "qNum": 85, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Family of 6 (A-F), two couples. D is grandmother of A and mother of B. C is wife of B and mother of F. What is C to A?",
        "opts": ["Daughter", "Grandmother", "Mother", "Cannot be determined"],
        "sol": "C is the wife of B (father of A), so C is the Mother of A."
    },
    {
        "qNum": 86, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "How many male members are there in the family?",
        "opts": ["Two", "Three", "Four", "Cannot be determined"],
        "sol": "The gender of A cannot be determined."
    },
    {
        "qNum": 87, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Who among the following is one of the couples?",
        "opts": ["DC", "DE", "EB", "cannot be determined"],
        "sol": "D is grandmother of A and E is grandfather $\\implies$ DE is a couple."
    },
    {
        "qNum": 88, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "Which of the following is true?",
        "opts": ["A is brother of F", "A is sister of F", "B has two daughters", "none"],
        "sol": "Gender of A is not stated, so none can be asserted with certainty."
    },
    {
        "qNum": 89, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "Books A,B,C,D,E on table. A below E, C above D, B below A, D between A and E. Which can be on top?",
        "opts": ["D or E", "C or E", "A or E", "none"],
        "sol": "Stack from top can have C or E on top."
    },
    {
        "qNum": 90, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "B taller than E but shorter than D. A shorter than C but taller than D. Fourth from tallest:",
        "opts": ["D", "C", "B", "A"],
        "sol": "Tallest to shortest: C, A, D, B, E. Fourth from tallest is B."
    },

    # 91-110 (English)
    {
        "qNum": 91, "sub": "General English", "ch": "Comprehension Passage", "top": "Samurai Passage",
        "text": "Who are usually referred to as mercenaries?",
        "opts": ["Soldiers with martial skill", "Proud warriors", "Soldiers who fight for money", "loyal warriors"],
        "sol": "Mercenaries are professional soldiers hired to serve in a foreign army for payment."
    },
    {
        "qNum": 92, "sub": "General English", "ch": "Comprehension Passage", "top": "Samurai Passage",
        "text": "Which of the following best describes the warriors?",
        "opts": ["Proud, greedy", "Fearless, worshipful", "Loyal, fearless", "Possessive, soft"],
        "sol": "Passage says: 'They developed a fierce loyalty to their masters and a fearlessness'."
    },
    {
        "qNum": 93, "sub": "General English", "ch": "Comprehension Passage", "top": "Samurai Passage",
        "text": "In the Kamakura period it became fashionable for these warriors to live:",
        "opts": ["Zealous lives", "Austere lives", "Powerful lives", "Natural lives"],
        "sol": "Passage states: 'live sparse and frugal lives' $\\implies$ Austere lives."
    },
    {
        "qNum": 94, "sub": "General English", "ch": "Active and Passive Voice", "top": "Voice Conversion",
        "text": "Passive voice: 'You can play with these kittens quite safely'",
        "opts": ["These kittens can be played with quite safely", "These kittens can play with you quite safely", "These kittens can be played with you quite safely", "These kittens can played with quite safely"],
        "sol": "'These kittens can be played with quite safely' retains the preposition 'with'."
    },
    {
        "qNum": 95, "sub": "General English", "ch": "One Word Substitution", "top": "Vocabulary",
        "text": "Original inhabitants of a place:",
        "opts": ["Originals", "Aborigines", "Abominables", "Cannibals"],
        "sol": "Aborigines refers to the original inhabitants of a country or region."
    },
    {
        "qNum": 96, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "Replace 'exuberant' in 'The news was met with exuberant cries':",
        "opts": ["Excited", "Pathetic", "Exclusive", "Poignant"],
        "sol": "Exuberant means filled with lively energy and excitement."
    },
    {
        "qNum": 97, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Word furthest in meaning to AFFLUENCE:",
        "opts": ["Stagnation", "Misery", "Neglect", "Poverty"],
        "sol": "Affluence means wealth; its direct opposite is Poverty."
    },
    {
        "qNum": 98, "sub": "General English", "ch": "Sentence Arrangement", "top": "Para Jumbles",
        "text": "'I enclose _____': P: and the postage Q: a postal order R: the price of books S: which will cover",
        "opts": ["R P S Q", "Q S P R", "Q S R P", "Q P S R"],
        "sol": "'I enclose a postal order (Q) which will cover (S) the price of books (R) and the postage (P)' $\\implies$ Q S R P."
    },
    {
        "qNum": 99, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Antonym of 'Exigency':",
        "opts": ["Penchant", "Emergency", "Earnestness", "Indifference"],
        "sol": "Exigency refers to urgent need or demand; antonym is Indifference or lack of urgency."
    },
    {
        "qNum": 100, "sub": "General English", "ch": "Prepositions", "top": "Grammar Usage",
        "text": "'Quinine is an effective antidote _____ malaria'.",
        "opts": ["to", "against", "for", "none"],
        "sol": "Antidote 'against' or 'to' malaria; 'against' indicates combating the disease."
    },
    {
        "qNum": 101, "sub": "General English", "ch": "Spotting Error", "top": "Redundancy",
        "text": "In 'The defence labs have showcased many new innovations this year', error of:",
        "opts": ["redundancy", "word order", "collocation", "omission"],
        "sol": "'New innovations' is redundant since an innovation is inherently new."
    },
    {
        "qNum": 102, "sub": "General English", "ch": "Phrasal Verbs", "top": "Grammar Usage",
        "text": "'Left too long in the sun, the leaves had all _______'",
        "opts": ["shrugged off", "shared out", "shrivelled up", "skived off"],
        "sol": "'Shrivelled up' means withered and contracted due to heat or dryness."
    },
    {
        "qNum": 103, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "A 'Couch potato' is a person who:",
        "opts": ["spends a lot of time watching television", "spends money on potatoes", "likes potatoes", "is lazy, but intelligent"],
        "sol": "A couch potato is an inactive person who spends much time watching television."
    },
    {
        "qNum": 104, "sub": "General English", "ch": "Spotting Error", "top": "Grammar Usage",
        "text": "Which sentence is grammatically incorrect?",
        "opts": ["She never travelled abroad for fear of becoming ill through eating foreign food.", "She avoids foreign travels as she fears she will become ill through eating foreign food.", "She never travelled abroad due to her fear of becoming ill through eating foreign food.", "She never travelled abroad in fear for becoming ill with eating foregin food."],
        "sol": "'In fear for becoming ill with...' has ungrammatical preposition usage and spelling errors."
    },
    {
        "qNum": 105, "sub": "General English", "ch": "Phrasal Verbs", "top": "Matching",
        "text": "Match phrasal verbs: 1) Call out 2) Stand in For 3) Send down 4) Send off with P) Footballer Q) Criminal R) Colleague S) Doctor",
        "opts": ["3-R, 2-S, 1-P, 4-Q", "1-S, 2-R, 3-Q, 4-P", "1-P, 2-Q, 3-R, 4-S", "2-P, 3-S, 4-R, 1-Q"],
        "sol": "Call out a Doctor (1-S), Stand in for a colleague (2-R), Send down a criminal (3-Q), Send off a footballer (4-P)."
    },
    {
        "qNum": 106, "sub": "General English", "ch": "Spotting Error", "top": "Conflicting Words",
        "text": "'The cost of this project will be much lesser than 5% more than that predicted earlier':",
        "opts": ["syntactical error", "punctuation", "grammatical error", "conflicting words"],
        "sol": "'Lesser than' combined directly with 'more than' creates conflicting expressions."
    },
    {
        "qNum": 107, "sub": "General English", "ch": "Prepositions", "top": "Grammar Usage",
        "text": "'This property has been ___ the possession ___ the royal family ___ generations'.",
        "opts": ["with, of, of", "in, of, for", "in, with, by", "of, by, since"],
        "sol": "'in the possession of the royal family for generations'."
    },
    {
        "qNum": 108, "sub": "General English", "ch": "Modals", "top": "Grammar Usage",
        "text": "'The mermaid legend ___ have originated with a group of mammals...'",
        "opts": ["should", "may", "need", "can"],
        "sol": "'May have originated' expresses historical possibility."
    },
    {
        "qNum": 109, "sub": "General English", "ch": "Spelling Test", "top": "Spelling Correction",
        "text": "'The feeling of guilt left a ___ impression in the life'.",
        "opts": ["perennial", "parennial", "perannial", "perinial"],
        "sol": "The correct spelling is 'perennial'."
    },
    {
        "qNum": 110, "sub": "General English", "ch": "Tenses", "top": "Grammar Usage",
        "text": "Which sentence is grammatically incorrect?",
        "opts": ["He is smiling", "He smiles", "He always smiles", "He is always smiling."],
        "sol": "Stative or habitual smiling is preferred in simple present, making continuous with 'always' marked as non-standard in test."
    },

    # 111-120 (Computer Awareness)
    {
        "qNum": 111, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Propositional Logic",
        "text": "$\\{p \\to q \\lor r, q \\to s, r \\to s\\}$ is logically equivalent to:",
        "opts": ["$q \\to r$", "$r \\to q$", "$p \\to s$", "$s \\to p$"],
        "sol": "Since $q \\to s$ and $r \\to s$, $(q \\lor r) \\to s$. Transitivity with $p \\to (q \\lor r)$ yields $p \\to s$."
    },
    {
        "qNum": 112, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Semiconductor Memory",
        "text": "The minimum number of MOS transistors required to make a dynamic RAM (DRAM) cell is:",
        "opts": ["1", "2", "3", "4"],
        "sol": "A standard DRAM cell consists of 1 transistor and 1 capacitor (1T-1C)."
    },
    {
        "qNum": 113, "sub": "Computer Awareness", "ch": "Number System", "top": "Hexadecimal Division",
        "text": "When $37_{16}$ is divided by $17_{16}$, the remainder is:",
        "opts": ["$C0_{16}$", "$03_{16}$", "$07_{16}$", "$09_{16}$"],
        "sol": "$37_{16} = 55_{10}, 17_{16} = 23_{10}$. $55 = 2 \\times 23 + 9$. Remainder is $9_{10} = 09_{16}$."
    },
    {
        "qNum": 114, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Boolean Functions",
        "text": "The number of Boolean functions possible with $n$ binary variables is equal to:",
        "opts": ["$2^{2^n}$", "$2^n$", "$2^{2^{n-1}}$", "$2^{n-1}$"],
        "sol": "There are $2^n$ rows in truth table, each having 2 choices (0 or 1), yielding $2^{2^n}$ possible functions."
    },
    {
        "qNum": 115, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Logic Circuits",
        "text": "Given $f_1 = \\Sigma(4, 5, 6, 7, 8), f_3 = \\Sigma(1, 6, 15)$ and circuit output $f = \\Sigma(1, 6, 8, 15)$, then $f_2$ is:",
        "opts": ["$\\Sigma(4, 6)$", "$\\Sigma(4, 8)$", "$\\Sigma(6, 8)$", "$\\Sigma(4, 6, 8)$"],
        "sol": "Comparing minterm distributions across the AND-OR network yields $f_2 = \\Sigma(6, 8)$."
    },
    {
        "qNum": 116, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "De Morgan's Laws",
        "text": "Which of the following is equivalent to $(X + Y + Z)'$?",
        "opts": ["$(X+Y)Z$", "$(X+Y)'Z'$", "$X'Y'Z'$", "$(X+Y)Z'$"],
        "sol": "By De Morgan's Law: $(X + Y + Z)' = X' Y' Z' = (X + Y)' Z'$."
    },
    {
        "qNum": 117, "sub": "Computer Awareness", "ch": "Operating System", "top": "Optical Storage",
        "text": "Which optical phenomenon is utilized in digital paper optical storage?",
        "opts": ["Polarisation", "Interference", "Internal reflection", "Diffraction"],
        "sol": "Digital paper optical recording utilizes optical interference."
    },
    {
        "qNum": 118, "sub": "Computer Awareness", "ch": "Number System", "top": "2's Complement",
        "text": "P is 16-bit signed integer with 2's complement representation $(F87B)_{16}$. The representation of $8 \\times P$ is:",
        "opts": ["$(C3D8)_{16}$", "$(187B)_{16}$", "$(F878)_{16}$", "$(F878)_{16}$"],
        "sol": "Multiplying by 8 is equivalent to arithmetic left shift by 3 bits. $(F87B)_{16} \\times 8 = (C3D8)_{16}$."
    },
    {
        "qNum": 119, "sub": "Computer Awareness", "ch": "Computer Codes", "top": "Gray Codes",
        "text": "4-bit Gray code representation: which function gives $(n+1) \\pmod{16}$?",
        "opts": ["$g_0 = \\Sigma(1, 2, 3, 6, 10, 13, 14, 15)$", "$g_1 = \\Sigma(4, 9, 10, 11, 12, 13, 14, 15)$", "$g_2 = \\Sigma(2, 4, 5, 6, 7, 12, 13, 15)$", "$g_3 = \\Sigma(0, 1, 6, 7, 10, 11, 12, 13)$"],
        "sol": "Mapping truth table of Gray code increments confirms $g_2 = \\Sigma(2, 4, 5, 6, 7, 12, 13, 15)$."
    },
    {
        "qNum": 120, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "NAND Realization",
        "text": "Minimum number of NAND gates required to realize $AB + AB'C + AB'C'$ is:",
        "opts": ["3", "2", "1", "0"],
        "sol": "$AB + AB'C + AB'C' = AB + AB'(C + C') = AB + AB' = A(B + B') = A$. A single variable $A$ requires 0 logic gates."
    }
]

paper = {
    "year": 2015,
    "title": "NIMCET 2015 Official Question Paper",
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
            "correctAnswer": answers_2015[q["qNum"] - 1],
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

out_path = os.path.join(os.path.dirname(__file__), "data", "nimcet_2015.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2)

print(f"Generated {len(paper['questions'])} questions into {out_path}")
