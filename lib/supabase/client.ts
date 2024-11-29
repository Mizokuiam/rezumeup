import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getUserBoosts(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('users')
    .select('boosts')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data?.boosts || 0
}

export async function updateUserBoosts(userId: string, boosts: number): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ boosts })
    .eq('id', userId)

  if (error) throw error
}