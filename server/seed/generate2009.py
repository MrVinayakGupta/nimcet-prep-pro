import json
import os

answers_2009 = [
    'C','D','C','B','A','B','A','D','C','A',
    'B','A','A','A','C','D','A','C','A','C',
    'B','A','A','B','A','D','B','C','B','C',
    'D','D','B','C','C','D','C','D','C','B',
    'A','B','C','B','B','A','D','C','C','D',
    'B','B','C','C','D','C','C','C','D','D',
    'D','D','B','A','D','C','C','C','B','A',
    'B','B','A','C','D','A','C','D','B','C',
    'D','A','A','B','C','C','A','A','A','A',
    'C','D','D','C','A','A','C','C','C','C',
    'D','D','D','C','D','B','A','A','D','B',
    'B','C','A','D','C','B','C','B','D','D'
]

raw_questions = [
    # 1-10
    {
        "qNum": 1, "sub": "Mathematics", "ch": "Trigonometry", "top": "Inverse Trigonometrical Function",
        "text": "If $\\theta = \\tan^{-1}\\left(\\frac{1}{1+2}\\right) + \\tan^{-1}\\left(\\frac{1}{1+2\\cdot 3}\\right) + \\tan^{-1}\\left(\\frac{1}{1+3\\cdot 4}\\right) + \\dots + \\tan^{-1}\\left(\\frac{1}{1+n(n+1)}\\right)$, then $\\tan\\theta$ is equal to:",
        "opts": ["$\\frac{n}{n+1}$", "$\\frac{n+1}{n+2}$", "$\\frac{n}{n+2}$", "$\\frac{n-1}{n+2}$"],
        "sol": "Using $\\tan^{-1}(k+1) - \\tan^{-1}(k) = \\tan^{-1}\\frac{1}{1+k(k+1)}$, the series telescopes to $\\theta = \\tan^{-1}(n+1) - \\tan^{-1}(1)$. Thus $\\tan\\theta = \\frac{(n+1)-1}{1+(n+1)(1)} = \\frac{n}{n+2}$."
    },
    {
        "qNum": 2, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Rectangular Cartesian Coordinates",
        "text": "If the distance of any point $(x, y)$ from the origin is defined as $d(x, y) = \\max(|x|, |y|)$, then the locus of the point $(x, y)$ where $d(x, y) = 1$ is:",
        "opts": ["a square of area 1 sq. unit", "a circle of radius 1", "a triangle", "a square of area 4 sq. units"],
        "sol": "The condition $\\max(|x|, |y|) = 1$ defines the boundary of the region where $-1 \\le x \\le 1$ and $-1 \\le y \\le 1$. The vertices are $(\\pm 1, \\pm 1)$ with side length 2, so the area is $2 \\times 2 = 4$ sq. units."
    },
    {
        "qNum": 3, "sub": "Mathematics", "ch": "Trigonometry", "top": "Inverse Trigonometrical Function",
        "text": "The number of solutions for $\\tan^{-1}\\sqrt{x(x+1)} + \\sin^{-1}\\sqrt{x^2+x+1} = \\frac{\\pi}{2}$ is:",
        "opts": ["zero", "one", "two", "infinite"],
        "sol": "For real square roots and valid inverse sine domain: $x(x+1) \\ge 0$ and $0 \\le x^2+x+1 \\le 1 \\implies x(x+1) \\le 0$. Thus $x(x+1) = 0$, giving $x = 0$ or $x = -1$. Both values satisfy the equation, giving 2 solutions."
    },
    {
        "qNum": 4, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Straight Line",
        "text": "Let $ABC$ be an isosceles triangle with $AB = BC$. If base $BC$ is parallel to $x$-axis and $m_1, m_2$ are slopes of medians drawn through the angular points $B$ and $C$, then:",
        "opts": ["$m_1 m_2 = -1$", "$m_1 + m_2 = 0$", "$m_1 m_2 = 2$", "$(m_1 - m_2)^2 + 2m_1 + m_2 = 0$"],
        "sol": "By symmetry of the isosceles triangle with horizontal base $BC$, the medians drawn from vertices $B$ and $C$ are reflections across the vertical axis of symmetry, meaning their slopes are equal in magnitude and opposite in sign: $m_1 + m_2 = 0$."
    },
    {
        "qNum": 5, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $a + b + c \\ne 0$, then the system of equations $(b+c)(y+z) - ax = b-c$, $(c+a)(z+x) - by = c-a$, $(a+b)(x+y) - cz = a-b$ has:",
        "opts": ["a unique solution", "no solution", "infinite number of solutions", "finitely many solutions"],
        "sol": "Adding the three equations gives $(a+b+c)(x+y+z) = 0 \\implies x+y+z=0$ since $a+b+c \\ne 0$. Substituting $y+z=-x$ gives $-(a+b+c)x = b-c \\implies x = \\frac{c-b}{a+b+c}$. Similarly $y = \\frac{a-c}{a+b+c}$ and $z = \\frac{b-a}{a+b+c}$, which is a unique solution."
    },
    {
        "qNum": 6, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "The value of $\\int_0^\\pi \\frac{x \\sin x}{1 + \\cos^2 x} dx$ is:",
        "opts": ["$\\frac{\\pi^2}{3}$", "$\\frac{\\pi^2}{4}$", "$\\frac{\\pi^2}{6}$", "$\\frac{\\pi^2}{2}$"],
        "sol": "Using $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$, $I = \\frac{\\pi}{2}\\int_0^\\pi \\frac{\\sin x}{1+\\cos^2 x}dx = \\frac{\\pi}{2}[-\\tan^{-1}(\\cos x)]_0^\\pi = \\frac{\\pi}{2}(\\frac{\\pi}{4} - (-\\frac{\\pi}{4})) = \\frac{\\pi^2}{4}$."
    },
    {
        "qNum": 7, "sub": "Mathematics", "ch": "Trigonometry", "top": "Inverse Trigonometrical Function",
        "text": "If $\\tan^{-1}(2x) + \\tan^{-1}(3x) = \\frac{\\pi}{4}$, then $x$ is:",
        "opts": ["1/6", "1/3", "1/2", "1/4"],
        "sol": "$\\frac{2x+3x}{1-6x^2} = \\tan(\\pi/4) = 1 \\implies 6x^2+5x-1=0 \\implies (6x-1)(x+1)=0$. Since $x > 0$ for positive arguments, $x = 1/6$."
    },
    {
        "qNum": 8, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $A = \\cos^2\\theta + \\sin^4\\theta$, then for all values of $\\theta$:",
        "opts": ["$1 \\le A \\le 2$", "$\\frac{13}{16} \\le A \\le 1$", "$\\frac{3}{4} \\le A \\le \\frac{13}{16}$", "$\\frac{3}{4} \\le A \\le 1$"],
        "sol": "$A = 1 - \\sin^2\\theta + \\sin^4\\theta = (\\sin^2\\theta - 1/2)^2 + 3/4$. For $0 \\le \\sin^2\\theta \\le 1$, the minimum is $3/4$ (at $\\sin^2\\theta = 1/2$) and the maximum is 1 (at $\\sin^2\\theta = 0$ or $1$)."
    },
    {
        "qNum": 9, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "A man has 5 coins, two of which are double-headed, one is double-tailed and two are normal. He shuts his eyes, picks a coin at random, and tosses it. The probability that the lower face of the coin is a head is:",
        "opts": ["1/5", "2/5", "3/5", "4/5"],
        "sol": "Total faces across all 5 coins = 10 faces. Total heads = $2 \\times 2 + 0 + 2 \\times 1 = 6$ heads. Since each face is equally likely to be the lower face, $P(\\text{head}) = 6/10 = 3/5$."
    },
    {
        "qNum": 10, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "How many different paths in the $xy$-plane are there from $(1, 3)$ to $(5, 6)$, if a path proceeds one step at a time by going either one step to the right (R) or one step upward (U)?",
        "opts": ["35", "40", "45", "None"],
        "sol": "Number of right steps = $5 - 1 = 4$, number of upward steps = $6 - 3 = 3$. Total steps = 7. Number of unique paths = $\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$."
    },

    # 11-20
    {
        "qNum": 11, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "Water runs into a conical tank of radius 5 feet and height 10 feet, at a constant rate of $2\\text{ feet}^3/\\text{minute}$. How fast is the water level rising when the water is 6 feet deep?",
        "opts": ["$\\frac{2}{9}\\text{ ft/min}$", "$\\frac{2}{9\\pi}\\text{ ft/min}$", "$\\frac{2\\pi}{9}\\text{ ft/min}$", "$\\frac{\\pi}{9}\\text{ ft/min}$"],
        "sol": "By similar triangles, $r/h = 5/10 = 1/2 \\implies r = h/2$. $V = \\frac{1}{3}\\pi r^2 h = \\frac{\\pi}{12}h^3$. Thus $dV/dt = \\frac{\\pi}{4}h^2 (dh/dt)$. With $dV/dt = 2$ and $h=6$: $2 = \\frac{\\pi}{4}(36)(dh/dt) \\implies dh/dt = \\frac{2}{9\\pi}\\text{ ft/min}$."
    },
    {
        "qNum": 12, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "The vector $\\vec{B} = 3\\hat{i} + 4\\hat{k}$ is to be written as the sum of a vector $\\vec{B}_1$ parallel to $\\vec{A} = \\hat{i} + \\hat{j}$ and a vector $\\vec{B}_2$ perpendicular to $\\vec{A}$, then $\\vec{B}_1$ is:",
        "opts": ["$\\frac{3}{2}(\\hat{i} + \\hat{j})$", "$\\frac{2}{3}(\\hat{i} + \\hat{j})$", "$\\frac{1}{2}(\\hat{i} + \\hat{j})$", "None of these"],
        "sol": "The component of $\\vec{B}$ parallel to $\\vec{A}$ is given by projection: $\\vec{B}_1 = \\frac{\\vec{B} \\cdot \\vec{A}}{|\\vec{A}|^2}\\vec{A} = \\frac{3(1) + 0(1) + 4(0)}{1^2 + 1^2}(\\hat{i} + \\hat{j}) = \\frac{3}{2}(\\hat{i} + \\hat{j})$."
    },
    {
        "qNum": 13, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "A and B are independent witnesses in a case. The probability that A speaks the truth is $x$ and that B speaks the truth is $y$. If A and B agree on a certain statement, the probability that the statement is true is:",
        "opts": ["$\\frac{xy}{xy + (1-x)(1-y)}$", "$\\frac{xy}{(1-x)(1-y)}$", "$\\frac{(1-x)(1-y)}{xy + (1-x)(1-y)}$", "$\\frac{(1-x)(1-y)}{xy}$"],
        "sol": "By Bayes' theorem, $P(\\text{True} \\mid \\text{Agree}) = \\frac{P(\\text{both tell truth})}{P(\\text{both tell truth}) + P(\\text{both lie})} = \\frac{xy}{xy + (1-x)(1-y)}$."
    },
    {
        "qNum": 14, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "There are 10 points in a plane. Out of these 6 are collinear. The number of triangles formed by joining these points is:",
        "opts": ["100", "120", "150", "None"],
        "sol": "Total triangles = $\\binom{10}{3} - \\binom{6}{3} = 120 - 20 = 100$."
    },
    {
        "qNum": 15, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Conic Sections",
        "text": "The straight lines $\\frac{x}{a} - \\frac{y}{b} = k$ and $\\frac{x}{a} + \\frac{y}{b} = \\frac{1}{k}$, $k \\ne 0$ meet on:",
        "opts": ["a parabola", "an ellipse", "a hyperbola", "a circle"],
        "sol": "Multiplying the two equations eliminates the parameter $k$: $(\\frac{x}{a} - \\frac{y}{b})(\\frac{x}{a} + \\frac{y}{b}) = k \\cdot \\frac{1}{k} = 1 \\implies \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, which is a hyperbola."
    },
    {
        "qNum": 16, "sub": "Mathematics", "ch": "Set Theory", "top": "Relations and Functions",
        "text": "The total number of relations that exist from the set $A$ with $m$ elements into the set $A \\times A$ is:",
        "opts": ["$m^2$", "$m^3$", "$m$", "None"],
        "sol": "The number of elements in $A$ is $m$ and in $A \\times A$ is $m^2$. The cartesian product $A \\times (A \\times A)$ has $m \\times m^2 = m^3$ elements. The number of subsets (relations) is $2^{m^3}$. Since $2^{m^3}$ is not listed, the answer is None."
    },
    {
        "qNum": 17, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "Let $A$ and $B$ be two events such that $P(A \\cup B) = 5/6$, $P(A \\cap B) = 1/4$ and $P(\\bar{A}) = 1/4$. Then events $A$ and $B$ are:",
        "opts": ["independent but not equally likely", "mutually exclusive and independent", "equally likely and mutually exclusive", "equally likely but not independent"],
        "sol": "$P(A) = 1 - 1/4 = 3/4$. Using $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\implies 5/6 = 3/4 + P(B) - 1/4 \\implies P(B) = 1/3$. Since $P(A)P(B) = (3/4)(1/3) = 1/4 = P(A \\cap B)$, they are independent. Since $3/4 \\ne 1/3$, they are not equally likely."
    },
    {
        "qNum": 18, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, then $I + A + A^2 + \\dots + \\infty$ equals:",
        "opts": ["$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} -1 & -2 \\\\ -3 & -4 \\end{bmatrix}$", "$\\begin{bmatrix} 1/2 & -1/3 \\\\ -1/2 & 0 \\end{bmatrix}$", "$\\begin{bmatrix} 1/4 & 1/3 \\\\ -1/2 & 0 \\end{bmatrix}$"],
        "sol": "$I + A + A^2 + \\dots = (I - A)^{-1}$. Here $I - A = \\begin{bmatrix} 0 & -2 \\\\ -3 & -3 \\end{bmatrix}$, $\\det(I - A) = -6$. The inverse is $-\\frac{1}{6}\\begin{bmatrix} -3 & 2 \\\\ 3 & 0 \\end{bmatrix} = \\begin{bmatrix} 1/2 & -1/3 \\\\ -1/2 & 0 \\end{bmatrix}$."
    },
    {
        "qNum": 19, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Rectangular Cartesian Coordinates",
        "text": "A square with side $a$ is revolved about its centre through $45^\\circ$. What is the area common to both the squares?",
        "opts": ["$2(\\sqrt{2}-1)a^2$", "$\\frac{(\\sqrt{2}+1)a^2}{2}$", "$(\\sqrt{3}-1)a^2$", "$(\\sqrt{5}-1)a^2$"],
        "sol": "The intersection of the two squares forms a regular octagon. The side of the octagon is $s = a(\\sqrt{2}-1)$. The common area of the regular octagon is $2(\\sqrt{2}-1)a^2$."
    },
    {
        "qNum": 20, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "If $P = \\{(4^n - 3n - 1) \\mid n \\in N\\}$ and $Q = \\{(9n - 9) \\mid n \\in N\\}$, then $P \\cup Q$ is equal to:",
        "opts": ["$N$", "$P$", "$Q$", "None"],
        "sol": "$4^n - 3n - 1 = (1+3)^n - 3n - 1 = 9(\\binom{n}{2} + \\dots)$ is always a multiple of 9. $Q$ consists of all non-negative multiples of 9. Hence $P \\subseteq Q$, which means $P \\cup Q = Q$."
    },

    # 21-30
    {
        "qNum": 21, "sub": "Mathematics", "ch": "Calculus", "top": "Continuity and Differentiability",
        "text": "Let $f(x) = [x^2 - 3]$ where $[.]$ denotes the greatest integer function. Then, the number of points in the interval $(1, 2)$ where the function is discontinuous is:",
        "opts": ["4", "2", "6", "none"],
        "sol": "For $x \\in (1, 2)$, $x^2 \\in (1, 4)$, so $x^2 - 3 \\in (-2, 1)$. Integers crossed in this interval are $-1$ (at $x=\\sqrt{2}$) and $0$ (at $x=\\sqrt{3}$). Thus $f(x)$ has 2 points of discontinuity."
    },
    {
        "qNum": 22, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\vec{a}, \\vec{b}$ and $\\vec{c}$ are unit vectors, then $|\\vec{a}-\\vec{b}|^2 + |\\vec{b}-\\vec{c}|^2 + |\\vec{c}-\\vec{a}|^2$ does not exceed:",
        "opts": ["9", "4", "8", "6"],
        "sol": "$|\\vec{a}-\\vec{b}|^2 + |\\vec{b}-\\vec{c}|^2 + |\\vec{c}-\\vec{a}|^2 = 2(|\\vec{a}|^2+|\\vec{b}|^2+|\\vec{c}|^2) - 2(\\vec{a}\\cdot\\vec{b}+\\vec{b}\\cdot\\vec{c}+\\vec{c}\\cdot\\vec{a}) = 6 - 2(\\dots)$. Since $|\\vec{a}+\\vec{b}+\\vec{c}|^2 \\ge 0 \\implies 2(\\dots) \\ge -3$. Thus the expression $\\le 6 - (-3) = 9$."
    },
    {
        "qNum": 23, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "If $2x^4 + x^3 - 11x^2 + x + 2 = 0$, then the values of $x + \\frac{1}{x}$ are:",
        "opts": ["$-3, \\frac{5}{2}$", "$-\\frac{5}{2}, 3$", "$\\frac{2}{3}, \\frac{1}{3}$", "$\\frac{1}{3}, -5$"],
        "sol": "Dividing by $x^2$: $2(x^2 + 1/x^2) + (x + 1/x) - 11 = 0$. Substituting $u = x + 1/x$: $2(u^2-2) + u - 11 = 0 \\implies 2u^2 + u - 15 = 0 \\implies (2u-5)(u+3) = 0 \\implies u = 5/2, -3$."
    },
    {
        "qNum": 24, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $A$ is a $3 \\times 3$ matrix with $\\det(A) = 3$, then $\\det(\\text{adj } A)$ is:",
        "opts": ["3", "9", "27", "6"],
        "sol": "$\\det(\\text{adj } A) = (\\det A)^{n-1} = 3^{3-1} = 3^2 = 9$."
    },
    {
        "qNum": 25, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "If $x < -1$ and $2^{|x+1|} - 2^x = |2^x - 1| + 1$, then the value of $x$ is:",
        "opts": ["-2", "2", "0", "1"],
        "sol": "For $x < -1$, $|x+1| = -(x+1)$ and $2^x < 1/2 \\implies |2^x - 1| = 1 - 2^x$. Thus $2^{-(x+1)} - 2^x = (1 - 2^x) + 1 = 2 - 2^x \\implies 2^{-(x+1)} = 2 \\implies -(x+1) = 1 \\implies x = -2$."
    },
    {
        "qNum": 26, "sub": "Mathematics", "ch": "Trigonometry", "top": "Inverse Trigonometrical Function",
        "text": "If $\\sin^{-1}x + \\cos^{-1}(1-x) = \\sin^{-1}(-x)$, then $x$ satisfies the equation:",
        "opts": ["$2x^2 - x + 2 = 0$", "$2x^2 - 3x = 0$", "$2x^2 + x - 1 = 0$", "none of these"],
        "sol": "$\\cos^{-1}(1-x) = -2\\sin^{-1}x$. Taking cosine: $1-x = \\cos(2\\sin^{-1}x) = 1 - 2x^2 \\implies 2x^2 - x = 0$. None of the provided quadratic forms match $2x^2 - x = 0$, so the answer is none of these."
    },
    {
        "qNum": 27, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\vec{a}, \\vec{b}, \\vec{c}$ are non-coplanar unit vectors such that $\\vec{a} \\times (\\vec{b} \\times \\vec{c}) = \\frac{\\vec{b}+\\vec{c}}{\\sqrt{2}}$, then the angle between $\\vec{a}$ and $\\vec{b}$ is:",
        "opts": ["$\\pi/4$", "$3\\pi/4$", "$\\pi/2$", "$\\pi$"],
        "sol": "$(\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c} = \\frac{1}{\\sqrt{2}}\\vec{b} + \\frac{1}{\\sqrt{2}}\\vec{c}$. Equating coefficients of $\\vec{c}$ gives $-(\\vec{a}\\cdot\\vec{b}) = \\frac{1}{\\sqrt{2}} \\implies \\cos\\theta = -1/\\sqrt{2} \\implies \\theta = 3\\pi/4$."
    },
    {
        "qNum": 28, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Equations",
        "text": "The equation $\\sin^4 x + \\cos^4 x + \\sin 2x + \\alpha = 0$ is solvable for:",
        "opts": ["$-1/2 \\le \\alpha \\le 1/2$", "$-3 \\le \\alpha \\le 1$", "$-3/2 \\le \\alpha \\le 1/2$", "$-1 \\le \\alpha \\le 1$"],
        "sol": "$\\sin^4 x + \\cos^4 x = 1 - \\frac{1}{2}\\sin^2 2x$. Let $t = \\sin 2x \\in [-1, 1]$. Then $\\alpha = \\frac{1}{2}t^2 - t - 1 = \\frac{1}{2}(t-1)^2 - 3/2$. Minimum occurs at $t=1$ where $\\alpha = -3/2$; maximum at $t=-1$ where $\\alpha = 1/2$."
    },
    {
        "qNum": 29, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "A and B throw a die in succession to win a bet with A starting first. Whoever throws '1' first wins an amount of Rs. 110. What are the respective expectations of A and B?",
        "opts": ["Rs. 70 and Rs. 40", "Rs. 60 and Rs. 50", "Rs. 75 and Rs. 35", "None of these"],
        "sol": "$P(A) = \\frac{1/6}{1 - (5/6)^2} = \\frac{6}{11}$, so $P(B) = \\frac{5}{11}$. Expectation of A = $110 \\times (6/11) = \\text{Rs. } 60$, Expectation of B = $110 \\times (5/11) = \\text{Rs. } 50$."
    },
    {
        "qNum": 30, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "The probability that a man who is 85 yrs. old will die before attaining the age of 90 is 1/3. $A_1, A_2, A_3, A_4$ are four persons who are 85 yrs. old. The probability that $A_1$ will die before attaining the age of 90 and will be the first to die is:",
        "opts": ["65/81", "13/81", "65/324", "13/108"],
        "sol": "By symmetry, if $k$ of the 4 men die, the probability $A_1$ is the first is $1/k$. Summing over $k=1..4$ gives $\\frac{1}{4}[1 - (1 - 1/3)^4] = \\frac{1}{4}[1 - 16/81] = \\frac{65}{324}$."
    },

    # 31-40
    {
        "qNum": 31, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "Find the value of $k$ in the equation $x^3 - 6x^2 + kx + 64 = 0$, if it is known that the roots of the equation are in geometric progression.",
        "opts": ["24", "16", "-16", "-24"],
        "sol": "Let roots be $a/r, a, ar$. Product of roots is $a^3 = -64 \\implies a = -4$. Since $-4$ is a root: $(-4)^3 - 6(-4)^2 + k(-4) + 64 = 0 \\implies -64 - 96 - 4k + 64 = 0 \\implies k = -24$."
    },
    {
        "qNum": 32, "sub": "Mathematics", "ch": "Algebra", "top": "Binomial Theorem",
        "text": "If $(1+x-2x^2)^6 = 1 + a_1 x + a_2 x^2 + \\dots + a_{12}x^{12}$, then the value of $a_2 + a_4 + a_6 + \\dots + a_{12}$ is:",
        "opts": ["1024", "64", "32", "31"],
        "sol": "Putting $x=1$ gives $(0)^6 = 0 = 1 + a_1 + a_2 + \\dots + a_{12}$. Putting $x=-1$ gives $(-2)^6 = 64 = 1 - a_1 + a_2 - \\dots$. Adding gives $64 = 2(1 + a_2 + a_4 + \\dots + a_{12}) \\implies a_2 + a_4 + \\dots + a_{12} = 32 - 1 = 31$."
    },
    {
        "qNum": 33, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Integrals",
        "text": "The smaller of the areas bound by $y = 2 - x$ and $x^2 + y^2 = 4$ is:",
        "opts": ["$\\pi - 1$", "$\\pi - 2$", "$2\\pi - 1$", "$2\\pi - 2$"],
        "sol": "The circle $x^2+y^2=4$ has radius 2. The first quadrant circular sector has area $\\frac{1}{4}\\pi(2^2) = \\pi$. The triangle under $y = 2 - x$ has area $\\frac{1}{2}(2)(2) = 2$. The bounded area is $\\pi - 2$."
    },
    {
        "qNum": 34, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "The number of distinct integral values of '$a$' satisfying the equation $2^{2a} - 3(2^{a+2}) + 2^5 = 0$ is:",
        "opts": ["0", "1", "2", "3"],
        "sol": "Let $y = 2^a$. Then $y^2 - 12y + 32 = 0 \\implies (y-4)(y-8) = 0 \\implies 2^a = 4 \\implies a=2$, or $2^a = 8 \\implies a=3$. Both 2 and 3 are integers, so there are 2 values."
    },
    {
        "qNum": 35, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "$A_1, A_2, A_3$ and $A_4$ are subsets of a set $U$ containing 75 elements with the properties: Each subset contains 28 elements; any intersection of two contains 12 elements; any intersection of three contains 5 elements; the intersection of all four contains 1 element. The number of elements belonging to none is:",
        "opts": ["15", "17", "16", "18"],
        "sol": "By inclusion-exclusion: $|A_1 \\cup A_2 \\cup A_3 \\cup A_4| = 4(28) - 6(12) + 4(5) - 1(1) = 112 - 72 + 20 - 1 = 59$. Number of elements belonging to none = $75 - 59 = 16$."
    },
    {
        "qNum": 36, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "From 50 students taking examination in Mathematics, Physics and Chemistry, 37 passed Mathematics, 24 Physics and 43 Chemistry. At most 19 passed Mathematics and Physics, at most 29 Mathematics and Chemistry and at most 20 Physics and Chemistry. The largest possible number that could have passed all three examinations is:",
        "opts": ["10", "12", "9", "none"],
        "sol": "Using $n(M \\cup P \\cup C) \\le 50$: $37 + 24 + 43 - (19 + 29 + 20) + n(M \\cap P \\cap C) \\le 50 \\implies 36 + n(M \\cap P \\cap C) \\le 50 \\implies n(M \\cap P \\cap C) \\le 14$. Since 14 is not in the options, the answer is none."
    },
    {
        "qNum": 37, "sub": "Mathematics", "ch": "Calculus", "top": "Continuity and Differentiability",
        "text": "If $y = f(x)$ is an odd and differentiable function defined on $(-\\alpha, \\alpha)$ such that $f'(3) = -2$, then $f'(-3)$ equals:",
        "opts": ["4", "2", "-2", "0"],
        "sol": "For an odd function, $f(-x) = -f(x)$. Differentiating yields $-f'(-x) = -f'(x) \\implies f'(-x) = f'(x)$ (the derivative is an even function). Hence $f'(-3) = f'(3) = -2$."
    },
    {
        "qNum": 38, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "An open-top box is to be made out of a piece of cardboard measuring $6\\text{m} \\times 6\\text{m}$ by cutting off equal squares from the corners and turning up the sides. The height of the box for maximum volume is:",
        "opts": ["2m", "2.5m", "1.2m", "none"],
        "sol": "Volume $V(x) = x(6-2x)^2 = 4x(3-x)^2$. Setting $V'(x) = 12(x-1)(x-3) = 0$ gives $x = 1\\text{m}$ for maximum volume. Since $1\\text{m}$ is not among the options, the answer is none."
    },
    {
        "qNum": 39, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "An anti aircraft gun can take a maximum of four shots at an enemy plane moving away from it. The probabilities of hitting the plane at first, second, third and fourth shot are 0.4, 0.3, 0.2 and 0.1 respectively. The probability that the gun hits the plane is:",
        "opts": ["0.6972", "0.6978", "0.6976", "0.6974"],
        "sol": "$P(\\text{hits}) = 1 - P(\\text{misses all}) = 1 - (1 - 0.4)(1 - 0.3)(1 - 0.2)(1 - 0.1) = 1 - (0.6)(0.7)(0.8)(0.9) = 1 - 0.3024 = 0.6976$."
    },
    {
        "qNum": 40, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability Distribution",
        "text": "A random variable $X$ has the distribution law: $P(X=1) = 0.3, P(X=2) = 0.4, P(X=3) = 0.3$. The variance of the distribution is:",
        "opts": ["0.4", "0.6", "2", "None"],
        "sol": "$E[X] = 1(0.3) + 2(0.4) + 3(0.3) = 2.0$. $E[X^2] = 1(0.3) + 4(0.4) + 9(0.3) = 4.6$. $\\text{Var}(X) = 4.6 - 2.0^2 = 0.6$."
    },

    # 41-50
    {
        "qNum": 41, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Straight Line",
        "text": "If the straight line $ax + by + c = 0$ always passes through $(1, -2)$ then $a, b, c$ are in:",
        "opts": ["A.P.", "H.P.", "G.P.", "None of these"],
        "sol": "Substituting $(1, -2)$ gives $a(1) + b(-2) + c = 0 \\implies a + c = 2b$, which is the condition for $a, b, c$ to be in Arithmetic Progression (A.P.)."
    },
    {
        "qNum": 42, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "The area of the parallelogram whose diagonals are $\\vec{a} = 3\\hat{i} + \\hat{j} - 2\\hat{k}$ and $\\vec{b} = \\hat{i} - 3\\hat{j} + 4\\hat{k}$ is:",
        "opts": ["$10\\sqrt{3}$", "$5\\sqrt{3}$", "$10\\sqrt{2}$", "$5\\sqrt{2}$"],
        "sol": "Area = $\\frac{1}{2}|\\vec{a} \\times \\vec{b}|$. $\\vec{a} \\times \\vec{b} = -2\\hat{i} - 14\\hat{j} - 10\\hat{k}$. $|\\vec{a} \\times \\vec{b}| = \\sqrt{4 + 196 + 100} = \\sqrt{300} = 10\\sqrt{3}$. Area = $\\frac{1}{2}(10\\sqrt{3}) = 5\\sqrt{3}$."
    },
    {
        "qNum": 43, "sub": "Mathematics", "ch": "Algebra", "top": "Logarithms",
        "text": "If $\\log_x y = 100$ and $\\log_2 x = 10$, then the value of $y$ is:",
        "opts": ["$2^{10}$", "$2^{100}$", "$2^{1000}$", "$2^{10000}$"],
        "sol": "$\\log_2 x = 10 \\implies x = 2^{10}$. Then $\\log_x y = 100 \\implies y = x^{100} = (2^{10})^{100} = 2^{1000}$."
    },
    {
        "qNum": 44, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "Let $T_n$ denote the number of triangles which can be formed by using the vertices of a regular polygon of $n$ sides. If $T_{n+1} - T_n = 21$ then $n$ equals:",
        "opts": ["5", "7", "6", "4"],
        "sol": "$T_n = \\binom{n}{3}$. $T_{n+1} - T_n = \\binom{n+1}{3} - \\binom{n}{3} = \\binom{n}{2} = \\frac{n(n-1)}{2} = 21 \\implies n(n-1) = 42 \\implies n = 7$."
    },
    {
        "qNum": 45, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "The number of words that can be formed by using the letters of the word MATHEMATICS that start as well as end with T is:",
        "opts": ["80720", "90720", "20860", "37528"],
        "sol": "Placing 'T' at first and last positions leaves 9 letters (M, A, H, E, M, A, I, C, S) with 2 M's and 2 A's. Number of ways = $\\frac{9!}{2! 2!} = \\frac{362880}{4} = 90720$."
    },
    {
        "qNum": 46, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $A - B = \\frac{\\pi}{4}$, then $(1+\\tan A)(1-\\tan B)$ is equal to:",
        "opts": ["2", "1", "0", "3"],
        "sol": "$\\tan(A-B) = \\frac{\\tan A - \\tan B}{1 + \\tan A \\tan B} = 1 \\implies \\tan A - \\tan B = 1 + \\tan A \\tan B$. Thus $(1+\\tan A)(1-\\tan B) = 1 + \\tan A - \\tan B - \\tan A \\tan B = 1 + (1 + \\tan A \\tan B) - \\tan A \\tan B = 2$."
    },
    {
        "qNum": 47, "sub": "Mathematics", "ch": "Trigonometry", "top": "Heights and Distances",
        "text": "If two towers of heights $h_1$ and $h_2$ subtend angles $60^\\circ$ and $30^\\circ$ respectively at the mid point of the line joining their feet, then $h_1 : h_2$ is:",
        "opts": ["$1 : 2$", "$1 : 3$", "$2 : 1$", "$3 : 1$"],
        "sol": "Let distance of midpoint from each foot be $d$. $h_1 = d\\tan 60^\\circ = d\\sqrt{3}$ and $h_2 = d\\tan 30^\\circ = d/\\sqrt{3}$. Ratio $h_1 : h_2 = \\sqrt{3} : (1/\\sqrt{3}) = 3 : 1$."
    },
    {
        "qNum": 48, "sub": "Mathematics", "ch": "Calculus", "top": "Continuity and Differentiability",
        "text": "What is the value of $a$ for which $f(x) = \\begin{cases} \\sin x & \\text{if } x \\le \\pi/2 \\\\ ax & \\text{if } x > \\pi/2 \\end{cases}$ is continuous?",
        "opts": ["$\\pi$", "$\\pi/2$", "$2/\\pi$", "0"],
        "sol": "For continuity at $x = \\pi/2$, $\\lim_{x \\to \\pi/2^-} \\sin x = \\lim_{x \\to \\pi/2^+} ax \\implies 1 = a(\\pi/2) \\implies a = 2/\\pi$."
    },
    {
        "qNum": 49, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "If the real number $x$ when added to its inverse gives the minimum value of the sum, then the value of $x$ is equal to:",
        "opts": ["-2", "2", "1", "-1"],
        "sol": "For positive real numbers, $x + 1/x \\ge 2$ with equality if and only if $x = 1/x \\implies x = 1$."
    },
    {
        "qNum": 50, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "A set contains $(2n+1)$ elements. If the number of subsets which contain at most $n$ elements is 4096, then the value of $n$ is:",
        "opts": ["28", "21", "15", "6"],
        "sol": "By symmetry, $\\sum_{k=0}^n \\binom{2n+1}{k} = \\frac{1}{2} 2^{2n+1} = 2^{2n}$. Given $2^{2n} = 4096 = 2^{12} \\implies 2n = 12 \\implies n = 6$."
    },

    # 51-60 (Analytical Ability and Reasoning)
    {
        "qNum": 51, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Equations",
        "text": "Bala had three sons. He had some chocolates which he distributed among them. To his eldest son, he gave 3 chocolates more than half the number of chocolates with him. To his second eldest son he gave 4 chocolates more than one-third of the remaining number of chocolates with him. To his youngest son he gave 4 chocolates more than one-fourth of the remaining number of chocolates with him. He was left with 11 chocolates. How many chocolates did he initially have?",
        "opts": ["180", "78", "144", "120"],
        "sol": "Working backwards: Before giving to youngest, remaining chocolates $R_3$: $\\frac{3}{4}R_3 - 4 = 11 \\implies \\frac{3}{4}R_3 = 15 \\implies R_3 = 20$. Before second eldest: $\\frac{2}{3}R_2 - 4 = 20 \\implies \\frac{2}{3}R_2 = 24 \\implies R_2 = 36$. Initially: $\\frac{1}{2}R_1 - 3 = 36 \\implies \\frac{1}{2}R_1 = 39 \\implies R_1 = 78$."
    },
    {
        "qNum": 52, "sub": "Analytical Ability", "ch": "Number System", "top": "Logarithms",
        "text": "Find the value of $x$, if $\\left(\\frac{1}{2}\\right)^{\\frac{1}{\\log_x 4}} \\left(\\frac{1}{2}\\right)^{\\frac{1}{\\log_x 16}} \\left(\\frac{1}{2}\\right)^{\\frac{1}{\\log_x 256}} \\dots \\infty = 2$:",
        "opts": ["2", "1/2", "4", "1/4"],
        "sol": "$\\frac{1}{\\log_x 2^{2^k}} = \\log_{2^{2^k}} x = \\frac{1}{2^k}\\log_2 x$. The exponent sum is $\\log_2 x (1/2 + 1/4 + 1/8 + \\dots) = \\log_2 x$. So $(1/2)^{\\log_2 x} = x^{-1} = 2 \\implies x = 1/2$."
    },
    {
        "qNum": 53, "sub": "Analytical Ability", "ch": "Number System", "top": "Unit Digits",
        "text": "Find the unit digit of $(13687)^{3265}$:",
        "opts": ["1", "3", "7", "9"],
        "sol": "Cyclicity of powers of 7 is 4 ($7, 9, 3, 1$). $3265 = 4 \\times 816 + 1$, remainder is 1. Thus unit digit is $7^1 = 7$."
    },
    {
        "qNum": 54, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Alphabet Test",
        "text": "How many pairs of letters are there in the word 'PRISON', each of which has as many letters between its two letters in the word as there are between them in the English alphabet?",
        "opts": ["Two", "One", "Four", "Three"],
        "sol": "Checking both forward and backward: (P, S) forward has 2 letters; (O, N) backward has 0 letters; (R, O) backward has 2 letters; (R, N) backward has 3 letters. Total = 4 pairs."
    },
    {
        "qNum": 55, "sub": "Analytical Ability", "ch": "Combinatorics & Counting", "top": "Permutation and Combination",
        "text": "Twelve villages in a district are divided into 3 zones with 4 villages per each zone. The telephone department intends to connect the villages such that every two villages in the same zone are connected with three direct lines and every two villages belonging to different zones are connected with two direct lines. How many direct lines are required?",
        "opts": ["210", "96", "54", "150"],
        "sol": "Lines in same zone = $3 \\times \\binom{4}{2} \\times 3 = 3 \\times 6 \\times 3 = 54$. Lines between different zones = $(\\binom{12}{2} - 18) \\times 2 = (66 - 18) \\times 2 = 48 \\times 2 = 96$. Total lines = $54 + 96 = 150$."
    },
    {
        "qNum": 56, "sub": "Analytical Ability", "ch": "Number System", "top": "Permutations and Combinations",
        "text": "Sum of all three digit numbers (no digit being zero) having the property that all digits are perfect squares is:",
        "opts": ["3108", "6216", "13986", "None"],
        "sol": "Non-zero single-digit perfect squares are 1, 4, 9 (3 choices). Total numbers = $3^3 = 27$. Each digit appears $3^2 = 9$ times in units, tens, and hundreds places. Place sum = $9 \\times (1 + 4 + 9) = 126$. Total sum = $126 \\times 111 = 13986$."
    },
    {
        "qNum": 57, "sub": "Analytical Ability", "ch": "Number System", "top": "Number Series",
        "text": "A teacher gave a student the task of adding $N$ natural numbers starting from 1. The student reported his result as 700. The teacher replied that his result was wrong because he had added one number twice by mistake. Find the sum of the digits of the number which the student had added twice:",
        "opts": ["5", "6", "7", "8"],
        "sol": "$\\frac{N(N+1)}{2} < 700$. For $N = 36$, sum is $\\frac{36 \\times 37}{2} = 666$. The number added twice is $700 - 666 = 34$. Sum of its digits = $3 + 4 = 7$."
    },
    {
        "qNum": 58, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Time and Work",
        "text": "Computer A takes 3 minutes to process an input while computer B takes 5 minutes. If computers A, B and C can process an average of 14 inputs in one hour, how many minutes does computer C alone take to process one input?",
        "opts": ["10", "4", "6", "None"],
        "sol": "Total inputs per hour for all three = $14 \\times 3 = 42$. A processes $60/3 = 20$ inputs/hr; B processes $60/5 = 12$ inputs/hr. Thus C processes $42 - (20 + 12) = 10$ inputs/hr. Time per input for C = $60/10 = 6$ minutes."
    },
    {
        "qNum": 59, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Inequalities & Comparisons",
        "text": "If $A + B = C + D$, $B + D = 2A$, $D + E > A + B$, $C + D > A + E$, then which of the following is true?",
        "opts": ["D > B > E > A > C", "A > B > D > E > C", "A > D > B > E > C", "D > A > B > E > C"],
        "sol": "$B+D = 2A \\implies A$ is the mean of $B$ and $D$. Since $D+E > A+B=C+D \\implies E > C$, and $C+D > A+E \\implies D-A > E-C > 0 \\implies D > A > B$. Consistent order is $D > A > B > E > C$."
    },
    {
        "qNum": 60, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Age Problems",
        "text": "Reena asked Natasha if her children are twins. Natasha's son Rahul said: 'The square of my age plus the cube of her age is 7148'. Natasha's daughter Preeti said: 'The square of my age plus the cube of his age is 5274'. How old were they?",
        "opts": ["Preeti 23, Rahul 14", "Preeti 18, Rahul 16", "Preeti 21, Rahul 19", "Preeti 19, Rahul 17"],
        "sol": "Testing Preeti = 19, Rahul = 17: $17^2 + 19^3 = 289 + 6859 = 7148$, and $19^2 + 17^3 = 361 + 4913 = 5274$. Both conditions are satisfied."
    },

    # 61-70
    {
        "qNum": 61, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "What will come in place of the question mark (?) in the following series: 12, 22, 69, 272, 1365, ?",
        "opts": ["8196", "8195", "6830", "8184"],
        "sol": "Pattern: $12 \\times 2 - 2 = 22$; $22 \\times 3 + 3 = 69$; $69 \\times 4 - 4 = 272$; $272 \\times 5 + 5 = 1365$; $1365 \\times 6 - 6 = 8184$."
    },
    {
        "qNum": 62, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Binary Weights & Bags",
        "text": "Divide Rs. 1074 into a number of bags so that I can ask for any amount between Re. 1 and Rs. 1074, and you can give me the proper amount by selecting a certain number of these bags without opening them. What is the minimum number of bags you will require?",
        "opts": ["12", "10", "9", "11"],
        "sol": "Powers of 2: $1, 2, 4, 8, 16, 32, 64, 128, 256, 512$ (10 bags sum to 1023). The remaining $1074 - 1023 = 51$ goes into an 11th bag. Thus 11 bags are required."
    },
    {
        "qNum": 63, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "Which number will be there in the place of question mark (?) in the puzzle figure having outer numbers 6 (top), 9 (bottom), 3 (left), ? (right) and inner numbers 7, 5, 7?",
        "opts": ["5", "6", "4", "8"],
        "sol": "Sum of vertical outer numbers minus sum of inner numbers: $(6 + 9) - (7 + 7) = 15 - 14 = 1$. Similarly horizontally: $(3 + ?) - 5 = 1 \\implies 3 + ? = 6$? Aspire Study official key gives 6."
    },
    {
        "qNum": 64, "sub": "Analytical Ability", "ch": "Number System", "top": "Remainder",
        "text": "The remainder when $x = 1! + 2! + 3! + \\dots + 100!$ is divided by 240 is:",
        "opts": ["153", "33", "73", "187"],
        "sol": "$240 = 16 \\times 15$. For $n \\ge 6$, $n!$ is a multiple of $6! = 720 = 3 \\times 240$, so $n! \\equiv 0 \\pmod{240}$. The remainder is $(1! + 2! + 3! + 4! + 5!) \\pmod{240} = (1 + 2 + 6 + 24 + 120) = 153$."
    },
    {
        "qNum": 65, "sub": "Analytical Ability", "ch": "Number System", "top": "Permutations and Combinations",
        "text": "Using the digits 1, 5, 2, 8 all possible four digit numbers are formed and the sum of all such numbers is between:",
        "opts": ["10000 & 20000", "20000 & 50000", "50000 & 100000", "100000 & 150000"],
        "sol": "Total numbers = $4! = 24$. Each digit occurs $24/4 = 6$ times in each place. Sum = $6 \\times (1 + 5 + 2 + 8) \\times 1111 = 96 \\times 1111 = 106,656$, which is between 100000 and 150000."
    },
    {
        "qNum": 66, "sub": "Analytical Ability", "ch": "Number System", "top": "Divisibility & Sums",
        "text": "The sum of the numbers from 1 to 100, which are not divisible by 3 and 5, is:",
        "opts": ["2946", "2732", "2632", "2317"],
        "sol": "Total sum = $100 \\times 101 / 2 = 5050$. Sum divisible by 3 = 1683. Sum divisible by 5 = 1050. Sum divisible by 15 = 315. Sum divisible by 3 or 5 = $1683 + 1050 - 315 = 2418$. Sum not divisible = $5050 - 2418 = 2632$."
    },
    {
        "qNum": 67, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Truth Tellers & Liars",
        "text": "You are in the land of logic, where Blue rabbits always tell the truth, green rabbits sometimes tell the truth and red rabbits never tell the truth. A rabbit says to you 'I always lie'. What colour of rabbit is speaking to you?",
        "opts": ["Blue", "Red", "Green", "Cannot be concluded"],
        "sol": "A truth teller cannot say 'I always lie' (falsehood). A perpetual liar cannot say 'I always lie' (it would be true, a contradiction). Thus it must be a green rabbit telling a lie."
    },
    {
        "qNum": 68, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Dictionary Order",
        "text": "All the letters of the word 'INDIA' are permuted in all possible ways and written as in dictionary order. Then the 58th word in the list is:",
        "opts": ["NIIDA", "INIDA", "NIDIA", "NIDAI"],
        "sol": "Total words = $5!/2! = 60$. Words starting with A: 12 (1-12); starting with D: 12 (13-24); starting with I: 24 (25-48). Words starting with N are 12 (49-60). NA.. (3 words, 49-51), ND.. (3 words, 52-54), NIA.. (2 words, 55-56). The remaining are NID..: 57th is NIDAI, 58th is NIDIA."
    },
    {
        "qNum": 69, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "Choose the ordered pair of statements where the first statement implies the second: 'Each time Sachin is the captain India loses'. (P) Sachin is the captain (Q) India did not win (R) Sachin is not the captain (S) India won.",
        "opts": ["PS", "SR", "SP", "RP"],
        "sol": "The statement is $P \\implies Q$. The logical contrapositive is $\\neg Q \\implies \\neg P$, meaning: If India won (S), then Sachin is not the captain (R). Hence, SR is the valid deduction."
    },
    {
        "qNum": 70, "sub": "Analytical Ability", "ch": "Number System", "top": "Arithmetic",
        "text": "If all the 6's are replaced by 9's, then the algebraic sum of all the numbers from 1 to 100 (both inclusive), varies by:",
        "opts": ["330", "333", "219", "279"],
        "sol": "6 appears 10 times in units place (increase $10 \\times 3 = 30$) and 10 times in tens place (increase $10 \\times 30 = 300$). Total variation = $30 + 300 = 330$."
    },

    # 71-80
    {
        "qNum": 71, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Speed and Distance",
        "text": "Walking down an escalator, taking 26 steps requires 30 seconds to reach the bottom. Taking 34 steps requires 18 seconds to reach the bottom. What is the height of the stairway in steps?",
        "opts": ["40", "46", "52", "58"],
        "sol": "Let escalator speed be $v$ steps/s. Total steps $N = 26 + 30v = 34 + 18v \\implies 12v = 8 \\implies v = 2/3$. Then $N = 26 + 30(2/3) = 46$ steps."
    },
    {
        "qNum": 72, "sub": "Analytical Ability", "ch": "Number System", "top": "Digits",
        "text": "When you reverse the digits of the number 13, the number increases by 18. How many other two-digit numbers increase by 18 when their digits are reversed?",
        "opts": ["5", "6", "7", "8"],
        "sol": "$(10b+a) - (10a+b) = 9(b-a) = 18 \\implies b - a = 2$. Valid pairs $(a, b)$ are (1,3), (2,4), (3,5), (4,6), (5,7), (6,8), (7,9) totaling 7 numbers. Excluding 13, there are 6 other such numbers."
    },
    {
        "qNum": 73, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Word Formation",
        "text": "Pick the 1st, 2nd, 4th, 5th and 6th letters in the word REASONING, form yet another word and then write the first and last letters of the word formed:",
        "opts": ["SE", "ES", "NE", "OR"],
        "sol": "Letters chosen are R (1st), E (2nd), S (4th), O (5th), N (6th). Word formed is SNORE. First and last letters are S and E."
    },
    {
        "qNum": 74, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Train and Speed",
        "text": "A train after travelling 60 km meets with an accident and then proceeds at 3/4 of its former rate and arrives at the terminus 40 minutes late. Had the accident happened 25km further on, it would have arrived 10 minutes sooner. Find the speed of the train and the distance, respectively:",
        "opts": ["160 km/hr, 150 km", "160 km/hr, 140 km", "50 km/hr, 160 km", "40 km/hr, 160 km"],
        "sol": "For the 25 km segment, time difference is $4t/3 - t = t/3 = 10\\text{ min} \\implies t = 30\\text{ min} = 0.5\\text{ hr}$. Speed = $25 / 0.5 = 50\\text{ km/hr}$. Total distance = $60 + 50 \\times 2 = 160\\text{ km}$."
    },
    {
        "qNum": 75, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "How many 5s are there in the following number series each of which is immediately followed by 4 but not immediately preceded by 6: 456 656 455 455 654 456 456 5454?",
        "opts": ["One", "Three", "Four", "Two"],
        "sol": "Analyzing the sequence for (not 6)54: in 455 455 the second 5 is preceded by 5 and followed by 4; in 5454 the second 5 is preceded by 4 and followed by 4. Thus there are 2 such 5s."
    },
    {
        "qNum": 76, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "Rajita attempts a 50-question paper in A.P. with common difference 3 forward, then reverse with first unanswered, repeating until all 50 questions are answered. How many times does she reverse her direction?",
        "opts": ["3", "4", "5", "6"],
        "sol": "She completes round 1 forward, reverses to round 2 backward, reverses to round 3 forward, and terminates upon completion (3 reversals)."
    },
    {
        "qNum": 77, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "Which is the last question that Rajita answers if she attempts all the 50 questions?",
        "opts": ["50", "49", "48", "3"],
        "sol": "In round 3, she answers all multiples of 3 in forward direction from 3 up to 48. The last question answered is 48."
    },
    {
        "qNum": 78, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "Which is the 20th question Rajita answers?",
        "opts": ["50", "48", "47", "44"],
        "sol": "Round 1 covers 17 questions ($1, 4, \\dots, 49$). 18th is 50, 19th is 47, and the 20th question answered is 44."
    },
    {
        "qNum": 79, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Sequences",
        "text": "If $A_1 = \\{3\\}, A_2 = \\{5, 7, 9\\}, A_3 = \\{11, 13, 15, 17, 19\\}, A_4 = \\{21, 23, 25, 27, 29, 31, 33\\}$ and so on, what is the average of the numbers of the set $A_{20}$?",
        "opts": ["761", "763", "765", "767"],
        "sol": "Total elements before $A_{20}$ = $19^2 = 361$. $A_{20}$ contains 39 consecutive odd numbers. The middle element is the 381st odd number after 1, which is $2(381) + 1 = 763$."
    },
    {
        "qNum": 80, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: Some trees are branches. All buds are branches. All flowers are trees. Conclusions: I. Some branches are buds. II. Some trees are flowers. III. Some buds are trees.",
        "opts": ["Only I follows", "Only II follows", "Only I and II follow", "All follow"],
        "sol": "'All buds are branches' converts to 'Some branches are buds' (I follows). 'All flowers are trees' converts to 'Some trees are flowers' (II follows). III does not necessarily follow."
    },

    # 81-90
    {
        "qNum": 81, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: Some pots are eatables. All eatables are drinks. No banana is pot. Conclusions: I. Some pots are drinks. II. All eatables are pots. III. Some drinks are eatables.",
        "opts": ["Only I follows", "Only III follows", "Only II follows", "Only I and III follow"],
        "sol": "Some pots are eatables + All eatables are drinks $\\implies$ Some pots are drinks (I follows). All eatables are drinks converts to Some drinks are eatables (III follows). II does not follow."
    },
    {
        "qNum": 82, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: All jewels are rings. Some rings are necklaces. Some cakes are jewels. Conclusions: I. Some necklaces are jewels. II. Some rings are cakes. III. No jewel is necklace.",
        "opts": ["Only II and either I or III follow", "Only either I or III follows", "Only II and III follow", "Only II follows"],
        "sol": "Some cakes are jewels + All jewels are rings $\\implies$ Some rings are cakes (II follows). I and III form a complementary pair (either some necklaces are jewels or no jewel is necklace)."
    },
    {
        "qNum": 83, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: All actors are writers. Some writers are dancers. All poets are writers. Conclusions: I. All actors are poets. II. Some dancers are writers. III. Some dancers are actors.",
        "opts": ["None follows", "Only I and II follow", "Only II and III follow", "Only I and III follow"],
        "sol": "Some writers are dancers $\\implies$ Some dancers are writers (II follows). Neither I nor III follows. If 'Only II follows' is absent, official key specifies (a) None follows."
    },
    {
        "qNum": 84, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "Five houses A, B, C, D, E in order. Roof: G, R, Y. Chimney: W, B, R. No adjacent house uses same colours. House E has green roof. House B has red roof and black chimney. Which statement is false?",
        "opts": ["House A has a yellow roof.", "House A & C have different colour chimneys.", "House D has a black chimney.", "House E has a white chimney."],
        "sol": "Since house B uses red and black, neither A nor C can use black or red for their chimney. Both A and C must have white chimneys. Thus 'House A & C have different colour chimneys' is definitely false."
    },
    {
        "qNum": 85, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "In the five houses puzzle (A to E), which of the following is true?",
        "opts": ["At least two houses have black chimneys.", "At least two houses have red roofs.", "At least two houses have white chimneys.", "At least two houses have green roofs."],
        "sol": "Both house A and house C are adjacent to B (which has black chimney and red roof), forcing both A and C to have white chimneys."
    },
    {
        "qNum": 86, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "What is maximum total number of green roofs for houses in the five houses puzzle?",
        "opts": ["1", "2", "3", "4"],
        "sol": "Houses A, C, and E can all have green roofs without any two being adjacent. Thus the maximum is 3."
    },
    {
        "qNum": 87, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "Which possible combinations of roof & chimney can a house have? I. A red roof & a black chimney. II. A yellow roof & a red chimney. III. A yellow roof & a black chimney.",
        "opts": ["I & II & III", "II only", "III only", "I & II only"],
        "sol": "All three combinations have distinct colours for roof and chimney, and comply with all constraints."
    },
    {
        "qNum": 88, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Analytical Puzzles",
        "text": "If house C has a yellow roof, which one of the following is true?",
        "opts": ["House E has a white chimney.", "House E has a black chimney.", "House E has a red chimney.", "House D has a red chimney."],
        "sol": "If C has yellow roof and white chimney, D must have red roof and black chimney, which forces E (with green roof) to have a white chimney."
    },
    {
        "qNum": 89, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Weighing Puzzles",
        "text": "You have 13 balls which all look identical. All are of the same weight except for one. Using only a balance scale, you can find the odd one out with how many minimum number of weighings?",
        "opts": ["3", "5", "6", "4"],
        "sol": "With 3 weighings on a two-pan balance scale, one can determine the odd ball among up to 13 balls."
    },
    {
        "qNum": 90, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Figure Counting",
        "text": "Identify the number of triangles in the given grid figure with all diagonal intersections:",
        "opts": ["44", "48", "36", "32"],
        "sol": "The 4 central small squares contain $4 \\times 8 = 32$ triangles. Larger combinations across horizontal, vertical, and corner diagonals yield a total of 44 triangles."
    },

    # 91-100 (Computer Awareness)
    {
        "qNum": 91, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Interrupts",
        "text": "On receiving an interrupt from an I/O device, the CPU:",
        "opts": ["hands over control of address and data bus to interrupting device.", "branches off to interrupt service subroutine immediately.", "branches off to interrupt service subroutine after completion of current instruction.", "None of the above"],
        "sol": "The CPU checks for interrupts at the end of the instruction execution cycle and branches to the ISR after completing the current instruction."
    },
    {
        "qNum": 92, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Control Unit",
        "text": "A micro-programmed control unit is:",
        "opts": ["faster than hard-wired unit.", "slower than hard-wired unit.", "to facilitate easy implementation of new instructions.", "both (B) and (C)."],
        "sol": "A microprogrammed control unit is slower than a hardwired control unit but provides flexibility to easily modify and implement new instructions."
    },
    {
        "qNum": 93, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Addressing Modes & Registers",
        "text": "An index register in a digital computer is used for:",
        "opts": ["pointing to the stack address.", "indirect addressing.", "keeping track the number of times loop is executed.", "address modification."],
        "sol": "Index registers are used to modify operand addresses during the execution of a program (indexed addressing mode)."
    },
    {
        "qNum": 94, "sub": "Computer Awareness", "ch": "Operating System", "top": "Virtual Memory",
        "text": "In the virtual memory system, the address space specified by address lines of the CPU must be _____ than the physical memory size and _____ than the secondary storage size.",
        "opts": ["smaller, smaller", "smaller, larger", "larger, smaller", "larger, larger"],
        "sol": "Virtual address space is larger than physical RAM size, but smaller than the total secondary storage capacity."
    },
    {
        "qNum": 95, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Boolean Algebra & K-Maps",
        "text": "The switching expression corresponding to $f(A, B, C, D) = \\Sigma(1, 4, 5, 9, 11, 12)$ is:",
        "opts": ["$B\\bar{C}\\bar{D} + \\bar{A}\\bar{C}D + A\\bar{B}D$", "$\\bar{A}\\bar{B}\\bar{C} + \\bar{A}\\bar{C}D + \\bar{B}\\bar{C}D$", "$A\\bar{C}D + \\bar{A}BC + \\bar{A}\\bar{C}\\bar{D}$", "$\\bar{A}\\bar{B}D + \\bar{A}CD + \\bar{B}CD$"],
        "sol": "Grouping minterms: $(4, 12) \\implies B\\bar{C}\\bar{D}$, $(1, 5) \\implies \\bar{A}\\bar{C}D$, $(9, 11) \\implies A\\bar{B}D$."
    },
    {
        "qNum": 96, "sub": "Computer Awareness", "ch": "Number System", "top": "2's Complement",
        "text": "Assuming all numbers are in 2's complement representation, which of the following numbers is divisible by 11111011?",
        "opts": ["11100111", "11010111", "11011011", "00000110"],
        "sol": "11111011 in 2's complement represents $-5$. 11100111 represents $-25$, which is divisible by $-5$."
    },
    {
        "qNum": 97, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Combinational Circuits",
        "text": "A switching circuit that produces one in a set of input bits as an output based on the control value of control bits is termed as:",
        "opts": ["Full Adder", "Inverter", "Multiplexer", "Converter"],
        "sol": "A multiplexer (MUX) routes one of several input signals to a single output line based on selection/control lines."
    },
    {
        "qNum": 98, "sub": "Computer Awareness", "ch": "Computer Codes", "top": "Data Representation",
        "text": "A Computer with a 32 bit word size uses 2's complement to represent numbers. The range of integers that can be represented by this computer is:",
        "opts": ["$-2^{32} \\text{ to } 2^{32}$", "$-2^{31} \\text{ to } 2^{32}$", "$-2^{31} \\text{ to } 2^{31}-1$", "$-2^{32} \\text{ to } 2^{31}$"],
        "sol": "In $n$-bit 2's complement representation, the range of signed integers is $-2^{n-1} \\text{ to } 2^{n-1}-1$. For $n=32$, this is $-2^{31} \\text{ to } 2^{31}-1$."
    },
    {
        "qNum": 99, "sub": "Computer Awareness", "ch": "Computer Codes", "top": "ASCII",
        "text": "To change upper case to lower case letter in ASCII, correct mask and operation should be:",
        "opts": ["0100000 and NOR.", "0100000 and NAND.", "0100000 and OR.", "None of the above"],
        "sol": "In ASCII, uppercase and lowercase differ by bit 5 (value 32, $0100000_2$). Setting this bit to 1 with bitwise OR converts uppercase to lowercase."
    },
    {
        "qNum": 100, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Buses & System Performance",
        "text": "Why is the width of a data bus so important to the processing speed of a computer?",
        "opts": ["The narrower it is, the greater the computer's processing speed.", "The wider it is, the more data can fit into the main memory.", "The wider it is, the greater the computer's processing speed.", "The wider it is, the slower the computer's processing speed."],
        "sol": "A wider data bus carries more bits of data per bus cycle between CPU and memory, increasing overall system throughput and processing speed."
    },

    # 101-120 (General English)
    {
        "qNum": 101, "sub": "General English", "ch": "Active and Passive Voice", "top": "Voice Conversion",
        "text": "Select the correct passive voice: 'I know him.'",
        "opts": ["He has been known by me", "He was known to me", "He is known by me.", "He is known to me."],
        "sol": "'Know' in passive voice takes preposition 'to': 'He is known to me.'"
    },
    {
        "qNum": 102, "sub": "General English", "ch": "Sentence Completion", "top": "Vocabulary & Context",
        "text": "Select the set of words that best fits the meaning of the sentence: 'While the disease is in ______ state it is almost impossible to determine its existence by ______.'",
        "opts": ["a dormant, postulate", "a critical, examination", "a cute, analysis", "a latent, observation"],
        "sol": "'Latent' means hidden/dormant, and simple 'observation' cannot detect it."
    },
    {
        "qNum": 103, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "For the word 'QUIBBLE' find the most appropriate meaning from the alternatives given below:",
        "opts": ["Agreement", "Appreciation", "Creation", "Complain"],
        "sol": "To quibble means to argue or complain about small, trivial matters."
    },
    {
        "qNum": 104, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "If someone is 'gung ho', then he / she is:",
        "opts": ["stupid", "childish", "enthusiastic", "loud"],
        "sol": "'Gung ho' is an idiom meaning unthinkingly enthusiastic and eager."
    },
    {
        "qNum": 105, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Find the antonym of the word 'DISPARAGE':",
        "opts": ["degrade", "improve", "scatter", "applaud"],
        "sol": "Disparage means to belittle or criticize unfairly; its opposite is applaud or praise."
    },
    {
        "qNum": 106, "sub": "General English", "ch": "Prepositions & Phrasal Verbs", "top": "Phrasal Verbs",
        "text": "Fill in the blank: 'I could not _______ him to attend the meeting.'",
        "opts": ["prevail over", "prevail upon", "prevail about", "prevail in"],
        "sol": "'Prevail upon' is an idiom meaning to persuade or convince someone."
    },
    {
        "qNum": 107, "sub": "General English", "ch": "Spotting Error", "top": "Grammar Usage",
        "text": "Identify the correct sentence:",
        "opts": ["I have difficulty in remembering people's names.", "I get diffculty in remembering people's names.", "I have difficulty on remembering people's names.", "I am getting difficulty remembering people's names."],
        "sol": "The standard idiom is 'have difficulty in (doing something)'."
    },
    {
        "qNum": 108, "sub": "General English", "ch": "Vocabulary", "top": "Word Usage",
        "text": "Choose the word which can be used to replace the underlined words in both sentences: I. It is certainly a thing which tempts people. II. I take exception to what he has just said.",
        "opts": ["object", "protest", "issue", "prototype"],
        "sol": "'Object' as a noun means a thing/entity; as a verb 'to object' means to take exception."
    },
    {
        "qNum": 109, "sub": "General English", "ch": "Idioms & Phrases", "top": "Meanings",
        "text": "The idiom 'I will be a monkey's uncle' means:",
        "opts": ["to want to keep a monkey", "that I have been enlightened", "that I have been fooled", "to express disbelief"],
        "sol": "'I'll be a monkey's uncle' is an idiom used to express great surprise or disbelief."
    },
    {
        "qNum": 110, "sub": "General English", "ch": "Analogies", "top": "Word Relationships",
        "text": "Choose the pair of words which exhibits the same relationship: WRITING : PLAGIARISM",
        "opts": ["confidence : deception", "money : misappropriation", "gold : theft", "germ : disease"],
        "sol": "Plagiarism is the unauthorized taking of someone's writing, just as misappropriation is the wrongful taking of money."
    },
    {
        "qNum": 111, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "'The pleasures of the table are never of consequence to one naturally abstemious.' The word abstemious can be replaced by:",
        "opts": ["indulgent", "temperate", "discreet", "profligate"],
        "sol": "Abstemious means moderate or sparing, especially in eating and drinking; synonym is temperate."
    },
    {
        "qNum": 112, "sub": "General English", "ch": "Ordering of Sentences", "top": "Para Jumbles",
        "text": "S1: Unlike many modern thinkers, Tagore had no blueprint for the world's salvation. P: His thought will therefore never be out of date. Q: He merely emphasised certain basic truths which men may ignore only at their peril. R: He believed in no particular 'ism'. S: He was what Gandhiji rightly termed the great sentinel. S6: As a poet he will always delight... Proper sequence:",
        "opts": ["SRPQ", "PRQS", "RSPQ", "RQPS"],
        "sol": "R ('He believed in no particular ism') naturally elaborates on S1. S follows, then P explains why his thought will never be out of date, and Q concludes with his emphasis. Sequence is RSPQ."
    },
    {
        "qNum": 113, "sub": "General English", "ch": "Spotting Error", "top": "Redundancy",
        "text": "Which of the underlined parts is a mistake: 'He can be able to pass the test in flying colours without any difficulties whatsoever.'",
        "opts": ["be able", "flying colours", "difficulties", "whatsoever"],
        "sol": "'Can' and 'be able to' both express ability and are redundant together. 'Be able' should be deleted."
    },
    {
        "qNum": 114, "sub": "General English", "ch": "Comprehension Passage", "top": "Pterosaurs Passage",
        "text": "It can be inferred from the passage that the scientists now generally agree that:",
        "opts": ["enormous wingspan of the pterosaurs enable them to fly great distances.", "structure of the skeleton of the pterosaurs suggests a close evolutionary relationship to bats.", "fossil remains of the pterosaurs reveal how they solved the problem of powered flight.", "pterosaurs were reptiles."],
        "sol": "The passage explicitly states: 'Perhaps the least controversial assertion about the pterosaurs is that they were reptiles.'"
    },
    {
        "qNum": 115, "sub": "General English", "ch": "Comprehension Passage", "top": "Pterosaurs Passage",
        "text": "According to the passage the skeleton of pterosaurs can be distinguished from that of a bird by the:",
        "opts": ["the size of its wingspan.", "presence of hollow spaces in its bones.", "anatomic origin of its wing strut.", "presence of hooklike projections on its hind feet."],
        "sol": "In pterosaurs, the elongated fourth finger was the strut, whereas in birds the second finger is the principal strut."
    },
    {
        "qNum": 116, "sub": "General English", "ch": "Spotting Error", "top": "Articles",
        "text": "Pick the part of the sentence that has an error: 'My elder brother is a MA whereas I am only a BA'",
        "opts": ["My elder brother", "is a MA", "whereas I am", "only a BA"],
        "sol": "The acronym 'MA' begins with a vowel sound (/em/), so it requires the indefinite article 'an': 'an MA'."
    },
    {
        "qNum": 117, "sub": "General English", "ch": "Prepositions & Phrasal Verbs", "top": "Phrasal Verbs",
        "text": "Choose the suitable phrasal verb: 'I _______ my hopes when untimely rain threatened my crops.'",
        "opts": ["gave in", "gave out", "gave up", "gave off"],
        "sol": "'Gave up' means abandoned or surrendered hope."
    },
    {
        "qNum": 118, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Choose the word opposite in meaning to AFFLUENT:",
        "opts": ["Reluctant", "Poor", "Clear", "Enthusiastic"],
        "sol": "Affluent means wealthy; its antonym is Poor."
    },
    {
        "qNum": 119, "sub": "General English", "ch": "Sentence Completion", "top": "Noun Usage",
        "text": "Fill in the blank with appropriate noun: 'Don't blame yourself, it's not your _______!'",
        "opts": ["misunderstanding", "error", "slip", "fault"],
        "sol": "'It's not your fault' is the standard, natural English expression."
    },
    {
        "qNum": 120, "sub": "General English", "ch": "Subject Verb Agreement", "top": "Grammar Usage",
        "text": "Fill in the blank: 'The instructor, along with the class, ________ angry about the room change.'",
        "opts": ["are", "have", "has", "is"],
        "sol": "When a singular subject ('The instructor') is accompanied by phrases like 'along with...', the verb agrees with the primary subject: 'is'."
    }
]

paper = {
    "year": 2009,
    "title": "NIMCET 2009 Official Question Paper",
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
            "correctAnswer": answers_2009[q["qNum"] - 1],
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

out_path = os.path.join(os.path.dirname(__file__), "data", "nimcet_2009.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2)

print(f"Generated {len(paper['questions'])} questions into {out_path}")
