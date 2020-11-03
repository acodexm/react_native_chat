import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import Avatar from './avatar';

declare let module: any;

storiesOf('Avatar', module).add('Default view', () => {
  <Story>
    <Avatar />
  </Story>;
});
