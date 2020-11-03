import UserRes from '@models/user-res';
import { UserReq } from '@models';
import firestore from '@react-native-firebase/firestore';
import { Log } from '@utils/logs/logger';
import { CollectionReference } from '@lib/helpers/firebase-firestore-types';

interface UserService {
  get(uid: string): Promise<UserRes | undefined>;
  create(user: UserReq): Promise<string | undefined>;
  update(user: UserReq): Promise<boolean>;
  archive(uid: string): Promise<boolean>;
}

class UserServiceImpl implements UserService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserServiceImpl();
    }
    return this.instance;
  }
  private static instance: UserServiceImpl;
  private _userRef = firestore().collection('users');

  get userRef(): CollectionReference {
    return this._userRef;
  }

  archive = async (uid: string): Promise<boolean> => {
    try {
      this._userRef.doc(uid).update('archived', true);
      return true;
    } catch (e) {
      return false;
    }
  };

  create = async (user: UserReq): Promise<string | undefined> => {
    try {
      const { id } = await this._userRef.add(user);
      return id;
    } catch (e) {
      return undefined;
    }
  };

  get = async (uid: string): Promise<UserRes | undefined> => {
    try {
      const doc = await this._userRef.doc(uid).get();
      if (doc.exists) return UserRes.parse(doc);
    } catch (e) {
      Log.error('error parsing user data', e);
      return undefined;
    }
  };

  update = async (user: UserReq): Promise<boolean> => {
    try {
      this._userRef.doc(user.uid).set(user, { merge: true });
      return true;
    } catch (e) {
      Log.error('error while updating user', e);
      return false;
    }
  };
}

const userService = UserServiceImpl.getInstance();
export default userService;
