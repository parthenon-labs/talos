export const isDev = process.env.NODE_ENV === 'development';

export const isElectron = process.env.ELECTRON_ENV === 'true';

// Raw (non-webpack-imported) static asset URLs — 3D models, sounds, Blockly
// media, pyodide, etc. — are built off this. It must track the same
// publicPath prefix the bundle is served from (empty by default; '/cp-fe'
// for the GitHub Pages demo build), or every one of them 404s once the app
// is hosted under a subpath.
export const localStaticBaseUrl = isElectron
  ? 'static://'
  : `${process.env.PUBLIC_URL_PREFIX || ''}/`;

export const errorToastOptions = {
  theme: 'colored',
  position: 'top-right',
  autoClose: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
} as const;
