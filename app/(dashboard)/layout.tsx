'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'
import { PageLoading } from '@/components/layout/loading'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, firebaseUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!firebaseUser) {
        router.push('/')
      } else if (!user) {
        router.push('/request-access')
      } else if (user.status === 'blocked') {
        router.push('/')
      }
    }
  }, [loading, firebaseUser, user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoading />
      </div>
    )
  }

  if (!user || user.status !== 'active') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <Topbar />
        <main className="p-4 pt-20 lg:pt-6 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
