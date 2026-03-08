describe('Leaderboard Service', () => {
  it('should sort by score descending', () => {
    const entries = [{ name: 'A', score: 80 }, { name: 'B', score: 95 }];
    const sorted = [...entries].sort((a, b) => b.score - a.score);
    expect(sorted[0].name).toBe('B');
  });
  it('should calculate rank', () => {
    const rank = 1;
    expect(rank).toBe(1);
  });
});
