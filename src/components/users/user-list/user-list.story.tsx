import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import UserList from './user-list';

declare let module: any;

storiesOf('UserList', module).add('Default view', () => (
  <Story>
    <UserList />
  </Story>
));
