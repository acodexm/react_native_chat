import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import ChatRoom from './chat-room';

declare let module: any;

storiesOf('ChatRoom', module).add('Default view', () => {
  <Story>
    <ChatRoom />
  </Story>;
});
