const { resolve } = require('path');
const { ProvidePlugin } = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  cache: {
    type: 'filesystem',
  },
  experiments: {
    topLevelAwait: true,
  },
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [
          resolve('./src/styles.css'),
          resolve('./src/pages/Edit/SourceCode/PythonEditor/styles.css'),
          resolve('./src/pages/Edit/SourceCode/BlocklyEditor/index.css'),
          resolve('node_modules'),
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(webp|png|jpg|jpeg|gif|eot|woff|woff2|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: '小灯coding Build',
      suppressSuccess: true,
      logo: resolve(__dirname, '../public/icons/logo.png'),
    }),
    new ProvidePlugin({
      process: 'process/browser.js',
    }),
  ],
  resolve: {
    modules: ['node_modules', resolve('src')],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': resolve('./src'),
      '@mocks': resolve('./mocks'),
    },
  },
};
