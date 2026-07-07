import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiTarget, FiPercent, FiRefreshCw } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const defaultFact = {
  fact_text: 'Asal hech qachon buzilmaydi. Arxeologlar Misr piramidalaridan 3000 yillik asal topishgan!',
};

export default function Dashboard() {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [fact, setFact] = useState(defaultFact);
  const [stats, setStats] = useState({ totalQuestions: 0, accuracy: 0 });
  const [weeklyActivity, setWeeklyActivity] = useState([
    { name: 'Du', value: 0 }, { name: 'Se', value: 0 }, { name: 'Cho', value: 0 },
    { name: 'Pa', value: 0 }, { name: 'Ju', value: 0 }, { name: 'Sha', value: 0 }, { name: 'Ya', value: 0 }
  ]);
  const [recentProgress, setRecentProgress] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRotating, setIsRotating] = useState(false);

  const handleRefreshFact = async () => {
    setIsRotating(true);
    try {
      const { data } = await supabase.from('did_you_know').select('*');
      if (data && data.length > 0) {
        const filtered = data.filter(d => d.fact_text !== fact.fact_text);
        const pool = filtered.length > 0 ? filtered : data;
        setFact(pool[Math.floor(Math.random() * pool.length)]);
      }
    } catch (e) { console.log(e); }
    setTimeout(() => setIsRotating(false), 600);
  };

  useEffect(() => {
    fetchFact();
    if (user) {
      fetchStats();
      fetchRecentProgress();
    }
  }, [user]);

  const fetchFact = async () => {
    try {
      const { data } = await supabase.from('did_you_know').select('*');
      if (data && data.length > 0) {
        setFact(data[Math.floor(Math.random() * data.length)]);
      }
    } catch (e) { console.log(e); }
  };

  const fetchStats = async () => {
    try {
      const { data } = await supabase.from('test_attempts').select('completed_at, score, total_questions').eq('user_id', user.id);
      if (data && data.length > 0) {
        const totalQ = data.reduce((a, b) => a + b.total_questions, 0);
        const totalScore = data.reduce((a, b) => a + b.score, 0);
        setStats({ totalQuestions: totalQ, accuracy: totalQ > 0 ? Math.round((totalScore / totalQ) * 100) : 0 });

        const daysMapping = [6, 0, 1, 2, 3, 4, 5];
        const activity = [
          { name: 'Du', value: 0 }, { name: 'Se', value: 0 }, { name: 'Cho', value: 0 },
          { name: 'Pa', value: 0 }, { name: 'Ju', value: 0 }, { name: 'Sha', value: 0 }, { name: 'Ya', value: 0 }
        ];

        const startOfWeek = new Date();
        const currentDay = startOfWeek.getDay();
        const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1;
        startOfWeek.setDate(startOfWeek.getDate() - distanceToMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        data.forEach(attempt => {
          const attemptDate = new Date(attempt.completed_at);
          if (attemptDate >= startOfWeek) {
            const dayIdx = attemptDate.getDay();
            const mappedIdx = daysMapping[dayIdx];
            if (mappedIdx !== undefined) {
              activity[mappedIdx].value += 1;
            }
          }
        });
        setWeeklyActivity(activity);
      } else {
        setStats({ totalQuestions: 0, accuracy: 0 });
        setWeeklyActivity([
          { name: 'Du', value: 0 }, { name: 'Se', value: 0 }, { name: 'Cho', value: 0 },
          { name: 'Pa', value: 0 }, { name: 'Ju', value: 0 }, { name: 'Sha', value: 0 }, { name: 'Ya', value: 0 }
        ]);
      }
    } catch (e) { console.log(e); }
  };

  const fetchRecentProgress = async () => {
    try {
      const { data } = await supabase
        .from('user_progress')
        .select('*, topics(title, subjects(name, grades(name)))')
        .eq('user_id', user.id)
        .order('last_accessed', { ascending: false })
        .limit(1);
      if (data && data.length > 0) setRecentProgress(data[0]);
    } catch (e) { console.log(e); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/library?search=${searchQuery}`);
  };

  const displayName = profile?.full_name || user?.phone || user?.email?.split('@')[0] || 'Foydalanuvchi';

  return (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <div className="dashboard__welcome-text">
          <h1>Xush kelibsiz, {displayName}! 👋</h1>
          <p>Bugun nima o'rganmoqchisiz?</p>
        </div>
        <form className="dashboard__search" onSubmit={handleSearch}>
          <FiSearch className="dashboard__search-icon" />
          <input
            type="text" placeholder="Mavzu, bob yoki savollarni qidiring..."
            value={searchQuery || ''} onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit"><FiSearch /></button>
        </form>
      </div>

      <div className="dashboard__grid">
        <div className="dashboard__card dashboard__fact">
          <div className="dashboard__fact-badge-wrapper">
            <div className="dashboard__fact-badge">
              <div className="fact-badge__ornament">
                <span className="ornament-dots">•••</span>
                <svg className="ornament-leaf-svg" viewBox="0 0 100 30" width="40" height="15">
                  <path d="M50,25 C50,25 42,15 35,18 C28,21 31,12 44,14 C46,14 48,18 50,21" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
                  <path d="M50,25 C50,25 58,15 65,18 C72,21 69,12 56,14 C54,14 52,18 50,21" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
                  <path d="M50,22 C47,16 49,8 50,8 C51,8 53,16 50,22" fill="#2d6a4f" />
                </svg>
                <span className="ornament-dots">•••</span>
              </div>
              <h3 className="fact-badge__title">Bilasizmi?</h3>
              <div className="fact-badge__ornament">
                <svg className="ornament-leaf-svg" viewBox="0 0 100 30" width="70" height="20">
                  <path d="M15,15 Q35,15 42,18" fill="none" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="15" cy="15" r="1.5" fill="#2d6a4f" />
                  <path d="M85,15 Q65,15 58,18" fill="none" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="85" cy="15" r="1.5" fill="#2d6a4f" />
                  <path d="M50,20 C45,14 47,8 50,8 C53,8 55,14 50,20" fill="#2d6a4f" />
                  <path d="M49,20 C44,18 41,12 44,10 C47,8 48,16 49,20" fill="#2d6a4f" opacity="0.8" />
                  <path d="M51,20 C56,18 59,12 56,10 C53,8 52,16 51,20" fill="#2d6a4f" opacity="0.8" />
                </svg>
              </div>
            </div>
          </div>
          <div className="dashboard__fact-content">
            <p className="fact-text">{fact.fact_text}</p>
            <button 
              type="button" 
              className={`dashboard__fact-refresh-btn ${isRotating ? 'rotating' : ''}`}
              onClick={handleRefreshFact}
              title="Yangi fakt yuklash"
            >
              <FiRefreshCw /> Yangilash
            </button>
          </div>
        </div>

        <div className="dashboard__card dashboard__resume">
          <div className="dashboard__resume-badge-wrapper">
            <div className="dashboard__resume-badge">
              <div className="resume-badge__ornament">
                <span className="ornament-dots">•••</span>
                <svg className="ornament-book-svg" viewBox="0 0 100 30" width="50" height="20">
                  <path d="M50,18 C46,12 36,12 36,18 L36,8 C36,2 46,2 50,8" fill="none" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M50,18 C54,12 64,12 64,18 L64,8 C64,2 54,2 50,8" fill="none" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="50" y1="8" x2="50" y2="20" stroke="#2d6a4f" strokeWidth="1.5" />
                  <path d="M34,8 C30,6 30,12 34,8" fill="#2d6a4f" />
                  <path d="M66,8 C70,6 70,12 66,8" fill="#2d6a4f" />
                </svg>
                <span className="ornament-dots">•••</span>
              </div>
              <h3 className="resume-badge__title">Davom ettirish</h3>
              <div className="resume-badge__ornament">
                <svg viewBox="0 0 100 20" width="30" height="10">
                  <path d="M50,12 C49.5,11.5 48.5,10.5 48.5,10 C48.5,9.5 49,9 49.5,9 C50,9 50,9.5 50,9.5 C50,9.5 50,9 50.5,9 C51,9 51.5,9.5 51.5,10 C51.5,10.5 50.5,11.5 50,12 Z" fill="#2d6a4f" />
                </svg>
              </div>
            </div>
          </div>
          <p className="resume-badge__quote">
            Bugun kichik qadam tashlasangiz, ertaga katta natijalarga erishasiz.
          </p>
          <div className="dashboard__resume-notebook">
            <div className="notebook-page">
              <div className="notebook-header">
                <span className="notebook-pin">📌 Kichik qadamlar...</span>
              </div>
              {recentProgress ? (
                <div className="notebook-content">
                  <span className="notebook-subject">{recentProgress.topics?.subjects?.name}</span>
                  <h4 className="notebook-topic">{recentProgress.topics?.title}</h4>
                  <div className="notebook-progress-section">
                    <div className="notebook-progress-text">O'zlashtirish: {recentProgress.progress}%</div>
                    <div className="notebook-progress-bar">
                      <div className="notebook-progress-fill" style={{ width: `${recentProgress.progress}%` }} />
                    </div>
                  </div>
                  <button className="notebook-btn" onClick={() => navigate(`/library/read/${recentProgress.topic_id}`)}>
                    Mutolaani davom ettirish ➔
                  </button>
                </div>
              ) : (
                <div className="notebook-content">
                  <span className="notebook-subject">Biologiya • 6-sinf</span>
                  <h4 className="notebook-topic">1-§. Botanika – o‘simliklar haqidagi fan</h4>
                  <div className="notebook-progress-section">
                    <div className="notebook-progress-text">O'zlashtirish: 0%</div>
                    <div className="notebook-progress-bar">
                      <div className="notebook-progress-fill" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <button className="notebook-btn" onClick={() => navigate('/library')}>
                    Boshlash ➔
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="dashboard__resume-milestones">
            <span className="milestone-pill" title="Bilim olish yo'li">BILIM</span>
            <span className="milestone-pill" title="Sabr bilan o'rganish">SABR</span>
            <span className="milestone-pill" title="Mehnat qilish">MEHNAT</span>
            <span className="milestone-pill" title="Muvaffaqiyatga erishish">MUVAFFAQIYAT</span>
          </div>
        </div>

        <div className="dashboard__card dashboard__stats-card">
          <div className="dashboard__stats-badge-wrapper">
            <div className="dashboard__stats-badge">
              <div className="stats-badge__ornament">
                <span className="ornament-dots">•••</span>
                <svg className="ornament-star-svg" viewBox="0 0 100 30" width="50" height="20">
                  <polygon points="50,5 53,12 61,12 55,16 57,23 50,19 43,23 45,16 39,12 47,12" fill="none" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="50" cy="14" r="2" fill="#2d6a4f" />
                  <path d="M34,14 C30,12 30,18 34,14" fill="#2d6a4f" />
                  <path d="M66,14 C70,12 70,18 66,14" fill="#2d6a4f" />
                </svg>
                <span className="ornament-dots">•••</span>
              </div>
              <h3 className="stats-badge__title">Statistika</h3>
              <div className="stats-badge__ornament">
                <svg viewBox="0 0 100 20" width="30" height="10">
                  <path d="M50,12 C49.5,11.5 48.5,10.5 48.5,10 C48.5,9.5 49,9 49.5,9 C50,9 50,9.5 50,9.5 C50,9.5 50,9 50.5,9 C51,9 51.5,9.5 51.5,10 C51.5,10.5 50.5,11.5 50,12 Z" fill="#2d6a4f" />
                </svg>
              </div>
            </div>
          </div>
          <p className="stats-badge__quote">
            Ilm yo'lidagi har bir urinish - muvaffaqiyat poydevoridir.
          </p>
          <div className="dashboard__stats-vintage-grid">
            <div className="vintage-stat-box">
              <span className="vintage-stat-label">Jami savollar</span>
              <span className="vintage-stat-val">{stats.totalQuestions}</span>
              <div className="vintage-stat-decoration">❀</div>
            </div>
            <div className="vintage-stat-box">
              <span className="vintage-stat-label">Aniqlik darajasi</span>
              <span className="vintage-stat-val">{stats.accuracy}%</span>
              <div className="vintage-stat-decoration">❀</div>
            </div>
          </div>
          <div className="dashboard__stats-chart-paper">
            <div className="chart-paper-header">
              <span className="chart-paper-pin">📝 Haftalik faollik</span>
            </div>
            <div className="dashboard__chart">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={weeklyActivity}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#2d6a4f', fontFamily: 'Georgia, serif', fontStyle: 'italic' }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#faf6f0', border: '1px solid #2d6a4f', borderRadius: 8, fontSize: 11, fontFamily: 'Georgia, serif' }} />
                  <Bar dataKey="value" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
