import { renderHook } from '@testing-library/react';
import { useThrottle } from '@/lib/hooks/useThrottle';

describe('useThrottle', () => {
  jest.useFakeTimers();

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('initial', 500));
    expect(result.current).toBe('initial');
  });
});
