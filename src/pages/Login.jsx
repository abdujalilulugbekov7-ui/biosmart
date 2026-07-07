import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    let digits = input.replace(/\D/g, '');
    
    if (digits.length < 3) {
      setPhone('+998');
      return;
    }
    
    if (!digits.startsWith('998')) {
      digits = '998' + digits;
    }
    
    digits = digits.slice(0, 12);
    
    let formatted = '+998';
    if (digits.length > 3) {
      formatted += ` (${digits.slice(3, 5)}`;
    }
    if (digits.length > 5) {
      formatted += `) ${digits.slice(5, 8)}`;
    }
    if (digits.length > 8) {
      formatted += `-${digits.slice(8, 10)}`;
    }
    if (digits.length > 10) {
      formatted += `-${digits.slice(10, 12)}`;
    }
    
    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    const cleanPhone = phone.replace(/[^+\d]/g, '');
    if (cleanPhone === '+998' || cleanPhone.length < 13) {
      setError('Iltimos, telefon raqamingizni to\'liq kiriting.');
      setLoading(false);
      return;
    }

    try {
      if (isRegister) {
        await signUp(cleanPhone, password, fullName);
        await signIn(cleanPhone, password);
        navigate('/');
      } else {
        await signIn(cleanPhone, password);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg__circle login-bg__circle--1" />
        <div className="login-bg__circle login-bg__circle--2" />
        <div className="login-bg__circle login-bg__circle--3" />
      </div>
      <div className="login-card">
        <div className="login-card__header">
          <div className="login-card__logo">
            <svg viewBox="0 0 100 100" className="login-card__logo-svg" width="56" height="56" style={{ display: 'inline-block' }}>
              <defs>
                <linearGradient id="login-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2ecc71" />
                  <stop offset="50%" stopColor="#27ae60" />
                  <stop offset="100%" stopColor="#1e8449" />
                </linearGradient>
                <linearGradient id="login-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#f1c40f" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
                <linearGradient id="login-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
              </defs>
              <path d="M50,10 L85,25 L85,60 C85,78 70,90 50,95 C30,90 15,78 15,60 L15,25 Z" fill="url(#login-shield-grad)" stroke="url(#login-gold-grad)" strokeWidth="3" />
              <path d="M50,15 L78,28 L78,58 C78,73 66,84 50,89 C34,84 22,73 22,58 L22,28 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
              <path d="M35,35 Q50,50 65,35" fill="none" stroke="url(#login-gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M35,65 Q50,50 65,65" fill="none" stroke="url(#login-gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M65,35 Q50,20 35,35" fill="none" stroke="url(#login-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <path d="M65,65 Q50,80 35,65" fill="none" stroke="url(#login-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <line x1="42" y1="28" x2="58" y2="28" stroke="url(#login-gold-grad)" strokeWidth="1.5" />
              <line x1="38" y1="35" x2="62" y2="35" stroke="url(#login-gold-grad)" strokeWidth="1.5" />
              <line x1="38" y1="65" x2="62" y2="65" stroke="url(#login-gold-grad)" strokeWidth="1.5" />
              <line x1="42" y1="72" x2="58" y2="72" stroke="url(#login-gold-grad)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="5" fill="#ffffff" />
            </svg>
          </div>
          <h1 className="login-card__title">
            Bio<span className="login-card__title--highlight">Smart</span>
          </h1>
          <p className="login-card__subtitle">
            {isRegister ? 'Yangi hisob yarating' : 'Tizimga kirish'}
          </p>
        </div>

        {error && <div className="login-alert login-alert--error">{error}</div>}
        {success && <div className="login-alert login-alert--success">{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <div className="login-form__group">
              <label className="login-form__label">To'liq ism</label>
              <input
                type="text"
                className="login-form__input"
                placeholder="Ismingizni kiriting"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="login-form__group">
            <label className="login-form__label">Telefon raqami</label>
            <input
              type="text"
              className="login-form__input"
              placeholder="+998 (90) 123-45-67"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="login-form__group">
            <label className="login-form__label">Parol</label>
            <input
              type="password"
              className="login-form__input"
              placeholder="Parolingizni kiriting"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="login-form__btn" disabled={loading}>
            {loading ? 'Kutilmoqda...' : isRegister ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
          </button>
        </form>

        <p className="login-card__switch">
          {isRegister ? 'Hisobingiz bormi?' : 'Hisobingiz yo\'qmi?'}{' '}
          <button onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess(''); setPhone('+998'); }}>
            {isRegister ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>
        </p>
      </div>
    </div>
  );
}
