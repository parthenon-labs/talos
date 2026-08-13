# Talos

> 3D coding-education frontend · Babylon.js + React

[![Deploy GitHub Pages demo](https://github.com/parthenon-labs/talos/actions/workflows/pages.yml/badge.svg)](https://github.com/parthenon-labs/talos/actions/workflows/pages.yml)

**Live demo:** https://parthenon-labs.github.io/talos/

---

## Table of Contents

- [Overview](#overview)
  - [TODO](#todo)
  - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Development](#development)
    - [Start the project](#start-the-project)
  - [Production](#production)
  - [Directory Structure](#directory-structure)
  - [Commit Convention](#commit-convention)

## Overview

### TODO

- [ ] SSG:
  1. Use webpackHTMLPlugin + renderToString
  2. Support dynamic routes and query params
  3. Call the CI/CD tool's API to trigger a rebuild when data changes

### Tech Stack

- React 18
- React Router V6
- @loadable/component
- axios + Mock Service Worker
- React-Query
- xstate/react
- react-use
- Material-UI
- Tailwind CSS
- Babylon.js

## Getting Started

### Development

VS Code is recommended, with the following extensions installed (or the equivalent for another IDE):

1. `PostCSS Language Support`
2. `Tailwind CSS IntelliSense`
3. `Eslint`
4. `Prettier - Code formatter`

#### Start the project

```sh
yarn install
```

| Command | Description |
| --- | --- |
| `yarn start:web` | Start the web app |
| `yarn start:electron` | Start the Electron app |
| `yarn start:storybook` | Start Storybook |

### Production

| Command | Description |
| --- | --- |
| `yarn build:analyze` | Bundle dependency analysis |
| `yarn build:web` | Build for web |
| `yarn build:web --progress profile` | Build speed profiling |
| `yarn build:storybook` | Build Storybook |
| `yarn make` | Build Electron for the current platform (subcommands below are for GitHub Actions cluster builds) |
| `yarn make:mac:x64` | Build for Intel Mac |
| `yarn make:mac:arm64` | Build for M1 Mac |
| `yarn make:win:x64` | Build for 64-bit Windows |
| `yarn make:win:ia32` | Build for 32-bit Windows |

### Directory Structure

```
|- .storybook — Storybook config
|- config — project webpack config
|- dist — production build output
|- src
  |- apis — API requests
    |- model — API data interfaces
    |- services — API request definitions
    |- index.ts — base request config
    |- queryKeys.ts — data cache keys (enum)
  |- assets — static assets (images, fonts...)
  |- hooks — custom hooks
    |- state.ts — redux-related hooks
  |- layout — shared page layout
  |- pages — pages
  |- routes — routing config
  |- stories — shared components
  |- utils — utility functions
  |- index.tsx — app entry point
|- tailwind.config.js — Tailwind CSS config
```

### Commit Convention

| Type | Description |
| --- | --- |
| `build` | Build tooling |
| `ci` | CI |
| `chore` | Tooling changes (including but not limited to docs, code generation, etc.) |
| `docs` | Documentation changes |
| `feat` | New feature |
| `fix` | Bug fix |
| `perf` | Performance improvement |
| `refactor` | Code refactor, no functional change intended |
| `revert` | Revert a commit |
| `style` | Code formatting, no logic change |
| `test` | Test-related |
