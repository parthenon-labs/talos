const path = require('path');

module.exports = {
  name: '小灯Coding',
  short_name: 'Coding',
  start_url: '/',
  background_color: '#ffffff',
  theme_color: '#297EFF',
  display: 'standalone',
  icons: [
    {
      src: path.resolve('./public/icons/icon_512.png'),
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: path.resolve('./public/icons/icon_192.png'),
      sizes: '192x192',
      type: 'image/png',
    },
  ],
};
