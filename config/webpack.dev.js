const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  plugins: [
    new WebpackBar({
      name: 'Talos',
      profile: true,
    }),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[name].css',
    }),
    new Dotenv({
      path: path.resolve(__dirname, './.env.dev'),
    }),
  ],
};
