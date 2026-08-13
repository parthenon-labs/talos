/**
 * @fileoverview 自定义渲染拼图，右边改为圆角
 */

/* eslint-disable no-underscore-dangle */
import Blockly from 'blockly';

const { svgPaths } = Blockly.utils;
const { Types } = Blockly.blockRendering;

type Tconstants = Blockly.blockRendering.ConstantProvider & {
  OUTSIDE_CORNERS: {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
    rightHeight: number;
  };
  INSIDE_CORNERS: {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
    rightHeight: number;
    pathBottomRight: number;
    pathTopRight: number;
    width: number;
    pathTop: number;
    height: number;
    pathBottom: number;
  };
  START_HAT: {
    path: string;
  };
};

type TTopRow = Blockly.blockRendering.TopRow & {
  elements: Array<
    Blockly.blockRendering.Measurable & {
      shape: {
        pathLeft: string;
      };
      width: number;
    }
  >;
};

interface IInlineInput extends Blockly.blockRendering.InlineInput {
  height: number;
  width: number;
  connectionHeight: number;
  connectionWidth: number;
  connectionOffsetY: number;
  connectionOffsetX: number;
  centerline: number;
  xPos: number;
  connectedBlock: boolean;
  shape: {
    pathDown: number;
    pathRightDown: (height: number) => string;
    pathUp: (height: number) => string;
  };
  input: {
    name: string;
  };
}

type TBottomRow = Blockly.blockRendering.BottomRow & {
  elements: Array<
    Blockly.blockRendering.Measurable & {
      shape: {
        pathRight: string;
      };
      width: number;
    }
  >;
  statementEdge?: number;
};

type TInputConnection = Blockly.blockRendering.InputConnection & {
  xPos: number;
  notchOffset: number;
  shape: {
    width: number;
    pathRight: number;
    pathLeft: number;
  };
  connectedBottomNextConnection: boolean;
};

class CustomDrawer extends Blockly.zelos.Drawer {
  outlinePath_: string = '';

  block_: Blockly.BlockSvg & {
    pathObject: Blockly.blockRendering.IPathObject & {
      setOutlinePath?: (inputName: string, outlinePath: string) => void;
    };
  };

  info_: Blockly.blockRendering.RenderInfo & {
    startY?: number;
    startX?: number;
    hasStatementInput?: boolean;
    outputConnection?: Blockly.blockRendering.OutputConnection & {
      isDynamicShape?: boolean;
      height?: number;
      connectionOffsetX?: number;
      connectionOffsetY?: number;
      shape?: {
        pathRightDown: (height: number) => string;
        pathUp: (height: number) => string;
      };
    };
  };

  inlinePath_: string = '';

  constructor(
    block: Blockly.BlockSvg,
    info: Blockly.blockRendering.RenderInfo,
  ) {
    super(block, info);
    this.info_ = info;
    this.block_ = block;
  }

  superDrawTop_() {
    const { topRow } = this.info_;
    const { elements } = topRow as TTopRow;
    const { OUTSIDE_CORNERS, START_HAT } = this.constants_ as Tconstants;

    this.positionPreviousConnection_();
    this.outlinePath_ += svgPaths.moveBy(topRow.xPos, this.info_.startY!);
    for (let i = 0; i < elements.length; i += 1) {
      const elem = elements[i];
      // 65536
      if (Types.isLeftRoundedCorner(elem)) {
        this.outlinePath_ += OUTSIDE_CORNERS.topLeft;
        // 262144
      } else if (Types.isRightRoundedCorner(elem)) {
        // this.outlinePath_ += OUTSIDE_CORNERS.topRight;
        // 2048
      } else if (Types.isPreviousConnection(elem)) {
        this.outlinePath_ += elem.shape.pathLeft;
        // 2
      } else if (Types.isHat(elem)) {
        this.outlinePath_ += START_HAT.path;
        // 8
      } else if (Types.isSpacer(elem)) {
        this.outlinePath_ += svgPaths.lineOnAxis('h', elem.width);
      }
      // No branch for a square corner, because it's a no-op.
    }
    /**
     * 如果我们设置了CORNER_RADIUS，blockly会空出一些高度，
     * 因为我们右边要画圆角，所以右边不需要额外的高度，
     * 这里把他注释掉
     */
    // this.outlinePath_ += svgPaths.lineOnAxis('v', topRow.height);
  }

