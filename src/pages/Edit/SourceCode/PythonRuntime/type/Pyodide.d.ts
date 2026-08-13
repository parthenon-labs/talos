interface LoadPyodideResult {
  runPython: (code: string) => void;
  runPythonAsync: (code: string) => Promise<void>;
  globals: {
    set(key: string, data: unknown): void;
  };
  registerJsModule: (name: string, module: unknown) => void;
  unregisterJsModule: (name: string) => void;
}

declare function loadPyodide({
  indexURL: string,
  fullStdLib: boolean = true,
}): Promise<LoadPyodideResult>;
