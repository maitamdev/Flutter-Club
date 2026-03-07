import { scrollToElement, copyToClipboard, getScrollPosition } from '@/lib/utils/dom';

describe('DOM Utils', () => {
  describe('getScrollPosition', () => {
    it('should return scroll position object', () => {
      const pos = getScrollPosition();
      expect(pos).toHaveProperty('x');
      expect(pos).toHaveProperty('y');
    });
  });

  describe('scrollToElement', () => {
    it('should not throw for missing element', () => {
      expect(() => scrollToElement('nonexistent')).not.toThrow();
    });
  });
});
