"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { User, FileText } from "lucide-react"

interface ProfileSidebarProps {
  activeTab: "details" | "purchases"
  onTabChange: (tab: "details" | "purchases") => void
}

export default function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          activeTab === "details" && "bg-muted"
        )}
        onClick={() => onTabChange("details")}
      >
        <User className="mr-2 h-4 w-4" />
        My Details
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          activeTab === "purchases" && "bg-muted"
        )}
        onClick={() => onTabChange("purchases")}
      >
        <FileText className="mr-2 h-4 w-4" />
        My Purchases
      </Button>
    </div>
  )
}