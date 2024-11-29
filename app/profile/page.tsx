"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface Profile {
  full_name: string
  email: string
  mobile: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    email: "",
    mobile: "",
  })
  const [loading, setLoading] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (error) throw error

        setProfile({
          full_name: data?.full_name || "",
          email: user.email || "",
          mobile: data?.mobile || "",
        })
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }

    fetchProfile()
  }, [user, router])

  const handleUpdateProfile = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          mobile: profile.mobile,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match")
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error
      toast.success("Password updated successfully")
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error("Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.full_name}
              onChange={(e) =>
                setProfile({ ...profile, full_name: e.target.value })
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={profile.email}
              disabled
              className="mt-1 bg-muted"
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number (Optional)</Label>
            <Input
              id="mobile"
              value={profile.mobile}
              onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
              className="mt-1"
            />
          </div>

          <Button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="w-full"
          >
            Update Profile
          </Button>
        </div>

        <div className="pt-6 border-t space-y-4">
          <h2 className="text-xl font-semibold">Change Password</h2>

          <div>
            <Label htmlFor="oldPassword">Current Password</Label>
            <Input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={loading}
            className="w-full"
          >
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  )
}