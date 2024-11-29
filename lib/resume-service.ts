import { ResumeFormData, OptimizationResult } from "./types"

export async function optimizeResume(data: ResumeFormData): Promise<OptimizationResult> {
  try {
    const response = await fetch('/api/resume/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to optimize resume')
    }

    return response.json()
  } catch (error) {
    console.error("Error optimizing resume:", error)
    throw error
  }
}