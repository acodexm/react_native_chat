import { settingsStore } from '@store';
import SettingsStore from '@store/settings';

describe('Settings store', () => {
  it('no errors', () => {
    expect(settingsStore).toBeTruthy();
  });
  let store: SettingsStore;
  let id: string;
  beforeAll(() => {
    store = settingsStore.getInstance();
  });
  it('add', () => {
    store.add({ anything: 'anything' });
    expect(store.dataLength).toEqual(1);
  });
  it('getList', () => {
    store.getList().subscribe((value) => {
      id = value[0]._id;
    });
    expect(id).toBeTruthy();
  });
  it('get', () => {
    expect(store.get(id)).toEqual({ _id: id, anything: 'anything' });
  });
  it('remove', () => {
    store.remove(id);
    expect(store.get(id)).toBeUndefined();
  });
});
