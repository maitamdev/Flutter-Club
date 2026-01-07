import {
  createNotification,
  createNotificationForAll,
} from '@/lib/firebase/firestore'

// Gửi thông báo khi tạo session mới
export const notifyNewSession = async (
  sessionTitle: string,
  sessionId: string,
  creatorId: string
) => {
  await createNotificationForAll(
    'session_created',
    'Buổi học mới',
    `Buổi học "${sessionTitle}" đã được tạo`,
    `/sessions/${sessionId}`,
    creatorId
  )
}

// Gửi thông báo khi tạo assignment mới
export const notifyNewAssignment = async (
  assignmentTitle: string,
  assignmentId: string,
  creatorId: string
) => {
  await createNotificationForAll(
    'assignment_created',
    'Bài tập mới',
    `Bài tập "${assignmentTitle}" đã được giao`,
    `/assignments/${assignmentId}`,
    creatorId
  )
}

// Gửi thông báo khi chấm điểm
export const notifySubmissionGraded = async (
  userId: string,
  assignmentTitle: string,
  assignmentId: string,
  score: number
) => {
  await createNotification(
    userId,
    'submission_graded',
    'Bài tập đã được chấm',
    `Bài "${assignmentTitle}" của bạn được ${score} điểm`,
    `/assignments/${assignmentId}`
  )
}

// Gửi thông báo khi có announcement mới
export const notifyNewAnnouncement = async (
  title: string,
  creatorId: string
) => {
  await createNotificationForAll(
    'announcement',
    'Thông báo mới',
    title,
    '/announcements',
    creatorId
  )
}

// Gửi thông báo khi duyệt/từ chối access request
export const notifyAccessRequestResult = async (
  userId: string,
  approved: boolean
) => {
  await createNotification(
    userId,
    approved ? 'access_approved' : 'access_rejected',
    approved ? 'Yêu cầu được duyệt' : 'Yêu cầu bị từ chối',
    approved
      ? 'Chào mừng bạn đến với CLB! Bạn có thể đăng nhập ngay.'
      : 'Yêu cầu tham gia CLB của bạn đã bị từ chối.',
    approved ? '/dashboard' : undefined
  )
}

// Gửi thông báo khi có quiz mới
export const notifyNewQuiz = async (
  quizTitle: string,
  quizId: string,
  creatorId: string
) => {
  await createNotificationForAll(
    'quiz_available',
    'Quiz mới',
    `Quiz "${quizTitle}" đã sẵn sàng`,
    `/quizzes/${quizId}`,
    creatorId
  )
}
