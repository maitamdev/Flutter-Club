describe('Sort Helpers', () => {
  it('should sort strings alphabetically', () => {
    const sorted = ['banana', 'apple', 'cherry'].sort();
    expect(sorted[0]).toBe('apple');
  });
  it('should sort numbers', () => {
    const sorted = [3, 1, 2].sort((a, b) => a - b);
    expect(sorted).toEqual([1, 2, 3]);
  });
  it('should handle null values', () => {
    const values = [1, null, 2].filter(v => v !== null);
    expect(values).toEqual([1, 2]);
  });
});
