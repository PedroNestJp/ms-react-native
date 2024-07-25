module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        "module-resolver",
        {
          "root": ["./"],
          "alias": {
            "@components": "./components",
            "@constants": "./constants",
            "@assets": "./assets",
            "@icons": "./assets/icons",
            "@services": "./services",
            "@context": "./context",
            "@utils": "./utils",
          }
        }
      ],
      "react-native-reanimated/plugin"
    ]
  };
};
