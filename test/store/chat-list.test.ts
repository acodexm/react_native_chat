import { chatListStore } from '@store';
import ChatListStore from '@store/chat-list';

describe('ChatList store', () => {
  it('no errors', () => {
    expect(chatListStore).toBeTruthy();
  });
  let store: ChatListStore;
  beforeAll(() => {
    store = chatListStore.getInstance();
  });
});
