import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
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
        setProfile(data);
      } else {
        // Profile doesn't exist yet — create a default one
        const newProfile = {
          id: userId,
          full_name: userMeta?.full_name || userMeta?.phone || 'Foydalanuvchi',
          role: 'user',
          grade: '5-sinf',
          created_at: new Date().toISOString(),
        };
        await supabase.from('profiles').insert(newProfile);
        setProfile(newProfile);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      setProfile(null);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, { phone: session.user.phone, full_name: session.user.user_metadata?.full_name });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id, { phone: session.user.phone, full_name: session.user.user_metadata?.full_name });
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (phone, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      phone,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (phone, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
  };

  const isAdmin = profile?.role === 'admin';
  const isPro = profile?.is_pro === true && (
    !profile?.pro_expires_at || new Date(profile.pro_expires_at) > new Date()
  );

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

    // Fallback for mock environments and bypassed sessions: update profile in localStorage directly
    if (!user && profile) {
      try {
        const profiles = JSON.parse(localStorage.getItem('biosmart_profiles') || '[]');
        const idx = profiles.findIndex(p => p.id === profile.id);
        if (idx > -1) {
          profiles[idx] = { ...profiles[idx], ...updates };
          localStorage.setItem('biosmart_profiles', JSON.stringify(profiles));
        }
        setProfile(prev => prev ? { ...prev, ...updates } : prev);
        return;
      } catch (err) {
        console.warn('Local storage profile update failed:', err);
      }
    }
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...updates } : prev);
    } catch (err) {
      console.error('Failed to update subscription:', err);
      throw err;
    }
  }, [user, profile]);

  useEffect(() => {
    if (profile?.is_pro === true && profile?.pro_expires_at) {
      const expiry = new Date(profile.pro_expires_at);
      if (expiry <= new Date()) {
        console.log('Subscription expired. Resetting status to free.');
        upgradeToPro(false);
      }
    }
  }, [profile, upgradeToPro]);

  const value = {
    user,
    profile,
    isAdmin,
    isPro,
    loading,
    signUp,
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
