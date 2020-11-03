import React, { FunctionComponent, useEffect } from 'react';
import { FlatList, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { TileWrapper, Wrapper } from './chat-list.styled';
import { useObservable } from 'rxjs-hooks';
import { v4 as uuid } from 'uuid';
import { get } from 'lodash';
import ChatListStore from '@store/chat-list';
import AuthStore from '@store/auth';

interface ChatListProps {
  style?: StyleProp<ViewStyle>;
}
const ChatList: FunctionComponent<ChatListProps> = () => {
  const chatStore = ChatListStore.getInstance();
  const auth = AuthStore.getInstance();
  const user = useObservable(() => auth.currentUser());
  useEffect(() => {
    chatStore.listen();
    return chatStore.dispose;
  }, []);
  const chats = useObservable(() => chatStore.chats());
  const refreshing = useObservable(() => chatStore.refreshing(), true);
  return (
    <Wrapper>
      <FlatList
        data={chats}
        onEndReached={chatStore.requestMoreData}
        onRefresh={chatStore.onRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item?.id ?? uuid()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => item && chatStore.onLongPress()}
            onPress={() => item && chatStore.onTap(item.id)}
          >
            <TileWrapper>
              <Text>{get(item, ['title', user?.uid ?? ''], 'NO TITLE!!!!')}</Text>
            </TileWrapper>
          </TouchableOpacity>
        )}
      />
    </Wrapper>
  );
};

export default ChatList;
