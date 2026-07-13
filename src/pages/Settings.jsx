import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiClock, FiZap, FiSettings, FiCheck } from 'react-icons/fi';
import './Settings.css';

export default function Settings() {
  const { themeMode, setThemeMode, theme } = useTheme();


  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    return localStorage.getItem('biosmart-settings-animations') !== 'false';
  });




  useEffect(() => {
    localStorage.setItem('biosmart-settings-animations', animationsEnabled.toString());
    if (animationsEnabled) {
      document.body.classList.remove('no-transitions');
    } else {
      document.body.classList.add('no-transitions');
    }
  }, [animationsEnabled]);





  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header__title-container">
          <FiSettings className="settings-header__icon animate-spin-slow" />
          <div>
            <h1>Sozlamalar</h1>
            <p>Ilova ko'rinishi va interfeys parametrlarini o'zgartiring</p>
          </div>
        </div>
      </div>

      <div className="settings-grid">
        {/* Theme Settings Card */}
        <div className="settings-card">
          <div className="settings-card__header">
            <div className="settings-card__header-icon theme-icon-bg">
              {themeMode === 'light' && <FiSun />}
              {themeMode === 'dark' && <FiMoon />}
              {themeMode === 'auto' && <FiClock />}
            </div>
            <div>
              <h3>Ilova Mavzusi</h3>
              <p>Qurilma yoki vaqtga qarab ilova ko'rinishini sozlang</p>
            </div>
          </div>

          <div className="theme-options">
            {/* Light Theme Option */}
            <button
              className={`theme-option-card ${themeMode === 'light' ? 'theme-option-card--active' : ''}`}
              onClick={() => setThemeMode('light')}
            >
              <div className="theme-option-card__visual light-visual">
                <FiSun className="sun-pulse" />
              </div>
              <div className="theme-option-card__info">
                <span className="theme-option-card__name">Kunduzgi rejim</span>
                <span className="theme-option-card__desc">Doimiy yorug' fon</span>
              </div>
              {themeMode === 'light' && <div className="theme-option-card__badge"><FiCheck /></div>}
            </button>

            {/* Dark Theme Option */}
            <button
              className={`theme-option-card ${themeMode === 'dark' ? 'theme-option-card--active' : ''}`}
              onClick={() => setThemeMode('dark')}
            >
              <div className="theme-option-card__visual dark-visual">
                <FiMoon className="moon-float" />
              </div>
              <div className="theme-option-card__info">
                <span className="theme-option-card__name">Tungi rejim</span>
                <span className="theme-option-card__desc">Doimiy qorong'u fon</span>
              </div>
              {themeMode === 'dark' && <div className="theme-option-card__badge"><FiCheck /></div>}
            </button>

            {/* Auto Theme Option */}
            <button
              className={`theme-option-card ${themeMode === 'auto' ? 'theme-option-card--active' : ''}`}
              onClick={() => setThemeMode('auto')}
            >
              <div className="theme-option-card__visual auto-visual">
                <FiClock className="clock-tick" />
              </div>
              <div className="theme-option-card__info">
                <span className="theme-option-card__name">AVTO rejim</span>
                <span className="theme-option-card__desc">Vaqtga qarab avtomatik</span>
              </div>
              {themeMode === 'auto' && <div className="theme-option-card__badge"><FiCheck /></div>}
            </button>
          </div>

          {themeMode === 'auto' && (
            <div className="auto-mode-alert">
              <FiClock className="alert-icon" />
              <div className="alert-content">
                <strong>Avtomatik rejim faol:</strong>
                <span> 06:00 dan 18:00 gacha yorug' (kunduzgi) fon, qolgan soatlarda esa tungi fon faollashadi.</span>
                <div className="current-status-badge">
                  Hozirgi holat: <strong>{theme === 'light' ? 'Kunduzgi rejim ☀️' : 'Tungi rejim 🌙'}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* System Settings Card */}
        <div className="settings-card">
          <div className="settings-card__header">
            <div className="settings-card__header-icon system-icon-bg">
              <FiZap />
            </div>
            <div>
              <h3>Tizim Parametrlari</h3>
              <p>Ilovaning qo'shimcha imkoniyatlarini yoqing yoki o'chiring</p>
            </div>
          </div>

          <div className="system-settings-list">


            <div className="setting-row">
              <div className="setting-row__info">
                <div className="setting-row__title">
                  <FiZap className="setting-row__icon" />
                  <span>Premium animatsiyalar</span>
                </div>
                <p className="setting-row__desc">Sahifalararo silliq o'tishlar va interaktiv micro-animatsiyalar (tavsiya etiladi)</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={animationsEnabled}
                  onChange={(e) => setAnimationsEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>


          </div>
        </div>


      </div>
    </div>
  );
}
