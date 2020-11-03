import React, { FunctionComponent } from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import { Wrapper } from './message.styled';
import { get } from 'lodash';
import { MessageType } from '@models/enums';
import MessageItem from '@models/message-item';

interface MessageProps {
  style?: StyleProp<ViewStyle>;
  message?: MessageItem;
}
const Message: FunctionComponent<MessageProps> = ({ message }) => {
  switch (message?.type) {
    case MessageType.TEXT: {
      return (
        <>
          <Text>{get(message, 'content', 'EMPTY MESSAGE')}</Text>
          <Text>{get(message, 'timestamp', new Date()).toDateString()}</Text>
          <Text>{get(message, 'type', 'NO TYPE!!!!')}</Text>
          <Text>{get(message, 'status', 'NO STATUS')}</Text>
        </>
      );
    }
    case MessageType.IMAGE: {
      return (
        <Wrapper>
          <Text>{message.content}</Text>
        </Wrapper>
      );
    }
    case MessageType.DELETED:
    case MessageType.ARCHIVED: {
      return (
        <Wrapper>
          <Text>This message is deleted</Text>
        </Wrapper>
      );
    }
    default: {
      return null;
    }
  }
};

export default Message;
