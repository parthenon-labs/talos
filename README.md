# Talos

An interactive 3D programming environment built with React, Blockly, Pyodide,
and Babylon.js.

[Live demo](https://parthenon-labs.github.io/talos/) ·
[Deployment status](https://github.com/parthenon-labs/talos/actions/workflows/pages.yml)

## Highlights

- Converts custom Blockly programs into Python and runs them in the browser
  with Pyodide.
- Bridges Python commands to a Babylon.js world for immediate character and
  scene feedback.
- Supports Blockly and Python editing with shared Redux state and IndexedDB
  persistence.
- Runs as a static PWA backed by Mock Service Worker data, so the public demo
  does not require a server.

## Core stack

React 18 · TypeScript · Babylon.js · Blockly · Pyodide · Redux Toolkit ·
TanStack Query · IndexedDB · Webpack 5 · MSW

## Run locally

```sh
yarn install
yarn start:web
```

## Verify

```sh
yarn checkType
yarn build:web
```

The GitHub Pages build uses `yarn build:pages` and deploys from
`.github/workflows/pages.yml`.
