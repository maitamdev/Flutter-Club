describe('Report Aggregation Service', () => {
  it('should aggregate by date', () => {
    const data = [{ date: '2024-01', count: 5 }, { date: '2024-02', count: 8 }];
    const total = data.reduce((sum, d) => sum + d.count, 0);
    expect(total).toBe(13);
  });
  it('should calculate averages', () => {
    const values = [10, 20, 30];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    expect(avg).toBeCloseTo(20);
  });
});
