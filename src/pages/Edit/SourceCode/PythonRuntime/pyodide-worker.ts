/* eslint-disable no-restricted-globals */
/// <reference path="./type/Pyodide.d.ts" />

const indexURL = 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/';

let pyodide!: LoadPyodideResult;

self.addEventListener(
  'message',
  async ({ data: { type } }: MessageEvent<{ type: 'init' }>) => {
    if (type !== 'init') return;
    importScripts(`${indexURL}pyodide.js`);
    pyodide = await loadPyodide({ indexURL });
    const { default: Control } = await import(
      '@/pages/Edit/Scene/Role/Command'
    );
    pyodide.registerJsModule('Control', Control);
    postMessage({ type: 'loaded' });
  },
);

self.addEventListener(
  'message',
  async ({
    data: { type, code },
  }: MessageEvent<{ type: 'run'; code: string }>) => {
    if (type !== 'run') return;
    pyodide
      .runPythonAsync(code)
      .catch(error => {
        postMessage({ type: 'error', error: error.message });
      })
      .finally(() => postMessage({ type: 'runned' }));
  },
);
