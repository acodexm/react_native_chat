import { ChatType } from '@models/enums';
import analytics from '@react-native-firebase/analytics';

interface AnalyticsService {
  setUserProperties(userId: string, userRole: string): Promise<void>;
  logLogin(loginMethod: string): Promise<void>;
  logSignUp(signUpMethod: string): Promise<void>;
  logResetPassword(userId: string): Promise<void>;
  logChatCreated(type: ChatType): Promise<void>;
}

class AnalyticsServiceImpl implements AnalyticsService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AnalyticsServiceImpl();
    }
    return this.instance;
  }
  private static instance: AnalyticsServiceImpl;
  logChatCreated = async (type: ChatType) => {
    await analytics().logEvent('create_chat', { type });
  };

  logLogin = async (loginMethod: string) => {
    await analytics().logLogin({ method: loginMethod });
  };

  logResetPassword = async (email: string) => {
    await analytics().logEvent('reset_password', { email });
  };

  logSignUp = async (signUpMethod: string) => {
    await analytics().logSignUp({ method: signUpMethod });
  };

  setUserProperties = async (userId: string, userRole: string) => {
    await analytics().setUserId(userId);
    await analytics().setUserProperty('user_role', userRole);
  };
}

const analyticsService = AnalyticsServiceImpl.getInstance();
export default analyticsService;
