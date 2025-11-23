import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function initSupabase() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  console.log('Connected to Supabase with anon key')
  return supabase
}

export const supabase: SupabaseClient = initSupabase()
