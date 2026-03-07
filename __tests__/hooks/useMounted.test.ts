import { renderHook } from '@testing-library/react';
import { useMounted } from '@/lib/hooks/useMounted';

describe('useMounted', () => {
  it('should return true after mount', () => {
    const { result } = renderHook(() => useMounted());
    expect(result.current).toBe(true);
  });
});
