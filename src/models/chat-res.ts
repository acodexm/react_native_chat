import {
  ArrayT,
  jsonArrayMember,
  jsonMapMember,
  jsonMember,
  jsonObject,
  TypedJSON,
} from 'typedjson';
import Info from '@models/info';
import { DocumentSnapshot, QueryDocumentSnapshot } from '@lib/helpers/firebase-firestore-types';
import { deserializeDate } from '@models/helpers';

@jsonObject
export default class ChatRes {
  @jsonMember
  id: string;
  @jsonMapMember(String, String, { shape: 1 })
  title: Map<String, String>;
  @jsonMember
  info: Info;
  @jsonArrayMember(String)
  users: Array<String>;
  @jsonMember
  type: string;
  @jsonMember
  chatHash: string;
  @jsonMember
  createdBy: string;
  @jsonMember({ deserializer: deserializeDate })
  timestamp: Date;
  @jsonMapMember(String, ArrayT(String), { shape: 1 })
  unreadByCounter: Map<String, Array<String>>;
  static parse = (data: QueryDocumentSnapshot | DocumentSnapshot): ChatRes | undefined => {
    return TypedJSON.parse({ id: data.id, ...data.data() }, ChatRes);
  };
}
