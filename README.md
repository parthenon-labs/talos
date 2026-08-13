<div align="center">

# Talos

**A programmable 3D world that runs entirely in the browser.**

Write visually with Blockly or directly in Python. Talos compiles the program,
executes it with Pyodide, and translates its effects into a Babylon.js scene.

[Live system](https://parthenon-labs.github.io/talos/) ·
[Source](https://github.com/parthenon-labs/talos) ·
[Build](https://github.com/parthenon-labs/talos/actions/workflows/pages.yml)

</div>

---

## System

```text
Blockly workspace ──generate──▶ Python source
                                      │
Python editor ────────────────────────┤
                                      ▼
                              Pyodide runtime
                                      │
                         role / world command bridge
                                      │
                                      ▼
                     ordered command queues ──▶ Babylon.js
                                                    │
                                                    ▼
                                           interactive 3D world
```

Talos is deliberately client-side. The public build has no application server:
course data is served through MSW, user programs persist in IndexedDB, and the
runtime is deployed as a static PWA.

## Engineering notes

| Concern | Approach |
| --- | --- |
| Visual programming | Custom Blockly renderer, toolbox, fields, blocks, and Python generator |
| Python execution | Pyodide with JavaScript modules registered as the `role` and `world` APIs |
| Deterministic motion | Separate role and world command queues consumed by the scene runtime |
| 3D runtime | Babylon.js with GLB assets, WebGPU detection, and WebGL fallback |
| Persistence | IndexedDB stores Blockly and Python source per course chapter |
| Static deployment | Webpack 5, Workbox, MSW, and GitHub Pages |

The boundary between Python and the scene is the core of the project. Python
does not mutate Babylon.js objects directly; it emits domain commands that are
validated, queued, and executed by the world runtime. This keeps code execution
independent from rendering and makes scene behaviour reproducible.

## Repository map

```text
src/pages/Edit/
├── SourceCode/
│   ├── BlocklyEditor/     custom blocks, renderer, toolbox, Python generator
│   ├── PythonEditor/      direct source editing
│   └── PythonRuntime/     Pyodide lifecycle and JS module bridge
├── Scene/
│   ├── Engine/            WebGPU / WebGL selection
│   ├── Role/              character model and command queue
│   └── World/             scene state and world command queue
└── store/                 editor and runtime coordination
```

## Development

```sh
yarn install
yarn start:web
```

```sh
yarn checkType
yarn build:web
```

The static portfolio build is produced with `yarn build:pages` and deployed by
[the Pages workflow](.github/workflows/pages.yml).

---

<div align="center">
  <sub>React · TypeScript · Blockly · Pyodide · Babylon.js · IndexedDB · Webpack</sub>
</div>
