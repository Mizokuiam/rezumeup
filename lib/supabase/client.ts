import { createClient } from '@supabase/supabase-js'
import { authConfig } from '../config/auth'

if (!authConfig.supabase.url || !authConfig.supabase.anonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(
  authConfig.supabase.url,
  authConfig.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    },
    global: {
      headers: {
        'x-client-info': 'rezumeup@1.0.0'
      }
    }
  }
)

export async function getUserBoosts(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('boosts')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data?.boosts || 0
  } catch (error) {
    console.error('Error fetching user boosts:', error)
    throw new Error('Failed to fetch user boosts')
  }
}

export async function updateUserBoosts(userId: string, boosts: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ boosts })
      .eq('id', userId)

    if (error) throw error
  } catch (error) {
    console.error('Error updating user boosts:', error)
    throw new Error('Failed to update user boosts')
  }
}