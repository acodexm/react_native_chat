import UserReq from '@models/user-req';
import userService from '@services/user';

describe('User service', () => {
  const user = UserReq.parse({ email: 'user@email.com' });
  it('no errors', () => {
    expect(userService).toBeTruthy();
  });
  it('create user', async () => {
    if (user) {
      const id = await userService.create(user);
      expect(id).toEqual('docId');
    }
  });
  it('update user', async () => {
    if (user) {
      const isUpdated = await userService.update(user);
      expect(isUpdated).toBe(true);
    }
  });
  it('archive user', async () => {
    const isUpdated = await userService.archive('userId');
    expect(isUpdated).toBe(true);
  });
  it('get user', async () => {
    const doc = await userService.get('userId');
    expect(doc).toBeTruthy();
  });
});
