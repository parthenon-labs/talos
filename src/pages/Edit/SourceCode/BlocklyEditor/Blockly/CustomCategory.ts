/* eslint-disable no-underscore-dangle */
import Blockly from 'blockly';
import { CSSProperties } from 'react';
import { localStaticBaseUrl } from '@/utils/constant';

const iconMap = new Map([
  ['Character', 'juese'],
  ['Logic', 'kongzhi'],
  ['Loops', 'zhence'],
  ['Variables', 'bianliang'],
  ['Math', 'yunsuan'],
  ['Lists', 'liebiao'],
  ['Functions', 'hanshu'],
]);

class CustomCategory extends Blockly.ToolboxCategory {
  rowDiv: Element & {
    style?: CSSProperties;
  };

  iconDom: Element & {
    style?: CSSProperties;
  };

  constructor(
    categoryDef: Blockly.utils.toolbox.CategoryInfo,
    toolbox: Blockly.IToolbox,
    opt_parent: Blockly.ICollapsibleToolboxItem,
  ) {
    super(categoryDef, toolbox, opt_parent);
    this.rowDiv = null!;
    this.iconDom = null!;
  }

  /**
   * 初始化背景色和文字颜色
   * @override
   */
  addColourBorder_() {
    this.rowDiv = this.rowDiv_;
    // this.rowDiv.style!.backgroundColor = 'rgb(221, 221, 221)';
    // this.rowDiv.style!.color = 'rgb(41, 126, 255)';
  }

  /**
   * 选中后调整样式
   * @param {boolean} isSelected 是否选中
   * @override
   */
  setSelected(isSelected: boolean) {
    this.iconDom = this.iconDom_;
    const labelDom = this.rowDiv.getElementsByClassName(
      'blocklyTreeLabel',
    )[0] as HTMLElement;
    if (isSelected) {
      // 对调背景色和文字颜色
      this.rowDiv.style!.backgroundColor = 'rgb(41, 126, 255)';
      labelDom.style.color = 'white';
      // this.iconDom.style!.color = this.colour_;
    } else {
      // 改回原先样式
      this.rowDiv.style!.backgroundColor = 'rgba(41, 126, 255, 0)';
      labelDom.style!.color = 'rgb(41, 126, 255)';
      // this.iconDom.style!.color = 'white';
    }
    Blockly.utils.aria.setState(
      this.htmlDiv_,
      Blockly.utils.aria.State.SELECTED,
      isSelected,
    );
  }

  /**
   * Creates the dom used for the icon.
   * @return {HTMLElement} The element for the icon.
   * @override
   */
  // eslint-disable-next-line class-methods-use-this
  createIconDom_(): HTMLElement {
    const iconImg = document.createElement('img');
    const name: string = this.name_;
    const iconName = iconMap.get(name);
    iconImg.src = `${localStaticBaseUrl}static/images/icon/${iconName}.svg`;
    iconImg.alt = 'Blockly Logo';
    iconImg.width = 50;
    iconImg.height = 50;
    return iconImg;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory,
  true,
);
