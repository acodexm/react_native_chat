import { jsonMember, jsonObject, jsonMapMember, jsonArrayMember, TypedJSON } from 'typedjson';
import Info from '@models/info';
import { isNull, omitBy } from 'lodash';

@jsonObject
export default class ChatReq {
  @jsonMember
  id: string;
  @jsonMapMember(String, String)
  title: Map<string, string>;
  @jsonMember
  info: Info;
  @jsonArrayMember(String)
  users: string[];
  @jsonMember
  eventUsers: string;
  @jsonMember
  type: string;
  @jsonMember
  chatHash: string;
  @jsonMember
  createdBy: string;
  static parse = (data: any): ChatReq | undefined => {
    return TypedJSON.parse(data, ChatReq);
  };
  toJson = () => {
    return omitBy(this, isNull);
  };
}
