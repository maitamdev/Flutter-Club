import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'
import { User, UserRole } from '@/types'

const googleProvider = new GoogleAuthProvider()

export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signUpWithEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider)
}

export const signOut = async () => {
  return firebaseSignOut(auth)
}

export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const getUserData = async (uid: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid))
  if (userDoc.exists()) {
    const data = userDoc.data()
    return {
      uid: userDoc.id,
      name: data.name,
      studentId: data.studentId,
      email: data.email,
      role: data.role as UserRole,
      status: data.status,
      photoURL: data.photoURL,
      createdAt: data.createdAt?.toDate() || new Date(),
    }
  }
  return null
}

export const createUserDocument = async (
  uid: string,
  data: Partial<User>
): Promise<void> => {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export const checkUserExists = async (uid: string): Promise<boolean> => {
  const userDoc = await getDoc(doc(db, 'users', uid))
  return userDoc.exists()
}
