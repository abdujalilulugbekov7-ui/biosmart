import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiClock, FiBookOpen, FiTarget, FiLock, FiStar, FiCheck } from 'react-icons/fi';
import './DigitalLibrary.css';

const isProTopicId = (id) => parseInt(id) >= 500;

const gradeImages = ['🔬', '🧫', '🦎', '🧬', '🦠', '🧪', '🌿'];
const gradeSubjects = ['Biologiya', 'Botanika', 'Zoologiya', 'Odam va uning salomatligi', 'Biologiya', 'Biologiya', 'Biologiya'];

const renderBookIllustration = (index) => {
  switch (index) {
    case 0: // 5-Sinf
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M42,70 L58,70 M50,70 L50,60 M45,60 L55,60 M50,60 C40,60 38,45 42,38 L42,32 M42,35 L48,35 M50,30 L55,30 M53,22 L57,30 L45,36 L41,28 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50,45 A5,5 0 1,1 49.9,45 Z" fill="currentColor" />
          <path d="M25,50 Q30,45 35,50 Q30,55 25,50" fill="currentColor" opacity="0.7" />
          <path d="M75,50 Q70,45 65,50 Q70,55 75,50" fill="currentColor" opacity="0.7" />
        </svg>
      );
    case 1: // 6-Sinf - Botanika
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50,80 C50,80 50,25 50,20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M50,30 C65,35 68,45 50,55 C65,58 63,70 50,75 C35,75 37,58 50,55 C35,45 35,35 50,30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50,40 C56,43 50,50 50,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50,55 C56,58 50,65 50,65" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50,40 C44,43 50,50 50,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50,55 C44,58 50,65 50,65" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 2: // 7-Sinf - Zoologiya
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50,80 C50,80 53,72 52,62 C51,52 60,47 57,37 C54,27 50,15 50,15 C50,15 46,27 43,37 C40,47 49,52 48,62 C47,72 50,80 50,80 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M44,32 Q30,27 35,22 Q38,25 44,32 M56,32 Q70,27 65,22 Q62,25 56,32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M46,52 Q32,57 36,62 Q39,59 46,52 M54,52 Q68,57 64,62 Q61,59 54,52" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M50,80 C50,80 46,85 43,83 C40,81 43,77 45,79 C47,81 45,86 41,86 C37,86 35,82 39,78" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 3: // 8-Sinf - Odam va uning salomatligi
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50,72 C32,62 32,44 43,34 C46,31 50,37 50,37 C50,37 54,31 57,34 C68,44 68,62 50,72 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M47,34 L47,20 M53,35 L53,18 M43,36 L38,24 M57,36 L62,24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M38,24 Q34,19 30,25 Q34,31 38,24" fill="currentColor" opacity="0.8" />
          <path d="M62,24 Q66,19 70,25 Q66,31 62,24" fill="currentColor" opacity="0.8" />
        </svg>
      );
    case 4: // 9-Sinf - Biologiya
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M35,30 Q50,45 65,30 M35,45 Q50,60 65,45 M35,60 Q50,75 65,60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M65,30 Q50,15 35,30 M65,45 Q50,30 35,45 M65,60 Q50,45 35,60 M65,75 Q50,60 35,75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="42" y1="28" x2="58" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <line x1="38" y1="38" x2="62" y2="38" stroke="currentColor" strokeWidth="1.5" />
          <line x1="38" y1="52" x2="62" y2="52" stroke="currentColor" strokeWidth="1.5" />
          <line x1="42" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="1.5" />
          <line x1="46" y1="71" x2="54" y2="71" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 5: // 10-Sinf - Biologiya
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <rect x="22" y="22" width="56" height="56" rx="14" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="27" y="27" width="46" height="46" rx="9" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          <path d="M34,36 Q37,41 40,33" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M66,36 Q63,41 60,33" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M36,66 C36,66 41,66 39,60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M64,66 C64,66 59,66 61,60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 6: // 11-Sinf - Biologiya
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50,72 L50,48 C50,48 41,43 36,36 M50,56 C50,56 59,48 64,43 M50,48 C50,48 45,38 48,30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="36" cy="36" r="3.5" fill="currentColor" />
          <circle cx="64" cy="43" r="3.5" fill="currentColor" />
          <circle cx="48" cy="30" r="3.5" fill="currentColor" />
          <circle cx="50" cy="22" r="4.5" fill="currentColor" />
          <path d="M50,72 Q45,78 38,78 M50,72 Q55,78 62,78" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="book-svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="30" fontWeight="bold">B</text>
        </svg>
      );
  }
};

function ProUpgradeModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [upgrading, setUpgrading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setUpgrading(true);
    // Simulate transaction step and redirect to card checkout
    setTimeout(() => {
      onClose();
      navigate(`/premium?checkout=true&plan=${selectedPlan}`);
      setUpgrading(false);
    }, 1000);
  };

  return (
    <div className="pro-modal-overlay">
      <div className="pro-modal-content">
        <button className="pro-modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="pro-upgrade-view">
          <div className="pro-badge-glow">
            <FiStar /> PRO
          </div>
          <h2>BioSmart PRO-ga a'zo bo'ling!</h2>
          <p className="pro-subtitle">Tirik tabiat va ilg'or biologiya olamini to'liq cheklovlarsiz o'rganing</p>

          <div className="pro-features-list">
            <div className="pro-feature-item">
              <FiCheck className="feature-check" />
              <span>9, 10 va 11-sinflarning to'liq darsliklari</span>
            </div>
            <div className="pro-feature-item">
              <FiCheck className="feature-check" />
              <span>Cheksiz mavzulashtirilgan va aralash testlar</span>
            </div>
            <div className="pro-feature-item">
              <FiCheck className="feature-check" />
              <span>Xatolar ustida ishlash va batafsil tahlillar</span>
            </div>
            <div className="pro-feature-item">
              <FiCheck className="feature-check" />
              <span>Maxsus premium sertifikatlar 🏆</span>
            </div>
          </div>

          <div className="pro-plans-grid">
            <div 
              className={`pro-plan-card ${selectedPlan === 'monthly' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('monthly')}
            >
              <div className="plan-radio"></div>
              <div className="plan-details">
                <h4>Oylik obuna</h4>
                <p>Har oy avtomatik uzaytiriladi</p>
              </div>
              <div className="plan-price">
                <h3>29 000 UZS</h3>
                <span>/ oy</span>
              </div>
            </div>

            <div 
              className={`pro-plan-card ${selectedPlan === 'annual' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('annual')}
            >
              <div className="plan-radio"></div>
              <div className="plan-details">
                <h4>Yillik obuna <span className="save-badge">Tejamkor (40%)</span></h4>
                <p>Bir yil davomida to'liq cheksiz</p>
              </div>
              <div className="plan-price">
                <h3>199 000 UZS</h3>
                <span>/ yil</span>
              </div>
            </div>
          </div>

          <button 
            className="pro-btn pro-btn--primary" 
            onClick={handleUpgrade}
            disabled={upgrading}
          >
            {upgrading ? (
              <>
                <div className="pro-spinner"></div>
                <span>To'lov sahifasiga o'tilmoqda...</span>
              </>
            ) : (
              <span>To'lov oynasiga o'tish (Click) ⚡</span>
            )}
          </button>
          <p className="pro-modal-footer-note">Istalgan vaqtda sozlamalarda obunani bekor qilish mumkin</p>
        </div>
      </div>
    </div>
  );
}

