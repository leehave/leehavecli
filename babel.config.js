module.exports = {
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    [require.resolve('@babel/plugin-transform-runtime'),{ corejs: 3}],
    [require.resolve('@babel/plugin-proposal-class-properties'),{ loose: true}],
  ]
}