module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-nullish-coalescing-operator',
      '@babel/plugin-transform-template-literals',
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@': './',
            '@app': './app',
            '@components': './components',
            '@constants': './constants',
            '@hooks': './hooks',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};