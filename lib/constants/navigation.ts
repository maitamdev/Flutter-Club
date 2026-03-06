// Navigation constants for sidebar
import { BookOpen, Users, Calendar, FileText, MessageSquare, Brain, ClipboardList, Settings } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: any
  roles?: string[]
}

export const NAV_ITEMS: NavItem[] = [
  { title: 'Buoi hoc', href: '/sessions', icon: Calendar },
  { title: 'Bai tap', href: '/assignments', icon: ClipboardList },
  { title: 'Quiz', href: '/quizzes', icon: Brain },
  { title: 'Tai lieu', href: '/materials', icon: BookOpen },
  { title: 'Thong bao', href: '/announcements', icon: MessageSquare },
  { title: 'Thanh vien', href: '/members', icon: Users, roles: ['admin', 'trainer'] },
  { title: 'Yeu cau tham gia', href: '/access-requests', icon: FileText, roles: ['admin'] },
]
