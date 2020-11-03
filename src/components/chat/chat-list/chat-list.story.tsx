import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import ChatList from './chat-list';

declare let module: any;

storiesOf('ChatList', module).add('Default view', () => (
  <Story>
    <ChatList />
  </Story>
));
