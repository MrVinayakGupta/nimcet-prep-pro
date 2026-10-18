import React, { useState, useEffect } from 'react';
import { FiClock, FiCheck, FiX, FiFlag, FiChevronLeft, FiChevronRight, FiLoader, FiRotateCcw, FiAward } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import { getQuestionsByYear, generateMockTest } from '../../services/api';
import { MathText, BlockMath } from '../../components/Common/MathRenderer';
import styles from './MockTestPage.module.css';

const DEFAULT_QUESTIONS = [
  {
    _id: 'sample_1',
    questionText: 'If $A$ and $B$ are symmetric matrices of the same order, then $AB - BA$ is a:',
    options: [
      { id: 'A', text: 'Skew-symmetric matrix' },
      { id: 'B', text: 'Symmetric matrix' },
      { id: 'C', text: 'Zero matrix' },
      { id: 'D', text: 'Identity matrix' }
    ],
    correctAnswer: 'A',
    explanation: {
      summary: '$(AB - BA)^T = (AB)^T - (BA)^T = B^T A^T - A^T B^T = BA - AB = -(AB - BA)$, which is skew-symmetric.',
      conceptUsed: 'Matrix Transpose Properties'
    }
  },
  {
    _id: 'sample_2',
    questionText: 'The value of $\\lim_{x \\to 0} \\frac{\\sin 5x}{\\tan 3x}$ is:',
    options: [
      { id: 'A', text: '$\\frac{5}{3}$' },
      { id: 'B', text: '$\\frac{3}{5}$' },
      { id: 'C', text: '$1$' },
      { id: 'D', text: '$0$' }
    ],
    correctAnswer: 'A',
    explanation: {
      summary: 'Using standard limits $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$ and $\\lim_{v \\to 0} \\frac{\\tan v}{v} = 1$: $\\frac{\\sin 5x}{\\tan 3x} = \\frac{5x}{3x} \\cdot \\frac{\\sin 5x / 5x}{\\tan 3x / 3x} = \\frac{5}{3}$.',
      conceptUsed: 'Standard Trigonometric Limits'
    }
  },
  {
    _id: 'sample_3',
    questionText: 'Which data structure follows the LIFO (Last-In-First-Out) principle?',
    options: [
      { id: 'A', text: 'Queue' },
      { id: 'B', text: 'Stack' },
      { id: 'C', text: 'Linked List' },
      { id: 'D', text: 'Tree' }
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'A Stack is a Last-In, First-Out (LIFO) data structure where the element inserted last is accessed first.',
      conceptUsed: 'Data Structures Fundamentals'
    }
  }
];

