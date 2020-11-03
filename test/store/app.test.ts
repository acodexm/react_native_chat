import AppStore from '@store/app';

describe('App store', () => {
  it('no errors', () => {
    expect(AppStore).toBeTruthy();
  });
  let store: AppStore;
  beforeAll(() => {
    store = AppStore.getInstance();
  });
  it('set app as visited', () => {
    let firstLaunch = true;
    store.firstLaunchDone();
    store.firstLaunch().subscribe((value) => {
      firstLaunch = value;
    });
    expect(firstLaunch).toBe(false);
  });
});
