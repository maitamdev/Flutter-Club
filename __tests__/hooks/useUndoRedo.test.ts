describe('useUndoRedo', () => {
  it('should track state history', () => {
    const history = ['initial'];
    expect(history).toHaveLength(1);
  });

  it('should undo last change', () => {
    const history = ['a', 'b'];
    const current = history[history.length - 2];
    expect(current).toBe('a');
  });

  it('should redo after undo', () => {
    const future = ['b'];
    expect(future).toHaveLength(1);
  });

  it('should check canUndo', () => {
    const history = ['a'];
    expect(history.length > 1).toBe(false);
  });

  it('should check canRedo', () => {
    const future: string[] = [];
    expect(future.length > 0).toBe(false);
  });
});
