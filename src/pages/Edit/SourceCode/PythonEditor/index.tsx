import { useEffect, useRef, useState } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import type { Ace } from 'ace-builds';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/python';
import { useDebounceCallback } from '@react-hook/debounce';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import EditServices from '@/apis/services/EditServices';
import { setPythonCode } from '../../store';
import PythonRuntime from '../PythonRuntime';
import { useCurrentIds } from '../hook';
import './styles.css';

interface CustomAnnotion extends Ace.Annotation {
  _custom?: boolean;
  _createTime?: number;
}

const PythonEditor = () => {
  const dispatch = useAppDispatch();
  const { pythonCode, blocklyCode } = useAppSelector(({ edit }) => edit);
  const pythonRuntime = useRef<PythonRuntime>(null!);
  const [editor, setEditor] = useState<Ace.Editor>();
  const [annotations, setAnnotations] = useState<CustomAnnotion[]>([]);
  const [customAnnotations, setCustomAnnotations] = useState<CustomAnnotion[]>(
    [],
  );
  const [markers, setMarkers] = useState<IAceEditorProps['markers']>();
  const currentIds = useCurrentIds();

  useEffect(() => {
    const runtime = PythonRuntime.getInstance();
    pythonRuntime.current = runtime;
  }, []);

  const clearErrorAttentions = () => {
    setCustomAnnotations([]);
    setMarkers([]);
  };

  const checkSyntax = async (codeStr?: string) => {
    try {
      const result = await pythonRuntime?.current?.checkSyntax(codeStr);
      if (!result) {
        return clearErrorAttentions();
      }
      const { errorTypeMessage, row, col } = result;
      setCustomAnnotations([
        {
          row,
          column: 0,
          text: errorTypeMessage,
          type: 'error', // warning, information
          _custom: true,
          _createTime: Date.now(),
        },
      ]);
      setMarkers([
        {
          startRow: row,
          startCol: col,
          endRow: row,
          endCol: col + 2, // 目前 col 都指向 1 列，为了下划线更清晰，多加 1
          className: 'error-marker',
          type: 'text',
        },
      ]);
    } catch {
      clearErrorAttentions();
    }
  };

  const codeChange = useDebounceCallback(newValue => {
    dispatch(setPythonCode(newValue));
    checkSyntax(newValue);
    EditServices.saveChapterCode({
      ...currentIds,
      pythonCode: newValue,
      blocklyCode,
      passed: false,
    });
  }, 500);

  const nextAnnotations = [
    ...annotations.filter(({ _custom }) => !_custom),
    ...customAnnotations,
  ];

  useEffect(() => {
    if (editor) {
      editor.getSession().setAnnotations(nextAnnotations);
    }
  }, [editor, JSON.stringify(nextAnnotations)]);

  return (
    <AceEditor
      mode="python"
      theme="tomorrow"
      height="100%"
      width="100%"
      value={pythonCode}
      onChange={codeChange}
      // onCursorChange={cursorChange}
      fontSize={16}
      wrapEnabled
      annotations={annotations}
      markers={markers}
      onLoad={setEditor}
      onValidate={setAnnotations}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default PythonEditor;
