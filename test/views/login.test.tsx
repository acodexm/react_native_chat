import React from 'react';
import Login from '@views/auth/login/login';
import MockedComponent from '../support/mocked-component';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={Login} />).toJSON();
  expect(tree).toMatchSnapshot();
});
