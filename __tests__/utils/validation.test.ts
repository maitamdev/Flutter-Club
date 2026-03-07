import { isValidEmail, isValidPhone, isStrongPassword, isValidUrl } from '@/lib/utils/validation';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });
    it('should reject invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate Vietnamese phone', () => {
      expect(isValidPhone('0901234567')).toBe(true);
    });
  });

  describe('isStrongPassword', () => {
    it('should accept strong password', () => {
      expect(isStrongPassword('MyP@ssw0rd!')).toBe(true);
    });
    it('should reject weak password', () => {
      expect(isStrongPassword('123')).toBe(false);
    });
  });
});
