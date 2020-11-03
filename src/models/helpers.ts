import { Timestamp } from '@lib/helpers/firebase-firestore-types';

const isDate = (object: any): object is Date => object?.toDateString !== undefined ?? false;
const isTimestamp = (object: any): object is Timestamp => object?.toDate !== undefined ?? false;
const isString = (object: any): object is string => object?.trim !== undefined ?? false;
export const deserializeDate = (value: any) => {
  if (isDate(value)) return value;
  if (isTimestamp(value)) return value.toDate();
  if (isString(value)) return new Date(value);
  return new Date();
};
