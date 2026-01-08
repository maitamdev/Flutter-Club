import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/lib/hooks/useAuth'
import { Toaster } from '@/components/ui/toaster'
import { FloatingRobot } from '@/components/ui/floating-robot'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'WebOOM DHV TEC - Quản lý CLB Flutter',
  description: 'Hệ thống quản lý Câu lạc bộ Flutter - Khoa Kỹ Thuật Công Nghệ - ĐH Văn Hiến',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={spaceGrotesk.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <FloatingRobot />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
