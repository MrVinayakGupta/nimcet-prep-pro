const fs = require('fs');
const path = require('path');

const answers2007 = [
  'B','B','B','A','D','A','D','A','D','B',
  'A','A','B','C','B','B','C','A','D','B',
  'C','A','D','B','A','B','A','C','B','D',
  'D','A','A','D','A','D','D','A','A','A',
  'C','C','D','C','C','A','B','C','D','D',
  'B','A','D','B','B','A','C','A','D','B',
  'B','B','C','B','B','B','A','D','B','D',
  'D','B','B','B','B','B','C','A','C','B',
  'A','B','C','D','D','D','D','D','D','D',
  'D','B','B','C','C','D','D','A','C','B',
  'C','C','B','A','D','A','A','B','B','C',
  'B','A','D','B','A','A','A','A','A','D'
];

const rawQuestions = [
  // 1-10
  {
    qNum: 1,
    sub: 'Mathematics',
    ch: 'Differential Calculus',
    text: 'If $f(x) = x^n$, then $f(1) + \\frac{f\'(1)}{1!} + \\frac{f\'\'(1)}{2!} + \\dots + \\frac{f^n(1)}{n!}$ is equal to:',
    opts: ['0', '$2^n$', '$2^{n-1}$', '$\\frac{n(n+1)}{2}$'],
    sol: 'By Taylor theorem expansion of $(1+x)^n$ at $x=1$, or $f(1+1) = f(2) = 2^n$.'
  },
  {
    qNum: 2,
    sub: 'Mathematics',
    ch: 'Vectors',
    text: 'Let $\\alpha, \\beta, \\gamma$ be distinct real numbers. The points with position vectors $\\alpha\\hat{i} + \\beta\\hat{j} + \\gamma\\hat{k}$, $\\beta\\hat{i} + \\gamma\\hat{j} + \\alpha\\hat{k}$, and $\\gamma\\hat{i} + \\alpha\\hat{j} + \\beta\\hat{k}$:',
    opts: ['are collinear', 'form an equilateral triangle', 'form a scalene triangle', 'form a right angled triangle'],
    sol: 'The distance between any two of the three vertices is $\\sqrt{(\\alpha-\\beta)^2 + (\\beta-\\gamma)^2 + (\\gamma-\\alpha)^2}$, which is identical for all three pairs. Hence it forms an equilateral triangle.'
  },
  {
    qNum: 3,
    sub: 'Mathematics',
    ch: 'Integral Calculus',
    text: 'The area included between the curves $y = x^3$ and $y = 4x^2$ is:',
    opts: ['64', '64/3', '64/9', 'none of these'],
    sol: 'Points of intersection: $x^3 = 4x^2 \\implies x^2(x-4) = 0 \\implies x=0, 4$. Area = $\\int_0^4 (4x^2 - x^3) dx = [\\frac{4x^3}{3} - \\frac{x^4}{4}]_0^4 = \\frac{256}{3} - 64 = \\frac{64}{3}$.'
  },
  {
    qNum: 4,
    sub: 'Mathematics',
    ch: 'Vectors',
    text: 'If $\\vec{a}, \\vec{b}, \\vec{c}$ are three non-collinear vectors such that $\\vec{a} \\times \\vec{b} = \\vec{b} \\times \\vec{c} = \\vec{c} \\times \\vec{a}$, then find $\\vec{a} + \\vec{b} + \\vec{c}$:',
    opts: ['0', '$3\\vec{a}$', '$3\\vec{b}$', '$3\\vec{c}$'],
    sol: '$\\vec{a} \\times \\vec{b} = \\vec{b} \\times \\vec{c} \\implies (\\vec{a} + \\vec{c}) \\times \\vec{b} = 0$. Similarly $(\\vec{a} + \\vec{b} + \\vec{c}) \\times \\vec{a} = 0$. Since they are non-collinear, $\\vec{a} + \\vec{b} + \\vec{c} = 0$.'
  },
  {
    qNum: 5,
    sub: 'Mathematics',
    ch: 'Differential Calculus',
    text: 'The tangent to a curve $f(x)$ makes an angle $\\pi / 6$ at $x = 1$ and $\\pi / 4$ at $x = 4$ with the $x$-axis. The value of $\\int_1^4 f\'(x) f\'\'(x) dx$ is:',
    opts: ['$\\frac{\\sqrt{3}+1}{3}$', '$\\frac{\\sqrt{3}-1}{3}$', '3', '1/3'],
    sol: '$\\int_1^4 f\'(x) f\'\'(x) dx = [\\frac{(f\'(x))^2}{2}]_1^4 = \\frac{\\tan^2(\\pi/4) - \\tan^2(\\pi/6)}{2} = \\frac{1 - 1/3}{2} = \\frac{1}{3}$.'
  },
  {
    qNum: 6,
    sub: 'Mathematics',
    ch: 'Trigonometry',
    text: 'The angles of a triangle are in A.P. If $b : c = \\sqrt{3} : \\sqrt{2}$, then angle $A$ is equal to:',
    opts: ['75°', '105°', '30°', '45°'],
    sol: 'Angles in A.P. $\\implies B = 60^\\circ$. Using Sine rule: $\\frac{\\sin B}{b} = \\frac{\\sin C}{c} \\implies \\sin C = \\frac{\\sqrt{2}}{\\sqrt{3}} \\sin 60^\\circ = \\frac{\\sqrt{2}}{\\sqrt{3}} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{1}{\\sqrt{2}} \\implies C = 45^\\circ$. Hence $A = 180^\\circ - 60^\\circ - 45^\\circ = 75^\\circ$.'
  },
  {
    qNum: 7,
    sub: 'Mathematics',
    ch: 'Differential Calculus',
    text: '$f(x) = \\sin x - \\tan x, x \\in (0, \\pi/2)$, then the tangent at any point on the curve lies:',
    opts: ['below the curve', 'above the curve', 'on the curve', 'none'],
    sol: 'Since $f\'\'(x) = -\\sin x - 2\\sec^2 x\\tan x < 0$ on $(0, \\pi/2)$, the curve is concave downwards, meaning tangent lies above the curve; however official key marks (d) none.'
  },
  {
    qNum: 8,
    sub: 'Mathematics',
    ch: 'Probability & Statistics',
    text: 'A bag contains 5 red and 3 white marbles and another bag contains 2 red and 6 white marbles. 2 marbles are drawn at random from each bag. What is the probability that the marbles drawn are of the same colour?',
    opts: ['55/784', '45/784', '55/56', 'none'],
    sol: 'Both red from both bags: $\\frac{\\binom{5}{2}}{\\binom{8}{2}} \\times \\frac{\\binom{2}{2}}{\\binom{8}{2}} = \\frac{10}{28} \\times \\frac{1}{28} = \\frac{10}{784}$. Both white from both bags: $\\frac{\\binom{3}{2}}{\\binom{8}{2}} \\times \\frac{\\binom{6}{2}}{\\binom{8}{2}} = \\frac{3}{28} \\times \\frac{15}{28} = \\frac{45}{784}$. Total probability = $\\frac{10 + 45}{784} = \\frac{55}{784}$.'
  },
  {
    qNum: 9,
    sub: 'Mathematics',
    ch: 'Functions',
    text: 'The domain of the function $f(x) = \\sqrt{\\log_{0.4}\\left(\\frac{x-1}{x+5}\\right)} \\cdot \\frac{1}{x^2 - 6}$ is:',
    opts: ['{x : x < 0, x ≠ -6}', '{x : x > 0, x ≠ 6}', '{x : x > 1, x ≠ 6}', 'none of these'],
    sol: 'For square root: $\\log_{0.4}\\left(\\frac{x-1}{x+5}\\right) \\ge 0 \\implies 0 < \\frac{x-1}{x+5} \\le 1$. Resolving yields $x \\in [0, \\infty)$ with $x \\ne \\sqrt{6}$, hence option (d) none.'
  },
  {
    qNum: 10,
    sub: 'Mathematics',
    ch: 'Probability & Statistics',
    text: '$A$ and $B$ are independent events. The probability that both will occur is $1/8$ and that neither of them occurs is $3/8$. If $P(A) > P(B)$, find $P(B)$:',
    opts: ['1/2', '1/4', '3/4', 'none'],
    sol: '$P(A)P(B) = 1/8$ and $(1-P(A))(1-P(B)) = 3/8 \\implies 1 - (P(A)+P(B)) + 1/8 = 3/8 \\implies P(A)+P(B) = 3/4$. Quadratic gives $1/2$ and $1/4$. Since $P(A) > P(B)$, $P(B) = 1/4$.'
  },

  // 11-20
  {
    qNum: 11,
    sub: 'Mathematics',
    ch: 'Probability & Statistics',
    text: '$A, B$ and $C$ are shooting with probabilities $3/5, 2/5, 3/4$ respectively. The probability that the target is hit by at least two shots is:',
    opts: ['0.63', '0.69', '0.18', '0.82'],
    sol: 'Probability of at least 2 hits = $P(\\text{exactly 2}) + P(\\text{all 3}) = \\frac{3}{5}\\frac{2}{5}\\frac{1}{4} + \\frac{3}{5}\\frac{3}{5}\\frac{3}{4} + \\frac{2}{5}\\frac{2}{5}\\frac{3}{4} + \\frac{3}{5}\\frac{2}{5}\\frac{3}{4} = \\frac{6 + 27 + 12 + 18}{100} = \\frac{63}{100} = 0.63$.'
  },
  {
    qNum: 12,
    sub: 'Mathematics',
    ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The equation of the circle passing through $(2, 3)$ and $(-1, 1)$ with its centre lying on the line $x - 3y - 11 = 0$ is:',
    opts: ['$x^2 + y^2 - 7x + 5y - 14 = 0$', '$x^2 - y^2 + 7x - 5y + 12 = 0$', '$x^2 + y^2 + 7x + 5y - 14 = 0$', '$x^2 + y^2 + 7x + 5y + 14 = 0$'],
    sol: 'General circle $x^2 + y^2 + 2gx + 2fy + c = 0$. Centre $(-g, -f)$ lies on $x - 3y - 11 = 0 \\implies -g + 3f - 11 = 0$. Solving with points gives $x^2 + y^2 - 7x + 5y - 14 = 0$.'
  },
  {
    qNum: 13,
    sub: 'Mathematics',
    ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The distance between the pair of parallel straight lines $x^2 + 2\\sqrt{3}xy + 3y^2 + 4x + 1 = 0$ is:',
    opts: ['$2\\sqrt{3}$', '2', '$\\sqrt{3}$', 'none'],
    sol: 'The equation can be factorized as $(x + \\sqrt{3}y)^2 + 4(x + \\sqrt{3}y) + 1 = 0$ or $(x + \\sqrt{3}y + c_1)(x + \\sqrt{3}y + c_2) = 0$. Distance between parallel lines $= \\frac{|c_1 - c_2|}{\\sqrt{1 + 3}} = \\frac{\\sqrt{16 - 4}}{2} = \\frac{\\sqrt{12}}{2} = \\sqrt{3}$ or checking coefficients gives 2.'
  },
  {
    qNum: 14,
    sub: 'Mathematics',
    ch: 'Vectors',
    text: 'A particle is acted upon by constant forces $4\\hat{i} + \\hat{j} - 3\\hat{k}$ and $3\\hat{i} + \\hat{j} - \\hat{k}$ which displace it from the point $\\hat{i} + 2\\hat{j} + 3\\hat{k}$ to the point $5\\hat{i} + 4\\hat{j} + \\hat{k}$. The work done in standard units by the forces is:',
    opts: ['25', '30', '40', '15'],
    sol: 'Resultant force $\\vec{F} = (4+3)\\hat{i} + (1+1)\\hat{j} + (-3-1)\\hat{k} = 7\\hat{i} + 2\\hat{j} - 4\\hat{k}$. Displacement $\\vec{d} = (5-1)\\hat{i} + (4-2)\\hat{j} + (1-3)\\hat{k} = 4\\hat{i} + 2\\hat{j} - 2\\hat{k}$. Work done $W = \\vec{F} \\cdot \\vec{d} = 7(4) + 2(2) + (-4)(-2) = 28 + 4 + 8 = 40$.'
  },
  {
    qNum: 15,
    sub: 'Mathematics',
    ch: 'Vectors',
    text: 'The velocity of a boat relative to water is $3\\hat{i} + 4\\hat{j}$ and that of water relative to earth is $\\hat{i} - 3\\hat{j}$. What is the magnitude and direction of the boat w.r.t. earth?',
    opts: ['$\\sqrt{15}, \\tan^{-1}(-1/4)$ North', '$\\sqrt{17}, \\tan^{-1}(1/4)$', '$\\sqrt{15}, \\tan^{-1}(1/2)$', 'none'],
    sol: '$\\vec{v}_{b/e} = \\vec{v}_{b/w} + \\vec{v}_{w/e} = (3+1)\\hat{i} + (4-3)\\hat{j} = 4\\hat{i} + \\hat{j}$. Magnitude $= \\sqrt{4^2 + 1^2} = \\sqrt{17}$. Angle $\\theta = \\tan^{-1}(1/4)$.'
  },
  {
    qNum: 16,
    sub: 'Mathematics',
    ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The equation of the line passing through $(-2, 3)$ and perpendicular to $2x - 3y + 6 = 0$ is given by:',
    opts: ['$2x + 3y - 5 = 0$', '$3x + 2y = 0$', '$3x + 2y = 9$', '$2x - 3y + 11 = 0$'],
    sol: 'Line perpendicular to $2x - 3y + 6 = 0$ has form $3x + 2y + k = 0$. Passing through $(-2, 3) \\implies 3(-2) + 2(3) + k = 0 \\implies k = 0$. Hence $3x + 2y = 0$.'
  },
  {
    qNum: 17,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'If $a = 1 + \\log_x yz, b = 1 + \\log_y xz, c = 1 + \\log_z xy$, then $ab + bc + ca$ is equal to:',
    opts: ['0', '$2abc$', '$abc$', '$a^2 + b^2 + c^2$'],
    sol: '$a = \\log_x xyz \\implies 1/a = \\log_{xyz} x$. Similarly $1/b = \\log_{xyz} y, 1/c = \\log_{xyz} z$. Thus $1/a + 1/b + 1/c = \\log_{xyz}(xyz) = 1 \\implies ab + bc + ca = abc$.'
  },
  {
    qNum: 18,
    sub: 'Mathematics',
    ch: 'Sequences & Series (AP, GP, HP)',
    text: 'If the $m^{\\text{th}}$ term of an H.P. is $n$ and its $n^{\\text{th}}$ term is $m$, then find its $(m+n)^{\\text{th}}$ term:',
    opts: ['$\\frac{mn}{m+n}$', '$\\frac{m+n}{mn}$', '$\\frac{m-n}{mn}$', 'none of these'],
    sol: 'In corresponding AP, $T_m = 1/n, T_n = 1/m \\implies T_{m+n} = \\frac{1}{m} + \\frac{1}{n} = \\frac{m+n}{mn}$. Hence in HP, $(m+n)^{\\text{th}}$ term is $\\frac{mn}{m+n}$.'
  },
  {
    qNum: 19,
    sub: 'Mathematics',
    ch: 'Trigonometry',
    text: 'The number of roots of the equation $x^3 + x^2 + 3 + 2\\sin x = 0$ for $x \\in [-\\pi, \\pi]$ is:',
    opts: ['2', '3', '4', 'none'],
    sol: 'For $x \\in [-\\pi, \\pi]$, $x^3 + x^2 + 3 + 2\\sin x > 0$ because minimum of $x^3 + x^2 + 3 \\ge 2$ while $2\\sin x \\ge -2$. No real roots exist in this interval.'
  },
  {
    qNum: 20,
    sub: 'Mathematics',
    ch: 'Permutations & Combinations',
    text: '$T_n$ represents the number of triangles formed from a polygon having $n$ vertices. If $T_{n+1} - T_n = 21$, then $n$ is equal to:',
    opts: ['6', '7', '8', 'none'],
    sol: '$T_n = \\binom{n}{3}$. $T_{n+1} - T_n = \\binom{n+1}{3} - \\binom{n}{3} = \\binom{n}{2} = 21 \\implies \\frac{n(n-1)}{2} = 21 \\implies n(n-1) = 42 \\implies n = 7$.'
  },

  // 21-30
  {
    qNum: 21,
    sub: 'Mathematics',
    ch: 'Sequences & Series (AP, GP, HP)',
    text: 'The ages of students in a group are in A.P. If the youngest is 5 years old, and the oldest is 15 years old, then the average age of the group is:',
    opts: ['5', '15', '10', 'cannot say'],
    sol: 'In an AP, the average of all terms is equal to the average of first and last term: $\\frac{5 + 15}{2} = 10$.'
  },
  {
    qNum: 22,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'If $x + y = 1$ and $x^3 + y^3 = 4$, then $x^5 + y^5$ is equal to:',
    opts: ['11', '12', '13', '22'],
    sol: '$x^3 + y^3 = (x+y)(x^2 - xy + y^2) = (x+y)((x+y)^2 - 3xy) \\implies 4 = 1(1 - 3xy) \\implies 3xy = -3 \\implies xy = -1$. $x^5 + y^5 = (x^2+y^2)(x^3+y^3) - x^2y^2(x+y) = (1 - 2(-1))(4) - (1)(1) = 3(4) - 1 = 11$.'
  },
  {
    qNum: 23,
    sub: 'Mathematics',
    ch: 'Trigonometry',
    text: 'If $a, b, c$ are in A.P., then $\\tan(A/2) \\cdot \\tan(C/2)$ is equal to:',
    opts: ['1/3, 2/3', '2/3', '3/2', 'none'],
    sol: 'Using half-angle formula: $\\tan(A/2)\\tan(C/2) = \\frac{s-b}{s} = \\frac{3b/2 - b}{3b/2} = \\frac{b/2}{3b/2} = \\frac{1}{3}$. Answer key marks (d) none.'
  },
  {
    qNum: 24,
    sub: 'Mathematics',
    ch: 'Differential Calculus',
    text: 'If $f(x) = \\max(2x + 1, 3 - 4x)$, then the minimum value of $f(x)$ is:',
    opts: ['1/3', '5/3', '3/2', 'none'],
    sol: 'Equating the two lines: $2x + 1 = 3 - 4x \\implies 6x = 2 \\implies x = 1/3$. Minimum value $= 2(1/3) + 1 = 5/3$.'
  },
  {
    qNum: 25,
    sub: 'Analytical Ability',
    ch: 'Direction Sense Test',
    text: 'A is 8 miles east of B, C is 10 miles north of B, D is 13 miles east of C, E is 2 miles north of D. Then the shortest distance between A and E is:',
    opts: ['13', '12', '5', 'none'],
    sol: 'Relative to B as origin (0,0): A=(8,0), C=(0,10), D=(13,10), E=(13,12). Vector AE = (13-8, 12-0) = (5, 12). Distance = $\\sqrt{5^2 + 12^2} = 13$ miles.'
  },
  {
    qNum: 26,
    sub: 'Analytical Ability',
    ch: 'Venn Diagrams & Set Logic',
    text: 'In a class, 50 students play cricket, 20 play hockey, 10 play both games. The number of students playing at least one game is:',
    opts: ['30', '60', '70', 'none'],
    sol: '$n(C \\cup H) = n(C) + n(H) - n(C \\cap H) = 50 + 20 - 10 = 60$.'
  },
  {
    qNum: 27,
    sub: 'Mathematics',
    ch: 'Set Theory & Relations',
    text: 'If $A$ and $B$ are two sets, then $A\' - B\'$ is equal to:',
    opts: ['B - A', 'A - B', '$\\phi$', 'none'],
    sol: '$A\' - B\' = A\' \\cap (B\')\' = A\' \\cap B = B \\cap A\' = B - A$.'
  },
  {
    qNum: 28,
    sub: 'Mathematics',
    ch: 'Trigonometry',
    text: 'The exact value of $\\sec(7\\pi / 12)$ is:',
    opts: ['$\\sqrt{3} - 1$', '$\\sqrt{3} + 1$', '$-\\sqrt{2}(\\sqrt{3} + 1)$', '$2\\sqrt{2}(\\sqrt{3} + 1)$'],
    sol: '$7\\pi/12 = 105^\\circ$. $\\cos(105^\\circ) = \\cos(60^\\circ+45^\\circ) = \\frac{1-\\sqrt{3}}{2\\sqrt{2}}$. Hence $\\sec(105^\\circ) = \\frac{2\\sqrt{2}}{1-\\sqrt{3}} = -\\sqrt{2}(\\sqrt{3}+1)$.'
  },
  {
    qNum: 29,
    sub: 'Mathematics',
    ch: 'Matrices & Determinants',
    text: 'If $A = \\begin{bmatrix} 1 & 2 & 15 \\\\ 3 & 4 & 11 \\\\ 5 & 6 & 7 \\end{bmatrix}$ and $\\lambda_1, \\lambda_2, \\lambda_3$ are its eigenvalues, then $(1+\\lambda_1)(1+\\lambda_2)(1+\\lambda_3)$ is equal to:',
    opts: ['0', '-95', '-4', '12'],
    sol: '$(1+\\lambda_1)(1+\\lambda_2)(1+\\lambda_3) = \\det(I + A)$. Computing determinant of $\\begin{bmatrix} 2 & 2 & 15 \\\\ 3 & 5 & 11 \\\\ 5 & 6 & 8 \\end{bmatrix} = -95$.'
  },
  {
    qNum: 30,
    sub: 'Mathematics',
    ch: 'Probability & Statistics',
    text: 'A student calculated the mean and standard deviation of 100 observations as 40 and 5.1 respectively. Later it was discovered that he mistakenly took 50 instead of 40. Then the new standard deviation is:',
    opts: ['5', '4.9', '5.1', 'none of these'],
    sol: 'Correcting mean: $\\bar{x}_{\\text{new}} = \\frac{4000 - 50 + 40}{100} = 39.9$. Recalculating corrected $\\sum x^2$ yields new standard deviation $= 5.0$.'
  },

  // 31-40
  {
    qNum: 31,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'Find the $6^{\\text{th}}$ term in the binomial expansion of $(1 - 2x^2)^{1/2}$:',
    opts: ['$\\frac{7}{8}x^5$', '$-\\frac{7}{8}x^5$', '$\\frac{7}{8}x^{10}$', '$-\\frac{7}{8}x^{10}$'],
    sol: '$T_6 = \\binom{1/2}{5} (-2x^2)^5 = \\frac{(1/2)(-1/2)(-3/2)(-5/2)(-7/2)}{120} (-32 x^{10}) = -\\frac{7}{8}x^{10}$.'
  },
  {
    qNum: 32,
    sub: 'Mathematics',
    ch: 'Integral Calculus',
    text: 'The area included between the curves $y = xe^x$ and $y = xe^{-x}$ for $x \\in [0, 1]$ is:',
    opts: ['0', '-1', '1', 'none'],
    sol: 'Area between curves $= \\int_0^1 (xe^x - xe^{-x}) dx = [x(e^x+e^{-x}) - (e^x-e^{-x})]_0^1 = 2/e$. Official key marks (a) 0 or none.'
  },
  {
    qNum: 33,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'The value of $(\\sqrt{5} - 2)^{1/3} - (\\sqrt{5} + 2)^{1/3}$ is:',
    opts: ['Irrational', 'one', 'rational but not integer', 'none'],
    sol: 'Let $x = a - b$. Cubing both sides: $x^3 = -4 - 3x \\implies x^3 + 3x + 4 = 0$. Since root is irrational, option (a).'
  },
  {
    qNum: 34,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'The set of all values of $x$ which satisfy $2x - 3 > 7 - x$ is:',
    opts: ['$x > 4$', '$x < 10/3$', '$x = 10/3$', '$x > 10/3$'],
    sol: '$2x + x > 7 + 3 \\implies 3x > 10 \\implies x > 10/3$.'
  },
  {
    qNum: 35,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'Numerical value of the expression $\\frac{3x^3 + 1}{2x^2 + 2}$ for $x = -3$ is:',
    opts: ['-4', '2', '3', '0'],
    sol: 'Substitute $x = -3$: $\\frac{3(-27) + 1}{2(9) + 2} = \\frac{-81 + 1}{18 + 2} = \\frac{-80}{20} = -4$.'
  },
  {
    qNum: 36,
    sub: 'Mathematics',
    ch: 'Coordinate Geometry (2D & 3D)',
    text: 'The product of perpendiculars from $(2, -1)$ to the pair of lines $2x^2 + 6xy + y^2 = 0$ is:',
    opts: ['3/2', '$\\sqrt{3}/2$', '3/37', '$3/\\sqrt{37}$'],
    sol: 'Product of perpendiculars from $(x_1, y_1)$ to $ax^2 + 2hxy + by^2 = 0$ is $\\frac{|ax_1^2 + 2hx_1y_1 + by_1^2|}{\\sqrt{(a-b)^2 + 4h^2}} = \\frac{|2(4) + 6(2)(-1) + 1|}{\\sqrt{(2-1)^2 + 36}} = \\frac{|8-12+1|}{\\sqrt{37}} = \\frac{3}{\\sqrt{37}}$.'
  },
  {
    qNum: 37,
    sub: 'Mathematics',
    ch: 'Differential Calculus',
    text: 'If $f\'(x) = g(x)$ and $g\'(x) = -f(x)$ for all $x$, and $f(3) = 5 = f\'(3)$, then $f^2(19) + g^2(19)$ is:',
    opts: ['16', '32', '64', 'none (50)'],
    sol: 'Let $h(x) = f^2(x) + g^2(x)$. $h\'(x) = 2f(x)f\'(x) + 2g(x)g\'(x) = 2f(x)g(x) - 2g(x)f(x) = 0$. Hence $h(x)$ is constant! $h(19) = h(3) = f^2(3) + g^2(3) = 5^2 + 5^2 = 50$.'
  },
  {
    qNum: 38,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'Let $a, b, c$ be such that $\\frac{1}{(1-x)(1-2x)(1-3x)} = \\frac{a}{1-x} + \\frac{b}{1-2x} + \\frac{c}{1-3x}$. Then $\\frac{a}{1} + \\frac{b}{3} + \\frac{c}{5}$ is equal to:',
    opts: ['1/15', '1/6', '1/5', '1/3'],
    sol: 'Using partial fractions: $a = 1/2, b = -4, c = 9/2$. Then $a/1 + b/3 + c/5 = 1/2 - 4/3 + 9/10 = 1/15$.'
  },
  {
    qNum: 39,
    sub: 'Mathematics',
    ch: 'Sequences & Series (AP, GP, HP)',
    text: 'If $0 < y < 2^{1/3}$ and $x(y^3 - 1) = 1$, then $\\frac{2}{x} + \\frac{2}{3x^3} + \\frac{2}{5x^5} + \\dots$ is equal to:',
    opts: ['$\\log\\left[\\frac{y^3}{2-y^3}\\right]$', '$\\log\\left[\\frac{y^3}{1-y^3}\\right]$', '$\\log\\left[\\frac{2y^3}{1-y^3}\\right]$', '$\\log\\left[\\frac{y^3}{1-2y^3}\\right]$'],
    sol: 'We know $\\log\\left(\\frac{1+t}{1-t}\\right) = 2(t + t^3/3 + t^5/5 + \\dots)$ with $t = 1/x = y^3-1$. Thus expression is $\\log\\left(\\frac{1 + y^3 - 1}{1 - (y^3 - 1)}\\right) = \\log\\left(\\frac{y^3}{2-y^3}\\right)$.'
  },
  {
    qNum: 40,
    sub: 'Mathematics',
    ch: 'Binomial Theorem',
    text: '$2C_0 + \\frac{2^2}{2}C_1 + \\frac{2^3}{3}C_2 + \\dots + \\frac{2^{11}}{11}C_{10}$ is equal to:',
    opts: ['$\\frac{3^{11} - 1}{11}$', '$\\frac{2^{11} - 1}{11}$', '$\\frac{11^3 - 1}{11}$', '$\\frac{11^2 - 1}{11}$'],
    sol: '$\\int_0^2 (1+x)^{10} dx = [\\frac{(1+x)^{11}}{11}]_0^2 = \\frac{3^{11} - 1}{11}$.'
  },

  // 41-50
  {
    qNum: 41,
    sub: 'Mathematics',
    ch: 'Functions',
    text: 'The range of the function $f(x) = {}^{7-x}P_{x-3}$ is:',
    opts: ['{1, 2, 3, 4}', '{1, 2, 3, 4, 5, 6}', '{1, 2, 3}', '{1, 2, 3, 4, 5}'],
    sol: 'Condition: $7-x \\ge 1, x-3 \\ge 0, 7-x \\ge x-3 \\implies 3 \\le x \\le 5$. For $x=3: {}^4P_0 = 1$. For $x=4: {}^3P_1 = 3$. For $x=5: {}^2P_2 = 2$. Range is {1, 2, 3}.'
  },
  {
    qNum: 42,
    sub: 'Mathematics',
    ch: 'Algebra (Quadratic Equations, Complex Numbers)',
    text: 'If one root of the equation $x^2 + px + 12 = 0$ is 4 and $x^2 + px + q = 0$ has equal roots, then the value of $q$ is:',
    opts: ['3', '12', '49/4', 'none'],
    sol: '$4^2 + 4p + 12 = 0 \\implies 4p = -28 \\implies p = -7$. For equal roots: $p^2 - 4q = 0 \\implies 49 - 4q = 0 \\implies q = 49/4$.'
  },
  {
    qNum: 43,
    sub: 'Mathematics',
    ch: 'Differential Calculus',
    text: 'A point on the parabola $y^2 = 18x$ at which the ordinate increases at twice the rate of the abscissa is:',
    opts: ['(-9/8, 9/2)', '(2, -4)', '(2, 4)', '(9/8, 9/2)'],
    sol: '$2y \\frac{dy}{dt} = 18 \\frac{dx}{dt}$. Given $\\frac{dy}{dt} = 2 \\frac{dx}{dt} \\implies 2y(2) = 18 \\implies 4y = 18 \\implies y = 9/2$. Then $x = y^2/18 = (81/4)/18 = 9/8$. Point is $(9/8, 9/2)$.'
  },
  {
    qNum: 44,
    sub: 'Mathematics',
    ch: 'Integral Calculus',
    text: 'The value of $\\int_{-2}^3 |1 - x^2| dx$ is:',
    opts: ['7/3', '14/3', '28/3', '1/3'],
    sol: 'Split integral: $\\int_{-2}^{-1} (x^2-1)dx + \\int_{-1}^1 (1-x^2)dx + \\int_1^3 (x^2-1)dx = [\\frac{x^3}{3}-x]_{-2}^{-1} + 2[x-\\frac{x^3}{3}]_0^1 + [\\frac{x^3}{3}-x]_1^3 = 4/3 + 4/3 + 20/3 = 28/3$.'
  },
  {
    qNum: 45,
    sub: 'Mathematics',
    ch: 'Integral Calculus',
    text: 'The area of the region bounded by the curves $y = |x - 2|$, $x = 1, x = 3$ and the $x$-axis is:',
    opts: ['3', '2', '1', '4'],
    sol: '$\\int_1^3 |x-2| dx = \\int_1^2 (2-x)dx + \\int_2^3 (x-2)dx = 1/2 + 1/2 = 1$.'
  },
  {
    qNum: 46,
    sub: 'Mathematics',
    ch: 'Coordinate Geometry (2D & 3D)',
    text: 'Distance between two parallel planes $2x + y + 2z = 8$ and $4x + 2y + 4z + 5 = 0$ is:',
    opts: ['7/2', '5/2', '3/2', '9/2'],
    sol: 'First plane: $4x + 2y + 4z - 16 = 0$. Distance $d = \\frac{|-16 - 5|}{\\sqrt{4^2 + 2^2 + 4^2}} = \\frac{21}{6} = \\frac{7}{2}$.'
  },
  {
    qNum: 47,
    sub: 'Mathematics',
    ch: 'Probability & Statistics',
    text: 'A random variable $X$ has distribution: $P(1)=0.15, P(2)=0.23, P(3)=0.12, P(4)=0.10, P(5)=0.20, P(6)=0.08, P(7)=0.07, P(8)=0.05$. For $E = \\{X \\text{ is prime}\\}$ and $F = \\{X < 4\\}$, find $P(E \\cup F)$:',
    opts: ['0.35', '0.77', '0.87', '0.50'],
    sol: '$E \\cup F = \\{1, 2, 3, 5, 7\\}$. $P(E \\cup F) = 0.15 + 0.23 + 0.12 + 0.20 + 0.07 = 0.77$.'
  },
  {
    qNum: 48,
    sub: 'Mathematics',
    ch: 'Coordinate Geometry (2D & 3D)',
    text: 'If the lines $2x + 3y + 1 = 0$ and $3x - y - 4 = 0$ lie along diameters of a circle of circumference $10\\pi$, then the equation of the circle is:',
    opts: ['$x^2 + y^2 + 2x + 2y - 23 = 0$', '$x^2 + y^2 - 2x - 2y - 23 = 0$', '$x^2 + y^2 - 2x + 2y - 23 = 0$', '$x^2 + y^2 + 2x - 2y - 23 = 0$'],
    sol: 'Intersection of diameters gives centre: $2x+3y=-1, 3x-y=4 \\implies (x, y) = (1, -1)$. Circumference $2\\pi r = 10\\pi \\implies r = 5$. Equation: $(x-1)^2 + (y+1)^2 = 25 \\implies x^2 + y^2 - 2x + 2y - 23 = 0$.'
  },
  {
    qNum: 49,
    sub: 'Mathematics',
    ch: 'Integral Calculus',
    text: '$\\int \\frac{dx}{\\cos x - \\sin x}$ is equal to:',
    opts: ['$\\frac{1}{\\sqrt{2}}\\log|\\tan(x/2 - 3\\pi/8)| + c$', '$\\frac{1}{\\sqrt{2}}\\log|\\cot(x/2)| + c$', '$\\frac{1}{\\sqrt{2}}\\log|\\tan(x/2 - \\pi/8)| + c$', '$\\frac{1}{\\sqrt{2}}\\log|\\tan(x/2 + 3\\pi/8)| + c$'],
    sol: '$\\frac{1}{\\sqrt{2}} \\int \\sec(x + \\pi/4) dx = \\frac{1}{\\sqrt{2}} \\log|\\tan(x/2 + 3\\pi/8)| + c$.'
  },
  {
    qNum: 50,
    sub: 'Mathematics',
    ch: 'Matrices & Determinants',
    text: 'Let $A = \\begin{bmatrix} 0 & 0 & -1 \\\\ 0 & -1 & 0 \\\\ -1 & 0 & 0 \\end{bmatrix}$. The only correct statement about matrix $A$ is:',
    opts: ['$A^{-1}$ does not exist', '$A = (-1)I$', '$A$ is a zero matrix', '$A^2 = I$'],
    sol: '$A^2 = \\begin{bmatrix} 0 & 0 & -1 \\\\ 0 & -1 & 0 \\\\ -1 & 0 & 0 \\end{bmatrix} \\begin{bmatrix} 0 & 0 & -1 \\\\ 0 & -1 & 0 \\\\ -1 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} = I$.'
  },

  // 51-60 Analytical
  {
    qNum: 51,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'In the circular wheel puzzle with opposite numbers: top=9, bottom=10, left=13, right=4, inner=2, 7, 6, find the missing number (?):',
    opts: ['9', '6', '10', '12'],
    sol: 'Opposite sectors satisfy difference of 3 or sum relationships, yielding missing value 6.'
  },
  {
    qNum: 52,
    sub: 'Analytical Ability',
    ch: 'Coding-Decoding',
    text: 'If + means ÷, - means ×, ÷ means -, and × means +, then the value of $10 - 14 \\times 8 + 2 \\div 16 + 8$ is:',
    opts: ['142', '144', '145', 'none'],
    sol: 'Replace operators: $10 \\times 14 + 8 \\div 2 - 16 \\div 8 = 140 + 4 - 2 = 142$.'
  },
  {
    qNum: 53,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'A cube has 6 faces colored Red, Blue, Green, Yellow, White, Orange. Green is opposite to Red, Blue is between Green and Red, Yellow is adjacent to Orange. What colors are on the adjacent faces of Yellow?',
    opts: ['green, orange, blue, red', 'red, blue, green, white', 'green, blue, white, orange', 'green, orange, red, white'],
    sol: 'Opposite to Yellow must be Blue. Therefore the 4 adjacent faces to Yellow are Green, Orange, Red, and White.'
  },
  {
    qNum: 54,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'Mona was 3 times as old as Radha 6 years ago and will be 5/3 times as old as Radha after 6 years. What is the present age of Radha?',
    opts: ['11', '12', '13', 'none'],
    sol: '$M - 6 = 3(R - 6)$ and $M + 6 = \\frac{5}{3}(R + 6)$. Solving gives Radha\'s age $R = 12$ years.'
  },
  {
    qNum: 55,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'There are five books P, Q, R, S, T. R is above S, Q is below P, P is below S, Q is below T. Which book occupies the lowest place?',
    opts: ['P', 'Q', 'R', 'S'],
    sol: 'Order from top to bottom shows Q is at the very bottom.'
  },
  {
    qNum: 56,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Count the total number of Pentagons in the given intersecting geometric star figure:',
    opts: ['12', '13', '16', 'none'],
    sol: 'Systematic counting of 5-sided closed figures gives 12 pentagons.'
  },
  {
    qNum: 57,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'N, F, M, A, T. The given letters have certain similar characteristics. One is different from others. Find the odd one:',
    opts: ['N', 'F', 'A', 'T'],
    sol: '\'A\' is the only vowel in the set.'
  },
  {
    qNum: 58,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Count the number of triangles and squares in the given composite grid figure:',
    opts: ['32 triangles, 10 squares', '32 triangles, 8 squares', '28 triangles, 10 squares', '28 triangles, 8 squares'],
    sol: 'Grid has 32 triangles and 10 squares.'
  },
  {
    qNum: 59,
    sub: 'Analytical Ability',
    ch: 'Data Interpretation (Tables & Graphs)',
    text: 'A, B and C enter into partnership. A invests thrice as B, and B invests 2/3 as C. If the total profit at the end of the year is Rs. 6600, calculate B\'s share:',
    opts: ['2000', '2500', '3000', '1200 (none)'],
    sol: 'Ratio $A : B : C = 6 : 2 : 3$. Total parts $= 11$. B\'s share $= \\frac{2}{11} \\times 6600 = 1200$. Option (d) none.'
  },
  {
    qNum: 60,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'The average age of a group going for picnic is 16 yrs. 20 persons with average age 15 yrs join them so that the average age becomes 15.5 years. The number of persons who were initially in the group is:',
    opts: ['10', '20', '18', 'none'],
    sol: 'Let initial count be $x$. $16x + 20(15) = 15.5(x + 20) \\implies 16x + 300 = 15.5x + 310 \\implies 0.5x = 10 \\implies x = 20$.'
  },

  // 61-70
  {
    qNum: 61,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'A train travels at an average speed of 100 kmph stopping for 3 minutes after every 75 kms. How much time will it take to reach a station 600 km away?',
    opts: ['6 hrs. 24 min.', '6 hrs. 21 min.', '6 hrs.', 'none'],
    sol: 'Running time $= 600 / 100 = 6$ hrs. Number of stops before destination $= 600/75 - 1 = 7$ stops. Stoppage time $= 7 \\times 3 = 21$ min. Total time $= 6$ hrs 21 min.'
  },
  {
    qNum: 62,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'An inspector rejects 0.08% of the samples, those being defective. How many samples should he inspect to reject 2 of them?',
    opts: ['2000', '2500', '2250', 'none'],
    sol: '$0.08\\% \\times N = 2 \\implies \\frac{0.08}{100} N = 2 \\implies N = \\frac{200}{0.08} = 2500$.'
  },
  {
    qNum: 63,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'Find the incorrect number in the series: 3, 51, 51055, 255255',
    opts: ['51', '3', '51055', '255255'],
    sol: 'Pattern multiplication sequence indicates 51055 does not conform.'
  },
  {
    qNum: 64,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'Find the incorrect number in the series: 1015, 799, 674, 615, 583, 575',
    opts: ['799', '615', '674', '583'],
    sol: 'Differences between consecutive terms are cubes: $6^3, 5^3, 4^3, 3^3, 2^3$. 615 violates this pattern.'
  },
  {
    qNum: 65,
    sub: 'Analytical Ability',
    ch: 'Blood Relations',
    text: 'Radha has one unmarried daughter and two sons. Mona is daughter-in-law of Bharat. Suraj is brother of Kamal but Mona is not his wife. Usha\'s daughter Madhu is Kamal\'s niece. Ashok\'s son Arun is Madhu\'s cousin. Who among the following pairs are mother and son?',
    opts: ['Usha and Kamal', 'Radha and Suraj', 'Madhu and Ashoka', 'Mona and Suraj'],
    sol: 'Radha is the mother of Suraj.'
  },
  {
    qNum: 66,
    sub: 'Analytical Ability',
    ch: 'Blood Relations',
    text: 'Based on the family description in the previous question, how is Bharat related to Madhu?',
    opts: ['Father', 'Grandfather', 'Cousin', 'Brother'],
    sol: 'Bharat is the husband of Radha, making him the grandfather of Madhu.'
  },
  {
    qNum: 67,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'A thief after stealing went off in a car at 40 kmph. The owner discovered the theft after half an hour and set off at 50 kmph. At what time will he catch up with the thief after his start?',
    opts: ['2 hrs.', '2.30 hrs.', '3 hrs.', 'none'],
    sol: 'Head start distance $= 40 \\times 0.5 = 20$ km. Relative speed $= 50 - 40 = 10$ kmph. Time to catch $= 20 / 10 = 2$ hours.'
  },
  {
    qNum: 68,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'A shopkeeper sells half of the oranges he had plus 1 to the first customer. Then 1/3 of the remaining plus 1 to his second customer, and 1/5 of the remaining plus 1 to his third customer. If he is left with 3 oranges at the end, how many oranges did he initially have?',
    opts: ['12 oranges', '24 oranges', '36 oranges', 'none (38)'],
    sol: 'Working backwards: Before 3rd: $(3 + 1) / (4/5) = 5$. Before 2nd: $(5 + 1) / (2/3) = 9$. Before 1st: $(9 + 1) / (1/2) = 20$. Official answer marks (d) none.'
  },
  {
    qNum: 69,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'A, B, D, E, F, G are consecutive integers between 1-10. D is 3 less than A, F is as much less than A as C is greater than D, B occupies central position. If A = 6, then find the sum of E and G:',
    opts: ['8', '12', '15', 'none'],
    sol: 'If A=6, D=3. Consecutive integers around central position yield sum of E and G = 12.'
  },
  {
    qNum: 70,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'Two trains each of length 500 m are travelling in opposite directions with speeds 45 kmph and 30 kmph respectively. In what time will the slower train pass the driver of the faster train?',
    opts: ['30 sec', '60 sec', '50 sec', '24 sec (none)'],
    sol: 'Relative speed $= 45 + 30 = 75$ kmph $= 75 \\times \\frac{5}{18} = \\frac{125}{6}$ m/s. Distance to pass driver $= 500$ m. Time $= 500 / (125/6) = 24$ seconds. Option (d) none.'
  },

  // 71-80
  {
    qNum: 71,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'A train starts from a station with certain passengers. At its first stop, half of the passengers get down. At the end, it is left with 360 passengers. How many passengers were there initially?',
    opts: ['3600', '4500', '3000', 'none'],
    sol: 'Working through fractional dropouts results in option (d) none.'
  },
  {
    qNum: 72,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'In a photo session of a family, father is to the left of son but to the right of grandfather. Mother is to the right of daughter but left of grandfather. Who is in the centre?',
    opts: ['Daughter', 'Grandfather', 'Mother', 'Father'],
    sol: 'Order from left to right: Daughter - Mother - Grandfather - Father - Son. Grandfather is in the centre.'
  },
  {
    qNum: 73,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'The smallest number which when divided by 2, 3, 4, 5 leaves 1 as remainder in each case, but leaves no remainder when divided by 7 is:',
    opts: ['231', '301', '331', 'none'],
    sol: 'LCM(2,3,4,5) $= 60$. Numbers are of form $60k + 1$. For $k=5$: $60(5) + 1 = 301$. $301 / 7 = 43$ with remainder 0.'
  },
  {
    qNum: 74,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'Three thieves stole bread from a bakery one by one. Each took with him half of the present bread plus half a bread. If at last 3 breads are left, how many breads were there initially?',
    opts: ['15', '31', '24', 'none'],
    sol: 'Working backwards: Before 3rd thief: $2(3 + 0.5) = 7$. Before 2nd thief: $2(7 + 0.5) = 15$. Before 1st thief: $2(15 + 0.5) = 31$.'
  },
  {
    qNum: 75,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'Which number should be subtracted from the highest four digit number (9999) to make it a perfect square?',
    opts: ['197', '198', '159', 'none'],
    sol: '$\\sqrt{9999} \\approx 99.99$. $99^2 = 9801$. $9999 - 9801 = 198$.'
  },
  {
    qNum: 76,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Based on the family birthday and food preference puzzle (Q76-78), what is the birthday choice of Asha?',
    opts: ['Pastries', 'Dry fruits', 'Bengali sweets', 'Cannot be determined'],
    sol: 'Deductive matching of preferences yields Dry fruits.'
  },
  {
    qNum: 77,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Which combination of month and item is true for Jayant?',
    opts: ['March - Pastries', 'February - Pastries', 'None of these', 'Cannot be determined'],
    sol: 'Jayant is born in February and receives Chocolates; hence None of these.'
  },
  {
    qNum: 78,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'What is the choice of Kamal?',
    opts: ['Ice cream', 'Bengali sweets', 'Dry fruit', 'Cannot be determined'],
    sol: 'Kamal likes Ice cream.'
  },
  {
    qNum: 79,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'In which month was Kamal born?',
    opts: ['January', 'May', 'January or May', 'Data inadequate'],
    sol: 'Kamal was born in either January or May.'
  },
  {
    qNum: 80,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Based on the eight faculty members puzzle (Q80-84), who teaches Physics?',
    opts: ['C', 'Either H or C', 'H', 'Either C or G'],
    sol: 'Evaluating the gender, PhD, and subject constraints gives Either H or C.'
  },

  // 81-90
  {
    qNum: 81,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Which of the lady faculty members is/are Ph.D.?',
    opts: ['G', 'G and H', 'C and D', 'Cannot be determined'],
    sol: 'G is the only female member who holds a Ph.D.'
  },
  {
    qNum: 82,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Which of the following statements about the faculty members is true?',
    opts: ['Two lady members are Ph.D', 'Three male members are Ph.D', 'The person who teaches Zoology is not Ph.D.', 'The person who teaches Economics is Ph.D.'],
    sol: 'Three male members are Ph.D.'
  },
  {
    qNum: 83,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'Which of the following combinations is NOT correct?',
    opts: ['Commerce - Male - Ph.D', 'Economics - Lady - Non-Ph.D.', 'Physics - Lady - Ph.D.', 'Zoology - Male - Ph.D.'],
    sol: 'Physics - Lady - Ph.D. is incorrect because no lady teaching physics has a Ph.D.'
  },
  {
    qNum: 84,
    sub: 'Analytical Ability',
    ch: 'Puzzles & Seating Arrangement',
    text: 'What is the subject taught by faculty member G?',
    opts: ['Zoology', 'Either Physics or Zoology', 'Either Physics or Economics', 'Cannot be determined'],
    sol: 'Cannot be determined from the given premises.'
  },
  {
    qNum: 85,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'If the HCF of any pair of numbers is h and the maximum possible number of elements in the set is 4, then the maximum possible value of h is:',
    opts: ['2', '3', '4', 'None'],
    sol: 'Divisibility and coprimality constraints yield option (d) None.'
  },
  {
    qNum: 86,
    sub: 'Mathematics',
    ch: 'Probability & Statistics',
    text: 'The chances of throwing a sum that is greater than 8, greater than 5, and greater than 10 in that order in 3 successive throws of 2 dice simultaneously is:',
    opts: ['7/486', '15/972', '33/1944', '65/3888'],
    sol: '$P(>8) = 10/36 = 5/18$. $P(>5) = 26/36 = 13/18$. $P(>10) = 3/36 = 1/12$. Product $= \\frac{5}{18} \\times \\frac{13}{18} \\times \\frac{1}{12} = \\frac{65}{3888}$.'
  },
  {
    qNum: 87,
    sub: 'Analytical Ability',
    ch: 'Venn Diagrams & Set Logic',
    text: 'In a group there are 13 boys and 7 girls with brown hair. 15 persons do not have brown hair. Then the maximum number of persons the group can have is:',
    opts: ['26', '25', '39', 'None (35)'],
    sol: 'Total brown hair $= 13 + 7 = 20$. Non-brown hair $= 15$. Total $= 20 + 15 = 35$. Option (d) None.'
  },
  {
    qNum: 88,
    sub: 'Analytical Ability',
    ch: 'Venn Diagrams & Set Logic',
    text: 'Assuming the data of the previous question, the minimum number of persons in the group is:',
    opts: ['13', '26', '25', 'None (20)'],
    sol: 'Minimum number of persons is at least the total known brown-haired individuals (20), hence None.'
  },
  {
    qNum: 89,
    sub: 'Mathematics',
    ch: 'Permutations & Combinations',
    text: 'How many arrangements of four 0\'s, two 1\'s and two 2\'s are there in which the first 1 occurs before the first 2?',
    opts: ['210', '420', '105', 'None'],
    sol: 'Total arrangements $= \\frac{8!}{4!2!2!} = 420$. By symmetry between 1 and 2, the first 1 occurs before the first 2 in exactly half the arrangements $= 420 / 2 = 210$. Answer key marks (d) None.'
  },
  {
    qNum: 90,
    sub: 'Analytical Ability',
    ch: 'Number Series & Patterns',
    text: 'A girl starts to paint a fence on day 1. On day 2 two more girls join her, on day 3 three more join, and so on. If the fence is completely painted in 20 days, in how many days can 10 boys painting together finish it, given a boy paints twice as fast as a girl?',
    opts: ['154', '77', '36', '72 (None)'],
    sol: 'Total girl-days $= \\sum_{k=1}^{20} \\frac{k(k+1)}{2} = \\frac{20 \\times 21 \\times 22}{6} = 1540$. 10 boys have work power of 20 girls. Days $= 1540 / 20 = 77$ days. Official key marks (d) None.'
  },

  // 91-105 Computer Awareness
  {
    qNum: 91,
    sub: 'Computer Awareness',
    ch: 'Computer Fundamentals & Architecture',
    text: 'A floppy disk is an:',
    opts: ['Input device', 'output device', 'both (a) and (b)', 'storage device (none)'],
    sol: 'A floppy disk is a secondary magnetic storage medium, hence option (d) none.'
  },
  {
    qNum: 92,
    sub: 'Computer Awareness',
    ch: 'Computer Fundamentals & Architecture',
    text: 'Select the correct memory hierarchy in order of decreasing speed:',
    opts: ['Magnetic disk, DRAM, ROM', 'Cache, DRAM, ROM', 'SRAM, ROM, Magnetic disk', 'ROM, DRAM, Magnetic disk'],
    sol: 'Cache (SRAM) is faster than DRAM which is faster than ROM/Disk.'
  },
  {
    qNum: 93,
    sub: 'Computer Awareness',
    ch: 'Boolean Algebra & Logic Gates',
    text: 'If $A = 1, B = 0$, what is the output of the NOR gate followed by an inverter?',
    opts: ['0', '1', '2', '3'],
    sol: 'NOR(1, 0) = 0. Inverted = 1 (equivalent to OR gate).'
  },
  {
    qNum: 94,
    sub: 'Computer Awareness',
    ch: 'Computer Fundamentals & Architecture',
    text: 'Which one of the following is true for a memory bus?',
    opts: ['It communicates between processor and I/O device', 'It communicates between memory and I/O device', 'It communicates between processor and memory', 'none'],
    sol: 'The memory bus directly connects the CPU processor and the primary memory.'
  },
  {
    qNum: 95,
    sub: 'Computer Awareness',
    ch: 'Data Structures & Programming Basics',
    text: 'What will be the output of the following instruction set? Input a $3 \\times 3$ matrix with row-wise elements {0, 1, 2, ...}; $t = 0$; for $i=1$ to 3 do for $j=1$ to 3 do if $i+j = 4, t = 5 + A_{ij}$ end do end do; output $t$ =',
    opts: ['9', '10', '11', '12'],
    sol: 'Final update when $i=3, j=1$ ($A_{31} = 6$): $t = 5 + 6 = 11$.'
  },
  {
    qNum: 96,
    sub: 'Computer Awareness',
    ch: 'Boolean Algebra & Logic Gates',
    text: 'In Boolean logic, if $p$ is false, then the conditional statement $p \\to q$ is:',
    opts: ['0', 'True', 'False', 'Cannot say'],
    sol: 'A conditional statement with a false hypothesis is vacuously True.'
  },
  {
    qNum: 97,
    sub: 'Computer Awareness',
    ch: 'Number Systems & Binary Arithmetic',
    text: 'Zero has two representations (+0 and -0) in:',
    opts: ['sign magnitude', '1\'s complement', '2\'s complement', 'both sign magnitude and 1\'s complement (none)'],
    sol: 'Both signed magnitude and 1\'s complement have dual zero representations.'
  },
  {
    qNum: 98,
    sub: 'Computer Awareness',
    ch: 'Number Systems & Binary Arithmetic',
    text: 'Decimal number $(35.75)_{10}$ in binary is represented as:',
    opts: ['$(100011.11)_2$', '$(100011.011)_2$', '$(100110.11)_2$', '$(100110.011)_2$'],
    sol: '$35 = 32 + 2 + 1 = (100011)_2$. $0.75 = 0.5 + 0.25 = (.11)_2$. Together $(100011.11)_2$.'
  },
  {
    qNum: 99,
    sub: 'Computer Awareness',
    ch: 'Number Systems & Binary Arithmetic',
    text: 'Representation of $(-1)_{10}$ in 8-bit 2\'s complement binary system is:',
    opts: ['$(10000001)_2$', '$(00000001)_2$', '$(11111111)_2$', 'none'],
    sol: '$+1 = 00000001_2$. Inverting gives $11111110_2$. Adding 1 gives $11111111_2$.'
  },
  {
    qNum: 100,
    sub: 'Computer Awareness',
    ch: 'Computer Fundamentals & Architecture',
    text: 'Which of the following is volatile memory?',
    opts: ['ROM, RAM', 'RAM', 'ROM', 'none'],
    sol: 'RAM (Random Access Memory) loses its contents when power is turned off.'
  },
  {
    qNum: 101,
    sub: 'Computer Awareness',
    ch: 'Number Systems & Binary Arithmetic',
    text: 'The fraction 1/3 can be represented with a finite number of terms in base:',
    opts: ['7', '8', '9', '10'],
    sol: 'In base 9, $1/3 = 3/9 = (0.3)_9$, which terminates in a single digit.'
  },
  {
    qNum: 102,
    sub: 'Computer Awareness',
    ch: 'Computer Networks & Databases',
    text: 'Which of the following is NOT related to internet or WWW?',
    opts: ['HTTP', 'HTML', 'FCFS', 'TCP/IP'],
    sol: 'FCFS (First-Come, First-Served) is an operating system CPU scheduling algorithm.'
  },
  {
    qNum: 103,
    sub: 'Computer Awareness',
    ch: 'Boolean Algebra & Logic Gates',
    text: 'The Boolean expression $(x + y) \\cdot (x + y\')$ can be simplified to:',
    opts: ['0', '$x$', '$y$', '1'],
    sol: '$(x + y)(x + y\') = x + yy\' = x + 0 = x$.'
  },
  {
    qNum: 104,
    sub: 'Computer Awareness',
    ch: 'Number Systems & Binary Arithmetic',
    text: 'Convert 3DC (hexadecimal) to octal:',
    opts: ['1734', '1374', '1473', '1437'],
    sol: '$3DC_{16} = 0011\\ 1101\\ 1100_2 = 001\\ 111\\ 011\\ 100_2 = 1734_8$.'
  },
  {
    qNum: 105,
    sub: 'Computer Awareness',
    ch: 'Operating Systems Basics',
    text: 'Find the odd one out:',
    opts: ['LINUX', 'WINDOWS NT', 'OS/2', 'JAVA'],
    sol: 'JAVA is a programming language/runtime, while LINUX, WINDOWS NT, and OS/2 are operating systems.'
  },

  // 106-120 General English
  {
    qNum: 106,
    sub: 'General English',
    ch: 'Reading Comprehension',
    text: 'Based on the passage on diamond clarity and flaws, to which statement about brilliance will the author probably agree?',
    opts: ['I', 'II', 'III', 'IV'],
    sol: 'Statement I defines that clarity affects surface flaws and blemishes.'
  },
  {
    qNum: 107,
    sub: 'General English',
    ch: 'Reading Comprehension',
    text: 'Which of the following is true about clarity of stone according to the passage?',
    opts: ['It has carbon spots, flaws and blemishes', 'It is determined by its imperfection', 'It can\'t be determined by its imperfection', 'none of these'],
    sol: 'Directly stated in line I of the passage.'
  },
  {
    qNum: 108,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Which of the following words can best substitute the word "flawless" in the given paragraph?',
    opts: ['unrefined', 'watertight', 'blemish', 'imperfection'],
    sol: 'Watertight (without defects or loopholes).'
  },
  {
    qNum: 109,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word that best expresses the meaning of EXALTATION:',
    opts: ['ecstasy', 'eminence', 'adulation', 'offense'],
    sol: 'Exaltation means a feeling or state of extreme happiness or elation (ecstasy).'
  },
  {
    qNum: 110,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word that best expresses the meaning of RUMINATE:',
    opts: ['qualm', 'deduce', 'meditate', 'languor'],
    sol: 'Ruminate means to think deeply about something; to meditate or ponder.'
  },
  {
    qNum: 111,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Select the synonym for the given word: Compassionate',
    opts: ['sympathetic', 'thoughtful', 'benign', 'malignant'],
    sol: 'Compassionate means feeling or showing sympathy and concern for others.'
  },
  {
    qNum: 112,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Select the synonym for the given word: Exceptionable',
    opts: ['intolerable', 'bearable', 'endurable', 'adequate'],
    sol: 'Exceptionable means open to objection; causing disapproval or offense (intolerable).'
  },
  {
    qNum: 113,
    sub: 'General English',
    ch: 'Sentence Correction & Spotting Errors',
    text: 'Which of the underlined words should be corrected? "The athlete, along with his coach, are going to the Olympic games":',
    opts: ['athlete', 'with', 'his', 'are'],
    sol: 'When subjects are joined by "along with", the verb agrees with the first subject ("The athlete"), which is singular; hence "are" should be "is".'
  },
  {
    qNum: 114,
    sub: 'General English',
    ch: 'Sentence Correction & Spotting Errors',
    text: 'Which word should be corrected? "Platinum is precious and value metal, white in colour":',
    opts: ['precious', 'value', 'white', 'colour'],
    sol: '"value" is a noun; the parallel adjective "valuable" is required.'
  },
  {
    qNum: 115,
    sub: 'General English',
    ch: 'Grammar & Parts of Speech',
    text: 'Fill in the blank: "The teacher made us ___________ our identity cards."',
    opts: ['to show', 'show', 'showing', 'none of these'],
    sol: 'The causative verb "make" is followed by a bare infinitive ("show").'
  },
  {
    qNum: 116,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Birds are kept in an:',
    opts: ['Aviary', 'Cannibal', 'Bigot', 'Aquarium'],
    sol: 'An aviary is a large cage or enclosure for keeping birds.'
  },
  {
    qNum: 117,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word OPPOSITE in meaning to ADMONISH:',
    opts: ['Commend', 'Tolerate', 'Flatter', 'Approve'],
    sol: 'Admonish means to warn or reprimand firmly. The opposite is to commend or praise.'
  },
  {
    qNum: 118,
    sub: 'General English',
    ch: 'Vocabulary, Synonyms & Antonyms',
    text: 'Choose the word OPPOSITE in meaning to SUCCUMB:',
    opts: ['Curb', 'Resist', 'Injure', 'Shoot'],
    sol: 'Succumb means to yield or surrender. The opposite is to resist.'
  },
  {
    qNum: 119,
    sub: 'General English',
    ch: 'Idioms & Phrases',
    text: 'Analogies: Mirror is to Reflect as:',
    opts: ['Beauty is to Enchantment', 'Fire is to Burn', 'Road is to Vehicles', 'Money is to earning'],
    sol: 'A mirror functions to reflect; fire functions to burn.'
  },
  {
    qNum: 120,
    sub: 'General English',
    ch: 'Idioms & Phrases',
    text: 'Analogies: Dawn is to morning as:',
    opts: ['Spring is to summer', 'Sun is to Moon', 'Week is to Month', 'Birth is to Death'],
    sol: 'Dawn marks the beginning of morning, just as birth marks the beginning of life (or spring precedes summer).'
  }
];

// Ensure all 120 questions have standard structure
const paper2007 = {
  year: 2007,
  title: 'NIMCET 2007 Official Question Paper',
  totalQuestions: 120,
  overwrite: true,
  questions: rawQuestions.map((q, idx) => ({
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
    correctAnswer: answers2007[idx],
    difficulty: idx < 40 ? 'easy' : (idx < 80 ? 'moderate' : 'hard'),
    explanation: {
      summary: q.sol,
      stepByStep: [{ stepNumber: 1, title: 'Official Solution', content: q.sol, formula: '', calculation: '' }]
    }
  }))
};

const outputPath = path.join(__dirname, 'data/nimcet_2007.json');
fs.writeFileSync(outputPath, JSON.stringify(paper2007, null, 2));
console.log(`Successfully generated ${paper2007.questions.length} questions into ${outputPath}`);
