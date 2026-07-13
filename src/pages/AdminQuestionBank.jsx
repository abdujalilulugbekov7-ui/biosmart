import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useDialog } from '../context/DialogContext';
import { FiArrowLeft, FiPlus, FiTrash, FiEdit2 } from 'react-icons/fi';
import './AdminQuestionBank.css';

export default function AdminQuestionBank() {
  const [searchParams] = useSearchParams();
  const gradeId = searchParams.get('grade');
  const navigate = useNavigate();
  const { showAlert, showConfirm } = useDialog();

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Question form state
  const [questionText, setQuestionText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (gradeId) {
      fetchSubjects();
    }
  }, [gradeId]);

  const fetchSubjects = async () => {
    try {
      const { data } = await supabase.from('subjects').select('*').eq('grade_id', gradeId);
      setSubjects(data || []);
      if (data && data.length > 0) {
        setSelectedSubjectId(data[0].id.toString());
        fetchTopics(data[0].id);
      }
    } catch (e) { console.log(e); }
  };

  const handleSubjectChange = (e) => {
    const subId = e.target.value;
    setSelectedSubjectId(subId);
    fetchTopics(subId);
  };

  const fetchTopics = async (subId) => {
    try {
      const { data } = await supabase.from('topics').select('*').eq('subject_id', subId);
      setTopics(data || []);
      if (data && data.length > 0) {
        setSelectedTopicId(data[0].id.toString());
        fetchQuestions(data[0].id);
      } else {
        setSelectedTopicId('');
        setQuestions([]);
      }
    } catch (e) { console.log(e); }
  };

  const handleTopicChange = (e) => {
    const topId = e.target.value;
    setSelectedTopicId(topId);
    fetchQuestions(topId);
  };

  const fetchQuestions = async (topId) => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('questions')
        .select('*, question_options(*)')
        .eq('topic_id', topId)
        .order('id');
      setQuestions(data || []);
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    if (!selectedTopicId) {
      await showAlert('Avval mavzu tanlang', {
        title: "Mavzu tanlanmagan",
        variant: "warning"
      });
      return;
    }

    const questionData = {
      topic_id: parseInt(selectedTopicId),
      question_text: questionText,
      correct_answer: correctAnswer,
      explanation: explanation,
    };

    try {
      let qId = editingId;
      if (editingId) {
        // Update question
        await supabase.from('questions').update(questionData).eq('id', editingId);
        
        // Delete old options
        await supabase.from('question_options').delete().eq('question_id', editingId);
      } else {
        // Insert new question
        const { data } = await supabase.from('questions').insert(questionData).select().single();
        qId = data.id;
      }

      // Insert fresh options
      const options = [
        { question_id: qId, option_label: 'A', option_text: optA },
        { question_id: qId, option_label: 'B', option_text: optB },
        { question_id: qId, option_label: 'C', option_text: optC },
        { question_id: qId, option_label: 'D', option_text: optD },
      ];
      await supabase.from('question_options').insert(options);

      // Reset form
      setQuestionText('');
      setExplanation('');
      setCorrectAnswer('A');
      setOptA('');
      setOptB('');
      setOptC('');
      setOptD('');
      setEditingId(null);

      // Refresh
      fetchQuestions(selectedTopicId);
    } catch (e) { console.log(e); }
  };

  const handleEdit = (q) => {
    setEditingId(q.id);
    setQuestionText(q.question_text);
    setExplanation(q.explanation || '');
    setCorrectAnswer(q.correct_answer);

    const aOpt = q.question_options?.find(o => o.option_label === 'A')?.option_text || '';
    const bOpt = q.question_options?.find(o => o.option_label === 'B')?.option_text || '';
    const cOpt = q.question_options?.find(o => o.option_label === 'C')?.option_text || '';
    const dOpt = q.question_options?.find(o => o.option_label === 'D')?.option_text || '';

    setOptA(aOpt);
    setOptB(bOpt);
    setOptC(cOpt);
    setOptD(dOpt);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await showConfirm('Savolni o\'chirmoqchimisiz?', {
      title: "Savolni o'chirish",
      variant: "danger",
      confirmText: "O'chirish",
      cancelText: "Bekor qilish"
    });
    if (!confirmDelete) return;
    try {
      await supabase.from('questions').delete().eq('id', id);
      fetchQuestions(selectedTopicId);
    } catch (e) { console.log(e); }
  };

  return (
    <div className="admin-q">
      <button className="admin-q__back" onClick={() => navigate('/admin')}>
        <FiArrowLeft /> Orqaga
      </button>

      <div className="admin-q__header">
        <h1>Savollar bankini boshqarish 📝</h1>
        <p>Mavzu bo'yicha savollarni qo'shing yoki o'zgartiring</p>
      </div>

      <div className="admin-q__selectors">
        <div className="admin-q__group">
          <label>Fan / Bo'lim</label>
          <select value={selectedSubjectId} onChange={handleSubjectChange}>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="admin-q__group">
          <label>Mavzu</label>
          <select value={selectedTopicId} onChange={handleTopicChange}>
            {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>
      </div>

      <div className="admin-q__grid">
        <form className="admin-q__form" onSubmit={handleSaveQuestion}>
          <h3>{editingId ? 'Savolni tahrirlash' : 'Yangi savol qo\'shish'}</h3>
          <div className="admin-q__field">
            <label>Savol matni</label>
            <textarea value={questionText} onChange={e => setQuestionText(e.target.value)} required rows={3} />
          </div>

          <div className="admin-q__options-grid">
            <div className="admin-q__field">
              <label>Variant A</label>
              <input type="text" value={optA} onChange={e => setOptA(e.target.value)} required />
            </div>
            <div className="admin-q__field">
              <label>Variant B</label>
              <input type="text" value={optB} onChange={e => setOptB(e.target.value)} required />
            </div>
            <div className="admin-q__field">
              <label>Variant C</label>
              <input type="text" value={optC} onChange={e => setOptC(e.target.value)} required />
            </div>
            <div className="admin-q__field">
              <label>Variant D</label>
              <input type="text" value={optD} onChange={e => setOptD(e.target.value)} required />
            </div>
          </div>

          <div className="admin-q__row">
            <div className="admin-q__field">
              <label>To'g'ri javob</label>
              <select value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="admin-q__field">
              <label>Tushuntirish (ixtiyoriy)</label>
              <input type="text" value={explanation} onChange={e => setExplanation(e.target.value)} />
            </div>
          </div>

          <div className="admin-q__form-actions">
            <button type="submit">{editingId ? 'Yangilash' : 'Saqlash'}</button>
            {editingId && (
              <button type="button" onClick={() => {
                setEditingId(null); setQuestionText(''); setExplanation(''); setOptA(''); setOptB(''); setOptC(''); setOptD('');
              }} className="admin-q__cancel-btn">Bekor qilish</button>
            )}
          </div>
        </form>

        <div className="admin-q__list-section">
          <h3>Mavjud savollar ({questions.length} ta)</h3>
          {loading ? <p>Yuklanmoqda...</p> : (
            <div className="admin-q__list">
              {questions.map((q, i) => (
                <div key={q.id} className="admin-q__item">
                  <div className="admin-q__item-header">
                    <h4>Savol #{i + 1}</h4>
                    <div className="admin-q__item-actions">
                      <button onClick={() => handleEdit(q)}><FiEdit2 /></button>
                      <button onClick={() => handleDelete(q.id)} className="admin-q__item-delete"><FiTrash /></button>
                    </div>
                  </div>
                  <p className="admin-q__item-text">{q.question_text}</p>
                  <ul className="admin-q__item-opts">
                    {q.question_options?.map(o => (
                      <li key={o.id} className={o.option_label === q.correct_answer ? 'admin-q__opt--correct' : ''}>
                        <strong>{o.option_label})</strong> {o.option_text}
                      </li>
                    ))}
                  </ul>
                  {q.explanation && <p className="admin-q__item-exp"><strong>Tushuntirish:</strong> {q.explanation}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
