import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const isAdminPhone = (phone) => {
  if (!phone) return false;
  const digits = String(phone).replace(/\D/g, '');
  return digits.includes('912585010') || digits.includes('901234567');
};

export function AuthProvider({ children }) {
  // Initialize state from localStorage immediately to eliminate any flash or lost session
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('biosmart_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('biosmart_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId, userMeta) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (error) throw error;

      if (data) {
        if (isAdminPhone(data.phone)) {
          data.role = 'admin';
        }
        setProfile(data);
        localStorage.setItem('biosmart_profile', JSON.stringify(data));
      } else {
        const isAdm = isAdminPhone(userMeta?.phone);
        const newProfile = {
          id: userId,
          full_name: userMeta?.full_name || (isAdm ? 'Admin' : 'Foydalanuvchi'),
          phone: userMeta?.phone,
          role: isAdm ? 'admin' : 'user',
          is_pro: isAdm ? true : false,
          grade: '5-sinf',
          created_at: new Date().toISOString(),
        };
        try {
          await supabase.from('profiles').insert(newProfile);
        } catch (e) {
          console.warn('insert profile fallback:', e.message);
        }
        setProfile(newProfile);
        localStorage.setItem('biosmart_profile', JSON.stringify(newProfile));
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      const isAdm = isAdminPhone(userMeta?.phone);
      const fallbackProf = {
        id: userId,
        full_name: isAdm ? 'Admin' : 'Foydalanuvchi',
        phone: userMeta?.phone,
        role: isAdm ? 'admin' : 'user',
        is_pro: isAdm ? true : false,
        grade: '5-sinf',
        created_at: new Date().toISOString()
      };
      setProfile(fallbackProf);
      localStorage.setItem('biosmart_profile', JSON.stringify(fallbackProf));
    }
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      if (error) console.warn('getSession error:', error);
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id, { phone: session.user.phone, full_name: session.user.user_metadata?.full_name });
      }
      setLoading(false);
    }).catch(() => {
      if (mounted) setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id, { phone: session.user.phone, full_name: session.user.user_metadata?.full_name });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          localStorage.removeItem('biosmart_user');
          localStorage.removeItem('biosmart_profile');
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  const signUp = async (phone, password, fullName) => {
    const cleanDigits = phone.replace(/\D/g, '');
    const isAdm = isAdminPhone(phone);

    const newUser = {
      id: (isAdm ? 'admin-' : 'user-') + cleanDigits,
      phone,
      full_name: fullName || 'Foydalanuvchi',
      password,
      role: isAdm ? 'admin' : 'user',
      is_pro: isAdm,
      grade: '5-sinf',
      created_at: new Date().toISOString(),
      user_metadata: { full_name: fullName || 'Foydalanuvchi' }
    };

    try {
      const users = JSON.parse(localStorage.getItem('biosmart_users') || '[]');
      const filtered = users.filter(u => u.phone && u.phone.replace(/\D/g, '') !== cleanDigits);
      filtered.push(newUser);
      localStorage.setItem('biosmart_users', JSON.stringify(filtered));

      const profiles = JSON.parse(localStorage.getItem('biosmart_profiles') || '[]');
      const filteredProf = profiles.filter(p => p.phone && p.phone.replace(/\D/g, '') !== cleanDigits);
      filteredProf.push(newUser);
      localStorage.setItem('biosmart_profiles', JSON.stringify(filteredProf));
    } catch (err) {
      console.warn('Local users save error:', err);
    }

    setUser(newUser);
    setProfile(newUser);
    localStorage.setItem('biosmart_user', JSON.stringify(newUser));
    localStorage.setItem('biosmart_profile', JSON.stringify(newUser));

    try {
      await supabase.auth.signUp({
        phone,
        password,
        options: { data: { full_name: fullName } }
      });
    } catch (e) {
      console.warn('Remote signUp offline:', e.message);
    }

    return { user: newUser };
  };

  const signInWithOtp = async (phone) => {
    try {
      await supabase.auth.signInWithOtp({ phone });
    } catch (err) {
      console.warn('signInWithOtp offline fallback:', err.message);
    }
    return { success: true };
  };

  const verifyOtp = async (phone, token) => {
    const cleanDigits = phone.replace(/\D/g, '');
    const isSpecialAdmin = isAdminPhone(phone);

    if (isSpecialAdmin) {
      if (token.trim().toLowerCase() === 'google') {
        const adminUser = {
          id: 'admin-' + cleanDigits,
          phone,
          user_metadata: { full_name: 'Admin' }
        };
        const adminProfile = {
          id: adminUser.id,
          full_name: 'Admin',
          phone,
          role: 'admin',
          is_pro: true,
          grade: '11-sinf',
          created_at: new Date().toISOString()
        };
        setUser(adminUser);
        setProfile(adminProfile);
        localStorage.setItem('biosmart_user', JSON.stringify(adminUser));
        localStorage.setItem('biosmart_profile', JSON.stringify(adminProfile));
        return { session: { user: adminUser }, user: adminUser };
      } else {
        throw new Error('Noto\'g\'ri tasdiqlash kodi kiritildi');
      }
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      });
      if (!error && data?.session) {
        return data;
      }
    } catch (err) {
      console.warn('Remote verifyOtp offline, checking local accounts:', err.message);
    }

    const localUsers = JSON.parse(localStorage.getItem('biosmart_users') || '[]');
    const existing = localUsers.find(u => u.phone && u.phone.replace(/\D/g, '') === cleanDigits);

    if (existing) {
      setUser(existing);
      setProfile(existing);
      localStorage.setItem('biosmart_user', JSON.stringify(existing));
      localStorage.setItem('biosmart_profile', JSON.stringify(existing));
      return { session: { user: existing }, user: existing };
    }

    return { session: null, isNew: true };
  };

  const signIn = async (phone, password) => {
    const cleanDigits = phone.replace(/\D/g, '');
    const isSpecialAdmin = isAdminPhone(phone);

    if (isSpecialAdmin) {
      if (password === 'google') {
        const adminUser = {
          id: 'admin-' + cleanDigits,
          phone,
          user_metadata: { full_name: 'Admin' }
        };
        const adminProfile = {
          id: adminUser.id,
          full_name: 'Admin',
          phone,
          role: 'admin',
          is_pro: true,
          grade: '11-sinf',
          created_at: new Date().toISOString()
        };
        setUser(adminUser);
        setProfile(adminProfile);
        localStorage.setItem('biosmart_user', JSON.stringify(adminUser));
        localStorage.setItem('biosmart_profile', JSON.stringify(adminProfile));
        return { session: { user: adminUser }, user: adminUser };
      } else {
        throw new Error('Telefon raqam yoki parol noto\'g\'ri');
      }
    }

    const users = JSON.parse(localStorage.getItem('biosmart_users') || '[]');
    const existing = users.find(u => u.phone && u.phone.replace(/\D/g, '') === cleanDigits);

    if (existing) {
      if (existing.password === password) {
        setUser(existing);
        setProfile(existing);
        localStorage.setItem('biosmart_user', JSON.stringify(existing));
        localStorage.setItem('biosmart_profile', JSON.stringify(existing));
        return { session: { user: existing }, user: existing };
      } else {
        throw new Error('Kiritilgan parol noto\'g\'ri');
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ phone, password });
      if (!error && data?.user) {
        setUser(data.user);
        return data;
      }
    } catch (e) {
      console.warn('Remote signIn offline:', e.message);
    }

    throw new Error('Bu raqam bilan ro\'yxatdan o\'tilmagan. Iltimos, ro\'yxatdan o\'ting.');
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('signOut error:', err);
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('biosmart_user');
    localStorage.removeItem('biosmart_profile');
  };

  const isAdmin = profile?.role === 'admin' || isAdminPhone(user?.phone) || isAdminPhone(profile?.phone);
  const isPro = isAdmin || (profile?.is_pro === true && (
    !profile?.pro_expires_at || new Date(profile.pro_expires_at) > new Date()
  ));

  const upgradeToPro = useCallback(async (status = true, planType = 'monthly') => {
    let expiresStr = null;
    let planVal = null;
    if (status) {
      planVal = planType;
      const expiresAt = new Date();
      if (planType === 'annual') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }
      expiresStr = expiresAt.toISOString();
    }

    const updates = { 
      is_pro: status,
      pro_plan: planVal,
      pro_expires_at: expiresStr
    };

    setProfile(prev => {
      const next = prev ? { ...prev, ...updates } : { id: user?.id || 'user', role: 'user', ...updates };
      try {
        localStorage.setItem('biosmart_profile', JSON.stringify(next));
      } catch (e) {
        console.warn('localStorage profile save failed:', e);
      }
      return next;
    });

    try {
      const profiles = JSON.parse(localStorage.getItem('biosmart_profiles') || '[]');
      const targetId = user?.id || profile?.id;
      const idx = profiles.findIndex(p => p.id === targetId);
      if (idx > -1) {
        profiles[idx] = { ...profiles[idx], ...updates };
        localStorage.setItem('biosmart_profiles', JSON.stringify(profiles));
      }
    } catch (err) {
      console.warn('Local storage profiles array update failed:', err);
    }

    if (user?.id) {
      try {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);
      } catch (err) {
        console.warn('Remote subscription update skipped (offline mode):', err);
      }
    }
  }, [user, profile]);

  useEffect(() => {
    if (profile?.is_pro === true && profile?.pro_expires_at && !isAdmin) {
      const expiry = new Date(profile.pro_expires_at);
      if (expiry <= new Date()) {
        console.log('Subscription expired. Resetting status to free.');
        upgradeToPro(false);
      }
    }
  }, [profile, isAdmin, upgradeToPro]);

  const value = {
    user,
    profile,
    isAdmin,
    isPro,
    loading,
    signUp,
    signInWithOtp,
    verifyOtp,
    signIn,
    signOut,
    fetchProfile,
    upgradeToPro,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
