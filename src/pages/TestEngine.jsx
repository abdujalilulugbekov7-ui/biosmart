import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useDialog } from '../context/DialogContext';
import { FiArrowRight, FiClock, FiCheckCircle, FiXCircle, FiBookOpen, FiSettings, FiPlay } from 'react-icons/fi';
import './TestEngine.css';

export default function TestEngine() {
  const { topicId } = useParams();
  const { user, isPro } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showAlert } = useDialog();
  
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  
  const [started, setStarted] = useState(false);
  const [questionsLimit, setQuestionsLimit] = useState(20);
  const [examMode, setExamMode] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [topicTitle, setTopicTitle] = useState('');
  
  const [userAnswers, setUserAnswers] = useState({});
  const timerRef = useRef(null);

  const fetchQuestions = async () => {
    const sId = searchParams.get('subject_id');
    const isProTopic = (topicId === 'mixed' && sId && parseInt(sId) !== 1) || topicId === 'mistakes' || (parseInt(topicId) >= 500);
    if (isProTopic && !isPro) {
      await showAlert("Ushbu premium imkoniyat (Aralash test, xatolar tahlili va yuqori sinf testlari) faqat BioSmart PRO a'zolari uchun! ⚡", {
        title: "Premium Imkoniyat",
        variant: "warning"
      });
      navigate('/library');
      return;
    }
    setLoading(true);
    try {
      if (topicId === 'mixed') {
        setTopicTitle("Aralash test");
        const sId = searchParams.get('subject_id');
        if (sId) {
          // 1. Fetch topics belonging to this subject
          const { data: topicsData } = await supabase
            .from('topics')
            .select('id')
            .eq('subject_id', parseInt(sId));
          
          if (topicsData && topicsData.length > 0) {
            const topicIds = topicsData.map(t => t.id);
            // 2. Fetch questions using .in filter
            const { data } = await supabase
              .from('questions')
              .select('*, question_options(*)')
              .in('topic_id', topicIds);
            
            setAllQuestions(data || []);
          } else {
            setAllQuestions([]);
          }
        } else {
          setAllQuestions([]);
        }
      } else if (topicId === 'custom') {
        setTopicTitle("Tanlangan mavzular bo'yicha test");
        setQuestionsLimit(100);
        const tIdsStr = searchParams.get('topic_ids');
        if (tIdsStr) {
          const topicIds = tIdsStr.split(',').map(Number);
          const { data } = await supabase
            .from('questions')
            .select('*, question_options(*)')
            .in('topic_id', topicIds);
          setAllQuestions(data || []);
        } else {
          setAllQuestions([]);
        }
      } else if (topicId === 'mistakes') {
        setTopicTitle("Xato javoblar ustida ishlash");
        const sId = searchParams.get('subject_id');
        const allWrong = JSON.parse(localStorage.getItem('biosmart_wrong_questions') || '[]');
        
        let filteredWrong = allWrong;
        if (sId) {
          const { data: topicsData } = await supabase
            .from('topics')
            .select('id')
            .eq('subject_id', parseInt(sId));
          const topicIds = (topicsData || []).map(t => t.id);
          filteredWrong = allWrong.filter(q => topicIds.includes(q.topic_id));
        }
        setAllQuestions(filteredWrong);
      } else {
        const { data: topic } = await supabase.from('topics').select('title').eq('id', topicId).single();
        if (topic) setTopicTitle(topic.title);

        const { data } = await supabase
          .from('questions')
          .select('*, question_options(*)')
          .eq('topic_id', topicId)
          .order('id');
        
        setAllQuestions(data || []);
      }
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
    const tId = parseInt(topicId);
    if (tId >= 101 && tId <= 118) {
      setQuestionsLimit(20);
    } else if (topicId === 'mixed') {
      setQuestionsLimit(100);
      setExamMode(true);
    }
    return () => clearInterval(timerRef.current);
  }, [topicId]);

  useEffect(() => {
    if (!loading && allQuestions.length > 0 && topicId === 'mixed' && !started && !finished) {
      // Auto-start mixed test immediately with 100 random questions in exam mode
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      const sliced = shuffled.slice(0, Math.min(100, shuffled.length));
      setQuestions(sliced);
      setQuestionsLimit(100);
      setExamMode(true);
      setStarted(true);
      setCurrentIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setFinished(false);
      setTimeElapsed(0);
      setUserAnswers({});
      timerRef.current = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    }
  }, [loading, allQuestions, topicId, started, finished]);

  const handleStartTest = () => {
    // Shuffled and sliced questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const sliced = shuffled.slice(0, Math.min(questionsLimit, shuffled.length));
    setQuestions(sliced);
    setStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setFinished(false);
    setTimeElapsed(0);
    setUserAnswers({});
    timerRef.current = setInterval(() => setTimeElapsed(t => t + 1), 1000);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const finishTest = async (finalUserAnswers = userAnswers) => {
    clearInterval(timerRef.current);
    setFinished(true);
    
    // Dynamic score calculation to prevent state race condition
    let computedScore = 0;
    const wrongQuestions = [];
    questions.forEach((q, idx) => {
      const ans = finalUserAnswers[idx];
      const isCorrect = ans && q.correct_answer && 
        ans.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
      if (isCorrect) {
        computedScore++;
      } else {
        wrongQuestions.push({
          ...q,
          user_answer: ans
        });
      }
    });
    setScore(computedScore);

    // Save incorrect questions and clean up corrected ones in localStorage
    try {
      const existingWrong = JSON.parse(localStorage.getItem('biosmart_wrong_questions') || '[]');
      const correctQuestionIds = questions
        .filter((q, idx) => {
          const ans = finalUserAnswers[idx];
          return ans && q.correct_answer && 
            ans.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
        })
        .map(q => q.id);
      
      // Filter out any questions they got correct this time
      let updatedWrong = existingWrong.filter(q => !correctQuestionIds.includes(q.id));
      
      // Add new wrong questions (avoiding duplicate objects)
      wrongQuestions.forEach(wq => {
        if (!updatedWrong.some(q => q.id === wq.id)) {
          updatedWrong.push(wq);
        }
      });
      localStorage.setItem('biosmart_wrong_questions', JSON.stringify(updatedWrong));
    } catch (err) {
      console.log("Error saving wrong questions to localStorage:", err);
    }

    const finalPercentage = questions.length > 0 ? Math.round((computedScore / questions.length) * 100) : 0;
    
    if (user) {
      try {
        await supabase.from('test_attempts').insert({
          user_id: user.id,
          topic_id: parseInt(topicId) || 0,
          score: computedScore,
          total_questions: questions.length,
          time_spent: timeElapsed,
        });

        if (topicId !== 'mixed' && topicId !== 'mistakes' && finalPercentage >= 80) {
          const { data: existingCert } = await supabase
            .from('certificates')
            .select('id')
            .eq('user_id', user.id)
            .eq('topic_id', parseInt(topicId))
            .maybeSingle();

          if (!existingCert) {
            await supabase.from('certificates').insert({
              user_id: user.id,
              topic_id: parseInt(topicId),
              score: finalPercentage,
            });
          }
        }
      } catch (e) { console.log(e); }
    }
  };

  const handleAnswer = (label) => {
    if (showResult && !examMode) return;
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(label);
    const updatedAnswers = { ...userAnswers, [currentIndex]: label };
    setUserAnswers(updatedAnswers);
    
    if (examMode) {
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(i => i + 1);
          setSelectedAnswer(null);
        } else {
          finishTest(updatedAnswers);
        }
      }, 300);
    } else {
      setShowResult(true);
      const currentQuestion = questions[currentIndex];
      const isCorrect = label && currentQuestion && currentQuestion.correct_answer && 
        label.trim().toLowerCase() === currentQuestion.correct_answer.trim().toLowerCase();
      if (isCorrect) {
        setScore(s => s + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      finishTest(userAnswers);
    }
  };

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (loading) return (
    <div className="test-loading">
      <svg viewBox="0 0 100 100" className="shield-spinner-svg" width="64" height="64" style={{ display: 'block', margin: '0 auto 16px' }}>
        <defs>
          <linearGradient id="test-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2ecc71" />
            <stop offset="50%" stopColor="#27ae60" />
            <stop offset="100%" stopColor="#1e8449" />
          </linearGradient>
          <linearGradient id="test-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#f1c40f" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
          <linearGradient id="test-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
        <path d="M50,10 L85,25 L85,60 C85,78 70,90 50,95 C30,90 15,78 15,60 L15,25 Z" fill="url(#test-shield-grad)" stroke="url(#test-gold-grad)" strokeWidth="3" />
        <path d="M50,15 L78,28 L78,58 C78,73 66,84 50,89 C34,84 22,73 22,58 L22,28 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <path d="M35,35 Q50,50 65,35" fill="none" stroke="url(#test-gold-grad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M35,65 Q50,50 65,65" fill="none" stroke="url(#test-gold-grad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M65,35 Q50,20 35,35" fill="none" stroke="url(#test-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
        <path d="M65,65 Q50,80 35,65" fill="none" stroke="url(#test-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="42" y1="28" x2="58" y2="28" stroke="url(#test-gold-grad)" strokeWidth="1.5" />
        <line x1="38" y1="35" x2="62" y2="35" stroke="url(#test-gold-grad)" strokeWidth="1.5" />
        <line x1="38" y1="65" x2="62" y2="65" stroke="url(#test-gold-grad)" strokeWidth="1.5" />
        <line x1="42" y1="72" x2="58" y2="72" stroke="url(#test-gold-grad)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="5" fill="#ffffff" />
      </svg>
      <p>Savollar yuklanmoqda...</p>
    </div>
  );
  
  if (allQuestions.length === 0) {
    return (
      <div className="test-loading">
        <p style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>
          {topicId === 'mistakes' ? "Ajoyib! Sizda xato qilingan savollar mavjud emas. 🎉" : "Bu bo'lim uchun savollar topilmadi."}
        </p>
        <button onClick={() => navigate('/library')} className="test-back-btn" style={{ marginTop: '16px' }}>
          Kutubxonaga qaytish
        </button>
      </div>
    );
  }

  const handleSelectExamMode = (isExam) => {
    setExamMode(isExam);
    if (isExam) {
      setQuestionsLimit(100);
    }
  };

  if (!started) {
    return (
      <div className="test-setup">
        <div className="test-setup__card">
          <div className="test-setup__icon">
            <svg viewBox="0 0 100 100" width="64" height="64" style={{ display: 'block', margin: '0 auto' }}>
              <defs>
                <linearGradient id="testsetup-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2ecc71" />
                  <stop offset="50%" stopColor="#27ae60" />
                  <stop offset="100%" stopColor="#1e8449" />
                </linearGradient>
                <linearGradient id="testsetup-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="50%" stopColor="#f1c40f" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
                <linearGradient id="testsetup-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
              </defs>
              <path d="M50,10 L85,25 L85,60 C85,78 70,90 50,95 C30,90 15,78 15,60 L15,25 Z" fill="url(#testsetup-shield-grad)" stroke="url(#testsetup-gold-grad)" strokeWidth="3" />
              <path d="M50,15 L78,28 L78,58 C78,73 66,84 50,89 C34,84 22,73 22,58 L22,28 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
              <path d="M35,35 Q50,50 65,35" fill="none" stroke="url(#testsetup-gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M35,65 Q50,50 65,65" fill="none" stroke="url(#testsetup-gold-grad)" strokeWidth="4" strokeLinecap="round" />
              <path d="M65,35 Q50,20 35,35" fill="none" stroke="url(#testsetup-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <path d="M65,65 Q50,80 35,65" fill="none" stroke="url(#testsetup-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
              <line x1="42" y1="28" x2="58" y2="28" stroke="url(#testsetup-gold-grad)" strokeWidth="1.5" />
              <line x1="38" y1="35" x2="62" y2="35" stroke="url(#testsetup-gold-grad)" strokeWidth="1.5" />
              <line x1="38" y1="65" x2="62" y2="65" stroke="url(#testsetup-gold-grad)" strokeWidth="1.5" />
              <line x1="42" y1="72" x2="58" y2="72" stroke="url(#testsetup-gold-grad)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="5" fill="#ffffff" />
            </svg>
          </div>
          <h2>{topicTitle || 'Biologiya Testi'}</h2>
          <p className="test-setup__subtitle">
            {parseInt(topicId) >= 101 && parseInt(topicId) <= 118
              ? "Mavzu yuzasidan bilimlaringizni sinab ko'ring. Savollar bankida 20 ta savol mavjud."
              : "Mavzu yuzasidan bilimlaringizni sinab ko'ring. Savollar bankida 100 ta takrorlanmas savol mavjud."}
          </p>
          
          <div className="test-setup__settings">
            <div className="test-setup__setting">
              <label><FiSettings /> Savollar soni:</label>
              <div className="test-setup__options-row">
                {((parseInt(topicId) >= 101 && parseInt(topicId) <= 118) ? [20] : (topicId === 'mixed' ? [100] : [10, 20, 50, 100])).map(num => (
                  <button 
                    key={num}
                    type="button" 
                    className={`test-setup__opt-btn ${questionsLimit === num ? 'active' : ''}`}
                    onClick={() => !examMode && topicId !== 'custom' && setQuestionsLimit(num)}
                    disabled={examMode || topicId === 'custom' || topicId === 'mixed'}
                    style={(examMode || topicId === 'custom' || topicId === 'mixed') && num !== questionsLimit ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                  >
                    {num} ta
                  </button>
                ))}
              </div>
              {examMode && topicId !== 'mixed' && (
                <p className="test-setup__info-tip" style={{ color: 'var(--primary)', fontSize: '11px', marginTop: '4px', fontStyle: 'italic' }}>
                  ⚠️ Imtihon rejimida savollar soni avtomatik ravishda 100 ta qilib belgilandi.
                </p>
              )}
              {topicId === 'mixed' && (
                <p className="test-setup__info-tip" style={{ color: 'var(--primary)', fontSize: '11px', marginTop: '4px', fontStyle: 'italic' }}>
                  ⚠️ Aralash test rejimi uchun savollar soni 100 ta qilib belgilandi.
                </p>
              )}
              {topicId === 'custom' && (
                <p className="test-setup__info-tip" style={{ color: '#00c6ff', fontSize: '11px', marginTop: '4px', fontStyle: 'italic' }}>
                  ⚡ Tanlangan mavzular bo'yicha test avtomatik ravishda 100 ta savoldan iborat qilib belgilandi.
                </p>
              )}
            </div>

            <div className="test-setup__setting">
              <label><FiBookOpen /> Test rejimi:</label>
              <div className="test-setup__options-row">
                <button 
                  type="button" 
                  className={`test-setup__opt-btn ${!examMode ? 'active' : ''}`}
                  onClick={() => topicId !== 'mixed' && handleSelectExamMode(false)}
                  disabled={topicId === 'mixed'}
                  style={topicId === 'mixed' ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                >
                  O'quv rejimi (Tushuntirishli)
                </button>
                <button 
                  type="button" 
                  className={`test-setup__opt-btn ${examMode ? 'active' : ''}`}
                  onClick={() => topicId !== 'mixed' && handleSelectExamMode(true)}
                  disabled={topicId === 'mixed'}
                  style={topicId === 'mixed' ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                >
                  Imtihon rejimi
                </button>
              </div>
              <p className="test-setup__desc">
                {topicId === 'mixed'
                  ? "Aralash test faqat imtihon rejimida o'tkaziladi. Javoblar va foizlar faqat test yakunida ko'rsatiladi."
                  : (!examMode 
                    ? "Har bir savolga javob bergach, to'g'ri javob va uning batafsil biologik izohi ko'rsatiladi." 
                    : "Haqiqiy imtihon muhiti. Javoblar faqat test yakunida umumiy hisobotda ko'rsatiladi.")}
              </p>
            </div>
          </div>

          <button onClick={handleStartTest} className="test-setup__start-btn">
            <FiPlay /> Testni boshlash
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const totalCount = questions.length;
    const correctCount = score;
    const incorrectCount = totalCount - correctCount;

    return (
      <div className="test-finished-wrapper">
        <div className="test-finished">
          <div className="test-finished__card">
            <h2>Test yakunlandi!</h2>
            
            <div className="test-finished__circle-container">
              <svg className="progress-ring" width="160" height="160">
                <circle
                  className="progress-ring__background"
                  stroke="var(--border-light)"
                  strokeWidth="10"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
                <circle
                  className="progress-ring__circle"
                  stroke="var(--success)"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
              </svg>
              <div className="test-finished__circle-text">
                <span className="test-finished__circle-percent">{percentage}%</span>
              </div>
            </div>

            <div className="test-finished__stats-grid">
              <div className="stat-card stat-card--correct">
                <FiCheckCircle className="stat-card__icon" />
                <div className="stat-card__info">
                  <span className="stat-card__label">To'g'ri</span>
                  <span className="stat-card__value">{correctCount}</span>
                </div>
              </div>
              
              <div className="stat-card stat-card--wrong">
                <FiXCircle className="stat-card__icon" />
                <div className="stat-card__info">
                  <span className="stat-card__label">Noto'g'ri</span>
                  <span className="stat-card__value">{incorrectCount}</span>
                </div>
              </div>
              
              <div className="stat-card stat-card--total">
                <FiPlay className="stat-card__icon" />
                <div className="stat-card__info">
                  <span className="stat-card__label">Jami</span>
                  <span className="stat-card__value">{totalCount}</span>
                </div>
              </div>
            </div>

            <p className="test-finished__time"><FiClock /> Vaqt: {formatTime(timeElapsed)}</p>
            
            <p className="test-finished__message">
              {percentage >= 80 ? '🎉 Ajoyib natija!' : percentage >= 50 ? '👍 Yaxshi harakat!' : '📚 Ko\'proq mashq qiling!'}
            </p>

            <div className="test-finished__actions">
              <button onClick={handleStartTest}>
                Qayta boshlash
              </button>
              <button onClick={() => navigate('/library')}>Kutubxonaga qaytish</button>
            </div>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="test-finished__review">
          <h3>Savollar tahlili:</h3>
          <div className="test-finished__review-list">
            {questions.map((q, idx) => {
              const userAns = userAnswers[idx];
              const isCorrect = userAns && q.correct_answer && 
                userAns.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
              return (
                <div key={q.id} className={`test-finished__review-item ${isCorrect ? 'correct' : 'wrong'}`}>
                  <div className="test-finished__review-q">
                    <strong>{idx + 1}.</strong> {q.question_text}
                  </div>
                  <div className="test-finished__review-ans">
                    <span>Sizning javobingiz: <strong className={isCorrect ? 'text-success' : 'text-danger'}>{userAns || 'Belgilanmagan'}</strong></span>
                    {!isCorrect && <span>To'g'ri javob: <strong className="text-success">{q.correct_answer}</strong></span>}
                  </div>
                  <ul className="test-finished__review-opts">
                    {q.question_options?.sort((a,b) => a.option_label.localeCompare(b.option_label)).map(opt => {
                      const isOptCorrect = opt.option_label && q.correct_answer && 
                        opt.option_label.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
                      const isOptWrong = userAns && opt.option_label && 
                        opt.option_label.trim().toLowerCase() === userAns.trim().toLowerCase();
                      return (
                        <li key={opt.id} className={isOptCorrect ? 'correct-opt' : isOptWrong ? 'wrong-opt' : ''}>
                          <strong>{opt.option_label})</strong> {opt.option_text}
                        </li>
                      );
                    })}
                  </ul>
                  {q.explanation && (
                    <div className="test-finished__review-exp">
                      <strong>Tushuntirish:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];
  if (!q) {
    return (
      <div className="test-loading">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }
  const options = q.question_options?.sort((a, b) => a.option_label.localeCompare(b.option_label)) || [];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="test-engine">
      <div className="test-engine__header">
        <div className="test-engine__info">
          <h2>Test — {topicTitle}</h2>
          <span>Savol {currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="test-engine__progress-bar">
          <div className="test-engine__progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="test-engine__timer">
          <FiClock /> {formatTime(timeElapsed)}
        </div>
      </div>

      <div className="test-engine__body">
        <div className="test-engine__question">
          <span className="test-engine__q-number">{currentIndex + 1}.</span>
          <h3>{q.question_text}</h3>
        </div>

        <div className="test-engine__options">
          {options.map(opt => {
            let cls = 'test-option';
            if (showResult) {
              if (opt.option_label === q.correct_answer) cls += ' test-option--correct';
              else if (opt.option_label === selectedAnswer && selectedAnswer !== q.correct_answer) cls += ' test-option--wrong';
            } else if (selectedAnswer === opt.option_label) {
              cls += ' test-option--selected';
            }
            return (
              <button key={opt.id} className={cls} onClick={() => handleAnswer(opt.option_label)} disabled={showResult || (examMode && selectedAnswer !== null)}>
                <span className="test-option__label">{opt.option_label})</span>
                <span className="test-option__text">{opt.option_text}</span>
                {showResult && opt.option_label === q.correct_answer && <FiCheckCircle className="test-option__icon test-option__icon--correct" />}
                {showResult && opt.option_label === selectedAnswer && selectedAnswer !== q.correct_answer && <FiXCircle className="test-option__icon test-option__icon--wrong" />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`test-engine__feedback ${selectedAnswer === q.correct_answer ? 'test-engine__feedback--correct' : 'test-engine__feedback--wrong'}`}>
            <p><strong>{selectedAnswer === q.correct_answer ? '✅ To\'g\'ri!' : '❌ Noto\'g\'ri!'}</strong></p>
            {q.explanation && <p>{q.explanation}</p>}
          </div>
        )}

        {showResult && (
          <button className="test-engine__next-btn" onClick={nextQuestion}>
            {currentIndex < questions.length - 1 ? 'Keyingi savol' : 'Yakunlash'} <FiArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
