import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useNavigationStyles from '@navigation/use-navigation-styles';
import Users from '@views/users/users';
import { Icon } from '@components';
import ChatListView from '@views/chat/chat-list-view/chat-list-view';

export type HomeTabParamList = {
  Home: undefined;
  Users: undefined;
};
const Tab = createBottomTabNavigator<HomeTabParamList>();
const HomeNavigator = () => {
  const { tabBarOptions } = useNavigationStyles();
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = focused ? 'message' : 'message';
          } else if (route.name === 'Users') {
            iconName = focused ? 'supervised-user-circle' : 'supervised-user-circle';
          }
          return <Icon type={'material'} name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={ChatListView} />
      <Tab.Screen name="Users" component={Users} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
