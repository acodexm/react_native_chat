jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: ([language = 'en']) => ({
    languageTag: language,
    isRTL: false,
  }),
}));
