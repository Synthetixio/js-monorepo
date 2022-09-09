module.exports = {
  presets: [
    [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
    [require.resolve('@babel/preset-env'), { targets: { browsers: ['last 1 Chrome version'] } }],
    require.resolve('@babel/preset-typescript'),
  ],
};
