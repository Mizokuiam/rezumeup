import { supabase } from './client'
import { Purchase } from '@/lib/types'

export async function getPurchaseHistory(): Promise<Purchase[]> {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}