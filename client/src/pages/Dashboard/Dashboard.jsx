import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiTarget, FiClock, FiActivity, FiArrowRight, FiLoader, FiBookOpen, FiZap, FiAward } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  getDashboardStats, 
  getSubjectProgress, 
  getRecentActivity,
  getWeakAreas 
} from '../../services/api';
import styles from './Dashboard.module.css';

const defaultSubjects = [
  { _id: 'sub_math', name: 'Mathematics', progress: 0, attempted: 0, total: 160, accuracy: 0, color: 'var(--color-primary)' },
  { _id: 'sub_analytical', name: 'Analytical Ability', progress: 0, attempted: 0, total: 99, accuracy: 0, color: 'var(--color-warning)' },
  { _id: 'sub_computer', name: 'Computer Awareness', progress: 0, attempted: 0, total: 48, accuracy: 0, color: 'var(--color-success)' },
  { _id: 'sub_english', name: 'General English', progress: 0, attempted: 0, total: 48, accuracy: 0, color: '#EC4899' },
];

const defaultPerformanceData = [
  { name: 'Mon', accuracy: 0 },
  { name: 'Tue', accuracy: 0 },
  { name: 'Wed', accuracy: 0 },
  { name: 'Thu', accuracy: 0 },
  { name: 'Fri', accuracy: 0 },
  { name: 'Sat', accuracy: 0 },
  { name: 'Sun', accuracy: 0 },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState(null);
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [performanceData, setPerformanceData] = useState(defaultPerformanceData);
  const [recentActivity, setRecentActivity] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    const fetchDashboardData = async () => {
      try {
        const [statsRes, progressRes, activityRes, weakRes] = await Promise.all([
          getDashboardStats().catch(() => ({ data: null })),
          getSubjectProgress().catch(() => ({ data: null })),
          getRecentActivity().catch(() => ({ data: null })),
          getWeakAreas().catch(() => ({ data: null }))
        ]);
        
        if (!isCurrent) return;

        if (statsRes?.data) {
          setStats(statsRes.data);
          if (statsRes.data.performanceTrend && statsRes.data.performanceTrend.length > 0) {
            setPerformanceData(statsRes.data.performanceTrend);
          }
        }
        
        if (progressRes?.data && Array.isArray(progressRes.data)) {
          setSubjects(progressRes.data);
        }
        
        if (activityRes?.data && Array.isArray(activityRes.data)) {
          setRecentActivity(activityRes.data);
        }

        if (weakRes?.data && Array.isArray(weakRes.data)) {
          setWeakAreas(weakRes.data);
        }

      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchDashboardData();
    return () => { isCurrent = false; };
  }, [user]);

  // Read local answers as instant cache
  const localAnswers = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('nimcet_user_answers') || '{}');
    } catch (e) {
      return {};
    }
  }, []);

  const localAttempted = Object.keys(localAnswers).length;
  const localCorrect = Object.values(localAnswers).filter(a => a && a.isCorrect).length;

  const displayStats = useMemo(() => {
    const backendAttempted = stats?.totalQuestionsAttempted || stats?.totalQuestions || 0;
    const finalAttempted = Math.max(backendAttempted, localAttempted);
    const backendCorrect = stats?.totalQuestionsCorrect || 0;
    const finalCorrect = Math.max(backendCorrect, localCorrect);
    const finalAccuracy = finalAttempted > 0 
      ? Math.round((finalCorrect / finalAttempted) * 100) 
      : (stats?.accuracy || 0);

    return {
      totalQuestions: finalAttempted,
      totalQuestionsAttempted: finalAttempted,
      totalQuestionsCorrect: finalCorrect,
      accuracy: finalAccuracy,
      timeSpent: stats?.timeSpent || Math.round(finalAttempted * 2.5),
      currentStreak: finalAttempted > 0 ? 1 : 0
    };
  }, [stats, localAttempted, localCorrect]);

  const hasAttemptedQuestions = displayStats.totalQuestions > 0;

  if (loading) {
    return (
      <div className={styles.dashboard} style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <FiLoader className="spin" size={48} color="var(--color-primary)" />
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className={styles.subtitle}>
            {hasAttemptedQuestions 
              ? `You've solved ${displayStats.totalQuestions} questions with ${displayStats.accuracy}% accuracy. Keep aiming for AIR 1!`
              : "Ready to kickstart your NIMCET preparation with 10-year official papers?"
            }
          </p>
        </div>
        <div className={styles.actions}>
          <Link to="/practice" className={styles.btnPrimary}>
            Continue Practice
          </Link>
          <Link to="/mock-test" className={styles.btnSecondary}>
            Start Mock Test
          </Link>
        </div>
      </header>

      {/* Onboarding Banner for fresh user */}
      {!hasAttemptedQuestions && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(16, 185, 129, 0.08))',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ background: 'var(--color-primary)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
              FRESH ACCOUNT
            </span>
            <h3 style={{ margin: '0.35rem 0 0.2rem', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              Real-time Analytics Ready
            </h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Solve questions in the Practice Hub or CAT Masterclass to see your accuracy, subject mastery, and strengths update dynamically.
            </p>
          </div>
          <Link to="/practice" className={styles.btnPrimary} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Solve First Question <FiArrowRight />
          </Link>
        </div>
      )}

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)' }}>
            <FiCheckCircle size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Questions Attempted</h3>
            <p className={styles.statValue}>{displayStats.totalQuestions}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>
            <FiTarget size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Accuracy</h3>
            <p className={styles.statValue}>{displayStats.accuracy}%</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' }}>
            <FiClock size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Time Spent</h3>
            <p className={styles.statValue}>{displayStats.timeSpent}h</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}>
            <FiActivity size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Current Streak</h3>
            <p className={styles.statValue}>{displayStats.currentStreak} Days</p>
          </div>
        </div>
      </div>

      {/* Charts & Subject Progress */}
      <div className={styles.mainGrid}>
        <div className={styles.chartSection}>
          <h2 className={styles.sectionTitle}>Performance Trend (Past 7 Days)</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis domain={[0, 100]} stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.progressSection}>
          <h2 className={styles.sectionTitle}>Syllabus Progress (Dynamic)</h2>
          <div className={styles.progressList}>
            {subjects.map((subject, index) => (
              <div key={index} className={styles.progressItem}>
                <div className={styles.progressHeader}>
                  <span>{subject.name}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {subject.attempted || 0} / {subject.total || 0} solved ({subject.progress}%)
                  </span>
                </div>
                <div className={styles.progressBarBg}>
                  <div 
                    className={styles.progressBarFill} 
                    style={{ width: `${subject.progress}%`, backgroundColor: subject.color || 'var(--color-primary)' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dynamic Focus Areas */}
      <div className={styles.weakAreasSection}>
        <h2 className={styles.sectionTitle}>
          Focus Areas {weakAreas.length > 0 && <span className={styles.badge}>Needs Improvement</span>}
        </h2>
        <div className={styles.weakAreasGrid}>
          {weakAreas.length > 0 ? (
            weakAreas.map((activity, idx) => (
              <div key={idx} className={styles.weakCard}>
                <h4>{activity.topicName || activity.topic || 'Focus Topic'}</h4>
                <p>
                  {activity.subjectName ? `${activity.subjectName} • ` : ''}
                  {activity.accuracy !== undefined ? `Accuracy: ${activity.accuracy}%` : ''}
                  {activity.attempted ? ` (${activity.attempted} attempts)` : ''}
                  {activity.recommendedAction ? ` • ${activity.recommendedAction}` : ''}
                </p>
                <Link to={activity.topicId ? `/practice?topicId=${activity.topicId}` : '/practice'} className={styles.linkBtn}>
                  Practice Now <FiArrowRight />
                </Link>
              </div>
            ))
          ) : hasAttemptedQuestions ? (
            <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '10px', border: '1px solid var(--border-color)', width: '100%' }}>
              <h4 style={{ color: 'var(--color-success)', marginBottom: '0.35rem' }}>✨ Excellent Performance!</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                No persistent weak areas detected yet. Keep testing yourself with higher difficulty problems!
              </p>
            </div>
          ) : (
            <>
              <div className={styles.weakCard}>
                <h4>Set Theory & Functions</h4>
                <p>Mathematics • High Weightage (600M)</p>
                <Link to="/practice?chapterId=ch_sub_math_1" className={styles.linkBtn}>Start Here <FiArrowRight /></Link>
              </div>
              <div className={styles.weakCard}>
                <h4>CAT Advanced Puzzles</h4>
                <p>Analytical Ability • AIR 1 Speed Booster</p>
                <Link to="/practice?subjectId=sub_analytical" className={styles.linkBtn}>Practice Now <FiArrowRight /></Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dynamic Recent Activity Feed */}
      {recentActivity.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 className={styles.sectionTitle}>Your Recent Attempts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {recentActivity.slice(0, 5).map((act, idx) => (
              <div 
                key={act.id || idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--card-bg)',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>{act.title || act.topicName || act.topic || 'Practice Problem'}</strong>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>
                    {act.subjectName || act.topic || 'Practice'} • {act.selectedAnswer ? `Selected: ${act.selectedAnswer}` : 'Attempted'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: act.isCorrect || act.status === 'Correct' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: act.isCorrect || act.status === 'Correct' ? 'var(--color-success)' : 'var(--color-danger)'
                  }}>
                    {act.score !== undefined ? `${act.score > 0 ? '+' : ''}${act.score}` : (act.status || (act.isCorrect ? 'Correct' : 'Incorrect'))}
                  </span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {act.time || act.timeAgo || 'Recent'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CAT 10-Yr Reasoning Masterclass Accelerator */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.08))',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span style={{ background: '#f59e0b', color: '#1a1a1a', fontWeight: '800', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px' }}>AIR 1 SPECIAL ACCELERATOR</span>
          <h3 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1.15rem', color: 'var(--text-primary)' }}>🦁 CAT 10-Yr Reasoning Masterclass (2015–2024)</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Train on high-difficulty CAT DILR logic to solve NIMCET reasoning problems in 30 seconds with 100% accuracy.
          </p>
        </div>
        <Link 
          to="/practice?chapterId=ch_sub_analytical_11&subjectId=sub_analytical" 
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff',
            padding: '0.65rem 1.35rem',
            borderRadius: '8px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)'
          }}
        >
          Practice CAT Sets <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
