import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = rawUrl && rawKey && rawUrl !== 'your_supabase_url_here';

if (!isConfigured) {
  console.warn('Supabase credentials not found in .env file. Using fallback client.');
}

const supabaseUrl = isConfigured ? rawUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = isConfigured ? rawKey : 'placeholder-anon-key';

// Singleton pattern to prevent "Multiple GoTrueClient instances detected" warning in Vite HMR
if (!globalThis.__supabaseInstance) {
  globalThis.__supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storageKey: 'biosmart_auth_token',
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export const supabase = globalThis.__supabaseInstance;