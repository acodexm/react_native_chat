import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useNavigationStyles from '../use-navigation-styles';
import Landing from '@views/landing/landing';
import HomeNavigator from '@navigation/navigators/home';
import { useObservable } from 'rxjs-hooks';
import AppStore from '@store/app';
import Settings from '@views/settings/settings';
import UserAvatar from '@components/header/avatar/avatar';

import { Log } from '@utils/logs/logger';
import ChatRoomView from '@views/chat/chat-room-view/chat-room-view';

export type MainStackParamList = {
  Landing: undefined;
  Home: undefined;
  Settings: undefined;
  ChatRoom: { chatId: string };
};
const Stack = createStackNavigator<MainStackParamList>();
const MainNavigation = () => {
  const { headerStyle, headerTitleStyle } = useNavigationStyles();
  const screenOptions = {
    headerStyle,
    headerTitleStyle,
    headerRight: () => <UserAvatar />,
  };

  const app = AppStore.getInstance();
  useEffect(() => {
    app.initializeApp();
  }, []);
  const firstLaunch = useObservable(() => app.firstLaunch());
  Log.warn(firstLaunch);
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {firstLaunch ? <Stack.Screen name="Landing" component={Landing} /> : null}
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="ChatRoom" component={ChatRoomView} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
