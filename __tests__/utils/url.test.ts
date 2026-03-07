import { buildUrl, getQueryParams, isExternalUrl, removeTrailingSlash } from '@/lib/utils/url';

describe('URL Utils', () => {
  describe('isExternalUrl', () => {
    it('should detect external URLs', () => {
      expect(isExternalUrl('https://google.com')).toBe(true);
    });
    it('should detect internal URLs', () => {
      expect(isExternalUrl('/dashboard')).toBe(false);
    });
  });

  describe('removeTrailingSlash', () => {
    it('should remove trailing slash', () => {
      expect(removeTrailingSlash('/path/')).toBe('/path');
    });
    it('should not modify paths without trailing slash', () => {
      expect(removeTrailingSlash('/path')).toBe('/path');
    });
  });

  describe('buildUrl', () => {
    it('should build URL with query params', () => {
      const result = buildUrl('/api/users', { page: '1', limit: '10' });
      expect(result).toContain('page=1');
      expect(result).toContain('limit=10');
    });
  });
});
