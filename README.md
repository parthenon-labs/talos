# Talos

> 3D 编程教学前端 · Babylon.js + React

[![Deploy GitHub Pages demo](https://github.com/parthenon-labs/talos/actions/workflows/pages.yml/badge.svg)](https://github.com/parthenon-labs/talos/actions/workflows/pages.yml)

**在线演示：** https://parthenon-labs.github.io/talos/

---

## 目录

- [介绍](#介绍)
  - [TODO](#todo)
  - [地址](#地址)
  - [技术栈/库](#技术栈库)
- [开始](#开始)
  - [开发环境](#开发环境)
    - [项目启动](#项目启动)
  - [生产环境](#生产环境)
  - [目录结构](#目录结构)
  - [commit 规范](#commit-规范)

## 介绍

项目原型：https://modao.cc/app/kwsmos51ne8hqn#screen=skv0fp525e6aw6k

### TODO

- [ ] SSG:
  1. 使用 webpackHTMLPlugin + renderToString
  2. 支持动态路由以及 query
  3. 数据更新时，调用 CI/CD 工具 API 重新构建

### 地址

| 环境 | 地址 |
| --- | --- |
| 前端测试环境 | https://cp.test.yidengfe.com/ |
| 接口测试环境 | http://cp.api-test.yidengfe.com/ |

### 技术栈/库

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

## 开始

### 开发环境

推荐使用 vs code 开发，并且安装以下插件（其他 IDE 安装对应插件）

1. `PostCSS Language Support`
2. `Tailwind CSS IntelliSense`
3. `Eslint`
4. `Prettier - Code formatter`

#### 项目启动

```sh
yarn install
```

| 命令 | 说明 |
| --- | --- |
| `yarn start:web` | 启动 web |
| `yarn start:electron` | 启动 electron |
| `yarn start:storybook` | 启动 storybook |

### 生产环境

| 命令 | 说明 |
| --- | --- |
| `yarn build:analyze` | 打包依赖分析 |
| `yarn build:web` | 编译 web 端 |
| `yarn build:web --progress profile` | 打包速度分析 |
| `yarn build:storybook` | 编译 storybook |
| `yarn make` | 本地编译当前平台 electron（以下子命令用于 github action 集群编译） |
| `yarn make:mac:x64` | 编译英特尔 Mac |
| `yarn make:mac:arm64` | 编译 M1 Mac |
| `yarn make:win:x64` | 编译 64 位 windows |
| `yarn make:win:ia32` | 编译 32 位 windows |

### 目录结构

```
|- .storybook —— storybook配置
|- config —— 项目webpack配置
|- dist —— 生产环境打包输出目录
|- src
  |- apis —— API请求
    |- model —— API数据interface
    |- services —— API请求定义
    |- index.ts —— 请求基础配置
    |- queryKeys.ts —— 数据缓存Key（枚举）
  |- assets —— 静态资源（图片、字体...）
  |- hooks —— 自定义hook
    |- state.ts —— redux 相关Hooks
  |- layout —— 页面公共布局
  |- pages —— 页面
  |- routes —— 路由配置
  |- stories —— 公共组件
  |- utils —— 工具方法
  |- index.tsx —— 项目入口文件
|- tailwind.config.js —— tailwind-css配置
```

### commit 规范

| 类型 | 说明 |
| --- | --- |
| `build` | 构建工具相关 |
| `ci` | CI |
| `chore` | 修改工具相关（包括但不限于文档、代码生成等） |
| `docs` | 修改文档 |
| `feat` | 新功能 |
| `fix` | 修复问题 |
| `perf` | 提升性能 |
| `refactor` | 重构代码，理论上不影响现有功能 |
| `revert` | 回滚 |
| `style` | 修改代码格式，不影响代码逻辑 |
| `test` | 测试相关 |