export default function DigitalLibrary() {
  const { isPro } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
 
  const [selectedTopicIds, setSelectedTopicIds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
 
  const handleTopicSelect = (topicId) => {
    setSelectedTopicIds(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId) 
        : [...prev, topicId]
    );
  };

  const handleSearchQuery = async (query) => {
    setSearchLoading(true);
    try {
      const { data } = await supabase.from('topics').select('*');
      if (data) {
        const filtered = data.filter(topic => 
          topic.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      }
    } catch (e) {
      console.log(e);
    }
    setSearchLoading(false);
  };

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('grades').select('*').order('display_order');
      setGrades(data || []);
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  const handleGradeClick = async (grade, index) => {
    const isProGr = String(grade.name || '').toLowerCase().includes('9-sinf') ||
                    String(grade.name || '').toLowerCase().includes('10-sinf') ||
                    String(grade.name || '').toLowerCase().includes('11-sinf');
    if (isProGr && !isPro) {
      setShowUpgradeModal(true);
      return;
    }

    setSelectedTopicIds([]);
    setSelectedGrade({ ...grade, emoji: gradeImages[index], subjectName: gradeSubjects[index] });
    setSelectedSubject(null);
    try {
      const { data } = await supabase.from('subjects').select('*').eq('grade_id', grade.id);
      setSubjects(data || []);
      if (data && data.length > 0) {
        handleSubjectClick(data[0]);
      }
    } catch (e) { console.log(e); }
  };

  const handleSubjectClick = async (subject) => {
    setSelectedTopicIds([]);
    setSelectedSubject(subject);
    try {
      const { data } = await supabase.from('topics').select('*').eq('subject_id', subject.id).order('display_order');
      setTopics(data || []);
    } catch (e) { console.log(e); }
  };

  const getDifficultyClass = (d) => {
    if (d === 'Easy') return 'difficulty--easy';
    if (d === 'Medium') return 'difficulty--medium';
    return 'difficulty--hard';
  };

  const goBack = () => {
    setSelectedTopicIds([]);
    setSelectedSubject(null);
    setTopics([]);
    setSelectedGrade(null);
    setSubjects([]);
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      handleSearchQuery(query);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchParams]);

  return (
    <div className="library">
      <div className="library__header">
        {(selectedGrade || searchQuery) && (
          <button className="library__back" onClick={() => {
            if (searchQuery) {
              navigate('/library');
            } else {
              goBack();
            }
          }}>
            <FiArrowLeft /> Orqaga
          </button>
        )}
        <h1>Raqamli kutubxona</h1>
        {!selectedGrade && !searchQuery && <p>Sinfingizni tanlang</p>}
      </div>

      {searchQuery ? (
        <div className="library__content">
          <div className="library__content-header">
            <span className="library__content-emoji">🔍</span>
            <h2>"{searchQuery}" qidiruv natijalari</h2>
          </div>

          {searchLoading ? (
            <p className="library__loading">Qidirilmoqda...</p>
          ) : searchResults.length > 0 ? (
            <div className="topics-section">
              <div className="topics-grid">
                {searchResults.map((topic, i) => {
                  const gradeName = topic.subjects?.grades?.name || 'Biologiya';
                  const subjectName = topic.subjects?.name || 'Mavzu';
                  return (
                    <div key={topic.id} className="topic-card" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="topic-card__header">
                        <span className="topic-card__number">{gradeName} • {subjectName}</span>
                        <span className={`topic-card__difficulty ${getDifficultyClass(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      <div className="topic-card__info">
                        <h4>{topic.title}</h4>
                        <div className="topic-card__meta">
                          <span className="topic-card__time"><FiClock /> {topic.reading_time} min</span>
                        </div>
                      </div>
                      <div className="topic-card__actions">
                        <button className="topic-card__read-btn" onClick={() => {
                          if (isProTopicId(topic.id) && !isPro) {
                            setShowUpgradeModal(true);
                          } else {
                            navigate(`/library/read/${topic.id}`);
                          }
                        }} title="Mavzuni o'qish">
                          <FiBookOpen /> <span className="btn-text">O'qish</span>
                        </button>
                        <button className="topic-card__test-btn" onClick={() => {
                          if (isProTopicId(topic.id) && !isPro) {
                            setShowUpgradeModal(true);
                          } else {
                            navigate(`/test/${topic.id}`);
                          }
                        }} title="Testni boshlash">
                          <FiTarget /> <span className="btn-text">Test</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="library__empty">Hech qanday darslik yoki mavzu topilmadi</p>
          )}
        </div>
      ) : !selectedGrade ? (
        <div className="library__grades">
          {grades.map((g, i) => {
            const isProGr = String(g.name || '').toLowerCase().includes('9-sinf') ||
                            String(g.name || '').toLowerCase().includes('10-sinf') ||
                            String(g.name || '').toLowerCase().includes('11-sinf');
            return (
              <div
                key={g.id}
                className="book-wrapper"
                onClick={() => handleGradeClick(g, i)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`book-card book-card--theme-${i + 5} ${isProGr && !isPro ? 'book-card--locked' : ''}`}>
                  <div className="book-card__spine">
                    <span className="book-card__spine-title">{g.name}</span>
                  </div>
                  <div className="book-card__spine-edge"></div>
                  <div className="book-card__cover">
                    <div className="book-card__foil-border"></div>
                    <div className="book-card__header">
                      <span className="book-card__grade-badge">{g.name}</span>
                      {isProGr && !isPro ? (
                        <span className="book-card__pro-badge"><FiLock /> PRO</span>
                      ) : isProGr ? (
                        <span className="book-card__pro-badge unlocked"><FiStar /> PRO</span>
                      ) : (
                        <span className="book-card__subject-label">Darslik</span>
                      )}
                    </div>
                    <div className="book-card__illustration">
                      {renderBookIllustration(i)}
                    </div>
                    <div className="book-card__title-section">
                      <h3 className="book-card__main-title">{gradeSubjects[i] || 'Biologiya'}</h3>
                    </div>
                    <div className="book-card__footer">
                      <span className="book-card__author-sign">UMUMIY TA'LIM</span>
                    </div>
                  </div>
                  <div className="book-card__pages"></div>
                  <div className="book-card__ribbon"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="library__content">
          <div className="library__content-header">
            <span className="library__content-emoji">{selectedGrade.emoji}</span>
            <h2>{selectedGrade.name} {selectedSubject?.name || selectedGrade.subjectName}</h2>
          </div>

          {selectedSubject && topics.length > 0 ? (
            <div className="topics-section">
              <div className="topics-section__header">
                <h3 className="topics-section__title">Mavzular va Testlar</h3>
                <div className="topics-section__actions">
                  <button
                    className="library-action-btn library-action-btn--select-all"
                    onClick={() => {
                      const allTopicIds = topics.map(t => t.id);
                      const isAllSelected = allTopicIds.every(id => selectedTopicIds.includes(id));
                      if (isAllSelected) {
                        setSelectedTopicIds(prev => prev.filter(id => !allTopicIds.includes(id)));
                      } else {
                        setSelectedTopicIds(prev => [...new Set([...prev, ...allTopicIds])]);
                      }
                    }}
                  >
                    {topics.map(t => t.id).every(id => selectedTopicIds.includes(id))
                      ? "❌ Tanlovni o'chirish"
                      : "✔️ Barchasini tanlash"}
                  </button>
                  {selectedTopicIds.length > 0 && (
                    <button 
                      className="library-action-btn library-action-btn--custom"
                      onClick={() => {
                        navigate(`/test/custom?topic_ids=${selectedTopicIds.join(',')}`);
                      }}
                    >
                      ⚡ Testni boshlash ({selectedTopicIds.length} mavzu)
                    </button>
                  )}
                  <button 
                    className={`library-action-btn library-action-btn--mixed ${(!isPro && selectedSubject.id !== 1) ? 'library-action-btn--locked' : ''}`} 
                    onClick={() => {
                      if (!isPro && selectedSubject.id !== 1) {
                        setShowUpgradeModal(true);
                      } else {
                        navigate(`/test/mixed?subject_id=${selectedSubject.id}`);
                      }
                    }}
                  >
                    🔀 Aralash test {(!isPro && selectedSubject.id !== 1) && <FiLock style={{ marginLeft: '4px', fontSize: '12px' }} />}
                  </button>
                  <button 
                    className={`library-action-btn library-action-btn--mistakes ${!isPro ? 'library-action-btn--locked' : ''}`} 
                    onClick={() => {
                      if (!isPro) {
                        setShowUpgradeModal(true);
                      } else {
                        navigate('/library/mistakes', { state: { defaultGrade: selectedGrade.name } });
                      }
                    }}
                  >
                    ❌ Xato javoblar {!isPro && <FiLock style={{ marginLeft: '4px', fontSize: '12px' }} />}
                  </button>
                </div>
              </div>

              {selectedTopicIds.length > 0 && (
                <div className="topics-selection-info animate-fade-in">
                  <span>💡 <strong>{selectedTopicIds.length} ta mavzu</strong> tanlandi. Tanlangan mavzular bo'yicha to'liq 100 ta test topshirig'ini bajarish uchun yuqoridagi "Testni boshlash" tugmasini bosing!</span>
                  <button className="clear-selection-btn" onClick={() => setSelectedTopicIds([])}>Tanlovni tozalash</button>
                </div>
              )}
              
              <div className="topics-grid">
                {/* Normal Topic Cards */}
                {topics.map((topic, i) => {
                  const isSelected = selectedTopicIds.includes(topic.id);
                  return (
                    <div 
                      key={topic.id} 
                      className={`topic-card ${isSelected ? 'topic-card--selected' : ''}`} 
                      style={{ animationDelay: `${i * 0.05}s` }}
                      onClick={() => handleTopicSelect(topic.id)}
                    >
                      <div className="topic-card__header">
                        <div className="topic-card__select-container">
                          <div className={`topic-card__checkbox ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <FiCheck size={12} />}
                          </div>
                          <span className="topic-card__number">Mavzu {i + 1}</span>
                        </div>
                        <span className={`topic-card__difficulty ${getDifficultyClass(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      <div className="topic-card__info">
                        <h4>{topic.title}</h4>
                        <div className="topic-card__meta">
                          <span className="topic-card__time"><FiClock /> {topic.reading_time} min</span>
                        </div>
                      </div>
                      <div className="topic-card__actions">
                        <button 
                          className="topic-card__read-btn" 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isProTopicId(topic.id) && !isPro) {
                              setShowUpgradeModal(true);
                            } else {
                              navigate(`/library/read/${topic.id}`);
                            }
                          }} 
                          title="Mavzuni o'qish"
                        >
                          <FiBookOpen /> <span className="btn-text">O'qish</span>
                        </button>
                        <button 
                          className="topic-card__test-btn" 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isProTopicId(topic.id) && !isPro) {
                              setShowUpgradeModal(true);
                            } else {
                              navigate(`/test/${topic.id}`);
                            }
                          }} 
                          title="Testni boshlash"
                        >
                          <FiTarget /> <span className="btn-text">Test</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="library__empty">Mavzular topilmadi</p>
          )}
        </div>
      )}
      <ProUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
}
