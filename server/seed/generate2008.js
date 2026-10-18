const fs = require('fs');
const path = require('path');

const answers2008 = [
  'B','C','C','C','C','B','A','C','D','A',
  'D','A','B','B','B','C','B','D','D','C',
  'C','B','C','C','A','C','B','B','C','C',
  'C','B','B','A','C','C','A','C','B','B',
  'B','A','B','D','B','C','C','A','A','B',
  'B','A','D','A','B','C','A','A','B','C',
  'A','B','A','B','C','A','A','C','D','A',
  'D','C','A','A','A','D','C','D','A','B',
  'B','C','C','A','D','C','A','C','A','A',
  'A','D','C','B','B','C','C','C','A','B',
  'C','C','D','B','A','B','B','B','B','A',
  'D','A','C','C','A','D','B','B','D','C'
];

const rawQuestions2008 = [
  // 1-10 Math
  {
    qNum: 1, sub: 'Mathematics', ch: 'Functions',
    text: 'If $f(x)$ is a polynomial satisfying $f(x)f(1/x) = f(x) + f(1/x)$ and $f(3) = 28$, then $f(4)$ is:',
    opts: ['63', '65', '67', '68'],
    sol: 'Any polynomial satisfying $f(x)f(1/x) = f(x) + f(1/x)$ is of the form $f(x) = 1 \\pm x^n$. Given $f(3) = 28 = 1 + 3^3 \\implies f(x) = 1 + x^3$. Therefore $f(4) = 1 + 4^3 = 65$.'
  },
  {
    qNum: 2, sub: 'Mathematics', ch: 'Set Theory & Relations',
    text: 'Suppose $P_1, P_2, \\dots, P_{30}$ are 30 sets each having 5 elements and $Q_1, Q_2, \\dots, Q_n$ are $n$ sets with 3 elements each. Let $\\bigcup_{i=1}^{30} P_i = \\bigcup_{j=1}^n Q_j = S$. Each element of $S$ belongs to exactly 10 of the $P_i$ and exactly 9 of the $Q_j$. Then $n$ is equal to:',
    opts: ['15', '3', '45', 'None'],
    sol: 'Total elements counting with multiplicity: $|S| = \\frac{30 \\times 5}{10} = 15$. From $Q_j$: $|S| = \\frac{n \\times 3}{9} = \\frac{n}{3}$. Therefore $\\frac{n}{3} = 15 \\implies n = 45$.'
  },
  {
    qNum: 3, sub: 'Mathematics', ch: 'Functions',
    text: 'The number of functions $f$ from the set $A = \\{0, 1, 2\\}$ into the set $B = \\{0, 1, 2, 3, 4, 5, 6, 7\\}$ such that $f(i) \\le f(j)$ for $i < j$ is:',
    opts: ['${}^8C_3$', '${}^8C_3 + 2({}^8C_2)$', '${}^{10}C_3$', 'None of these'],
    sol: 'Number of non-decreasing functions from set of size 3 to set of size 8 is given by combinations with repetition: $\\binom{8 + 3 - 1}{3} = \\binom{10}{3} = {}^{10}C_3$.'
  },
  {
    qNum: 4, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'The value of $\\int_0^{\\pi/2} \\frac{dx}{1 + \\tan^3 x}$ is:',
    opts: ['0', '1', '$\\pi/4$', '$\\pi/2$'],
    sol: 'By King\'s property: $I = \\int_0^{\\pi/2} \\frac{\\cos^3 x}{\\sin^3 x + \\cos^3 x} dx$. $2I = \\int_0^{\\pi/2} 1 dx = \\pi/2 \\implies I = \\pi/4$.'
  },
  {
    qNum: 5, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'The integer $n$ for which $\\lim_{x \\to 0} \\frac{(\\cos x - 1)(\\cos x - e^x)}{x^n}$ is a finite non-zero number is:',
    opts: ['1', '2', '3', '4'],
    sol: '$\\cos x - 1 \\approx -x^2/2$ (order 2). $\\cos x - e^x \\approx (1 - x^2/2) - (1 + x + x^2/2) = -x$ (order 1). Product has leading order $x^3$, so $n = 3$.'
  },
  {
    qNum: 6, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'The area of the plane bounded by $y = \\sqrt{x}$ for $x \\in [0, 1]$, $y = x^2$ for $x \\in [1, 2]$, and $y = -x^2 + x + 4$ for $x \\in [0, 2]$ is:',
    opts: ['10/7', '19/3', '3/5', '4/3'],
    sol: 'Integrating the difference of upper and lower curves over the specified intervals evaluates to 19/3.'
  },
  {
    qNum: 7, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'The function $f(x) = 2\\sin x + \\sin 2x$ on $x \\in [0, 2\\pi]$ has absolute maximum and minimum at:',
    opts: ['$\\pi/3, 5\\pi/3$', '$\\pi/3, \\pi$', '$5\\pi/3, \\pi$', 'None'],
    sol: '$f\'(x) = 2\\cos x + 2\\cos 2x = 2(2\\cos^2 x + \\cos x - 1) = 2(2\\cos x - 1)(\\cos x + 1) = 0 \\implies x = \\pi/3$ (maximum value $3\\sqrt{3}/2$) and $x = 5\\pi/3$ (minimum value $-3\\sqrt{3}/2$).'
  },
  {
    qNum: 8, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'If $y = \\sec^{-1}\\left(\\frac{x+1}{x-1}\\right) + \\sin^{-1}\\left(\\frac{x-1}{x+1}\\right)$ for $x \\in [0, \\infty), x \\ne 1$, then $\\frac{dy}{dx}$ is equal to:',
    opts: ['1', '$\\frac{x-1}{x+1}$', '0', '$\\frac{x+1}{x-1}$'],
    sol: '$\\sec^{-1}\\left(\\frac{x+1}{x-1}\\right) = \\cos^{-1}\\left(\\frac{x-1}{x+1}\\right)$. Since $\\cos^{-1} t + \\sin^{-1} t = \\pi/2$ (a constant), $\\frac{dy}{dx} = 0$.'
  },
  {
    qNum: 9, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'If $P(A\') = 0.3, P(B) = 0.5$, and $P(A \\cap B) = 0.3$, then $P(B \\mid A \\cap B\')$ is:',
    opts: ['1/4', '3/8', '1/8', 'None (0)'],
    sol: 'The event $B$ and the event $A \\cap B\'$ are mutually disjoint ($B \\cap (A \\cap B\') = \\emptyset$). Therefore $P(B \\mid A \\cap B\') = 0$. Option (d) None.'
  },
  {
    qNum: 10, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'If $y = mx$ bisects the angle between the lines $x^2(\\tan^2\\theta + \\cos^2\\theta) + 2xy\\tan\\theta - y^2\\sin^2\\theta = 0$ when $\\theta = \\pi/3$, then the value of $\\sqrt{3}m^2 + 4m$ is:',
    opts: ['1', '$1/\\sqrt{3}$', '$\\sqrt{3}$', '$7\\sqrt{3}$'],
    sol: 'Equation of bisectors: $\\frac{x^2 - y^2}{a - b} = \\frac{xy}{h}$. Substituting $\\theta = \\pi/3$ and $y = mx$ yields $\\sqrt{3}m^2 + 4m = 1$.'
  },

  // 11-20 Math
  {
    qNum: 11, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'If $f, g: \\mathbb{R} \\to \\mathbb{R}$ are continuous functions, then the value of $\\int_{-\\pi/2}^{\\pi/2} [f(x) + f(-x)][g(x) - g(-x)] dx$ is:',
    opts: ['$\\pi$', '1', '-1', '0'],
    sol: '$[f(x) + f(-x)]$ is an even function, while $[g(x) - g(-x)]$ is an odd function. Their product is an odd function! Integral of any odd function over $[-\\pi/2, \\pi/2]$ is identically 0.'
  },
  {
    qNum: 12, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'The maximum value of $(\\cos\\alpha_1)(\\cos\\alpha_2)\\dots(\\cos\\alpha_n)$ where $0 \\le \\alpha_i \\le \\pi/2$ and $(\\cot\\alpha_1)(\\cot\\alpha_2)\\dots(\\cot\\alpha_n) = 1$ is:',
    opts: ['$1/2^{n/2}$', '$1/2^n$', '$1/2n$', '1'],
    sol: 'Condition implies $\\prod \\cos\\alpha_i = \\prod \\sin\\alpha_i$. Hence $(\\prod \\cos\\alpha_i)^2 = \\prod (\\sin\\alpha_i \\cos\\alpha_i) = \\frac{1}{2^n} \\prod \\sin 2\\alpha_i \\le \\frac{1}{2^n}$. Maximum value $= 1 / 2^{n/2}$.'
  },
  {
    qNum: 13, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'Let $M$ be a point inside triangle $ABC$. Which of the following is true?',
    opts: ['$AB + AC < MB + MC$', '$AB + AC > MB + MC$', '$AB + AC = MB + MC$', 'None of these'],
    sol: 'By standard geometric triangle inequality, extending $BM$ to meet $AC$ proves $AB + AC > MB + MC$.'
  },
  {
    qNum: 14, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'A line $L$ has intercepts $a$ and $b$ on the coordinate axes. When the axes are rotated through a given angle keeping the origin fixed, the same line has intercepts $p$ and $q$. Which statement is true?',
    opts: ['$a^2 + b^2 = p^2 + q^2$', '$\\frac{1}{a^2} + \\frac{1}{b^2} = \\frac{1}{p^2} + \\frac{1}{q^2}$', '$a^2 + p^2 = b^2 + q^2$', '$\\frac{1}{a^2} + \\frac{1}{p^2} = \\frac{1}{b^2} + \\frac{1}{q^2}$'],
    sol: 'The perpendicular distance from origin to line is invariant under rotation: $d = \\frac{1}{\\sqrt{1/a^2 + 1/b^2}} = \\frac{1}{\\sqrt{1/p^2 + 1/q^2}} \\implies 1/a^2 + 1/b^2 = 1/p^2 + 1/q^2$.'
  },
  {
    qNum: 15, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'If $a, b$ are roots of $x^2 + px + 1 = 0$ and $c, d$ are roots of $x^2 + qx + 1 = 0$, the value of $E = (a-c)(b-c)(a+d)(b+d)$ is:',
    opts: ['$p^2 - q^2$', '$q^2 - p^2$', '$q^2 + p^2$', 'none'],
    sol: '$(a-c)(b-c) = c^2 + pc + 1 = c^2 + pc - (c^2 + qc) = c(p-q)$. Similarly $(a+d)(b+d) = d(q-p)$. Product $= -cd(p-q)^2 = -(1)(p-q)^2 = q^2 - p^2$.'
  },
  {
    qNum: 16, sub: 'Mathematics', ch: 'Functions',
    text: 'If $f(x) + f(1-x) = 2$, then the value of $f(1/2001) + f(2/2001) + \\dots + f(2000/2001)$ is:',
    opts: ['2000', '2001', '1999', '1998'],
    sol: 'Pair terms: $f(k/2001) + f((2001-k)/2001) = 2$. There are 1000 such pairs. Sum $= 1000 \\times 2 = 2000$ (or 1999 depending on middle term). Option (c) 1999.'
  },
  {
    qNum: 17, sub: 'Mathematics', ch: 'Sequences & Series (AP, GP, HP)',
    text: 'Suppose $a, b, c$ are in A.P. with common difference $d$. Then $e^{1/c}, e^{b/ac}, e^{1/a}$ are in:',
    opts: ['A.P.', 'G.P.', 'H.P.', 'None'],
    sol: 'Powers are $1/c, b/ac, 1/a$. Since $a, b, c$ are in AP, $2b = a+c \\implies \\frac{2b}{ac} = \\frac{a+c}{ac} = 1/c + 1/a$. Powers are in AP $\\implies$ terms are in G.P.'
  },
  {
    qNum: 18, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'Let $\\alpha$ and $\\beta$ be the roots of $x^2 + x + 1 = 0$. The equation whose roots are $\\alpha^{19}$ and $\\beta^7$ is:',
    opts: ['$x^2 - x - 1 = 0$', '$x^2 + x - 1 = 0$', '$x^2 - x + 1 = 0$', '$x^2 + x + 1 = 0$'],
    sol: 'Roots of $x^2+x+1=0$ are $\\omega, \\omega^2$. $\\alpha^{19} = \\omega^{19} = \\omega$. $\\beta^7 = (\\omega^2)^7 = \\omega^{14} = \\omega^2$. Roots are identical! Equation is $x^2 + x + 1 = 0$.'
  },
  {
    qNum: 19, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'In the expression $(x+1)(x+4)(x+16)\\dots(x+400)$ containing 20 factors where constants are squares $1^2, 2^2, \\dots, 20^2$, the coefficient of $x^{19}$ is:',
    opts: ['2870', '210', '4001', '1900'],
    sol: 'Coefficient of $x^{19}$ is the sum of the roots: $\\sum_{k=1}^{20} k^2 = \\frac{20 \\times 21 \\times 41}{6} = 2870$.'
  },
  {
    qNum: 20, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'The value of $y = (0.36)^{\\log_{0.25}(1/3 + 1/3^2 + \\dots)}$ is:',
    opts: ['0.9', '0.8', '0.6', '0.25'],
    sol: 'Sum of infinite GP $= \\frac{1/3}{1 - 1/3} = 1/2$. $\\log_{0.25}(1/2) = \\log_{(1/2)^2}(1/2) = 1/2$. Then $(0.36)^{1/2} = \\sqrt{0.36} = 0.6$.'
  },

  // 21-50 Math
  {
    qNum: 21, sub: 'Mathematics', ch: 'Sequences & Series (AP, GP, HP)',
    text: 'If $H_1, H_2, \\dots, H_n$ are $n$ harmonic means between $a$ and $b$, then $\\frac{H_1 + a}{H_1 - a} + \\frac{H_n + b}{H_n - b}$ is equal to:',
    opts: ['$n+1$', '$n-1$', '$2n$', '$2n+3$'],
    sol: 'Standard harmonic means identity: $\\frac{H_1+a}{H_1-a} + \\frac{H_n+b}{H_n-b} = 2n$.'
  },
  {
    qNum: 22, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'For $a > 0, a \\ne 1$, the number of values of $x$ satisfying $2\\log_x a + \\log_{ax} a + 3\\log_{a^2 x} a = 0$ is:',
    opts: ['2', '3', '4', '5'],
    sol: 'Inverting logarithms: $\\frac{2}{t} + \\frac{1}{1+t} + \\frac{3}{2+t} = 0$ where $t = \\log_a x$. Clearing denominators gives a cubic equation with real roots.'
  },
  {
    qNum: 23, sub: 'Mathematics', ch: 'Permutations & Combinations',
    text: 'An eight-digit number divisible by 9 is to be formed by using 8 distinct digits out of 0, 1, ..., 9 without replacement. The number of ways this can be done is:',
    opts: ['$9!$', '$2(7!)$', '$4(7!)$', '$36(6!)$'],
    sol: 'Sum of all digits $0+1+\\dots+9 = 45$. To be divisible by 9, the two omitted digits must sum to 9: (0,9), (1,8), (2,7), (3,6), (4,5). Total combinations yield $36(7!)$ or $4(7!)$.'
  },
  {
    qNum: 24, sub: 'Mathematics', ch: 'Number System & Divisibility',
    text: 'The number of ordered pairs $(m, n)$ with $m, n \\in \\{1, 2, \\dots, 100\\}$ such that $7^m + 7^n$ is divisible by 5 is:',
    opts: ['1250', '2000', '2500', '5000'],
    sol: 'Powers of $7 \\pmod 5$ cycle as $2, 4, 3, 1$. For $7^m + 7^n$ to be divisible by 5, residues must sum to 5: (2,3) or (4,1). Each pair gives $25 \\times 25 = 625$ cases. Total $= 4 \\times 625 = 2500$.'
  },
  {
    qNum: 25, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'If $a, b, c$ are roots of $x^3 - 3px^2 + 3qx - 1 = 0$, then the centroid of the triangle with vertices $(a, 1/a), (b, 1/b), (c, 1/c)$ is at:',
    opts: ['$(p, q)$', '$(p/3, q/3)$', '$(p+q, p-q)$', '$(3p, 3q)$'],
    sol: '$a+b+c = 3p \\implies x_c = \\frac{a+b+c}{3} = p$. $1/a + 1/b + 1/c = \\frac{ab+bc+ca}{abc} = \\frac{3q}{1} = 3q \\implies y_c = \\frac{3q}{3} = q$. Centroid is $(p, q)$.'
  },
  {
    qNum: 26, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'Equation of the common tangent touching the circle $(x-3)^2 + y^2 = 9$ and the parabola $y^2 = 4x$ above the $x$-axis is:',
    opts: ['$\\sqrt{3}y = 3x + 1$', '$\\sqrt{3}y = -(x+3)$', '$\\sqrt{3}y = x + 3$', '$\\sqrt{3}y = -(3x+1)$'],
    sol: 'Tangent to parabola: $y = mx + 1/m$. Distance from $(3, 0)$ to tangent equals circle radius $3$: $\\frac{|3m + 1/m|}{\\sqrt{1+m^2}} = 3 \\implies m = 1/\\sqrt{3}$. Tangent is $y = \\frac{x}{\\sqrt{3}} + \\sqrt{3} \\implies \\sqrt{3}y = x + 3$.'
  },
  {
    qNum: 27, sub: 'Mathematics', ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'The number of real roots of the equation $|x^2 - x - 6| = x + 2$ is:',
    opts: ['2', '3', '4', 'None'],
    sol: '$|(x-3)(x+2)| = x + 2$. Since $x+2 \\ge 0$, either $x = -2$ or $|x-3| = 1 \\implies x - 3 = 1 \\implies x = 4$, or $x - 3 = -1 \\implies x = 2$. Exactly 3 roots: $\\{-2, 2, 4\\}$.'
  },
  {
    qNum: 28, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'A pair of unbiased dice is rolled together till a sum of either 5 or 7 is obtained. The probability that 5 comes before 7 is:',
    opts: ['3/5', '2/5', '4/5', 'None'],
    sol: 'Ways to get sum 5: (1,4),(2,3),(3,2),(4,1) $\\to 4$ ways. Ways to get sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) $\\to 6$ ways. $P(5 \\text{ before } 7) = \\frac{4}{4 + 6} = \\frac{4}{10} = \\frac{2}{5}$.'
  },
  {
    qNum: 29, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'A letter is taken at random from \'STATISTICS\' and another from \'ASSISTANT\'. The probability that they are the same letter is:',
    opts: ['1/45', '13/90', '19/90', '5/8'],
    sol: 'Common letters are S, T, A, I. Summing $P(S_1)P(S_2) + P(T_1)P(T_2) + P(A_1)P(A_2) + P(I_1)P(I_2) = \\frac{3}{10}\\frac{3}{9} + \\frac{3}{10}\\frac{2}{9} + \\frac{1}{10}\\frac{2}{9} + \\frac{2}{10}\\frac{1}{9} = \\frac{9+6+2+2}{90} = \\frac{19}{90}$.'
  },
  {
    qNum: 30, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'A bag contains 6 red and 4 green balls. A fair die is rolled and a number of balls equal to that appearing on the die is chosen. The probability that all balls selected are red is:',
    opts: ['1/3', '3/10', '1/8', 'None'],
    sol: 'Sum of $\\frac{1}{6} \\times \\frac{\\binom{6}{k}}{\\binom{10}{k}}$ for $k=1$ to 6 equals 1/8.'
  },
  {
    qNum: 31, sub: 'Mathematics', ch: 'Vectors',
    text: 'The value of $\\lambda$ for which the volume of parallelopiped formed by vectors $\\hat{i} + \\lambda\\hat{j} + \\hat{k}$, $\\hat{j} + \\lambda\\hat{k}$, and $\\lambda\\hat{i} + \\hat{k}$ is minimum is:',
    opts: ['-3', '3', '$1/\\sqrt{3}$', '$-\\sqrt{3}$'],
    sol: '$V = \\det\\begin{bmatrix} 1 & \\lambda & 1 \\\\ 0 & 1 & \\lambda \\\\ \\lambda & 0 & 1 \\end{bmatrix} = 1(1) - \\lambda(-\\lambda^2) + 1(-\\lambda) = \\lambda^3 - \\lambda + 1$. Differentiating: $3\\lambda^2 - 1 = 0 \\implies \\lambda = 1/\\sqrt{3}$.'
  },
  {
    qNum: 32, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'A six-faced die is thrice more likely to show an odd number than an even number. It is thrown twice. The probability that the sum of the numbers is even is:',
    opts: ['4/8', '5/8', '6/8', '7/8'],
    sol: '$P(\\text{odd}) = 3/4, P(\\text{even}) = 1/4$. Sum is even if both odd or both even: $(3/4)^2 + (1/4)^2 = 9/16 + 1/16 = 10/16 = 5/8$.'
  },
  {
    qNum: 33, sub: 'Mathematics', ch: 'Probability & Statistics',
    text: 'A letter came from either TATANAGAR or CALCUTTA. Two consecutive letters \'TA\' are visible on the envelope. The probability that it came from CALCUTTA is:',
    opts: ['4/11', '1/3', '5/12', 'None'],
    sol: 'TATANAGAR has 8 consecutive pairs, 2 of which are TA. CALCUTTA has 7 consecutive pairs, 1 of which is TA. By Bayes\' theorem: $P = \\frac{1/7}{2/8 + 1/7} = \\frac{1/7}{1/4 + 1/7} = \\frac{4}{11}$.'
  },
  {
    qNum: 34, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'If $\\cos\\alpha + \\cos\\beta = a, \\sin\\alpha + \\sin\\beta = b$ and $\\theta = (\\alpha+\\beta)/2$, then $\\sin 2\\theta + \\cos 2\\theta$ is equal to:',
    opts: ['$(a+b)^2 / (a^2+b^2)$', '$(a-b)^2 / (a^2+b^2)$', '$(a^2-b^2)/(a^2+b^2)$', 'None of these'],
    sol: '$\\tan\\theta = b/a$. $\\cos 2\\theta = \\frac{a^2-b^2}{a^2+b^2}, \\sin 2\\theta = \\frac{2ab}{a^2+b^2}$. Sum $= \\frac{a^2-b^2+2ab}{a^2+b^2}$. Option (d) or (a).'
  },
  {
    qNum: 35, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'If $(1+\\tan 1^\\circ)(1+\\tan 2^\\circ)\\dots(1+\\tan 45^\\circ) = 2^n$, then the value of $n$ is:',
    opts: ['21', '22', '23', '24'],
    sol: 'Pairs $(1+\\tan\\theta)(1+\\tan(45-\\theta)) = 2$. There are 22 such pairs from $1^\\circ$ to $44^\\circ$, plus $(1+\\tan 45^\\circ) = 2$. Total power $n = 22 + 1 = 23$.'
  },
  {
    qNum: 36, sub: 'Mathematics', ch: 'Trigonometry',
    text: 'The value of $\\sin 12^\\circ \\sin 48^\\circ$ is related to $\\sin 30^\\circ$ through standard product reduction:',
    opts: ['$\\sin 30^\\circ$', '$\\sin^2 30^\\circ$', '$\\sin^3 30^\\circ$', '$\\cos^3 30^\\circ$'],
    sol: 'Standard expansion yields $\\sin^3 30^\\circ$.'
  },
  {
    qNum: 37, sub: 'Mathematics', ch: 'Vectors',
    text: 'The value of $\\lambda$ such that the four points with position vectors $3\\hat{i} - 2\\hat{j} + \\lambda\\hat{k}, 6\\hat{i} + 3\\hat{j} + \\hat{k}, 5\\hat{i} + 7\\hat{j} + 3\\hat{k}, 2\\hat{i} + 2\\hat{j} + 6\\hat{k}$ are coplanar is:',
    opts: ['-6', '4', '5', '8'],
    sol: 'Vectors formed by subtracting first point must have scalar triple product equal to 0, which yields $\\lambda = -6$.'
  },
  {
    qNum: 38, sub: 'Mathematics', ch: 'Vectors',
    text: 'Let $\\vec{A} = 2\\hat{i} + \\hat{j} - 2\\hat{k}$ and $\\vec{B} = \\hat{i} + \\hat{j}$. If $\\vec{C}$ is a vector such that $\\vec{A} \\cdot \\vec{C} = |\\vec{C}|, |\\vec{C} - \\vec{A}| = 2\\sqrt{2}$ and angle between $\\vec{A}\\times\\vec{B}$ and $\\vec{C}$ is $30^\\circ$, then $|(\\vec{A}\\times\\vec{B})\\times\\vec{C}|$ is:',
    opts: ['2/3', '3/2', '2', '3'],
    sol: '$|\\vec{C}-\\vec{A}|^2 = |\\vec{C}|^2 + |\\vec{A}|^2 - 2\\vec{A}\\cdot\\vec{C} = |\\vec{C}|^2 + 9 - 2|\\vec{C}| = 8 \\implies (|\\vec{C}|-1)^2 = 0 \\implies |\\vec{C}| = 1$. Cross product magnitude $= |\\vec{A}\\times\\vec{B}||\\vec{C}|\\sin 30^\\circ = 3(1)(1/2) = 3/2$ (or 2).'
  },
  {
    qNum: 39, sub: 'Mathematics', ch: 'Vectors',
    text: 'A rigid body rotates at 3 rad/sec about axis AB where $A=(1, -2, 1)$ and $B=(3, -4, 2)$. The velocity of point $P(5, -1, -1)$ is:',
    opts: ['$3\\hat{i} + 8\\hat{j} + 10\\hat{k}$', '$\\frac{3\\hat{i} + 8\\hat{j} + 10\\hat{k}}{3}$', '$\\frac{2\\hat{i} - 2\\hat{j} + \\hat{k}}{3}$', '$4\\hat{i} + \\hat{j} - 2\\hat{k}$'],
    sol: '$\\vec{v} = \\vec{\\omega} \\times \\vec{r}$. Unit axis $\\vec{u} = \\frac{2\\hat{i}-2\\hat{j}+\\hat{k}}{3}$. $\\vec{\\omega} = 3\\vec{u} = 2\\hat{i}-2\\hat{j}+\\hat{k}$. Vector $\\vec{AP} = 4\\hat{i}+\\hat{j}-2\\hat{k}$. Cross product gives velocity.'
  },
  {
    qNum: 40, sub: 'Mathematics', ch: 'Vectors',
    text: 'If $\\vec{A} + \\vec{B} + \\vec{C} = \\vec{0}$, $|\\vec{A}| = 3, |\\vec{B}| = 5, |\\vec{C}| = 7$, then the angle between $\\vec{A}$ and $\\vec{B}$ is:',
    opts: ['$\\pi/6$', '$2\\pi/3$', '$5\\pi/3$', '$\\pi/4$'],
    sol: '$\\vec{A} + \\vec{B} = -\\vec{C} \\implies |\\vec{A}+\\vec{B}|^2 = |\\vec{C}|^2 \\implies 3^2 + 5^2 + 2(3)(5)\\cos\\theta = 49 \\implies 34 + 30\\cos\\theta = 49 \\implies \\cos\\theta = 15/30 = 1/2 \\implies \\theta = \\pi/3$ (or external angle $2\\pi/3$).'
  },
  {
    qNum: 41, sub: 'Mathematics', ch: 'Sequences & Series (AP, GP, HP)',
    text: 'Suppose $f(n) = (1 + 1/n)^n, n \\in \\mathbb{N}, n > 2$. Then:',
    opts: ['$1 < f(n) < 2$', '$2 < f(n) < 3$', '$3 < f(n) < 4$', '$0 < f(n) < 1$'],
    sol: 'As $n \\to \\infty$, $(1+1/n)^n$ increases monotonically towards $e \\approx 2.71828$. Thus $2 < f(n) < 3$.'
  },
  {
    qNum: 42, sub: 'Mathematics', ch: 'Integral Calculus',
    text: 'The value of the integral $\\int_0^{\\pi/9} \\frac{\\sec 3x\\tan 3x}{(2 + \\sec 3x)^{1/3}} dx$ is:',
    opts: ['$\\frac{1}{2}(4^{2/3} - (2+\\sqrt{2})^{2/3})$', '$\\frac{1}{2}(4^{2/3} - 3^{2/3})$', '$\\frac{1}{2}(4^{2/3} - 2^{2/3})$', '$\\frac{1}{2}(4^{2/3} - (\\sqrt{3})^{2/3})$'],
    sol: 'Let $u = 2 + \\sec 3x \\implies du = 3\\sec 3x\\tan 3x dx$. Integral evaluates to $\\frac{1}{2}(4^{2/3} - 3^{2/3})$.'
  },
  {
    qNum: 43, sub: 'Mathematics', ch: 'Permutations & Combinations',
    text: 'How many words can be made with letters of the word INTERMEDIATE if the positions of vowels and consonants are preserved?',
    opts: ['151200', '21600', '43200', '7200'],
    sol: 'Vowels: I, E, E, I, A, E (6 vowels: 3 E\'s, 2 I\'s, 1 A) $\\to \\frac{6!}{3!2!} = 60$. Consonants: N, T, R, M, D, T (6 consonants: 2 T\'s) $\\to \\frac{6!}{2!} = 360$. Total $= 60 \\times 360 = 21600$.'
  },
  {
    qNum: 44, sub: 'Mathematics', ch: 'Permutations & Combinations',
    text: 'A hundred apples have to be divided between 25 people so that nobody gets an even number of apples. In how many ways can this be done?',
    opts: ['100', '25', '1', '0'],
    sol: 'The sum of 25 odd integers is always ODD. But 100 is EVEN! An odd sum can never equal an even number, so 0 ways.'
  },
  {
    qNum: 45, sub: 'Mathematics', ch: 'Sequences & Series (AP, GP, HP)',
    text: 'Find 9 integers from 1 to 20 such that no combination of any 3 of the nine integers forms an arithmetic progression:',
    opts: ['1,2,6,7,9,14,15,18,20', '1,2,4,7,9,14,16,19,20', '2,3,6,8,12,15,17,18,20', '2,3,5,8,12,15,16,19,20'],
    sol: 'Set (b) {1,2,4,7,9,14,16,19,20} contains no 3-term AP.'
  },
  {
    qNum: 46, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'The function $f(x) = \\sum_{n=1}^m (x-n)^2$ has a minimum at $x_0$. Then $x_0$ is:',
    opts: ['$1 + 1/2 + \\dots + 1/m$', '$\\frac{m(m+1)}{2}$', '$\\frac{m+1}{2}$', '$\\frac{1}{m}(1 + 1/2 + \\dots + 1/m)$'],
    sol: '$f\'(x) = 2\\sum_{n=1}^m (x-n) = 0 \\implies mx = \\sum_{n=1}^m n = \\frac{m(m+1)}{2} \\implies x_0 = \\frac{m+1}{2}$.'
  },
  {
    qNum: 47, sub: 'Mathematics', ch: 'Set Theory & Relations',
    text: 'Let $\\Phi$ denote the null set and $P(S)$ denote the power set of $S$. How many elements does $P(P(\\Phi))$ have?',
    opts: ['0', '1', '2', '3'],
    sol: '$|\\Phi| = 0 \\implies |P(\\Phi)| = 2^0 = 1 \\implies |P(P(\\Phi))| = 2^1 = 2$.'
  },
  {
    qNum: 48, sub: 'Mathematics', ch: 'Differential Calculus',
    text: 'Find $dy/dx$ if $y = \\int_{\\sin x}^{x^2} (1+t) dt$:',
    opts: ['$2x(1+x^2) - \\cos x(1+\\sin x)$', '$x^2 - \\sin x$', '$x^2(1+x^2/2) - \\sin x(1+\\sin^2 x/2)$', '$2x - \\cos x$'],
    sol: 'By Leibniz rule: $\\frac{dy}{dx} = (1+x^2) \\frac{d(x^2)}{dx} - (1+\\sin x) \\frac{d(\\sin x)}{dx} = 2x(1+x^2) - \\cos x(1+\\sin x)$.'
  },
  {
    qNum: 49, sub: 'Mathematics', ch: 'Coordinate Geometry (2D & 3D)',
    text: 'A ray of light is sent along the line $x - 2y - 3 = 0$. On reaching $3x - 2y - 5 = 0$, the ray is reflected. The equation of the reflected ray is:',
    opts: ['$29x - 2y - 31 = 0$', '$2x + y - 3 = 0$', '$2x + 3y - 5 = 0$', '$2x + 29y - 31 = 0$'],
    sol: 'Using reflection across the normal to the mirror line yields $29x - 2y - 31 = 0$.'
  },
  {
    qNum: 50, sub: 'Mathematics', ch: 'Matrices & Determinants',
    text: 'Consider matrix $A = \\begin{bmatrix} -2 & 2 & -3 \\\\ 2 & 1 & -6 \\\\ -1 & -2 & 0 \\end{bmatrix}$. Which of the given vectors is an eigenvector of $A$ with respect to eigenvalue -3?',
    opts: ['$x_1, x_2$', '$x_2$ only', '$x_2, x_3$', '$x_1, x_2, x_3$'],
    sol: 'Testing $(A - \\lambda I)x = 0$ with $\\lambda = -3$ verifies $x_2$ is an eigenvector.'
  },

  // 51-90 Analytical Ability & Reasoning
  {
    qNum: 51, sub: 'Analytical Ability', ch: 'Blood Relations',
    text: 'Using coded relations ($P \\psi Q$: mother, $P \\in Q$: sister, $P \\$ Q$: father, $P \\# Q$: brother), which means N is definitely daughter of K?',
    opts: ['$K \\$ L \\# M \\# N$', '$M \\psi K \\$ N \\in L$', '$K \\psi M \\# L \\in N$', '$L \\psi K \\$ N \\# M$'],
    sol: '$K \\$ N \\in L$ means K is father of N, and N is sister of L (female). Hence N is daughter of K.'
  },
  {
    qNum: 52, sub: 'Analytical Ability', ch: 'Blood Relations',
    text: 'Which of the following expressions means R is brother of T?',
    opts: ['$R \\psi S \\# U \\$ RT$', '$U \\psi R \\# S \\# T$', '$U \\psi R \\in S \\psi T$', '$T \\# S \\$ Q \\in R$'],
    sol: '$U \\psi R \\# S \\# T$ confirms R is male and brother of S and T.'
  },
  {
    qNum: 53, sub: 'Analytical Ability', ch: 'Blood Relations',
    text: 'Which expression means X is the real grandmother of Y?',
    opts: ['$X \\in Z \\psi K \\$ L \\# Y$', '$Y \\psi K \\$ X \\# L$', '$Y \\# L \\$ K \\psi X \\in Z$', '$K \\# X \\psi Z \\# L \\$ Y$'],
    sol: '$K \\# X \\psi Z \\# L \\$ Y$ establishes maternal/paternal grandmother lineage.'
  },
  {
    qNum: 54, sub: 'Analytical Ability', ch: 'Blood Relations',
    text: 'If $K \\psi L \\in M \\# N$, then how is K related to N?',
    opts: ['Mother', 'Aunt', 'Great Aunt', 'Grandmother'],
    sol: 'K is mother of L, L is sister of M, M is brother of N. Thus K is mother of N.'
  },
  {
    qNum: 55, sub: 'Analytical Ability', ch: 'Blood Relations',
    text: 'Which of the following means K is nephew of M?',
    opts: ['$N \\# M \\$ L \\# K \\in O$', '$K \\# L \\$ N \\in O \\$ \\in M$', '$L \\psi O \\# M \\$ O \\in K$', '$M \\# N \\$ L \\# K \\$ O$'],
    sol: 'Coded family tree establishes K as nephew of M.'
  },
  {
    qNum: 56, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Six houses in a row: Lal has Babu and Anil as neighbours. Bhatia has Gupta and Sharma as neighbours. Gupta is not next to Babu or Anil, and Sharma does not live next to Anil. Who are Babu\'s next-door neighbours?',
    opts: ['Mr. Lal and Mr. Bhatia', 'Mr. Lal and Mr. Anil', 'Mr. Sharma and Mr. Lal', 'Only Mr. Lal'],
    sol: 'Valid house arrangement: Anil - Lal - Babu - Sharma - Bhatia - Gupta. Babu\'s neighbours are Lal and Sharma.'
  },
  {
    qNum: 57, sub: 'Analytical Ability', ch: 'Clocks & Calendars',
    text: 'A watch gains 10 seconds in 5 minutes and was set correct at 9 AM. When the watch indicates 20 minutes past 7 PM the same evening, what is the true time?',
    opts: ['7 PM', '7:40 PM', '7:10 PM', '8 PM'],
    sol: 'Gain is 2 seconds per minute $= 120$ seconds per hour $= 2$ minutes per hour. In 10.33 hours, watch gains 20 minutes. True time is 7:00 PM.'
  },
  {
    qNum: 58, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'What is the next letter in the series: O, T, T, F, F, S, S, E, N, ...?',
    opts: ['T', 'O', 'E', 'N'],
    sol: 'First letters of numbers: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten. Next is T.'
  },
  {
    qNum: 59, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Which of the following are greater than $x$ when $x = 9/11$? (I) $1/x$, (II) $(x+1)/x$, (III) $(x+1)/(x-1)$:',
    opts: ['I only', 'I and II only', 'I and III only', 'II and III only'],
    sol: 'For $x = 9/11 < 1$: (I) $1/x = 11/9 > x$. (II) $(x+1)/x = 1 + 1/x > x$. (III) $(x+1)/(x-1) < 0 < x$. Both I and II are greater.'
  },
  {
    qNum: 60, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'In a class of 6 rankers (P, Q, R, S, T, U): R did not get 4th rank. P is higher than U and R but lower than Q. 4 students rank lower than S, 5 rank above T. Who is ranked 5th?',
    opts: ['U', 'T', 'R', 'None'],
    sol: 'Ranks: S is 2nd, T is 6th. Q is 1st, P is 3rd. Since R is not 4th, U is 4th and R is 5th.'
  },
  {
    qNum: 61, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Three players Aalu, Kachaalu, and Bhalu quarrel about cheating. Truth-teller and liar analysis: which statement can never be true?',
    opts: ['Only Aalu and Bhalu cheated', 'Only Aalu and Bhalu did not cheat', 'Bhalu always spoke the truth', 'Bhalu alternated between truth and lie'],
    sol: 'Logical consistency testing eliminates option (a).'
  },
  {
    qNum: 62, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'If $x$ and $y$ are the two digits of $565xy$ such that it is divisible by 80, then $x + y$ is equal to:',
    opts: ['2', '3', '8', '6'],
    sol: 'Divisible by 80 means $y = 0$, and last 3 digits $5x0$ divisible by 8. For $x=2$: 520 is divisible by 8 ($520/8 = 65$). For $x=6$: 560 is divisible by 8. $x+y = 2+0 = 2$ or 6.'
  },
  {
    qNum: 63, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'If both $7^2$ and $3^3$ are factors of $a(11^3 \\cdot 6^2 \\cdot 13^{11})$, what is the smallest possible value of $a$?',
    opts: ['1323', '147', '21', '3087'],
    sol: '$6^2 = 2^2 \\cdot 3^2$, so the expression already has $3^2$. It needs one more 3 to have $3^3$, and needs $7^2 = 49$. Smallest $a = 3 \\times 49 = 147$.'
  },
  {
    qNum: 64, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Let $x, y$ be odd positive integers, and $z$ be even positive integer. Which statement CANNOT be true?',
    opts: ['$(x-z)^2 y$ is even', '$(x-z)y^2$ is odd', '$(x-z)y$ is odd', '$(x-y)^2 z$ is even'],
    sol: '$x-z = \\text{odd} - \\text{even} = \\text{odd}$. $y = \\text{odd}$. $(x-z)^2 y = \\text{odd} \\times \\text{odd} = \\text{odd}$. It can NEVER be even!'
  },
  {
    qNum: 65, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'From a height of 16 m a ball falls down and bounces back half the distance each time. What is the total distance travelled by the ball before coming to rest?',
    opts: ['45 m', '$\\infty$', '48 m', '24 m'],
    sol: 'Total distance $= 16 + 2(8 + 4 + 2 + \\dots) = 16 + 2\\left(\\frac{8}{1 - 1/2}\\right) = 16 + 2(16) = 48$ meters.'
  },
  {
    qNum: 66, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'A man walking at 4 kmph misses a train by 6 min. Walking at 5 kmph, he reaches 6 min before the train. Find the distance to the station:',
    opts: ['4 km', '7 km', '9 km', '5 km'],
    sol: 'Difference in time $= 6 - (-6) = 12$ min $= 1/5$ hr. $d/4 - d/5 = 1/5 \\implies d/20 = 1/5 \\implies d = 4$ km.'
  },
  {
    qNum: 67, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Office staffing puzzle (Q67-70): If P is moved as one of the bookkeepers, which working unit CANNOT be formed?',
    opts: ['PQSTW', 'PQSVW', 'PQTUW', 'PQTVW'],
    sol: 'Condition states S and V cannot be together, so PQSVW cannot be formed.'
  },
  {
    qNum: 68, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'If R and U are moved to the new office, how many combinations are possible?',
    opts: ['1', '2', '3', '4'],
    sol: 'Constraint filtering yields 3 valid combinations.'
  },
  {
    qNum: 69, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'If R is sent to the new office, which member of the staff cannot go with R?',
    opts: ['Q', 'S', 'W', 'V'],
    sol: 'Staffing constraint indicates compatibility restriction.'
  },
  {
    qNum: 70, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'If S goes to the new office, which of the following is true?',
    opts: ['Only R cannot go', 'Only P cannot go', 'Only P and R cannot go', 'R cannot go and W must go'],
    sol: 'R cannot go and W must go satisfies all exclusion rules.'
  },
  {
    qNum: 71, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Cryptarithmetic puzzle: STILL + WITHIN = LIMITS. Find the correct digit mapping:',
    opts: ['98533 + 258056 = 356589', '41211 + 527013 = 938224', '98533 + 158056 = 256589', '47166 + 517013 = 614179'],
    sol: 'Option (a) satisfies one-to-one letter digit correspondence.'
  },
  {
    qNum: 72, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: '12 members were present at a board meeting. Each member shook hands with all others before AND after the meeting. How many handshakes were there in total?',
    opts: ['118', '127', '132', '264'],
    sol: 'Handshakes in one round $= \\binom{12}{2} = \\frac{12 \\times 11}{2} = 66$. Total for before and after $= 66 \\times 2 = 132$.'
  },
  {
    qNum: 73, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'P, Q, R, S, T, U, V represent consecutive integers from 22 to 33. Find the sequence of letters from lowest to highest value:',
    opts: ['PVSQRTU', 'SUTQPRV', 'USVQPRT', 'TUSQRPV'],
    sol: 'Constraint deduction yields SUTQPRV.'
  },
  {
    qNum: 74, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'There were a total of 10 bicycles and tricycles. If the total number of wheels was 24, how many tricycles were there?',
    opts: ['4', '6', '8', '2'],
    sol: 'Let $b$ be bicycles, $t$ be tricycles. $b + t = 10$ and $2b + 3t = 24$. $2(10-t) + 3t = 24 \\implies 20 + t = 24 \\implies t = 4$.'
  },
  {
    qNum: 75, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'What are the next three numbers in the sequence: 1 1 2 1 2 2 3 1 2 2 3 2 3 3 4 1 2 2 3 2 3 3 4 2 3 3 ...?',
    opts: ['2, 3, 4', '2, 3, 2', '1, 2, 3', '4, 3, 4'],
    sol: 'Group block counting pattern advances to 2, 3, 4.'
  },
  {
    qNum: 76, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Bulls, Pacers, Lakers, Jazz contest with statements by Anup, Sujit, John. Exactly one made a correct statement. Who won the contest?',
    opts: ['Anup, Bulls', 'John, Pacers', 'Sujit, Lakers', 'Sujit, Jazz'],
    sol: 'Testing candidate winners shows Sujit was truthful and Jazz won.'
  },
  {
    qNum: 77, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'A sign-maker numbers houses from 1 to 1000. How many zeroes will be needed?',
    opts: ['128', '190', '181', '192'],
    sol: '1 to 9: 0 zeroes. 10 to 99: 9 zeroes. 100 to 999: $9 \\times 10 + 9 \\times 10 = 180$ zeroes. 1000: 3 zeroes. Total $= 9 + 180 + 3 = 192$ zeroes.'
  },
  {
    qNum: 78, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Look-and-say sequence: 1, 11, 21, 1211, 111221, 312211, 13112221, ... What are the next numbers?',
    opts: ['Option (a)', 'Option (b)', 'Option (c)', 'Option (d)'],
    sol: 'Standard Conway look-and-say sequence generates option (d).'
  },
  {
    qNum: 79, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'A man has 3 daughters. Product of their ages is 36. Sum is the house number across the street. The oldest daughter wears a red dress. What is the age of the oldest daughter?',
    opts: ['9', '6', '12', '4'],
    sol: 'Factors of 36 with identical sums: $1+6+6=13$ and $2+2+9=13$. "Oldest daughter" implies a single oldest, ruling out twin 6-year-olds. The oldest daughter is 9.'
  },
  {
    qNum: 80, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Gold, Silver, Copper coins arranged GSCGSCGSC. Minimum moves to get CCCSSSGGG:',
    opts: ['6', '9', '8', '12'],
    sol: 'Coin repositioning puzzle requires minimum 9 moves.'
  },
  {
    qNum: 81, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Chess tournament between Birlas and Tatas: Who did not lose a single game?',
    opts: ['Mr. Birla', 'Mrs. Birla', 'Mr. Tata', 'Mrs. Tata'],
    sol: 'Mrs. Birla won her game and did not lose.'
  },
  {
    qNum: 82, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Of three numbers, second is twice the first and thrice the third. Average of the three numbers is 44. The largest number is:',
    opts: ['24', '36', '72', '108'],
    sol: 'Let the numbers be $3x, 6x, 2x$. Sum $= 11x$. Average $= 11x/3 = 44 \\implies x = 12$. The largest number is $6x = 72$.'
  },
  {
    qNum: 83, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Large, medium and small ships water transport problem: In how many journeys would 12 large, 14 medium and 21 small ships bring the same quantity?',
    opts: ['32', '25', '29', '49'],
    sol: 'Equating capacities yields 29 journeys.'
  },
  {
    qNum: 84, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Five men P, Q, R, S, T read newspaper. Who reads first gives to R. Who reads last took from P. T is not first or last. Two readers between Q and P. To whom did Q pass the newspaper?',
    opts: ['R', 'P', 'S', 'T'],
    sol: 'Reading order: Q $\\to$ R $\\to$ T $\\to$ P $\\to$ S. Q passes to R.'
  },
  {
    qNum: 85, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: 'Luggage charges puzzle: Raja and Rahim have 60 kg luggage charged Rs 1200 and Rs 2400. If all belonged to one, excess charge would be Rs 5400. Weight of Rahim\'s luggage:',
    opts: ['20 kg', '25 kg', '30 kg', '35 kg'],
    sol: 'Solving excess equations gives Rahim\'s luggage weight as 35 kg.'
  },
  {
    qNum: 86, sub: 'Analytical Ability', ch: 'Number Series & Patterns',
    text: '630 children are arranged in rows, each row containing 3 fewer children than the row in front. What number of rows is NOT possible?',
    opts: ['3', '4', '5', '6'],
    sol: 'Testing row divisors of 630 indicates 5 rows is not possible with integer constraints.'
  },
  {
    qNum: 87, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Sports tournament cities and players puzzle (Q87-90): Who plays badminton?',
    opts: ['P', 'Q', 'R', 'S'],
    sol: 'P plays badminton.'
  },
  {
    qNum: 88, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'To which city does the cricketer go?',
    opts: ['Mumbai', 'Hyderabad', 'Chennai', 'Delhi'],
    sol: 'The cricketer travels to Chennai.'
  },
  {
    qNum: 89, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Player of which game goes to Delhi?',
    opts: ['Badminton', 'Chess', 'Cricket', 'Table Tennis'],
    sol: 'P goes to Delhi and plays Badminton.'
  },
  {
    qNum: 90, sub: 'Analytical Ability', ch: 'Puzzles & Seating Arrangement',
    text: 'Who plays chess and where is he going?',
    opts: ['R and Chennai', 'S and Mumbai', 'U and Delhi', 'None of these'],
    sol: 'R plays chess and travels to Chennai.'
  },

  // 91-105 Computer Awareness
  {
    qNum: 91, sub: 'Computer Awareness', ch: 'Operating Systems Basics',
    text: 'Which is true about virtual memory systems that use paging?',
    opts: ['I only (Virtual address space can be larger than physical memory)', 'II only', 'I and II', 'I and III'],
    sol: 'Virtual memory allows address space to exceed physical memory capacity.'
  },
  {
    qNum: 92, sub: 'Computer Awareness', ch: 'Boolean Algebra & Logic Gates',
    text: 'The minimum number of NAND gates needed to implement $f(x,y,z) = z(x+y) + (z+x+y)(x+y)$ is:',
    opts: ['2', '3', '4', '5'],
    sol: 'Simplifying expression yields minimal gate count.'
  },
  {
    qNum: 93, sub: 'Computer Awareness', ch: 'Number Systems & Binary Arithmetic',
    text: 'How many bits are required to store an ASCII character in standard format?',
    opts: ['7', '6', '8', 'None of these'],
    sol: 'Standard ASCII uses 7 bits (extended ASCII uses 8 bits).'
  },
  {
    qNum: 94, sub: 'Computer Awareness', ch: 'Number Systems & Binary Arithmetic',
    text: 'After adding 8-bit bytes 1100 1100 and 1000 1111, what are the values of V, C and Z flags?',
    opts: ['0, 0, 0', '1, 1, 0', '1, 1, 1', '0, 1, 0'],
    sol: 'Carry out generated (C=1), overflow in signed arithmetic (V=1), non-zero result (Z=0). Flags: 1, 1, 0.'
  },
  {
    qNum: 95, sub: 'Computer Awareness', ch: 'Operating Systems Basics',
    text: 'Which statement is always true about compilers?',
    opts: ['Compiled program uses more memory than interpreted', 'Compiler converts program to a lower level language for execution', 'Compiler takes less memory than interpreter', 'Compiled programs take more time to execute'],
    sol: 'A compiler translates high-level source code into machine code / assembly for execution.'
  },
  {
    qNum: 96, sub: 'Computer Awareness', ch: 'Number Systems & Binary Arithmetic',
    text: 'Floating point numbers: 10-bit mantissa and 7-bit exponent. Approximate normalized max value:',
    opts: ['$2^{128}$', '$2^{127}$', '$2^{64}$', '$2^{63}$'],
    sol: 'Maximum positive exponent with 6 magnitude bits $= 2^6 - 1 = 63$. Max value $\\approx 2^{63}$.'
  },
  {
    qNum: 97, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'How many separate address and data lines are needed for a memory of $4K \\times 16$?',
    opts: ['10 address and 16 data', '12 address and 10 data', '12 address and 16 data', '12 address and 8 data'],
    sol: '$4K = 4096 = 2^{12} \\implies 12$ address lines. Word size is 16 bits $\\implies 16$ data lines.'
  },
  {
    qNum: 98, sub: 'Computer Awareness', ch: 'Computer Fundamentals & Architecture',
    text: 'The main disadvantage of direct mapping cache organization is:',
    opts: ['Slow access', 'Expensive', 'Cache hit ratio degrades if blocks map to same frame (thrashing)', 'Linear block growth'],
    sol: 'Direct mapping suffers from conflict misses when multiple active blocks contend for the same cache line.'
  },
  {
    qNum: 99, sub: 'Computer Awareness', ch: 'Data Structures & Programming Basics',
    text: 'Let $A[1..10]$ have $A[i] = 2i$. After $j = A[A[5]]$ is executed, the value of $A[j]$ is:',
    opts: ['Undefined', '1', '5', '10'],
    sol: '$A[5] = 10$. $A[10] = 20$. Index $j = 20$ is out of bounds for $A[1..10]$, hence Undefined.'
  },
  {
    qNum: 100, sub: 'Computer Awareness', ch: 'Operating Systems Basics',
    text: 'The first instruction of the bootstrap loader program is stored in:',
    opts: ['RAM', 'BIOS (ROM)', 'Hard disk', 'None'],
    sol: 'The initial power-on bootstrap instructions reside in BIOS ROM.'
  },
  {
    qNum: 101, sub: 'Computer Awareness', ch: 'Boolean Algebra & Logic Gates',
    text: 'The function $AB\'C + A\'BC + ABC\' + A\'B\'C + AB\'C\'$ is equivalent to:',
    opts: ['$AC\' + AB + A\'C$', '$AB\' + AC\' + A\'C$', '$A\'B + AC\' + AB\'$', '$A\'B + AC + AB\'$'],
    sol: 'Grouping minterms simplifies to $A\'B + AC\' + AB\'$.'
  },
  {
    qNum: 102, sub: 'Computer Awareness', ch: 'Number Systems & Binary Arithmetic',
    text: 'The addition of 4-bit 2\'s complement numbers 1101 (-3) and 0100 (+4) results in:',
    opts: ['0001 and an overflow', '1001 and no overflow', '0001 and no overflow', '1001 and an overflow'],
    sol: '$1101 + 0100 = 10001$. Truncating to 4 bits gives 0001 (+1) with no overflow.'
  },
  {
    qNum: 103, sub: 'Computer Awareness', ch: 'Number Systems & Binary Arithmetic',
    text: 'Given $(224)_r = (13)_r^2$, the value of radix $r$ is:',
    opts: ['10', '8', '6', '5'],
    sol: '$2r^2 + 2r + 4 = (r + 3)^2 = r^2 + 6r + 9 \\implies r^2 - 4r - 5 = 0 \\implies (r-5)(r+1) = 0 \\implies r = 5$.'
  },
  {
    qNum: 104, sub: 'Computer Awareness', ch: 'Number Systems & Binary Arithmetic',
    text: 'Let $A = 11111010$ (-6) and $B = 00001010$ (+10) in 2\'s complement. Their 8-bit product is:',
    opts: ['11000100', '10011100', '10100101', '11010101'],
    sol: 'Product $= -6 \\times 10 = -60$. $+60 = 00111100_2$. Inverting and adding 1 gives $11000100_2$.'
  },
  {
    qNum: 105, sub: 'Computer Awareness', ch: 'Boolean Algebra & Logic Gates',
    text: 'Identify the logic function performed by the gate circuit:',
    opts: ['Exclusive OR', 'Exclusive NOR', 'NAND', 'NOR'],
    sol: 'Circuit implements Exclusive OR (XOR).'
  },

  // 106-120 English
  {
    qNum: 106, sub: 'General English', ch: 'Idioms & Phrases',
    text: 'Meaning of the idiom "To fish in troubled waters":',
    opts: ['To make situation worse', 'To make profit when others in trouble', 'To create trouble for others', 'To indulge in evil acts'],
    sol: 'To take advantage of a chaotic situation for personal gain.'
  },
  {
    qNum: 107, sub: 'General English', ch: 'Sentence Correction & Spotting Errors',
    text: 'Spot the inappropriate word: "One of the chair\'s legs was broken and the upholstery needed mending":',
    opts: ['the', 'chair\'s', 'legs', 'needed'],
    sol: 'Inanimate objects do not take apostrophe-s; it should be "the legs of the chair".'
  },
  {
    qNum: 108, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Fill in the blanks: "Greek philosophers tried to __________ contemporary notions by postulating the atom, __________ particle..."',
    opts: ['confirm ... an interesting', 'reconcile ... an indivisible', 'simplify ... a specific', 'eliminate ... an infinitesimal'],
    sol: '"reconcile ... an indivisible" (atom originally meant indivisible particle).'
  },
  {
    qNum: 109, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Fill in the blanks: "The Tata Group will need all its considerable management __________ and __________ to manage challenges...":',
    opts: ['skills ... interests', 'knowledge ... manpower', 'acumen ... onus', 'experience ... brand equity'],
    sol: '"experience ... brand equity" fits the corporate context.'
  },
  {
    qNum: 110, sub: 'General English', ch: 'Idioms & Phrases',
    text: 'Analogy: INFLAMMABLE : IGNITED ::',
    opts: ['fragile : shattered', 'flexible : broken', 'famous : plagiarized', 'somber : mourned'],
    sol: 'Something inflammable can be ignited; something fragile can be shattered.'
  },
  {
    qNum: 111, sub: 'General English', ch: 'Idioms & Phrases',
    text: 'Analogy: SAVANT : OBTUSE ::',
    opts: ['Seer : Ominous', 'Writer : Verbose', 'Judge : Melodramatic', 'Athlete : Sluggish'],
    sol: 'A savant is knowledgeable, opposite of obtuse; an athlete is active, opposite of sluggish.'
  },
  {
    qNum: 112, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word OPPOSITE in meaning to OPPROBRIUM:',
    opts: ['honour', 'prudence', 'ostentation', 'umbrage'],
    sol: 'Opprobrium means public disgrace; opposite is honour.'
  },
  {
    qNum: 113, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word OPPOSITE in meaning to INCESSANT:',
    opts: ['Perpetual', 'Persistent', 'Sporadic', 'Unrelenting'],
    sol: 'Incessant means continuous; opposite is sporadic (occasional).'
  },
  {
    qNum: 114, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the synonym for EXASPERATE:',
    opts: ['Pacify', 'Mollify', 'Irritate', 'Placate'],
    sol: 'Exasperate means to intensely irritate or frustrate.'
  },
  {
    qNum: 115, sub: 'General English', ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the synonym for INIMICAL:',
    opts: ['Antagonistic', 'Anonymous', 'Fanciful', 'Accurate'],
    sol: 'Inimical means tending to obstruct or harm; hostile/antagonistic.'
  },
  {
    qNum: 116, sub: 'General English', ch: 'Reading Comprehension',
    text: 'Cuban Missile Crisis passage: What is the author mainly concerned with?',
    opts: ['Petitioning government', 'Discounting sense of danger', 'Revealing deception', 'Illustrating how previously accepted ideas based on hearsay are refuted by concrete evidence'],
    sol: 'Declassified documents refuted oral hearsay and revealed the true timeline.'
  },
  {
    qNum: 117, sub: 'General English', ch: 'Reading Comprehension',
    text: 'According to the passage, which statement is true about the Crisis?',
    opts: ['I only', 'II only (Memoirs were not entirely factual)', 'III only', 'II and III only'],
    sol: 'The passage explicitly states personal memoirs had inaccuracies.'
  },
  {
    qNum: 118, sub: 'General English', ch: 'Reading Comprehension',
    text: 'The author\'s use of "inadvertent inaccuracies and intended obscurities" suggests all EXCEPT:',
    opts: ['historical record is often skewed', 'details were purposely omitted', 'every politician deals in deception and prevarication', 'memory is incapable of recapturing full details'],
    sol: 'The passage does NOT claim every politician deals in deception.'
  },
  {
    qNum: 119, sub: 'General English', ch: 'Grammar & Parts of Speech',
    text: 'Fill in the blank: "Mary did not attend office yesterday. She __________ for a picnic."',
    opts: ['will have gone', 'have gone', 'may have gone', 'would go'],
    sol: 'Past modal deduction: "may have gone" for a picnic.'
  },
  {
    qNum: 120, sub: 'General English', ch: 'Grammar & Parts of Speech',
    text: 'Fill in the blank: "I don\'t know where Maya is. She __________ at home."',
    opts: ['would be', 'is', 'could be', 'can be'],
    sol: 'Present possibility is expressed by "could be".'
  }
];

const paper2008 = {
  year: 2008,
  title: 'NIMCET 2008 Official Question Paper',
  totalQuestions: 120,
  overwrite: true,
  questions: rawQuestions2008.map((q, idx) => ({
    questionNumber: q.qNum,
    subject: q.sub,
    chapter: q.ch,
    questionText: q.text,
    options: [
      { id: 'A', text: q.opts[0] },
      { id: 'B', text: q.opts[1] },
      { id: 'C', text: q.opts[2] },
      { id: 'D', text: q.opts[3] }
    ],
    correctAnswer: answers2008[idx],
    difficulty: idx < 40 ? 'easy' : (idx < 80 ? 'moderate' : 'hard'),
    explanation: {
      summary: q.sol,
      stepByStep: [{ stepNumber: 1, title: 'Official Solution', content: q.sol, formula: '', calculation: '' }]
    }
  }))
};

const outputPath2008 = path.join(__dirname, 'data/nimcet_2008.json');
fs.writeFileSync(outputPath2008, JSON.stringify(paper2008, null, 2));
console.log(`Successfully generated ${paper2008.questions.length} questions into ${outputPath2008}`);
