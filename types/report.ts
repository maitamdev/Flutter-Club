// Report and analytics types
export interface AttendanceReport {
  userId: string
  userName: string
  totalSessions: number
  attendedSessions: number
  lateCount: number
  absentCount: number
  attendanceRate: number
}
export interface AssignmentReport {
  userId: string
  userName: string
  totalAssignments: number
  submitted: number
  graded: number
  averageScore: number
}
export interface QuizReport {
  userId: string
  userName: string
  quizzesTaken: number
  averageScore: number
  highestScore: number
  lowestScore: number
}
