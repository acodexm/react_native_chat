jest.mock('@react-native-firebase/remote-config', () => ({
  __esModule: true,
  default: jest.fn(),
}));
