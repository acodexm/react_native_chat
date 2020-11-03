import { StyleProp, ViewStyle } from 'react-native';

export interface ChatRoomProps {
  style?: StyleProp<ViewStyle>;
  chatId: string;
  userId: string;
}
