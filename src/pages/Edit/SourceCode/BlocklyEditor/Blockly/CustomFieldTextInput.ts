/* eslint-disable no-underscore-dangle */
import YDBlockly from 'blockly';

const { dom, Svg } = YDBlockly.utils;

export default class CustomFieldTextInput extends YDBlockly.FieldTextInput {
  /**
   * 样式调整：将原先四方形的输入框改为椭圆形
   */
  createBorderRect_() {
    let width = this.size_.width - 15;
    if (width < 30) width = 30;
    // 这个原本是rect，但我这里需要画椭圆，所以强行改了type
    (this.borderRect_ as SVGPathElement) = dom.createSvgElement(
      Svg.PATH,
      {
        fill: '#fff',
        stroke: '#C99342',
        'stroke-width': '1px',
        d: `m 15,0 H ${width} a 15 15 0 0 1 15 15 a 15 15 0 0 1 -15 15 H 15 a 15 15 0 0 1 -15 -15 a 15 15 0 0 1 15 -15 z`,
        class: 'blocklyPath',
      },
      this.fieldGroup_,
    );
  }

  /**
   * 这里是有修改时（例如：拖拽）也要调整为椭圆形
   * @returns void
   */
  positionBorderRect_() {
    if (!this.borderRect_) {
      return;
    }
    this.borderRect_.setAttribute('width', `${this.size_.width}`);
    this.borderRect_.setAttribute('height', `${this.size_.height}`);
    let width = this.size_.width - 15;
    if (width < 30) width = 30;
    this.borderRect_.setAttribute(
      'd',
      `m 15,0 H ${width} a 15 15 0 0 1 15 15 a 15 15 0 0 1 -15 15 H 15 a 15 15 0 0 1 -15 -15 a 15 15 0 0 1 15 -15 z`,
    );
  }

  /**
   * 这里是在触发cursor时，他会生成一个input，这里将input的两边改为椭圆形f
   * @returns HTMLElement
   */
  widgetCreate_() {
    const htmlInput = super.widgetCreate_();
    htmlInput.style.borderRadius = '10.8pt';
    return htmlInput;
  }
}

// export default (Blockly: typeof YDBlockly) => {
//   const { dom, Svg } = Blockly.utils;
//   const { Field, FieldTextInput } = Blockly;

//   Field.prototype.createBorderRect_ = function createBorderRect() {
//     let width = this.size_.width - 15;
//     if (width < 30) width = 30;
//     (this.borderRect_ as SVGPathElement) = dom.createSvgElement(
//       Svg.PATH,
//       {
//         fill: '#fff',
//         stroke: '#C99342',
//         'stroke-width': '1px',
//         d: `m 15,0 H ${width} a 15 15 0 0 1 15 15 a 15 15 0 0 1 -15 15 H 15 a 15 15 0 0 1 -15 -15 a 15 15 0 0 1 15 -15 z`,
//         class: 'blocklyPath',
//       },
//       this.fieldGroup_,
//     );
//   };

//   Field.prototype.positionBorderRect_ = function positionBorderRect() {
//     if (!this.borderRect_) {
//       return;
//     }
//     this.borderRect_.setAttribute('width', `${this.size_.width}`);
//     this.borderRect_.setAttribute('height', `${this.size_.height}`);
//     let width = this.size_.width - 15;
//     if (width < 30) width = 30;
//     this.borderRect_.setAttribute(
//       'd',
//       `m 15,0 H ${width} a 15 15 0 0 1 15 15 a 15 15 0 0 1 -15 15 H 15 a 15 15 0 0 1 -15 -15 a 15 15 0 0 1 15 -15 z`,
//     );
//   };
//   const superWidgetCreate = FieldTextInput.prototype.widgetCreate_;
//   FieldTextInput.prototype.widgetCreate_ = function widgetCreate() {
//     const htmlInput = superWidgetCreate.call(this);
//     htmlInput.style.borderRadius = '10.8pt';
//     return htmlInput;
//   };
// };
