jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentUser: { idToken: 'mocked-id-token' },
  })),
}));
