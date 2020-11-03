jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    isSignedIn: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => Promise.resolve()),
    signIn: jest.fn(() => Promise.resolve(true)),
    signInSilently: jest.fn(() => Promise.resolve(true)),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
  },
  statusCodes: {},
}));
