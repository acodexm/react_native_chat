import chatService from '@services/chat';
import ChatReq from '@models/chat-req';

describe('Chat service', () => {
  const chat = ChatReq.parse({ chatHash: 'chatHash' });
  it('no errors', () => {
    expect(chatService).toBeTruthy();
  });
  it('create chat', async () => {
    if (chat) {
      const id = await chatService.create(chat);
      expect(id).toEqual('docId');
    }
  });
  it('update chat', async () => {
    if (chat) {
      const isUpdated = await chatService.update(chat);
      expect(isUpdated).toBe(true);
    }
  });
  it('archive chat', async () => {
    const isUpdated = await chatService.archive('docId');
    expect(isUpdated).toBe(true);
  });
  it('get chat', async () => {
    const doc = await chatService.get('docId');
    expect(doc).toBeTruthy();
  });
});
