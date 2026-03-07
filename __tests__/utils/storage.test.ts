import { getItem, setItem, removeItem, clearStorage } from '@/lib/utils/storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('setItem and getItem', () => {
    it('should store and retrieve values', () => {
      setItem('key', { name: 'test' });
      const result = getItem('key');
      expect(result).toEqual({ name: 'test' });
    });
    it('should return null for missing key', () => {
      expect(getItem('nonexistent')).toBeNull();
    });
  });

  describe('removeItem', () => {
    it('should remove stored value', () => {
      setItem('key', 'value');
      removeItem('key');
      expect(getItem('key')).toBeNull();
    });
  });
});
