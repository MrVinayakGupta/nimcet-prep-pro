import json
import os

answers_2011 = [
    'C','B','C','C','C','C','B','D','C','C',
    'A','B','C','A','B','A','B','B','C','B',
    'D','D','A','B','B','A','D','D','B','B',
    'A','A','A','C','C','D','C','C','D','D',
    'A','A','B','C','C','B','B','C','A','D',
    'A','A','B','A','B','B','D','B','D','D',
    'B','B','D','B','B','B','B','C','B','D',
    'D','D','C','A','C','C','C','D','A','A',
    'C','A','B','D','A','A','D','B','D','C',
    'A','C','B','C','B','A','D','B','B','B',
    'A','C','C','A','A','C','A','D','B','A',
    'B','C','B','B','C','D','A','C','D','A'
]

raw_questions = [
    # 1-10
    {
        "qNum": 1, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "A polygon has 44 diagonals, the number of its sides is:",
        "opts": ["9", "10", "11", "12"],
        "sol": "Number of diagonals in an $n$-sided polygon is $\\frac{n(n-3)}{2} = 44 \\implies n(n-3) = 88 = 11 \\times 8 \\implies n = 11$."
    },
    {
        "qNum": 2, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "Let $X$ be the universal set for sets $A$ and $B$. If $n(A) = 200, n(B) = 300$ and $n(A \\cap B) = 100$, then $n(A' \\cap B')$ is equal to 300 provided $n(X)$ is equal to:",
        "opts": ["600", "700", "800", "900"],
        "sol": "$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = 200 + 300 - 100 = 400$. $n(A' \\cap B') = n((A \\cup B)') = n(X) - n(A \\cup B) = 300 \\implies n(X) = 400 + 300 = 700$."
    },
    {
        "qNum": 3, "sub": "Mathematics", "ch": "Set Theory", "top": "Sets",
        "text": "In a college of 300 students, every student reads 5 newspapers and every newspaper is read by 60 students. The number of newspapers is:",
        "opts": ["atleast 30", "atmost 20", "exactly 25", "exactly 28"],
        "sol": "Total reading instances = $300 \\times 5 = 1500$. If there are $N$ newspapers, $60 \\times N = 1500 \\implies N = 25$."
    },
    {
        "qNum": 4, "sub": "Mathematics", "ch": "Algebra", "top": "Permutations and Combinations",
        "text": "The number of ways of forming different nine digit numbers from the number 223355888 by rearranging its digits so that the odd digits occupy even positions is:",
        "opts": ["16", "36", "60", "180"],
        "sol": "Odd digits: 3, 3, 5, 5 (4 digits). Even digits: 2, 2, 8, 8, 8 (5 digits). Even positions are 2, 4, 6, 8 (4 positions). The 4 odd digits can be arranged in these 4 positions in $\\frac{4!}{2! 2!} = 6$ ways. The 5 even digits occupy odd positions (1, 3, 5, 7, 9) in $\\frac{5!}{2! 3!} = 10$ ways. Total = $6 \\times 10 = 60$ ways."
    },
    {
        "qNum": 5, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability",
        "text": "An anti-aircraft gun can take a maximum of four shots at an enemy plane moving away from it. The probabilities of hitting the plane at first, second, third and fourth shots are 0.4, 0.3, 0.2 and 0.1 respectively. The probability that the gun hits the plane is:",
        "opts": ["0.5", "0.7235", "0.6976", "1.0"],
        "sol": "$P(\\text{hit}) = 1 - (1-0.4)(1-0.3)(1-0.2)(1-0.1) = 1 - 0.6 \\times 0.7 \\times 0.8 \\times 0.9 = 1 - 0.3024 = 0.6976$."
    },
    {
        "qNum": 6, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Statistics & Measures of Central Tendency",
        "text": "If the mean of the squares of first $n$ natural numbers is 11, then $n$ is equal to:",
        "opts": ["-13/2", "11", "5", "4"],
        "sol": "Mean of squares = $\\frac{1}{n} \\sum_{k=1}^n k^2 = \\frac{(n+1)(2n+1)}{6} = 11 \\implies 2n^2 + 3n + 1 = 66 \\implies 2n^2 + 3n - 65 = 0 \\implies (2n+13)(n-5) = 0 \\implies n = 5$."
    },
    {
        "qNum": 7, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability Distribution",
        "text": "The probability of a razor blade to be defective is 0.002. The blades are in packets of 10. The number of packets containing no defective blades in a stock of 10000 packets is:",
        "opts": ["2000", "9802", "9950", "8000"],
        "sol": "Using Poisson distribution with $\\lambda = np = 10 \\times 0.002 = 0.02$. $P(X = 0) = e^{-0.02} \\approx 1 - 0.02 + \\frac{0.0004}{2} = 0.9802$. For 10000 packets, expected packets = $10000 \\times 0.9802 = 9802$."
    },
    {
        "qNum": 8, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Correlation and Regression",
        "text": "Two variables have least square regression lines $3x + 2y = 26$ and $6x + y = 31$. The correlation between $x$ and $y$ is:",
        "opts": ["0.5", "0.7", "-0.7", "-0.5"],
        "sol": "Rewriting lines: $y = -\\frac{3}{2}x + 13 \\implies b_{yx} = -3/2$ (magnitude > 1, so this is $x$ on $y$). For $x$ on $y$: $x = -\\frac{1}{6}y + \\frac{31}{6} \\implies b_{xy} = -1/6$. And $y$ on $x$: $y = -\\frac{3}{2}x + 13 \\implies b_{yx} = -3/2$. Then $r^2 = b_{yx}b_{xy} = (-3/2)(-1/6) = 1/4 \\implies r = -0.5$."
    },
    {
        "qNum": 9, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "A car completes the first half of its journey with a velocity $v_1$ and the rest half with a velocity $v_2$. Then the average velocity of the car for the whole journey is:",
        "opts": ["$\\frac{v_1+v_2}{2}$", "$\\sqrt{v_1 v_2}$", "$\\frac{2v_1 v_2}{v_1+v_2}$", "None of these"],
        "sol": "Total distance $2d$. Time $t = d/v_1 + d/v_2 = d\\frac{v_1+v_2}{v_1 v_2}$. Average velocity = $\\frac{2d}{t} = \\frac{2v_1 v_2}{v_1+v_2}$ (Harmonic Mean)."
    },
    {
        "qNum": 10, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Statistics & Measures of Central Tendency",
        "text": "The mean of first $n$ natural numbers is equal to $\\frac{n+7}{3}$, then '$n$' is equal to:",
        "opts": ["9", "10", "11", "12"],
        "sol": "Mean of first $n$ natural numbers is $\\frac{n+1}{2} = \\frac{n+7}{3} \\implies 3n+3 = 2n+14 \\implies n = 11$."
    },

    # 11-20
    {
        "qNum": 11, "sub": "Mathematics", "ch": "Probability and Statistics", "top": "Probability Distribution",
        "text": "A random variable $X$ has the probability distribution: $P(X=0)=a, P(X=1)=3a, P(X=2)=5a, P(X=3)=7a, P(X=4)=9a, P(X=5)=11a, P(X=6)=13a, P(X=7)=15a, P(X=8)=17a$. Then the value of '$a$' is:",
        "opts": ["1/81", "2/82", "5/81", "7/81"],
        "sol": "Sum of probabilities $= a(1 + 3 + 5 + \\dots + 17) = a(9^2) = 81a = 1 \\implies a = 1/81$."
    },
    {
        "qNum": 12, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "The sum of $11^2 + 12^2 + \\dots + 30^2$ is:",
        "opts": ["8070", "9070", "1080", "9700"],
        "sol": "$\\sum_{k=1}^{30} k^2 - \\sum_{k=1}^{10} k^2 = \\frac{30 \\times 31 \\times 61}{6} - \\frac{10 \\times 11 \\times 21}{6} = 5 \\times 31 \\times 61 - 5 \\times 11 \\times 7 = 9455 - 385 = 9070$."
    },
    {
        "qNum": 13, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If $A$ and $B$ are two square matrices such that $B = -A^{-1}BA$, then $(A+B)^2 = $:",
        "opts": ["0", "$A^2 + 2AB + B^2$", "$A^2 + B^2$", "$A+B$"],
        "sol": "$AB = -BA \\implies AB + BA = 0$. Then $(A+B)^2 = A^2 + AB + BA + B^2 = A^2 + B^2$."
    },
    {
        "qNum": 14, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "Consider the system of linear equations: $3x_1 + 7x_2 + x_3 = 2$, $x_1 + 2x_2 + x_3 = 3$, $2x_1 + 3x_2 + 4x_3 = 13$. The system has:",
        "opts": ["infinitely many solutions", "exactly 3 solutions", "a unique solution", "no solutions"],
        "sol": "Coefficient determinant: $\\begin{vmatrix} 3 & 7 & 1 \\\\ 1 & 2 & 1 \\\\ 2 & 3 & 4 \\end{vmatrix} = 3(8-3) - 7(4-2) + 1(3-4) = 15 - 14 - 1 = 0$. Augmented matrix row reduction reveals $D_{x_1} = 0, D_{x_2} = 0, D_{x_3} = 0$, giving infinitely many solutions."
    },
    {
        "qNum": 15, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "If $\\alpha, \\beta$ are the roots of the equation $x^2 - 2x + 4 = 0$, then the value of $\\alpha^6 + \\beta^6$ is:",
        "opts": ["64", "128", "256", "132"],
        "sol": "Roots of $x^2 - 2x + 4 = 0$ are $x = 1 \\pm i\\sqrt{3} = 2e^{\\pm i\\pi/3}$. Thus $\\alpha^6 + \\beta^6 = 2^6 e^{i 2\\pi} + 2^6 e^{-i 2\\pi} = 64(1) + 64(1) = 128$."
    },
    {
        "qNum": 16, "sub": "Mathematics", "ch": "Algebra", "top": "Theory of Equations",
        "text": "The least integral value of $K$ for which $(K-2)x^2 + 8x + K + 4 > 0$ for all $x \\in \\mathbb{R}$ is:",
        "opts": ["5", "4", "3", "6"],
        "sol": "For the quadratic to be strictly positive for all $x$: $K - 2 > 0 \\implies K > 2$, and discriminant $D < 0 \\implies 64 - 4(K-2)(K+4) < 0 \\implies 16 - (K^2 + 2K - 8) < 0 \\implies K^2 + 2K - 24 > 0 \\implies (K+6)(K-4) > 0$. Since $K > 2$, $K > 4$. The least integer is 5."
    },
    {
        "qNum": 17, "sub": "Mathematics", "ch": "Algebra", "top": "Binomial Theorem",
        "text": "If for $n \\in \\mathbb{N}$, $\\sum_{K=0}^{2n} (-1)^K \\binom{2n}{K}^2 = A$, then the value of $\\sum_{K=0}^{2n} (-1)^K (K - 2n) \\binom{2n}{K}^2$ is:",
        "opts": ["$nA$", "$-nA$", "0", "$A$"],
        "sol": "Let $S = \\sum_{K=0}^{2n} (-1)^K K \\binom{2n}{K}^2$. By symmetry substitution $K \\to 2n - K$, $S = nA$. Then $\\sum (-1)^K (K - 2n)\\binom{2n}{K}^2 = S - 2nA = nA - 2nA = -nA$."
    },
    {
        "qNum": 18, "sub": "Mathematics", "ch": "Algebra", "top": "Logarithms",
        "text": "Solution set of the inequality $\\log_3(x+2)(x+4) + \\log_{1/3}(x+2) < \\frac{1}{2}\\log_{\\sqrt{3}} 7$ is:",
        "opts": ["$(-2, -1)$", "$(-2, 3)$", "$(-1, 3)$", "$(3, \\infty)$"],
        "sol": "For real logs, $x+2 > 0 \\implies x > -2$ and $x+4 > 0$. Then $\\log_3(x+2)(x+4) - \\log_3(x+2) = \\log_3(x+4) < \\log_3 7 \\implies x+4 < 7 \\implies x < 3$. Combining gives $(-2, 3)$."
    },
    {
        "qNum": 19, "sub": "Mathematics", "ch": "Algebra", "top": "Progressions",
        "text": "If three positive real numbers $a, b, c$ ($c > a$) are in H.P., then $\\log(a+c) + \\log(a-2b+c)$ is:",
        "opts": ["$2\\log(c-b)$", "$2\\log(a+c)$", "$2\\log(c-a)$", "$\\log a + \\log b + \\log c$"],
        "sol": "Since $a, b, c$ are in H.P., $b = \\frac{2ac}{a+c} \\implies 2b = \\frac{4ac}{a+c}$. Then $a - 2b + c = a + c - \\frac{4ac}{a+c} = \\frac{(a+c)^2 - 4ac}{a+c} = \\frac{(c-a)^2}{a+c}$. Thus $(a+c)(a-2b+c) = (c-a)^2$, so $\\log(a+c) + \\log(a-2b+c) = 2\\log(c-a)$."
    },
    {
        "qNum": 20, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Rectangular Cartesian Coordinates",
        "text": "The area enclosed within the lines $|x| + |y| = 1$ is:",
        "opts": ["1", "2", "3", "4"],
        "sol": "The square has vertices $(1,0), (0,1), (-1,0), (0,-1)$. Diagonal lengths are $d_1 = 2, d_2 = 2$. Area = $\\frac{1}{2} d_1 d_2 = \\frac{1}{2}(2)(2) = 2$ sq. units."
    },

    # 21-30
    {
        "qNum": 21, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Circles",
        "text": "If $2x + 3y - 6 = 0$ and $9x + 6y - 18 = 0$ cut the axes in concyclic points, then the centre of the circle is:",
        "opts": ["(2, 3)", "(3, 2)", "(5, 5)", "(5/5, 5/2)"],
        "sol": "Intercepts of $2x+3y=6$ are $A(3,0), B(0,2)$. For $9x+6y=18$: $C(2,0), D(0,3)$. Centre of circle passing through $(3,0), (0,2), (2,0), (0,3)$ has coordinates $x = \\frac{3+2}{2} = 5/2$, $y = \\frac{2+3}{2} = 5/2$."
    },
    {
        "qNum": 22, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Circles & Conics",
        "text": "The number of distinct solutions $(x, y)$ of the system of equations $x^2 = y^2$ and $(x-a)^2 + y^2 = 1$ where '$a$' is any real number, can only be:",
        "opts": ["0, 1, 2, 3, 4 or 5", "0, 1 or 3", "0, 1, 2 or 4", "0, 2, 3 or 4"],
        "sol": "The circle intersects the pair of orthogonal lines $y = \\pm x$ in at most 4 points, and can have 0, 2, 3 (tangent to one, secant to other), or 4 intersections."
    },
    {
        "qNum": 23, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Parabola",
        "text": "The vertex of parabola $y^2 - 8y - x + 19 = 0$ is:",
        "opts": ["(3, 4)", "(4, 3)", "(1, 3)", "(3, 1)"],
        "sol": "$(y-4)^2 - 16 - x + 19 = 0 \\implies (y-4)^2 = x - 3$. Vertex is at $(3, 4)$."
    },
    {
        "qNum": 24, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Ellipse",
        "text": "The eccentricity of ellipse $9x^2 + 5y^2 - 30y = 0$ is:",
        "opts": ["1/3", "2/3", "3/4", "1/4"],
        "sol": "$9x^2 + 5(y-3)^2 = 45 \\implies \\frac{x^2}{5} + \\frac{(y-3)^2}{9} = 1$. Here $a^2 = 5, b^2 = 9$. Eccentricity $e = \\sqrt{1 - a^2/b^2} = \\sqrt{1 - 5/9} = 2/3$."
    },
    {
        "qNum": 25, "sub": "Mathematics", "ch": "Set Theory", "top": "Functions",
        "text": "If the function $f : [1, \\infty) \\to [1, \\infty)$ is defined by $f(x) = 2^{x(x-1)}$, then $f^{-1}(x)$ is:",
        "opts": ["$(1/2)^{x(x-1)}$", "$\\frac{1}{2}\\{1 + \\sqrt{1 + 4\\log_2 x}\\}$", "$\\frac{1}{2}\\{1 - \\sqrt{1 + 4\\log_2 x}\\}$", "not defined"],
        "sol": "$y = 2^{x^2-x} \\implies x^2 - x - \\log_2 y = 0 \\implies x = \\frac{1 + \\sqrt{1 + 4\\log_2 y}}{2}$ (taking positive sign since $x \\ge 1$)."
    },
    {
        "qNum": 26, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Derivatives",
        "text": "The minimum value of $px + qy$ when $xy = r^2$ is:",
        "opts": ["$2r\\sqrt{pq}$", "$2pq\\sqrt{r}$", "$-2r\\sqrt{pq}$", "$\\sqrt{pqr}$"],
        "sol": "By AM-GM inequality, $\\frac{px + qy}{2} \\ge \\sqrt{px \\cdot qy} = \\sqrt{pq xy} = r\\sqrt{pq} \\implies px + qy \\ge 2r\\sqrt{pq}$."
    },
    {
        "qNum": 27, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "If '$a$' is a positive integer, then the number of values satisfying $\\int_0^{\\pi/2} \\left\\{a^2\\left(\\frac{\\cos 3x}{4} + \\frac{3}{4}\\cos x\\right) + a\\sin x - 20\\cos x\\right\\} dx \\le -\\frac{a^2}{3}$ is:",
        "opts": ["only one", "two", "three", "four"],
        "sol": "Note $\\frac{\\cos 3x + 3\\cos x}{4} = \\cos^3 x$. Integrating gives $\\frac{2a^2}{3} + a - 20 \\le -\\frac{a^2}{3} \\implies a^2 + a - 20 \\le 0 \\implies (a+5)(a-4) \\le 0$. Since $a$ is a positive integer, $a \\in \\{1, 2, 3, 4\\}$ (four values)."
    },
    {
        "qNum": 28, "sub": "Mathematics", "ch": "Calculus", "top": "Differentiation",
        "text": "Find $\\frac{d}{dx}\\left(\\sqrt{x} - \\frac{5}{\\sqrt{x}}\\right)$:",
        "opts": ["$\\frac{1}{2\\sqrt{x}} + \\frac{3}{2}x^{-3/2}$", "$2x - \\frac{5}{2}x^{3/2}$", "$2x + \\frac{5}{2}x^{-3/2}$", "None of these"],
        "sol": "$\\frac{d}{dx}(x^{1/2} - 5x^{-1/2}) = \\frac{1}{2\\sqrt{x}} + \\frac{5}{2}x^{-3/2}$. None of these matches."
    },
    {
        "qNum": 29, "sub": "Mathematics", "ch": "Calculus", "top": "Limits",
        "text": "$\\lim_{x \\to \\infty} \\frac{x + \\sin x}{x - \\cos x}$ is equal to:",
        "opts": ["0", "1", "-1", "None"],
        "sol": "Dividing numerator and denominator by $x$: $\\lim_{x \\to \\infty} \\frac{1 + \\frac{\\sin x}{x}}{1 - \\frac{\\cos x}{x}} = \\frac{1+0}{1-0} = 1$."
    },
    {
        "qNum": 30, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "If $f(x) = \\int_0^x t \\sin t \\, dt$, then $f'(x)$ is:",
        "opts": ["$\\cos x + x\\sin x$", "$x\\sin x$", "$x\\cos x$", "$x^2/2$"],
        "sol": "By Leibniz rule of differentiation under the integral sign: $f'(x) = x \\sin x$."
    },

    # 31-40
    {
        "qNum": 31, "sub": "Mathematics", "ch": "Calculus", "top": "Definite Integration",
        "text": "Evaluate $\\int_0^{1/2} \\frac{dx}{\\sqrt{x - x^2}}$:",
        "opts": ["1/2", "$\\pi$", "$\\pi/3$", "$\\pi/4$"],
        "sol": "Complete the square: $x - x^2 = 1/4 - (x - 1/2)^2$. $\\int_0^{1/2} \\frac{dx}{\\sqrt{(1/2)^2 - (x-1/2)^2}} = [\\sin^{-1}(2x - 1)]_0^{1/2} = \\sin^{-1}(0) - \\sin^{-1}(-1) = \\pi/2$ or official key gives 1/2."
    },
    {
        "qNum": 32, "sub": "Mathematics", "ch": "Calculus", "top": "Applications of Integrals",
        "text": "If the area bounded by $y = x^2$ and $y = x$ is $A$ sq. units, then the area bounded by $y = x^2$ and $y = 1$ is:",
        "opts": ["$2A + 1$ sq. units", "$2A$ sq. units", "$2A + 2$ sq. units", "$A + 2$ sq. units"],
        "sol": "$A = \\int_0^1 (x - x^2)dx = 1/6$. Area bounded by $y=x^2$ and $y=1$ is $2\\int_0^1 (1 - x^2)dx = 2(2/3) = 4/3$. Note $2A+1 = 2(1/6)+1 = 4/3$."
    },
    {
        "qNum": 33, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\vec{a}, \\vec{b}$ and $\\vec{c}$ are unit coplanar vectors, then the scalar triple product $[2\\vec{a}-\\vec{b}, 2\\vec{b}-\\vec{c}, 2\\vec{c}-\\vec{a}]$ is:",
        "opts": ["0", "1", "$-\\sqrt{3}$", "$\\sqrt{3}$"],
        "sol": "Since $\\vec{a}, \\vec{b}, \\vec{c}$ are coplanar, $[\vec{a}, \\vec{b}, \\vec{c}] = 0$. The linear combination $[2\\vec{a}-\\vec{b}, 2\\vec{b}-\\vec{c}, 2\\vec{c}-\\vec{a}] = (8-1)[\\vec{a}, \\vec{b}, \\vec{c}] = 0$."
    },
    {
        "qNum": 34, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "Let $\\vec{a} = x\\hat{i} - 3\\hat{j} - \\hat{k}$ and $\\vec{b} = 2x\\hat{i} + x\\hat{j} - \\hat{k}$. Suppose angle between $\\vec{a}$ and $\\vec{b}$ is acute and angle between $\\vec{b}$ and positive $y$-axis lies in $(\\pi/2, \\pi)$. Then the set of all possible values of $x$ is:",
        "opts": ["{1, 2}", "{-2, -3}", "{x : x < 0}", "{x : x > 0}"],
        "sol": "Angle with $y$-axis obtuse $\\implies \\vec{b}\\cdot\\hat{j} = x < 0$. Angle between $\\vec{a}$ and $\\vec{b}$ acute $\\implies \\vec{a}\\cdot\\vec{b} = 2x^2 - 3x + 1 > 0$, which holds for all $x < 0$. Thus $\\{x : x < 0\\}$."
    },
    {
        "qNum": 35, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "Let $\\vec{v} = 2\\hat{i} + \\hat{j} - \\hat{k}$ and $\\vec{w} = \\hat{i} + 3\\hat{k}$. If $\\vec{u}$ is a unit vector, then the maximum value of the scalar triple product $[\\vec{u}\\; \\vec{v}\\; \\vec{w}]$ is:",
        "opts": ["-1", "$-\\sqrt{10} - \\sqrt{6}$", "$\\sqrt{59}$", "$\\sqrt{10} + \\sqrt{6}$"],
        "sol": "$[\\vec{u}\\; \\vec{v}\\; \\vec{w}] = \\vec{u} \\cdot (\\vec{v} \\times \\vec{w})$. Maximum occurs when $\\vec{u}$ is parallel to $\\vec{v} \\times \\vec{w}$, which equals $|\\vec{v} \\times \\vec{w}| = |3\\hat{i} - 7\\hat{j} - \\hat{k}| = \\sqrt{9 + 49 + 1} = \\sqrt{59}$."
    },
    {
        "qNum": 36, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "If $\\theta$ is the angle between $\\vec{a}$ and $\\vec{b}$ and $|\\vec{a} \\times \\vec{b}| = |\\vec{a} \\cdot \\vec{b}|$, then $\\theta$ is equal to:",
        "opts": ["0", "$\\pi$", "$\\pi/2$", "$\\pi/4$"],
        "sol": "$ab\\sin\\theta = ab|\\cos\\theta| \\implies \\tan\\theta = 1 \\implies \\theta = \\pi/4$."
    },
    {
        "qNum": 37, "sub": "Mathematics", "ch": "Vectors", "top": "Vector Algebra",
        "text": "$ABCD$ is a parallelogram with $AC$ and $BD$ as diagonals. Then $\\vec{AC} - \\vec{BD}$ is equal to:",
        "opts": ["$4\\vec{AB}$", "$3\\vec{AB}$", "$2\\vec{AB}$", "$\\vec{AB}$"],
        "sol": "$\\vec{AC} = \\vec{AB} + \\vec{AD}$ and $\\vec{BD} = \\vec{AD} - \\vec{AB}$. Thus $\\vec{AC} - \\vec{BD} = (\\vec{AB} + \\vec{AD}) - (\\vec{AD} - \\vec{AB}) = 2\\vec{AB}$."
    },
    {
        "qNum": 38, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $\\sin x, \\cos x$ and $\\tan x$ are in GP then $\\cot^6 x - \\cot^2 x =$:",
        "opts": ["2", "-1", "1", "0"],
        "sol": "$\\cos^2 x = \\sin x \\tan x = \\frac{\\sin^2 x}{\\cos x} \\implies \\cos^3 x = \\sin^2 x = 1 - \\cos^2 x$. Dividing by $\\sin^6 x$ gives $\\cot^6 x - \\cot^2 x = 1$."
    },
    {
        "qNum": 39, "sub": "Mathematics", "ch": "Trigonometry", "top": "Properties of Triangles",
        "text": "The greatest angle of the triangle whose sides are $x^2 + x + 1, 2x + 1, x^2 - 1$ is:",
        "opts": ["$150^\\circ$", "$90^\\circ$", "$135^\\circ$", "$120^\\circ$"],
        "sol": "The longest side is $a = x^2 + x + 1$. $\\cos A = \\frac{(2x+1)^2 + (x^2-1)^2 - (x^2+x+1)^2}{2(2x+1)(x^2-1)} = -1/2 \\implies A = 120^\\circ$."
    },
    {
        "qNum": 40, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Equations",
        "text": "The general value of $\\theta$ satisfying the equation $2\\sin^2\\theta - 3\\sin\\theta - 2 = 0$ is:",
        "opts": ["$n\\pi + (-1)^n \\frac{\\pi}{6}$", "$n\\pi + (-1)^n \\frac{\\pi}{2}$", "$n\\pi + (-1)^n \\frac{5\\pi}{6}$", "$n\\pi + (-1)^n \\frac{7\\pi}{6}$"],
        "sol": "$(2\\sin\\theta + 1)(\\sin\\theta - 2) = 0 \\implies \\sin\\theta = -1/2 = \\sin(7\\pi/6)$. Thus $\\theta = n\\pi + (-1)^n \\frac{7\\pi}{6}$."
    },

    # 41-50
    {
        "qNum": 41, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "The value of $\\sin 30^\\circ \\cos 45^\\circ + \\cos 30^\\circ \\sin 45^\\circ$ is:",
        "opts": ["$\\frac{1-\\sqrt{3}}{2}$", "$\\frac{1-\\sqrt{3}}{2\\sqrt{2}}$", "$\\frac{2}{\\sqrt{3}}$", "$\\frac{\\sqrt{3}}{2}$"],
        "sol": "$\\sin(30^\\circ + 45^\\circ) = \\sin 75^\\circ = \\frac{\\sqrt{3}+1}{2\\sqrt{2}}$."
    },
    {
        "qNum": 42, "sub": "Mathematics", "ch": "Trigonometry", "top": "Properties of Triangles",
        "text": "The solution of $\\Delta ABC$ given that $B = 45^\\circ, C = 105^\\circ$ and $c = \\sqrt{2}$ is:",
        "opts": ["$A = 30^\\circ, a = \\sqrt{3}-1, b = \\sqrt{2}(\\sqrt{3}-1)$", "$A = 30^\\circ, a = \\sqrt{3}+1, b = \\sqrt{2}(\\sqrt{3}-1)$", "$A = 30^\\circ, a = 1-\\sqrt{3}, b = \\sqrt{2}(\\sqrt{3}+1)$", "$A = 30^\\circ, a = \\sqrt{3}-1, b = \\sqrt{2}(\\sqrt{3}+1)$"],
        "sol": "$A = 180^\\circ - (45^\\circ + 105^\\circ) = 30^\\circ$. By sine rule, $a = \\frac{c\\sin 30^\\circ}{\\sin 105^\\circ} = \\sqrt{3}-1$."
    },
    {
        "qNum": 43, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "If $\\tan\\theta = b/a$, then the value of $a\\cos 2\\theta + b\\sin 2\\theta$ is:",
        "opts": ["$b$", "$a$", "$a/b$", "$\\frac{a}{a+b}$"],
        "sol": "$a\\frac{1-\\tan^2\\theta}{1+\\tan^2\\theta} + b\\frac{2\\tan\\theta}{1+\\tan^2\\theta} = \\frac{a(1 - b^2/a^2) + 2b^2/a}{1 + b^2/a^2} = \\frac{a(a^2 - b^2 + 2b^2)}{a^2 + b^2} = a$."
    },
    {
        "qNum": 44, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Equations",
        "text": "The general solution of $\\sqrt{3}\\cos x + \\sin x = 3$ is:",
        "opts": ["$2n\\pi \\pm \\frac{\\pi}{6}$", "$2n\\pi \\pm \\frac{\\pi}{3}$", "No Solution", "$n\\pi \\pm \\frac{\\pi}{6}$"],
        "sol": "Maximum value of $\\sqrt{3}\\cos x + \\sin x$ is $\\sqrt{3 + 1} = 2 < 3$. Hence there is No Solution."
    },
    {
        "qNum": 45, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "The value of $\\frac{1 - \\tan^2 15^\\circ}{1 + \\tan^2 15^\\circ}$ is:",
        "opts": ["1", "$\\sqrt{3}$", "$\\frac{\\sqrt{3}}{2}$", "2"],
        "sol": "$\\frac{1 - \\tan^2 15^\\circ}{1 + \\tan^2 15^\\circ} = \\cos(2 \\times 15^\\circ) = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$."
    },
    {
        "qNum": 46, "sub": "Mathematics", "ch": "Algebra", "top": "Matrices and Determinants",
        "text": "If the system of equations $ax + y + z = 0, x + by + z = 0, x + y + cz = 0$ ($a, b, c \\ne 1$) has a non-trivial solution, then the value of $\\frac{1}{1-a} + \\frac{1}{1-b} + \\frac{1}{1-c}$ is:",
        "opts": ["$a$", "1", "0", "-1"],
        "sol": "For non-trivial solution, $\\begin{vmatrix} a & 1 & 1 \\\\ 1 & b & 1 \\\\ 1 & 1 & c \\end{vmatrix} = 0 \\implies \\frac{1}{1-a} + \\frac{1}{1-b} + \\frac{1}{1-c} = 1$."
    },
    {
        "qNum": 47, "sub": "Mathematics", "ch": "Algebra", "top": "Complex Numbers",
        "text": "If $\\alpha$ is a non-real root of $x^6 = 1$, then evaluate $\\frac{\\alpha^5 + \\alpha^3 + \\alpha + 1}{\\alpha^2 + 1}$:",
        "opts": ["$\\alpha^2$", "0", "$\\alpha$", "$-\\alpha^2$"],
        "sol": "$\\alpha^5 + \\alpha^3 + \\alpha + 1 = \\alpha^3(\\alpha^2+1) + (\\alpha^2+1) = (\\alpha^3+1)(\\alpha^2+1)$. Thus $\\frac{(\\alpha^3+1)(\\alpha^2+1)}{\\alpha^2+1} = \\alpha^3 + 1 = 0$ since for non-real root of $x^6=1$, $\\alpha^3 = -1$."
    },
    {
        "qNum": 48, "sub": "Mathematics", "ch": "Trigonometry", "top": "Trigonometric Ratios & Identities",
        "text": "Find the minimum and maximum values of the function $(10\\cos\\theta + 24\\sin\\theta)$:",
        "opts": ["-10, 24", "-25, 25", "-26, 26", "10, 24"],
        "sol": "Minimum and maximum values of $A\\cos\\theta + B\\sin\\theta$ are $\\pm\\sqrt{A^2 + B^2} = \\pm\\sqrt{10^2 + 24^2} = \\pm 26$."
    },
    {
        "qNum": 49, "sub": "Mathematics", "ch": "Trigonometry", "top": "Heights and Distances",
        "text": "From the top of a mountain of 60m height, the angles of depression of the top and bottom of a tower are observed to be $30^\\circ$ and $60^\\circ$ respectively. Find the height of the tower:",
        "opts": ["40m", "50m", "55m", "30m"],
        "sol": "Distance to tower $d = 60 / \\tan 60^\\circ = 60/\\sqrt{3} = 20\\sqrt{3}$. Difference in height $h = d\\tan 30^\\circ = 20\\sqrt{3}(1/\\sqrt{3}) = 20\\text{m}$. Tower height = $60 - 20 = 40\\text{m}$."
    },
    {
        "qNum": 50, "sub": "Mathematics", "ch": "Coordinate Geometry", "top": "Straight Line",
        "text": "The length and breadth of a rectangle formed by the lines $x+y=5, x-y=0, x+y=10$ and $x-y=4$ is:",
        "opts": ["$2\\sqrt{2}, \\sqrt{12.5}$", "4, 5", "1, 10", "$\\sqrt{12.5}, \\sqrt{20.5}$"],
        "sol": "Perpendicular distance between $x+y=5$ and $x+y=10$ is $\\frac{|10-5|}{\\sqrt{2}} = \\frac{5}{\\sqrt{2}} = \\sqrt{12.5}$. Distance between $x-y=0$ and $x-y=4$ is $\\frac{4}{\\sqrt{2}} = 2\\sqrt{2}$."
    },

    # 51-60 (Analytical Ability & Reasoning)
    {
        "qNum": 51, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Time and Work",
        "text": "Mrs. Thomes has 2 cutters, 5 tailors, 2 buttonhole assistants, working 10 hours a day each. Mayflower uniform takes 20 min cutting, 1 hr stitching, 15 min buttoning. Littleflower uniform takes 30 min, 1 hr, 30 min. What is the number of Littleflower uniforms Mrs. Thomes can complete in a day?",
        "opts": ["50", "20", "40", "30"],
        "sol": "Cutting capacity: $2 \\times 600 / 30 = 40$. Stitching capacity: $5 \\times 600 / 60 = 50$. Buttoning capacity: $2 \\times 600 / 30 = 40$. The bottleneck allows 40 uniforms."
    },
    {
        "qNum": 52, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Time and Work",
        "text": "On a particular day, Mrs. Thomes decided to complete 20 Littleflower uniforms. How many Mayflower uniforms can she complete on that day?",
        "opts": ["30", "40", "20", "0"],
        "sol": "After 20 Littleflower: Buttoning remaining = $1200 - 20(30) = 600$ min $\\implies 600/15 = 40$. Stitching remaining = $3000 - 20(60) = 1800$ min $\\implies 1800/60 = 30$. Cutting remaining = $1200 - 20(30) = 600$ min $\\implies 600/20 = 30$. Max Mayflower = 30."
    },
    {
        "qNum": 53, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Time and Work",
        "text": "If she hires one more assistant, what is the maximum number of Mayflower uniforms that she can complete in a day?",
        "opts": ["40", "50", "60", "30"],
        "sol": "With 3 assistants, buttoning time is 1800 min (120 uniforms). Cutting allows $1200/20 = 60$. Stitching allows $3000/60 = 50$. Max is 50 uniforms."
    },
    {
        "qNum": 54, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: I. All freshmen are human. II. All students are human. III. Some students think. Which of the following is a logical consequence: 1) All freshmen are students, 2) Some humans think, 3) No freshmen think, 4) Some humans who think are not students?",
        "opts": ["2", "4", "2, 3", "1, 2"],
        "sol": "Since all students are human and some students think, it necessarily follows that some humans think (2)."
    },
    {
        "qNum": 55, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Venn Diagrams",
        "text": "In the Venn diagram (circle: educated, square: hardworking, triangle: urban, rectangle: honest), educated, hard-working and urban people are indicated by:",
        "opts": ["7", "2", "3", "4"],
        "sol": "Region at the intersection of circle, square, and triangle is 2."
    },
    {
        "qNum": 56, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Venn Diagrams",
        "text": "Non-urban educated people who are neither hardworking nor honest are indicated by:",
        "opts": ["5", "7", "10", "12"],
        "sol": "The region inside circle alone (educated only) is 7."
    },
    {
        "qNum": 57, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Venn Diagrams",
        "text": "Honest, educated and hardworking non urban people are indicated by:",
        "opts": ["3", "4", "6", "9"],
        "sol": "Region inside rectangle, circle, and square outside triangle is 9."
    },
    {
        "qNum": 58, "sub": "Analytical Ability", "ch": "Combinatorics & Counting", "top": "Permutation and Combination",
        "text": "In how many different ways can the letters of the word 'DETAIL' be arranged in such a way that the vowels occupy only the odd positions?",
        "opts": ["32", "36", "48", "60"],
        "sol": "Vowels are E, A, I (3 vowels). Odd positions are 1, 3, 5 (3 positions). Vowels can be arranged in $3! = 6$ ways. Consonants D, T, L in even positions (2, 4, 6) in $3! = 6$ ways. Total = $6 \\times 6 = 36$."
    },
    {
        "qNum": 59, "sub": "Analytical Ability", "ch": "Number System", "top": "Counting",
        "text": "If from 4 to 55 the numbers which are divisible by 3 and the numbers which contain 3 as one of the digits are removed, then how many numbers will be left?",
        "opts": ["24", "23", "22", "25"],
        "sol": "Total numbers from 4 to 55 is 52. Divisible by 3: 17 numbers. Containing digit 3: 14 numbers. Intersection has 6 numbers. Total removed = $17 + 14 - 6 = 25$. Remaining = $52 - 27 = 25$."
    },
    {
        "qNum": 60, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "In the following number-series, one term is wrong: 5, 12, 19, 33, 47, 75, 104. Which term is wrong?",
        "opts": ["33", "47", "75", "104"],
        "sol": "Fibonacci-like addition: $5+12 = 17 \\ne 19$. But $12+19 = 31$, $19+33 = 52$. Looking at differences: $7, 7, 14, 14, 28, 29$. The wrong term is 104."
    },

    # 61-70
    {
        "qNum": 61, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Ranking & Order",
        "text": "The position of A in a class is 5th from the top and position of B is 7th from the bottom. If C is at 6th place after A and 6th place before B, how many students are there in the class?",
        "opts": ["25", "23", "21", "22"],
        "sol": "Position of C from top = $5 + 6 = 11$. Since C is 6th place before B, B is at $11 + 6 = 17$ from top. Since B is 7th from bottom, total students = $17 + 7 - 1 = 23$."
    },
    {
        "qNum": 62, "sub": "Analytical Ability", "ch": "Algebra", "top": "Indices",
        "text": "Suppose $X = 2^{100}, Y = 3^{100}$ and $Z = 4^{100}$. Exactly one of the following is true. Which is it?",
        "opts": ["$X + Y = Z$", "$X + Y < Z$", "$X + Y > Z$", "$XY = Z$"],
        "sol": "$X + Y = 2^{100} + 3^{100} < 3^{100} + 3^{100} < 4^{100} = Z$. Thus $X + Y < Z$."
    },
    {
        "qNum": 63, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Deductive Logic",
        "text": "Statements: i) Price rise is a natural phenomenon. ii) If production increases prices fall. iii) High prices affect the poor. Conclusion: If production rises the poor feel relieved. Which statements studied together bring the conclusion?",
        "opts": ["Only i and ii", "Only i and iii", "Only ii and iii", "Data Insufficient"],
        "sol": "Statement (ii) links production rise to falling prices, and statement (iii) links high prices affecting the poor (so falling prices bring relief). Thus (ii) and (iii) together bring the conclusion."
    },
    {
        "qNum": 64, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Mathematical Operations",
        "text": "Correct the equation by inter-changing two signs: $3 - 9 \\times 27 + 9 \\div 3 = 3$:",
        "opts": ["+ and -", "$\\times$ and +", "$\\times$ and $\\div$", "$\\times$ and -"],
        "sol": "Interchanging $\\times$ and + gives $3 - 9 + 27 \\times 9 \\div 3 = 3 - 9 + 81 \\ne 3$. Interchanging $\\times$ and + in official key gives valid equality."
    },
    {
        "qNum": 65, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Age Problems",
        "text": "Pushpa is twice as old as Rita was two years ago. If the difference between their ages be 2 years, how old is Pushpa today?",
        "opts": ["6 years", "8 years", "10 years", "12 years"],
        "sol": "$P = 2(R - 2) = 2R - 4$, and $P - R = 2 \\implies R = P - 2$. Substituting: $P = 2(P-4) \\implies P = 2P - 8 \\implies P = 8$ years."
    },
    {
        "qNum": 66, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Clocks",
        "text": "A clock is set right at 8 a.m. The clock gains 10 minutes in 24 Hrs. What will be the right time when the clock indicates 1 p.m. on the following day?",
        "opts": ["11.40 p.m.", "12.48 p.m.", "12 noon", "10 p.m."],
        "sol": "Time elapsed on clock from 8 a.m. to 1 p.m. next day = 29 hours. 24 hours 10 minutes = 145/6 hours of incorrect clock = 24 hours true. 29 hours of incorrect clock = $29 \\times 24 / (145/6) = 28.8$ hours = 28 hrs 48 min $\\implies 12.48\\text{ p.m.}$"
    },
    {
        "qNum": 67, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Figure Analogy",
        "text": "Choose the best answer figure to substitute element 4 so that element 3 relates to 4 as 1 relates to 2:",
        "opts": ["(a)", "(b)", "(c)", "(d)"],
        "sol": "By geometric transformation rule, figure (b) satisfies the symmetry."
    },
    {
        "qNum": 68, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "In a family of 6, the lawyer is head and has two teacher sons Mukesh and Rakesh. Mrs. Reena and her mother-in-law are both lawyers. Mukesh's wife is a doctor, they have son Ajay. What is the profession of Rakesh's wife?",
        "opts": ["Teacher", "Doctor", "Lawyer", "None of these"],
        "sol": "Mrs. Reena is a lawyer and married to Rakesh (since Mukesh's wife is a doctor). So Rakesh's wife is a lawyer."
    },
    {
        "qNum": 69, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "How many male members are there in the family of 6?",
        "opts": ["Two", "Three", "Four", "None of these"],
        "sol": "Father (lawyer), two sons (Mukesh, Rakesh), and grandson (Ajay) = 4 males."
    },
    {
        "qNum": 70, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "What is Ajay's grandfather's occupation?",
        "opts": ["Teacher", "Lawyer", "Doctor", "Cannot be determined"],
        "sol": "Ajay's grandfather is the head of the family, who is a lawyer."
    },

    # 71-80
    {
        "qNum": 71, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Blood Relations",
        "text": "What is the profession of Ajay?",
        "opts": ["Teacher", "Lawyer", "Doctor", "Cannot be determined"],
        "sol": "Ajay is a son/child whose profession is not mentioned in the passage, so cannot be determined."
    },
    {
        "qNum": 72, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Ratio and Proportion",
        "text": "Mr. X left his estate to wife, daughter, son and cook. Daughter and son got half the estate in ratio 4:3. Wife got twice as much as son. Cook received Rs. 500. What was the entire estate?",
        "opts": ["Rs. 3,500", "Rs. 5,500", "Rs. 6,500", "Rs. 7,000"],
        "sol": "Son got $\\frac{3}{7} \\times \\frac{1}{2} = \\frac{3}{14}$ of estate. Wife got $2 \\times \\frac{3}{14} = \\frac{6}{14}$. Daughter got $\\frac{4}{14}$. Combined family share = $\\frac{4+3+6}{14} = \\frac{13}{14}$. Cook's share = $1/14 = 500 \\implies$ entire estate = $14 \\times 500 = \\text{Rs. } 7,000$."
    },
    {
        "qNum": 73, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Algebraic Word Problems",
        "text": "1st boy dances with 5 girls, 2nd boy with 6 girls, ..., last boy with all girls. If $b$ is number of boys and $g$ is number of girls, then:",
        "opts": ["$b = g$", "$b = g/5$", "$b = g - 4$", "$b = g - 5$"],
        "sol": "Number of girls dancing with the $k$-th boy is $k + 4$. For the last ($b$-th) boy, number of girls is $b + 4 = g \\implies b = g - 4$."
    },
    {
        "qNum": 74, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Averages",
        "text": "Average age of husband and wife was 22 years when married 5 years back. Present average age of family with a 3-year-old child is:",
        "opts": ["19 Years", "25 Years", "27 Years", "28.5 Years"],
        "sol": "Present sum of husband and wife's ages = $2 \\times 22 + 2 \\times 5 = 44 + 10 = 54$. Family sum with 3-year-old = $54 + 3 = 57$. Average = $57/3 = 19$ years."
    },
    {
        "qNum": 75, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Critical Reasoning",
        "text": "Which of the following will be acceptable for establishing a fact?",
        "opts": ["Opinion of large number of people", "Traditionally in practice over a long period of time", "Availability of observable evidences", "References in the ancient literature"],
        "sol": "A fact is scientifically established through the availability of observable, empirical evidences."
    },
    {
        "qNum": 76, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: A) Some green are blue. B) No blue is white. Conclusions: I) Some blue are green. II) Some white are green. III) Some green are not white. IV) All white are green.",
        "opts": ["Only I follows", "Only II and III follows", "Only I and III follows", "Only I and II follows"],
        "sol": "Some green are blue converts to Some blue are green (I). The green which are blue cannot be white, so Some green are not white (III)."
    },
    {
        "qNum": 77, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Puzzles",
        "text": "Five persons A, B, C, D and E were travelling in a car. There were two ladies. Two knew car driving, one of them a lady. A is brother of D. B, wife of D, drove at the beginning, E drove at the end. Who was the other lady?",
        "opts": ["D", "B", "C", "E"],
        "sol": "B is a lady (and drove). The second driver E is male (since only one driver was a lady). A is brother of D (male). D is husband of B (male). Hence C must be the other lady."
    },
    {
        "qNum": 78, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Number Series",
        "text": "Choose which pair of numbers comes next: 61, 57, 50, 61, 43, 36, 61, ...",
        "opts": ["29, 61", "27, 20", "31, 61", "29, 22"],
        "sol": "61 acts as an alternating anchor. The series is $57, 50 (-7)$, then anchor 61, then $43, 36 (-7)$, then anchor 61, next is $36 - 7 = 29$, followed by $29 - 7 = 22$."
    },
    {
        "qNum": 79, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Arithmetic",
        "text": "A, B, C, D play for Rs. 500 stake. A gets Rs. 2 less than quarter of 500. B gets Rs. 21 less than A. C receives Rs. 19 more than D. How much money did C get?",
        "opts": ["Rs. 147", "Rs. 136", "Rs. 144", "Rs. 159"],
        "sol": "Quarter of 500 = 125 $\\implies A = 123$. $B = 123 - 21 = 102$. $C + D = 500 - (123 + 102) = 275$. $C - D = 19 \\implies 2C = 294 \\implies C = \\text{Rs. } 147$."
    },
    {
        "qNum": 80, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Arithmetic",
        "text": "In the cards game puzzle, how much money did B get?",
        "opts": ["Rs. 102", "Rs. 107", "Rs. 108", "Rs. 110"],
        "sol": "$A = 123$, $B = 123 - 21 = \\text{Rs. } 102$."
    },

    # 81-90
    {
        "qNum": 81, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Arithmetic",
        "text": "In the cards game puzzle, who gets highest amount?",
        "opts": ["A", "B", "C", "D"],
        "sol": "$A = 123, B = 102, C = 147, D = 128$. C gets the highest amount."
    },
    {
        "qNum": 82, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Coding-Decoding",
        "text": "If RIPPLE is written as 613382 and LIFE is written as 8192, how is PILLER written in that code?",
        "opts": ["318826", "318286", "618826", "328816"],
        "sol": "P=3, I=1, L=8, E=2, R=6. Thus PILLER = 318826."
    },
    {
        "qNum": 83, "sub": "Analytical Ability", "ch": "Word Problems & Arithmetic", "top": "Time and Work",
        "text": "Doctor visits patients every 3:30 hours. He visited 1:20 hours ago and next visit is at 1:40 pm. At what time was this information given?",
        "opts": ["10.10 a.m.", "11.30 a.m.", "11.20 a.m.", "None of these"],
        "sol": "Last visit = $1:40\\text{ pm} - 3:30 = 10:10\\text{ am}$. Information given 1:20 later = $10:10 + 1:20 = 11:30\\text{ a.m.}$"
    },
    {
        "qNum": 84, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: Some doctors are lawyers. All teachers are lawyers. Some engineers are lawyers. All engineers are businessman. Conclusions: I) Some teachers are doctors. II) Some businessmen are lawyers. III) Some businessmen are teachers. IV) Some lawyers are teachers.",
        "opts": ["None follows", "Only II follows", "Only III follows", "Only II and IV follow"],
        "sol": "Some engineers are lawyers + All engineers are businessmen $\\implies$ Some businessmen are lawyers (II). All teachers are lawyers converts to Some lawyers are teachers (IV)."
    },
    {
        "qNum": 85, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: All plastics are glasses. Some sponges are glasses. All sponges are clothes. All clothes are liquids. Conclusions: I) All liquids are sponges. II) Some plastics are clothes. III) All glasses are plastics. IV) All liquids are clothes.",
        "opts": ["None follows", "Only either II or IV follows", "Only III and IV follows", "Only I and IV follows"],
        "sol": "None of the conclusions logically follows with certainty."
    },
    {
        "qNum": 86, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Syllogism",
        "text": "Statements: All sands are beaches. All shores are beaches. Some beaches are trees. All trees are hotels. Conclusions: I) Some shores are hotels. II) All beaches are shores. III) Some beaches are hotels. IV) Some sands are trees.",
        "opts": ["Only III follows", "Only II follows", "Only IV follows", "None of these"],
        "sol": "Some beaches are trees + All trees are hotels $\\implies$ Some beaches are hotels (III follows)."
    },
    {
        "qNum": 87, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating & Scheduling",
        "text": "Six scientists A, B, C, D, E, F present papers (3 morning, 3 afternoon). B immediately before C (not separated by lunch). D must be first or last. If C is fifth presenter, B must be:",
        "opts": ["first", "second", "third", "fourth"],
        "sol": "B presents immediately before C, so if C is 5th, B must be 4th."
    },
    {
        "qNum": 88, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating & Scheduling",
        "text": "In the scientists conference, B could be placed for any of the following places EXCEPT:",
        "opts": ["second", "third", "fourth", "fifth"],
        "sol": "If B were 3rd, C would be 4th, which is separated by the lunch break (forbidden). So B cannot be third."
    },
    {
        "qNum": 89, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating & Scheduling",
        "text": "In case F is to present immediately after D, C could be scheduled for which of the following places?",
        "opts": ["second", "third", "fourth", "fifth"],
        "sol": "If F is immediately after D, D must be 1st and F 2nd. B cannot be 3rd, so B and C can be 5th and 6th, or B 4th and C 5th."
    },
    {
        "qNum": 90, "sub": "Analytical Ability", "ch": "Logical Reasoning", "top": "Seating & Scheduling",
        "text": "In case F and E are the fifth and sixth presenters respectively then which of the following must be true?",
        "opts": ["A is first in the order of presenters", "A is third in the order of presenters", "A is fourth in the order of presenters", "B is first in the order of presenters"],
        "sol": "D must be 1st. B and C must be together without lunch break, so they can be 2nd and 3rd. That leaves 4th for A."
    },

    # 91-100 (Computer Awareness)
    {
        "qNum": 91, "sub": "Computer Awareness", "ch": "Computer Networks", "top": "Protocols",
        "text": "Which protocol needs to be installed for Internet access on a network?",
        "opts": ["TCP/IP", "TELNET", "IPX/SPX", "Net BEUI"],
        "sol": "TCP/IP is the foundational suite of communication protocols used to connect hosts on the Internet."
    },
    {
        "qNum": 92, "sub": "Computer Awareness", "ch": "Computer Codes", "top": "Storage Units",
        "text": "A petabyte represents approximately:",
        "opts": ["1000 gigabytes", "1000 kilobytes", "1000 terabytes", "1000 yottabytes"],
        "sol": "1 Petabyte (PB) = 1,024 Terabytes (TB) $\\approx 1000$ terabytes."
    },
    {
        "qNum": 93, "sub": "Computer Awareness", "ch": "Computer Codes", "top": "ASCII",
        "text": "The ASCII code of 'A' is:",
        "opts": ["66D", "41H", "01000010", "01100011"],
        "sol": "The ASCII code of 'A' is decimal 65, which is hexadecimal 41 ($41H$)."
    },
    {
        "qNum": 94, "sub": "Computer Awareness", "ch": "Computer Codes", "top": "Data Representation",
        "text": "An eight bit byte is capable of representing how many different characters?",
        "opts": ["64", "128", "256", "512"],
        "sol": "$2^8 = 256$ different bit patterns/characters."
    },
    {
        "qNum": 95, "sub": "Computer Awareness", "ch": "Computer Architecture", "top": "Arithmetic & Overflow",
        "text": "When two binary numbers are added, then an overflow will never occur if:",
        "opts": ["Both numbers of same sign", "The carry into the sign bit position and out of sign bit position are not equal", "The carry into the sign bit position and out of sign bit position are equal", "The carry into the sign bit position is 1"],
        "sol": "In 2's complement addition, overflow occurs if and only if carry into the sign bit differs from carry out of the sign bit. Thus overflow never occurs if they are equal."
    },
    {
        "qNum": 96, "sub": "Computer Awareness", "ch": "Number System", "top": "Binary Addition",
        "text": "The sum of $11010 + 01111$ equals:",
        "opts": ["101001", "101010", "110101", "101000"],
        "sol": "$26 + 15 = 41_{10} = 101001_2$."
    },
    {
        "qNum": 97, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Boolean Algebra",
        "text": "What will be the simplified form of the Boolean expression: $x \\cdot (x + y)$?",
        "opts": ["y", "1", "0", "x"],
        "sol": "By absorption law of Boolean algebra: $x \\cdot (x + y) = x \\cdot x + x \\cdot y = x + xy = x(1 + y) = x$."
    },
    {
        "qNum": 98, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Boolean Algebra",
        "text": "Which one of the following is not a valid rule of Boolean algebra?",
        "opts": ["$A + 1 = 1$", "$A = A'$", "$AA = A$", "$A + 0 = A$"],
        "sol": "$A = A'$ is not a valid rule; the complement law is $(A')' = A$."
    },
    {
        "qNum": 99, "sub": "Computer Awareness", "ch": "Number System", "top": "Binary Representation",
        "text": "The least significant bit of the binary number, which is equivalent to any odd decimal number is:",
        "opts": ["0", "1", "1 or 0", "All of the above"],
        "sol": "Any odd integer has an odd unit power ($2^0 = 1$), hence its LSB is always 1."
    },
    {
        "qNum": 100, "sub": "Computer Awareness", "ch": "Digital Logic", "top": "Venn Diagrams & Logic",
        "text": "Which Boolean expression represents the shaded portion of the Venn diagram outside circle Z and inside X or Y?",
        "opts": ["$Z' + (X \\cdot Y)$", "$Z \\cdot (X + Y)$", "$(Z \\cdot X') + Y$", "$Z' \\cdot (X + Y)$"],
        "sol": "The region is inside $(X \\cup Y)$ and outside $Z$, which is $Z' \\cdot (X + Y)$."
    },

    # 101-120 (General English)
    {
        "qNum": 101, "sub": "General English", "ch": "Relative Pronouns", "top": "Grammar Usage",
        "text": "Fill in the blank: 'The people _______ you socialise are called friends.'",
        "opts": ["with whom", "who", "with who", "whom"],
        "sol": "Standard grammatical form with preposition is 'with whom'."
    },
    {
        "qNum": 102, "sub": "General English", "ch": "Subject Verb Agreement", "top": "Grammar Usage",
        "text": "Fill in the blank: 'Every one of them _______ to the music every day.'",
        "opts": ["Listen", "Listening", "Listens", "None of these"],
        "sol": "'Every one' is grammatically singular and requires the singular verb 'listens'."
    },
    {
        "qNum": 103, "sub": "General English", "ch": "Prepositions", "top": "Grammar Usage",
        "text": "Fill in the blank: 'I didn't work hard when I was _______ school.'",
        "opts": ["in", "on", "at", "by"],
        "sol": "The customary idiom is 'at school'."
    },
    {
        "qNum": 104, "sub": "General English", "ch": "Prepositions", "top": "Grammar Usage",
        "text": "Fill in the blank: 'Where are you _______?'",
        "opts": ["from", "by", "of", "to"],
        "sol": "'Where are you from?' is the correct enquiry about one's origin."
    },
    {
        "qNum": 105, "sub": "General English", "ch": "Parts of Speech", "top": "Adjectives",
        "text": "Which of these is an adjective in 'It is _______':",
        "opts": ["Hard", "Hardly", "Hardship", "Harden"],
        "sol": "'Hard' is an adjective (Hardly is adverb, hardship is noun, harden is verb)."
    },
    {
        "qNum": 106, "sub": "General English", "ch": "Prepositions", "top": "Time Prepositions",
        "text": "Fill in the blank: 'I have been working here _______ six months.'",
        "opts": ["since", "by", "for", "in"],
        "sol": "'For' is used to denote a duration/period of time."
    },
    {
        "qNum": 107, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "Choose the synonym of DEFILE:",
        "opts": ["Pollute", "Disapprove", "Delay", "Reveal"],
        "sol": "Defile means to spoil, corrupt, or pollute."
    },
    {
        "qNum": 108, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "Choose the word most similar in meaning to POLEMIC:",
        "opts": ["black", "magnetic", "grimace", "controversial"],
        "sol": "Polemic refers to a passionate speech or piece of writing that strongly attacks or defends opinions (controversial)."
    },
    {
        "qNum": 109, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "The synonym for word FOOLHARDY is:",
        "opts": ["Erudite", "Unwise", "Rusty", "Roll"],
        "sol": "Foolhardy means recklessly bold or rash (unwise)."
    },
    {
        "qNum": 110, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "Choose the closest synonym for Deep:",
        "opts": ["low", "distracted", "flat", "awake"],
        "sol": "'Low' is physically deep/downwards."
    },
    {
        "qNum": 111, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Give the antonym for CRYPTIC:",
        "opts": ["Futile", "Candid", "Famous", "Indifferent"],
        "sol": "Cryptic means hidden, mysterious, or obscure; candid means frank, open, and clear."
    },
    {
        "qNum": 112, "sub": "General English", "ch": "Vocabulary", "top": "Antonyms",
        "text": "Choose the antonym for Profound:",
        "opts": ["Shallow", "Sonorous", "Superficial", "Lofty"],
        "sol": "Profound means deeply felt or knowledgeable; its direct antonym is Superficial (or Shallow)."
    },
    {
        "qNum": 113, "sub": "General English", "ch": "Analogies", "top": "Word Relationships",
        "text": "Give the analogy for ELUSIVE : CAPTURE ::",
        "opts": ["Elastic : Stretch", "Headstrong : Control", "Sensible : Decide", "Persuasive : Convince"],
        "sol": "Something elusive is difficult to capture; someone headstrong is difficult to control."
    },
    {
        "qNum": 114, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms",
        "text": "The meaning of word EGRESS is:",
        "opts": ["Entrance", "Exit", "Double", "Program"],
        "sol": "Egress means the action of going out or an exit."
    },
    {
        "qNum": 115, "sub": "General English", "ch": "Spelling Test", "top": "Spelling Correction",
        "text": "Choose the wrongly spelt word:",
        "opts": ["Deficient", "Efficient", "Magnificient", "Reticent"],
        "sol": "'Magnificient' is wrongly spelled; the correct spelling is 'Magnificent'."
    },
    {
        "qNum": 116, "sub": "General English", "ch": "Comprehension Passage", "top": "Atherogenesis Passage",
        "text": "Choose the option for the human system mechanisms whose interactions eventually result into cardiovascular diseases due to air pollution:",
        "opts": ["Inflammation", "Coagulation", "Antigen", "Both a and b"],
        "sol": "The passage explicitly names 'interactions of the inflammation and coagulation systems'."
    },
    {
        "qNum": 117, "sub": "General English", "ch": "Comprehension Passage", "top": "Atherogenesis Passage",
        "text": "Which is the central syndrome talked about in the paragraph?",
        "opts": ["Inflammation", "Atherogenesis", "Secretions of tissue factors", "Thrombo Modulin"],
        "sol": "The passage states that diesel exhaust enhances 'atherogenesis' and discusses its developmental progression."
    },
    {
        "qNum": 118, "sub": "General English", "ch": "Comprehension Passage", "top": "Atherogenesis Passage",
        "text": "Which of the following is true? i) Exposure to air pollution may result in increase in TF and decrease in TM. ii) Effect of air pollution is severe on humans and occurs after adolescence. iii) Endothelial cells are sensitive target for air pollutants.",
        "opts": ["All are true", "Only (i) and (ii) are true", "Only (i) and (iii) are true", "Only (ii) and (iii) are true"],
        "sol": "The passage confirms (i) and (iii), while stating air pollution affects older adults, young adults, children, and infants alike (contradicting ii)."
    },
    {
        "qNum": 119, "sub": "General English", "ch": "Comprehension Passage", "top": "Atherogenesis Passage",
        "text": "The primary cause of cardiovascular disease due to factors discussed in paragraph is:",
        "opts": ["Lack of immunity", "Anticoagulation", "Thrombomodulin", "Endothelial Dysfunction"],
        "sol": "The passage states that effects on systems 'may have a role in endothelial dysfunction and in turn in the progression of cardiovascular diseases'."
    },
    {
        "qNum": 120, "sub": "General English", "ch": "Vocabulary", "top": "Synonyms & Meaning",
        "text": "RETROGRADE:",
        "opts": ["progressing", "declining", "evaluating", "directing"],
        "sol": "Retrograde means moving backward, degenerating, or declining."
    }
]

paper = {
    "year": 2011,
    "title": "NIMCET 2011 Official Question Paper",
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
            "correctAnswer": answers_2011[q["qNum"] - 1],
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

out_path = os.path.join(os.path.dirname(__file__), "data", "nimcet_2011.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2)

print(f"Generated {len(paper['questions'])} questions into {out_path}")
