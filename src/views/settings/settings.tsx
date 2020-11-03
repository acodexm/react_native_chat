import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from '@i18n';
import { Wrapper } from './settings.styled';
import { Button } from 'react-native';
import AuthStore from '@store/auth';

const Settings = () => {
  const { setOptions } = useNavigation();
  const auth = AuthStore.getInstance();
  useEffect(() => {
    setOptions({
      title: t('views.settings.title'),
    });
  }, []);
  return (
    <Wrapper>
      <Button title={t('button.logout')} onPress={() => auth.singOut()} />
    </Wrapper>
  );
};

export default Settings;
