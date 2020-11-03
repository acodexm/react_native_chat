const mock_getToken = jest.fn(() => Promise.resolve('myMockToken'));
const mock_requestPermission = jest.fn(() => Promise.resolve(true));
const mock_unsubscribeFromTopic = jest.fn();
const mock_subscribeToTopic = jest.fn();
const mock_hasPermission = jest.fn(() => Promise.resolve(true));
jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    hasPermission: mock_hasPermission,
    subscribeToTopic: mock_subscribeToTopic,
    unsubscribeFromTopic: mock_unsubscribeFromTopic,
    requestPermission: mock_requestPermission,
    getToken: mock_getToken,
  })),
}));
export {
  mock_getToken,
  mock_requestPermission,
  mock_unsubscribeFromTopic,
  mock_subscribeToTopic,
  mock_hasPermission,
};
