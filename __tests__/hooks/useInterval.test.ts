import { renderHook } from '@testing-library/react';
import { useInterval } from '@/lib/hooks/useInterval';

describe('useInterval', () => {
  jest.useFakeTimers();

  it('should call callback at intervals', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 500));
    jest.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
