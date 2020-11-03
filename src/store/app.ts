import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Log } from '@utils/logs/logger';
import { load, save } from '@utils/storage/storage';

type AppStoreState = {
  firstLaunch: boolean;
};

const initialAppStoreState: AppStoreState = {
  firstLaunch: true,
};
const APP_FIRST_LAUNCH = 'APP_FIRST_LAUNCH';
export default class AppStore {
  static getInstance() {
    if (!this.instance) {
      Log.debug('AppStore init');
      this.instance = new AppStore();
    }
    return this.instance;
  }

  private state: BehaviorSubject<AppStoreState>;
  private static instance: AppStore;

  constructor() {
    this.state = new BehaviorSubject<AppStoreState>(initialAppStoreState);
  }
  initializeApp = async () => {
    const firstLaunch = await load(APP_FIRST_LAUNCH);
    this.state.next({ firstLaunch });
  };
  firstLaunchDone = () => {
    save(APP_FIRST_LAUNCH, false);
    this.state.next({ firstLaunch: false });
  };
  firstLaunch = () => this.state.pipe(map(({ firstLaunch }) => firstLaunch));
}
