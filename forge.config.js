const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const package = require('./package.json');

const appName = '小灯 coding';

module.exports = {
  packagerConfig: {
    icon: path.resolve('./public/icons/icon_512'),
    name: appName,
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        authors: 'menndy',
        description: '少儿编程客户端',
        setupExe: `${appName}-${package.version}-${argv.arch} Setup.exe`,
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './config/electron/electron.main.js',
        renderer: {
          config: './config/electron/electron.renderer.js',
          entryPoints: [
            {
              html: './public/index.html',
              js: './src/index.tsx',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
};
