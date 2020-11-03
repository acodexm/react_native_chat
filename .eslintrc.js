module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    '@react-native-community',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'unused-imports', 'jest'],
  rules: {
    // Semi-colons are un-needed
    semi: 'off',
    // Allow .tsx extensions
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
    // Spaces between class members don't look as good
    'lines-between-class-members': 'off',
    'comma-dangle': 'off',
    'react/static-property-placement': 'off',
    // Un-necessary rule
    'react/jsx-props-no-spreading': 'off',
    'max-classes-per-file': 'off',
    'react/jsx-curly-brace-presence': 'off',
    // Babel module resolver,
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '@assets',
          '@components',
          '@lib',
          '@utils',
          '@hooks',
          '@i18n',
          '@navigation',
          '@services',
          '@theme',
          '@views',
          '@models',
          '@store',
        ],
      },
    ],
    // Don't explicitly add .tsx/.ts extensions
    'import/extensions': [
      2,
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // Ensure correct ordering of imports
    'import/order': 'off',
    // Allows for auto-fixing of unused imports
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-imports-ts': 2,
    'unused-imports/no-unused-vars': 1,
    // Prefer state as a class property
    'react/state-in-constructor': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': ['warn', { variables: false }],
    'no-useless-constructor': 'off',
    'no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],
  },
  env: {
    'jest/globals': true,
  },
};
