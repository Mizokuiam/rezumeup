"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UseFormRegister } from "react-hook-form"
import { ResumeFormData } from "@/lib/types"

interface JobDescriptionFieldProps {
  register: UseFormRegister<ResumeFormData>
}

export function JobDescriptionField({ register }: JobDescriptionFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="jobDescription">Job Description</Label>
      <Textarea
        id="jobDescription"
        {...register("jobDescription", { required: true })}
        placeholder="Paste the job description here..."
      />
    </div>
  )
}