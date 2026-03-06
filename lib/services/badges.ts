// Badge/Achievement calculation
export interface Badge { id: string; name: string; description: string; icon: string; condition: (stats: any) => boolean }

export const BADGES: Badge[] = [
  { id: 'first_checkin', name: 'Lan dau diem danh', description: 'Diem danh lan dau tien', icon: 'ðŸŽ¯', condition: (s) => s.totalCheckins >= 1 },
  { id: 'perfect_attendance', name: 'Sieu cham chi', description: 'Diem danh 10 buoi lien tiep', icon: 'ðŸ†', condition: (s) => s.consecutiveCheckins >= 10 },
  { id: 'quiz_master', name: 'Trum quiz', description: 'Dat 100% 3 quiz lien tiep', icon: 'ðŸ§ ', condition: (s) => s.perfectQuizStreak >= 3 },
  { id: 'fast_submitter', name: 'Nop bai som', description: 'Nop bai truoc deadline 3 ngay', icon: 'âš¡', condition: (s) => s.earlySubmissions >= 1 },
  { id: 'all_assignments', name: 'Hoan thanh tat ca', description: 'Nop day du 100% bai tap', icon: 'âœ…', condition: (s) => s.submissionRate >= 100 },
  { id: 'top_scorer', name: 'Diem cao nhat', description: 'Dat diem cao nhat lop', icon: 'â­', condition: (s) => s.isTopScorer },
  { id: 'helpful', name: 'Nguoi giup do', description: 'Binh luan giup do 10 lan', icon: 'ðŸ¤', condition: (s) => s.helpfulComments >= 10 },
]
