"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UseFormRegister } from "react-hook-form"
import { ResumeFormData } from "@/lib/types"

interface ExperienceFieldsProps {
  register: UseFormRegister<ResumeFormData>
}

export function ExperienceFields({ register }: ExperienceFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="careerObjective">Career Objective</Label>
        <Textarea
          id="careerObjective"
          {...register("careerObjective", { required: true })}
          placeholder="Enter your career objective..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentExperience">Current Experience</Label>
        <Textarea
          id="currentExperience"
          {...register("currentExperience", { required: true })}
          placeholder="Detail your current and past work experience..."
        />
      </div>
    </>
  )
}