import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  QueryConstraint,
  setDoc,
} from 'firebase/firestore'
import { db } from './config'
import {
  User,
  AccessRequest,
  Session,
  AttendanceWindow,
  Attendance,
  Assignment,
  Submission,
  Quiz,
  QuizAttempt,
  Announcement,
  Comment,
  Notification,
  NotificationType,
} from '@/types'

// Helper to convert Firestore timestamp
const convertTimestamp = (timestamp: Timestamp | null): Date => {
  return timestamp?.toDate() || new Date()
}

// ============ USERS ============
export const getUsers = async (): Promise<User[]> => {
  const snapshot = await getDocs(collection(db, 'users'))
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
  })) as User[]
}

export const updateUser = async (uid: string, data: Partial<User>) => {
  await updateDoc(doc(db, 'users', uid), data)
}

export const deleteUser = async (uid: string) => {
  await deleteDoc(doc(db, 'users', uid))
}

// ============ ACCESS REQUESTS ============
export const createAccessRequest = async (
  data: Omit<AccessRequest, 'id' | 'createdAt' | 'status'>
) => {
  return addDoc(collection(db, 'accessRequests'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  })
}

export const getAccessRequests = async (
  status?: string
): Promise<AccessRequest[]> => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]
  if (status) {
    constraints.unshift(where('status', '==', status))
  }
  const q = query(collection(db, 'accessRequests'), ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
    reviewedAt: doc.data().reviewedAt
      ? convertTimestamp(doc.data().reviewedAt)
      : undefined,
  })) as AccessRequest[]
}

export const updateAccessRequest = async (
  id: string,
  data: Partial<AccessRequest>
) => {
  await updateDoc(doc(db, 'accessRequests', id), {
    ...data,
    reviewedAt: serverTimestamp(),
  })
}

export const checkPendingRequest = async (uid: string): Promise<boolean> => {
  const q = query(
    collection(db, 'accessRequests'),
    where('uid', '==', uid),
    where('status', '==', 'pending')
  )
  const snapshot = await getDocs(q)
  return !snapshot.empty
}

// Realtime listener cho access requests
export const subscribeToAccessRequests = (
  status: string,
  callback: (requests: AccessRequest[]) => void
) => {
  // Query đơn giản hơn - chỉ filter theo status, sort ở client
  const q = query(
    collection(db, 'accessRequests'),
    where('status', '==', status)
  )
  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
      reviewedAt: doc.data().reviewedAt
        ? convertTimestamp(doc.data().reviewedAt)
        : undefined,
    })) as AccessRequest[]
    // Sort ở client
    requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    callback(requests)
  })
}

// ============ SESSIONS ============
export const getSessions = async (upcoming?: boolean): Promise<Session[]> => {
  const constraints: QueryConstraint[] = [orderBy('startsAt', 'desc')]
  if (upcoming) {
    constraints.unshift(where('startsAt', '>=', Timestamp.now()))
  }
  const q = query(collection(db, 'sessions'), ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    startsAt: convertTimestamp(doc.data().startsAt),
    endsAt: convertTimestamp(doc.data().endsAt),
    createdAt: convertTimestamp(doc.data().createdAt),
  })) as Session[]
}

export const getSession = async (id: string): Promise<Session | null> => {
  const docSnap = await getDoc(doc(db, 'sessions', id))
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    startsAt: convertTimestamp(data.startsAt),
    endsAt: convertTimestamp(data.endsAt),
    createdAt: convertTimestamp(data.createdAt),
  } as Session
}

export const createSession = async (
  data: Omit<Session, 'id' | 'createdAt'>
) => {
  return addDoc(collection(db, 'sessions'), {
    ...data,
    startsAt: Timestamp.fromDate(data.startsAt),
    endsAt: Timestamp.fromDate(data.endsAt),
    createdAt: serverTimestamp(),
  })
}

export const updateSession = async (id: string, data: Partial<Session>) => {
  const updateData: Record<string, unknown> = { ...data }
  if (data.startsAt) updateData.startsAt = Timestamp.fromDate(data.startsAt)
  if (data.endsAt) updateData.endsAt = Timestamp.fromDate(data.endsAt)
  await updateDoc(doc(db, 'sessions', id), updateData)
}

