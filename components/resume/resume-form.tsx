"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PersonalInfoFields } from "./form-fields/personal-info"
import { ExperienceFields } from "./form-fields/experience"
import { JobDescriptionField } from "./form-fields/job-description"
import { ResumeFormData } from "@/lib/types"
import { optimizeResume } from "@/lib/resume-service"
import { downloadResume } from "@/lib/resume-download"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

export default function ResumeForm() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<ResumeFormData>()

  const onSubmit = async (data: ResumeFormData) => {
    if (!user) {
      router.push('/auth')
      return
    }

    setIsOptimizing(true)
    try {
      const result = await optimizeResume(data)
      await downloadResume({
        ...data,
        careerObjective: result.careerObjective,
        currentExperience: result.currentExperience,
      })
      toast.success("Resume optimized and downloaded successfully!")
    } catch (error) {
      toast.error("Failed to optimize resume. Please try again.")
      console.error(error)
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <PersonalInfoFields register={register} />
          <ExperienceFields register={register} />
          <JobDescriptionField register={register} />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || isOptimizing}
        >
          {isOptimizing ? "Optimizing..." : "Optimize Now ⚡"}
        </Button>
      </form>
    </Card>
  )
}