import { clear, load, remove, save } from '@utils/storage/storage';
import AsyncStorage from '@react-native-community/async-storage';

describe('test storage', () => {
  test('get', async () => {
    await load('something');
    expect(AsyncStorage.getItem).toBeCalledWith('something');
  });

  test('set', async () => {
    await save('something', { test: 'test' });
    expect(AsyncStorage.setItem).toBeCalledWith('something', JSON.stringify({ test: 'test' }));
  });

  test('remove', async () => {
    await remove('something');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('something');
  });

  test('clear', async () => {
    await clear();
    expect(AsyncStorage.clear).toHaveBeenCalled();
  });
});
