import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from '@i18n';
import { Wrapper } from './register.styled';
import { FormikValues } from 'formik';
import { useObservable } from 'rxjs-hooks';
import AuthStore from '@store/auth';
import { AuthStatus } from '@models/enums';
import { RegisterForm } from '@components';
import useConstant from 'use-constant';

const Register = () => {
  const { setOptions } = useNavigation();
  useEffect(() => {
    setOptions({
      title: t('views.register.title'),
    });
  }, []);
  const [busy, setBusy] = useState(false);
  const store = useConstant(AuthStore.getInstance);
  const status = useObservable(() => store.status(), AuthStatus.UNINITIALIZED);
  const onSubmit = (values: FormikValues) => {
    store.registerWithEmailAndPassword(values);
  };
  useEffect(() => {
    setBusy(status === AuthStatus.REGISTERING);
  }, [status]);

  return (
    <Wrapper>
      <RegisterForm onSubmit={onSubmit} busy={busy} />
    </Wrapper>
  );
};

export default Register;
