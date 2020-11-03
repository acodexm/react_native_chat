import remoteConfig from '@react-native-firebase/remote-config';
import { Log } from '@utils/logs/logger';

interface RemoteConfigService {
  listen(): Promise<void>;
  getValue(valueName: string): any;
}

class RemoteConfigServiceImpl implements RemoteConfigService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new RemoteConfigServiceImpl();
    }
    return this.instance;
  }
  private static instance: RemoteConfigServiceImpl;
  listen = async () => {
    await remoteConfig()
      .setDefaults({
        // define all value names and defaults
        valueName: 'disabled',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then((activated) => {
        if (activated) {
          Log.info('Defaults set, fetched & activated!');
        } else {
          Log.info('Defaults set, however activation failed.');
        }
      });
  };
  getValue = (valueName: string): any => {
    const value = remoteConfig().getValue(valueName);
    if (value.getSource() === 'remote') {
      Log.info('Parameter value was from the Firebase servers.');
    } else if (value.getSource() === 'default') {
      Log.info('Parameter value was from a default value.');
    } else {
      Log.info('Parameter value was from a locally cached value.');
    }
    return value;
  };
}

const remoteConfigService = RemoteConfigServiceImpl.getInstance();
export default remoteConfigService;