  drawFlatTop_() {
    const { topRow } = this.info_;
    this.positionPreviousConnection_();

    this.outlinePath_ += svgPaths.moveBy(topRow.xPos, this.info_.startY!);

    this.outlinePath_ += svgPaths.lineOnAxis('h', topRow.width);
  }

  drawRightDynamicConnection_() {
    this.outlinePath_ += this.info_.outputConnection.shape!.pathRightDown(
      this.info_.outputConnection.height!,
    );
  }

  drawFlatBottom_() {
    const { bottomRow } = this.info_;
    this.positionNextConnection_();

    this.outlinePath_ += svgPaths.lineOnAxis('V', bottomRow.baseline);

    this.outlinePath_ += svgPaths.lineOnAxis('h', -bottomRow.width);
  }

  drawLeftDynamicConnection_() {
    this.positionOutputConnection_();

    this.outlinePath_ += this.info_.outputConnection.shape!.pathUp(
      this.info_.outputConnection.height!,
    );
    this.outlinePath_ += 'z';
  }

  drawOutline_() {
    if (
      this.info_.outputConnection &&
      this.info_.outputConnection.isDynamicShape &&
      !this.info_.hasStatementInput &&
      !this.info_.bottomRow.hasNextConnection
    ) {
      this.drawFlatTop_();
      this.drawRightDynamicConnection_();
      this.drawFlatBottom_();
      this.drawLeftDynamicConnection_();
    } else {
      this.superDrawOutline_();
      // super.drawOutline_();
    }
  }

  /**
   * 将右边改为圆角，
   * 总体思路就是拿到右边的初始绘画y坐标，
   * 然后通过获取结束点y坐标进行相减算出高度，从而得到圆的半径
   * 如果是最下方的边，则通过拼图的总高度减去该边起始点y坐标
   * 不确定是否是最好的办法，需要更多的例子进行测试。。。
   *
   */
  superDrawOutline_() {
    this.superDrawTop_();
    // 圆角的起始点y坐标
    let firstPoint = this.info_.topRow.yPos;
    // let bottomOffset = 0;
    for (let r = 1; r < this.info_.rows.length - 1; r += 1) {
      const row = this.info_.rows[r];
      // 转折点，这里是圆角的终点
      if (row.hasStatement) {
        if (firstPoint !== null) {
          const rightHeight = (row.yPos - firstPoint) / 2;
          this.outlinePath_ += `a ${rightHeight} ${rightHeight} 0 0 1 0 ${
            rightHeight * 2
          }`;
          firstPoint = null!;
        }
      }
      if (row.hasJaggedEdge) {
        // 锯齿，右边是圆角，没有锯齿
        // this.drawJaggedEdge_(row);
      } else if (row.hasStatement) {
        /**
         * 转折点，当有缺口需要塞入拼图的地方时，说明有一块边已经到头了
         * 这里渲染缺口
         */
        this.drawStatementInput_(row);
        // bottomOffset += this.info_.topRow.height * 2;
        // bottomOffset += 6;
      } else if (row.hasExternalInput) {
        /**
         * 如果右边可以拼接拼图的话需要这个渲染，但我们要画圆角，
         * 所以按理来说，不该有右侧需要插入拼图的情况
         */
        // this.drawValueInput_(row);
      } else {
        // 记录圆角起始点
        // eslint-disable-next-line no-lonely-if
        if (firstPoint === null) firstPoint = row.yPos;
        // this.drawRightSideRow_(row);
      }
    }
    /**
     * 这是最下方的边，我们拿拼图的整体高度减去底部的y坐标，算出这最下方边的高度，
     * 用于画出圆角
     */
    if (firstPoint !== null) {
      // 减少最后一列高度，抵冲被我去掉的最后一列的锯齿插口
      const bottomHeight = this.info_.bottomRow.hasNextConnection ? 8 : 0;
      const rightHeight = (this.info_.height - firstPoint - bottomHeight) / 2;
      this.outlinePath_ += `a ${rightHeight} ${rightHeight} 0 0 1 0 ${
        rightHeight * 2
      }`;
    }
    // bottomOffset
    this.drawBottom_();
    this.drawLeft_();
  }

