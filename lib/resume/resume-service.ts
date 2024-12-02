import { ResumeFormData, OptimizationResult } from "../types";
import { post } from "../api/api-client";

export async function optimizeResume(data: ResumeFormData): Promise<OptimizationResult> {
  try {
    const result = await post<OptimizationResult>('/resume/optimize', data);
    
    if (!result.careerObjective || !result.currentExperience) {
      throw new Error('Invalid optimization result');
    }
    
    return result;
  } catch (error) {
    console.error("Resume optimization error:", error);
    if (error instanceof Error && error.message.includes('Authentication required')) {
      throw new Error('Please sign in to optimize your resume');
    }
    throw error;
  }
}