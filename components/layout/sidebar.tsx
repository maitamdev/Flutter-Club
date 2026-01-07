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
  },
  {
    title: 'Buổi học',
    href: '/sessions',
    icon: Calendar,
    roles: ['admin', 'trainer', 'member'],
  },
  {
    title: 'Bài tập',
    href: '/assignments',
    icon: FileText,
    roles: ['admin', 'trainer', 'member'],
  },
  {
    title: 'Quiz',
    href: '/quizzes',
    icon: HelpCircle,
    roles: ['admin', 'trainer', 'member'],
  },
  {
    title: 'Thông báo',
    href: '/announcements',
    icon: Bell,
    roles: ['admin', 'trainer', 'member'],
  },
  {
    title: 'Thành viên',
    href: '/members',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Yêu cầu tham gia',
    href: '/access-requests',
    icon: UserPlus,
    roles: ['admin'],
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAdmin, isTrainer } = useAuth()

  // Đóng menu mobile khi chuyển trang
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Đóng menu khi resize về desktop
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
    <>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {(!collapsed || mobileOpen) && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              FT-Club
            </span>
          </Link>
        )}
        {/* Desktop collapse button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hidden lg:flex"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        {/* Mobile close button */}
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
      <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                collapsed && !mobileOpen && 'justify-center px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 shrink-0', isActive && 'text-blue-500')} />
              {(!collapsed || mobileOpen) && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Role Badge */}
      {(!collapsed || mobileOpen) && user && (
        <div className="p-4 border-t">
          <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3">
            <p className="text-xs text-muted-foreground">Vai trò</p>
            <p className="font-medium capitalize">
              {user.role === 'admin' ? 'Quản trị viên' : 
               user.role === 'trainer' ? 'Giảng viên' : 'Thành viên'}
            </p>
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 bg-background/80 backdrop-blur-sm border shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-72 bg-background border-r flex flex-col transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r bg-background/80 backdrop-blur-xl transition-all duration-300 hidden lg:flex lg:flex-col',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
