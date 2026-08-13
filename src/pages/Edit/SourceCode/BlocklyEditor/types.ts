/* eslint-disable max-classes-per-file */
import BaseBlockly from 'blockly';

declare module 'blockly' {
  export namespace zelos {
    class Renderer extends BaseBlockly.blockRendering.Renderer {}
    class PathObject extends BaseBlockly.blockRendering.PathObject {}
    class MarkerSvg extends BaseBlockly.blockRendering.MarkerSvg {}
    class Drawer extends BaseBlockly.blockRendering.Drawer {}
    class ConstantProvider extends BaseBlockly.blockRendering
      .ConstantProvider {}
  }
  export namespace Msg {
    let ACTION_HUE: string;
  }
}

// declare module Blockly.Msg{
//   var ACTION_HUE: string;
// }

export type TBlocklyComponent = {
  toolbox: {
    kind: string;
    contents: BaseBlockly.utils.toolbox.BlockInfo[];
  };
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      xml: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        xmlns: string;
      };
    }
  }
}

export interface IPython extends BaseBlockly.Generator {
  import_control: () => string;
  moveForward: () => string;
  turnLeft: () => string;
  turnRight: () => string;
  collectCoin: () => string;
  isCoin: () => [string, number];
  isBlocked: () => [string, number];
  isRightBlocked: () => [string, number];
  custom_if: (block: BaseBlockly.Block) => string;
  ORDER_NONE: 99;
  ORDER_ATOMIC: 0;
}

/**
 * https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence?hl=en#good_parentheses
 *
 * ORDER_ATOMIC = 0;           // 0 "" ...
 * ORDER_NEW = 1.1;            // new
 * ORDER_MEMBER = 1.2;         // . []
 * ORDER_FUNCTION_CALL = 2;    // ()
 * ORDER_INCREMENT = 3;        // ++
 * ORDER_DECREMENT = 3;        // --
 * ORDER_BITWISE_NOT = 4.1;    // ~
 * ORDER_UNARY_PLUS = 4.2;     // +
 * ORDER_UNARY_NEGATION = 4.3; // -
 * ORDER_LOGICAL_NOT = 4.4;    // !
 * ORDER_TYPEOF = 4.5;         // typeof
 * ORDER_VOID = 4.6;           // void
 * ORDER_DELETE = 4.7;         // delete
 * ORDER_AWAIT = 4.8;          // await
 * ORDER_EXPONENTIATION = 5.0; // **
 * ORDER_MULTIPLICATION = 5.1; // *
 * ORDER_DIVISION = 5.2;       // /
 * ORDER_MODULUS = 5.3;        // %
 * ORDER_SUBTRACTION = 6.1;    // -
 * ORDER_ADDITION = 6.2;       // +
 * ORDER_BITWISE_SHIFT = 7;    // << >> >>>
 * ORDER_RELATIONAL = 8;       // < <= > >=
 * ORDER_IN = 8;               // in
 * ORDER_INSTANCEOF = 8;       // instanceof
 * ORDER_EQUALITY = 9;         // == != === !==
 * ORDER_BITWISE_AND = 10;     // &
 * ORDER_BITWISE_XOR = 11;     // ^
 * ORDER_BITWISE_OR = 12;      // |
 * ORDER_LOGICAL_AND = 13;     // &&
 * ORDER_LOGICAL_OR = 14;      // ||
 * ORDER_CONDITIONAL = 15;     // ?:
 * ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
 * ORDER_YIELD = 16.5;         // yield
 * ORDER_COMMA = 17;           // ,
 * ORDER_NONE = 99;            // (...)
 */
