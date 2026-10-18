import React, { useEffect, useState } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiChevronDown, FiChevronRight, FiSearch, FiBook, FiCpu, FiGlobe, FiPieChart, FiLoader, FiLayers } from 'react-icons/fi';
import { getSubjects, getChaptersBySubject, getTopicsByChapter } from '../../services/api';
import styles from './Sidebar.module.css';

const iconMap = {
  '📐': <FiPieChart />,
  '🧩': <FiCpu />,
  '💻': <FiGlobe />,
  '📝': <FiBook />,
};

const Sidebar = () => {
  const { 
    isOpen, 
    expandedSubjects, toggleSubject,
    expandedChapters, toggleChapter,
    selectedTopicId, setSelectedTopicId,
    selectedChapterId, setSelectedChapterId,
    setSelectedSubjectId
  } = useSidebar();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [subjects, setSubjects] = useState([]);
  const [chaptersCache, setChaptersCache] = useState({});
  const [topicsCache, setTopicsCache] = useState({});
  
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState({});
  const [loadingTopics, setLoadingTopics] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load: Fetch subjects and auto-expand Mathematics (sub_math) & Chapter 1
  useEffect(() => {
    const initSidebar = async () => {
      try {
        const res = await getSubjects();
        const subs = res.data || [];
        setSubjects(subs);

        // Auto-expand Mathematics by default
        const mathSub = subs.find(s => s._id === 'sub_math') || subs[0];
        if (mathSub) {
          if (!expandedSubjects[mathSub._id]) {
            toggleSubject(mathSub._id);
          }
          // Fetch chapters for Mathematics immediately
          setLoadingChapters(prev => ({ ...prev, [mathSub._id]: true }));
          const chRes = await getChaptersBySubject(mathSub._id);
          const chList = chRes.data || [];
          setChaptersCache(prev => ({ ...prev, [mathSub._id]: chList }));
          setLoadingChapters(prev => ({ ...prev, [mathSub._id]: false }));

          // Auto-expand Chapter 1
          if (chList.length > 0) {
            const firstCh = chList[0];
            if (!expandedChapters[firstCh._id]) {
              toggleChapter(firstCh._id);
            }
            setLoadingTopics(prev => ({ ...prev, [firstCh._id]: true }));
            const topRes = await getTopicsByChapter(firstCh._id);
            setTopicsCache(prev => ({ ...prev, [firstCh._id]: topRes.data || [] }));
            setLoadingTopics(prev => ({ ...prev, [firstCh._id]: false }));
          }
        }
      } catch (err) {
        console.error("Error initializing sidebar", err);
      } finally {
        setLoadingSubjects(false);
      }
    };
    initSidebar();
  }, []);

  const handleSubjectClick = async (subjectId) => {
    toggleSubject(subjectId);
    if (!chaptersCache[subjectId]) {
      setLoadingChapters(prev => ({ ...prev, [subjectId]: true }));
      try {
        const res = await getChaptersBySubject(subjectId);
        setChaptersCache(prev => ({ ...prev, [subjectId]: res.data || [] }));
      } catch (err) {
        console.error("Error fetching chapters", err);
      } finally {
        setLoadingChapters(prev => ({ ...prev, [subjectId]: false }));
      }
    }
  };

  const handleChapterClick = async (chapterId, subjectId) => {
    toggleChapter(chapterId);
    setSelectedChapterId(chapterId);
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(null);
    navigate(`/practice?chapterId=${chapterId}&subjectId=${subjectId}`);

    if (!topicsCache[chapterId]) {
      setLoadingTopics(prev => ({ ...prev, [chapterId]: true }));
      try {
        const res = await getTopicsByChapter(chapterId);
        setTopicsCache(prev => ({ ...prev, [chapterId]: res.data || [] }));
      } catch (err) {
        console.error("Error fetching topics", err);
      } finally {
        setLoadingTopics(prev => ({ ...prev, [chapterId]: false }));
      }
    }
  };

  const handleViewAllChapter = (chapterId, subjectId) => {
    setSelectedChapterId(chapterId);
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(null);
    navigate(`/practice?chapterId=${chapterId}&subjectId=${subjectId}`);
  };

  const handleTopicClick = (topic, chapterId, subjectId) => {
    setSelectedTopicId(topic._id);
    setSelectedChapterId(chapterId);
    setSelectedSubjectId(subjectId);
    navigate(`/practice?topicId=${topic._id}&chapterId=${chapterId}&subjectId=${subjectId}`);
  };

  // Sync selected IDs from URL query params
  useEffect(() => {
    const tId = searchParams.get('topicId');
    const cId = searchParams.get('chapterId');
    if (tId && tId !== selectedTopicId) setSelectedTopicId(tId);
    if (cId && cId !== selectedChapterId) setSelectedChapterId(cId);
  }, [searchParams]);

  if (!isOpen) return null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search chapters & topics..." 
          className={styles.searchInput} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ padding: '0 1rem 0.75rem 1rem' }}>
        <button
          onClick={() => navigate('/roadmap')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%)',
            border: '1px solid rgba(79, 70, 229, 0.3)',
            color: 'var(--color-primary)',
            padding: '0.6rem 0.8rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease'
          }}
        >
          <span>🔥 45-Day Math Roadmap</span>
          <span style={{ fontSize: '0.75rem', background: 'var(--color-primary)', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>AIR 1</span>
        </button>
      </div>

      <div className={styles.syllabusTree}>
        {loadingSubjects ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
             <FiLoader className="spin" size={24} />
          </div>
        ) : (
          subjects.map(subject => {
            const isExpanded = !!expandedSubjects[subject._id];
            const chapters = chaptersCache[subject._id] || [];
            
            // Check if search matches subject
            const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              <div key={subject._id} className={styles.subject}>
                <div 
                  className={styles.subjectHeader} 
                  onClick={() => handleSubjectClick(subject._id)}
                  style={{ borderLeftColor: subject.color || 'var(--color-primary)' }}
                >
                  <div className={styles.subjectTitle}>
                    <span className={styles.icon} style={{ color: subject.color || 'var(--color-primary)', fontSize: '1.1rem' }}>
                      {iconMap[subject.icon] || subject.icon || <FiBook />}
                    </span>
                    <span>{subject.name}</span>
                  </div>
                  {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                </div>

                {isExpanded && (
                  <div className={styles.chapters}>
                    {loadingChapters[subject._id] ? (
                       <div style={{ padding: '0.75rem 1.5rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                         <FiLoader className="spin" size={16} /> Loading chapters...
                       </div>
                    ) : (
                      chapters.map(chapter => {
                        const isChExpanded = !!expandedChapters[chapter._id];
                        const topics = topicsCache[chapter._id] || [];
                        const isChapterActive = selectedChapterId === chapter._id && !selectedTopicId;

                        return (
                          <div key={chapter._id} className={styles.chapter}>
                            <div 
                              className={`${styles.chapterHeader} ${isChapterActive ? styles.activeChapter : ''}`}
                              onClick={() => handleChapterClick(chapter._id, subject._id)}
                              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                              <span style={{ flex: 1, paddingRight: '4px' }}>{chapter.name}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewAllChapter(chapter._id, subject._id);
                                  }}
                                  title="View all questions for this chapter"
                                  style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    background: isChapterActive ? 'var(--color-primary)' : 'rgba(99, 102, 241, 0.1)',
                                    color: isChapterActive ? '#fff' : 'var(--color-primary)',
                                    fontWeight: 500
                                  }}
                                >
                                  All
                                </button>
                                {isChExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                              </div>
                            </div>

                            {isChExpanded && (
                              <div className={styles.topics}>
                                {loadingTopics[chapter._id] ? (
                                  <div style={{ padding: '0.5rem 1.5rem', color: 'var(--text-secondary)' }}>
                                    <FiLoader className="spin" size={14} /> Loading topics...
                                  </div>
                                ) : (
                                  topics.map(topic => {
                                    const isTopicActive = selectedTopicId === topic._id;
                                    return (
                                      <div 
                                        key={topic._id} 
                                        className={`${styles.topic} ${isTopicActive ? styles.activeTopic : ''}`}
                                        onClick={() => handleTopicClick(topic, chapter._id, subject._id)}
                                      >
                                        <span style={{ flex: 1 }}>{topic.name}</span>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
