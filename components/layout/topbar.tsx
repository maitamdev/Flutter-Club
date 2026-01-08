'use client'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Moon, Sun, LogOut, User, Settings, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/hooks/useAuth'
import { cn } from '@/lib/utils'
import { NotificationDropdown } from './notification-dropdown'

export function Topbar() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-6">
      {/* Title */}
      <div className="ml-14 lg:ml-0">
        <div className="flex items-center gap-2">
          <h1 className="text-lg lg:text-xl font-bold gradient-text">WebOOM DHV TEC</h1>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-[10px] font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Sparkles className="h-3 w-3" />
            Beta
          </span>
        </div>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Khoa Kỹ Thuật Công Nghệ - ĐH Hùng Vương TPHCM
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <NotificationDropdown />

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all text-amber-500 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all text-blue-400 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Avatar className="h-9 w-9 ring-2 ring-gray-200 dark:ring-gray-700">
                <AvatarImage src={user?.photoURL} alt={user?.name} />
                <AvatarFallback className={cn(
                  'text-white text-sm font-bold',
                  user?.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    user?.role === 'trainer' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                      'bg-gradient-to-br from-emerald-500 to-teal-500'
                )}>
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 mb-2">
              <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-gray-700 shadow-lg">
                <AvatarImage src={user?.photoURL} alt={user?.name} />
                <AvatarFallback className={cn(
                  'text-white font-bold',
                  user?.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    user?.role === 'trainer' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                      'bg-gradient-to-br from-emerald-500 to-teal-500'
                )}>
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <span className={cn(
                  'inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium',
                  user?.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                    user?.role === 'trainer' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                )}>
                  {user?.role === 'admin' ? '👑 Admin' : user?.role === 'trainer' ? '🎓 Trainer' : '👤 Member'}
                </span>
              </div>
            </div>
            <DropdownMenuItem
              onClick={() => router.push('/profile')}
              className="flex items-center gap-2 p-3 rounded-lg cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span>Hồ sơ cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 p-3 rounded-lg cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <span>Cài đặt</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 p-3 rounded-lg cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <LogOut className="h-4 w-4" />
              </div>
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
