import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useDialog } from '../context/DialogContext';
import { FiArrowLeft, FiClock, FiFileText, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX, FiCheckCircle } from 'react-icons/fi';
import './BookReader.css';

export default function BookReader() {
  const { topicId } = useParams();
  const { user, isPro } = useAuth();
  const { showAlert } = useDialog();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef(null);

  useEffect(() => {
    fetchTopic();
    synthRef.current = window.speechSynthesis;
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [topicId]);

  const fetchTopic = async () => {
    if (parseInt(topicId) >= 500 && !isPro) {
      await showAlert("Ushbu premium darslik faqat BioSmart PRO a'zolari uchun! ⚡", {
        title: "Premium Imkoniyat",
        variant: "warning"
      });
      navigate('/library');
      return;
    }
    setLoading(true);
    try {
      const { data } = await supabase
        .from('topics')
        .select('*, subjects(name, grades(name))')
        .eq('id', topicId)
        .single();
      setTopic(data);
      if (user) {
        // Track recent progress
        await supabase.from('user_progress').upsert({
          user_id: user.id,
          topic_id: parseInt(topicId),
          progress: 50, // Reading page initialized
          last_accessed: new Date().toISOString(),
        });
      }
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
    setProgress(scrollPercent);
  };

  const handleFinish = async () => {
    if (user) {
      try {
        await supabase.from('user_progress').upsert({
          user_id: user.id,
          topic_id: parseInt(topicId),
          progress: 100,
          last_accessed: new Date().toISOString(),
        });
      } catch (e) { console.log(e); }
    }
    navigate(`/test/${topicId}`);
  };

  const toggleSpeech = () => {
    if (!topic?.content) return;
    if (speaking) {
      synthRef.current.cancel();
      setSpeaking(false);
    } else {
      const plainText = topic.content.replace(/<[^>]*>/g, ''); // Strip html tags
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = 'uz-UZ'; // Fallback to uzbek voice support
      utterance.onend = () => setSpeaking(false);
      synthRef.current.speak(utterance);
      setSpeaking(true);
    }
  };

  if (loading) return (
    <div className="reader-loading">
      <svg viewBox="0 0 100 100" className="shield-spinner-svg" width="64" height="64" style={{ display: 'block', margin: '0 auto 16px' }}>
        <defs>
          <linearGradient id="reader-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2ecc71" />
            <stop offset="50%" stopColor="#27ae60" />
            <stop offset="100%" stopColor="#1e8449" />
          </linearGradient>
          <linearGradient id="reader-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#f1c40f" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
          <linearGradient id="reader-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
        <path d="M50,10 L85,25 L85,60 C85,78 70,90 50,95 C30,90 15,78 15,60 L15,25 Z" fill="url(#reader-shield-grad)" stroke="url(#reader-gold-grad)" strokeWidth="3" />
        <path d="M50,15 L78,28 L78,58 C78,73 66,84 50,89 C34,84 22,73 22,58 L22,28 Z" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <path d="M35,35 Q50,50 65,35" fill="none" stroke="url(#reader-gold-grad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M35,65 Q50,50 65,65" fill="none" stroke="url(#reader-gold-grad)" strokeWidth="4" strokeLinecap="round" />
        <path d="M65,35 Q50,20 35,35" fill="none" stroke="url(#reader-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
        <path d="M65,65 Q50,80 35,65" fill="none" stroke="url(#reader-cyan-grad)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="42" y1="28" x2="58" y2="28" stroke="url(#reader-gold-grad)" strokeWidth="1.5" />
        <line x1="38" y1="35" x2="62" y2="35" stroke="url(#reader-gold-grad)" strokeWidth="1.5" />
        <line x1="38" y1="65" x2="62" y2="65" stroke="url(#reader-gold-grad)" strokeWidth="1.5" />
        <line x1="42" y1="72" x2="58" y2="72" stroke="url(#reader-gold-grad)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="5" fill="#ffffff" />
      </svg>
      <p>Yuklanmoqda...</p>
    </div>
  );
  if (!topic) return <div className="reader-loading"><p>Mavzu topilmadi.</p><button onClick={() => navigate('/library')} className="reader-back-btn">Kutubxonaga qaytish</button></div>;

  return (
    <div className="reader">
      <div className="reader__header">
        <button className="reader__back" onClick={() => navigate('/library')}>
          <FiArrowLeft /> Kutubxona
        </button>
        <div className="reader__actions">
          <button className="reader__speak" onClick={toggleSpeech} title="Audio darslik">
            {speaking ? <FiVolumeX /> : <FiVolume2 />}
            <span>{speaking ? 'To\'xtatish' : 'Tinglash'}</span>
          </button>
        </div>
      </div>

      <div className="reader__container">
        <div className="reader__progress-bar">
          <div className="reader__progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="reader__body" onScroll={handleScroll}>
          <h1 className="reader__title">{topic.title}</h1>
          <div className="reader__time-estimate">
            <FiClock /> {topic.reading_time} daqiqa o'qish vaqti
          </div>
          
          <div 
            className="reader__content html-content"
            dangerouslySetInnerHTML={{ __html: topic.content }}
          />

          <div className="reader__footer">
            <div className="reader__footer-card">
              <h3>Mavzuni tugatdingizmi?</h3>
              <p>O'z bilimingizni tekshirish uchun test rejimiga o'ting.</p>
              <button onClick={handleFinish} className="reader__finish-btn">
                Mavzuni yakunlash & Test boshlash <FiCheckCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
