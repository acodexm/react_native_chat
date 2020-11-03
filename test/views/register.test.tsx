import React from 'react';
import Register from '@views/auth/register/register';
import MockedComponent from '../support/mocked-component';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={Register} />).toJSON();
  expect(tree).toMatchSnapshot();
});
