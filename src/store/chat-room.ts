import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { map } from 'rxjs/operators';

type ChatRoom = {
  _id: string;
};

type ChatRoomStoreState = {
  dataList: ChatRoom[];
};

const initialChatRoomStoreState = {
  dataList: [],
};

export default class ChatRoomStore {
  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatRoomStore();
    }
    return this.instance;
  }

  private state: BehaviorSubject<ChatRoomStoreState>;
  private static instance: ChatRoomStore;

  constructor(chatRoomStoreState: ChatRoomStoreState = initialChatRoomStoreState) {
    this.state = new BehaviorSubject(chatRoomStoreState);
  }

  get dataLength(): number {
    return this.state.getValue().dataList.length;
  }

  get = (id: string) => {
    const currentState = this.state.getValue();
    return currentState.dataList.find(({ _id }) => _id === id);
  };

  getList = () => this.state.pipe(map(({ dataList }) => dataList));

  add = (data: Omit<ChatRoom, '_id'>) => {
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
