const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  // mode: 'production',
  mode: 'development',
  entry: {
    fh0: './fh0/fh0-cli.ts',
    'fh0-plumber': './fh0-plumber/fh0-plumber-cli.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'lib'),
      '@fh0-plumber': path.resolve(__dirname, 'fh0-plumber'),
      '@fh0': path.resolve(__dirname, 'commands'),
    },
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
