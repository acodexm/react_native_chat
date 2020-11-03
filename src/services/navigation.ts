import { createRef } from 'react';
import { CommonActions, StackActions } from '@react-navigation/native';

export const navigationRef = createRef<any>();
type Route =
  | 'Settings'
  | 'ChatRoom'
  | 'ChatList'
  | 'Explore'
  | 'Login'
  | 'Register'
  | 'ResetPass'
  | 'Home';
/**
 * Service class that allows the navigation object to be used globally
 */
class NavigationService {
  static navigate(name: Route, params?: object) {
    navigationRef.current?.navigate({
      name,
      params,
    });
  }

  static push(route: Route, params?: object) {
    navigationRef.current?.dispatch(StackActions.push(route, params));
  }

  static goBack() {
    navigationRef.current?.dispatch(CommonActions.goBack());
  }
}

const navigationService = NavigationService;
export default navigationService;
