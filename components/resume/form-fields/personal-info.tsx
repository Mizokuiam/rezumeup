"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UseFormRegister } from "react-hook-form"
import { ResumeFormData } from "@/lib/types"

interface PersonalInfoFieldsProps {
  register: UseFormRegister<ResumeFormData>
}

export function PersonalInfoFields({ register }: PersonalInfoFieldsProps) {
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
    </>
  )
}