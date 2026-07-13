import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiAward, FiUser, FiMail, FiPhone, FiCamera, FiEdit2, FiSave, FiX, FiPrinter, FiDownload } from 'react-icons/fi';
import './Analytics.css';

const monthNames = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];



export default function Analytics() {
  const { user, profile, fetchProfile } = useAuth();
  const location = useLocation();
  const [monthlyData, setMonthlyData] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [totalTests, setTotalTests] = useState(0);
  const [activeCert, setActiveCert] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    if (user) {
      fetchAnalytics();
      fetchCertificates();
    }
  }, [user]);

  // Detect ?view_cert=pro query param and auto-open the cert viewer
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('view_cert') === 'pro' && certificates.length > 0) {
      const proCert = certificates.find(c => c.is_pro_cert);
      if (proCert) {
        setActiveCert(proCert);
      }
    }
  }, [location.search, certificates]);

  const handlePrintCert = () => {
    window.print();
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  const generateCertId = (cert) => {
    const base = cert?.id || Math.floor(Math.random() * 999999);
    return `BS-PRO-${String(base).padStart(6, '0')}`;
  };

  const handleStartEdit = () => {
    const nameParts = (profile?.full_name || '').split(' ');
    setFirstName(nameParts[0] || '');
    setLastName(nameParts.slice(1).join(' ') || '');
    setTempAvatarUrl(profile?.avatar_url || '');
    setIsEditing(true);
    setSaveSuccess('');
    setSaveError('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setSaveError("Rasm hajmi 1MB dan oshmasligi kerak");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fetchAnalytics = async () => {
    try {
      const { data } = await supabase
        .from('test_attempts')
        .select('completed_at, score, total_questions')
        .eq('user_id', user.id);
      setTotalTests(data?.length || 0);
      const monthly = monthNames.map((name, i) => {
        const count = (data || []).filter(d => new Date(d.completed_at).getMonth() === i).length;
        return { name, value: count };
      });
      setMonthlyData(monthly);
    } catch (e) { console.log(e); }
  };

  const fetchCertificates = async () => {
    try {
      let remoteCerts = [];
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*, topics(title)')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false });
        if (!error && data) {
          remoteCerts = data;
        }
      } catch (err) {
        console.warn("Supabase certificates fetch failed:", err);
      }

      let localCerts = [];
      try {
        const stored = localStorage.getItem('biosmart_certificates');
        if (stored) {
          const parsed = JSON.parse(stored);
          localCerts = parsed.filter(c => c.user_id === user.id || c.user_id === 'guest');
        }
      } catch (err) {
        console.warn("Local certificates read failed:", err);
      }

      const combined = [...remoteCerts];
      localCerts.forEach(lc => {
        const exists = combined.some(rc => rc.id === lc.id);
        if (!exists) {
          combined.push(lc);
        }
      });

      combined.sort((a, b) => new Date(b.earned_at) - new Date(a.earned_at));
      setCertificates(combined);
    } catch (e) {
      console.warn("fetchCertificates exception:", e);
    }
  };

  const displayName = profile?.full_name || user?.phone || user?.email?.split('@')[0] || '';

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess('');
    setSaveLoading(true);

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (!trimmedFirst) {
      setSaveError('Ism kiritilishi shart');
      setSaveLoading(false);
      return;
    }

    const newFullName = `${trimmedFirst} ${trimmedLast}`.trim();

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: newFullName,
          avatar_url: tempAvatarUrl
        })
        .eq('id', user.id);

      if (error) throw error;

      await fetchProfile(user.id);
      setSaveSuccess('Profil muvaffaqiyatli yangilandi!');
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.message || 'Xatolik yuz berdi');
    } finally {
      setSaveLoading(false);
    }
  };

  const renderAvatar = (url, name) => {
    if (url && url.startsWith('preset:')) {
      const [_, emoji, grad] = url.split('|');
      return (
        <div className="analytics__avatar" style={{ background: grad || 'var(--primary-gradient)' }}>
          <span style={{ fontSize: '36px' }}>{emoji}</span>
        </div>
      );
    }
    if (url && (url.startsWith('http') || url.startsWith('data:'))) {
      return (
        <div className="analytics__avatar analytics__avatar--image">
          <img src={url} alt="Profil rasmi" />
        </div>
      );
    }
    const letter = name ? name.charAt(0).toUpperCase() : 'B';
    return (
      <div className="analytics__avatar">
        {letter}
      </div>
    );
  };

  return (
    <div className="analytics">
      <h1 className="analytics__title">Profil va Analitika</h1>

      {isEditing ? (
        <div className="analytics__profile-card analytics__profile-card--editing">
          {/* Left Column: Avatar Editor */}
          <div className="avatar-editor-section">
            <div className="avatar-editor-preview">
              {renderAvatar(tempAvatarUrl, firstName)}
              <label className="avatar-upload-overlay" title="O'z rasmingizni yuklash">
                <FiCamera />
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            </div>

          </div>

          {/* Right Column: Profile Edit Form */}
          <form onSubmit={handleSaveProfile} className="profile-fields-form">
            <h3 className="profile-edit-header">Profil ma'lumotlarini tahrirlash</h3>
            
            <div className="profile-input-group">
              <label className="profile-input-label">Ism</label>
              <div className="profile-input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  value={firstName || ''}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ismingizni kiriting"
                  className="profile-edit-input"
                  required
                  disabled={saveLoading}
                />
              </div>
            </div>

            <div className="profile-input-group">
              <label className="profile-input-label">Familiya</label>
              <div className="profile-input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  value={lastName || ''}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Familiyangizni kiriting"
                  className="profile-edit-input"
                  disabled={saveLoading}
                />
              </div>
            </div>

            {saveError && <span className="profile-edit-error">{saveError}</span>}

            <div className="profile-edit-actions">
              <button type="submit" className="btn-save-profile" disabled={saveLoading}>
                <FiSave /> {saveLoading ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
              <button
                type="button"
                className="btn-cancel-profile"
                onClick={() => setIsEditing(false)}
                disabled={saveLoading}
              >
                <FiX /> Bekor qilish
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="analytics__profile-card">
          {renderAvatar(profile?.avatar_url, displayName)}
          <div className="analytics__profile-info">
            <div className="analytics__profile-name-row">
              <h2>{displayName}</h2>
              <button
                className="analytics__btn-edit"
                onClick={handleStartEdit}
                title="Profilni tahrirlash"
              >
                <FiEdit2 /> Tahrirlash
              </button>
            </div>
            <p><FiPhone /> {user?.phone || user?.email}</p>
            <p><FiAward /> {totalTests} ta test ishlangan</p>
            {saveSuccess && <p className="profile-edit-success">{saveSuccess}</p>}
          </div>
        </div>
      )}

      <div className="analytics__grid">
        <div className="analytics__card">
          <h3>O'quv faoliyati (12 oylik faollik)</h3>
          <div className="analytics__chart">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics__card">
          <div className="analytics__card-header">
            <h3>Sertifikatlar va Nishonlar</h3>
          </div>
          {certificates.length > 0 ? (
            <div className="analytics__certs">
              {certificates.map(cert => (
                <div key={cert.id} className="cert-item cert-item--clickable" onClick={() => setActiveCert(cert)}>
                  <FiAward className="cert-item__icon" />
                  <div>
                    <h4>{cert.is_pro_cert ? 'BioSmart PRO Oltin Sertifikati 🏆' : (cert.topics?.title || 'Mavzu')}</h4>
                    <p>Ball: {cert.score}%</p>
                  </div>
                  <span className="cert-item__view-btn">Ko'rish →</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="analytics__certs-empty">
              <FiAward className="analytics__certs-empty-icon" />
              <p>Sertifikatlar mavjud emas</p>
              <span>Test topshiriqlaridan 80% dan yuqori natija ko'rsatib, sertifikatlarga ega bo'ling! 🏆</span>
            </div>
          )}
        </div>
      </div>

      {/* ===== Certificate Viewer Modal ===== */}
      {activeCert && (
        <div className="cert-viewer-overlay" onClick={() => setActiveCert(null)}>
          <div className="cert-viewer-container" onClick={(e) => e.stopPropagation()}>
            {/* Controls */}
            <div className="cert-viewer-controls no-print">
              <button className="cert-ctrl-btn cert-ctrl-print" onClick={handlePrintCert}>
                <FiPrinter /> Sertifikatni Yuklash (PDF)
              </button>
              <button className="cert-ctrl-btn cert-ctrl-close" onClick={() => setActiveCert(null)}>
                <FiX /> Yopish
              </button>
            </div>

            {/* The Certificate Paper */}
            <div className="certificate-paper" id="certificate-paper">
              {/* Gold ornamental top border */}
              <div className="cert-ornament-top"></div>
              <div className="cert-ornament-bottom"></div>

              {/* Inner frame */}
              <div className="cert-inner-frame">
                {/* Header Crest */}
                <div className="cert-header-crest">
                  <div className="cert-crest-icon">
                    <svg viewBox="0 0 64 64" width="48" height="48">
                      <circle cx="32" cy="32" r="30" fill="none" stroke="#d4af37" strokeWidth="2" />
                      <circle cx="32" cy="32" r="24" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
                      <text x="32" y="38" textAnchor="middle" fill="#d4af37" fontSize="22" fontWeight="bold" fontFamily="serif">B</text>
                    </svg>
                  </div>
                  <div className="cert-header-text">
                    <span className="cert-system-name">BIOSMART TA'LIM PLATFORMASI</span>
                    <h2 className="cert-main-title">SERTIFIKAT</h2>
                  </div>
                </div>

                {/* Decorative divider */}
                <div className="cert-divider">
                  <span className="cert-divider-star">✦</span>
                </div>

                {/* Body */}
                <div className="cert-body">
                  <p className="cert-preamble">Ushbu sertifikat quyidagi shaxsga beriladi:</p>
                  <h1 className="cert-recipient-name">
                    {profile?.full_name || user?.phone || 'Foydalanuvchi'}
                  </h1>
                  <div className="cert-desc-block">
                    {activeCert.is_pro_cert ? (
                      <p>
                        BioSmart ta'lim platformasida <strong>PRO Premium obuna</strong> tarifini muvaffaqiyatli
                        faollashtirgani va barcha ta'lim materiallariga to'liq huquq olgani uchun
                        ushbu <strong>"Oltin Sertifikat"</strong> taqdim etiladi.
                      </p>
                    ) : (
                      <p>
                        <strong>"{activeCert.topics?.title || 'Mavzu'}"</strong> mavzusi bo'yicha
                        test sinovidan <strong>{activeCert.score}%</strong> natija bilan
                        muvaffaqiyatli o'tgani uchun ushbu sertifikat taqdim etiladi.
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer with date and signature */}
                <div className="cert-footer-row">
                  <div className="cert-footer-col">
                    <div className="cert-signature-line"></div>
                    <span className="cert-footer-label">Sana</span>
                    <span className="cert-footer-value">{formatDate(activeCert.earned_at)}</span>
                  </div>
                  <div className="cert-footer-col cert-footer-col--center">
                    <div className="cert-seal">
                      <svg viewBox="0 0 80 80" width="60" height="60">
                        <polygon points="40,5 47,30 75,30 52,45 60,72 40,55 20,72 28,45 5,30 33,30" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                        <circle cx="40" cy="40" r="15" fill="none" stroke="#d4af37" strokeWidth="1" />
                        <text x="40" y="44" textAnchor="middle" fill="#d4af37" fontSize="10" fontWeight="bold" fontFamily="serif">PRO</text>
                      </svg>
                    </div>
                  </div>
                  <div className="cert-footer-col">
                    <div className="cert-signature-line"></div>
                    <span className="cert-footer-label">Sertifikat raqami</span>
                    <span className="cert-footer-value">{generateCertId(activeCert)}</span>
                  </div>
                </div>

                {/* BioSmart branding watermark */}
                <div className="cert-watermark">BIOSMART</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
