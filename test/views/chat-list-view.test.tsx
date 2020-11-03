import React from 'react';
import ChatListView from '@views/chat/chat-list-view/chat-list-view';
import MockedComponent from '../support/mocked-component';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={ChatListView} />).toJSON();
  expect(tree).toMatchSnapshot();
});
