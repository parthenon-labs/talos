import React from 'react';
import BlocklyComponent from './BlocklyComponent';

export default BlocklyComponent;

/**
 * XMLDOM，原Toolbox配置方式为XML格式，现改为JSON格式，所以下面的代码可能已经没用了
 */

interface XMLDom {
  is: string;
  type: string;
  children: React.ReactNode;
  disabled: boolean;
  name: string;
}

const Block = (p: Partial<XMLDom>) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('block', props, children);
};

const Category = (p: Partial<XMLDom>) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('category', props, children);
};

const Value = (p: Partial<XMLDom>) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('value', props, children);
};

const Field = (p: Partial<XMLDom>) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('field', props, children);
};

const Shadow = (p: Partial<XMLDom>) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('shadow', props, children);
};

export { Block, Category, Value, Field, Shadow };
