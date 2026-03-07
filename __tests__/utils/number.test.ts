import { clamp, formatNumber, percentage, roundTo, randomInRange } from '@/lib/utils/number';

describe('Number Utils', () => {
  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('formatNumber', () => {
    it('should format large numbers', () => {
      const result = formatNumber(1234567);
      expect(result).toBeDefined();
    });
  });

  describe('percentage', () => {
    it('should calculate percentage', () => {
      expect(percentage(50, 200)).toBe(25);
    });
    it('should handle zero total', () => {
      expect(percentage(0, 0)).toBe(0);
    });
  });

  describe('roundTo', () => {
    it('should round to specified decimals', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
    });
  });
});
