import { authStore } from '@store';
import AuthStore from '@store/auth';
import { AuthStatus } from '@models/enums';

describe('Auth store', () => {
  it('no errors', () => {
    expect(authStore).toBeTruthy();
  });
  let store: AuthStore;
  let status = AuthStatus.UNINITIALIZED;
  beforeAll(() => {
    store = authStore.getInstance();
  });
  it('sing in with google', async () => {
    await store.googleSingIn();
    store.status().subscribe((value) => {
      status = value;
    });
    expect(status).toBe(AuthStatus.AUTHENTICATING);
  });
  it('sing in with email and password', async () => {
    await store.singInWithEmailAndPassword({ email: 'email@gmail.com', password: 'password' });
    store.status().subscribe((value) => {
      status = value;
    });
    expect(status).toBe(AuthStatus.AUTHENTICATING);
  });
  it('register with email and password', async () => {
    await store.registerWithEmailAndPassword({ email: 'email@gmail.com', password: 'password' });
    store.status().subscribe((value) => {
      status = value;
    });
    expect(status).toBe(AuthStatus.REGISTERING);
  });
  it('try autologin', async () => {
    await store.autoLogIn();
    store.status().subscribe((value) => {
      status = value;
    });
    expect(status).toBe(AuthStatus.AUTHENTICATING);
  });
  it('sign out', async () => {
    await store.singOut();
    store.status().subscribe((value) => {
      status = value;
    });
    expect(status).toBe(AuthStatus.UNAUTHENTICATED);
  });
});
