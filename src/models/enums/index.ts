export enum ChatType {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
  EVENT = 'EVENT',
  SAVED = 'SAVED',
}
export enum AuthStatus {
  UNINITIALIZED = 'UNINITIALIZED',
  AUTHENTICATED = 'AUTHENTICATED',
  AUTHENTICATING = 'AUTHENTICATING',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  REGISTERING = 'REGISTERING',
}
export enum ConnectivityStatus {
  CELLULAR = 'CELLULAR',
  WIFI = 'WIFI',
  OFFLINE = 'OFFLINE',
}
export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
  GIF = 'GIF',
}
export enum MessageStatus {
  SENDING = 'SENDING',
  SEND = 'SEND',
  RECEIVED = 'RECEIVED',
}
export enum BucketPath {
  PROFILE = 'PROFILE',
  EVENT = 'EVENT',
  MESSAGE = 'MESSAGE',
}
