/**
 * 配置积木
 */

import Blockly from 'blockly';
import customBlock from './customBlock';

Blockly.Blocks.import_control = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Import character module');
    this.setTooltip('Import the character controls before using movement commands');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.moveForward = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Move forward');
    this.setTooltip('Move the character forward');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.turnLeft = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Turn left');
    this.setTooltip('Turn the character left');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.turnRight = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Turn right');
    this.setTooltip('Turn the character right');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.collectCoin = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Collect coin');
    this.setTooltip('Jump and collect a coin');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.isCoin = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Coin here?');
    this.setTooltip('Check whether the character is standing beneath a coin');
    this.setColour('#f46767');
    this.setOutput(true, 'Boolean');
  },
};

Blockly.Blocks.isBlocked = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Blocked ahead?');
    this.setTooltip('Check whether terrain blocks the character');
    this.setColour('#f46767');
    this.setOutput(true, 'Boolean');
  },
};

Blockly.Blocks.isRightBlocked = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('Blocked on right?');
    this.setTooltip('Check whether terrain blocks the character on the right');
    this.setColour('#f46767');
    this.setOutput(true, 'Boolean');
  },
};

Blockly.Blocks.custom_if = <Blockly.Block>{
  init() {
    this.appendValueInput('if').setCheck('Boolean').appendField('If');
    this.appendStatementInput('then').setCheck(null).appendField('Do');
    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip('Run statements when the value is true');
  },
};

// 注册自定义的积木
customBlock.forEach(block => {
  Blockly.Blocks[block.type] = <Blockly.Block>{
    init() {
      this.jsonInit(block);
    },
  };
});
