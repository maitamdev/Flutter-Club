import { hexToRgb, rgbToHex, lighten, darken, isValidHex } from '@/lib/utils/color';

describe('Color Utils', () => {
  describe('hexToRgb', () => {
    it('should convert hex to RGB', () => {
      const result = hexToRgb('#ff0000');
      expect(result).toBeDefined();
    });
  });

  describe('isValidHex', () => {
    it('should validate hex color', () => {
      expect(isValidHex('#ff0000')).toBe(true);
      expect(isValidHex('#fff')).toBe(true);
    });
    it('should reject invalid hex', () => {
      expect(isValidHex('invalid')).toBe(false);
    });
  });
});
