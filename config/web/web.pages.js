const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const webProd = require('./web.prod');

// Build variant for a static portfolio demo on GitHub Pages
// (https://<user>.github.io/<repo>/). Only the asset publicPath changes;
// routing is HashRouter (see src/App.tsx) so no server-side rewrite /
// SPA fallback is needed for a GitHub Pages project subpath.
// PUBLIC_URL_PREFIX (e.g. '/cp-fe-demo') must match the GitHub Pages repo
// name — pass it via the build:pages script, not by editing this file.
const publicUrlPrefix = process.env.PUBLIC_URL_PREFIX || '';
if (!publicUrlPrefix) {
  throw new Error('PUBLIC_URL_PREFIX env var is required for build:pages');
}

module.exports = merge(webProd, {
  output: {
    publicPath: `${publicUrlPrefix}/`,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL_PREFIX': JSON.stringify(publicUrlPrefix),
    }),
    // public/mockServiceWorker.js isn't picked up by the existing
    // CopyPlugin pattern (only public/static is copied), and this demo
    // build always relies on MSW instead of a real backend.
    new CopyPlugin({
      patterns: [
        { from: 'public/mockServiceWorker.js', to: 'mockServiceWorker.js' },
      ],
    }),
  ],
});
