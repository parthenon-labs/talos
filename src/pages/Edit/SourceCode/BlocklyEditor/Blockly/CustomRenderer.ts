/* eslint-disable class-methods-use-this */
import Blockly from 'blockly';
import CustomDrawer from './CustomDrawer';
import CustomConstantsProvider from './CustomProvider';

class CustomRenderer extends Blockly.zelos.Renderer {
  /**
   * @override
   */
  makeConstants_() {
    return new CustomConstantsProvider();
  }

  makeDrawer_(
    block: Blockly.BlockSvg,
    info: Blockly.blockRendering.RenderInfo,
  ): Blockly.blockRendering.Drawer {
    return new CustomDrawer(block, info);
  }
}

Blockly.blockRendering.unregister('custom_renderer');
Blockly.blockRendering.register('custom_renderer', CustomRenderer);
