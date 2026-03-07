export interface ChatMessage { id: string; channelId: string; senderId: string; content: string; type: 'text' | 'image' | 'file' | 'system'; replyTo?: string; reactions: Record<string, string[]>; editedAt?: Date; createdAt: Date; }
export interface ChatChannel { id: string; name: string; type: 'group' | 'direct'; members: string[]; lastMessage?: ChatMessage; unreadCount: number; }
