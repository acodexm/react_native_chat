jest.mock('@react-native-firebase/perf', () => ({
  __esModule: true,
  default: jest.fn(),
}));
