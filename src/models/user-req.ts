import { jsonMember, jsonObject, toJson, TypedJSON } from 'typedjson';
import { firebase } from '@react-native-firebase/firestore';
import { FieldValue } from '@lib/helpers/firebase-firestore-types';

@toJson
@jsonObject
export default class UserReq {
  @jsonMember
  uid: string;
  @jsonMember
  displayName: string;
  @jsonMember
  about: string;
  @jsonMember
  photoUrl: string;
  @jsonMember
  email: string;
  @jsonMember
  role: String;
  @jsonMember
  lastSeen: FieldValue = firebase.firestore.FieldValue.serverTimestamp();
  static parse = (data: any): UserReq | undefined => {
    return TypedJSON.parse(data, UserReq);
  };
}
