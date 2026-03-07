import { AppError, isAppError, formatErrorMessage, getErrorCode } from '@/lib/utils/error';

describe('Error Utils', () => {
  describe('AppError', () => {
    it('should create error with code', () => {
      const error = new AppError('Test error', 'TEST_ERROR');
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_ERROR');
    });
  });

  describe('isAppError', () => {
    it('should detect AppError instances', () => {
      const error = new AppError('Test', 'CODE');
      expect(isAppError(error)).toBe(true);
    });
    it('should reject regular errors', () => {
      expect(isAppError(new Error('Regular'))).toBe(false);
    });
  });

  describe('formatErrorMessage', () => {
    it('should format Firebase error messages', () => {
      const result = formatErrorMessage('auth/user-not-found');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});
