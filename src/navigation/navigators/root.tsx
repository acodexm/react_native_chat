import React from 'react';
import AuthStore from '@store/auth';
import AuthNavigator from '@navigation/navigators/auth';
import MainNavigation from '@navigation/navigators/main';
import { useObservable } from 'rxjs-hooks';
import useConstant from 'use-constant';

const RootNavigator = () => {
  const auth = useConstant(AuthStore.getInstance);
  const isLoggedIn = useObservable(() => auth.currentUser());
  return isLoggedIn ? <MainNavigation /> : <AuthNavigator />;
};

export default RootNavigator;
