import React, { useEffect } from 'react';
import { Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { t } from '@i18n';
import { Wrapper } from './landing.styled';
import { Button } from 'react-native';
import AppStore from '@store/app';
import { Log } from '@utils/logs/logger';
import useConstant from 'use-constant';

const Landing = () => {
  const { setOptions, navigate } = useNavigation();
  useEffect(() => {
    setOptions({
      title: t('views.landing.title'),
    });
  }, []);

  const app = useConstant(AppStore.getInstance);
  const goToHome = () => {
    Log.info('firstLaunchDone');
    app.firstLaunchDone();
    navigate('Home');
  };
  return (
    <Wrapper>
      <Text>Landing</Text>
      <Button title="complete first launch" onPress={goToHome} />
    </Wrapper>
  );
};

export default Landing;
