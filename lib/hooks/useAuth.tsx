'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { onAuthChange, getUserData, signOut } from '@/lib/firebase/auth'
import { User } from '@/types'

interface AuthContextType {
  firebaseUser: FirebaseUser | null
  user: User | null
  loading: boolean
  isAdmin: boolean
  isTrainer: boolean
  isMember: boolean
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    if (firebaseUser) {
      const userData = await getUserData(firebaseUser.uid)
      setUser(userData)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthChange(async (fbUser) => {
      setFirebaseUser(fbUser)
      if (fbUser) {
        const userData = await getUserData(fbUser.uid)
        setUser(userData)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut()
    setUser(null)
    setFirebaseUser(null)
  }

  const value: AuthContextType = {
    firebaseUser,
    user,
    loading,
    isAdmin: user?.role === 'admin',
    isTrainer: user?.role === 'trainer' || user?.role === 'admin',
    isMember: user?.role === 'member',
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
