export interface LeaderboardEntry { userId: string; displayName: string; avatarUrl?: string; score: number; rank: number; previousRank?: number; achievements: number; streak: number; }
export interface LeaderboardConfig { id: string; name: string; period: 'weekly' | 'monthly' | 'all-time'; metric: string; }
