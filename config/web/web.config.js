const { resolve, join } = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('../webpack.config');

module.exports = merge(baseConfig, {
  name: 'web',
  target: 'browserslist',
  entry: [resolve('./src/web.ts')],
  output: {
    path: join(__dirname, '../../dist/'),
    publicPath: '/',
  },
});
