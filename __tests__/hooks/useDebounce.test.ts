import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/lib/hooks/useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should return debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );
    expect(result.current).toBe('initial');
    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');
    act(() => { jest.advanceTimersByTime(500); });
    expect(result.current).toBe('updated');
  });
});
