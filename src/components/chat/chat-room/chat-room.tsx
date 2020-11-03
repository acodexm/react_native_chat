import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ChatRoomProps } from './chat-room.props';
import { Wrapper } from './chat-room.styled';
import { useObservable } from 'rxjs-hooks';
import { v4 as uuid } from 'uuid';
import MessagesStore from '@store/messages';
import { Message, MessageBar } from '@components';

const ChatRoom: FunctionComponent<ChatRoomProps> = ({ chatId, userId }) => {
  const messagesStore = useMemo(() => new MessagesStore(chatId, userId), []);
  useEffect(() => {
    messagesStore.listen();
    return messagesStore.dispose;
  }, []);
  const chats = useObservable(() => messagesStore.messages());
  const refreshing = useObservable(() => messagesStore.refreshing(), true);
  return (
    <Wrapper>
      <FlatList
        data={chats}
        onEndReached={messagesStore.requestMoreData}
        onRefresh={messagesStore.onRefresh}
        refreshing={refreshing}
        inverted={true}
        keyExtractor={(item) => item?.id ?? uuid()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity
            // style={{ padding: 10, marginHorizontal: 2, marginVertical: 2 }}
            onLongPress={() => item && messagesStore.onLongPress()}
            onPress={() => item && messagesStore.onTap(item.id)}
          >
            <Message message={item} />
          </TouchableOpacity>
        )}
      />
      <MessageBar onSendMessage={messagesStore.onSendMessage} />
    </Wrapper>
  );
};

export default ChatRoom;
