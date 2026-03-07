import { formatDate, getRelativeTime, getDaysBetween, isWeekend, getStartOfWeek } from '@/lib/utils/date';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('getDaysBetween', () => {
    it('should calculate days between two dates', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-10');
      expect(getDaysBetween(start, end)).toBe(9);
    });
    it('should return 0 for same day', () => {
      const date = new Date('2024-01-01');
      expect(getDaysBetween(date, date)).toBe(0);
    });
  });

  describe('isWeekend', () => {
    it('should return true for Saturday', () => {
      const saturday = new Date('2024-01-13');
      expect(isWeekend(saturday)).toBe(true);
    });
    it('should return false for Monday', () => {
      const monday = new Date('2024-01-15');
      expect(isWeekend(monday)).toBe(false);
    });
  });
});