export const deleteSession = async (id: string) => {
  await deleteDoc(doc(db, 'sessions', id))
}

// ============ ATTENDANCE ============
export const startAttendanceWindow = async (
  sessionId: string,
  durationMinutes: number = 10
) => {
  const tokenSeed = crypto.randomUUID()
  const now = new Date()
  const endsAt = new Date(now.getTime() + durationMinutes * 60 * 1000)

  await setDoc(doc(db, 'attendanceWindows', sessionId), {
    sessionId,
    isActive: true,
    startedAt: Timestamp.fromDate(now),
    endsAt: Timestamp.fromDate(endsAt),
    tokenSeed,
    tokenRotatesEverySec: 10, // Thay đổi mỗi 10 giây
  })

  return { tokenSeed, endsAt }
}

export const endAttendanceWindow = async (sessionId: string) => {
  await updateDoc(doc(db, 'attendanceWindows', sessionId), {
    isActive: false,
  })
}

export const getAttendanceWindow = async (
  sessionId: string
): Promise<AttendanceWindow | null> => {
  const docSnap = await getDoc(doc(db, 'attendanceWindows', sessionId))
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    ...data,
    startedAt: convertTimestamp(data.startedAt),
    endsAt: convertTimestamp(data.endsAt),
  } as AttendanceWindow
}

export const subscribeToAttendanceWindow = (
  sessionId: string,
  callback: (window: AttendanceWindow | null) => void
) => {
  return onSnapshot(doc(db, 'attendanceWindows', sessionId), (docSnap) => {
    if (!docSnap.exists()) {
      callback(null)
      return
    }
    const data = docSnap.data()
    callback({
      ...data,
      startedAt: convertTimestamp(data.startedAt),
      endsAt: convertTimestamp(data.endsAt),
    } as AttendanceWindow)
  })
}

export const checkIn = async (
  sessionId: string,
  uid: string,
  userName: string,
  studentId: string,
  isLate: boolean
) => {
  await setDoc(doc(db, 'sessions', sessionId, 'attendance', uid), {
    uid,
    userName,
    studentId,
    checkedAt: serverTimestamp(),
    status: isLate ? 'late' : 'on-time',
  })
}

export const getAttendance = async (sessionId: string): Promise<Attendance[]> => {
  const snapshot = await getDocs(
    collection(db, 'sessions', sessionId, 'attendance')
  )
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
    checkedAt: convertTimestamp(doc.data().checkedAt),
  })) as Attendance[]
}

export const subscribeToAttendance = (
  sessionId: string,
  callback: (attendance: Attendance[]) => void
) => {
  return onSnapshot(
    collection(db, 'sessions', sessionId, 'attendance'),
    (snapshot) => {
      const attendance = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
        checkedAt: convertTimestamp(doc.data().checkedAt),
      })) as Attendance[]
      callback(attendance)
    }
  )
}

export const getUserAttendance = async (
  sessionId: string,
  uid: string
): Promise<Attendance | null> => {
  const docSnap = await getDoc(
    doc(db, 'sessions', sessionId, 'attendance', uid)
  )
  if (!docSnap.exists()) return null
  return {
    uid: docSnap.id,
    ...docSnap.data(),
    checkedAt: convertTimestamp(docSnap.data().checkedAt),
  } as Attendance
}

// ============ ASSIGNMENTS ============
export const getAssignments = async (): Promise<Assignment[]> => {
  const q = query(collection(db, 'assignments'), orderBy('dueAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    dueAt: convertTimestamp(doc.data().dueAt),
    createdAt: convertTimestamp(doc.data().createdAt),
  })) as Assignment[]
}

export const getAssignment = async (id: string): Promise<Assignment | null> => {
  const docSnap = await getDoc(doc(db, 'assignments', id))
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    dueAt: convertTimestamp(data.dueAt),
    createdAt: convertTimestamp(data.createdAt),
  } as Assignment
}

export const createAssignment = async (
  data: Omit<Assignment, 'id' | 'createdAt'>
) => {
  return addDoc(collection(db, 'assignments'), {
    ...data,
    dueAt: Timestamp.fromDate(data.dueAt),
    createdAt: serverTimestamp(),
  })
}

