// Firebase helper types
import type { Timestamp, DocumentReference, DocumentData } from 'firebase/firestore';
export type WithId<T> = T & { id: string };
export type WithTimestamps<T> = T & { createdAt: Timestamp; updatedAt: Timestamp; };
export type FirestoreDoc<T extends DocumentData> = WithId<WithTimestamps<T>>;
export type CollectionName = 'users' | 'events' | 'sessions' | 'materials' | 'quizzes' | 'assignments' | 'announcements' | 'feedback' | 'attendance' | 'notifications';
export interface FirestoreQuery { collection: CollectionName; where?: [string, string, unknown][]; orderBy?: [string, 'asc' | 'desc']; limit?: number; }
