import { renderHook, act } from '@testing-library/react';
import { useClipboard } from '@/lib/hooks/useClipboard';

describe('useClipboard', () => {
  it('should initialize with copied as false', () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.copied).toBe(false);
  });

  it('should have copy function', () => {
    const { result } = renderHook(() => useClipboard());
    expect(typeof result.current.copy).toBe('function');
  });
});
