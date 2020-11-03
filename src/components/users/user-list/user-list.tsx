import React, { FunctionComponent, useEffect } from 'react';
import { FlatList, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { TileWrapper, Wrapper } from './user-list.styled';
import { useObservable } from 'rxjs-hooks';
import { v4 as uuid } from 'uuid';
import { usersStore } from '@store';

interface UserListProps {
  style?: StyleProp<ViewStyle>;
}
const UserList: FunctionComponent<UserListProps> = () => {
  const store = usersStore.getInstance();
  useEffect(() => {
    store.listen();
    return store.dispose;
  }, []);
  const chats = useObservable(() => store.users());
  const refreshing = useObservable(() => store.refreshing(), true);
  return (
    <Wrapper>
      <FlatList
        data={chats}
        onEndReached={store.requestMoreData}
        onRefresh={store.onRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item?.uid ?? uuid()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => item && store.onLongPress()}
            onPress={() => item && store.onTap(item.uid)}
          >
            <TileWrapper>
              <Text>{item?.displayName ?? 'No name :('}</Text>
            </TileWrapper>
          </TouchableOpacity>
        )}
      />
    </Wrapper>
  );
};

export default UserList;
