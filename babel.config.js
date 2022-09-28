//add 'react-native-reanimated/plugin' to plugins in babel.config.js
//then run expo start --clear
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
}