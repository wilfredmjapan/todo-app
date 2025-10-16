module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(expo-checkbox|@react-native|react-native|expo|@expo|@react-native-async-storage|expo-local-authentication|expo-modules-core)/)',
  ],
};
