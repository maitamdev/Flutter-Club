describe('Poll Service', () => {
  it('should create poll', () => {
    const poll = { question: 'Best framework?', options: ['React', 'Vue', 'Angular'] };
    expect(poll.options).toHaveLength(3);
  });
  it('should count votes', () => {
    const votes = { React: 5, Vue: 3, Angular: 2 };
    const total = Object.values(votes).reduce((a, b) => a + b, 0);
    expect(total).toBe(10);
  });
});
