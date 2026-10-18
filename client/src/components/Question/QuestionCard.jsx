import React, { useState, useEffect } from 'react';
import { BlockMath, InlineMath, MathText } from '../Common/MathRenderer';
import { FiCheck, FiX, FiInfo, FiMessageSquare, FiBookmark, FiAlertTriangle, FiZap } from 'react-icons/fi';
import { submitAnswer, toggleBookmark, getAIExplanation } from '../../services/api';
import styles from './QuestionCard.module.css';

const renderMathText = (text) => <MathText text={text} />;

const QuestionCard = ({ question, index, initialAnswer, onAnswerSubmitted }) => {
  const [selectedOption, setSelectedOption] = useState(initialAnswer?.selectedAnswer || null);
  const [showExplanation, setShowExplanation] = useState(!!initialAnswer);
  const [isAiExplaining, setIsAiExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (initialAnswer?.selectedAnswer) {
      setSelectedOption(initialAnswer.selectedAnswer);
    }
  }, [initialAnswer]);

  const handleOptionSelect = async (optId) => {
    if (!selectedOption) {
      setSelectedOption(optId);
      const isCorrectAnswer = optId === question.correctAnswer;
      const timestamp = new Date().toISOString();

      // Save to localStorage immediately so student always has record
      try {
        const cached = JSON.parse(localStorage.getItem('nimcet_user_answers') || '{}');
        cached[question._id] = {
          selectedAnswer: optId,
          isCorrect: isCorrectAnswer,
          subjectId: question.subjectId?._id || question.subjectId || 'sub_math',
          timestamp
        };
        localStorage.setItem('nimcet_user_answers', JSON.stringify(cached));
      } catch (e) {}

      try {
        const res = await submitAnswer(question._id, optId);
        if (onAnswerSubmitted) {
          onAnswerSubmitted(question._id, {
            selectedAnswer: optId,
            isCorrect: res.data?.isCorrect ?? isCorrectAnswer,
            timestamp
          });
        }
      } catch (err) {
        console.error('Failed to submit answer to server', err);
        if (onAnswerSubmitted) {
          onAnswerSubmitted(question._id, {
            selectedAnswer: optId,
            isCorrect: isCorrectAnswer,
            timestamp
          });
        }
      }
    }
  };

  const getDifficultyColor = (diff) => {
    const d = (diff || '').toLowerCase();
    switch(d) {
      case 'easy': return 'var(--color-success)';
      case 'moderate': return 'var(--color-warning)';
      case 'hard': return 'var(--color-danger)';
      default: return 'var(--text-secondary)';
    }
  };

  const handleAiExplain = async () => {
    setIsAiExplaining(true);
    try {
      const res = await getAIExplanation(question._id);
      setAiExplanation(res.data.explanation || "AI Explanation generated.");
    } catch(err) {
      setAiExplanation("Failed to get AI explanation.");
    } finally {
      setIsAiExplaining(false);
    }
  };

  const handleBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);
      await toggleBookmark(question._id);
    } catch(err) {
      setIsBookmarked(isBookmarked); // Revert on failure
    }
  };

  return (
    <div className={styles.card} id={`q-item-${question.questionNumber || (index + 1)}`}>
      <div className={styles.cardHeader}>
        <div className={styles.badges}>
          <span className={styles.qBadge}>Q{question.questionNumber || (index + 1)}</span>
          {question.examSource === 'CAT' || (question.tags && question.tags.includes('cat-reasoning')) ? (
            <span className={styles.catBadge}>🦁 CAT {question.year} Official DILR</span>
          ) : (
            <span className={styles.yearBadge}>{question.year ? `NIMCET ${question.year}` : 'NIMCET'}</span>
          )}
          {question.isFromPreviousYear && (
            <span className={styles.marksBadge}>
              {(() => {
                const subName = (question.subjectId?.name || '').toLowerCase();
                const qNum = question.questionNumber || 0;
                if (subName.includes('math') || (qNum >= 1 && qNum <= 50)) return '+12 / -3 M';
                if (subName.includes('analytical') || subName.includes('reasoning') || (qNum > 50 && qNum <= 90)) return '+6 / -1.5 M';
                if (subName.includes('computer') || (qNum > 90 && qNum <= 100)) return '+8 / -2 M';
                return '+4 / -1 M';
              })()}
            </span>
          )}
          <span className={styles.diffBadge} style={{ borderColor: getDifficultyColor(question.difficulty), color: getDifficultyColor(question.difficulty), textTransform: 'capitalize' }}>
            {question.difficulty}
          </span>
        </div>
        <button onClick={handleBookmark} className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ''}`}>
          <FiBookmark />
        </button>
      </div>

      <div className={styles.questionText}>
        <p>{renderMathText(question.questionText)}</p>
      </div>

      <div className={styles.optionsGrid}>
        {question.options.map((opt) => {
          let optionClass = styles.optionCard;
          if (selectedOption) {
            if (opt.id === question.correctAnswer) {
              optionClass += ` ${styles.correctOption}`;
            } else if (opt.id === selectedOption) {
              optionClass += ` ${styles.wrongOption}`;
            } else {
              optionClass += ` ${styles.neutralOption}`;
            }
          }
          
          return (
            <button 
              key={opt.id}
              className={optionClass}
              onClick={() => handleOptionSelect(opt.id)}
              disabled={!!selectedOption}
            >
              <span className={styles.optLetter}>{opt.id}</span>
              <span className={styles.optText}>
                {renderMathText(opt.text)}
              </span>
              {selectedOption && opt.id === question.correctAnswer && <FiCheck className={styles.optIcon} />}
              {selectedOption === opt.id && opt.id !== question.correctAnswer && <FiX className={styles.optIcon} />}
            </button>
          )
        })}
      </div>

      <div className={styles.actions} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button 
          className={styles.explainBtn}
          onClick={() => setShowExplanation(!showExplanation)}
        >
          {showExplanation ? 'Hide Solution' : '👁️ View Solution & Step-by-Step Proof'}
        </button>
        <button 
          className={styles.aiBtn}
          onClick={handleAiExplain}
          disabled={isAiExplaining}
          style={{ background: 'var(--color-primary-light, rgba(79, 70, 229, 0.1))', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FiZap /> {isAiExplaining ? 'AI Generating...' : 'Ask AI Calculus Tutor'}
        </button>
      </div>

      {showExplanation && (
        <div className={styles.explanationSection}>
          <div className={styles.expBox}>
            <h4><FiInfo /> Explanation</h4>
            {question.explanation && (
              <div className={styles.expContent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {question.explanation.summary && (
                  <div><strong>Summary:</strong> <p>{renderMathText(question.explanation.summary)}</p></div>
                )}
                {question.explanation.conceptUsed && (
                  <div><span style={{background:'var(--color-primary)', color:'#fff', padding:'2px 8px', borderRadius:'12px', fontSize:'0.8rem'}}>Concept: {question.explanation.conceptUsed}</span></div>
                )}
                {question.explanation.prerequisites && question.explanation.prerequisites.length > 0 && (
                  <div>
                    <strong>Prerequisites:</strong>
                    {question.explanation.prerequisites.map((prereq, idx) => (
                      <div key={idx} style={{background: 'var(--card-bg-hover)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem'}}>
                        <span style={{fontWeight:'bold'}}>{prereq.topic}</span> ({prereq.importance})<br/>
                        <span style={{fontSize:'0.9rem'}}>{prereq.description}</span>
                      </div>
                    ))}
                  </div>
                )}
                {question.explanation.stepByStep && question.explanation.stepByStep.length > 0 && (
                  <div>
                    <strong>Step by Step Solution:</strong>
                    {question.explanation.stepByStep.map((step, idx) => (
                      <div key={idx} style={{marginTop: '0.8rem', borderLeft: '2px solid var(--border-color)', paddingLeft: '1rem'}}>
                        <strong>Step {step.stepNumber}: {step.title}</strong>
                        <p>{renderMathText(step.content)}</p>
                        {step.formula && <div style={{padding:'0.5rem 0'}}><BlockMath math={step.formula} /></div>}
                        {step.calculation && <div style={{background:'rgba(0,0,0,0.05)', padding:'0.5rem', borderRadius:'4px'}}>{renderMathText(step.calculation)}</div>}
                      </div>
                    ))}
                  </div>
                )}
                {question.explanation.whyThisHelpsInNIMCET && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.08))',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    margin: '1rem 0',
                    color: 'var(--text-primary)'
                  }}>
                    <strong style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.95rem' }}>
                      <FiZap /> Master NIMCET via CAT Strategy (AIR 1 Mindset):
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {renderMathText(question.explanation.whyThisHelpsInNIMCET)}
                    </p>
                  </div>
                )}
                {question.explanation.tips && question.explanation.tips.length > 0 && (
                  <div style={{color:'var(--color-warning)'}}>
                    <strong><FiZap/> Tips:</strong>
                    <ul>
                      {question.explanation.tips.map((tip, idx) => <li key={idx}>{renderMathText(tip)}</li>)}
                    </ul>
                  </div>
                )}
                {question.explanation.commonMistakes && question.explanation.commonMistakes.length > 0 && (
                  <div style={{color:'var(--color-danger)'}}>
                    <strong><FiAlertTriangle/> Common Mistakes:</strong>
                    <ul>
                      {question.explanation.commonMistakes.map((mistake, idx) => <li key={idx}>{renderMathText(mistake)}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className={styles.aiSection}>
            <button className={styles.aiBtn} onClick={handleAiExplain} disabled={isAiExplaining || !!aiExplanation}>
              <FiMessageSquare /> Explain with AI 🤖
            </button>
            {isAiExplaining && <p className={styles.aiLoading}>AI is analyzing the question...</p>}
            {aiExplanation && (
              <div className={styles.aiBubble}>
                {renderMathText(aiExplanation)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
