/* eslint-disable no-underscore-dangle */
import Blockly from 'blockly';

export default class CustomBlockly extends Blockly.BlockSvg {
  addSelect() {
    // eslint-disable-next-line no-underscore-dangle
    // const svgGroup = (this as Blockly.BlockSvg & { svgGroup_?: SVGElement })
    //   .svgGroup_;
    // if (this.workspace.isFlyout) {
    //   svgGroup
    //     ?.querySelector('.blocklyPath')
    //     ?.setAttribute('filter', 'url(#blocklyFlyoutSelected)');
    // } else {
    //   svgGroup
    //     ?.querySelector('.blocklyPath')
    //     ?.setAttribute('filter', 'url(#blocklyBackgroundSelected)');
    // }
    this.pathObject.updateSelected(true);
  }

  removeSelect() {
    // eslint-disable-next-line no-underscore-dangle
    // const svgGroup = (this as Blockly.BlockSvg & { svgGroup_?: SVGElement })
    //   .svgGroup_;
    // svgGroup?.querySelector('.blocklyPath')?.removeAttribute('filter');
    this.pathObject.updateSelected(false);
  }
}
