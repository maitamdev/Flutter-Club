import { renderHook } from '@testing-library/react';
import { useTimeout } from '@/lib/hooks/useTimeout';

describe('useTimeout', () => {
  jest.useFakeTimers();

  it('should call callback after delay', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
