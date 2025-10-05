const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './public/js/login.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/css', to: 'css' },
        { from: 'private/home.html', to: 'private/home.html' },
      ],
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
  },
};
