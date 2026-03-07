import { sanitizeHtml, escapeRegex, stripTags } from '@/lib/utils/sanitize';

describe('Sanitize Utils', () => {
  describe('sanitizeHtml', () => {
    it('should sanitize HTML input', () => {
      const input = '<script>alert("xss")</script><p>Hello</p>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<script>');
    });
  });

  describe('escapeRegex', () => {
    it('should escape regex special characters', () => {
      const result = escapeRegex('hello.world*');
      expect(result).toContain('\\.');
      expect(result).toContain('\\*');
    });
  });
});
