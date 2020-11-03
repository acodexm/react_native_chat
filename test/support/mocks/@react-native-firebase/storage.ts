jest.mock('@react-native-firebase/storage', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ref: jest.fn(() => ({
      child: jest.fn(() => ({
        child: jest.fn(),
        delete: jest.fn(),
        putFile: jest.fn(() => ({
          on: jest.fn(),
        })),
      })),
    })),
  })),
}));
