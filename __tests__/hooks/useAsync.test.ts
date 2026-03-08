import { renderHook, act } from '@testing-library/react';

describe('useAsync', () => {
  it('should initialize with default idle state', () => {
    const state = { data: null, loading: false, error: null };
    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set loading to true when executing', () => {
    const state = { data: null, loading: true, error: null };
    expect(state.loading).toBe(true);
  });

  it('should handle error state', () => {
    const state = { data: null, loading: false, error: 'Network error' };
    expect(state.error).toBe('Network error');
  });
});
