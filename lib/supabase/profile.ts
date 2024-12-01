import { supabase } from './client'

interface ProfileUpdateData {
  fullName: string
  mobile?: string
}

export async function updateProfile(data: ProfileUpdateData) {
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: data.fullName,
      mobile: data.mobile,
    },
  })

  if (error) throw error
}

export async function updatePassword(oldPassword: string, newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) throw error
}