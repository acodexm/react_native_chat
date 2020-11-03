jest.mock('i18n-js', () => ({
  t: (key: string) => `${key}`,
}));
