import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from '@i18n';
import { LoginForm } from '@components';
import { Wrapper } from './login.styled';
import AuthStore from '@store/auth';
import { useObservable } from 'rxjs-hooks';
import { AuthStatus } from '@models/enums';
import { FormikValues } from 'formik';
import { Button } from 'react-native';
import useConstant from 'use-constant';

const Login = () => {
  const { setOptions, navigate } = useNavigation();
  useEffect(() => {
    setOptions({
      title: t('views.login.title'),
    });
  }, []);
  const [busy, setBusy] = useState(false);
  const store = useConstant(AuthStore.getInstance);
  const status = useObservable(() => store.status(), AuthStatus.UNINITIALIZED);
  const onSubmit = (values: FormikValues) => {
    store.singInWithEmailAndPassword(values);
  };
  const onGoogleLogin = () => {
    store.googleSingIn();
  };
  useEffect(() => {
    setBusy(status === AuthStatus.AUTHENTICATING);
  }, [status]);
  return (
    <Wrapper>
      <LoginForm onSubmit={onSubmit} onGoogleLogin={onGoogleLogin} busy={busy} />
      <Button
        onPress={() => {
          navigate('Register');
        }}
        title={'Register'}
      />
      <Button
        onPress={() => {
          navigate('ResetPass');
        }}
        title={'Reset password'}
      />
    </Wrapper>
  );
};

export default Login;