export const updateAssignment = async (
  id: string,
  data: Partial<Assignment>
) => {
  const updateData: Record<string, unknown> = { ...data }
  if (data.dueAt) updateData.dueAt = Timestamp.fromDate(data.dueAt)
  await updateDoc(doc(db, 'assignments', id), updateData)
}

export const deleteAssignment = async (id: string) => {
  await deleteDoc(doc(db, 'assignments', id))
}

// ============ SUBMISSIONS ============
export const submitAssignment = async (
  assignmentId: string,
  uid: string,
  data: Omit<Submission, 'uid' | 'submittedAt'>
) => {
  await setDoc(doc(db, 'assignments', assignmentId, 'submissions', uid), {
    uid,
    ...data,
    submittedAt: serverTimestamp(),
  })
}

export const getSubmissions = async (
  assignmentId: string
): Promise<Submission[]> => {
  const snapshot = await getDocs(
    collection(db, 'assignments', assignmentId, 'submissions')
  )
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
    submittedAt: convertTimestamp(doc.data().submittedAt),
    reviewedAt: doc.data().reviewedAt
      ? convertTimestamp(doc.data().reviewedAt)
      : undefined,
  })) as Submission[]
}

export const getUserSubmission = async (
  assignmentId: string,
  uid: string
): Promise<Submission | null> => {
  const docSnap = await getDoc(
    doc(db, 'assignments', assignmentId, 'submissions', uid)
  )
  if (!docSnap.exists()) return null
  return {
    uid: docSnap.id,
    ...docSnap.data(),
    submittedAt: convertTimestamp(docSnap.data().submittedAt),
    reviewedAt: docSnap.data().reviewedAt
      ? convertTimestamp(docSnap.data().reviewedAt)
      : undefined,
  } as Submission
}

export const gradeSubmission = async (
  assignmentId: string,
  uid: string,
  score: number,
  feedback: string,
  reviewedBy: string
) => {
  await updateDoc(doc(db, 'assignments', assignmentId, 'submissions', uid), {
    score,
    feedback,
    reviewedBy,
    reviewedAt: serverTimestamp(),
  })
}

export const subscribeToSubmissions = (
  assignmentId: string,
  callback: (submissions: Submission[]) => void
) => {
  return onSnapshot(
    collection(db, 'assignments', assignmentId, 'submissions'),
    (snapshot) => {
      const submissions = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
        submittedAt: convertTimestamp(doc.data().submittedAt),
        reviewedAt: doc.data().reviewedAt
          ? convertTimestamp(doc.data().reviewedAt)
          : undefined,
      })) as Submission[]
      callback(submissions)
    }
  )
}

// ============ QUIZZES ============
export const getQuizzes = async (): Promise<Quiz[]> => {
  const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    startsAt: convertTimestamp(doc.data().startsAt),
    endsAt: convertTimestamp(doc.data().endsAt),
    createdAt: convertTimestamp(doc.data().createdAt),
  })) as Quiz[]
}

export const getQuiz = async (id: string): Promise<Quiz | null> => {
  const docSnap = await getDoc(doc(db, 'quizzes', id))
  if (!docSnap.exists()) return null
  const data = docSnap.data()
  return {
    id: docSnap.id,
    ...data,
    startsAt: convertTimestamp(data.startsAt),
    endsAt: convertTimestamp(data.endsAt),
    createdAt: convertTimestamp(data.createdAt),
  } as Quiz
}

export const createQuiz = async (data: Omit<Quiz, 'id' | 'createdAt'>) => {
  return addDoc(collection(db, 'quizzes'), {
    ...data,
    startsAt: Timestamp.fromDate(data.startsAt),
    endsAt: Timestamp.fromDate(data.endsAt),
    createdAt: serverTimestamp(),
  })
}

export const submitQuizAttempt = async (
  quizId: string,
  uid: string,
  answers: number[],
  score: number
) => {
  await setDoc(doc(db, 'quizzes', quizId, 'attempts', uid), {
    uid,
    quizId,
    answers,
    score,
    submittedAt: serverTimestamp(),
  })
}

