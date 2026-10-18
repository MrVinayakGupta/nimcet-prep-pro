import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCheckCircle, FiCircle, FiPlay, FiExternalLink, FiZap, 
  FiTarget, FiAward, FiBookOpen, FiClock, FiHelpCircle, FiChevronRight 
} from 'react-icons/fi';
import styles from './RoadmapPage.module.css';

const CHEAT_CODES = [
  {
    num: 'Cheat Code #1',
    title: 'Value Substitution (The n / θ Method)',
    desc: 'When options contain algebraic variables (n, a, b, θ), never solve long equations. Substitute extreme simple integers (n=1, n=2) or angles (θ=0°, 45°) to eliminate 3 options in 15 seconds.',
    formula: 'Example: In AP/GP questions, assume (1, 2, 3) or (1, 2, 4) directly.'
  },
  {
    num: 'Cheat Code #2',
    title: 'Odd/Even Function Annihilation',
    desc: 'For definite integrals with symmetric limits [-a, a], split the integrand into odd and even parts. Any odd component (x³, x·cos(x), sin⁵(x)) integrates immediately to 0.',
    formula: '∫[-a, a] f(x) dx = 0 (if odd) | 2·∫[0, a] f(x) dx (if even)'
  },
  {
    num: 'Cheat Code #3',
    title: 'Fixed Standard Invariants',
    desc: 'NIMCET frequently repeats standard geometric and algebraic theorems without altering core constants. Memorize these recurring architectural answers.',
    formula: 'Orthogonal Det = ±1 | Director Circle: x²+y²=a²±b² | ∫[0, π/2] King\'s Rule = π/4'
  },
  {
    num: 'Cheat Code #4',
    title: 'Boundary & Dimensional Elimination',
    desc: 'Eliminate absurd options by testing bounds. Probability must be in [0, 1]. Area under curves must be strictly positive. Limits of ratios must match powers of leading degrees.',
    formula: 'Variance shift-invariance: Var(X + c) = Var(X)'
  }
];

const TEACHER_RATIONALE = [
  {
    name: 'Neha Agrawal (Mathematically Inclined)',
    role: 'Speed Hacks & Option Elimination Specialist',
    why: 'Known for high-velocity shortcut techniques tailored to competitive exams. Shows students how to eliminate wrong options in 30 seconds rather than writing 2-page subjective proofs.'
  },
  {
    name: 'Impetus Gurukul (Sharad Neha / Prateek Sir)',
    role: 'NIMCET & MCA Entrance Core Syllabus Alignment',
    why: 'Dedicated specifically to the NIMCET MCA pattern for over 15 years. Their problem sets and past paper breakdowns exactly mirror what NIT exam conveners test.'
  },
  {
    name: 'Mohit Tyagi (Competishun)',
    role: 'Deep Conceptual Foundation & Rigor',
    why: 'Unmatched mathematical depth for complex topics like Functions, Limits, 3D Geometry, and Conics. Perfect for building rock-solid conceptual understanding from zero.'
  },
  {
    name: 'Physics Wallah (JEE Wallah)',
    role: 'Comprehensive One-Shot Revision Marathons',
    why: 'High-energy, comprehensive one-shots ideal for completing an entire major topic (like Circles or Differential Equations) from theory to 40+ solved problems in one sitting.'
  }
];

