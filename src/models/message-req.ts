import { jsonMember, toJson, jsonObject, TypedJSON } from 'typedjson';
import { isNull, omitBy } from 'lodash';
import firestore from '@react-native-firebase/firestore';

@toJson
@jsonObject
export default class MessageReq {
  @jsonMember
  content: string;
  @jsonMember
  type: string;
  @jsonMember
  status: string;
  @jsonMember
  createdBy: string;

  constructor(content: string, type: string, status: string, createdBy: string) {
    this.content = content;
    this.type = type;
    this.status = status;
    this.createdBy = createdBy;
  }

  static parse = (data: any): MessageReq | undefined => {
    return TypedJSON.parse(data, MessageReq);
  };

  toJson = () => {
    return omitBy(
      {
        createdBy: this.createdBy,
        content: this.content,
        type: this.type,
        status: this.status,
        timestamp: firestore.FieldValue.serverTimestamp(),
      },
      isNull
    );
  };
}
