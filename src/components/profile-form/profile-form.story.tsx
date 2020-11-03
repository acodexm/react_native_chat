import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Story from '@lib/storybook/story';
import ProfileForm from './profile-form';

declare let module: any;

storiesOf('ProfileForm', module).add('Default view', () => {
  <Story>
    <ProfileForm />
  </Story>;
});
