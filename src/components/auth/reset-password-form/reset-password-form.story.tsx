import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import ResetPasswordForm from './reset-password-form';
import { Log } from '@utils/logs/logger';

declare let module: any;

storiesOf('ResetPasswordForm', module).add('Default view', () => (
  <Story>
    <ResetPasswordForm
      busy={false}
      onSubmit={(values) => {
        Log.debug(JSON.stringify(values));
      }}
    />
  </Story>
));
