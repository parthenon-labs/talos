import Blockly from 'blockly';
import Python from 'blockly/python';
import { IPython } from '../types';

const MyPython = Python as IPython;

MyPython.import_control = function importControl() {
  const code = `from role import moveForward, turnLeft, turnRight, collectCoin, isCoin, isBlocked, isRightBlocked\n\n`;
  return code;
};

MyPython.moveForward = function moveForward() {
  const code = `moveForward()\n`;
  return code;
};

MyPython.turnLeft = function turnLeft() {
  const code = `turnLeft()\n`;
  return code;
};

MyPython.turnRight = function turnRight() {
  const code = `turnRight()\n`;
  return code;
};

MyPython.collectCoin = function collectCoin() {
  const code = `collectCoin()\n`;
  return code;
};

MyPython.isCoin = function isCoin() {
  const code = `isCoin`;
  return [code, MyPython.ORDER_NONE];
};

MyPython.isBlocked = function isBlocked() {
  const code = `isBlocked`;
  return [code, MyPython.ORDER_NONE];
};

MyPython.isRightBlocked = function isRightBlocked() {
  const code = `isRightBlocked`;
  return [code, MyPython.ORDER_NONE];
};

MyPython.custom_if = function customIf(block: Blockly.Block) {
  const valueIf = MyPython.valueToCode(block, 'if', MyPython.ORDER_ATOMIC);
  const statementsThen = MyPython.statementToCode(block, 'then');
  return `if ${valueIf}:\n${statementsThen}`;
};
