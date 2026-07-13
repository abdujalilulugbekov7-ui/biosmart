import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiHome, FiBook, FiBarChart2, FiShield, FiMoon, FiSun, FiLogOut, FiMenu, FiX, FiSettings, FiClock, FiStar } from 'react-icons/fi';
import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const { isAdmin, isPro, signOut } = useAuth();
  const { theme, themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <svg viewBox="0 0 100 100" className="sidebar__logo-svg" width="32" height="32" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2ecc71" />
                  <stop offset="50%" stopColor="#27ae60" />
                  <stop offset="100%" stopColor="#1e8449" />
                </linearGradient>
                <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#f1c40f" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
                <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
              </defs>
              <path d="M50,10 L85,25 L85,60 C85,78 70,90 50,95 C30,90 15,78 15,60 L15,25 Z" fill="url(#shield-grad)" stroke="url(#gold-grad)" strokeWidth="3" />
              <path d="M50,15 L78,28 L78,58 C78,73 66,84 50,89 C34,84 22,73 22,58 L22,28 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
              <path d="M35,35 Q50,50 65,35" fill="none" stroke="url(#gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M35,65 Q50,50 65,65" fill="none" stroke="url(#gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M65,35 Q50,20 35,35" fill="none" stroke="url(#cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <path d="M65,65 Q50,80 35,65" fill="none" stroke="url(#cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <line x1="42" y1="28" x2="58" y2="28" stroke="url(#gold-grad)" strokeWidth="1.5" />
              <line x1="38" y1="35" x2="62" y2="35" stroke="url(#gold-grad)" strokeWidth="1.5" />
              <line x1="38" y1="65" x2="62" y2="65" stroke="url(#gold-grad)" strokeWidth="1.5" />
              <line x1="42" y1="72" x2="58" y2="72" stroke="url(#gold-grad)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="5" fill="#ffffff" />
            </svg>
          </div>
          <span className="sidebar__logo-text">
            Bio<span className="sidebar__logo-text--highlight">Smart</span>
          </span>
        </div>

        <nav className="sidebar__nav">
          <NavLink to="/" className={({isActive}) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setMobileOpen(false)}>
            <FiHome className="sidebar__link-icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/library" className={({isActive}) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setMobileOpen(false)}>
            <FiBook className="sidebar__link-icon" />
            <span>Digital Library</span>
          </NavLink>
          <NavLink to="/analytics" className={({isActive}) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setMobileOpen(false)}>
            <FiBarChart2 className="sidebar__link-icon" />
            <span>Analytics / Profile</span>
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setMobileOpen(false)}>
            <FiSettings className="sidebar__link-icon animate-spin-slow" />
            <span>Sozlamalar</span>
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={({isActive}) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setMobileOpen(false)}>
              <FiShield className="sidebar__link-icon" />
              <span>Admin Control</span>
              <span className="sidebar__badge">Admin</span>
            </NavLink>
          )}
          <NavLink to="/premium" className={({isActive}) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`} onClick={() => setMobileOpen(false)}>
            <FiStar className="sidebar__link-icon" style={{ color: '#f1c40f' }} />
            <span>Premium (PRO)</span>
            <span className="sidebar__badge" style={{ background: 'rgba(241, 196, 15, 0.2)', color: '#f1c40f' }}>PRO</span>
          </NavLink>
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__theme-btn" onClick={toggleTheme}>
            {themeMode === 'auto' ? (
              <FiClock className="sidebar__link-icon" />
            ) : theme === 'light' ? (
              <FiMoon className="sidebar__link-icon" />
            ) : (
              <FiSun className="sidebar__link-icon" />
            )}
            <span>
              {themeMode === 'auto' ? 'Mavzu: AVTO' : theme === 'light' ? 'Tungi rejim' : 'Kunduzgi rejim'}
            </span>
          </button>
          <button className="sidebar__logout-btn" onClick={handleLogout}>
            <FiLogOut className="sidebar__link-icon" />
            <span>Chiqish</span>
          </button>
        </div>
      </aside>
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
