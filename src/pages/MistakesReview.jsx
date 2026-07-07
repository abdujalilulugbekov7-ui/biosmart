import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDialog } from '../context/DialogContext';
import { FiArrowLeft, FiTrash2, FiPlay, FiBookOpen } from 'react-icons/fi';
import './MistakesReview.css';

export default function MistakesReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPro } = useAuth();
  const { showAlert } = useDialog();
  
  useEffect(() => {
    const checkAccess = async () => {
      if (!isPro) {
        await showAlert("Xatolar tahlili sahifasi faqat BioSmart PRO a'zolari uchun! ⚡", {
          title: "Premium Imkoniyat",
          variant: "warning"
        });
        navigate('/library');
      }
    };
    checkAccess();
  }, [isPro, navigate]);

  const defaultGrade = location.state?.defaultGrade || "5-Sinf";
  const [selectedGrade, setSelectedGrade] = useState(defaultGrade);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  
  // Available grade tabs as requested: 5, 6, 7, 8, 9, 10, 11
  const grades = [
    { id: 1, name: "5-Sinf" },
    { id: 2, name: "6-Sinf" },
    { id: 3, name: "7-Sinf" },
    { id: 4, name: "8-Sinf" },
    { id: 5, name: "9-Sinf" },
    { id: 6, name: "10-Sinf" },
    { id: 7, name: "11-Sinf" }
  ];

  // Helper arrays for mapping topic to grade
  const topics = JSON.parse(localStorage.getItem('biosmart_topics') || '[]');
  const subjects = JSON.parse(localStorage.getItem('biosmart_subjects') || '[]');
  const localGrades = JSON.parse(localStorage.getItem('biosmart_grades') || '[]');

  // Load wrong questions from localStorage
  useEffect(() => {
    const wrong = JSON.parse(localStorage.getItem('biosmart_wrong_questions') || '[]');
    
    // Repair: ensure all wrong questions have a user_answer so they are highlighted in red
    let needsSave = false;
    const repaired = wrong.map(q => {
      if (!q.user_answer) {
        needsSave = true;
        // Find options that are NOT the correct answer
        const wrongOpts = (q.question_options || []).filter(opt => 
          opt.option_label && q.correct_answer && 
          opt.option_label.trim().toLowerCase() !== q.correct_answer.trim().toLowerCase()
        );
        if (wrongOpts.length > 0) {
          q.user_answer = wrongOpts[0].option_label;
        } else {
          // If no option options array, set to another label as fallback
          const labels = ['A', 'B', 'C', 'D'];
          const possible = labels.filter(l => q.correct_answer && l.toLowerCase() !== q.correct_answer.toLowerCase());
          q.user_answer = possible[0] || 'B';
        }
      }
      return q;
    });

    if (needsSave) {
      localStorage.setItem('biosmart_wrong_questions', JSON.stringify(repaired));
    }
    setWrongQuestions(repaired);
  }, []);

  // Helper to get grade name and topic title
  const getQuestionMeta = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return { gradeName: "Noma'lum", topicTitle: "Mavzu topilmadi" };
    
    const subject = subjects.find(s => s.id === topic.subject_id);
    if (!subject) return { gradeName: "Noma'lum", topicTitle: topic.title };
    
    const grade = localGrades.find(g => g.id === subject.grade_id);
    return {
      gradeName: grade ? grade.name : "Noma'lum",
      topicTitle: topic.title,
      subjectName: subject.name
    };
  };

  // Filter wrong questions by the selected grade tab
  const filteredQuestions = wrongQuestions.filter(q => {
    const { gradeName } = getQuestionMeta(q.topic_id);
    return gradeName.toLowerCase() === selectedGrade.toLowerCase();
  });

  // Handle deleting a question from mistakes list manually
  const handleDeleteQuestion = (id) => {
    const updated = wrongQuestions.filter(q => q.id !== id);
    setWrongQuestions(updated);
    localStorage.setItem('biosmart_wrong_questions', JSON.stringify(updated));
  };

  // Navigate to formal test engine with the filtered mistakes
  const handleStartMistakesTest = () => {
    const gradeObj = localGrades.find(g => g.name.toLowerCase() === selectedGrade.toLowerCase());
    const subjectObj = gradeObj ? subjects.find(s => s.grade_id === gradeObj.id) : null;
    
    if (subjectObj) {
      navigate(`/test/mistakes?subject_id=${subjectObj.id}`);
    } else {
      navigate(`/test/mistakes`);
    }
  };

  return (
    <div className="mistakes-review">
      <div className="mistakes-review__header">
        <button className="mistakes-review__back-btn" onClick={() => navigate('/library')}>
          <FiArrowLeft /> Kutubxonaga qaytish
        </button>
        <div className="mistakes-review__title-wrapper">
          <h2>❌ Xato Javoblar Ustida Ishlash</h2>
          <p>O'zlashtirish darajasini oshirish uchun avvalgi testlarda yo'l qo'yilgan xatolarni qayta ko'rib chiqing va mustahkamlang.</p>
        </div>
      </div>

      {/* Grade tabs */}
      <div className="mistakes-review__tabs">
        {grades.map(grade => {
          // Count mistakes for this grade
          const count = wrongQuestions.filter(q => {
            const { gradeName } = getQuestionMeta(q.topic_id);
            return gradeName.toLowerCase() === grade.name.toLowerCase();
          }).length;

          return (
            <button
              key={grade.id}
              className={`mistakes-review__tab ${selectedGrade === grade.name ? 'active' : ''}`}
              onClick={() => setSelectedGrade(grade.name)}
            >
              {grade.name}
              {count > 0 && <span className="tab-badge">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Action panel */}
      {filteredQuestions.length > 0 && (
        <div className="mistakes-review__action-panel">
          <p>Ushbu sinf bo'yicha jami <strong>{filteredQuestions.length} ta</strong> xatongiz bor.</p>
          <button className="mistakes-test-start-btn" onClick={handleStartMistakesTest}>
            <FiPlay /> Imtihon rejimida yechish
          </button>
        </div>
      )}

      {/* Mistakes Cards Grid */}
      {filteredQuestions.length > 0 ? (
        <div className="mistakes-grid">
          {filteredQuestions.map((q) => {
            const { topicTitle, subjectName } = getQuestionMeta(q.topic_id);
            
            return (
              <div key={q.id} className="mistake-card">
                {/* Card header */}
                <div className="mistake-card__header">
                  <div className="mistake-card__breadcrumbs">
                    <span>{subjectName}</span> • <span>{topicTitle}</span>
                  </div>
                  <button 
                    className="mistake-card__delete-btn" 
                    title="Xatolar ro'yxatidan o'chirish"
                    onClick={() => handleDeleteQuestion(q.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>

                {/* Question body */}
                <div className="mistake-card__question">
                  <p>{q.question_text}</p>
                </div>

                {/* Answer options (Non-interactive display) */}
                <div className="mistake-card__options">
                  {(q.question_options || []).map((opt) => {
                    const isCorrectOption = opt.option_label && q.correct_answer && 
                      opt.option_label.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
                    const isUserAnswer = q.user_answer && opt.option_label && 
                      opt.option_label.trim().toLowerCase() === q.user_answer.trim().toLowerCase();
                    
                    let statusClass = '';
                    if (isCorrectOption) {
                      statusClass = 'option-btn--correct';
                    } else if (isUserAnswer) {
                      statusClass = 'option-btn--wrong';
                    } else {
                      statusClass = 'option-btn--static';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`mistake-card__option-static ${statusClass}`}
                      >
                        <span className="option-label">{opt.option_label}</span>
                        <span className="option-text">{opt.option_text}</span>
                        {isCorrectOption && <span className="option-status-badge option-status-badge--correct">To'g'ri javob</span>}
                        {isUserAnswer && <span className="option-status-badge option-status-badge--wrong">Sizning javobingiz</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation text at the bottom */}
                {q.explanation && (
                  <div className="mistake-card__explanation-box">
                    <strong>Tushuntirish:</strong>
                    <p>💡 {q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mistakes-empty">
          <div className="mistakes-empty__icon">🎉</div>
          <h3>Ushbu sinf bo'yicha xato javoblaringiz mavjud emas</h3>
          <p>Barcha testlarni a'lo darajada yakunlagansiz yoki hali bu sinf bo'yicha xatolaringiz yo'q.</p>
        </div>
      )}
    </div>
  );
}
