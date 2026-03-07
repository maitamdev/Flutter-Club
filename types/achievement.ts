export interface Achievement { id: string; name: string; description: string; icon: string; category: AchievementCategory; points: number; requirement: AchievementRequirement; unlockedBy: string[]; }
export interface AchievementRequirement { type: 'count' | 'streak' | 'score'; target: number; metric: string; }
export type AchievementCategory = 'attendance' | 'learning' | 'contribution' | 'social' | 'special';
