/**
 * 配置积木
 */

import Blockly from 'blockly';
import customBlock from './customBlock';

Blockly.Blocks.import_control = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('导入角色模块');
    this.setTooltip('导入角色控制模块，只有导入了控制模块才可以使用控制指令');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.moveForward = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('前进      ');
    this.setTooltip('控制角色前进');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.turnLeft = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('左转      ');
    this.setTooltip('控制角色左转');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.turnRight = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('右转      ');
    this.setTooltip('控制角色右转');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.collectCoin = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('收集金币');
    this.setTooltip('控制角色跳跃收集金币');
    this.setColour('#f46767');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
};

Blockly.Blocks.isCoin = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('是否有金币');
    this.setTooltip('判断角色是否已经到达金币下方');
    this.setColour('#f46767');
    this.setOutput(true, 'Boolean');
  },
};

Blockly.Blocks.isBlocked = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('是否被阻挡');
    this.setTooltip('判断角色是否被地形所阻挡');
    this.setColour('#f46767');
    this.setOutput(true, 'Boolean');
  },
};

Blockly.Blocks.isRightBlocked = <Blockly.Block>{
  init() {
    this.appendDummyInput().appendField('右侧是否被阻挡');
    this.setTooltip('判断角色右侧是否被地形所阻挡');
    this.setColour('#f46767');
    this.setOutput(true, 'Boolean');
  },
};

Blockly.Blocks.custom_if = <Blockly.Block>{
  init() {
    this.appendValueInput('if').setCheck('Boolean').appendField('如果');
    this.appendStatementInput('then').setCheck(null).appendField('执行');
    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip('如果值为真，执行一些语句');
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
