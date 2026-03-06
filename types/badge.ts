// Badge and achievement types
export interface UserBadge { badgeId: string; earnedAt: Date }
export interface UserStats {
  totalCheckins: number
  consecutiveCheckins: number
  totalSubmissions: number
  submissionRate: number
  averageScore: number
  quizzesTaken: number
  perfectQuizStreak: number
  earlySubmissions: number
  helpfulComments: number
  isTopScorer: boolean
}
