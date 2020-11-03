import React from 'react';
import Settings from '@views/settings/settings';
import MockedComponent from '../support/mocked-component';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={Settings} />).toJSON();
  expect(tree).toMatchSnapshot();
});
