import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import useNavigationStyles from '../use-navigation-styles';
import Login from '@views/auth/login/login';
import Register from '@views/auth/register/register';
import ResetPassword from '@views/auth/reset-password/reset-password';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPass: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const { headerStyle, headerTitleStyle } = useNavigationStyles();
  const screenOptions = {
    headerStyle,
    headerTitleStyle,
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Register'} component={Register} />
      <Stack.Screen name={'ResetPass'} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
