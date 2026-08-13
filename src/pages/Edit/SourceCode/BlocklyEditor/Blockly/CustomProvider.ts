import Blockly from 'blockly';

const { svgPaths } = Blockly.utils;

/**
 * @fileoverview 在自定义渲染器期间构建的完整自定义渲染器
 * 常量参考地址：https://github.com/google/blockly/blob/master/core/renderers/common/constants.js
 */

class CustomConstantsProvider extends Blockly.zelos.ConstantProvider {
  // STATEMENT_BOTTOM_SPACER: number = 0;
  // public RECT_INPUT_OUTPUT = {
  //   width: 0,
  //   height: 0,
  //   pathDown: '',
  //   pathUp: '',
  // };

  GRID_UNIT_VALUE: number = 4;

  get GRID_UNIT() {
    return this.GRID_UNIT_VALUE;
  }

  set GRID_UNIT(value: number) {
    this.GRID_UNIT_VALUE = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    // 设置来自基本提供程序的所有常量。
    super();

    /**
     * 用于上一个和下一个连接的槽口宽度。
     * @type {number}
     * @override
     */
    // this.NOTCH_WIDTH = 0;

    /**
     * 用于上一个和下一个连接的槽口的高度。
     * @type {number}
     * @override
     */
    // this.NOTCH_HEIGHT = 0;

    // this.STATEMENT_BOTTOM_SPACER = 0;

    /**
     * 圆角半径。
     * @type {number}
     * @override
     */
    // this.CORNER_RADIUS = 4;
    /**
     * 用于输入和输出连接的拼图选项卡的高度。
     * @type {number}
     * @override
     */
    // this.TAB_HEIGHT = 0;
    /**
     * 左侧的插口
     * @type {number}
     * @override
     */
    // this.TAB_WIDTH = 0;
  }

  // /**
  //  * @override
  //  */
  // init() {
  //   super.init();
  //   // this.RECT_PREV_NEXT = this.makeRectangularPreviousConn();
  //   this.RECT_INPUT_OUTPUT = this.makeRectangularInputConn();
  // }

  // /**
  //  * @override
  //  */
  // shapeFor(connection: Blockly.RenderedConnection) {
  //   const checks = connection.getCheck();
  //   switch (connection.type) {
  //     case Blockly.INPUT_VALUE:
  //     case Blockly.OUTPUT_VALUE:
  //       if (checks && checks.indexOf('Number') !== -1) {
  //         return this.RECT_INPUT_OUTPUT;
  //       }
  //       if (checks && checks.indexOf('String') !== -1) {
  //         return this.RECT_INPUT_OUTPUT;
  //       }
  //       return this.PUZZLE_TAB;
  //     case Blockly.PREVIOUS_STATEMENT:
  //     case Blockly.NEXT_STATEMENT:
  //       return this.NOTCH;
  //     default:
  //       throw Error('Unknown type');
  //   }
  // }

  // /**
  //  * 返回一个矩形槽口以用于上一个和下一个连接。
  //  */
  // makeRectangularPreviousConn() {
  //   const width = this.NOTCH_WIDTH;
  //   const height = this.NOTCH_HEIGHT;

  //   /**
  //    * 由于上一个和下一个连接共享相同的形状
  //    * 您可以定义一个函数来为两者生成路径。
  //    */
  //   function makeMainPath(dir: number) {
  //     return Blockly.utils.svgPaths.line([
  //       Blockly.utils.svgPaths.point(0, height),
  //       Blockly.utils.svgPaths.point(dir * width, 0),
  //       Blockly.utils.svgPaths.point(0, -height),
  //     ]);
  //   }
  //   const pathLeft = makeMainPath(1);
  //   const pathRight = makeMainPath(-1);

  //   return {
  //     width,
  //     height,
  //     pathLeft,
  //     pathRight,
  //   };
  // }

  // /**
  //  * 返回一个矩形拼图选项卡，用于输入和输出连接。
  //  */
  // makeRectangularInputConn() {
  //   const width = this.TAB_WIDTH;
  //   const height = this.TAB_HEIGHT;

  //   /**
  //    * 由于上一个和下一个连接共享相同的形状
  //    * 您可以定义一个函数来为两者生成路径。
  //    */
  //   function makeMainPath(up: number) {
  //     return Blockly.utils.svgPaths.line([
  //       Blockly.utils.svgPaths.point(-width, 0),
  //       Blockly.utils.svgPaths.point(0, -1 * up * height),
  //       Blockly.utils.svgPaths.point(width, 0),
  //     ]);
  //   }

  //   const pathUp = makeMainPath(1);
  //   const pathDown = makeMainPath(-1);

  //   return {
  //     width,
  //     height,
  //     pathDown,
  //     pathUp,
  //   };
  // }

  /**
   * 我需要高度，帮助计算内部输入拼图的位置，以及撑高外部拼图的高度
   * 但我不需要生成上下拼图的锯齿接口
   * 所以我在生成锯齿时，将高度设为0，在返回时返回正常的高度8
   */
  makeNotch() {
    const width = 36;
    const height = 0;

    const innerWidth = width / 3;
    const curveWidth = innerWidth / 3;

    const halfHeight = height / 2;
    const quarterHeight = halfHeight / 2;

    /**
     * Make the main path for the notch.
     * @param {number} dir Direction multiplier to apply to horizontal offsets
     *     along the path. Either 1 or -1.
     * @return {string} A path fragment describing a notch.
     */
    function makeMainPath(dir: 1 | -1) {
      return (
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 2, 0),
          svgPaths.point((dir * curveWidth * 3) / 4, quarterHeight / 2),
          svgPaths.point(dir * curveWidth, quarterHeight),
        ]) +
        svgPaths.line([svgPaths.point(dir * curveWidth, halfHeight)]) +
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 4, quarterHeight / 2),
          svgPaths.point((dir * curveWidth) / 2, quarterHeight),
          svgPaths.point(dir * curveWidth, quarterHeight),
        ]) +
        svgPaths.lineOnAxis('h', dir * innerWidth) +
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 2, 0),
          svgPaths.point((dir * curveWidth * 3) / 4, -(quarterHeight / 2)),
          svgPaths.point(dir * curveWidth, -quarterHeight),
        ]) +
        svgPaths.line([svgPaths.point(dir * curveWidth, -halfHeight)]) +
        svgPaths.curve('c', [
          svgPaths.point((dir * curveWidth) / 4, -(quarterHeight / 2)),
          svgPaths.point((dir * curveWidth) / 2, -quarterHeight),
          svgPaths.point(dir * curveWidth, -quarterHeight),
        ])
      );
    }

    const pathLeft = makeMainPath(1);
    const pathRight = makeMainPath(-1);

    return {
      type: this.SHAPES.NOTCH,
      width: 36,
      height: 8,
      pathLeft,
      pathRight,
    };
  }
}
export default CustomConstantsProvider;