export const getUserQuizAttempt = async (
  quizId: string,
  uid: string
): Promise<QuizAttempt | null> => {
  const docSnap = await getDoc(doc(db, 'quizzes', quizId, 'attempts', uid))
  if (!docSnap.exists()) return null
  return {
    ...docSnap.data(),
    submittedAt: convertTimestamp(docSnap.data().submittedAt),
  } as QuizAttempt
}

// ============ ANNOUNCEMENTS ============
export const getAnnouncements = async (
  limitCount?: number
): Promise<Announcement[]> => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]
  if (limitCount) constraints.push(limit(limitCount))
  const q = query(collection(db, 'announcements'), ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
  })) as Announcement[]
}

export const createAnnouncement = async (
  data: Omit<Announcement, 'id' | 'createdAt'>
) => {
  return addDoc(collection(db, 'announcements'), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export const deleteAnnouncement = async (id: string) => {
  await deleteDoc(doc(db, 'announcements', id))
}

export const subscribeToAnnouncements = (
  callback: (announcements: Announcement[]) => void,
  limitCount: number = 10
) => {
  const q = query(
    collection(db, 'announcements'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  return onSnapshot(q, (snapshot) => {
    const announcements = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
    })) as Announcement[]
    callback(announcements)
  })
}

// ============ COMMENTS ============
export const addComment = async (
  assignmentId: string,
  data: Omit<Comment, 'id' | 'createdAt'>
) => {
  return addDoc(collection(db, 'assignments', assignmentId, 'comments'), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export const getComments = async (assignmentId: string): Promise<Comment[]> => {
  const q = query(
    collection(db, 'assignments', assignmentId, 'comments'),
    orderBy('createdAt', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
  })) as Comment[]
}

export const subscribeToComments = (
  assignmentId: string,
  callback: (comments: Comment[]) => void
) => {
  const q = query(
    collection(db, 'assignments', assignmentId, 'comments'),
    orderBy('createdAt', 'asc')
  )
  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
    })) as Comment[]
    callback(comments)
  })
}

export const deleteComment = async (assignmentId: string, commentId: string) => {
  await deleteDoc(doc(db, 'assignments', assignmentId, 'comments', commentId))
}


// ============ NOTIFICATIONS ============
export const createNotification = async (
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  link?: string
) => {
  return addDoc(collection(db, 'users', userId, 'notifications'), {
    userId,
    type,
    title,
    message,
    link,
    isRead: false,
    createdAt: serverTimestamp(),
  })
}

export const createNotificationForAll = async (
  type: NotificationType,
  title: string,
  message: string,
  link?: string,
  excludeUserId?: string
) => {
  const users = await getUsers()
  const activeUsers = users.filter(u => u.status === 'active' && u.uid !== excludeUserId)
  
  const promises = activeUsers.map(user =>
    createNotification(user.uid, type, title, message, link)
  )
  await Promise.all(promises)
}

export const getNotifications = async (
  userId: string,
  limitCount: number = 20
): Promise<Notification[]> => {
  const q = query(
    collection(db, 'users', userId, 'notifications'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: convertTimestamp(doc.data().createdAt),
  })) as Notification[]
}

export const subscribeToNotifications = (
  userId: string,
  callback: (notifications: Notification[]) => void,
  limitCount: number = 20
) => {
  const q = query(
    collection(db, 'users', userId, 'notifications'),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
    })) as Notification[]
    callback(notifications)
  })
}

export const markNotificationAsRead = async (userId: string, notificationId: string) => {
  await updateDoc(doc(db, 'users', userId, 'notifications', notificationId), {
    isRead: true,
  })
}

export const markAllNotificationsAsRead = async (userId: string) => {
  const notifications = await getNotifications(userId)
  const unread = notifications.filter(n => !n.isRead)
  const promises = unread.map(n =>
    markNotificationAsRead(userId, n.id)
  )
  await Promise.all(promises)
}

export const deleteNotification = async (userId: string, notificationId: string) => {
  await deleteDoc(doc(db, 'users', userId, 'notifications', notificationId))
}
