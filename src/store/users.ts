import { BehaviorSubject, Subscription } from 'rxjs';
import DataPagination from '@lib/helpers/data-pagination';
import { ChatReq, UserRes } from '@models';
import { Query } from '@lib/helpers/firebase-firestore-types';
import { chatService, userService } from '@services';
import { authStore } from '@store/index';
import { Log } from '@utils/logs/logger';
import navigationService from '@services/navigation';
import { filter, map } from 'rxjs/operators';
import { ChatType } from '@models/enums';

type UserItem = UserRes | undefined;
type UserListStoreState = {
  dataList: UserItem[];
  refreshing: boolean;
};

const initialUserListStoreState = {
  dataList: [],
  refreshing: true,
};

export default class UserListStore extends DataPagination {
  static getInstance(): UserListStore {
    if (!this.instance) {
      Log.debug('UserListStore new instance');
      this.instance = new UserListStore();
    }
    return this.instance;
  }

  private readonly _state: BehaviorSubject<UserListStoreState>;
  private static instance: UserListStore;
  private readonly _limit: number = 20;
  private query: Query;
  private user?: UserRes;
  private userListener: Subscription;
  private userListListener: Subscription;
  constructor(userListStoreState: UserListStoreState = initialUserListStoreState) {
    super();
    this._state = new BehaviorSubject(userListStoreState);
  }

  get limit(): number {
    return this._limit;
  }

  users = () => this._state.pipe(map(({ dataList }) => dataList));
  refreshing = () => this._state.pipe(map(({ refreshing }) => refreshing));
  updateState = (value: Partial<UserListStoreState>) => {
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
    Log.debug('userList listen');
    const auth = authStore.getInstance();
    this.userListener = auth
      .currentUser()
      .pipe(filter((user) => user !== undefined))
      .subscribe((user) => {
        this.user = user;
        this.query = userService.userRef.orderBy('lastSeen', 'desc');
        this.requestPaginatedData(this.query, this.limit);
      });
    this.userListListener = this.streamData.subscribe((docs) => {
      this._state.next({
        refreshing: false,
        dataList: docs
          .filter((doc) => doc.id !== this.user?.uid)
          .map((doc) => {
            Log.info(doc.data());
            return UserRes.parse(doc);
          })
          .filter((value) => value != undefined),
      });
    });
  };
  dispose = () => {
    Log.debug('dispose user list store');
    this.userListener.unsubscribe();
    this.userListListener.unsubscribe();
    this.disposePagination();
  };

  async onUserClick(user: UserRes) {
    Log.debug(`UserList Tile click ${user} `);
    Log.debug(`UserList Tile click current ${this.user} `);
    const chatId = await chatService.create(
      ChatReq.parse({
        title: this.createPrivateTitle(user),
        chatHash: this.getHash([this.user?.uid, user.uid], ChatType.PRIVATE.toString()),
        users: [this.user?.uid, user.uid],
        type: ChatType.PRIVATE.toString(),
        createdBy: this.user?.uid,
      })
    );
    Log.debug(`entering chat ${chatId}`);
    // _navigationService.toNamed(ViewRoutes.chat, arguments: chatId);
  }
  getHash = (arr: any[], str: string) => str;
  createPrivateTitle = (user: UserRes) => {
    if (!this.user) return {};
    return {
      [this.user.uid]: user.displayName,
      [user.uid]: this.user.displayName,
    };
  };

  createGroupTitle = () => {
    // selectedUsers = Map.from(selected);
    // selectedUsers.removeWhere((key, value) => value == null);
    // Map<String, String> groupTitle = Map();
    // selectedUsers.forEach((key, value) {
    //   groupTitle.putIfAbsent(key, () {
    //     String title = '';
    //     selectedUsers.forEach((nextId, value) {
    //       if (nextId != key) {
    //         title = title + value.displayName + ', ';
    //       }
    //     });
    //     return title.substring(0, title.lastIndexOf(',') - 1);
    //   });
    // });
    // return groupTitle;
  };

  createGroupChat = async () => {
    // Log.debug('UserList fab click CREATE GROUP CHAT');
    // List<String> users = [currentUser.uid];
    // Map<String, bool> selectedUsers = Map.from(selected);
    // selectedUsers.removeWhere((key, value) => value == false);
    // users.addAll(selectedUsers.keys);
    // var chatId = await _chatService.createChat(
    //   ChatRequest(
    //     title: _createGroupTitle(),
    //   chatHash: getHash(users, ChatType.GROUP.toString()),
    //   users: users,
    //   createdBy: currentUser.uid,
    //   type: ChatType.GROUP.toString(),
    // ),
    // );
    //   Log.d('entering group chat $chatId');
    //   _navigationService.toNamed(ViewRoutes.chat, arguments: chatId);
  };
  onLongPress = () => {
    Log.debug('onLongPressUser todo impl');
  };
  onTap = (userId: string) => {
    Log.debug(`onTap user list ${userId}`);

    navigationService.push('ChatRoom', { userId });
  };
  archiveUser = () => {
    Log.debug('archiveUser todo impl');
  };
}
