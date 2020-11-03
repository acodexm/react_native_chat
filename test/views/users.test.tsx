import React from 'react';
import Users from '@views/users/users';
import MockedComponent from '../support/mocked-component';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={Users} />).toJSON();
  expect(tree).toMatchSnapshot();
});
