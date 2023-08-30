module.exports = {
  preset: 'react-native',
  "moduleDirectories": [
    "node_modules"
  ],
  "transformIgnorePatterns": [
    "node_modules/?!(react-navigation)"
  ],
  "setupFiles": [
    "./node_modules/react-native-gesture-handler/jestSetup.js"
  ]
};
