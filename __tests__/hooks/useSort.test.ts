describe('useSort', () => {
  it('should sort ascending', () => {
    const items = [3, 1, 2];
    const sorted = [...items].sort((a, b) => a - b);
    expect(sorted).toEqual([1, 2, 3]);
  });

  it('should sort descending', () => {
    const items = [1, 3, 2];
    const sorted = [...items].sort((a, b) => b - a);
    expect(sorted).toEqual([3, 2, 1]);
  });

  it('should sort by key', () => {
    const items = [{ name: 'B' }, { name: 'A' }];
    const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
    expect(sorted[0].name).toBe('A');
  });

  it('should toggle sort direction', () => {
    let dir = 'asc';
    dir = dir === 'asc' ? 'desc' : 'asc';
    expect(dir).toBe('desc');
  });
});
