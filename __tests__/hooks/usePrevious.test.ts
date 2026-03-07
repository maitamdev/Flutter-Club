import { renderHook } from '@testing-library/react';
import { usePrevious } from '@/lib/hooks/usePrevious';

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious('initial'));
    expect(result.current).toBeUndefined();
  });

  it('should return previous value after update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'first' } }
    );
    rerender({ value: 'second' });
    expect(result.current).toBe('first');
  });
});
