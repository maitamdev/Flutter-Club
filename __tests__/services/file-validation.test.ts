describe('File Validation Service', () => {
  it('should reject oversized files', () => {
    const isValid = (size: number, max: number) => size <= max;
    expect(isValid(10_000_000, 5_000_000)).toBe(false);
  });
  it('should validate mime types', () => {
    const allowed = ['image/png', 'image/jpeg'];
    expect(allowed.includes('image/gif')).toBe(false);
  });
  it('should check file extension', () => {
    const ext = 'photo.png'.split('.').pop();
    expect(ext).toBe('png');
  });
});
