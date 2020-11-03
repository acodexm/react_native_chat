import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import AppBar from './app-bar';

declare let module: any;

storiesOf('AppBar', module).add('Default view', () => {
  <Story>
    <AppBar />
  </Story>;
});
