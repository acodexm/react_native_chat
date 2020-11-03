import React, { FunctionComponent, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleProp, TextInput, ViewStyle } from 'react-native';
import { Wrapper } from './message-bar.styled';
import { t } from '@i18n';
import { MessageType } from '@models/enums';

interface MessageBarProps {
  style?: StyleProp<ViewStyle>;
  onSendMessage: (content: string, type: MessageType) => void;
}
const MessageBar: FunctionComponent<MessageBarProps> = ({ onSendMessage }) => {
  const [state, setState] = useState('');
  return (
    <KeyboardAvoidingView behavior={'padding'}>
      <Wrapper>
        <TextInput
          testID={'message'}
          onChangeText={setState}
          placeholder={t('message.placeholder')}
        />
        <Button onPress={() => onSendMessage(state, MessageType.TEXT)} title={t('button.send')} />
      </Wrapper>
    </KeyboardAvoidingView>
  );
};

export default MessageBar;
