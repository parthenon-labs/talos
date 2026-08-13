const { resolve } = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { meta } = require('./constant');
const manifest = require('./manifest');

const webConfig = require('./web.config');
const webProdConfig = require('../webpack.prod');

module.exports = merge(webConfig, webProdConfig, {
  output: {
    filename: 'scripts/[contenthash:8].main.js',
    chunkFilename: 'scripts/[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[contenthash:8][ext]',
    clean: true,
  },
  // devtool: 'hidden-source-map',
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  plugins: [
    new GenerateSW({
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      navigateFallback: 'index.html',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/pyodide.oss-cn-beijing.aliyuncs.com\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cached-pyodide',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/cdn.staticfile.org\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cached-cdn',
            // networkTimeoutSeconds: 2,
            // expiration: {
            //   maxEntries: 50,
            //   maxAgeSeconds: 30 * 24 * 60 * 60,
            // },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    }),

    new HtmlWebpackPlugin({
      title: 'Talos',
      favicon: resolve(__dirname, '../../public/icons/logo.png'),
      filename: 'index.html',
      template: './public/index.ejs',
      inject: 'body',
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
      meta,
      templateParameters: { cdn: [] },
    }),
    new WebpackPwaManifest(manifest),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/static',
          to: 'static',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/.DS_*'],
          },
        },
      ],
    }),
  ],
});
