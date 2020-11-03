import authService from '@services/auth';
import { mock_createUserWithEmailAndPassword } from '../support/mocks/@react-native-firebase/auth';

describe('Auth service', () => {
  it('no errors', () => {
    expect(authService).toBeTruthy();
  });
  it('register', () => {
    const user = authService.registerWithEmailAndPassword('email@email.com', 'password');
    expect(mock_createUserWithEmailAndPassword).toBeCalled();
    expect(user).toBeTruthy();
  });
});
