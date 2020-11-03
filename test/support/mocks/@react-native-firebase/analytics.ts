const mock_logSignUp = jest.fn();
const mock_logEvent = jest.fn();
const mock_setUserProperties = jest.fn();
const mock_setUserId = jest.fn();
const mock_setCurrentScreen = jest.fn();
const mock_logLogin = jest.fn();

jest.mock('@react-native-firebase/analytics', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    logEvent: mock_logEvent,
    setUserProperties: mock_setUserProperties,
    setUserId: mock_setUserId,
    setCurrentScreen: mock_setCurrentScreen,
    logLogin: mock_logLogin,
    logSignUp: mock_logSignUp,
  })),
}));
export {
  mock_logSignUp,
  mock_logEvent,
  mock_logLogin,
  mock_setCurrentScreen,
  mock_setUserId,
  mock_setUserProperties,
};
