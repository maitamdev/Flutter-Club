import { generateHash, generateUUID, generateRandomString } from '@/lib/utils/crypto';

describe('Crypto Utils', () => {
  describe('generateUUID', () => {
    it('should generate valid UUID format', () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });
    it('should generate unique values', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('generateRandomString', () => {
    it('should generate string of specified length', () => {
      const result = generateRandomString(16);
      expect(result).toHaveLength(16);
    });
  });
});
