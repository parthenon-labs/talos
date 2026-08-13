import { app, BrowserWindow, screen, session, protocol } from 'electron';
import { devTool, staticFiles } from './utils';
import { staticScheme } from './constants';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

// const reactDevToolsPath = path.join(
//   os.homedir(),
//   '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.23.0_12',
// );

// app.whenReady().then(async () => {
//   await session.defaultSession.loadExtension(reactDevToolsPath);
// });

protocol.registerSchemesAsPrivileged([
  {
    scheme: staticScheme,
    privileges: { bypassCSP: true, supportFetchAPI: true },
  },
]);

const createWindow = () => {
  // Create the browser window.
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    height,
    width,
    titleBarStyle: 'customButtonsOnHover',
    // webPreferences: {
    // nodeIntegration: true,
    //   contextIsolation: false,
    // },
  });
  devTool(mainWindow);
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy':
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' static://*; script-src 'self' 'unsafe-inline' 'unsafe-eval' static://*; worker-src static://* 'self' blob:; connect-src static://* 'self' blob:; style-src static://* 'self' 'unsafe-inline'; img-src 'self' static://* data: blob:; font-src static://* 'self' data: blob:;",
      },
    });
  });

  staticFiles();

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

app.on(
  'activate',
  () => BrowserWindow.getAllWindows().length === 0 && createWindow(),
);
