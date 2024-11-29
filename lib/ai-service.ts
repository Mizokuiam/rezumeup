import { OpenAI } from "openai"
import { ResumeFormData, OptimizationResult } from "./types"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
})

export async function optimizeWithAI(data: ResumeFormData): Promise<OptimizationResult> {
  try {
    const prompt = `
      Job Description: ${data.jobDescription}
      Current Career Objective: ${data.careerObjective}
      Current Experience: ${data.currentExperience}
      
      Please optimize the career objective and experience sections to better match the job description.
      Focus on relevant keywords and achievements.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    })

    const response = completion.choices[0].message.content
    
    // Parse the response and extract optimized sections
    const sections = response?.split("\n\n") || []
    return {
      careerObjective: sections[0]?.replace("Career Objective:", "").trim() || "",
      currentExperience: sections[1]?.replace("Experience:", "").trim() || "",
    }
  } catch (error) {
    console.error("Error calling OpenAI:", error)
    throw new Error("Failed to optimize with AI")
  }
}