import { toJson, jsonMember, jsonObject, jsonArrayMember, TypedJSON } from 'typedjson';
import { MessageType } from '@models/enums';

@toJson
@jsonObject
export default class Message {
  @jsonMember
  id: string;
  @jsonMember
  content: string;
  @jsonMember
  createdBy: string;
  @jsonMember
  type: MessageType;
  @jsonMember
  timestamp: Date;
  @jsonArrayMember(String)
  unreadBy: string[];
  static parse = (data: any): Message | undefined => {
    return TypedJSON.parse(data, Message);
  };
}
