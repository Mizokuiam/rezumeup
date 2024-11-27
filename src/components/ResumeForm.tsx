"use client"

import { useState } from "react"
import { FileText, Briefcase } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function ResumeForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    objective: "",
    experience: "",
    jobDescription: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      router.push("/signin")
      return
    }

    setLoading(true)
    try {
      // Simulate optimization process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Resume Optimized!",
        description: "Your optimized resume is ready for download.",
      })

      // Generate and download the resume
      const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "optimized-resume.json"
      a.click()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contact Details & Address
          </label>
          <input
            type="text"
            id="contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="objective" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Career Objective
        </label>
        <textarea
          id="objective"
          rows={3}
          value={formData.objective}
          onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Current Resume Experience
        </label>
        <textarea
          id="experience"
          rows={6}
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          rows={6}
          value={formData.jobDescription}
          onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition"
        >
          <FileText className="w-5 h-5" />
          <span>{loading ? "Optimizing..." : "Optimize Now"}</span>
        </button>
      </div>
    </form>
  )
}