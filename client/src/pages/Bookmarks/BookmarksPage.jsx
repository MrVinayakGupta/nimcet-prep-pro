import React, { useState, useEffect } from 'react';
import QuestionCard from '../../components/Question/QuestionCard';
import { FiGrid, FiList, FiBookmark, FiLoader } from 'react-icons/fi';
import { getBookmarks } from '../../services/api';
import styles from './BookmarksPage.module.css';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [filter, setFilter] = useState('All');

  const subjects = ['All', 'Mathematics', 'Analytical Ability & Logical Reasoning', 'Computer Awareness', 'General English'];

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const res = await getBookmarks();
      setBookmarks(res.data || []);
    } catch (err) {
      // Unauthenticated or empty
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const filteredBookmarks = bookmarks.filter(q => {
    if (filter === 'All') return true;
    const subName = q.subjectId?.name || '';
    return subName.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Saved Bookmarks</h1>
          <p>Review difficult problems and important revision questions</p>
        </div>
        
        <div className={styles.controls}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
          
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <FiGrid />
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <FiLoader className="spin" size={32} />
        </div>
      ) : filteredBookmarks.length === 0 ? (
        <div className={styles.emptyState}>
          <FiBookmark size={48} style={{ opacity: 0.4, marginBottom: '1rem' }} />
          <h3>No bookmarked questions yet</h3>
          <p>Click the bookmark icon on any question while practicing to save it for quick revision here.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? styles.gridView : styles.listView}>
          {filteredBookmarks.map((q, idx) => (
            <QuestionCard 
              key={q._id} 
              question={q} 
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
