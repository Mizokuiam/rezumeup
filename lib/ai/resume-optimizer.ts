import { openai } from './openai-client';
import { ResumeFormData, OptimizationResult } from '../types';

export async function optimizeResume(data: ResumeFormData): Promise<OptimizationResult> {
  try {
    const prompt = createOptimizationPrompt(data);
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return parseOptimizationResponse(completion.choices[0].message.content || '');
  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw new Error("Failed to optimize resume");
  }
}

function createOptimizationPrompt(data: ResumeFormData): string {
  return `
    Job Description: ${data.jobDescription}
    Current Career Objective: ${data.careerObjective}
    Current Experience: ${data.currentExperience}
    
    Please optimize the career objective and experience sections to better match the job description.
    Focus on relevant keywords and achievements.
    
    Format your response as:
    Career Objective:
    [optimized objective]
    
    Experience:
    [optimized experience]
  `;
}

function parseOptimizationResponse(response: string): OptimizationResult {
  const objectiveMatch = response.match(/Career Objective:\s*([\s\S]*?)(?=\s*Experience:)/);
  const experienceMatch = response.match(/Experience:\s*([\s\S]*?)$/);

  return {
    careerObjective: objectiveMatch?.[1]?.trim() || '',
    currentExperience: experienceMatch?.[1]?.trim() || '',
  };
}