import React from 'react';
import MockedComponent from '../support/mocked-component';
import ChatRoomView from '@views/chat/chat-room-view/chat-room-view';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const tree = render(<MockedComponent Component={ChatRoomView} />).toJSON();
  expect(tree).toMatchSnapshot();
});
