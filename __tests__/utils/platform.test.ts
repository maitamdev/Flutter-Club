import { isBrowser, isMobile, isIOS, isAndroid, getBrowserName } from '@/lib/utils/platform';

describe('Platform Utils', () => {
  describe('isBrowser', () => {
    it('should return true in jsdom environment', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('isMobile', () => {
    it('should return boolean', () => {
      expect(typeof isMobile()).toBe('boolean');
    });
  });

  describe('getBrowserName', () => {
    it('should return a string', () => {
      const name = getBrowserName();
      expect(typeof name).toBe('string');
    });
  });
});
