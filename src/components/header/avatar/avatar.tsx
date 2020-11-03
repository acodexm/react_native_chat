import React, { FunctionComponent } from 'react';
import { AvatarProps } from './avatar.props';
import { Wrapper } from './avatar.styled';
import { useObservable } from 'rxjs-hooks';
import AuthStore from '@store/auth';

import { Icon } from '@components';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserAvatar: FunctionComponent<AvatarProps> = (props) => {
  const { navigate } = useNavigation();
  const auth = AuthStore.getInstance();
  const user = useObservable(() => auth.currentUser());
  return (
    <Wrapper>
      <TouchableOpacity
        onPress={() => navigate('Settings')}
        style={{ borderRadius: 20, width: 40, height: 40 }}
      >
        {user?.photoUrl ? (
          <Image source={{ uri: user.photoUrl }} />
        ) : (
          <Icon type={'fa'} size={24} name="user-circle" />
        )}
      </TouchableOpacity>
    </Wrapper>
  );
};

export default UserAvatar;
