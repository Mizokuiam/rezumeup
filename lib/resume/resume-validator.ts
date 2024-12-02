import { ResumeFormData } from "../types";

export function validateResumeData(data: ResumeFormData): string | null {
  if (!data.jobDescription.trim()) {
    return 'Job description is required';
  }
  
  if (!data.currentExperience.trim()) {
    return 'Current experience is required';
  }
  
  if (!data.careerObjective.trim()) {
    return 'Career objective is required';
  }
  
  return null;
}