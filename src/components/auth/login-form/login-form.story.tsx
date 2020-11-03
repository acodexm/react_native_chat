import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import LoginForm from './login-form';
import { Log } from '@utils/logs/logger';

declare let module: any;

storiesOf('LoginForm', module).add('Default view', () => (
  <Story>
    <LoginForm
      busy={false}
      onGoogleLogin={() => {
        Log.debug('google log in');
      }}
      onSubmit={(values) => {
        Log.debug(JSON.stringify(values));
      }}
    />
  </Story>
));
