import analyticsService from '@services/analytics';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { Log } from '@utils/logs/logger';

// type ErrorMessage = { error: string; message: string };
interface AuthService {
  signInWithGoogle(silent: boolean): Promise<FirebaseAuthTypes.User | undefined>;

  registerWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.User | undefined>;

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.User | undefined>;

  sendPasswordResetEmail(email: string): Promise<boolean>;

  signOut(): Promise<boolean>;
}

class AuthServiceImpl implements AuthService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthServiceImpl();
      GoogleSignin.configure({
        webClientId: '41021996064-6uuesm5kdv2ui3790b3b284tpn8i4ajd.apps.googleusercontent.com',
      });
    }
    return this.instance;
  }
  private static instance: AuthServiceImpl;

  registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      await analyticsService.logSignUp('email');
      return user;
    } catch (e) {
      // todo throw error messages to view somehow
      switch (e.code) {
        case 'auth/email-already-in-use': {
          Log.error('there already exists an account with the given email address');
          break;
        }
        case 'auth/invalid-email': {
          Log.error('the email address is not valid');
          break;
        }
        case 'auth/operation-not-allowed': {
          Log.error(
            'email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab'
          );
          break;
        }
        case 'auth/weak-password': {
          Log.error('the password is not strong enough');
          break;
        }
        default: {
          Log.error('Error on the new user registration', e);
        }
      }
      return undefined;
    }
  };

  sendPasswordResetEmail = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      await analyticsService.logResetPassword(email);
      return true;
    } catch (e) {
      // todo throw error messages to view somehow
      switch (e.code) {
        case 'auth/invalid-email': {
          Log.error('the email address is not valid');
          break;
        }
        case 'auth/user-not-found': {
          Log.error('there is no user corresponding to the email address');
          break;
        }
        default: {
          Log.error('Error on the reset password', e);
        }
      }
      return false;
    }
  };

  signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      await analyticsService.logLogin('email');
      return user;
    } catch (e) {
      // todo throw error messages to view somehow
      switch (e.code) {
        case 'auth/invalid-email': {
          Log.error('the email address is not valid');
          break;
        }
        case 'auth/user-not-found': {
          Log.error('there is no user corresponding to the email address');
          break;
        }
        case 'auth/user-disabled': {
          Log.error('the user corresponding to the given email has been disabled');
          break;
        }
        case 'auth/wrong-password': {
          Log.error(
            'the password is invalid for the given email, or the account corresponding to the email does not have a password set'
          );
          break;
        }
        default: {
          Log.error('Error on sign in', e);
        }
      }
      return undefined;
    }
  };

  signInWithGoogle = async (silent: boolean) => {
    try {
      const googleAuth = await this.getGoogleUser(silent);
      if (!googleAuth) return undefined;
      Log.warn(googleAuth.idToken);
      const user = await this.signInWithCredentials(googleAuth.idToken);
      await analyticsService.logLogin('google');
      return user;
    } catch (e) {
      Log.error('Google sing in error: ', e);
      return undefined;
    }
  };

  signOut = async () => {
    try {
      await auth().signOut();
      if (await GoogleSignin.isSignedIn()) {
        await GoogleSignin.signOut();
      }
      return true;
    } catch (e) {
      Log.error('Error on sing out ', e);
      return false;
    }
  };

  private getGoogleUser = async (silent: boolean) => {
    try {
      if (await GoogleSignin.hasPlayServices()) {
        Log.info('silent', silent);
        return silent ? GoogleSignin.signInSilently() : GoogleSignin.signIn();
      }
      return Promise.resolve(null);
    } catch (error) {
      // todo throw error messages to view somehow
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED: {
          Log.error('user cancelled the login flow');
          break;
        }
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
          Log.error('play services not available or outdated');
          break;
        }
        case statusCodes.IN_PROGRESS: {
          Log.error('operation (e.g. sign in) is in progress already');
          break;
        }
        case statusCodes.SIGN_IN_REQUIRED: {
          Log.error('sign in required');
          break;
        }
        default: {
          Log.error('some other error happened', error.code);
        }
      }
      return Promise.resolve(null);
    }
  };

  private signInWithCredentials = async (idToken: string | null) => {
    try {
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
      const { user } = await auth().signInWithCredential(credential);
      return user;
    } catch (e) {
      // todo throw error messages to view somehow
      switch (e.code) {
        case 'auth/account-exists-with-different-credential': {
          Log.error(
            'There already exists an account with the email address asserted by the credential.'
          );
          break;
        }
        case 'auth/invalid-credential': {
          Log.error('Thrown if the credential is malformed or has expired.');
          break;
        }
        case 'auth/operation-not-allowed': {
          Log.error(
            'The type of account corresponding to the credential is not enabled. Enable the account type in the Firebase Console, under the Auth tab.'
          );
          break;
        }
        case 'auth/user-disabled': {
          Log.error('The user corresponding to the given credential has been disabled.');
          break;
        }
        case 'auth/user-not-found': {
          Log.error('There is no user corresponding to the given email.');
          break;
        }
        case 'auth/wrong-password': {
          Log.error(
            'The password is invalid for the given email, or if the account corresponding to the email does not have a password set.'
          );
          break;
        }
        case 'auth/invalid-verification-code': {
          Log.error('Code of the credential is not valid.');
          break;
        }
        case 'auth/invalid-verification-id': {
          Log.error('Verification ID of the credential is not valid.');
          break;
        }
        default: {
          Log.error('sign in with credentials failed', e);
        }
      }
      return undefined;
    }
  };
}

const authService = AuthServiceImpl.getInstance();
export default authService;
