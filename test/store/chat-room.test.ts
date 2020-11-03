import { chatRoomStore } from '@store';
import ChatRoomStore from '@store/chat-room';

describe('ChatRoom store', () => {
  it('no errors', () => {
    expect(chatRoomStore).toBeTruthy();
  });
  let store: ChatRoomStore;
  let id: string;
  beforeAll(() => {
    store = chatRoomStore.getInstance();
  });
  it('add', () => {
    store.add({ anything: 'anything' });
    expect(store.dataLength).toEqual(1);
  });
  it('getList', () => {
    store.getList().subscribe((value) => {
      id = value[0]._id;
    });
    expect(id).toBeTruthy();
  });
  it('get', () => {
    expect(store.get(id)).toEqual({ _id: id, anything: 'anything' });
  });
  it('remove', () => {
    store.remove(id);
    expect(store.get(id)).toBeUndefined();
  });
});
