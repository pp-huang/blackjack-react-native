module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['react', 'react-native', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 'off',
  },
  env: {
    'react-native/react-native': true,
  },
};
