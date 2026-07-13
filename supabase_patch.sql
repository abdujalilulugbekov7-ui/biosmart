-- =========================================================================
-- BioSmart — Supabase Phone Authentication SQL Patch
-- Run this script in the Supabase Dashboard -> SQL Editor.
-- =========================================================================

-- 1. Add 'phone' column to public.profiles if it does not exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Update the handle_new_user() trigger function to save the phone number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 
    NEW.email,
    NEW.phone
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Sync existing users' phone numbers from auth.users to public.profiles
UPDATE public.profiles p
SET phone = u.phone
FROM auth.users u
WHERE p.id = u.id AND p.phone IS NULL;

-- 4. How to set a user as admin (uncomment and replace with your phone number if needed):
-- UPDATE public.profiles SET role = 'admin' WHERE phone = '+998901234567';
