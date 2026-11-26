import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../../components/Question/QuestionCard';
import { FiLoader, FiBookOpen } from 'react-icons/fi';
import { 
  getQuestionsByTopic, 
  getQuestionsByChapter, 
  getQuestionsBySubject,
  getAvailableYears,
  getSubjects,
  getChaptersBySubject,
  getTopicsByChapter,
  getCatQuestions,
  getUserAnswers
} from '../../services/api';
import styles from './PracticePage.module.css';

const SUBJECT_ALIAS_TO_NAME = {
  sub_math: 'Mathematics',
  sub_analytical: 'Analytical Ability & Logical Reasoning',
  sub_computer: 'Computer Awareness',
  sub_english: 'General English',
  '6ac3cf03802e37c9c45fc2f4': 'Mathematics',
  '6ac3cf03802e37c9c45fc2f6': 'Analytical Ability & Logical Reasoning',
  '6ac3cf03802e37c9c45fc2f8': 'Computer Awareness',
  '6ac3cf03802e37c9c45fc2fa': 'General English'
};

const CHAPTER_ID_TO_NAME = {
  '6ac3cf04802e37c9c45fc2fc': 'Set Theory & Relations',
  '6ac3cf04802e37c9c45fc2fe': 'Functions',
  '6ac3cf04802e37c9c45fc300': 'Trigonometry',
  '6ac3cf04802e37c9c45fc302': 'Algebra (Quadratic Equations, Complex Numbers)',
  '6ac3cf04802e37c9c45fc304': 'Matrices & Determinants',
  '6ac3cf04802e37c9c45fc306': 'Sequences & Series (AP, GP, HP)',
  '6ac3cf04802e37c9c45fc308': 'Differential Calculus (Limits, Continuity, Derivatives)',
  '6ac3cf04802e37c9c45fc30a': 'Integral Calculus',
  '6ac3cf04802e37c9c45fc30c': 'Differential Equations',
  '6ac3cf04802e37c9c45fc30e': 'Probability & Statistics',
  '6ac3cf04802e37c9c45fc310': 'Linear Programming',
  '6ac3cf04802e37c9c45fc312': 'Coordinate Geometry (2D & 3D)',
  '6ac3cf04802e37c9c45fc314': 'Vectors',
  '6ac3cf04802e37c9c45fc316': 'Number System & Divisibility',
  ch_sub_math_1: 'Set Theory & Relations'
};

const DEFAULT_SUBJECTS = [
  { _id: 'sub_math', name: 'Mathematics', shortName: 'Mathematics' },
  { _id: 'sub_analytical', name: 'Analytical Ability & Logical Reasoning', shortName: 'Analytical' },
  { _id: 'sub_computer', name: 'Computer Awareness', shortName: 'Computer' },
  { _id: 'sub_english', name: 'General English', shortName: 'English' }
];

const PracticePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const topicId = searchParams.get('topicId');
  const rawChapterId = searchParams.get('chapterId');
  const rawSubjectId = searchParams.get('subjectId');

  const [subjectsList, setSubjectsList] = useState(DEFAULT_SUBJECTS);
  const [chapterList, setChapterList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableYears, setAvailableYears] = useState([2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]);
  const [userAnswersMap, setUserAnswersMap] = useState({});

  const [activeTab, setActiveTab] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [questionType, setQuestionType] = useState('All');

  const subjectId = rawSubjectId || (subjectsList[0]?._id || 'sub_math');
  const chapterId = rawChapterId || (chapterList[0]?._id || '');

  const [headerInfo, setHeaderInfo] = useState({
    subject: 'Mathematics',
    chapter: 'Set Theory & Relations',
    topic: 'All Topics'
  });

  // Fetch subjects list once and normalize subjectId against live backend IDs
  useEffect(() => {
    let isCurrent = true;
    const fetchSubs = async () => {
      try {
        const res = await getSubjects();
        const subs = res.data || [];
        if (!isCurrent || subs.length === 0) return;
        setSubjectsList(subs);

        if (!rawSubjectId || !subs.some(s => s._id === rawSubjectId)) {
          const targetName = SUBJECT_ALIAS_TO_NAME[rawSubjectId] || 'Mathematics';
          const matchedSub = subs.find(s => s.name.toLowerCase() === targetName.toLowerCase()) || subs[0];
          const params = new URLSearchParams();
          params.set('subjectId', matchedSub._id);
          if (rawChapterId) params.set('chapterId', rawChapterId);
          if (topicId) params.set('topicId', topicId);
          navigate(`/practice?${params.toString()}`, { replace: true });
        }
      } catch (err) {}
    };
    fetchSubs();
    return () => { isCurrent = false; };
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
        if (!isCurrent) return;
        const chs = res.data || [];
        setChapterList(chs);

        if (chs.length > 0 && (!chapterId || !chs.some(c => c._id === chapterId))) {
          const targetName = CHAPTER_ID_TO_NAME[chapterId];
          const matchedCh = targetName
            ? (chs.find(c => c.name.toLowerCase() === targetName.toLowerCase()) ||
               chs.find(c => c.name.toLowerCase().includes(targetName.toLowerCase())) ||
               chs[0])
            : chs[0];
          navigate(`/practice?chapterId=${matchedCh._id}&subjectId=${subjectId}`, { replace: true });
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
        subject: 'Analytical Ability',
        chapter: 'CAT DILR Masterclass',
        topic: selectedYear !== 'All' ? `CAT ${selectedYear}` : 'All Sets (2015–2024)'
      });
      return;
    }

    const curSubject = subjectsList.find(s => s._id === subjectId);
    const curChapter = chapterList.find(c => c._id === chapterId);
    const curTopic = topicList.find(t => t._id === topicId);

    setHeaderInfo({
      subject: curSubject ? curSubject.name : (SUBJECT_ALIAS_TO_NAME[subjectId] || 'Mathematics'),
      chapter: curChapter ? curChapter.name : (CHAPTER_ID_TO_NAME[chapterId] || 'All Chapters'),
      topic: curTopic ? curTopic.name : 'All Topics'
    });
  }, [subjectId, chapterId, topicId, subjectsList, chapterList, topicList, questionType, selectedYear]);

  // Fetch questions
  useEffect(() => {
    let isCurrent = true;
    const fetchQuestions = async () => {
      if (!chapterId && !subjectId && questionType !== 'cat') return;
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

  const currentSubjectObj = subjectsList.find(s => s._id === subjectId);
  const isAnalyticalSubject =
    subjectId === 'sub_analytical' ||
    subjectId === '6ac3cf03802e37c9c45fc2f6' ||
    (currentSubjectObj?.name || '').toLowerCase().includes('analytical');

  const handleSubjectSelect = (newSubId) => {
    const newSubObj = subjectsList.find(s => s._id === newSubId);
    const isNewAnalytical =
      newSubId === 'sub_analytical' ||
      newSubId === '6ac3cf03802e37c9c45fc2f6' ||
      (newSubObj?.name || '').toLowerCase().includes('analytical');
    if (!isNewAnalytical && questionType === 'cat') {
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

  const easyCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'easy').length;
  const modCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'moderate').length;
  const hardCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'hard').length;

  return (
    <div className={styles.practicePage}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span>{headerInfo.subject}</span>
          <span>/</span>
          <span>{headerInfo.chapter}</span>
          <span>/</span>
          <span className={styles.currentTopic}>{headerInfo.topic}</span>
        </div>

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
                <span>{sub.shortName || sub.name}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.selectorsBar}>
          <div className={styles.selectorItem}>
            <span className={styles.selectorLabel}>Chapter</span>
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
            <span className={styles.selectorLabel}>Topic</span>
            <select
              value={topicId || 'all'}
              onChange={(e) => handleTopicChange(e.target.value)}
              className={styles.selectInput}
            >
              <option value="all">All Topics</option>
              {topicList.map(t => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className={styles.filterBar}>
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
              Easy ({easyCount})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'Moderate' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('Moderate')}
              style={{ color: activeTab === 'Moderate' ? '#f59e0b' : undefined }}
            >
              Moderate ({modCount})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'Hard' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('Hard')}
              style={{ color: activeTab === 'Hard' ? '#ef4444' : undefined }}
            >
              Hard ({hardCount})
            </button>
          </div>

          <div className={styles.typeFilter}>
            <button 
              type="button"
              className={`${styles.typeBtn} ${questionType === 'All' ? styles.activeTypeBtn : ''}`}
              onClick={() => setQuestionType('All')}
            >
              All
            </button>
            <button 
              type="button"
              className={`${styles.typeBtn} ${questionType === 'pyq' ? styles.activeTypeBtn : ''}`}
              onClick={() => setQuestionType('pyq')}
              title="Official Previous Year Questions"
            >
              PYQs
            </button>
            <button 
              type="button"
              className={`${styles.typeBtn} ${questionType === 'practice' ? styles.activeTypeBtn : ''}`}
              onClick={() => setQuestionType('practice')}
              title="Foundational Concept Practice Drills"
            >
              Practice
            </button>
            {isAnalyticalSubject && (
              <button 
                type="button"
                className={`${styles.typeBtn} ${questionType === 'cat' ? `${styles.activeTypeBtn} ${styles.catActiveBtn}` : styles.catBtn}`}
                onClick={() => setQuestionType('cat')}
                title="CAT 10-Year Reasoning Questions"
              >
                CAT Sets
              </button>
            )}
          </div>

          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className={styles.yearSelect}
          >
            <option value="All">{questionType === 'cat' ? 'All CAT Years' : 'All Years'}</option>
            {availableYears.map(y => (
              <option key={y} value={y}>{questionType === 'cat' ? `CAT ${y}` : `${y}`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.questionsList}>
        {loading ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'48px', color:'var(--text-secondary)', gap:'0.75rem', fontSize:'0.875rem' }}>
            <FiLoader className="spin" size={24} color="var(--color-primary)" />
            <p>Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div style={{ textAlign:'center', padding:'48px', color:'var(--text-secondary)', background:'var(--card-bg)', borderRadius:'10px', border:'1px solid var(--border-color)', fontSize:'0.875rem' }}>
            <FiBookOpen size={28} style={{ opacity: 0.4, marginBottom: '0.6rem' }} />
            <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>No questions found for this filter</p>
            <p style={{ marginTop: '0.35rem', fontSize: '0.82rem' }}>Try switching to "All" difficulty or selecting another chapter.</p>
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
