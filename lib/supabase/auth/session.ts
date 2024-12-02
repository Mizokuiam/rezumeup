import { supabase } from '../client'
import { AuthError } from './errors'

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw AuthError.fromSupabaseError(error)
  return session
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw AuthError.fromSupabaseError(error)
  return user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw AuthError.fromSupabaseError(error)
}