const MockTestPage = () => {
  const [phase, setPhase] = useState('setup'); // 'setup', 'test', 'result'
  const [config, setConfig] = useState({ count: 30, year: 2026 });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [showReviewList, setShowReviewList] = useState(false);

  useEffect(() => {
    let timer;
    if (phase === 'test' && timeRemaining > 0) {
      timer = setInterval(() => setTimeRemaining(prev => prev - 1), 1000);
    } else if (phase === 'test' && timeRemaining === 0) {
      submitTest();
    }
    return () => clearInterval(timer);
  }, [phase, timeRemaining]);

  const startTest = async () => {
    setLoading(true);
    try {
      // Fetch authentic NIMCET previous year questions for realistic mock exam
      const res = await getQuestionsByYear(config.year);
      let loaded = res.data && res.data.length > 0 ? res.data : DEFAULT_QUESTIONS;
      
      // Shuffle & limit to requested count
      loaded = [...loaded].sort(() => 0.5 - Math.random()).slice(0, config.count);
      if (loaded.length === 0) loaded = DEFAULT_QUESTIONS;
      
      setQuestions(loaded);
      setTimeRemaining(loaded.length * 60); // 1 minute per question
      setAnswers({});
      setMarkedForReview({});
      setCurrentQIndex(0);
      setPhase('test');
    } catch (err) {
      setQuestions(DEFAULT_QUESTIONS);
      setTimeRemaining(DEFAULT_QUESTIONS.length * 60);
      setPhase('test');
    } finally {
      setLoading(false);
    }
  };

  const submitTest = () => {
    setPhase('result');
    
    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      const selected = answers[q._id];
      if (selected && selected === (q.correctAnswer || q.correctOption)) {
        correctCount++;
      }
    });

    const percentage = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
    if (percentage >= 70) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#10B981', '#F59E0B']
      });
    }
  };

  const handleOptionSelect = (qId, optId) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const toggleReview = (qId) => {
    setMarkedForReview(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (phase === 'setup') {
    return (
      <div className={styles.container}>
        <div className={styles.setupCard}>
          <h2>NIMCET Mock Test Simulator</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Simulate the actual NIMCET exam conditions with live timer, question palette, and negative marking (+4 / -1).
          </p>
          
          <div className={styles.formGroup}>
            <label>Question Paper Source</label>
            <select 
              value={config.year} 
              onChange={(e) => setConfig(prev => ({ ...prev, year: Number(e.target.value) }))}
              className={styles.select}
            >
              {[2026, 2025, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007].map(y => (
                <option key={y} value={y}>NIMCET {y} Paper Bank</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Number of Questions</label>
            <div className={styles.options}>
              {[15, 30, 60, 120].map(n => (
                <button 
                  key={n}
                  type="button"
                  className={`${styles.optBtn} ${config.count === n ? styles.activeOpt : ''}`}
                  onClick={() => setConfig(prev => ({ ...prev, count: n }))}
                >{n} Qs</button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--card-bg-hover)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <strong>Exam Pattern:</strong>
            <ul style={{ margin: '0.5rem 0 0 1.2rem', color: 'var(--text-secondary)' }}>
              <li><strong>+4 Marks</strong> for each correct answer</li>
              <li><strong>-1 Mark</strong> for each incorrect answer</li>
              <li>Timer: {config.count} minutes ({config.count} Qs)</li>
            </ul>
          </div>

          <button className={styles.startBtn} onClick={startTest} disabled={loading}>
            {loading ? 'Preparing Test Paper...' : 'Start Mock Test Now'}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'test') {
    const q = questions[currentQIndex] || questions[0];
    const correctOpt = q.correctAnswer || q.correctOption;

    return (
      <div className={styles.testContainer}>
        <div className={styles.mainArea}>
          <div className={styles.topBar}>
            <div className={`${styles.timer} ${timeRemaining < 300 ? styles.timerWarning : ''}`}>
              <FiClock /> Time Left: {formatTime(timeRemaining)}
            </div>
            <button className={styles.submitBtnTop} onClick={() => {
              if (window.confirm("Are you sure you want to submit your mock test?")) submitTest();
            }}>
              Submit Test
            </button>
          </div>

          <div className={styles.questionArea}>
            <div className={styles.qHeader}>
              <span className={styles.qNum}>
                Question {currentQIndex + 1} of {questions.length}
                {q.difficulty && <span style={{ marginLeft: '10px', fontSize: '0.8rem', opacity: 0.8, textTransform: 'capitalize' }}>({q.difficulty})</span>}
              </span>
              <button 
                type="button"
                className={`${styles.reviewBtn} ${markedForReview[q._id] ? styles.activeReview : ''}`}
                onClick={() => toggleReview(q._id)}
              >
                <FiFlag /> {markedForReview[q._id] ? 'Marked for Review' : 'Mark for Review'}
              </button>
            </div>
            
            <div className={styles.qText} style={{ fontSize: '1.15rem', lineHeight: '1.6' }}>
              <MathText text={q.questionText || q.text} />
            </div>
            
            <div className={styles.optionsGrid}>
              {q.options && q.options.map(opt => (
                <button 
                  key={opt.id}
                  type="button"
                  className={`${styles.optionBtn} ${answers[q._id] === opt.id ? styles.selectedOption : ''}`}
                  onClick={() => handleOptionSelect(q._id, opt.id)}
                >
                  <span className={styles.optLabel}>{opt.id}</span>
                  <MathText text={opt.text} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.navigation}>
            <button 
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
              className={styles.navBtn}
            ><FiChevronLeft /> Previous</button>
            <button 
              disabled={currentQIndex === questions.length - 1}
              onClick={() => setCurrentQIndex(prev => prev + 1)}
              className={styles.navBtn}
            >Next <FiChevronRight /></button>
          </div>
        </div>

        <div className={styles.sidePanel}>
          <h3>Question Navigator</h3>
          <div className={styles.grid}>
            {questions.map((qItem, idx) => {
              let stateClass = styles.navUnanswered;
              if (answers[qItem._id]) stateClass = styles.navAnswered;
              if (markedForReview[qItem._id]) {
                stateClass = answers[qItem._id] ? styles.navReviewAnswered : styles.navReview;
              }

              return (
                <button 
                  key={qItem._id || idx}
                  type="button"
                  className={`${styles.navCell} ${stateClass} ${currentQIndex === idx ? styles.navCellActive : ''}`}
                  onClick={() => setCurrentQIndex(idx)}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div>🟢 Answered ({Object.keys(answers).length})</div>
            <div>🟣 Marked for Review ({Object.keys(markedForReview).length})</div>
            <div>⚪ Unattempted ({questions.length - Object.keys(answers).length})</div>
          </div>
        </div>
      </div>
    );
  }

  // Result Phase
  let correct = 0, wrong = 0, unattempted = 0;
  questions.forEach(q => {
    const selected = answers[q._id];
    const correctOpt = q.correctAnswer || q.correctOption;
    if (!selected) {
      unattempted++;
    } else if (selected === correctOpt) {
      correct++;
    } else {
      wrong++;
    }
  });

  const totalScore = correct * 4 - wrong * 1;
  const maxPossible = questions.length * 4;
  const accuracy = (correct + wrong) > 0 ? ((correct / (correct + wrong)) * 100).toFixed(1) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.resultCard}>
        <h2><FiAward style={{ verticalAlign: 'middle', color: 'var(--color-primary)' }} /> Mock Test Performance</h2>
        
        <div className={styles.scoreCircle}>
          <span>{totalScore}</span>
          <small>out of {maxPossible} marks</small>
        </div>
        
        <div className={styles.statsRow}>
          <div className={styles.statBox} style={{ color: 'var(--color-success)' }}>
            <FiCheck /> {correct} Correct (+{correct * 4})
          </div>
          <div className={styles.statBox} style={{ color: 'var(--color-danger)' }}>
            <FiX /> {wrong} Incorrect (-{wrong * 1})
          </div>
          <div className={styles.statBox} style={{ color: 'var(--text-secondary)' }}>
             {unattempted} Unattempted (0)
          </div>
        </div>

        <div style={{ margin: '1.5rem 0', display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-secondary)' }}>
          <div><strong>Accuracy:</strong> {accuracy}%</div>
          <div><strong>Attempted:</strong> {correct + wrong} / {questions.length}</div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className={styles.startBtn} onClick={() => setPhase('setup')}>
            <FiRotateCcw style={{ marginRight: '6px' }} /> Retake Test
          </button>
          <button 
            className={styles.startBtn} 
            style={{ background: 'var(--card-bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
            onClick={() => setShowReviewList(!showReviewList)}
          >
            {showReviewList ? 'Hide Answer Review' : 'Review Questions & Solutions'}
          </button>
        </div>

        {showReviewList && (
          <div style={{ marginTop: '2.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3>Detailed Question Breakdown:</h3>
            {questions.map((q, idx) => {
              const selected = answers[q._id];
              const correctOpt = q.correctAnswer || q.correctOption;
              const isCorrect = selected === correctOpt;

              return (
                <div 
                  key={q._id} 
                  style={{ 
                    background: 'var(--card-bg)', 
                    border: `1px solid ${isCorrect ? 'var(--color-success)' : selected ? 'var(--color-danger)' : 'var(--border-color)'}`,
                    borderRadius: '8px', 
                    padding: '1rem' 
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                    Q{idx + 1}: <MathText text={q.questionText || q.text} />
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    Your Answer: <strong style={{ color: isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>{selected || 'Skipped'}</strong> | Correct Answer: <strong style={{ color: 'var(--color-success)' }}>{correctOpt}</strong>
                  </div>
                  {q.explanation && (
                    <div style={{ background: 'var(--card-bg-hover)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                      <strong>Solution: </strong>
                      <MathText text={typeof q.explanation === 'string' ? q.explanation : q.explanation.summary} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockTestPage;
