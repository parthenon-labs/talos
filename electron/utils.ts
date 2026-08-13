import path from 'path';
import { BrowserWindow, session, app } from 'electron';
import {
  isDevelopment,
  // devToolKey,
  staticScheme,
} from './constants';

export const devTool = (window: BrowserWindow) => {
  isDevelopment && window.webContents.openDevTools();

  // window.webContents.on('before-input-event', (event, input) => {
  //   if (
  //     input.code === devToolKey.code &&
  //     input.alt === devToolKey.alt &&
  //     input.control === devToolKey.control &&
  //     input.meta === devToolKey.meta &&
  //     input.shift === devToolKey.shift &&
  //     input.type === 'keyDown' &&
  //     !input.isAutoRepeat &&
  //     !input.isComposing &&
  //     !isDevelopment
  //   ) {
  //     event.preventDefault();
  //   }
  // });
};

export const staticFiles = () => {
  session.defaultSession.protocol.registerFileProtocol(
    staticScheme,
    (request, callback) => {
      const fileUrl = request.url.replace(`${staticScheme}://`, '');
      const filePath = path.join(
        app.getAppPath(),
        '.webpack/renderer',
        fileUrl,
      );
      callback(filePath);
    },
  );
};
