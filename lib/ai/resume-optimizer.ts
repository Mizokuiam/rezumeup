import { openai } from './openai-client';
import { ResumeFormData, OptimizationResult } from '../types';

export async function optimizeResume(data: ResumeFormData): Promise<OptimizationResult> {
  try {
    if (!data.jobDescription || !data.currentExperience || !data.careerObjective) {
      throw new Error('Missing required resume data');
    }

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
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('Failed to generate optimization response');
    }

    const result = parseOptimizationResponse(response);
    if (!result.careerObjective || !result.currentExperience) {
      throw new Error('Invalid optimization result format');
    }

    return result;
  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw new Error(error instanceof Error ? error.message : 'Failed to optimize resume');
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
`;
}

function parseOptimizationResponse(response: string): OptimizationResult {
  try {
    const objectiveMatch = response.match(/Career Objective:\s*([\s\S]*?)(?=\s*Experience:|$)/i);
    const experienceMatch = response.match(/Experience:\s*([\s\S]*?)$/i);

    if (!objectiveMatch?.[1] || !experienceMatch?.[1]) {
      throw new Error('Invalid optimization response format');
    }

    return {
      careerObjective: objectiveMatch[1].trim(),
      currentExperience: experienceMatch[1].trim(),
    };
  } catch (error) {
    throw new Error('Failed to parse optimization response');
  }
}