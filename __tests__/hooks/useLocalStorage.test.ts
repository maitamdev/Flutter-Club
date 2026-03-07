import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear());

  it('should return initial value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should update stored value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    act(() => { result.current[1]('updated'); });
    expect(result.current[0]).toBe('updated');
  });
});
