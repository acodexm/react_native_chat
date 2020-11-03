import React from 'react';
import ResetPassword from '@views/auth/reset-password/reset-password';
import MockedComponent from '../support/mocked-component';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={ResetPassword} />).toJSON();
  expect(tree).toMatchSnapshot();
});
