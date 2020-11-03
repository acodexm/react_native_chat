import MessageRes from '@models/message-res';
import { jsonArrayMember, jsonObject, TypedJSON } from 'typedjson';

@jsonObject
export default class MessageItem extends MessageRes {
  @jsonArrayMember(String)
  unreadBy: string[];

  static create(data: any): MessageItem | undefined {
    return TypedJSON.parse(data, MessageItem);
  }
}
