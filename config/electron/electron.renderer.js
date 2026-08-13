const path = require('path');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const electronBaseConfig = require('./electron.base');
const devConfig = require('../webpack.dev');
const prodConfig = require('../webpack.prod');

const isDevelopment = process.env.NODE_ENV !== 'production';

const copyFromPath = p => path.resolve(__dirname, `../../public/${p}`);
const copyToPath = p => path.resolve(__dirname, `../../.webpack/renderer/${p}`);

module.exports = merge(
  electronBaseConfig,
  isDevelopment ? devConfig : prodConfig,
  {
    name: 'electron-renderer',
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, './.env'),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: copyFromPath('static'),

            to: copyToPath('static'),
          },
          {
            from: copyFromPath('pyodide'),
            to: copyToPath('pyodide'),
          },
          {
            from: copyFromPath('mockServiceWorker.js'),
            to: copyToPath('mockServiceWorker.js'),
          },
        ],
      }),
    ],
  },
);