  drawBottom_(bottomOffset = 0) {
    const { bottomRow } = this.info_;
    // bottomOffset += bottomRow.hasNextConnection ? 8 : 0;
    const { elements } = bottomRow as TBottomRow;
    const { OUTSIDE_CORNERS } = this.constants_ as Tconstants;

    this.positionNextConnection_();

    const rightCornerYOffset = 0;
    let outlinePath = '';
    for (let i = elements.length - 1; i >= 0; i -= 1) {
      const elem = elements[i];
      if (Types.isNextConnection(elem)) {
        outlinePath += elem.shape.pathRight;
      } else if (Types.isLeftSquareCorner(elem)) {
        outlinePath += svgPaths.lineOnAxis('H', bottomRow.xPos);
      } else if (Types.isLeftRoundedCorner(elem)) {
        outlinePath += OUTSIDE_CORNERS.bottomLeft;
      } else if (Types.isRightRoundedCorner(elem)) {
        // outlinePath += OUTSIDE_CORNERS.bottomRight;
        // rightCornerYOffset = OUTSIDE_CORNERS.rightHeight;
      } else if (Types.isSpacer(elem)) {
        outlinePath += svgPaths.lineOnAxis('h', elem.width * -1);
      }
    }

    this.outlinePath_ += svgPaths.lineOnAxis(
      'V',
      bottomRow.baseline + bottomOffset - rightCornerYOffset,
    );
    this.outlinePath_ += outlinePath;
  }

  drawInternals_() {
    const len = this.info_.rows.length;
    for (let i = 0; i < len; i += 1) {
      const row = this.info_.rows[i];
      const len2 = row.elements.length;
      for (let j = 0; j < len2; j += 1) {
        const elem = row.elements[j];
        if (Types.isInlineInput(elem)) {
          this.drawInlineInput_(elem as IInlineInput);
        } else if (Types.isIcon(elem) || Types.isField(elem)) {
          this.layoutField_(
            /** @type {!Field|!Icon} */
            elem,
          );
        }
      }
    }
  }

  drawInlineInput_(input: IInlineInput) {
    this.positionInlineInputConnection_(input);

    const inputName = input.input.name;
    if (input.connectedBlock || this.info_.isInsertionMarker) {
      return;
    }
    const {
      height: inputHeight,
      width: inputWidth,
      connectionWidth,
      xPos,
    } = input;
    const width = inputWidth - connectionWidth * 2;
    const height = inputHeight;

    const yPos = input.centerline - height / 2;

    const connectionRight = xPos + connectionWidth;

    const outlinePath = `${
      svgPaths.moveTo(connectionRight, yPos) +
      svgPaths.lineOnAxis('h', width) +
      input.shape.pathRightDown(height) +
      svgPaths.lineOnAxis('h', -width) +
      input.shape.pathUp(height)
    }z`;
    this.block_.pathObject.setOutlinePath!(inputName, outlinePath);
  }

  drawStatementInput_(row: Blockly.blockRendering.Row) {
    const input = row.getLastInput() as TInputConnection;
    // Where to start drawing the notch, which is on the right side in LTR.
    const x = input.xPos + input.notchOffset + input.shape.width;

    const { INSIDE_CORNERS } = this.constants_ as Tconstants;

    const innerTopLeftCorner =
      input.shape.pathRight +
      svgPaths.lineOnAxis('h', -(input.notchOffset - INSIDE_CORNERS.width)) +
      INSIDE_CORNERS.pathTop;

    // + this.info_.topRow.height * 2
    const innerHeight = row.height - 2 * INSIDE_CORNERS.height;

    const innerBottomLeftCorner =
      INSIDE_CORNERS.pathBottom +
      svgPaths.lineOnAxis('h', input.notchOffset - INSIDE_CORNERS.width) +
      (input.connectedBottomNextConnection ? '' : input.shape.pathLeft);

    this.outlinePath_ +=
      svgPaths.lineOnAxis('H', x) +
      innerTopLeftCorner +
      svgPaths.lineOnAxis('v', innerHeight) +
      innerBottomLeftCorner +
      svgPaths.lineOnAxis('H', row.xPos + row.width);

    this.positionStatementInputConnection_(row);
  }
}
export default CustomDrawer;
