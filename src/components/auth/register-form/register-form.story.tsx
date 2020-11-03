import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import RegisterForm from './register-form';
import { Log } from '@utils/logs/logger';

declare let module: any;

storiesOf('RegisterForm', module).add('Default view', () => (
  <Story>
    <RegisterForm
      busy={false}
      onSubmit={(values) => {
        Log.debug(JSON.stringify(values));
      }}
    />
  </Story>
));
