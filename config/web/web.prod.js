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
      // Pyodide is served from the app's own static assets (see
      // PythonRuntime/index.ts), so it's already covered by GenerateSW's
      // default precaching — no separate runtime-caching rule needed.
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
