import { BehaviorSubject, Subscription } from 'rxjs';
import DataPagination from '@lib/helpers/data-pagination';
import ChatRes from '@models/chat-res';
import { Query } from '@lib/helpers/firebase-firestore-types';
import { chatService } from '@services';
import { authStore } from '@store/index';
import { Log } from '@utils/logs/logger';
import navigationService from '@services/navigation';
import { filter, map } from 'rxjs/operators';

type ChatItem = ChatRes | undefined;
type ChatListStoreState = {
  dataList: ChatItem[];
  refreshing: boolean;
};

const initialChatListStoreState = {
  dataList: [],
  refreshing: true,
};

export default class ChatListStore extends DataPagination {
  static getInstance(): ChatListStore {
    if (!this.instance) {
      Log.debug('ChatListStore new instance');
      this.instance = new ChatListStore();
    }
    return this.instance;
  }

  private readonly _state: BehaviorSubject<ChatListStoreState>;
  private static instance: ChatListStore;
  private readonly _limit: number = 20;
  private query: Query;
  private chatListener: Subscription;
  private userListener: Subscription;
  constructor(chatListStoreState: ChatListStoreState = initialChatListStoreState) {
    super();
    this._state = new BehaviorSubject(chatListStoreState);
  }

  get limit(): number {
    return this._limit;
  }

  chats = () => this._state.pipe(map(({ dataList }) => dataList));
  refreshing = () => this._state.pipe(map(({ refreshing }) => refreshing));
  updateState = (value: Partial<ChatListStoreState>) => {
    const currentState = this._state.getValue();
    this._state.next({ ...currentState, ...value });
  };
  onRefresh = () => {
    Log.debug('onRefresh');
    this.refreshPage(this.query, this.limit);
    this.updateState({ refreshing: true });
  };
  requestMoreData = () => {
    Log.debug('requestMoreData');
    this.requestPaginatedData(this.query, this.limit);
  };
  listen = () => {
    Log.debug('chatList listen');
    const auth = authStore.getInstance();
    this.userListener = auth
      .currentUser()
      .pipe(filter((user) => user !== undefined))
      .subscribe((user) => {
        this.query = chatService.chatRef
          .orderBy('timestamp', 'desc')
          .where('users', 'array-contains', user?.uid);
        this.requestPaginatedData(this.query, this.limit);
      });
    this.chatListener = this.streamData.subscribe((docs) => {
      this._state.next({
        refreshing: false,
        dataList: docs
          .map((doc) => {
            Log.info(doc.data());
            return ChatRes.parse(doc);
          })
          .filter((value) => value != undefined),
      });
    });
  };
  dispose = () => {
    Log.debug('dispose chat list store');
    this.userListener.unsubscribe();
    this.chatListener.unsubscribe();
    this.disposePagination();
  };
  onLongPress = () => {
    Log.debug('onLongPressChat todo impl');
  };
  onTap = (chatId: string) => {
    Log.debug(`onTap chat list ${chatId}`);

    navigationService.push('ChatRoom', { chatId });
  };
  archiveChat = () => {
    Log.debug('archiveChat todo impl');
  };
}
