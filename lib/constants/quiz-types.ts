export const QUIZ_QUESTION_TYPES = {
  MULTIPLE_CHOICE: { id: 'multiple-choice', label: 'Tráº¯c nghiá»‡m', icon: 'ListChecks', description: 'Chá»n 1 Ä‘Ã¡p Ã¡n Ä‘Ãºng' },
  MULTI_SELECT: { id: 'multi-select', label: 'Chá»n nhiá»u', icon: 'CheckSquare', description: 'Chá»n nhiá»u Ä‘Ã¡p Ã¡n Ä‘Ãºng' },
  TRUE_FALSE: { id: 'true-false', label: 'ÄÃºng/Sai', icon: 'ToggleLeft', description: 'Chá»n Ä‘Ãºng hoáº·c sai' },
  SHORT_ANSWER: { id: 'short-answer', label: 'Tráº£ lá»i ngáº¯n', icon: 'Type', description: 'Nháº­p cÃ¢u tráº£ lá»i ngáº¯n' },
  FILL_BLANK: { id: 'fill-blank', label: 'Äiá»n vÃ o chá»— trá»‘ng', icon: 'TextCursor', description: 'Äiá»n tá»« cÃ²n thiáº¿u' },
  MATCHING: { id: 'matching', label: 'Ná»‘i cáº·p', icon: 'ArrowLeftRight', description: 'Ná»‘i cÃ¡c cáº·p tÆ°Æ¡ng á»©ng' },
  ORDERING: { id: 'ordering', label: 'Sáº¯p xáº¿p', icon: 'ArrowUpDown', description: 'Sáº¯p xáº¿p Ä‘Ãºng thá»© tá»±' },
} as const;
export const QUIZ_DIFFICULTY = { EASY: { id: 'easy', label: 'Dá»…', color: 'green' }, MEDIUM: { id: 'medium', label: 'Trung bÃ¬nh', color: 'yellow' }, HARD: { id: 'hard', label: 'KhÃ³', color: 'red' } } as const;
