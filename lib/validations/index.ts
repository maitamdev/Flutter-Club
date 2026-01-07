import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export const accessRequestSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  studentId: z.string().min(5, 'MSSV không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
})

export const sessionSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  startsAt: z.date({ required_error: 'Vui lòng chọn thời gian bắt đầu' }),
  endsAt: z.date({ required_error: 'Vui lòng chọn thời gian kết thúc' }),
  materials: z.array(
    z.object({
      title: z.string().min(1, 'Tiêu đề tài liệu không được trống'),
      url: z.string().url('URL không hợp lệ'),
    })
  ).optional(),
})

export const assignmentSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  dueAt: z.date({ required_error: 'Vui lòng chọn deadline' }),
  rubric: z.array(
    z.object({
      criteria: z.string().min(1, 'Tiêu chí không được trống'),
      maxPoints: z.number().min(1, 'Điểm tối đa phải lớn hơn 0'),
    })
  ).min(1, 'Phải có ít nhất 1 tiêu chí chấm điểm'),
})

export const submissionSchema = z.object({
  githubLink: z.string().url('URL GitHub không hợp lệ').optional().or(z.literal('')),
  demoLink: z.string().url('URL Demo không hợp lệ').optional().or(z.literal('')),
})

export const quizSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  sessionId: z.string().min(1, 'Vui lòng chọn buổi học'),
  duration: z.number().min(1).max(60, 'Thời gian làm bài từ 1-60 phút'),
  questions: z.array(
    z.object({
      question: z.string().min(5, 'Câu hỏi phải có ít nhất 5 ký tự'),
      options: z.array(z.string().min(1)).min(2, 'Phải có ít nhất 2 đáp án'),
      correctIndex: z.number().min(0),
    })
  ).min(1, 'Phải có ít nhất 1 câu hỏi'),
})

export const announcementSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
})

export const gradeSchema = z.object({
  score: z.number().min(0, 'Điểm không được âm'),
  feedback: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type AccessRequestFormData = z.infer<typeof accessRequestSchema>
export type SessionFormData = z.infer<typeof sessionSchema>
export type AssignmentFormData = z.infer<typeof assignmentSchema>
export type SubmissionFormData = z.infer<typeof submissionSchema>
export type QuizFormData = z.infer<typeof quizSchema>
export type AnnouncementFormData = z.infer<typeof announcementSchema>
export type GradeFormData = z.infer<typeof gradeSchema>
