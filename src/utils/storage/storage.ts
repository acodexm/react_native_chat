import AsyncStorage from '@react-native-community/async-storage';

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export const load = async (key: string): Promise<any | null> => {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    if (almostThere) return JSON.parse(almostThere);
  } catch {
    return null;
  }
};

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export const save = async (key: string, value: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export const remove = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

/**
 * Burn it all to the ground.
 */
export const clear = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch {
    return false;
  }
};
