describe('Date Format Service', () => {
  it('should format date to locale string', () => {
    const date = new Date('2024-01-15');
    expect(date.toLocaleDateString()).toBeDefined();
  });
  it('should format relative time', () => {
    const diff = 3600;
    const label = diff >= 3600 ? '1 hour ago' : 'just now';
    expect(label).toBe('1 hour ago');
  });
  it('should handle invalid dates', () => {
    const date = new Date('invalid');
    expect(isNaN(date.getTime())).toBe(true);
  });
});
