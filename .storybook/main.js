const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const projectConfig = require('../config/webpack.config');

module.exports = {
  stories: [
    '../src/stories/**/*.stories.mdx',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-swc',
    'storybook-dark-mode',
  ],
  features: {
    babelModeV7: true,
  },
  webpackFinal: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...projectConfig.resolve.alias,
    };
    config.plugins.push(new ReactRefreshWebpackPlugin());
    const fileLoaderRule = config.module.rules.find(
      rule => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });
    return config;
  },
  core: {
    builder: {
      name: 'webpack5',
      options: {
        // lazyCompilation: true,
        fsCache: true,
      },
    },
  },
};
