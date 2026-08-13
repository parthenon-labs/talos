import { useEffect, useRef } from 'react';
import Blockly from 'blockly';
import Python from 'blockly/python';
import locale from 'blockly/msg/zh-hans';
import { localStaticBaseUrl } from '@/utils/constant';
import { useAppSelector } from '@/hooks/state';
import 'blockly/blocks';
import CustomBlockly from './CustomBlockly';
import customTheme from './BlocklyTheme';
import CustomFieldTextInput from './CustomFieldTextInput';
import toolbox from '../Toolbox';

Blockly.setLocale(locale);

export interface CodeType {
  blocklyCode: string;
  pythonCode: string;
}
interface BlocklyComponentProps {
  code: string;
  onChange: (code: CodeType) => void;
}

const BlocklyComponent = ({ onChange, code }: BlocklyComponentProps) => {
  const { blocklyCodeChanged } = useAppSelector(({ edit }) => edit);

  const blocklyDiv = useRef<HTMLDivElement>(null!);
  const workspace = useRef<Blockly.WorkspaceSvg>(null!);

  const codeChange = () => {
    const pythonCode = Python.workspaceToCode(workspace.current);
    const xml = Blockly.Xml.workspaceToDom(workspace.current);
    const xmlString = Blockly.Xml.domToText(xml);

    onChange({ blocklyCode: xmlString, pythonCode });
  };

  useEffect(() => {
    Blockly.BlockSvg = CustomBlockly;
    Blockly.FieldTextInput = CustomFieldTextInput;
    workspace.current = Blockly.inject(blocklyDiv.current, {
      theme: customTheme,
      toolbox,
      renderer: 'custom_renderer',
      media: `${localStaticBaseUrl}static/blockly/`,
      grid: {
        spacing: 20,
        length: 4,
        colour: '#ccc',
        snap: true,
      },
    });

    workspace.current.addChangeListener(codeChange);

    const ro = new ResizeObserver(() => Blockly.svgResize(workspace.current));
    ro.observe(blocklyDiv.current);
  }, []);

  useEffect(() => {
    if (blocklyCodeChanged) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    code
      ? Blockly.Xml.clearWorkspaceAndLoadFromXml(
          Blockly.Xml.textToDom(code),
          workspace.current,
        )
      : Blockly.mainWorkspace.clear();
  }, [code]);

  return <div ref={blocklyDiv} className="h-full w-full" />;
};

export default BlocklyComponent;
