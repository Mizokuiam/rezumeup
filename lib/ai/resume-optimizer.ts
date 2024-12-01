import { openai } from './openai-client';
import { ResumeFormData, OptimizationResult } from '../types';

export async function optimizeResume(data: ResumeFormData): Promise<OptimizationResult> {
  try {
    const prompt = createOptimizationPrompt(data);
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ 
        role: "system", 
        content: "You are an expert resume optimizer. Your task is to enhance the career objective and experience sections to better match the job description while maintaining authenticity and highlighting relevant skills and achievements."
      },
      { 
        role: "user", 
        content: prompt 
      }],
    });

    const response = completion.choices[0].message.content || '';
    return parseOptimizationResponse(response);
  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw new Error("Failed to optimize resume");
  }
}

function createOptimizationPrompt(data: ResumeFormData): string {
  return `
Please optimize the following resume sections to better match the job description:

Job Description:
${data.jobDescription}

Current Career Objective:
${data.careerObjective}

Current Experience:
${data.currentExperience}

Instructions:
1. Analyze the job description for key requirements and skills
2. Enhance the career objective to align with the job requirements
3. Optimize the experience section to highlight relevant achievements and skills
4. Maintain a professional and authentic tone
5. Use industry-specific keywords from the job description

Format your response exactly as:
Career Objective:
[optimized objective]

Experience:
[optimized experience]
`
}

function parseOptimizationResponse(response: string): OptimizationResult {
  const objectiveMatch = response.match(/Career Objective:\s*([\s\S]*?)(?=\s*Experience:)/);
  const experienceMatch = response.match(/Experience:\s*([\s\S]*?)$/);

  if (!objectiveMatch || !experienceMatch) {
    throw new Error("Failed to parse optimization response");
  }

  return {
    careerObjective: objectiveMatch[1].trim(),
    currentExperience: experienceMatch[1].trim(),
  };
}