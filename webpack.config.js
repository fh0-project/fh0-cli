const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    fh0: './commands/fh0-cli.ts',
    'fh0-plumber': './plumber-commands/fh0-plumber-cli.ts',
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
      '@plumber-commands': path.resolve(__dirname, 'plumber-commands'),
      '@commands': path.resolve(__dirname, 'commands'),
    },
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
