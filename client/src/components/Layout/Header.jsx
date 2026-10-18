import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { FiSun, FiMoon, FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebar();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar} aria-label="Toggle Syllabus Sidebar">
          <FiMenu size={24} />
        </button>
        <Link to="/" className={styles.logo}>
          <span className={styles.gradientText}>NIMCET Prep Pro</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
        <Link to="/roadmap" className={styles.navLink} style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
          🔥 45-Day Math Roadmap
        </Link>
        <Link to="/practice" className={styles.navLink}>Practice</Link>
        <Link to="/mock-test" className={styles.navLink}>Mock Tests</Link>
        <Link to="/year-papers" className={styles.navLink}>Year Papers</Link>
        <Link to="/bookmarks" className={styles.navLink}>Bookmarks</Link>
      </nav>

      <div className={styles.right}>
        <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {user ? (
          <div className={styles.userMenu}>
            <Link to="/profile" className={styles.profileBadge} title="Click to open your Profile">
              {user.avatar && user.avatar.startsWith('http') ? (
                <img src={user.avatar} alt={user.name} className={styles.avatarImg} />
              ) : (
                <div className={styles.avatar}>
                  {(user.name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <div className={styles.userTextInfo}>
                <span className={styles.userName}>{user.name || 'Student'}</span>
                <span className={styles.userTag}>{user.aimRank || 'AIR 1'} Aspirant</span>
              </div>
            </Link>
            <button onClick={logout} className={styles.logoutBtn} title="Logout">
              <FiLogOut size={19} />
            </button>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.loginBtn}>Log In</Link>
            <Link to="/register" className={styles.registerBtn}>Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
