import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiBell, FiSun, FiMoon, FiSearch, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const { profile, isPro, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  const handleHeaderSearch = (e) => {
    if (e.key === 'Enter' && headerSearchQuery.trim()) {
      navigate(`/library?search=${encodeURIComponent(headerSearchQuery.trim())}`);
      setHeaderSearchQuery('');
    }
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = () => {
      const savedAnnouncements = JSON.parse(localStorage.getItem('biosmart_announcements') || '[]');
      const readIds = JSON.parse(localStorage.getItem('biosmart_read_announcements') || '[]');
      
      let announcements = [...savedAnnouncements];
      if (announcements.length === 0) {
        announcements = [
          { id: 'ann-default-1', text: "Xush kelibsiz! O'quv jarayonini boshlang. 🧬", created_at: new Date(Date.now() - 3600000).toISOString() },
          { id: 'ann-default-2', text: "Yangi sertifikat olishga harakat qiling! 🏆", created_at: new Date(Date.now() - 86400000).toISOString() }
        ];
        localStorage.setItem('biosmart_announcements', JSON.stringify(announcements));
      }

      const mapped = announcements.map(ann => {
        const isRead = readIds.includes(ann.id);
        const diffMs = Date.now() - new Date(ann.created_at).getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        let timeStr = 'Hozir';
        if (diffMins > 0 && diffMins < 60) {
          timeStr = `${diffMins} daqiqa avval`;
        } else if (diffHours > 0 && diffHours < 24) {
          timeStr = `${diffHours} soat avval`;
        } else if (diffHours >= 24) {
          timeStr = `${Math.floor(diffHours / 24)} kun avval`;
        }

        return {
          id: ann.id,
          text: ann.text,
          read: isRead,
          time: timeStr
        };
      });

      // Sort newest first
      mapped.sort((a, b) => b.id.localeCompare(a.id));
      setNotifications(mapped);
    };

    loadNotifications();

    window.addEventListener('storage', loadNotifications);
    window.addEventListener('biosmart_new_announcement', loadNotifications);

    return () => {
      window.removeEventListener('storage', loadNotifications);
      window.removeEventListener('biosmart_new_announcement', loadNotifications);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const renderHeaderAvatar = () => {
    const url = profile?.avatar_url;
    if (url && url.startsWith('preset:')) {
      const [_, emoji, grad] = url.split('|');
      return (
        <div className="header-profile__avatar" style={{ background: grad || 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '18px' }}>{emoji}</span>
        </div>
      );
    }
    if (url && (url.startsWith('http') || url.startsWith('data:'))) {
      return (
        <div className="header-profile__avatar" style={{ overflow: 'hidden', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={url} alt="Profil rasmi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      );
    }
    return (
      <div className="header-profile__avatar">
        {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'B'}
      </div>
    );
  };

  useEffect(() => {
    const closeMenus = () => {
      setShowProfileMenu(false);
      setShowNotifications(false);
    };
    document.addEventListener('click', closeMenus);
    return () => document.removeEventListener('click', closeMenus);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Boshqaruv paneli';
    if (path === '/library') return 'Raqamli kutubxona';
    if (path.startsWith('/library/read/')) return 'Darslik mutolaasi';
    if (path.startsWith('/test/')) return 'Test sinovi';
    if (path === '/analytics') return 'Tahlillar va Profil';
    if (path === '/admin') return 'Admin Dashboard';
    if (path === '/admin/questions') return 'Savollar banki';
    return 'BioSmart';
  };

  const getPageBreadcrumbs = () => {
    const path = location.pathname;
    const crumbs = [{ label: 'BioSmart', link: '/' }];
    
    if (path === '/library') {
      crumbs.push({ label: 'Kutubxona', link: '/library' });
    } else if (path.startsWith('/library/read/')) {
      crumbs.push({ label: 'Kutubxona', link: '/library' });
      crumbs.push({ label: 'Mutolaa' });
    } else if (path.startsWith('/test/')) {
      crumbs.push({ label: 'Kutubxona', link: '/library' });
      crumbs.push({ label: 'Test' });
    } else if (path === '/analytics') {
      crumbs.push({ label: 'Profil' });
    } else if (path === '/admin') {
      crumbs.push({ label: 'Admin', link: '/admin' });
    } else if (path === '/admin/questions') {
      crumbs.push({ label: 'Admin', link: '/admin' });
      crumbs.push({ label: 'Savollar' });
    }
    return crumbs;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = (e) => {
    e.stopPropagation();
    const allIds = notifications.map(n => n.id);
    localStorage.setItem('biosmart_read_announcements', JSON.stringify(allIds));
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="app-header">
      <div className="app-header__left">
        <div className="app-header__breadcrumbs">
          {getPageBreadcrumbs().map((crumb, idx) => (
            <span key={idx} className="breadcrumb-item">
              {idx > 0 && <span className="breadcrumb-separator">/</span>}
              {crumb.link ? (
                <span className="breadcrumb-link" onClick={() => navigate(crumb.link)}>
                  {crumb.label}
                </span>
              ) : (
                <span className="breadcrumb-current">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
        <h1 className="app-header__title">{getPageTitle()}</h1>
      </div>

      <div className="app-header__right">
        {/* Search Bar */}
        <div className="header-search">
          <FiSearch className="header-search__icon" />
          <input 
            type="text" 
            placeholder="Qidiruv..." 
            className="header-search__input" 
            value={headerSearchQuery || ''}
            onChange={(e) => setHeaderSearchQuery(e.target.value)}
            onKeyDown={handleHeaderSearch}
          />
          <span className="header-search__shortcut">Enter</span>
        </div>

        {/* Theme Toggle */}
        <button 
          className="header-action-btn" 
          onClick={toggleTheme}
          title={theme === 'light' ? 'Tungi rejim' : 'Kunduzgi rejim'}
        >
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        {/* Notifications */}
        <div className="header-notification-wrapper" onClick={e => e.stopPropagation()}>
          <button 
            className="header-action-btn" 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
          >
            <FiBell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-dropdown__header">
                <h3>Bildirishnomalar</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead}>Barchasini o'qilgan deb belgilash</button>
                )}
              </div>
              <div className="notification-dropdown__list">
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item ${n.read ? '' : 'unread'}`}>
                    <p className="notification-item__text">{n.text}</p>
                    <span className="notification-item__time">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="header-profile-wrapper" onClick={e => e.stopPropagation()}>
          <div 
            className="header-profile" 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
          >
            {renderHeaderAvatar()}
            <div className="header-profile__info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="header-profile__name">{profile?.full_name || 'Foydalanuvchi'}</span>
                {isPro && <span className="header-profile__pro-badge">PRO</span>}
              </div>
              <span className="header-profile__role">{profile?.role === 'admin' ? 'Administrator' : "O'quvchi"}</span>
            </div>
            <FiChevronDown className={`header-profile__chevron ${showProfileMenu ? 'open' : ''}`} />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <button onClick={() => { navigate('/analytics'); setShowProfileMenu(false); }}>
                <FiUser /> Profil
              </button>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut /> Chiqish
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
