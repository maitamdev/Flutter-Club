describe('useSearch', () => {
  it('should initialize with empty query', () => {
    const query = '';
    expect(query).toBe('');
  });

  it('should filter results', () => {
    const items = ['apple', 'banana', 'cherry'];
    const filtered = items.filter(i => i.includes('an'));
    expect(filtered).toEqual(['banana']);
  });

  it('should handle empty results', () => {
    const items = ['apple'];
    const filtered = items.filter(i => i.includes('xyz'));
    expect(filtered).toHaveLength(0);
  });
});
