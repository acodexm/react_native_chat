import { jsonMember, jsonObject, TypedJSON } from 'typedjson';
import { DocumentSnapshot, QueryDocumentSnapshot } from '@lib/helpers/firebase-firestore-types';

@jsonObject
export default class StorageRes {
  @jsonMember
  fileUrl: string;
  @jsonMember
  filename: string;
  static parse = (data: DocumentSnapshot | QueryDocumentSnapshot): StorageRes | undefined => {
    return TypedJSON.parse({ ...data.data() }, StorageRes);
  };
}
