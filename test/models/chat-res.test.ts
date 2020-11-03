import { ChatRes } from '@models';
import { TypedJSON } from 'typedjson';
import { firebase } from '@react-native-firebase/firestore';

const data = {
  users: ['uid1', 'uid2'],
  type: 'PRIVATE',
  createdBy: 'uid1',
  timestamp: new firebase.firestore.Timestamp(1595776245, 55000000),
  title: { uid1: 'Chat with uid2', uid2: 'chat ith uid1' },
  unreadByCounter: { uid2: ['msg1', 'msg2'] },
  chatHash: 'hash',
};

describe('Chat model', () => {
  it('it can be created', () => {
    expect(ChatRes).toBeTruthy();
  });
  it('deserialize correctly', () => {
    const chat = TypedJSON.parse(data, ChatRes);
    expect(chat?.type).toBe('PRIVATE');
    expect(chat?.unreadByCounter.get('uid2')?.includes('msg1')).toBe(true);
  });
});
