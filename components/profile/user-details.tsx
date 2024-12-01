"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { updateProfile, updatePassword } from "@/lib/supabase/profile"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"

interface UserDetailsForm {
  fullName: string
  email: string
  mobile?: string
}

interface PasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function UserDetails() {
  const { user } = useAuth()
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const { register: registerDetails, handleSubmit: handleDetailsSubmit } = useForm<UserDetailsForm>({
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      mobile: user?.user_metadata?.mobile || "",
    },
  })
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, watch } = useForm<PasswordForm>()
  const newPassword = watch("newPassword")

  const onDetailsSubmit = async (data: UserDetailsForm) => {
    try {
      await updateProfile(data)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    }
  }

  const onPasswordSubmit = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords don't match")
      return
    }

    try {
      await updatePassword(data.oldPassword, data.newPassword)
      setIsEditingPassword(false)
      toast.success("Password updated successfully")
    } catch (error) {
      toast.error("Failed to update password")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <form onSubmit={handleDetailsSubmit(onDetailsSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...registerDetails("fullName", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" disabled value={user?.email || ""} className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number (Optional)</Label>
            <Input id="mobile" {...registerDetails("mobile")} />
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        {isEditingPassword ? (
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <Input
                id="oldPassword"
                type="password"
                {...registerPassword("oldPassword", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                {...registerPassword("newPassword", { required: true, minLength: 6 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...registerPassword("confirmPassword", {
                  required: true,
                  validate: value => value === newPassword || "Passwords do not match"
                })}
              />
            </div>

            <div className="space-x-2">
              <Button type="submit">Update Password</Button>
              <Button type="button" variant="ghost" onClick={() => setIsEditingPassword(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button onClick={() => setIsEditingPassword(true)}>Change Password</Button>
        )}
      </Card>
    </div>
  )
}