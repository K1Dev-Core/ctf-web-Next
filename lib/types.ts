export interface Challenge {
  id: string
  title: string
  description: string
  flag: string
  category: 'web' | 'crypto' | 'reverse' | 'forensics' | 'pwn' | 'misc'
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  hints?: string[]
  downloadLink?: string
  webLink?: string
  isActive: boolean
  createdAt: string
  solvedBy: string[]
}

export interface ChallengeCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface User {
  id: string
  username: string
  password: string
  email?: string
  createdAt: string
  lastLogin?: string
  score: number
  solvedChallenges: string[]
}
