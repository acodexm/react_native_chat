import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from '@i18n';
import { Wrapper } from './reset-password.styled';
import AuthStore from '@store/auth';
import { FormikValues } from 'formik';
import { ResetPasswordForm } from '@components';
import useConstant from 'use-constant';

const ResetPassword = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      title: t('views.resetPass.title'),
    });
  }, []);
  const [busy, setBusy] = useState(false);
  const store = useConstant(AuthStore.getInstance);
  const onSubmit = async (values: FormikValues) => {
    setBusy(true);
    await store.registerWithEmailAndPassword(values);
    setBusy(false);
  };
  return (
    <Wrapper>
      <ResetPasswordForm onSubmit={onSubmit} busy={busy} />
    </Wrapper>
  );
};

export default ResetPassword;
