jest.mock('@react-native-firebase/crashlytics', () => ({
  __esModule: true,
  default: jest.fn(),
}));
