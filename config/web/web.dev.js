const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const internalIp = require('internal-ip');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));
const { merge } = require('webpack-merge');

const webConfig = require('./web.config');
const baseDevConfig = require('../webpack.dev');

// 使用微信登录时要开 https
const https = false;
const port = https ? 443 : 8080;
// 在 hosts 文件中添加
// 127.0.0.1 www.yidengfe.com
const host = https ? 'www.yidengfe.com' : 'localhost';
const serverBaseURL = argv.host || host;

module.exports = merge(webConfig, baseDevConfig, {
  output: {
    assetModuleFilename: 'assets/[name][ext]',
    filename: 'scripts/[name].main.js',
    chunkFilename: 'scripts/[name].chunk.js',
  },
  experiments: {
    // lazyCompilation: {
    //   imports: true,
    //   entries: false,
    //   test: module =>
    //     !/pages\/List-page|layout/.test(module.nameForCondition()),
    // },
  },
  watchOptions: {
    aggregateTimeout: 2000,
    poll: 2000, // Check for changes every second
  },
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
    static: ['public'],
    port,
    // compress: true,
    client: {
      logging: 'error',
      progress: true,
      overlay: true,
    },
    https,
    host,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Talos',
      favicon: path.resolve(__dirname, '../../public/icons/logo.png'),
      filename: 'index.html',
      template: './public/index.ejs',
      templateParameters: { cdn: [] },
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `
    App running at:
    - Local:     ${chalk.cyan.underline(
      `http${https ? 's' : ''}://localhost:${port}/`,
    )}
    - Network:   ${chalk.cyan.underline(
      `http${https ? 's' : ''}://${internalIp.v4.sync()}:${port}/`,
    )}
    - After End: ${chalk.cyan.underline(
      `http://${serverBaseURL}:3000/api-doc`,
    )}`,
        ],
      },
    }),
  ],
});
