import { sleep, retry, timeout, debounceAsync } from '@/lib/utils/async';

describe('Async Utils', () => {
  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      const start = Date.now();
      await sleep(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });
  });

  describe('retry', () => {
    it('should retry failed operations', async () => {
      let attempts = 0;
      const fn = async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      };
      const result = await retry(fn, 3);
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });
  });
});
