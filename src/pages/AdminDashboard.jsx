// Biosmart Admin Dashboard Configurator
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../context/DialogContext';
import { 
  FiUsers, 
  FiBookOpen, 
  FiFileText, 
  FiPlus, 
  FiTrash, 
  FiArrowRight, 
  FiSearch, 
  FiEdit2, 
  FiSave, 
  FiX, 
  FiShield, 
  FiAward,
  FiBell,
  FiGift,
  FiPercent,
  FiDollarSign,
  FiCheck,
  FiXCircle
} from 'react-icons/fi';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function AdminDashboard() {
  const { showAlert, showConfirm } = useDialog();
  const [stats, setStats] = useState({ users: 0, topics: 0, tests: 0, totalRevenue: 0, pendingPayments: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Tabs state
  const [activeTab, setActiveTab] = useState('overview');

  // Users tab state
  const [profilesList, setProfilesList] = useState([]);
  const [attemptsCountMap, setAttemptsCountMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [userEditing, setUserEditing] = useState(null); // stores the profile id currently being edited
  const [editRole, setEditRole] = useState('user');
  const [editGrade, setEditGrade] = useState('6-sinf');
  const [usersLoading, setUsersLoading] = useState(false);

  // Announcements tab state
  const [announcementsList, setAnnouncementsList] = useState([]);
  const [announcementText, setAnnouncementText] = useState('');

  // Promocodes tab state
  const [promocodesList, setPromocodesList] = useState([]);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState('');
  const [promoError, setPromoError] = useState('');

  // Payments tab state
  const [paymentsList, setPaymentsList] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState('pending');

  useEffect(() => {
    fetchStats();
    fetchRecentUsers();
    fetchGrades();
    fetchAllProfiles();
    fetchAnnouncements();
    fetchPromocodes();
    fetchPayments();
  }, [paymentFilter]);

  const getToken = async () => {
    const session = await supabase.auth.getSession();
    return session?.data?.session?.access_token;
  };

  const fetchStats = async () => {
    try {
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: topics } = await supabase.from('topics').select('*', { count: 'exact', head: true });
      const { count: tests } = await supabase.from('test_attempts').select('*', { count: 'exact', head: true });
      
      const token = await getToken();
      let adminStats = { totalRevenue: 0, pendingPayments: 0 };
      if (token) {
        try {
          const res = await fetch(`${API_URL}/api/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            adminStats = await res.json();
          }
        } catch (e) { /* server not running */ }
      }

      setStats({ users: users || 0, topics: topics || 0, tests: tests || 0, ...adminStats });
    } catch (e) { console.log(e); }
  };

  const fetchPayments = async () => {
    setPaymentsLoading(true);
    try {
      const token = await getToken();
      if (!token) return;
      const res = await fetch(`${API_URL}/api/admin/payments?status=${paymentFilter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPaymentsList(data);
      }
    } catch (e) { console.log(e); }
    setPaymentsLoading(false);
  };

  const handleApprovePayment = async (paymentId) => {
    const confirmApprove = await showConfirm(
      'Haqiqatdan ham ushbu to\'lovni tasdiqlashni istaysizmi? Obuna faollashtiriladi.',
      {
        title: "To'lovni tasdiqlash",
        variant: "success",
        confirmText: "Ha, tasdiqlash",
        cancelText: "Bekor qilish"
      }
    );
    if (!confirmApprove) return;
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/payments/${paymentId}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        await showAlert("To'lov tasdiqlandi! Obuna faollashtirildi ✅", {
          title: "Muvaffaqiyatli",
          variant: "success"
        });
        fetchPayments();
        fetchStats();
      } else {
        const err = await res.json();
        throw new Error(err.error);
      }
    } catch (e) {
      await showAlert(e.message, { title: 'Xatolik', variant: 'danger' });
    }
  };

  const handleRejectPayment = async (paymentId) => {
    const confirmReject = await showConfirm(
      'Haqiqatdan ham ushbu to\'lovni rad etmoqchimisiz?',
      {
        title: "To'lovni rad etish",
        variant: "danger",
        confirmText: "Ha, rad etish",
        cancelText: "Bekor qilish"
      }
    );
    if (!confirmReject) return;
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/payments/${paymentId}/reject`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        await showAlert("To'lov rad etildi ❌", {
          title: "Rad etildi",
          variant: "warning"
        });
        fetchPayments();
      } else {
        const err = await res.json();
        throw new Error(err.error);
      }
    } catch (e) {
      await showAlert(e.message, { title: 'Xatolik', variant: 'danger' });
    }
  };

  const fetchRecentUsers = async () => {
    try {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5);
      setRecentUsers(data || []);
    } catch (e) { console.log(e); }
  };

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('grades').select('*').order('display_order');
      setGrades(data || []);
    } catch (e) { console.log(e); }
    setLoading(false);
  };

  const fetchAllProfiles = async () => {
    setUsersLoading(true);
    try {
      const { data: profiles } = await supabase.from('profiles').select('*');
      const { data: attempts } = await supabase.from('test_attempts').select('*');
      
      const counts = {};
      (attempts || []).forEach(a => {
        counts[a.user_id] = (counts[a.user_id] || 0) + 1;
      });
      
      setProfilesList(profiles || []);
      setAttemptsCountMap(counts);
    } catch (e) { console.log(e); }
    setUsersLoading(false);
  };

  const fetchAnnouncements = () => {
    const list = JSON.parse(localStorage.getItem('biosmart_announcements') || '[]');
    // Sort newest first
    list.sort((a, b) => b.id.localeCompare(a.id));
    setAnnouncementsList(list);
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    if (!newGrade.trim()) return;
    try {
      await supabase.from('grades').insert({ name: newGrade, display_order: grades.length + 1 });
      setNewGrade('');
      fetchGrades();
      fetchStats();
    } catch (e) { console.log(e); }
  };

  const handleDeleteGrade = async (id) => {
    const confirmDelete = await showConfirm(
      'Haqiqatdan ham bu sinfni va unga tegishli barcha darsliklarni o\'chirmoqchimisiz?',
      {
        title: "Sinfni o'chirish",
        variant: "danger",
        confirmText: "O'chirish",
        cancelText: "Bekor qilish"
      }
    );
    if (!confirmDelete) return;
    try {
      await supabase.from('grades').delete().eq('id', id);
      fetchGrades();
      fetchStats();
    } catch (e) { console.log(e); }
  };

  // User Actions
  const handleStartUserEdit = (profile) => {
    setUserEditing(profile.id);
    setEditRole(profile.role || 'user');
    setEditGrade(profile.grade || '6-sinf');
  };

  const handleCancelUserEdit = () => {
    setUserEditing(null);
  };

  const handleSaveUserEdit = async (userId) => {
    try {
      await supabase
        .from('profiles')
        .update({ role: editRole, grade: editGrade })
        .eq('id', userId);
      
      setUserEditing(null);
      await fetchAllProfiles();
      await fetchStats();
      await fetchRecentUsers();
    } catch (e) {
      console.log("User save error:", e);
    }
  };

  const handleDeleteUser = async (userId, name) => {
    if (userId === 'admin-id') {
      await showAlert("Asosiy admin akkauntini o'chirib bo'lmaydi!", {
        title: "Taqiq",
        variant: "warning"
      });
      return;
    }
    const confirmDelete = await showConfirm(`Haqiqatdan ham "${name}" foydalanuvchisini o'chirishni istaysizmi?`, {
      title: "Foydalanuvchini o'chirish",
      variant: "danger",
      confirmText: "Ha, o'chirilsin",
      cancelText: "Bekor qilish"
    });
    if (!confirmDelete) return;
    
    try {
      await supabase.from('profiles').delete().eq('id', userId);
      await fetchAllProfiles();
      await fetchStats();
      await fetchRecentUsers();
    } catch (e) {
      console.log("Delete user error:", e);
    }
  };

  // Announcement Actions
  const handleSendAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;

    const list = JSON.parse(localStorage.getItem('biosmart_announcements') || '[]');
    const newAnn = {
      id: `ann-${Date.now()}`,
      text: announcementText.trim(),
      created_at: new Date().toISOString()
    };
    list.push(newAnn);
    localStorage.setItem('biosmart_announcements', JSON.stringify(list));

    setAnnouncementText('');
    fetchAnnouncements();

    // Dispatch custom event to notify Header on the same window/tab
    window.dispatchEvent(new Event('biosmart_new_announcement'));
    await showAlert("E'lon barcha foydalanuvchilarga yuborildi! 🔔", {
      title: "Yuborildi",
      variant: "success"
    });
  };

  const handleDeleteAnnouncement = async (id) => {
    const confirmDelete = await showConfirm("Haqiqatdan ham ushbu e'lonni o'chirib tashlamoqchimisiz?", {
      title: "E'lonni o'chirish",
      variant: "danger",
      confirmText: "O'chirish",
      cancelText: "Bekor qilish"
    });
    if (!confirmDelete) return;
    
    const list = JSON.parse(localStorage.getItem('biosmart_announcements') || '[]');
    const filtered = list.filter(ann => ann.id !== id);
    localStorage.setItem('biosmart_announcements', JSON.stringify(filtered));
    
    fetchAnnouncements();
    window.dispatchEvent(new Event('biosmart_new_announcement'));
  };

  const fetchPromocodes = () => {
    let list = localStorage.getItem('biosmart_promocodes');
    if (!list) {
      const defaults = [
        { id: 'p-1', code: 'BIOSMART', discount: 30, created_at: new Date().toISOString() },
        { id: 'p-2', code: 'PRO50', discount: 50, created_at: new Date().toISOString() },
        { id: 'p-3', code: 'FREE100', discount: 100, created_at: new Date().toISOString() }
      ];
      localStorage.setItem('biosmart_promocodes', JSON.stringify(defaults));
      list = JSON.stringify(defaults);
    }
    const parsed = JSON.parse(list);
    parsed.sort((a, b) => b.created_at.localeCompare(a.created_at));
    setPromocodesList(parsed);
  };

  const handleAddPromo = async (e) => {
    e.preventDefault();
    setPromoError('');
    
    const code = newPromoCode.trim();
    const discount = parseInt(newPromoDiscount);
    
    if (!code) {
      setPromoError("Promokod nomini kiriting.");
      return;
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(code)) {
      setPromoError("Promokod faqat inglizcha harflar (katta/kichik), raqamlar va chiziqcha/pastki chiziqdan iborat bo'lishi kerak.");
      return;
    }
    
    if (isNaN(discount) || discount < 0 || discount > 100) {
      setPromoError("Chegirma foizi 0 va 100 oralig'ida bo'lishi kerak.");
      return;
    }
    
    const exists = promocodesList.some(p => p.code === code);
    if (exists) {
      setPromoError("Ushbu nomdagi promokod allaqachon mavjud.");
      return;
    }
    
    const newPromo = {
      id: `promo-${Date.now()}`,
      code,
      discount,
      created_at: new Date().toISOString()
    };
    
    const updated = [newPromo, ...promocodesList];
    localStorage.setItem('biosmart_promocodes', JSON.stringify(updated));
    setPromocodesList(updated);
    
    setNewPromoCode('');
    setNewPromoDiscount('');
    setPromoError('');
    await showAlert("Yangi promokod muvaffaqiyatli qo'shildi! 🎁", {
      title: "Qo'shildi",
      variant: "success"
    });
  };

  const handleDeletePromo = async (id) => {
    const confirmDelete = await showConfirm("Haqiqatan ham ushbu promokodni o'chirib tashlamoqchimisiz?", {
      title: "Promokodni o'chirish",
      variant: "danger",
      confirmText: "O'chirish",
      cancelText: "Bekor qilish"
    });
    if (!confirmDelete) return;
    
    const updated = promocodesList.filter(p => p.id !== id);
    localStorage.setItem('biosmart_promocodes', JSON.stringify(updated));
    setPromocodesList(updated);
  };

  // Filtering users by search query
  const filteredProfiles = profilesList.filter(p => 
    (p.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.grade || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.role || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin">
      <h1 className="admin__title">Admin Control Panel ⚙️</h1>

      {/* Stats Summary Cards */}
      <div className="admin__stats">
        <div className="admin__stat-card">
          <FiUsers className="admin__stat-icon" />
          <div>
            <h3>Foydalanuvchilar</h3>
            <p>{stats.users}</p>
          </div>
        </div>
        <div className="admin__stat-card">
          <FiBookOpen className="admin__stat-icon" />
          <div>
            <h3>Mavzular</h3>
            <p>{stats.topics}</p>
          </div>
        </div>
        <div className="admin__stat-card">
          <FiFileText className="admin__stat-icon" />
          <div>
            <h3>Test Topshiriqlari</h3>
            <p>{stats.tests}</p>
          </div>
        </div>
        <div className="admin__stat-card" style={{ borderColor: '#fbbf24' }}>
          <FiDollarSign className="admin__stat-icon" style={{ color: '#fbbf24' }} />
          <div>
            <h3>Umumiy daromad</h3>
            <p>{stats.totalRevenue.toLocaleString('uz-UZ')} UZS</p>
          </div>
        </div>
        <div className="admin__stat-card" style={{ borderColor: '#f97316' }}>
          <FiBell className="admin__stat-icon" style={{ color: '#f97316' }} />
          <div>
            <h3>Kutilayotgan to'lovlar</h3>
            <p>{stats.pendingPayments}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin__tabs">
        <button
          className={`admin__tab-btn ${activeTab === 'overview' ? 'admin__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FiBookOpen /> Umumiy boshqaruv
        </button>
        <button
          className={`admin__tab-btn ${activeTab === 'users' ? 'admin__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers /> Foydalanuvchilar ({stats.users})
        </button>
        <button
          className={`admin__tab-btn ${activeTab === 'announcements' ? 'admin__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          <FiBell /> E'lonlar yuborish
        </button>
        <button
          className={`admin__tab-btn ${activeTab === 'promocodes' ? 'admin__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('promocodes')}
        >
          <FiGift /> Promokodlar
        </button>
        <button
          className={`admin__tab-btn ${activeTab === 'payments' ? 'admin__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          <FiDollarSign /> To'lovlar ({stats.pendingPayments})
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="admin__grid">
          <div className="admin__card">
            <div className="admin__card-header">
              <h3>Sinflarni boshqarish</h3>
            </div>
            <form className="admin__add-form" onSubmit={handleAddGrade}>
              <input
                type="text" placeholder="Yangi sinf nomi (masalan: 9-sinf)"
                value={newGrade} onChange={e => setNewGrade(e.target.value)}
              />
              <button type="submit"><FiPlus /> Qo'shish</button>
            </form>

            {loading ? <p>Yuklanmoqda...</p> : (
              <div className="admin__list">
                {grades.map(g => (
                  <div key={g.id} className="admin__list-item">
                    <span>{g.name}</span>
                    <div className="admin__list-actions">
                      <button onClick={() => navigate(`/admin/questions?grade=${g.id}`)} className="admin__btn-secondary">
                        Savollar <FiArrowRight />
                      </button>
                      <button onClick={() => handleDeleteGrade(g.id)} className="admin__btn-delete">
                        <FiTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin__card">
            <div className="admin__card-header">
              <h3>Yaqinda ro'yxatdan o'tganlar</h3>
            </div>
            <div className="admin__users">
              {recentUsers.map(u => (
                <div key={u.id} className="admin__user-item">
                  <div className="admin__user-avatar">
                    {(u.full_name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{u.full_name || 'Foydalanuvchi'}</h4>
                    <p>{u.grade || 'Mavjud emas'}</p>
                  </div>
                  <span className="admin__user-date">
                    {new Date(u.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: USERS LIST */}
      {activeTab === 'users' && (
        <div className="admin__card admin__users-card">
          <div className="admin__users-header-row">
            <div>
              <h3>Barcha foydalanuvchilar ro'yxati</h3>
              <p className="admin__users-header-subtitle">Tizimdagi barcha talabalar va adminlar ma'lumotlarini boshqarish</p>
            </div>
            {/* Search Input */}
            <div className="admin__search-box">
              <FiSearch className="admin__search-icon" />
              <input
                type="text"
                placeholder="Foydalanuvchini izlash..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="admin__search-clear" onClick={() => setSearchQuery('')}>
                  <FiX />
                </button>
              )}
            </div>
          </div>

          {usersLoading ? (
            <div className="admin__users-loading">
              <div className="admin__spinner"></div>
              <p>Foydalanuvchilar ro'yxati yuklanmoqda...</p>
            </div>
          ) : filteredProfiles.length === 0 ? (
            <div className="admin__users-empty">
              <FiUsers className="empty-icon" />
              <p>Hech qanday foydalanuvchi topilmadi</p>
              <span>Qidiruv so'rovini tekshirib ko'ring</span>
            </div>
          ) : (
            <div className="admin__table-wrapper">
              <table className="admin__users-table">
                <thead>
                  <tr>
                    <th>Foydalanuvchi</th>
                    <th>Rol</th>
                    <th>Sinf / Grade</th>
                    <th>Topshirilgan testlar</th>
                    <th>Ro'yxatdan o'tgan</th>
                    <th className="text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.map(profile => {
                    const isEditingThis = userEditing === profile.id;
                    const testsCompleted = attemptsCountMap[profile.id] || 0;

                    return (
                      <tr key={profile.id} className={isEditingThis ? 'row--editing' : ''}>
                        {/* Avatar & Name */}
                        <td>
                          <div className="user-table-cell">
                            <div className="user-table-avatar">
                              {(profile.full_name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="user-table-name">{profile.full_name || 'Foydalanuvchi'}</div>
                              <div className="user-table-id">ID: {profile.id.substring(0, 8)}...</div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td>
                          {isEditingThis ? (
                            <select
                              value={editRole}
                              onChange={e => setEditRole(e.target.value)}
                              className="admin__table-select"
                            >
                              <option value="user">Foydalanuvchi</option>
                              <option value="admin">Administrator</option>
                            </select>
                          ) : (
                            <span className={`role-badge ${profile.role === 'admin' ? 'role-badge--admin' : 'role-badge--user'}`}>
                              {profile.role === 'admin' ? (
                                <><FiShield /> Administrator</>
                              ) : (
                                'Foydalanuvchi'
                              )}
                            </span>
                          )}
                        </td>

                        {/* Grade */}
                        <td>
                          {isEditingThis ? (
                            <select
                              value={editGrade}
                              onChange={e => setEditGrade(e.target.value)}
                              className="admin__table-select"
                            >
                              <option value="5-sinf">5-sinf</option>
                              <option value="6-sinf">6-sinf</option>
                              <option value="7-sinf">7-sinf</option>
                              <option value="8-sinf">8-sinf</option>
                              <option value="9-sinf">9-sinf</option>
                              <option value="10-sinf">10-sinf</option>
                              <option value="11-sinf">11-sinf</option>
                            </select>
                          ) : (
                            <span className="grade-display">{profile.grade || 'Mavjud emas'}</span>
                          )}
                        </td>

                        {/* Tests completed */}
                        <td>
                          <div className="tests-cell">
                            <FiAward className={testsCompleted > 0 ? 'icon-success' : 'icon-light'} />
                            <span>{testsCompleted} ta test</span>
                          </div>
                        </td>

                        {/* Registered Date */}
                        <td>
                          <span className="date-display">
                            {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Noma\'lum'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="text-right">
                          <div className="admin__table-action-buttons">
                            {isEditingThis ? (
                              <>
                                <button
                                  className="btn-action-save"
                                  onClick={() => handleSaveUserEdit(profile.id)}
                                  title="Saqlash"
                                >
                                  <FiSave /> Saqlash
                                </button>
                                <button
                                  className="btn-action-cancel"
                                  onClick={handleCancelUserEdit}
                                  title="Bekor qilish"
                                >
                                  <FiX />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="btn-action-edit"
                                  onClick={() => handleStartUserEdit(profile)}
                                  title="Tahrirlash"
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  className="btn-action-delete"
                                  onClick={() => handleDeleteUser(profile.id, profile.full_name)}
                                  title="O'chirish"
                                  disabled={profile.id === 'admin-id'}
                                >
                                  <FiTrash />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: ANNOUNCEMENTS PANEL */}
      {activeTab === 'announcements' && (
        <div className="admin__announcements-grid">
          {/* Send Announcement Card */}
          <div className="admin__card">
            <div className="admin__card-header">
              <h3>Yangi e'lon yuborish</h3>
              <p className="admin__users-header-subtitle">Ushbu e'lon barcha o'quvchilar ekranidagi yuqori qo'ng'iroqcha bildirishnomalarida paydo bo'ladi.</p>
            </div>
            
            <form onSubmit={handleSendAnnouncement} className="admin__ann-form">
              <div className="ann-form-group">
                <label className="ann-input-label">E'lon matni</label>
                <textarea
                  className="ann-textarea"
                  placeholder="Barcha foydalanuvchilar ko'radigan e'lon yoki xabar matnini kiriting... (masalan: Botanika fanidan yangi test topshiriqlari qo'shildi! 🌿)"
                  value={announcementText}
                  onChange={e => setAnnouncementText(e.target.value)}
                  rows="4"
                  required
                ></textarea>
                <span className="char-counter">{announcementText.length} ta belgi</span>
              </div>
              <button type="submit" className="btn-send-ann">
                <FiBell /> E'lonni yuborish
              </button>
            </form>
          </div>

          {/* Announcements History Card */}
          <div className="admin__card">
            <div className="admin__card-header">
              <h3>Yuborilgan e'lonlar tarixi</h3>
              <p className="admin__users-header-subtitle">Avvalroq barcha foydalanuvchilarga yuborilgan xabarlar ro'yxati</p>
            </div>

            <div className="announcements-history-list">
              {announcementsList.length === 0 ? (
                <div className="admin__users-empty" style={{ padding: '24px 0' }}>
                  <FiBell className="empty-icon" />
                  <p>Yuborilgan e'lonlar mavjud emas</p>
                  <span>Yuqoridagi formadan yangi e'lon yuboring</span>
                </div>
              ) : (
                <div className="ann-history-wrapper">
                  {announcementsList.map(ann => (
                    <div key={ann.id} className="ann-history-item">
                      <div className="ann-history-item__header">
                        <span className="ann-badge"><FiBell /> E'lon</span>
                        <span className="ann-time">
                          {new Date(ann.created_at).toLocaleString()}
                        </span>
                        <button
                          className="ann-delete-btn"
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          title="E'lonni o'chirish"
                        >
                          <FiTrash />
                        </button>
                      </div>
                      <p className="ann-history-item__text">{ann.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PAYMENTS PANEL */}
      {activeTab === 'payments' && (
        <div className="admin__card">
          <div className="admin__users-header-row">
            <h3>Naqd pul to'lovlari</h3>
            <div className="admin__search-box" style={{ maxWidth: '200px' }}>
              <select
                value={paymentFilter}
                onChange={e => setPaymentFilter(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  width: '100%'
                }}
              >
                <option value="pending">Kutilayotgan</option>
                <option value="approved">Tasdiqlangan</option>
                <option value="rejected">Rad etilgan</option>
                <option value="">Barchasi</option>
              </select>
            </div>
          </div>

          {paymentsLoading ? (
            <div className="admin__users-loading">
              <div className="admin__spinner"></div>
              <p>To'lovlar yuklanmoqda...</p>
            </div>
          ) : paymentsList.length === 0 ? (
            <div className="admin__users-empty">
              <FiDollarSign className="empty-icon" />
              <p>To'lovlar topilmadi</p>
            </div>
          ) : (
            <div className="admin__table-wrapper">
              <table className="admin__users-table">
                <thead>
                  <tr>
                    <th>Foydalanuvchi</th>
                    <th>Obuna turi</th>
                    <th>Miqdor</th>
                    <th>Status</th>
                    <th>Vaqt</th>
                    <th className="text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsList.map(payment => (
                    <tr key={payment.id}>
                      <td>
                        <div className="user-table-cell">
                          <div className="user-table-avatar">
                            {(payment.profiles?.full_name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="user-table-name">{payment.profiles?.full_name || 'Noma\'lum'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="role-badge role-badge--user">
                          {payment.plan_type === 'monthly' ? 'Oylik' : 'Yillik'}
                        </span>
                      </td>
                      <td><strong>{payment.amount?.toLocaleString('uz-UZ')} UZS</strong></td>
                      <td>
                        <span className={`role-badge ${
                          payment.status === 'approved' ? 'role-badge--admin' :
                          payment.status === 'rejected' ? 'role-badge--user' : ''
                        }`}>
                          {payment.status === 'pending' ? '⏳ Kutilmoqda' :
                           payment.status === 'approved' ? '✅ Tasdiqlangan' :
                           '❌ Rad etilgan'}
                        </span>
                      </td>
                      <td>
                        <span className="date-display">
                          {new Date(payment.created_at).toLocaleString()}
                        </span>
                      </td>
                      <td className="text-right">
                        {payment.status === 'pending' && (
                          <div className="admin__table-action-buttons">
                            <button
                              className="btn-action-save"
                              onClick={() => handleApprovePayment(payment.id)}
                              title="Tasdiqlash"
                            >
                              <FiCheck /> Tasdiqlash
                            </button>
                            <button
                              className="btn-action-delete"
                              onClick={() => handleRejectPayment(payment.id)}
                              title="Rad etish"
                            >
                              <FiXCircle /> Rad etish
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PROMO CODES PANEL */}
      {activeTab === 'promocodes' && (
        <div className="admin__announcements-grid">
          {/* Create Promo Code Card */}
          <div className="admin__card">
            <div className="admin__card-header">
              <h3>Yangi promokod qo'shish</h3>
              <p className="admin__users-header-subtitle">Premium obunalar uchun chegirma beruvchi yangi promokod yarating.</p>
            </div>
            
            <form onSubmit={handleAddPromo} className="admin__ann-form">
              <div className="ann-form-group">
                <label className="ann-input-label">Promokod nomi</label>
                <input
                  type="text"
                  className={`ann-textarea ${promoError && !newPromoCode ? 'field-error' : ''}`}
                  style={{ height: 'auto', padding: '12px' }}
                  placeholder="Masalan: BIOLOGY30"
                  value={newPromoCode}
                  onChange={e => setNewPromoCode(e.target.value)}
                  required
                />
              </div>

              <div className="ann-form-group" style={{ marginTop: '16px' }}>
                <label className="ann-input-label">Chegirma foizi (%)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="ann-textarea"
                    style={{ height: 'auto', padding: '12px 36px 12px 12px' }}
                    placeholder="Foiz miqdorini kiriting (0-100)"
                    value={newPromoDiscount}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === '') {
                        setNewPromoDiscount('');
                      } else {
                        const parsed = parseInt(val);
                        if (!isNaN(parsed)) {
                          setNewPromoDiscount(Math.min(100, Math.max(0, parsed)));
                        }
                      }
                    }}
                    required
                  />
                  <FiPercent style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                </div>
              </div>

              {promoError && (
                <div className="admin__promo-error-box">
                  <span>⚠️ {promoError}</span>
                </div>
              )}

              {/* Real-time calculated price preview block */}
              <div className="admin__promo-preview-box">
                <span className="preview-title">💵 Chegirma hisobi (Hisob-kitob):</span>
                <div className="preview-row">
                  <div className="preview-col">
                    <span>Oylik obuna (29 000 UZS):</span>
                    <strong>
                      {Math.round(29000 - (29000 * (parseInt(newPromoDiscount) || 0)) / 100).toLocaleString('uz-UZ')} UZS
                    </strong>
                  </div>
                  <div className="preview-col">
                    <span>Yillik obuna (199 000 UZS):</span>
                    <strong>
                      {Math.round(199000 - (199000 * (parseInt(newPromoDiscount) || 0)) / 100).toLocaleString('uz-UZ')} UZS
                    </strong>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-send-ann" style={{ marginTop: '20px' }}>
                <FiPlus /> Promokodni qo'shish
              </button>
            </form>
          </div>

          {/* Active Promo Codes List Card */}
          <div className="admin__card">
            <div className="admin__card-header">
              <h3>Mavjud promokodlar ro'yxati</h3>
              <p className="admin__users-header-subtitle">Tizimdagi faol promokodlarni ko'rish va o'chirish</p>
            </div>

            <div className="announcements-history-list">
              {promocodesList.length === 0 ? (
                <div className="admin__users-empty" style={{ padding: '24px 0' }}>
                  <FiGift className="empty-icon" />
                  <p>Faol promokodlar mavjud emas</p>
                  <span>Chap tomondagi formadan yangi promokod qo'shing</span>
                </div>
              ) : (
                <div className="ann-history-wrapper">
                  {promocodesList.map(promo => {
                    const monthlyBase = 29000;
                    const annualBase = 199000;
                    const monthlyDiscounted = Math.round(monthlyBase - (monthlyBase * promo.discount) / 100);
                    const annualDiscounted = Math.round(annualBase - (annualBase * promo.discount) / 100);

                    return (
                      <div key={promo.id} className="ann-history-item admin__promo-card">
                        <div className="ann-history-item__header">
                          <span className="ann-badge" style={{ background: 'rgba(251,140,0,0.15)', color: '#fb8c00', border: '1px solid rgba(251,140,0,0.25)' }}>
                            <FiGift /> {promo.code}
                          </span>
                          <span className="ann-time">
                            Chegirma: <strong>{promo.discount}%</strong>
                          </span>
                          <button
                            className="ann-delete-btn"
                            onClick={() => handleDeletePromo(promo.id)}
                            title="Promokodni o'chirish"
                          >
                            <FiTrash />
                          </button>
                        </div>
                        <div className="admin__promo-card-prices">
                          <div>
                            <span>Oylik:</span> <strong>{monthlyDiscounted.toLocaleString('uz-UZ')} UZS</strong>
                          </div>
                          <div>
                            <span>Yillik:</span> <strong>{annualDiscounted.toLocaleString('uz-UZ')} UZS</strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
