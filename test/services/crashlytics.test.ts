import crashlyticsService from '@services/crashlytics';

describe('Crashlytics service', () => {
  it('no errors', () => {
    expect(crashlyticsService).toBeTruthy();
  });
});
