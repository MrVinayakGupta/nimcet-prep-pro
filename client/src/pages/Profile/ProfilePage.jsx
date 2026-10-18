import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FiEdit2, 
  FiAward, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiClock, 
  FiCalendar, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiBook, 
  FiTarget, 
  FiSave, 
  FiX 
} from 'react-icons/fi';
import { getDashboardStats, getMockTestHistory, updateProfile, getProfile } from '../../services/api';
import styles from './ProfilePage.module.css';

const NIT_OPTIONS = [
  'NIT Trichy (Dream Tier #1)',
  'NIT Surathkal (Karnataka)',
  'NIT Warangal (Telangana)',
  'NIT Allahabad (MNNIT)',
  'NIT Calicut (Kerala)',
  'NIT Bhopal (MANIT)',
  'NIT Jamshedpur (Jharkhand)',
  'NIT Kurukshetra (Haryana)',
  'NIT Raipur (Chhattisgarh)',
  'NIT Agartala (Tripura)'
];

const MATH_LEVELS = [
  'Basic / Weak (Building Fundamentals from Scratch)',
  'Intermediate (Practicing Formulas & Accuracy)',
  'Advanced (Speed & Calculus Mastery)',
  'AIR 1 Elite (CAT DILR & Speed Problem Solving)'
];

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState(null);
  const [testHistory, setTestHistory] = useState([]);
  const [message, setMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    targetYear: '2025',
    targetNit: 'NIT Trichy (Dream Tier #1)',
    mathLevel: 'Basic / Weak (Building Fundamentals from Scratch)',
    aimRank: 'AIR 1',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        college: user.college || '',
        targetYear: user.targetYear || '2025',
        targetNit: user.targetNit || 'NIT Trichy (Dream Tier #1)',
        mathLevel: user.mathLevel || 'Basic / Weak (Building Fundamentals from Scratch)',
        aimRank: user.aimRank || 'AIR 1',
        bio: user.bio || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [statsRes, historyRes, profileRes] = await Promise.all([
          getDashboardStats().catch(() => ({ data: null })),
          getMockTestHistory().catch(() => ({ data: null })),
          getProfile().catch(() => ({ data: null }))
        ]);

        if (statsRes?.data) {
          setStats(statsRes.data);
        }
        if (historyRes?.data && Array.isArray(historyRes.data)) {
          setTestHistory(historyRes.data);
        }
        if (profileRes?.data) {
          const u = profileRes.data.user || profileRes.data;
          setFormData(prev => ({
            ...prev,
            name: u.name || prev.name,
            email: u.email || prev.email,
            phone: u.phone || prev.phone,
            college: u.college || prev.college,
            targetYear: u.targetYear || prev.targetYear,
            targetNit: u.targetNit || prev.targetNit,
            mathLevel: u.mathLevel || prev.mathLevel,
            aimRank: u.aimRank || prev.aimRank,
            bio: u.bio || prev.bio
          }));
        }
      } catch (err) {
        console.error("Error loading profile stats:", err);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setSaving(true);
    setMessage('');

    try {
      const res = await updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        college: formData.college.trim(),
        targetYear: formData.targetYear,
        targetNit: formData.targetNit,
        mathLevel: formData.mathLevel,
        aimRank: formData.aimRank,
        bio: formData.bio.trim()
      });
      const updatedUser = res.data.user || res.data;
      login(updatedUser, localStorage.getItem('token'));
      setIsEditing(false);
      setMessage('Profile updated successfully! ✨');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error("Failed to update profile", err);
      setMessage('Failed to save profile changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const totalQuestions = stats?.totalQuestions || 0;
  const accuracy = stats?.accuracy || 0;
  const testsCount = testHistory.length;

  return (
    <div className={styles.container}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        {user?.avatar && user.avatar.startsWith('http') ? (
          <img src={user.avatar} alt={formData.name} className={styles.avatarLargeImg} />
        ) : (
          <div className={styles.avatarLarge}>
            {(formData.name || 'S').charAt(0).toUpperCase()}
          </div>
        )}

        <div className={styles.userInfo}>
          <div className={styles.nameDisplay}>
            <h1>{formData.name || 'Student'}</h1>
            <span className={styles.rankBadge}>{formData.aimRank || 'AIR 1'} Aspirant</span>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className={styles.editBtn} title="Edit Profile Details">
                <FiEdit2 /> Edit Details
              </button>
            )}
          </div>
          <p className={styles.email}>
            <FiMail style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            {formData.email || 'student@nimcet.com'}
          </p>
          {formData.targetNit && (
            <p className={styles.targetNitText}>
              <FiTarget style={{ verticalAlign: 'middle', marginRight: '6px', color: '#f59e0b' }} />
              Target: <strong>{formData.targetNit} ({formData.targetYear})</strong>
            </p>
          )}
          {message && <div className={styles.successMsg}>{message}</div>}
        </div>
      </div>

      {/* Editable Student Details Card */}
      <div className={styles.detailsCard}>
        <div className={styles.cardHeaderWithAction}>
          <h3><FiUser /> Student Academic & Target Profile</h3>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className={styles.secondaryBtn}>
              <FiEdit2 /> Edit Details
            </button>
          ) : (
            <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
              <FiX /> Cancel
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className={styles.fullEditForm}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="e.g. +91 9876543210" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Current College / Degree</label>
                <input 
                  type="text" 
                  name="college" 
                  value={formData.college} 
                  onChange={handleChange} 
                  placeholder="e.g. BCA, B.Sc Computer Science" 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Target NIMCET Year</label>
                <select name="targetYear" value={formData.targetYear} onChange={handleChange}>
                  <option value="2026">NIMCET 2026</option>
                  <option value="2027">NIMCET 2027</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Dream NIT Destination</label>
                <select name="targetNit" value={formData.targetNit} onChange={handleChange}>
                  {NIT_OPTIONS.map(nit => (
                    <option key={nit} value={nit}>{nit}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Math Foundation Level</label>
                <select name="mathLevel" value={formData.mathLevel} onChange={handleChange}>
                  {MATH_LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Goal Rank</label>
                <input 
                  type="text" 
                  name="aimRank" 
                  value={formData.aimRank} 
                  onChange={handleChange} 
                  placeholder="e.g. AIR 1" 
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label>Personal Study Strategy / Notes</label>
                <textarea 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange} 
                  placeholder="e.g. Master weak calculus fundamentals line-by-line and practice 10-Yr CAT reasoning sets for speed..."
                  rows={3}
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn} disabled={saving}>
                <FiSave /> {saving ? 'Saving Changes...' : 'Save Profile Details'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.detailsDisplayGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Full Name</span>
              <span className={styles.detailValue}>{formData.name || 'Not specified'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{formData.email || 'Not specified'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone</span>
              <span className={styles.detailValue}>{formData.phone || 'Not provided'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>College / Degree</span>
              <span className={styles.detailValue}>{formData.college || 'BCA / B.Sc'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Target Exam</span>
              <span className={styles.detailValue}>NIMCET {formData.targetYear}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Dream NIT</span>
              <span className={styles.detailValue} style={{ color: '#f59e0b', fontWeight: 700 }}>
                {formData.targetNit}
              </span>
            </div>
            <div className={styles.detailItem} style={{ gridColumn: 'span 2' }}>
              <span className={styles.detailLabel}>Math Foundation Level</span>
              <span className={styles.detailValue}>{formData.mathLevel}</span>
            </div>
            {formData.bio && (
              <div className={styles.detailItem} style={{ gridColumn: 'span 2' }}>
                <span className={styles.detailLabel}>Study Strategy</span>
                <span className={styles.detailValue}>{formData.bio}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Live Preparation Overview & Milestones */}
      <div className={styles.grid}>
        <div className={styles.statsCard}>
          <h3><FiTrendingUp /> Live Preparation Overview</h3>
          <div className={styles.statList}>
            <div className={styles.statItem}>
              <span>Mock Tests Taken</span>
              <strong>{testsCount}</strong>
            </div>
            <div className={styles.statItem}>
              <span>Questions Solved</span>
              <strong>{totalQuestions}</strong>
            </div>
            <div className={styles.statItem}>
              <span>Overall Accuracy</span>
              <strong>{accuracy}%</strong>
            </div>
          </div>
        </div>

        <div className={styles.achievementsCard}>
          <h3><FiAward /> Earned Milestones</h3>
          <div className={styles.badges}>
            <div className={styles.badge} style={{ opacity: totalQuestions >= 1 ? 1 : 0.4 }}>
              <div className={styles.badgeIcon} style={{ background: '#F59E0B' }}>🚀</div>
              <span>First Step ({totalQuestions >= 1 ? 'Unlocked' : 'Solve 1 Q'})</span>
            </div>
            <div className={styles.badge} style={{ opacity: totalQuestions >= 25 ? 1 : 0.4 }}>
              <div className={styles.badgeIcon} style={{ background: '#10B981' }}>🔥</div>
              <span>Persistent ({totalQuestions >= 25 ? 'Unlocked' : '25 Questions'})</span>
            </div>
            <div className={styles.badge} style={{ opacity: accuracy >= 75 && totalQuestions >= 10 ? 1 : 0.4 }}>
              <div className={styles.badgeIcon} style={{ background: '#6366F1' }}>🏆</div>
              <span>AIR 1 Mindset ({accuracy >= 75 && totalQuestions >= 10 ? 'Unlocked' : '75% Accuracy'})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Test History Table */}
      <div className={styles.historySection}>
        <h3>Your Official Mock Test History</h3>
        {testHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--card-bg)', borderRadius: '10px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <p style={{ margin: '0 0 1rem' }}>No mock tests taken yet. Test your full exam speed and time management!</p>
            <a href="/mock-test" style={{
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              Launch Mock Test 🚀
            </a>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((test, idx) => (
                  <tr key={test.testId || idx}>
                    <td>Mock Test #{idx + 1}</td>
                    <td>{test.date ? new Date(test.date).toLocaleDateString() : 'Recent'}</td>
                    <td>{test.score} / {test.totalQuestions * 4}</td>
                    <td>{test.percentage || Math.round((test.score / (test.totalQuestions || 1)) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
