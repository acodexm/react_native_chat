import performanceService from '@services/performance';

describe('Performance service', () => {
  it('no errors', () => {
    expect(performanceService).toBeTruthy();
  });
});
