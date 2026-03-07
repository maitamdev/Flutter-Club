export const ACHIEVEMENT_DEFINITIONS = [
  { id: 'first-login', name: 'ChÃ o TÃ¢n Binh', description: 'ÄÄƒng nháº­p láº§n Ä‘áº§u', icon: 'ðŸŽ‰', points: 10, category: 'social' },
  { id: 'perfect-attendance-week', name: 'ChuyÃªn Cáº§n Tuáº§n', description: 'Äiá»ƒm danh Ä‘á»§ 1 tuáº§n', icon: 'ðŸ“…', points: 50, category: 'attendance' },
  { id: 'perfect-attendance-month', name: 'ChuyÃªn Cáº§n ThÃ¡ng', description: 'Äiá»ƒm danh Ä‘á»§ 1 thÃ¡ng', icon: 'ðŸ†', points: 200, category: 'attendance' },
  { id: 'quiz-master', name: 'Vua Quiz', description: 'HoÃ n thÃ nh 10 quiz', icon: 'ðŸ§ ', points: 100, category: 'learning' },
  { id: 'first-project', name: 'Dá»± Ãn Äáº§u Tay', description: 'HoÃ n thÃ nh project Ä‘áº§u tiÃªn', icon: 'ðŸš€', points: 150, category: 'contribution' },
  { id: 'helper', name: 'NgÆ°á»i GiÃºp Äá»¡', description: 'Pháº£n há»“i 20 bÃ¬nh luáº­n', icon: 'ðŸ¤', points: 100, category: 'social' },
  { id: 'streak-7', name: 'Streak 7 ngÃ y', description: 'Hoáº¡t Ä‘á»™ng 7 ngÃ y liÃªn tiáº¿p', icon: 'ðŸ”¥', points: 70, category: 'attendance' },
  { id: 'top-scorer', name: 'Top Scorer', description: 'Äáº¡t Ä‘iá»ƒm cao nháº¥t quiz', icon: 'â­', points: 200, category: 'learning' },
] as const;
export type AchievementId = (typeof ACHIEVEMENT_DEFINITIONS)[number]['id'];
