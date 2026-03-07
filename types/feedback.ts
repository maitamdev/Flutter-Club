export interface Feedback { id: string; userId: string; type: FeedbackType; subject: string; message: string; rating?: number; status: 'pending' | 'reviewed' | 'resolved'; response?: string; attachments?: string[]; createdAt: Date; }
export type FeedbackType = 'bug' | 'feature' | 'improvement' | 'general' | 'complaint';
