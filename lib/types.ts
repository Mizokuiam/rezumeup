export interface Purchase {
  id: string
  user_id: string
  boosts: number
  amount: number
  payment_method: string
  created_at: string
}

export interface ResumeFormData {
  fullName: string
  contactDetails: string
  jobTitle: string
  careerObjective: string
  currentExperience: string
  jobDescription: string
}

export interface User {
  id: string
  email: string
  boosts: number
}

export interface OptimizationResult {
  careerObjective: string
  currentExperience: string
}

export interface BoostPurchase {
  id: string
  userId: string
  amount: number
  cost: number
  date: string
}