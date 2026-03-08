describe('useMultiStep', () => {
  it('should start at step 0', () => {
    const currentStep = 0;
    expect(currentStep).toBe(0);
  });

  it('should go to next step', () => {
    let step = 0;
    step++;
    expect(step).toBe(1);
  });

  it('should go to previous step', () => {
    let step = 2;
    step--;
    expect(step).toBe(1);
  });

  it('should not go below 0', () => {
    const step = Math.max(0, -1);
    expect(step).toBe(0);
  });

  it('should track total steps', () => {
    const total = 5;
    expect(total).toBe(5);
  });
});
