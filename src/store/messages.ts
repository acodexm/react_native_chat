import { BehaviorSubject, Subscription } from 'rxjs';
import DataPagination from '@lib/helpers/data-pagination';
import MessageRes from '@models/message-res';
import { CollectionReference, Query } from '@lib/helpers/firebase-firestore-types';
import { v4 as uuid } from 'uuid';
import { chatService } from '@services';
import { Log } from '@utils/logs/logger';
import { map } from 'rxjs/operators';
import { save } from '@utils/storage/storage';
import { MessageItem, MessageReq } from '@models';
import ChatRes from '@models/chat-res';
import { MessageStatus, MessageType } from '@models/enums';

type MessageListStoreState = {
  dataList: Array<MessageItem | undefined>;
  refreshing: boolean;
  chat?: ChatRes;
};

const initialMessageListStoreState = {
  dataList: [],
  refreshing: true,
};

export default class MessagesStore extends DataPagination {
  private readonly state: BehaviorSubject<MessageListStoreState>;
  private readonly limit: number = 20;
  private readonly query: Query;
  private readonly msgRef: CollectionReference;
  private messageListener: Subscription;
  private readonly chatId: string;
  private readonly userId: string;

  constructor(chatId: string, userId: string) {
    super();
    this.chatId = chatId;
    this.userId = userId;
    this.state = new BehaviorSubject<MessageListStoreState>(initialMessageListStoreState);
    this.msgRef = chatService.chatRef.doc(chatId).collection('messages');
    this.query = this.msgRef.orderBy('timestamp', 'desc');
    // load(chatId)
    //   .then(({ refreshing, dataList, chat }: MessageListStoreState) => {
    //     this.state.next({
    //       refreshing,
    //       dataList: dataList.map((message) => MessageItem.create(message)),
    //       chat: TypedJSON.parse(chat, ChatRes),
    //     });
    //   })
    //   .catch((reason) => Log.error(reason));
    chatService.get(chatId).then((chat) => this.state.next({ ...this.state.value, chat }));
  }
  title = () => this.state.pipe(map(({ chat }) => chat?.title.get(this.userId)));
  messages = () => this.state.pipe(map(({ dataList }) => dataList));
  refreshing = () => this.state.pipe(map(({ refreshing }) => refreshing));
  updateState = (value: Partial<MessageListStoreState>) => {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, ...value });
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
    this.requestPaginatedData(this.query, this.limit);
    this.messageListener = this.streamData.subscribe((docs) => {
      this.state.next({
        refreshing: false,
        dataList: docs
          .map((doc) => {
            Log.info(doc.data());
            return MessageItem.create({ ...MessageRes.parse(doc), unreadBy: [] });
          })
          .filter((value) => value !== undefined),
      });
    });
  };
  dispose = () => {
    Log.debug('dispose message list store');
    save(this.chatId, this.state.value);
    this.messageListener.unsubscribe();
    this.disposePagination();
  };
  onLongPress = () => {
    Log.debug('onLongPressMessage todo impl');
  };
  onTap = (messageId: string) => {
    Log.debug(`onTap message list ${messageId}`);
  };
  onSendMessage = (content: string, type: MessageType) => {
    const request = MessageReq.parse({
      content,
      type,
      createdBy: this.userId,
      status: MessageStatus.SEND,
    });
    if (request) {
      // this.msgRef.add(request.toJson());
      const { dataList, ...rest } = this.state.value;
      const check = { ...request, status: MessageStatus.SENDING, id: uuid() };
      Log.warn(check);
      dataList.unshift(MessageItem.create(check));
      this.state.next({ ...rest, dataList });
    }
  };
  archiveMessage = () => {
    Log.debug('archiveMessage todo impl');
  };
}
