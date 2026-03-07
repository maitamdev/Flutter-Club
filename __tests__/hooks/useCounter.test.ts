import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/lib/hooks/useCounter';

describe('useCounter', () => {
  it('should initialize with 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should increment', () => {
    const { result } = renderHook(() => useCounter());
    act(() => { result.current.increment(); });
    expect(result.current.count).toBe(1);
  });

  it('should decrement', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => { result.current.decrement(); });
    expect(result.current.count).toBe(4);
  });

  it('should reset', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => { result.current.increment(); });
    act(() => { result.current.reset(); });
    expect(result.current.count).toBe(0);
  });
});
