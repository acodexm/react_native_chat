import { jsonMember, jsonObject, TypedJSON } from 'typedjson';
import { firebase } from '@react-native-firebase/firestore';
import { omitBy, isNull } from 'lodash';

@jsonObject
export default class UserAuthReq {
  @jsonMember
  displayName: string;
  @jsonMember
  about: string;
  @jsonMember
  photoUrl: string;
  @jsonMember
  email: string;
  @jsonMember
  role: string;
  static parse = (data: any): UserAuthReq | undefined => {
    return TypedJSON.parse(data, UserAuthReq);
  };
  toJson = (exists: boolean) => {
    return omitBy(
      {
        displayName: exists ? null : this.displayName,
        about: exists ? null : this.about,
        photoUrl: exists ? null : this.photoUrl,
        email: this.email,
        role: this.role,
        createdAt: exists ? null : firebase.firestore.FieldValue.serverTimestamp(),
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      isNull
    );
  };
}
