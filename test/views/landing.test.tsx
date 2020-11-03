import React from 'react';
import Landing from '@views/landing/landing';
import MockedComponent from '../support/mocked-component';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={Landing} />).toJSON();
  expect(tree).toMatchSnapshot();
});
