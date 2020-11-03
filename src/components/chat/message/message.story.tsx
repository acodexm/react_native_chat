import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import Message from './message';

declare let module: any;

storiesOf('Message', module).add('Default view', () => {
  <Story>
    <Message />
  </Story>;
});
