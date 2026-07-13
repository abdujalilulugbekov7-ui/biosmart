import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Helper to manually load .env files to avoid installing 'dotenv' in the root
function loadEnvFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
          const firstEqual = trimmed.indexOf('=')
          if (firstEqual !== -1) {
            const key = trimmed.substring(0, firstEqual).trim()
            let val = trimmed.substring(firstEqual + 1).trim()
            // Remove optional surrounding quotes
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.substring(1, val.length - 1)
            }
            process.env[key] = val
          }
        }
      })
    }
  } catch (err) {
    console.warn(`Could not read ${filePath}:`, err.message)
  }
}

// Load root and server .env files
loadEnvFile(path.resolve(process.cwd(), '.env'))
loadEnvFile(path.resolve(process.cwd(), 'server', '.env'))

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://sonuoqgmsxydeoadwxwd.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbnVvcWdtc3h5ZGNvYWR3eHdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSI6ImlhdCI6MTc4MzkwNjU1MCwiZXhwIjoyMDk5NDgyNTUwfQ.P2eLpeQ83JzPLOXkgE8KAW99IYBHVzoqKTQCbbvqwaw'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function createAdmin() {
  let phone = process.argv[2] || '+998901234567'
  if (!phone.startsWith('+')) {
    phone = '+' + phone
  }

  console.log(`Setting up admin with phone number: ${phone}...`)
  
  // 1. Auth user yaratish
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    phone,
    phone_confirm: true,
    user_metadata: { full_name: 'Admin' }
  })
  
  if (authError) {
    console.error('Auth user yaratishda xato:', authError.message)
    return
  }
  
  console.log('✅ Auth user yaratildi:', authData.user.id)
  
  // 2. Profiles jadvaliga admin qo'shish
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: authData.user.id,
    phone,
    full_name: 'Admin',
    role: 'admin',
    grade: '5-sinf',
    created_at: new Date().toISOString()
  })
  
  if (profileError) {
    console.error('Profile yaratishda xato:', profileError.message)
    return
  }
  
  console.log('✅ Profile yaratildi, role: admin')
  console.log('\n🔑 Kirish uchun:')
  console.log(`Telefon: ${phone}`)
  console.log('SMS kod keladi, undan keyin parol o\'rnating')
}

createAdmin()