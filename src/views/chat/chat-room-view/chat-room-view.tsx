import React, { useEffect } from 'react';
import { ChatRoom } from '@components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Wrapper } from './chat-room-view.styled';
import { get } from 'lodash';
import { authStore } from '@store';
import { useObservable } from 'rxjs-hooks';

const ChatRoomView = () => {
  const { setOptions } = useNavigation();
  const { params } = useRoute();
  const chatId = get(params, 'chatId', null);
  useEffect(() => {
    setOptions({
      title: 'todo chat name',
    });
  }, []);
  const auth = authStore.getInstance();
  const user = useObservable(() => auth.currentUser());
  return <Wrapper>{chatId && user && <ChatRoom chatId={chatId} userId={user.uid} />}</Wrapper>;
};

export default ChatRoomView;
