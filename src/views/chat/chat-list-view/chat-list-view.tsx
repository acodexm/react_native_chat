import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from '@i18n';
import { Wrapper } from './chat-list-view.styled';
import { ChatList } from '@components';

const ChatListView = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      title: t('views.chatList.title'),
    });
  }, []);
  return (
    <Wrapper>
      <ChatList />
    </Wrapper>
  );
};

export default ChatListView;
