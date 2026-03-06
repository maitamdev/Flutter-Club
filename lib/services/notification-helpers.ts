// Notification helpers
import { createNotification, createNotificationForAll } from '@/lib/firebase/firestore'

export async function notifyNewSession(sessionTitle: string, creatorId: string) {
  await createNotificationForAll('session_created', 'Buoi hoc moi', 'Buoi hoc "' + sessionTitle + '" da duoc tao', '/sessions', creatorId)
}
export async function notifyNewAssignment(assignmentTitle: string, creatorId: string) {
  await createNotificationForAll('assignment_created', 'Bai tap moi', 'Bai tap "' + assignmentTitle + '" da duoc giao', '/assignments', creatorId)
}
export async function notifySubmissionGraded(userId: string, assignmentTitle: string, score: number) {
  await createNotification(userId, 'submission_graded', 'Bai tap da cham diem', 'Bai tap "' + assignmentTitle + '" da duoc cham: ' + score + ' diem', '/assignments')
}
export async function notifyNewQuiz(quizTitle: string, creatorId: string) {
  await createNotificationForAll('quiz_available', 'Quiz moi', 'Quiz "' + quizTitle + '" da san sang', '/quizzes', creatorId)
}
export async function notifyNewAnnouncement(title: string, creatorId: string) {
  await createNotificationForAll('announcement', 'Thong bao moi', title, '/announcements', creatorId)
}
