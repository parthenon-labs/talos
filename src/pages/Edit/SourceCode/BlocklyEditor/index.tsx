import { useDebounceCallback } from '@react-hook/debounce';
import { useAppDispatch, useAppSelector } from '@/hooks/state';
import EditServices from '@/apis/services/EditServices';
import BlocklyComponent, { CodeType } from './Blockly/BlocklyComponent';
import {
  setPythonCode,
  setBlocklyCode,
  setBlocklyCodeChanged,
} from '../../store';
import { useCurrentIds } from '../hook';
import './generator/generator';
import './Blocks';
import './Blockly/CustomRenderer';
import './Blockly/CustomCategory';
import './Blockly/CustomFlyout';
import './Blockly/ToolboxLabel';
import './index.css';

const BlocklyEditor = () => {
  const dispatch = useAppDispatch();
  const blocklyCode = useAppSelector(({ edit }) => edit.blocklyCode);

  const currentIds = useCurrentIds();

  const codeChange = useDebounceCallback((currentCode: CodeType) => {
    dispatch(setBlocklyCode(currentCode.blocklyCode));
    dispatch(setPythonCode(currentCode.pythonCode));
    dispatch(setBlocklyCodeChanged(true));
    EditServices.saveChapterCode({
      ...currentIds,
      blocklyCode: currentCode.blocklyCode,
      pythonCode: currentCode.pythonCode,
      passed: false,
    });
  }, 500);

  return <BlocklyComponent onChange={codeChange} code={blocklyCode} />;
};

export default BlocklyEditor;
