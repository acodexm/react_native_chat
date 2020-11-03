module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.js', '.ios.js', '.android.js', '.json', '.ts', '.tsx'],
        root: ['./'],
        alias: {
          '@assets': ['./src/assets'],
          '@views': ['./src/views'],
          '@components': ['./src/components'],
          '@navigation': ['./src/navigation'],
          '@theme': ['./src/theme'],
          '@models': ['./src/models'],
          '@services': ['./src/services'],
          '@store': ['./src/store'],
          '@lib': ['./src/lib'],
          '@utils': ['./src/utils'],
          '@hooks': ['./src/lib/hooks'],
          '@i18n': ['./src/lib/i18n'],
        },
      },
    ],
    [
      require.resolve('react-native-dotenv'),
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [require.resolve('babel-plugin-transform-typescript-metadata')],
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
  ],
};
