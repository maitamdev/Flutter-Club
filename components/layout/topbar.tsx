'use client'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Moon, Sun, LogOut, User, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/hooks/useAuth'

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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      {/* Breadcrumb / Title - ẩn trên mobile để nhường chỗ cho menu button */}
      <div className="ml-12 lg:ml-0">
        <h1 className="text-base lg:text-lg font-semibold">FT-Club Hub</h1>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Câu lạc bộ Flutter - Khoa Kỹ Thuật Công Nghệ
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 lg:gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9 lg:h-10 lg:w-10">
          <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 lg:h-10 lg:w-10"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 lg:h-5 lg:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 lg:h-5 lg:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 lg:h-10 lg:w-10 rounded-full">
              <Avatar className="h-9 w-9 lg:h-10 lg:w-10">
                <AvatarImage src={user?.photoURL} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white text-sm">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Hồ sơ</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
