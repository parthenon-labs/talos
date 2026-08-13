/* eslint-disable no-underscore-dangle */
import Blockly from 'blockly';

const { dom, Svg } = Blockly.utils;

class CustomFlyout extends Blockly.VerticalFlyout {
  containerVisible_: boolean = true;

  svgGroup_!: SVGElement;

  svgBackground_!: SVGElement;

  createDom(tagName: string) {
    this.svgGroup_ = dom.createSvgElement(tagName, {
      class: 'blocklyFlyout',
      style: 'display: none',
    });
    this.svgBackground_ = dom.createSvgElement(
      Svg.PATH,
      { class: 'blocklyFlyoutBackground' },
      this.svgGroup_,
    );
    // this.svgGroup_.appendChild(this.workspace_.createDom());
    const gDom = this.workspace_.createDom();
    const defs = gDom.querySelector('defs');
    if (defs) {
      defs.innerHTML = `<filter id="blocklyBlockSelected" height="180%" width="160%" y="-40%" x="-30%">
      <feGaussianBlur stdDeviation="1"></feGaussianBlur>
      <feComponentTransfer result="outBlur">
        <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"></feFuncA>
      </feComponentTransfer>
      <feFlood flood-color="#FFFFFF" flood-opacity="1" result="outColor"></feFlood>
      <feComposite in="outColor" in2="outBlur" operator="in" result="outGlow"></feComposite>
      <feGaussianBlur in="SourceAlpha" stdDeviation="6"></feGaussianBlur>
      <feOffset dx="0" dy="2"></feOffset>
      <feComponentTransfer result="outShadow">
        <feFuncA type="linear" slope="0.4"></feFuncA>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="outShadow"></feMergeNode>
        <feMergeNode in="outGlow"></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
    </filter>${defs.innerHTML}`;
    }
    this.svgGroup_.appendChild(gDom);
    this.workspace_
      .getThemeManager()
      .subscribe(this.svgBackground_, 'flyoutBackgroundColour', 'fill');
    this.workspace_
      .getThemeManager()
      .subscribe(this.svgBackground_, 'flyoutOpacity', 'fill-opacity');
    this.svgGroup_.style.display = 'block';
    this.svgGroup_.style.transform = 'translate(-100%, 0px) scale(1)';
    this.svgGroup_.style.boxShadow = 'rgb(191 173 163 / 30%) 2px 0px 4px 0px';
    return this.svgGroup_;
  }

  updateDisplay_() {
    let show = true;
    if (!this.containerVisible_) {
      show = false;
    } else {
      show = this.isVisible();
    }
    this.svgGroup_.style.transform = show
      ? 'translate(65px, 0px) scale(1)'
      : 'translate(-100%, 0px) scale(1)';

    this.workspace_.scrollbar.setContainerVisible(show);
  }
}

Blockly.registry.register(
  Blockly.registry.Type.FLYOUTS_VERTICAL_TOOLBOX,
  Blockly.registry.DEFAULT,
  CustomFlyout,
  true,
);
