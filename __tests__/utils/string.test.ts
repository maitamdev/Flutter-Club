import { slugify, truncateText, capitalize, camelToKebab, stripHtml, countWords } from '@/lib/utils/string';

describe('String Utils', () => {
  describe('slugify', () => {
    it('should convert text to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });
    it('should handle special characters', () => {
      expect(slugify('Hello & World!')).toBe('hello--world');
    });
    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const result = truncateText('This is a very long text', 10);
      expect(result.length).toBeLessThanOrEqual(13);
    });
    it('should not truncate short text', () => {
      expect(truncateText('Short', 10)).toBe('Short');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
  });
});
