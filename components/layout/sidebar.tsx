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

const menuItems = [
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
  },
  {
    title: 'Bài tập',
    href: '/assignments',
    icon: FileText,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Quiz',
    href: '/quizzes',
    icon: HelpCircle,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Thông báo',
    href: '/announcements',
    icon: Bell,
    roles: ['admin', 'trainer', 'member'],
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Thành viên',
    href: '/members',
    icon: Users,
    roles: ['admin'],
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Yêu cầu tham gia',
    href: '/access-requests',
    icon: UserPlus,
    roles: ['admin'],
    gradient: 'from-cyan-500 to-teal-500',
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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

  const filteredItems = menuItems.filter((item) => {
    if (item.roles.includes('admin') && isAdmin) return true
    if (item.roles.includes('trainer') && isTrainer) return true
    if (item.roles.includes('member')) return true
    return false
  })

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
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200',
                collapsed && !mobileOpen && 'justify-center px-2'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200',
                isActive 
                  ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                  : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
              )}>
                <item.icon className={cn(
                  'h-4 w-4 transition-colors',
                  isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                )} />
              </div>
              {(!collapsed || mobileOpen) && (
                <span className="truncate">{item.title}</span>
              )}
              {isActive && (!collapsed || mobileOpen) && (
                <Sparkles className="h-3 w-3 ml-auto text-blue-500 animate-pulse" />
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
