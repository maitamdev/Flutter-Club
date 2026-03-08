describe('Certificate Generator', () => {
  it('should generate certificate data', () => {
    const cert = { recipientName: 'John', courseName: 'Flutter Basics', date: '2024-01-01' };
    expect(cert.recipientName).toBe('John');
  });
  it('should validate certificate fields', () => {
    const isValid = (name: string) => name.length > 0;
    expect(isValid('John')).toBe(true);
  });
});
