"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { UseFormRegister } from "react-hook-form"
import { ResumeFormData } from "@/lib/types"

interface FormFieldsProps {
  register: UseFormRegister<ResumeFormData>
}

export function FormFields({ register }: FormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          {...register("fullName", { required: true })}
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactDetails">Address and Contact Details</Label>
        <Textarea
          id="contactDetails"
          {...register("contactDetails", { required: true })}
          placeholder="123 Main St, City, State, ZIP&#10;Email: john@example.com&#10;Phone: (123) 456-7890"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Applying For</Label>
        <Input
          id="jobTitle"
          {...register("jobTitle", { required: true })}
          placeholder="Senior Software Engineer"
        />
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          {...register("jobDescription", { required: true })}
          placeholder="Paste the job description here..."
        />
      </div>
    </>
  )
}