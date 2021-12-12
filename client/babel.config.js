module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: 'usage',
        targets: {
          browsers: ['chrome >= 95'],
        },
      },
    ],
    ['@babel/preset-react'],
  ],
};