const DAYS_DATA = [
  // PHASE 1
  {
    day: 1,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Sets, Subsets & Relations',
    topics: 'Cardinality of union & intersection (n(A ∪ B ∪ C)), Cartesian product, Reflexive, Symmetric, and Transitive relations.',
    trigger: 'Total subsets of set with n elements = 2ⁿ. Non-empty proper subsets = 2ⁿ - 2. Reflexive relation has min n ordered pairs.',
    primaryVideo: { title: 'Sets & Relations One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=Sets+and+relations+one+shot+neha+agrawal' },
    secondaryVideo: { title: 'Sets for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=sets+relations+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 2,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Mathematical Logic & Truth Tables',
    topics: 'Tautology, Contradictions, Connectives (∧, ∨, ∼, →, ↔), Contrapositive & Negation rules.',
    trigger: 'Contrapositive of p → q is always ∼q → ∼p. Substitute True/False values directly into proposition options rather than drawing large 8-row tables.',
    primaryVideo: { title: 'Mathematical Reasoning Super Tricks', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=mathematical+reasoning+tricks+neha+agrawal' },
    secondaryVideo: { title: 'Logic for MCA Entrance', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=mathematical+logic+nimcet+aspire+study' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 3,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Quadratic Equations & Roots',
    topics: 'Sum and product of roots, roots differing by k ((α-β)² = (α+β)² - 4αβ), discriminant, common roots condition.',
    trigger: 'To find equation with reciprocal roots (1/α, 1/β), swap first and last coefficients: cx² + bx + a = 0. If roots in ratio p:q, then b²(pq) = ac(p+q)²',
    primaryVideo: { title: 'Quadratic Equations One Shot', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=quadratic+equations+mohit+tyagi' },
    secondaryVideo: { title: 'Quadratic Equations NIMCET Tricks', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=quadratic+equations+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 4,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Complex Numbers & Cube Roots of Unity',
    topics: 'Modulus-argument properties, polar form, Euler\'s formula, cube roots of unity (1, ω, ω²).',
    trigger: '1 + ω + ω² = 0 and ω³ = 1. Any three consecutive powers of ω sum to 0: ωᵏ + ωᵏ⁺¹ + ωᵏ⁺² = 0. Parallelogram identity: |z₁+z₂|² + |z₁-z₂|² = 2(|z₁|² + |z₂|²).',
    primaryVideo: { title: 'Complex Numbers & Cube Roots of Unity', channel: 'Unacademy JEE', url: 'https://www.youtube.com/results?search_query=complex+numbers+cube+roots+of+unity+unacademy+jee' },
    secondaryVideo: { title: 'Complex Numbers NIMCET Marathon', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=complex+numbers+nimcet+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 5,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Sequences & Series (AP, GP, HP)',
    topics: 'Sum of AP, infinite GP S_∞ = a / (1 - r), relation AM ≥ GM ≥ HM, harmonic progression arithmetic.',
    trigger: 'If T_p = 1/q and T_q = 1/p in an AP, then T_pq = 1 and S_pq = (pq+1)/2. For AP test (1,2,3), GP test (1,2,4), HP test (2,3,6).',
    primaryVideo: { title: 'Sequence and Series One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=sequence+and+series+neha+agrawal' },
    secondaryVideo: { title: 'AP GP HP Shortcuts for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=ap+gp+hp+tricks+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 6,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Permutations & Combinations',
    topics: 'Fundamental counting principle, restricted arrangements, circular permutations (n-1)!, derangements.',
    trigger: 'Total ways to distribute n identical objects among r distinct persons (each getting at least 1) = C(n-1, r-1).',
    primaryVideo: { title: 'Permutations & Combinations One Shot', channel: 'PW JEE Wallah', url: 'https://www.youtube.com/results?search_query=permutations+and+combinations+one+shot+pw' },
    secondaryVideo: { title: 'P&C MCA Entrance Special', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=permutations+and+combinations+nimcet+impetus+gurukul' },
    practiceLink: '/year-papers'
  },
  {
    day: 7,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Binomial Theorem',
    topics: 'General term T_{r+1}, middle term, greatest coefficient, Pascal identity C(n,r) + C(n,r-1) = C(n+1,r).',
    trigger: 'To find sum of all coefficients in (ax + by)ⁿ, set x = y = 1. Maximum binomial coefficient occurs at middle term.',
    primaryVideo: { title: 'Binomial Theorem One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=binomial+theorem+one+shot+neha+agrawal' },
    secondaryVideo: { title: 'Binomial Theorem Tricks', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=binomial+theorem+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 8,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Matrices (Operations, Adjoint & Inverses)',
    topics: 'Matrix multiplication, symmetric/skew-symmetric, orthogonal matrix, adjoint formula |adj(A)| = |A|^{n-1}.',
    trigger: 'Orthogonal matrix: A·Aᵀ = I implies det(A) = ±1. |adj(adj(A))| = |A|^{(n-1)²}. For 3×3 matrix, |adj(A)| = |A|².',
    primaryVideo: { title: 'Matrices & Determinants One Shot', channel: 'Unacademy JEE', url: 'https://www.youtube.com/results?search_query=matrices+determinants+one+shot+unacademy+jee' },
    secondaryVideo: { title: 'Matrices NIMCET Shortcuts', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=matrices+determinants+nimcet+aspire+study' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 9,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Determinants & Linear Systems',
    topics: 'Cramer\'s Rule (Δ, Δx, Δy, Δz), consistency tests, conditions for unique, infinite, and zero solutions.',
    trigger: 'Homogeneous system has non-trivial solutions iff det(A) = 0. Inconsistent system has det(A)=0 with at least one Δ_i ≠ 0.',
    primaryVideo: { title: 'System of Linear Equations (Cramer\'s Rule)', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=system+of+linear+equations+cramers+rule+mohit+tyagi' },
    secondaryVideo: { title: 'Determinants NIMCET Marathon', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=determinants+nimcet+impetus+gurukul' },
    practiceLink: '/year-papers'
  },
  {
    day: 10,
    phase: 'Phase 1: Algebra & Logic',
    title: 'Phase 1 Timed Mock Drill',
    topics: '50-Question Mixed Algebra & Logic Sprint under strict 55-minute countdown.',
    trigger: 'Attempt questions on NIMCET Prep Pro Mock Portal. Target accuracy ≥ 80%. Review all missed questions with AI Calculus Tutor.',
    primaryVideo: { title: 'How to Attempt NIMCET Math Fast', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=how+to+attempt+nimcet+math+paper+fast' },
    secondaryVideo: { title: 'AIR 1 Math Strategy', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=nimcet+math+air+1+strategy' },
    practiceLink: '/mock-test'
  },

  // PHASE 2
  {
    day: 11,
    phase: 'Phase 2: Trigonometry',
    title: 'Trigonometric Identities & Product Formulas',
    topics: 'Compound angles, multiple angles, standard product identities.',
    trigger: 'sin(θ)sin(60-θ)sin(60+θ) = 1/4 sin(3θ). cos(θ)cos(60-θ)cos(60+θ) = 1/4 cos(3θ). tan(θ)tan(60-θ)tan(60+θ) = tan(3θ).',
    primaryVideo: { title: 'Trigonometry Formulas & Shortcuts', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=trigonometry+tricks+formulas+neha+agrawal' },
    secondaryVideo: { title: 'Trigonometry for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=trigonometry+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 12,
    phase: 'Phase 2: Trigonometry',
    title: 'Trigonometric Equations & General Solutions',
    topics: 'General solutions for sin(θ) = sin(α), cos(θ) = cos(α), tan(θ) = tan(α).',
    trigger: 'Substitute n = 0 or n = 1 from options directly into equation to eliminate wrong options in 15 seconds.',
    primaryVideo: { title: 'Trigonometric Equations One Shot', channel: 'PW JEE', url: 'https://www.youtube.com/results?search_query=trigonometric+equations+one+shot+pw' },
    secondaryVideo: { title: 'Trig Equations Shortcuts', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=trigonometric+equations+nimcet+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 13,
    phase: 'Phase 2: Trigonometry',
    title: 'Inverse Trigonometric Functions',
    topics: 'Principal values, conversion formulas, tan⁻¹(x) + tan⁻¹(y) = tan⁻¹((x+y)/(1-xy)).',
    trigger: 'If options are numerical or independent of variables, substitute x = 1 or x = 0 directly.',
    primaryVideo: { title: 'Inverse Trigonometric Functions', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=inverse+trigonometric+functions+neha+agrawal' },
    secondaryVideo: { title: 'ITF Tricks for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=inverse+trigonometry+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 14,
    phase: 'Phase 2: Trigonometry',
    title: 'Properties & Solution of Triangles (SOT)',
    topics: 'Sine Rule (a/sinA = 2R), Cosine Rule, Projection Formula, half-angle area formulas.',
    trigger: 'Substitute an Equilateral Triangle (A=B=C=60°, a=b=c=1) or a 3-4-5 Right Triangle to verify identity instantly.',
    primaryVideo: { title: 'Properties of Triangles SOT One Shot', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=properties+of+triangle+sot+mohit+tyagi' },
    secondaryVideo: { title: 'SOT NIMCET PYQs', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=properties+of+triangle+nimcet+impetus+gurukul' },
    practiceLink: '/year-papers'
  },
  {
    day: 15,
    phase: 'Phase 2: Trigonometry',
    title: 'Heights and Distances',
    topics: 'Angles of elevation & depression, two-point observation distance ratios.',
    trigger: 'In 30°-60°-90° triangle, sides are in ratio 1 : √3 : 2. For angles 30° and 60°, distance between points is double the distance to base.',
    primaryVideo: { title: 'Heights and Distances Super Tricks', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=heights+and+distances+tricks+impetus+gurukul' },
    secondaryVideo: { title: 'Heights & Distances PYQ Marathon', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=heights+and+distances+nimcet+aspire+study' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 16,
    phase: 'Phase 2: Trigonometry',
    title: 'Phase 2 Timed Sprint',
    topics: '40 Questions covering all Trigonometry & SOT in 45 minutes.',
    trigger: 'Review questions with formula flashcards. Reinforce inverse cancellation rules.',
    primaryVideo: { title: 'Trigonometry Formula Cheat Sheet', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=trigonometry+formula+cheat+sheet+neha+agrawal' },
    secondaryVideo: { title: 'Trig Marathon NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=trigonometry+marathon+nimcet' },
    practiceLink: '/year-papers'
  },

  // PHASE 3
  {
    day: 17,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Straight Lines & Pair of Lines',
    topics: 'Distance formula, slope forms, angle bisectors, homogeneous pair of lines ax² + 2hxy + by² = 0.',
    trigger: 'Perpendicular pair of lines in ax² + 2hxy + by² = 0 iff a + b = 0 (sum of coefficients of x² and y² is 0).',
    primaryVideo: { title: 'Straight Lines Complete One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=straight+lines+one+shot+neha+agrawal' },
    secondaryVideo: { title: 'Straight Lines for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=straight+lines+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 18,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Circles & Conditions of Tangency',
    topics: 'General circle equation, radius √(g²+f²-c), tangency condition c² = a²(1+m²), diameter form.',
    trigger: 'Circle passing through origin has constant c = 0. Orthogonal circles condition: 2g₁g₂ + 2f₁f₂ = c₁ + c₂.',
    primaryVideo: { title: 'Circles One Shot', channel: 'PW JEE Wallah', url: 'https://www.youtube.com/results?search_query=circles+one+shot+pw+jee' },
    secondaryVideo: { title: 'Circles Shortcuts for NIMCET', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=circles+nimcet+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 19,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Parabola',
    topics: 'Standard y² = 4ax, focus (a, 0), directrix x = -a, tangent y = mx + a/m, parametric (at², 2at).',
    trigger: 'Tangents at extremities of focal chord always intersect at 90° on the directrix.',
    primaryVideo: { title: 'Parabola Conic Sections', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=parabola+conic+sections+mohit+tyagi' },
    secondaryVideo: { title: 'Parabola NIMCET PYQs', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=parabola+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 20,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Ellipse & Hyperbola',
    topics: 'Eccentricity: Ellipse e = √(1-b²/a²) < 1, Hyperbola e = √(1+b²/a²) > 1, foci (±ae, 0).',
    trigger: 'Locus of intersection of perpendicular tangents is Director Circle: Ellipse x²+y²=a²+b², Hyperbola x²+y²=a²-b².',
    primaryVideo: { title: 'Ellipse and Hyperbola in One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=ellipse+and+hyperbola+neha+agrawal' },
    secondaryVideo: { title: 'Ellipse Hyperbola NIMCET', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=ellipse+hyperbola+nimcet+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 21,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Tangents & Normals to Conic Sections',
    topics: 'Tangent forms (slope m, parametric t, point T=0), chord of contact T=0, midpoint chord T=S₁.',
    trigger: 'Point of contact for tangent y = mx + c to y² = 4ax is (a/m², 2a/m).',
    primaryVideo: { title: 'Conics Tangents & Normals Mastery', channel: 'Unacademy JEE', url: 'https://www.youtube.com/results?search_query=conics+tangents+and+normals+unacademy+jee' },
    secondaryVideo: { title: 'Conics Shortcuts NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=conics+shortcuts+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 22,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Vector Algebra (Dot & Cross Products)',
    topics: 'a · b, a × b, projection of a on b, unit vectors, angle between vectors.',
    trigger: 'If |a + b| = |a - b|, then a ⊥ b (θ = 90°). If |a + b| = 1 with unit vectors, then |a - b| = √3.',
    primaryVideo: { title: 'Vectors One Shot for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=vectors+nimcet+impetus+gurukul' },
    secondaryVideo: { title: 'Vector Algebra Shortcuts', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=vector+algebra+tricks+neha+agrawal' },
    practiceLink: '/year-papers'
  },
  {
    day: 23,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Scalar & Vector Triple Products',
    topics: '[a b c] = a · (b × c), coplanar condition [a b c] = 0, volume of parallelepiped.',
    trigger: '[(a+b) (b+c) (c+a)] = 2[a b c]. [(a×b) (b×c) (c×a)] = [a b c]². Any two parallel vectors make [a b c] = 0.',
    primaryVideo: { title: 'Scalar Triple Product and 3D Geometry', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=scalar+triple+product+mohit+tyagi' },
    secondaryVideo: { title: 'Vectors 3D NIMCET PYQ', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=vectors+3d+nimcet+aspire+study' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 24,
    phase: 'Phase 3: Coordinate Geometry & Vectors',
    title: 'Phase 3 Timed Practice Drill',
    topics: '45-minute timed sprint on Conics & Vectors.',
    trigger: 'Solve questions using geometric drawing & option testing.',
    primaryVideo: { title: 'Vectors & Conics PYQ Sprint', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=vectors+conics+nimcet+pyqs' },
    secondaryVideo: { title: 'Coordinate Geometry Tricks', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=coordinate+geometry+tricks+neha+agrawal' },
    practiceLink: '/year-papers'
  },

  // PHASE 4
  {
    day: 25,
    phase: 'Phase 4: Calculus',
    title: 'Functions (Domain, Range & Types)',
    topics: 'Injective (one-one), Surjective (onto), Bijective, inverse f⁻¹(x), periodic functions.',
    trigger: 'A strictly monotonic function (f\'(x) > 0 or f\'(x) < 0 everywhere) is always one-one.',
    primaryVideo: { title: 'Functions Domain and Range Full Concept', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=functions+domain+and+range+neha+agrawal' },
    secondaryVideo: { title: 'Functions NIMCET Revision', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=functions+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 26,
    phase: 'Phase 4: Calculus',
    title: 'Limits & Indeterminate Forms',
    topics: 'L\'Hôpital\'s Rule for 0/0 and ∞/∞; 1^∞ standard formula: lim f(x)^g(x) = e^{lim g(x)(f(x)-1)}.',
    trigger: 'lim_{x→∞} ((x+a)/(x+b))^{x+c} = e^{a-b} immediately.',
    primaryVideo: { title: 'Limits in One Shot with Super Tricks', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=limits+one+shot+tricks+neha+agrawal' },
    secondaryVideo: { title: 'Limits Shortcuts NIMCET', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=limits+nimcet+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 27,
    phase: 'Phase 4: Calculus',
    title: 'Continuity & Differentiability',
    topics: 'LHL = RHL = f(a), differentiability tests, sharp corners & cusp analysis.',
    trigger: 'Functions containing |x-a| are continuous at x = a but NEVER differentiable at x = a.',
    primaryVideo: { title: 'Continuity and Differentiability One Shot', channel: 'PW JEE', url: 'https://www.youtube.com/results?search_query=continuity+and+differentiability+pw+jee' },
    secondaryVideo: { title: 'Differentiability NIMCET', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=differentiability+mohit+tyagi' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 28,
    phase: 'Phase 4: Calculus',
    title: 'Rolle\'s Theorem & LMVT',
    topics: 'Conditions for f\'(c) = 0 (Rolle\'s), f\'(c) = (f(b)-f(a))/(b-a) (LMVT).',
    trigger: 'Between any two real roots of f(x) = 0, there exists at least one real root of f\'(x) = 0.',
    primaryVideo: { title: 'Rolle\'s Theorem & LMVT Concepts', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=rolles+theorem+lmvt+mohit+tyagi' },
    secondaryVideo: { title: 'LMVT PYQs for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=rolles+theorem+nimcet+impetus+gurukul' },
    practiceLink: '/year-papers'
  },
  {
    day: 29,
    phase: 'Phase 4: Calculus',
    title: 'Maxima & Minima / Applications of Derivatives',
    topics: 'Critical points, first & second derivative tests, tangents & normals.',
    trigger: 'For f(x) = a·sin(x) + b·cos(x) + c, range is [c - √(a²+b²), c + √(a²+b²)].',
    primaryVideo: { title: 'Maxima and Minima Super Tricks', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=maxima+minima+tricks+impetus+gurukul' },
    secondaryVideo: { title: 'AOD in One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=application+of+derivatives+neha+agrawal' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 30,
    phase: 'Phase 4: Calculus',
    title: 'Indefinite Integration & Substitution',
    topics: 'Standard substitutions, integration by parts, special form ∫ eˣ [f(x) + f\'(x)] dx = eˣ f(x) + c.',
    trigger: 'Reverse Differentiation: Differentiate the 4 options to see which gives the integrand.',
    primaryVideo: { title: 'Indefinite Integration Shortcuts', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=indefinite+integration+tricks+neha+agrawal' },
    secondaryVideo: { title: 'Integration for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=integration+nimcet+impetus+gurukul' },
    practiceLink: '/year-papers'
  },
  {
    day: 31,
    phase: 'Phase 4: Calculus',
    title: 'Definite Integrals (King\'s Property)',
    topics: 'King\'s Property: ∫[a, b] f(x) dx = ∫[a, b] f(a+b-x) dx.',
    trigger: '∫[0, π/2] (sinⁿ x) / (sinⁿ x + cosⁿ x) dx = π/4 for ANY power n (even n=1000).',
    primaryVideo: { title: 'King\'s Property & Shortcuts', channel: 'Unacademy JEE', url: 'https://www.youtube.com/results?search_query=definite+integration+kings+rule+unacademy+jee' },
    secondaryVideo: { title: 'Definite Integrals NIMCET', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=definite+integrals+nimcet+aspire+study' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 32,
    phase: 'Phase 4: Calculus',
    title: 'Odd/Even Definite Integrals',
    topics: 'Symmetric limits [-a, a], periodic properties ∫[0, nT] f(x)dx = n∫[0, T] f(x)dx.',
    trigger: '∫[-a, a] f(x) dx = 0 if f(x) is odd (e.g. x³·cos(x)).',
    primaryVideo: { title: 'Definite Integration Properties One Shot', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=definite+integration+properties+mohit+tyagi' },
    secondaryVideo: { title: 'Definite Integrals Marathon', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=definite+integration+nimcet+impetus+gurukul' },
    practiceLink: '/year-papers'
  },
  {
    day: 33,
    phase: 'Phase 4: Calculus',
    title: 'Area Under Curves',
    topics: 'Area enclosed by parabola and line, between two parabolas, circle sectors.',
    trigger: 'Area between y² = 4ax and x² = 4by is 16ab / 3. Area between y² = 4ax and line y = mx is 8a² / (3m³).',
    primaryVideo: { title: 'Area Under Curves Super Tricks', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=area+under+curves+tricks+impetus+gurukul' },
    secondaryVideo: { title: 'Area Under Curves in One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=area+under+curves+neha+agrawal' },
    practiceLink: '/year-papers'
  },
  {
    day: 34,
    phase: 'Phase 4: Calculus',
    title: 'Differential Equations',
    topics: 'Order and degree, variable separable, linear differential equation dy/dx + Py = Q.',
    trigger: 'If dy/dx + (k/x)y = Q(x), then Integrating Factor IF = xᵏ directly.',
    primaryVideo: { title: 'Differential Equations in One Shot', channel: 'PW JEE', url: 'https://www.youtube.com/results?search_query=differential+equations+one+shot+pw' },
    secondaryVideo: { title: 'Differential Equations NIMCET', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=differential+equations+nimcet+aspire+study' },
    practiceLink: '/practice?subjectId=sub_math'
  },

  // PHASE 5
  {
    day: 35,
    phase: 'Phase 5: Probability & Statistics',
    title: 'Probability Fundamentals & Independent Events',
    topics: 'Sample spaces, addition theorem P(A ∪ B), independent events P(A ∩ B) = P(A)P(B).',
    trigger: 'P(at least one success) = 1 - P(no success) = 1 - (1-p)ⁿ.',
    primaryVideo: { title: 'Probability Complete One Shot', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=probability+one+shot+neha+agrawal' },
    secondaryVideo: { title: 'Probability for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=probability+nimcet+impetus+gurukul' },
    practiceLink: '/year-papers'
  },
  {
    day: 36,
    phase: 'Phase 5: Probability & Statistics',
    title: 'Bayes\' Theorem & Conditional Probability',
    topics: 'Conditional probability P(A|B) = P(A ∩ B)/P(B), Total Probability, Bayes\' formula.',
    trigger: 'Draw a probability tree diagram with two prior branches; product of desired branch divided by sum of both branches.',
    primaryVideo: { title: 'Bayes Theorem in One Shot', channel: 'Unacademy JEE', url: 'https://www.youtube.com/results?search_query=bayes+theorem+unacademy+jee' },
    secondaryVideo: { title: 'Bayes Theorem NIMCET PYQs', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=bayes+theorem+nimcet+aspire+study' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 37,
    phase: 'Phase 5: Probability & Statistics',
    title: 'Measures of Central Tendency (Mean, Median, Mode)',
    topics: 'Mean of grouped data, median interpolation, empirical rule Mode = 3·Median - 2·Mean.',
    trigger: 'Remember: Mode = 3Median - 2Mean. If mean and median are given, find mode in 10 seconds.',
    primaryVideo: { title: 'Statistics Mean Median Mode Full Concept', channel: 'Mohit Tyagi', url: 'https://www.youtube.com/results?search_query=statistics+mean+median+mode+mohit+tyagi' },
    secondaryVideo: { title: 'Statistics Shortcuts for NIMCET', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=statistics+nimcet+impetus+gurukul' },
    practiceLink: '/practice?subjectId=sub_math'
  },
  {
    day: 38,
    phase: 'Phase 5: Probability & Statistics',
    title: 'Variance & Standard Deviation',
    topics: 'Variance σ² = (∑ xᵢ²)/n - (x̄)², Mean Deviation about mean.',
    trigger: 'Shift Invariance: Adding/subtracting any constant c to all data points leaves Variance & SD completely unchanged!',
    primaryVideo: { title: 'Statistics Variance and SD Tricks', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=statistics+variance+standard+deviation+tricks+neha+agrawal' },
    secondaryVideo: { title: 'Statistics PYQ Marathon', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=statistics+nimcet+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 39,
    phase: 'Phase 5: Probability & Statistics',
    title: 'Phase 5 Mixed Probability & Stats Drill',
    topics: '35 questions combining probability distributions and statistics.',
    trigger: 'Review binomial distribution formula P(X = r) = C(n,r) pʳ q^{n-r}. Mean = np, Variance = npq.',
    primaryVideo: { title: 'Probability & Stats Final Sprint', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=probability+statistics+nimcet+impetus+gurukul' },
    secondaryVideo: { title: 'Maths Quick Revision', channel: 'Neha Agrawal', url: 'https://www.youtube.com/results?search_query=maths+formula+revision+neha+agrawal' },
    practiceLink: '/practice?subjectId=sub_math'
  },

  // PHASE 6
  {
    day: 40,
    phase: 'Phase 6: Timed Paper Sprints',
    title: 'NIMCET 2020 Official Paper (Q1–Q50)',
    topics: 'Attempt full 50 Mathematics questions in strict 55 minutes.',
    trigger: 'Simulate official exam pressure. Use question palette to skip lengthy questions and solve 20-second triggers first.',
    primaryVideo: { title: 'NIMCET 2020 Math Solution', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=nimcet+2020+math+solution+impetus+gurukul' },
    secondaryVideo: { title: '2020 Paper Analysis', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=nimcet+2020+paper+solution+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 41,
    phase: 'Phase 6: Timed Paper Sprints',
    title: 'NIMCET 2021 Official Paper (Q1–Q50)',
    topics: 'Attempt full 50 Mathematics questions in strict 55 minutes.',
    trigger: 'Target: Solve at least 35 questions with >85% accuracy.',
    primaryVideo: { title: 'NIMCET 2021 Math Paper Solution', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=nimcet+2021+math+solution+impetus+gurukul' },
    secondaryVideo: { title: '2021 Solution Walkthrough', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=nimcet+2021+paper+solution+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 42,
    phase: 'Phase 6: Timed Paper Sprints',
    title: 'NIMCET 2022 Official Paper (Q1–Q50)',
    topics: 'Attempt full 50 Mathematics questions in strict 55 minutes.',
    trigger: 'Check topic-wise accuracy in your personal dashboard.',
    primaryVideo: { title: 'NIMCET 2022 Math Paper Solution', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=nimcet+2022+math+solution+impetus+gurukul' },
    secondaryVideo: { title: '2022 Solution Video', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=nimcet+2022+paper+solution+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 43,
    phase: 'Phase 6: Timed Paper Sprints',
    title: 'NIMCET 2023 Original Paper (Q1–Q50)',
    topics: 'Attempt full 50 Mathematics questions in strict 55 minutes.',
    trigger: 'Identify whether Calculus or Algebra took the most time and optimize shortcut usage.',
    primaryVideo: { title: 'NIMCET 2023 Math Paper Solution', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=nimcet+2023+math+solution+impetus+gurukul' },
    secondaryVideo: { title: '2023 Complete Solution', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=nimcet+2023+paper+solution+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 44,
    phase: 'Phase 6: Timed Paper Sprints',
    title: 'NIMCET 2024 Official Paper (Q1–Q50)',
    topics: 'Attempt full 50 Mathematics questions in strict 55 minutes.',
    trigger: 'Latest official paper pattern. Verify formula retention.',
    primaryVideo: { title: 'NIMCET 2024 Math Paper Solution', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=nimcet+2024+math+solution+impetus+gurukul' },
    secondaryVideo: { title: '2024 Solution Analysis', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=nimcet+2024+paper+solution+aspire+study' },
    practiceLink: '/year-papers'
  },
  {
    day: 45,
    phase: 'Phase 6: Timed Paper Sprints',
    title: 'NIMCET 2026 Expected Model Paper',
    topics: 'Full 120-question test simulation (50 Math + 40 Reasoning + 20 Computer + 10 English).',
    trigger: 'Official 1000-mark mock test under real 120-minute timer. Achieve your dream NIT MCA seat!',
    primaryVideo: { title: 'Final Day Exam Mindset & Tips', channel: 'Impetus Gurukul', url: 'https://www.youtube.com/results?search_query=nimcet+exam+day+mindset+tips' },
    secondaryVideo: { title: 'NIMCET 2026 Strategy', channel: 'Aspire Study', url: 'https://www.youtube.com/results?search_query=nimcet+2026+strategy+aspire+study' },
    practiceLink: '/mock-test'
  }
];

const PHASES = [
  'All (45 Days)',
  'Phase 1: Algebra & Logic',
  'Phase 2: Trigonometry',
  'Phase 3: Coordinate Geometry & Vectors',
  'Phase 4: Calculus',
  'Phase 5: Probability & Statistics',
  'Phase 6: Timed Paper Sprints'
];

const RoadmapPage = () => {
  const [selectedPhase, setSelectedPhase] = useState('All (45 Days)');
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('nimcet_math_roadmap_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const toggleDayCompletion = (dayNum) => {
    setCompletedDays(prev => {
      const updated = { ...prev, [dayNum]: !prev[dayNum] };
      localStorage.setItem('nimcet_math_roadmap_progress', JSON.stringify(updated));
      return updated;
    });
  };

  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / DAYS_DATA.length) * 100);

  const filteredDays = selectedPhase === 'All (45 Days)'
    ? DAYS_DATA
    : DAYS_DATA.filter(d => d.phase === selectedPhase);

  return (
    <div className={styles.roadmapContainer}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <div className={styles.heroTag}>
          <FiAward /> Official Revised Syllabus 2026
        </div>
        <h1 className={styles.heroTitle}>
          45-Day Mathematics AIR 1 Master Roadmap
        </h1>
        <p className={styles.heroSubtitle}>
          A laser-focused day-by-day blueprint designed to transform your speed and pattern recognition. 
          Mathematics carries <strong>50 Questions = 600 Marks</strong> (60% of total score). Follow each day's curated video, apply the instant recognition triggers, and drill practice questions without wasting time.
        </p>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FiTarget /></div>
            <div className={styles.statInfo}>
              <h4>50 Qs / 600 M</h4>
              <p>Total Math Weightage</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FiZap /></div>
            <div className={styles.statInfo}>
              <h4>15-20 Sec</h4>
              <p>Instant Recognition Target</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FiBookOpen /></div>
            <div className={styles.statInfo}>
              <h4>45 Days</h4>
              <p>Structured Day-Wise Plan</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FiClock /></div>
            <div className={styles.statInfo}>
              <h4>3 Hours/Day</h4>
              <p>Recommended Daily Routine</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tracker Card */}
      <div className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <h3>Your Roadmap Completion</h3>
          <span className={styles.progressPercent}>{completedCount} of {DAYS_DATA.length} Days Completed ({progressPercent}%)</span>
        </div>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Instant Recognition Cheat Codes Section */}
      <div className={styles.cheatCodesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FiZap style={{ color: '#f59e0b' }} /> The 4 "Instant Recognition" Cheat Codes
          </h2>
        </div>
        <div className={styles.cheatCodesGrid}>
          {CHEAT_CODES.map((cheat, idx) => (
            <div key={idx} className={styles.cheatCard}>
              <span className={styles.cheatNumber}>{cheat.num}</span>
              <h4 className={styles.cheatTitle}>{cheat.title}</h4>
              <p className={styles.cheatDesc}>{cheat.desc}</p>
              <div className={styles.cheatFormula}>{cheat.formula}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why We Chose These Resources Section */}
      <div className={styles.rationaleCard}>
        <h2 className={styles.sectionTitle}>
          <FiHelpCircle style={{ color: 'var(--color-primary)' }} /> Why We Chose These Specific Video Resources
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.5rem' }}>
          Finding the right learning material can waste hours of precious preparation time. We handpicked these four educational channels based on proven AIR toppers' methodologies:
        </p>
        <div className={styles.rationaleGrid}>
          {TEACHER_RATIONALE.map((teacher, idx) => (
            <div key={idx} className={styles.rationaleItem}>
              <div className={styles.teacherName}>{teacher.name}</div>
              <div className={styles.teacherRole}>{teacher.role}</div>
              <p className={styles.teacherWhy}>{teacher.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Filters Bar */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FiBookOpen style={{ color: 'var(--color-primary)' }} /> Day-Wise Study Program
        </h2>
      </div>
      <div className={styles.tabsBar}>
        {PHASES.map((phase) => (
          <button
            key={phase}
            className={`${styles.tabBtn} ${selectedPhase === phase ? styles.activeTab : ''}`}
            onClick={() => setSelectedPhase(phase)}
          >
            {phase}
          </button>
        ))}
      </div>

      {/* Days List */}
      <div className={styles.daysList}>
        {filteredDays.map((item) => {
          const isDone = !!completedDays[item.day];
          return (
            <div key={item.day} className={`${styles.dayCard} ${isDone ? styles.completedDay : ''}`}>
              <div className={styles.dayHeader}>
                <div>
                  <div className={styles.dayMeta}>
                    <span className={styles.dayBadge}>Day {item.day}</span>
                    <span className={styles.phaseBadge}>{item.phase}</span>
                  </div>
                  <h3 className={styles.dayTitle}>{item.title}</h3>
                </div>

                <label className={`${styles.checkboxLabel} ${isDone ? styles.checked : ''}`}>
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleDayCompletion(item.day)}
                    style={{ display: 'none' }}
                  />
                  {isDone ? <FiCheckCircle size={18} /> : <FiCircle size={18} />}
                  <span>{isDone ? 'Day Completed!' : 'Mark as Done'}</span>
                </label>
              </div>

              <div className={styles.topicsList}>
                <strong>🎯 Core Concepts to Master Today:</strong> {item.topics}
              </div>

              <div className={styles.triggerBox}>
                <div className={styles.triggerHeader}>
                  <FiZap /> <span>Instant Answer Recognition Trigger (15-Sec Shortcut):</span>
                </div>
                <div className={styles.triggerContent}>
                  {item.trigger}
                </div>
              </div>

              <div className={styles.actionRow}>
                <div className={styles.videoLinks}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    📺 Curated Video Lectures:
                  </span>
                  <a 
                    href={item.primaryVideo.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.videoBtn}
                  >
                    <FiPlay /> {item.primaryVideo.title} ({item.primaryVideo.channel})
                  </a>
                  {item.secondaryVideo && (
                    <a 
                      href={item.secondaryVideo.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.videoBtnSecondary}
                    >
                      <FiExternalLink /> {item.secondaryVideo.channel} NIMCET PYQ
                    </a>
                  )}
                </div>

                <Link to={item.practiceLink} className={styles.practiceBtn}>
                  Drill Practice Questions <FiChevronRight />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapPage;
