import { toJson, jsonMember, jsonObject, TypedJSON } from 'typedjson';
import { DocumentSnapshot, QueryDocumentSnapshot } from '@lib/helpers/firebase-firestore-types';
import { deserializeDate } from '@models/helpers';

@toJson
@jsonObject
export default class Info {
  @jsonMember
  id: string;
  @jsonMember
  title: string;
  @jsonMember
  description: string;
  @jsonMember({ deserializer: deserializeDate })
  startAt: Date;
  @jsonMember({ deserializer: deserializeDate })
  endAt: Date;
  @jsonMember
  photoUrl: string;
  @jsonMember
  shareLink: string;
  static parse = (data: DocumentSnapshot | QueryDocumentSnapshot): Info | undefined => {
    return TypedJSON.parse({ id: data.id, ...data.data() }, Info);
  };
}
