import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { map } from 'rxjs/operators';

type Settings = {
  _id: string;
};

type SettingsStoreState = {
  dataList: Settings[];
};

const initialSettingsStoreState = {
  dataList: [],
};

export default class SettingsStore {
  static getInstance() {
    if (!this.instance) {
      this.instance = new SettingsStore();
    }
    return this.instance;
  }

  private state: BehaviorSubject<SettingsStoreState>;
  private static instance: SettingsStore;

  constructor(settingsStoreState: SettingsStoreState = initialSettingsStoreState) {
    this.state = new BehaviorSubject(settingsStoreState);
  }

  get dataLength(): number {
    return this.state.getValue().dataList.length;
  }

  get = (id: string) => {
    const currentState = this.state.getValue();
    return currentState.dataList.find(({ _id }) => _id === id);
  };

  getList = () => this.state.pipe(map(({ dataList }) => dataList));

  add = (data: Omit<Settings, '_id'>) => {
    const currentState = this.state.getValue();
    this.state.next({
      ...currentState,
      dataList: [...currentState.dataList, { ...data, _id: uuid() }],
    });
  };

  remove = (id: string) => {
    const currentState = this.state.getValue();
    this.state.next({
      ...currentState,
      dataList: currentState.dataList.filter(({ _id }) => _id !== id),
    });
  };
}
