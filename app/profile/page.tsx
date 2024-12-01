"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import ProfileSidebar from "@/components/profile/profile-sidebar"
import UserDetails from "@/components/profile/user-details"
import PurchaseHistory from "@/components/profile/purchase-history"

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"details" | "purchases">("details")

  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="flex-1">
          {activeTab === "details" ? (
            <UserDetails />
          ) : (
            <PurchaseHistory />
          )}
        </div>
      </div>
    </div>
  )
}