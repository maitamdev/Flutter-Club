'use client'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './config'

export const uploadFile = async (
  file: File,
  path: string
): Promise<string> => {
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export const uploadSubmissionFile = async (
  file: File,
  assignmentId: string,
  uid: string
): Promise<string> => {
  const ext = file.name.split('.').pop()
  const path = `submissions/${assignmentId}/${uid}/${Date.now()}.${ext}`
  return uploadFile(file, path)
}

export const uploadSessionMaterial = async (
  file: File,
  sessionId: string
): Promise<string> => {
  const ext = file.name.split('.').pop()
  const path = `materials/${sessionId}/${Date.now()}-${file.name}`
  return uploadFile(file, path)
}
