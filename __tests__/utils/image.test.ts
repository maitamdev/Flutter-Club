import { getImageDimensions, isValidImageType, generateThumbnailUrl } from '@/lib/utils/image';

describe('Image Utils', () => {
  describe('isValidImageType', () => {
    it('should accept valid image types', () => {
      expect(isValidImageType('image/jpeg')).toBe(true);
      expect(isValidImageType('image/png')).toBe(true);
    });
    it('should reject invalid types', () => {
      expect(isValidImageType('text/plain')).toBe(false);
    });
  });

  describe('generateThumbnailUrl', () => {
    it('should generate thumbnail URL', () => {
      const url = generateThumbnailUrl('https://example.com/photo.jpg', 150);
      expect(url).toBeDefined();
      expect(typeof url).toBe('string');
    });
  });
});
