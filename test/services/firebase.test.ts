import firebaseService from '@services/firebase';

describe('Firebase service', () => {
  it('no errors', () => {
    expect(firebaseService).toBeTruthy();
  });
});
