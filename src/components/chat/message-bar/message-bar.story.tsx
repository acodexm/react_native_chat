import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import MessageBar from './message-bar';

declare let module: any;

storiesOf('MessageBar', module).add('Default view', () => {
  <Story>
    <MessageBar />
  </Story>;
});
