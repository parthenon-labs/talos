import Blockly from 'blockly';

class ToolboxLabel extends Blockly.ToolboxItem {
  label: HTMLLabelElement;

  toolboxItemDef: Blockly.utils.toolbox.ToolboxItemInfo & {
    name?: string;
    colour?: string;
    cssconfig?: {
      label: string;
    };
  };

  constructor(
    toolboxItemDef: Blockly.utils.toolbox.ToolboxItemInfo,
    parentToolbox: Blockly.IToolbox,
  ) {
    super(toolboxItemDef, parentToolbox);
    this.label = null!;
    // eslint-disable-next-line no-underscore-dangle
    this.toolboxItemDef = this.toolboxItemDef_;
  }

  /**
   * 调整Toolbox样式
   *  1.配置显示名称
   *  2.配置文字颜色
   *  3.配置文字居中
   *  4.添加自定义css
   * @override
   */
  init() {
    this.label = document.createElement('label');
    this.label.textContent = this.toolboxItemDef.name!;
    this.label.style.color = this.toolboxItemDef.colour;
    this.label.style.textAlign = 'center';
    const cssConfig = this.toolboxItemDef.cssconfig;
    if (cssConfig) {
      this.label.classList.add(cssConfig.label);
    }
  }

  getDiv(): HTMLLabelElement {
    return this.label;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  'toolboxlabel',
  ToolboxLabel,
);
