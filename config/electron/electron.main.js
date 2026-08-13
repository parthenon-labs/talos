const { merge } = require('webpack-merge');
const electronBaseConfig = require('./electron.base');

module.exports = merge(electronBaseConfig, {
  name: 'electron-main',
  target: 'electron-main',
  entry: './electron/main.ts',
  cache: false,
});
