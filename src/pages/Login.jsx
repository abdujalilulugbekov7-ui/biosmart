import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'password' (for new users)
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('+998');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  const { signInWithOtp, verifyOtp, signUp, signIn } = useAuth();
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

  const handleOtpChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(input);
  };

  const cleanPhone = phone.replace(/[^+\d]/g, '');

  const sendOtp = async () => {
    if (cleanPhone === '+998' || cleanPhone.length < 13) {
      setError('Iltimos, telefon raqamingizni to\'liq kiriting.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Supabase signInWithOtp will automatically sign up the user if they don't exist
      await signInWithOtp(cleanPhone);
      setSuccess('Tasdiqlash kodi SMS orqali yuborildi');
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('6 xonali kodni kiriting');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { session } = await verifyOtp(cleanPhone, otp);
      if (session) {
        // User already has password set - logged in
        navigate('/');
      } else if (isRegister) {
        // New user - need to set password
        setStep('password');
      } else {
        // Existing user without password - should not happen with OTP
        setError('Parol o\'rnatilmagan. Iltimos, ro\'yxatdan o\'ting.');
      }
    } catch (err) {
      setError(err.message || 'Noto\'g\'ri kod');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return;
    }
    if (!fullName.trim()) {
      setError('Ismingizni kiriting');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Set password for new user
      await signUp(cleanPhone, password, fullName);
      // Sign in with phone + password
      await signIn(cleanPhone, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (cleanPhone === '+998' || cleanPhone.length < 13) {
      setError('Iltimos, telefon raqamingizni to\'liq kiriting.');
      return;
    }
    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signIn(cleanPhone, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Telefon raqam yoki parol noto\'g\'ri');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError('');
    setSuccess('');
    if (step === 'otp') {
      setStep('phone');
      setOtp('');
    } else if (step === 'password') {
      setStep('otp');
      setPassword('');
      setFullName('');
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setStep('phone');
    setPhone('+998');
    setOtp('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccess('');
    setLoginMethod('otp');
  };

  const renderPhoneStep = () => (
    <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }} className="login-form">
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
      <button type="submit" className="login-form__btn" disabled={loading}>
        {loading ? 'Yuborilmoqda...' : isRegister ? 'Kod yuborish' : 'Kirish kodi yuborish'}
      </button>
    </form>
  );

  const renderPasswordLoginForm = () => (
    <form onSubmit={handlePasswordLogin} className="login-form">
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
      <div className="login-form__group" style={{ marginTop: '15px' }}>
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
      <button type="submit" className="login-form__btn" disabled={loading} style={{ marginTop: '20px' }}>
        {loading ? 'Kirilmoqda...' : 'Tizimga kirish'}
      </button>
    </form>
  );

  const renderOtpStep = () => (
    <form onSubmit={handleOtpSubmit} className="login-form">
      <div className="login-form__group">
        <label className="login-form__label">SMS kod (6 xona)</label>
        <input
          type="text"
          className="login-form__input login-form__input--otp"
          placeholder="123456"
          value={otp}
          onChange={handleOtpChange}
          maxLength={6}
          required
          autoComplete="one-time-code"
        />
      </div>
      <button type="submit" className="login-form__btn" disabled={loading}>
        {loading ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
      </button>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handlePasswordSubmit} className="login-form">
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
      <div className="login-form__group">
        <label className="login-form__label">Yangi parol</label>
        <input
          type="password"
          className="login-form__input"
          placeholder="Kamida 6 belgi"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <button type="submit" className="login-form__btn" disabled={loading}>
        {loading ? 'Saqlanmoqda...' : 'Parol o\'rnatish va kirish'}
      </button>
    </form>
  );

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
            {step === 'phone' 
              ? (isRegister ? 'Yangi hisob yarating' : 'Tizimga kirish')
              : step === 'otp'
              ? 'Tasdiqlash kodi kiriting'
              : 'Parol o\'rnating'}
          </p>
        </div>

        {error && <div className="login-alert login-alert--error">{error}</div>}
        {success && <div className="login-alert login-alert--success">{success}</div>}

        {step === 'phone' && !isRegister && (
          <div className="login-method-toggle" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button 
              type="button"
              className={`login-method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
              onClick={() => { setLoginMethod('otp'); setError(''); setPassword(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color, #e0e0e0)',
                background: loginMethod === 'otp' ? '#2ecc71' : 'transparent',
                color: loginMethod === 'otp' ? '#fff' : 'inherit',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              SMS orqali
            </button>
            <button 
              type="button"
              className={`login-method-btn ${loginMethod === 'password' ? 'active' : ''}`}
              onClick={() => { setLoginMethod('password'); setError(''); setPassword(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color, #e0e0e0)',
                background: loginMethod === 'password' ? '#2ecc71' : 'transparent',
                color: loginMethod === 'password' ? '#fff' : 'inherit',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              Parol orqali
            </button>
          </div>
        )}

        {step === 'phone' && (
          isRegister 
            ? renderPhoneStep() 
            : (loginMethod === 'otp' ? renderPhoneStep() : renderPasswordLoginForm())
        )}
        {step === 'otp' && renderOtpStep()}
        {step === 'password' && renderPasswordStep()}

        {step !== 'phone' && (
          <button onClick={handleBack} className="login-form__btn login-form__btn--back">
            Orqaga
          </button>
        )}

        {step === 'phone' && (
          <p className="login-card__switch">
            {isRegister ? 'Hisobingiz bormi?' : 'Hisobingiz yo\'qmi?'}{' '}
            <button onClick={switchMode}>
              {isRegister ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}