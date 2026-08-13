const { resolve } = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minRemainingSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10,
          reuseExistingChunk: true,
        },
        coreLibraries: {
          chunks: 'all',
          name: 'coreLibraries',
          test: /@tanstack\/react-query|@reduxjs|axios/,
          priority: 10,
          reuseExistingChunk: true,
        },
        gsap: {
          chunks: 'all',
          name: 'gsap',
          test: /gsap/,
          priority: 10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new Dotenv({
      path: resolve(__dirname, './.env.prod'),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /@babylonjs\/inspector$/,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash:5].css',
      chunkFilename: 'styles/[contenthash:5].css',
    }),
  ],
};
