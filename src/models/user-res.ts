import { jsonMember, jsonObject, TypedJSON } from 'typedjson';
import { DocumentSnapshot, QueryDocumentSnapshot } from '@lib/helpers/firebase-firestore-types';
import { deserializeDate } from '@models/helpers';

@jsonObject
export default class UserRes {
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
  role: string;
  @jsonMember({ deserializer: deserializeDate })
  lastSeen: Date;
  @jsonMember({ deserializer: deserializeDate })
  createdAt: Date;
  static parse = (data: DocumentSnapshot | QueryDocumentSnapshot): UserRes | undefined => {
    return TypedJSON.parse({ uid: data.id, ...data.data() }, UserRes);
  };
}
