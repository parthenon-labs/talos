export const isDevelopment = process.env.NODE_ENV !== 'production';

export const staticScheme = 'static';

export const devToolKey =
  process.platform === 'darwin'
    ? {
        // macOS: command+option+i
        alt: true, // option
        control: false,
        meta: true, // command
        shift: false,
        code: 'KeyI',
      }
    : {
        // Windows: control+shift+i
        alt: false,
        control: true,
        meta: false, // Windows key
        shift: true,
        code: 'KeyI',
      };
