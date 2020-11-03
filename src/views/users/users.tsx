import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from '@i18n';
import { Wrapper } from './users.styled';
import { UserList } from '@components/users';

const Users = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      title: t('views.explore.title'),
    });
  }, []);

  return (
    <Wrapper>
      <UserList />
    </Wrapper>
  );
};

export default Users;
