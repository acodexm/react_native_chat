import firestore from '@react-native-firebase/firestore';
import { ChatReq, ChatRes } from '@models';
import { Log } from '@utils/logs/logger';
import { CollectionReference } from '@lib/helpers/firebase-firestore-types';

interface ChatService {
  get(chatId: string): Promise<ChatRes | undefined>;
  create(chat: ChatReq): Promise<string | undefined>;
  update(chat: ChatReq): Promise<boolean>;
  archive(chatId: string): Promise<boolean>;
  markMessagesAsReadBy(chatId: string, userId: string): Promise<boolean>;
}

class ChatServiceImpl implements ChatService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatServiceImpl();
    }
    return this.instance;
  }
  private static instance: ChatServiceImpl;
  private _chatRef = firestore().collection('chats');

  get chatRef(): CollectionReference {
    return this._chatRef;
  }

  archive = async (chatId: string): Promise<boolean> => {
    try {
      this._chatRef.doc(chatId).update('archived', true);
      return true;
    } catch (e) {
      return false;
    }
  };

  create = async (chat?: ChatReq): Promise<string | undefined> => {
    try {
      if (!chat) return undefined;
      const { id } = await this._chatRef.add(chat);
      return id;
    } catch (e) {
      return undefined;
    }
  };

  get = async (chatId: string): Promise<ChatRes | undefined> => {
    try {
      return ChatRes.parse(await this._chatRef.doc(chatId).get());
    } catch (e) {
      Log.error('error parsing chat data', e);
      return undefined;
    }
  };

  update = async (chat: ChatReq): Promise<boolean> => {
    try {
      this._chatRef.doc(chat.id).set(chat, { merge: true });
      return true;
    } catch (e) {
      Log.error('error while updating chat', e);
      return false;
    }
  };
  markMessagesAsReadBy = async (chatId: string, userId: string) => {
    try {
      await this._chatRef
        .doc(chatId)
        .set({ unreadByCounter: { [userId]: firestore.FieldValue.delete() } }, { merge: true });
      return true;
    } catch (e) {
      Log.error('markMessagesAsReadBy', e);
    }
    return false;
  };
}

const chatService = ChatServiceImpl.getInstance();
export default chatService;
