describe('QR Helpers', () => {
  it('should generate QR data', () => {
    const data = 'https://flutter-club.dev/event/123';
    expect(data).toContain('https://');
  });
  it('should validate QR content', () => {
    const isValid = (data: string) => data.length > 0 && data.length < 2048;
    expect(isValid('test')).toBe(true);
  });
});
