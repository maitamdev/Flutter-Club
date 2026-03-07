import { renderHook, act } from '@testing-library/react';
import { useToggle } from '@/lib/hooks/useToggle';

describe('useToggle', () => {
  it('should initialize with false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle());
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(true);
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(false);
  });

  it('should accept initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });
});
