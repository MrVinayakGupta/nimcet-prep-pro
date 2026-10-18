import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerAPI, googleLoginAPI } from '../../services/api';
import styles from './Auth.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (pwd.length === 0) return { width: '0%', color: 'transparent', label: '' };
    if (pwd.length < 6) return { width: '33%', color: 'var(--color-danger)', label: 'Weak' };
    if (pwd.length < 10) return { width: '66%', color: 'var(--color-warning)', label: 'Medium' };
    return { width: '100%', color: 'var(--color-success)', label: 'Strong' };
  };

  const strength = getPasswordStrength();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await registerAPI(formData.name, formData.email, formData.password);
      const userData = response.data.user || response.data;
      const token = response.data.token;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      const googleEmail = prompt('Enter your Google Account email for Google Sign-Up:', formData.email || 'vinayak.nimcet@gmail.com');
      if (!googleEmail) {
        setLoading(false);
        return;
      }
      const rawName = (formData.name && formData.name.trim()) || googleEmail.split('@')[0].replace(/[._]/g, ' ');
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

      const response = await googleLoginAPI({
        email: googleEmail,
        name: formattedName,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(googleEmail)}`
      });
      const userData = response.data.user || response.data;
      const token = response.data.token;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.header}>
          <h2>Create Account</h2>
          <p>Join NIMCET Prep Pro today</p>
        </div>

        {error && <div className={styles.error} style={{color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.6rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.88rem', textAlign: 'center'}}>{error}</div>}

        <button 
          type="button" 
          onClick={handleGoogleSignup} 
          className={styles.googleBtn}
          disabled={loading}
          title="Fast 1-Click Sign-Up with Google"
        >
          <svg className={styles.googleIcon} viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.39 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.25C.45 8.19 0 9.99 0 12s.45 3.81 1.25 5.4l4.03-3.13z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.25 6.6l4.03 3.13c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          Sign up with Google
        </button>

        <div className={styles.divider}>
          <span>OR WITH EMAIL</span>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
            {formData.password.length > 0 && (
              <div className={styles.strengthMeter}>
                <div className={styles.strengthBarBg}>
                  <div 
                    className={styles.strengthBarFill} 
                    style={{ width: strength.width, backgroundColor: strength.color }}
                  ></div>
                </div>
                <span style={{ color: strength.color }}>{strength.label}</span>
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        
        <div className={styles.footer}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
