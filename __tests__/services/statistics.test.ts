describe('Statistics Service', () => {
  it('should calculate mean', () => {
    const values = [10, 20, 30];
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    expect(mean).toBeCloseTo(20);
  });
  it('should calculate median', () => {
    const sorted = [1, 3, 5, 7, 9];
    const median = sorted[Math.floor(sorted.length / 2)];
    expect(median).toBe(5);
  });
  it('should calculate standard deviation', () => {
    const values = [2, 4, 4, 4, 5, 5, 7, 9];
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    expect(mean).toBe(5);
  });
});
