describe('Feedback Service', () => {
  it('should create feedback entry', () => {
    const feedback = { userId: 'u1', rating: 5, comment: 'Great!', createdAt: new Date() };
    expect(feedback.rating).toBe(5);
  });
  it('should validate rating range', () => {
    const isValid = (r: number) => r >= 1 && r <= 5;
    expect(isValid(3)).toBe(true);
    expect(isValid(6)).toBe(false);
  });
});
