'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  FileText,
  HelpCircle,
  Bell,
  Users,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { 
  subscribeToAccessRequests, 
  getSessions, 
  getAssignments, 
  getQuizzes,
  subscribeToAnnouncements,
  getUsers 
} from '@/lib/firebase/firestore'
import { isOverdue } from '@/lib/utils'

interface MenuItemType {
  title: string
  href: string
  icon: any
  roles: string[]
  gradient: string
  countKey?: string
}

const menuItems: MenuItemType[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Buổi học',
    href: '/sessions',
    icon: Calendar,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-violet-500 to-purple-500',
    countKey: 'sessions',
  },
  {
    title: 'Bài tập',
    href: '/assignments',
    icon: FileText,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-emerald-500 to-teal-500',
    countKey: 'assignments',
  },
  {
    title: 'Quiz',
    href: '/quizzes',
    icon: HelpCircle,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-orange-500 to-amber-500',
    countKey: 'quizzes',
  },
  {
    title: 'Thông báo',
    href: '/announcements',
    icon: Bell,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-pink-500 to-rose-500',
    countKey: 'announcements',
  },
  {
    title: 'Thành viên',
    href: '/members',
    icon: Users,
    roles: ['admin'],
    gradient: 'from-indigo-500 to-blue-500',
    countKey: 'members',
  },
  {
    title: 'Yêu cầu tham gia',
    href: '/access-requests',
    icon: UserPlus,
    roles: ['admin'],
    gradient: 'from-cyan-500 to-teal-500',
    countKey: 'requests',
  },
]

interface Counts {
  sessions: number
  assignments: number
  quizzes: number
  announcements: number
  members: number
  requests: number
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [counts, setCounts] = useState<Counts>({
    sessions: 0,
    assignments: 0,
    quizzes: 0,
    announcements: 0,
    members: 0,
    requests: 0,
  })
  const pathname = usePathname()
  const { user, isAdmin, isTrainer } = useAuth()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Sessions - upcoming
        const sessions = await getSessions()
        const upcomingSessions = sessions.filter(s => new Date(s.startsAt) > new Date()).length
        
        // Assignments - open (not overdue)
        const assignments = await getAssignments()
        const openAssignments = assignments.filter(a => !isOverdue(new Date(a.dueAt))).length
        
        // Quizzes - active
        const quizzes = await getQuizzes()
        const now = new Date()
        const activeQuizzes = quizzes.filter(q => {
          const start = new Date(q.startsAt)
          const end = new Date(q.endsAt)
          return q.isActive && now >= start && now <= end
        }).length

        // Members (only for admin)
        let membersCount = 0
        if (isAdmin) {
          const users = await getUsers()
          membersCount = users.filter(u => u.status === 'active').length
        }

        setCounts(prev => ({
          ...prev,
          sessions: upcomingSessions,
          assignments: openAssignments,
          quizzes: activeQuizzes,
          members: membersCount,
        }))
      } catch (error) {
        console.error('Error fetching counts:', error)
      }
    }

    fetchCounts()
    // Refresh every 30 seconds
    const interval = setInterval(fetchCounts, 30000)
    return () => clearInterval(interval)
  }, [isAdmin])

  // Subscribe to realtime updates
  useEffect(() => {
    // Announcements - realtime
    const unsubAnnouncements = subscribeToAnnouncements((announcements) => {
      // Count announcements from last 7 days
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const recentCount = announcements.filter(a => new Date(a.createdAt) > weekAgo).length
      setCounts(prev => ({ ...prev, announcements: recentCount }))
    }, 50)

    return () => {
      unsubAnnouncements()
    }
  }, [])

  // Subscribe to access requests (admin only)
  useEffect(() => {
    if (!isAdmin) return

    const unsubRequests = subscribeToAccessRequests('pending', (requests) => {
      setCounts(prev => ({ ...prev, requests: requests.length }))
    })

    return () => unsubRequests()
  }, [isAdmin])

  const filteredItems = menuItems.filter((item) => {
    if (item.roles.includes('admin') && isAdmin) return true
    if (item.roles.includes('trainer') && isTrainer) return true
    if (item.roles.includes('member')) return true
    return false
  })

  const getCount = (countKey?: string): number => {
    if (!countKey) return 0
    return counts[countKey as keyof Counts] || 0
  }

  const getBadgeColor = (countKey?: string): string => {
    switch (countKey) {
      case 'requests':
        return 'bg-red-500'
      case 'announcements':
        return 'bg-pink-500'
      case 'sessions':
        return 'bg-violet-500'
      case 'assignments':
        return 'bg-emerald-500'
      case 'quizzes':
        return 'bg-orange-500'
      case 'members':
        return 'bg-indigo-500'
      default:
        return 'bg-blue-500'
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200/50 dark:border-gray-700/50">
        {(!collapsed || mobileOpen) && (
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg gradient-text">WebOOM</span>
              <span className="text-[10px] text-muted-foreground -mt-1">DHV TEC</span>
            </div>
          </Link>
        )}
        {collapsed && !mobileOpen && (
          <Link href="/dashboard" className="mx-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hidden lg:flex hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(false)}
          className="h-8 w-8 lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {filteredItems.map((item, index) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const count = getCount(item.countKey)
          const showBadge = count > 0
          const badgeColor = getBadgeColor(item.countKey)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative',
                isActive
                  ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200',
                collapsed && !mobileOpen && 'justify-center px-2'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                'relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200',
                isActive 
                  ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                  : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
              )}>
                <item.icon className={cn(
                  'h-4 w-4 transition-colors',
                  isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                )} />
                {/* Badge on icon when collapsed */}
                {showBadge && collapsed && !mobileOpen && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center">
                    <span className={cn('relative flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full text-[10px] font-bold text-white', badgeColor)}>
                      {count > 99 ? '99+' : count}
                    </span>
                  </span>
                )}
              </div>
              {(!collapsed || mobileOpen) && (
                <>
                  <span className="truncate flex-1">{item.title}</span>
                  {/* Badge when expanded */}
                  {showBadge && (
                    <span className={cn(
                      'flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full text-[11px] font-bold text-white',
                      badgeColor
                    )}>
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                  {isActive && !showBadge && (
                    <Sparkles className="h-3 w-3 ml-auto text-blue-500 animate-pulse" />
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Role Badge */}
      {(!collapsed || mobileOpen) && user && (
        <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className={cn(
                'h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-sm',
                user.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                user.role === 'trainer' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                'bg-gradient-to-br from-emerald-500 to-teal-500'
              )}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.role === 'admin' ? '👑 Quản trị viên' : 
                   user.role === 'trainer' ? '🎓 Giảng viên' : '👤 Thành viên'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Calculate total notifications for mobile button
  const totalNotifications = counts.requests

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden h-11 w-11 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <Menu className="h-5 w-5" />
        {/* Badge on mobile menu button - only show pending requests */}
        {isAdmin && totalNotifications > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {totalNotifications > 9 ? '9+' : totalNotifications}
            </span>
          </span>
        )}
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transition-transform duration-300 lg:hidden shadow-2xl',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hidden lg:block',
          collapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
