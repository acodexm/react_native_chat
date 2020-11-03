import { BehaviorSubject } from 'rxjs';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthStatus } from '@models/enums';
import UserRes from '@models/user-res';
import { analyticsService, authService, userService } from '@services';
import { UserAuthReq } from '@models';
import { map } from 'rxjs/operators';
import { FormikValues } from 'formik';
import { Log } from '@utils/logs/logger';

type AuthStoreState = {
  status: AuthStatus;
  currentUser?: UserRes;
};

const initialAuthStoreState: AuthStoreState = {
  status: AuthStatus.UNINITIALIZED,
};

export default class AuthStore {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthStore();
    }
    return this.instance;
  }

  private state: BehaviorSubject<AuthStoreState>;
  private static instance: AuthStore;

  private authState: () => void;
  private userUpdater: () => void;

  constructor() {
    this.state = new BehaviorSubject<AuthStoreState>(initialAuthStoreState);
    this.authState = auth().onAuthStateChanged((user) => {
      Log.info('new user onAuthStateChanged', user);
      const uid = this.state.getValue().currentUser?.uid;
      if (user === null) {
        this.state.next({
          currentUser: undefined,
          status: AuthStatus.UNAUTHENTICATED,
        });
      } else {
        if (!this.userUpdater || uid !== user.uid) {
          Log.info('listen to user updates');
          if (this.userUpdater) this.userUpdater();
          this.userUpdater = userService.userRef.doc(user.uid).onSnapshot(
            (userData) => {
              Log.info(userData.data());
              const currentUser = UserRes.parse(userData);
              if (currentUser !== undefined) {
                analyticsService.setUserProperties(currentUser.uid, currentUser.role || 'user');
                this.state.next({
                  status: AuthStatus.AUTHENTICATED,
                  currentUser,
                });
              } else {
                console.error('Error while parsing user data!');
              }
            },
            (error) => console.error(error)
          );
        }
      }
    });
  }

  status = () => this.state.pipe(map(({ status }) => status));

  currentUser = () => this.state.pipe(map(({ currentUser }) => currentUser));

  googleSingIn = async () => {
    this.changeStatus(AuthStatus.AUTHENTICATING);
    const user = await authService.signInWithGoogle(false);
    if (user) {
      this.updateUser(user);
    } else {
      this.changeStatus(AuthStatus.UNAUTHENTICATED);
    }
  };

  autoLogIn = async () => {
    this.changeStatus(AuthStatus.AUTHENTICATING);
    let user: any = auth().currentUser;
    if (!user) {
      user = await authService.signInWithGoogle(true);
      if (user) {
        this.updateUser(user);
      } else {
        this.changeStatus(AuthStatus.UNAUTHENTICATED);
      }
    }
  };

  singInWithEmailAndPassword = async ({ email, password }: FormikValues) => {
    this.changeStatus(AuthStatus.AUTHENTICATING);
    const user = await authService.signInWithEmailAndPassword(email, password);
    if (user) {
      this.updateUser(user);
    } else {
      this.changeStatus(AuthStatus.UNAUTHENTICATED);
    }
  };

  registerWithEmailAndPassword = async ({ email, password }: FormikValues) => {
    this.changeStatus(AuthStatus.REGISTERING);
    const user = await authService.registerWithEmailAndPassword(email, password);
    if (user) {
      this.updateUser(user);
    } else {
      this.changeStatus(AuthStatus.UNAUTHENTICATED);
    }
  };
  resetPassword = ({ email }: FormikValues) => {
    return authService.sendPasswordResetEmail(email);
  };
  singOut = async () => {
    if (await authService.signOut()) {
      this.changeStatus(AuthStatus.UNAUTHENTICATED);
    }
  };
  dispose = () => {
    this.authState();
    this.userUpdater();
  };
  private changeStatus = (status: AuthStatus) => {
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, status });
  };
  private updateUser = async (user: FirebaseAuthTypes.User | undefined) => {
    const userDoc = userService.userRef.doc(user?.uid);
    const { exists } = await userDoc.get();
    const updateUser = UserAuthReq.parse(user)?.toJson(exists);
    if (updateUser) userDoc.set(updateUser, { merge: true });
  };
}
