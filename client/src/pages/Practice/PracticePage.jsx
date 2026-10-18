import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../../components/Question/QuestionCard';
import { FiFilter, FiLoader, FiLayers, FiBookOpen, FiClock, FiCheckCircle } from 'react-icons/fi';
import { 
  getQuestionsByTopic, 
  getQuestionsByChapter, 
  getQuestionsBySubject,
  getTopicById, 
  getChapterById, 
  getAvailableYears,
  getSubjects,
  getChaptersBySubject,
  getTopicsByChapter,
  getCatQuestions,
  getUserAnswers
} from '../../services/api';
import styles from './PracticePage.module.css';

const DEFAULT_SUBJECTS = [
  { _id: 'sub_math', name: 'Mathematics', icon: '📐', shortName: 'Math (600M)' },
  { _id: 'sub_analytical', name: 'Analytical Ability & Logical Reasoning', icon: '🧩', shortName: 'Analytical (240M)' },
  { _id: 'sub_computer', name: 'Computer Awareness', icon: '💻', shortName: 'Computer (80M)' },
  { _id: 'sub_english', name: 'General English', icon: '📝', shortName: 'English (80M)' }
];

const PracticePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const topicId = searchParams.get('topicId');
  const chapterId = searchParams.get('chapterId') || 'ch_sub_math_1';
  const subjectId = searchParams.get('subjectId') || 'sub_math';

  const [subjectsList, setSubjectsList] = useState(DEFAULT_SUBJECTS);
  const [chapterList, setChapterList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableYears, setAvailableYears] = useState([2026, 2025, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007]);
  const [userAnswersMap, setUserAnswersMap] = useState({});

  // Filters
  const [activeTab, setActiveTab] = useState('All'); // All, Easy, Moderate, Hard
  const [selectedYear, setSelectedYear] = useState('All');
  const [questionType, setQuestionType] = useState('All'); // All, pyq, practice

  const [headerInfo, setHeaderInfo] = useState({
    subject: 'Mathematics',
    chapter: 'Set Theory & Relations',
    topic: 'All Chapter Topics'
  });

  // Fetch subjects list once
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await getSubjects();
        if (res.data && res.data.length > 0) {
          setSubjectsList(res.data);
        }
      } catch (err) {}
    };
    fetchSubs();
  }, []);

  // Fetch available years once
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await getAvailableYears();
        if (res.data && res.data.length > 0) {
          setAvailableYears(res.data);
        }
      } catch (e) {}
    };
    fetchYears();
  }, []);

  // Fetch logged-in user's previously answered questions
  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const res = await getUserAnswers();
        if (res.data && typeof res.data === 'object') {
          setUserAnswersMap(res.data);
        }
      } catch (e) {}
    };
    fetchUserAnswers();
  }, []);

  // Fetch chapters whenever subjectId changes
  useEffect(() => {
    let isCurrent = true;
    const fetchChapters = async () => {
      try {
        const res = await getChaptersBySubject(subjectId);
        if (isCurrent) {
          const chs = res.data || [];
          setChapterList(chs);
          // If current chapterId does not belong to this subject, pick the first chapter
          if (chs.length > 0 && !chs.some(c => c._id === chapterId)) {
            navigate(`/practice?chapterId=${chs[0]._id}&subjectId=${subjectId}`, { replace: true });
          }
        }
      } catch (e) {}
    };
    if (subjectId) fetchChapters();
    return () => { isCurrent = false; };
  }, [subjectId]);

  // Fetch topics whenever chapterId changes
  useEffect(() => {
    let isCurrent = true;
    const fetchTopics = async () => {
      try {
        const res = await getTopicsByChapter(chapterId);
        if (isCurrent) {
          setTopicList(res.data || []);
        }
      } catch (e) {}
    };
    if (chapterId) fetchTopics();
    return () => { isCurrent = false; };
  }, [chapterId]);

  // Update Breadcrumb & Header info
  useEffect(() => {
    if (questionType === 'cat') {
      setHeaderInfo({
        subject: 'Analytical Ability (CAT Tier)',
        chapter: 'CAT Advanced DILR Masterclass (2015-2024)',
        topic: selectedYear !== 'All' ? `CAT ${selectedYear} Logical Reasoning Problems` : 'All 10-Year CAT DILR Sets (2015-2024)'
      });
      return;
    }

    const curSubject = subjectsList.find(s => s._id === subjectId);
    const curChapter = chapterList.find(c => c._id === chapterId);
    const curTopic = topicList.find(t => t._id === topicId);

    setHeaderInfo({
      subject: curSubject ? curSubject.name : (subjectId === 'sub_math' ? 'Mathematics' : 'Subject'),
      chapter: curChapter ? curChapter.name : 'All Chapters',
      topic: curTopic ? curTopic.name : 'All Topics in this Chapter'
    });
  }, [subjectId, chapterId, topicId, subjectsList, chapterList, topicList, questionType, selectedYear]);

  // Fetch questions
  useEffect(() => {
    let isCurrent = true;
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeTab !== 'All') {
          params.difficulty = activeTab.toLowerCase();
        }
        if (selectedYear !== 'All') {
          params.year = selectedYear;
        }
        if (questionType === 'pyq') {
          params.type = 'pyq';
        } else if (questionType === 'practice') {
          params.type = 'practice';
        } else if (questionType === 'cat') {
          params.type = 'cat';
        }

        let res;
        if (questionType === 'cat') {
          res = await getCatQuestions(params);
        } else if (topicId && topicId !== 'all') {
          res = await getQuestionsByTopic(topicId, params);
        } else if (chapterId) {
          res = await getQuestionsByChapter(chapterId, params);
        } else if (subjectId) {
          res = await getQuestionsBySubject(subjectId, params);
        }

        if (isCurrent) {
          setQuestions(res?.data || []);
        }
      } catch (e) {
        if (isCurrent) setQuestions([]);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchQuestions();
    return () => { isCurrent = false; };
  }, [topicId, chapterId, subjectId, activeTab, selectedYear, questionType]);

  // Navigation handlers
  const handleSubjectSelect = (newSubId) => {
    if (newSubId !== 'sub_analytical' && questionType === 'cat') {
      setQuestionType('All');
    }
    navigate(`/practice?subjectId=${newSubId}`);
  };

  const handleChapterChange = (newChId) => {
    navigate(`/practice?chapterId=${newChId}&subjectId=${subjectId}`);
  };

  const handleTopicChange = (newTopId) => {
    if (newTopId === 'all') {
      navigate(`/practice?chapterId=${chapterId}&subjectId=${subjectId}`);
    } else {
      navigate(`/practice?topicId=${newTopId}&chapterId=${chapterId}&subjectId=${subjectId}`);
    }
  };

  // Difficulty counts
  const easyCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'easy').length;
  const modCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'moderate').length;
  const hardCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'hard').length;
  const pyqCount = questions.filter(q => q.isFromPreviousYear && q.examSource !== 'CAT').length;
  const practiceCount = questions.filter(q => !q.isFromPreviousYear && q.examSource !== 'CAT').length;
  const catCount = questions.filter(q => q.examSource === 'CAT' || (q.tags && q.tags.includes('cat-reasoning'))).length;

  return (
    <div className={styles.practicePage}>
      <div className={styles.header}>
        {/* Dynamic Breadcrumb */}
        <div className={styles.breadcrumb}>
          <span>{headerInfo.subject}</span>
          <span>/</span>
          <span>{headerInfo.chapter}</span>
          <span>/</span>
          <span className={styles.currentTopic}>{headerInfo.topic}</span>
        </div>

        {/* 1. Subject Pills (Switch between Math, Analytical, Computer, English instantly) */}
        <div className={styles.subjectBar}>
          {subjectsList.map(sub => {
            const isSelected = sub._id === subjectId;
            return (
              <button
                key={sub._id}
                type="button"
                className={`${styles.subjectPill} ${isSelected ? styles.activeSubjectPill : ''}`}
                onClick={() => handleSubjectSelect(sub._id)}
              >
                <span>{sub.icon}</span>
                <span>{sub.shortName || sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Fast Chapter & Topic Selectors Bar */}
        <div className={styles.selectorsBar}>
          <div className={styles.selectorItem}>
            <span className={styles.selectorLabel}>Chapter:</span>
            <select
              value={chapterId}
              onChange={(e) => handleChapterChange(e.target.value)}
              className={styles.selectInput}
            >
              {chapterList.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.selectorItem}>
            <span className={styles.selectorLabel}>Topic:</span>
            <select
              value={topicId || 'all'}
              onChange={(e) => handleTopicChange(e.target.value)}
              className={styles.selectInput}
            >
              <option value="all">⚡ All Topics in this Chapter</option>
              {topicList.map(t => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* 3. Filter Bar (Difficulty, PYQ/Practice, and 10 Years selector) */}
        <div className={styles.filterBar}>
          {/* Difficulty tabs */}
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'All' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('All')}
            >
              All ({questions.length})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'Easy' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('Easy')}
              style={{ color: activeTab === 'Easy' ? '#10b981' : undefined }}
            >
              🟢 Easy ({easyCount})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'Moderate' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('Moderate')}
              style={{ color: activeTab === 'Moderate' ? '#f59e0b' : undefined }}
            >
              🟡 Moderate ({modCount})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'Hard' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('Hard')}
              style={{ color: activeTab === 'Hard' ? '#ef4444' : undefined }}
            >
              🔴 Hard ({hardCount})
            </button>
          </div>

          {/* Question Type: PYQs vs Practice vs CAT 10-Yr Reasoning */}
          <div className={styles.typeFilter}>
            <button 
              type="button"
              className={`${styles.typeBtn} ${questionType === 'All' ? styles.activeTypeBtn : ''}`}
              onClick={() => setQuestionType('All')}
            >
              All Types
            </button>
            <button 
              type="button"
              className={`${styles.typeBtn} ${questionType === 'pyq' ? styles.activeTypeBtn : ''}`}
              onClick={() => setQuestionType('pyq')}
              title="Official Previous Year Questions"
            >
              🔥 10-Yr NIMCET PYQs
            </button>
            <button 
              type="button"
              className={`${styles.typeBtn} ${questionType === 'practice' ? styles.activeTypeBtn : ''}`}
              onClick={() => setQuestionType('practice')}
              title="Foundational Concept Practice Drills"
            >
              💡 Practice
            </button>
            {subjectId === 'sub_analytical' && (
              <button 
                type="button"
                className={`${styles.typeBtn} ${questionType === 'cat' ? `${styles.activeTypeBtn} ${styles.catActiveBtn}` : styles.catBtn}`}
                onClick={() => setQuestionType('cat')}
                title="CAT 10-Year Reasoning Questions (2015-2026) - Master high-difficulty analytical sets!"
              >
                🦁 CAT 10-Yr Reasoning
              </button>
            )}
          </div>

          {/* 10-12 Years Filter */}
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className={styles.yearSelect}
          >
            <option value="All">{questionType === 'cat' ? 'All CAT Years (2015-2026)' : 'All Years (2015-2026)'}</option>
            {availableYears.map(y => (
              <option key={y} value={y}>{questionType === 'cat' ? `CAT ${y} DILR` : `NIMCET ${y}`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CAT Accelerator Banner */}
      {questionType === 'cat' && (
        <div className={styles.catBanner}>
          <div className={styles.catBannerBadge}>AIR 1 ACCELERATOR</div>
          <h3 className={styles.catBannerTitle}>🦁 CAT 10-Year Reasoning Masterclass (2015–2024)</h3>
          <p className={styles.catBannerDesc}>
            CAT DILR sets (Matrix puzzles, Round-Robin tournaments, Knights & Knaves binary logic, 4-set Venn minima) 
            are intentionally harder than standard NIMCET questions. By training on these high-caliber logical problems, you develop 
            instinctive structural thinking, making actual NIMCET questions feel effortless and solvable in record time!
          </p>
        </div>
      )}

      {/* 4. Questions List */}
      <div className={styles.questionsList}>
        {loading ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px', color:'var(--text-secondary)', gap:'1rem' }}>
            <FiLoader className="spin" size={36} color="var(--color-primary)" />
            <p>Loading questions and line-by-line solutions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px', color:'var(--text-secondary)', background:'var(--card-bg)', borderRadius:'12px', border:'1px solid var(--border-color)' }}>
            <FiBookOpen size={42} style={{ opacity: 0.5, marginBottom: '0.75rem' }} />
            <h3>No questions found for the selected filter combination</h3>
            <p style={{ marginTop: '0.5rem' }}>Try switching to "All" difficulty, "All Types", or selecting another topic.</p>
          </div>
        ) : (
          questions.map((q, idx) => (
            <QuestionCard 
              key={q._id || idx} 
              question={q} 
              index={idx}
              initialAnswer={userAnswersMap[q._id]}
              onAnswerSubmitted={(qId, data) => setUserAnswersMap(prev => ({ ...prev, [qId]: data }))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PracticePage;
