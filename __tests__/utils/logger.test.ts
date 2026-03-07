import { logger } from '@/lib/utils/logger';

describe('Logger Utils', () => {
  const consoleSpy = {
    log: jest.spyOn(console, 'log').mockImplementation(),
    warn: jest.spyOn(console, 'warn').mockImplementation(),
    error: jest.spyOn(console, 'error').mockImplementation(),
  };

  afterEach(() => jest.clearAllMocks());

  describe('logger.info', () => {
    it('should log info messages', () => {
      logger.info('Test message');
      expect(consoleSpy.log).toHaveBeenCalled();
    });
  });

  describe('logger.warn', () => {
    it('should log warning messages', () => {
      logger.warn('Warning message');
      expect(consoleSpy.warn).toHaveBeenCalled();
    });
  });

  describe('logger.error', () => {
    it('should log error messages', () => {
      logger.error('Error message');
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });
});
