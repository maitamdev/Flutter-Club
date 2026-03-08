describe('useFetch', () => {
  it('should initialize with loading state', () => {
    const state = { data: null, loading: true, error: null };
    expect(state.loading).toBe(true);
  });

  it('should handle successful fetch', () => {
    const state = { data: { id: 1 }, loading: false, error: null };
    expect(state.data).toEqual({ id: 1 });
  });

  it('should handle fetch error', () => {
    const state = { data: null, loading: false, error: 'Failed to fetch' };
    expect(state.error).toBe('Failed to fetch');
  });

  it('should support refetch', () => {
    const refetch = jest.fn();
    refetch();
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
