import storageService from '@services/storage';

describe('Storage service', () => {
  it('no errors', () => {
    expect(storageService).toBeTruthy();
  });
});
