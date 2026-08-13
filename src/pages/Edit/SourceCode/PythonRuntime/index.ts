/// <reference path="./type/Pyodide.d.ts" />
import { toast } from 'react-toastify';
import { store } from '@/store';
import GameScene from '../../Scene/GameScene';
import { setPythonRuntime, setRunning } from '../../store';
import appendScript from '@/utils/appendScript';
import {
  localStaticBaseUrl,
  errorToastOptions,
} from '@/utils/constant';
import { getInfoFromSyntaxError, transformPyodideRunError } from './utils';

const indexURL = `${localStaticBaseUrl}pyodide/`;

type ReplaceKeyword = 'isCoin' | 'isBlocked' | 'isRightBlocked';

class PythonRuntime {
  static #instance: PythonRuntime;

  #pyodide!: LoadPyodideResult;

  constructor() {
    this.#init();
  }

  static getInstance() {
    if (!PythonRuntime.#instance) {
      PythonRuntime.#instance = new PythonRuntime();
    }

    return PythonRuntime.#instance;
  }

  unregister() {
    this.#pyodide?.unregisterJsModule('role');
    this.#pyodide?.unregisterJsModule('world');
  }

  async #init() {
    await appendScript(`${indexURL}pyodide.js`);
    const pyodide = await loadPyodide({ indexURL });
    this.#pyodide = pyodide;
    store.dispatch(setPythonRuntime());
  }

  async register() {
    const { default: RoleCommand } = await import(
      '@/pages/Edit/Scene/Role/Command'
    );
    const { default: WorldCommand } = await import(
      '@/pages/Edit/Scene/World/Command'
    );
    this.#pyodide.registerJsModule('role', RoleCommand);
    this.#pyodide.registerJsModule('world', WorldCommand);
  }

  static replaceSyntax() {
    let isImport = true;
    return (code: string, keyword: ReplaceKeyword) =>
      code.replace(new RegExp(keyword, 'g'), () => {
        const value = isImport ? keyword : `${keyword}()`;
        isImport = false;
        return value;
      });
  }

  async run() {
    const { edit } = store.getState();

    const code = (<ReplaceKeyword[]>[
      'isCoin',
      'isBlocked',
      'isRightBlocked',
    ]).reduce(
      (pre, curr) => PythonRuntime.replaceSyntax()(pre, curr),
      edit.pythonCode,
    );
    // 重置场景
    GameScene.getInstance().restoreScene();
    toast.dismiss();
    this.#pyodide
      .runPythonAsync(code)
      .then(() => GameScene.getInstance().run())
      .catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        store.dispatch(setRunning(false));
        GameScene.getInstance()?.gameSound.errorEffect();
        const errorMessage = transformPyodideRunError(error);
        toast.dismiss();
        toast.error(errorMessage, errorToastOptions);
      })
      .finally(async () => {
        const { default: Control } = await import(
          '@/pages/Edit/Scene/Role/Command'
        );
        Control.restore();
      });
  }

  async checkSyntax(code?: string) {
    if (!code) {
      return null;
    }
    try {
      const expression = [
        'import ast',
        'from textwrap import dedent',
        '',
        `source = dedent("""${code}""")`,
        'compile(source, "<exec>", "exec", ast.PyCF_ONLY_AST)',
      ].join('\n');
      await this.#pyodide.runPythonAsync(expression);
      return null;
    } catch (err) {
      return getInfoFromSyntaxError(err as Error);
    }
  }
}

export default PythonRuntime;
