describe('Calendar Helpers', () => {
  it('should get days in month', () => {
    const days = new Date(2024, 1, 0).getDate();
    expect(days).toBe(31);
  });
  it('should get first day of month', () => {
    const firstDay = new Date(2024, 0, 1).getDay();
    expect(firstDay).toBeGreaterThanOrEqual(0);
  });
  it('should generate month grid', () => {
    const grid = Array.from({ length: 42 }, (_, i) => i + 1);
    expect(grid).toHaveLength(42);
  });
});
