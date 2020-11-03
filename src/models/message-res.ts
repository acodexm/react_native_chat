import { jsonMember, jsonObject, TypedJSON } from 'typedjson';
import { DocumentSnapshot, QueryDocumentSnapshot } from '@lib/helpers/firebase-firestore-types';
import { deserializeDate } from '@models/helpers';

@jsonObject
export default class MessageRes {
  @jsonMember
  id: string;
  @jsonMember
  content: string;
  @jsonMember
  type: string;
  @jsonMember
  status: string;
  @jsonMember({ deserializer: deserializeDate })
  timestamp: Date;
  @jsonMember
  createdBy: string;
  static parse = (data: QueryDocumentSnapshot | DocumentSnapshot): MessageRes | undefined => {
    return TypedJSON.parse({ id: data.id, ...data.data() }, MessageRes);
  };
}
