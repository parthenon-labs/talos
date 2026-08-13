/**
 * @fileoverview custom theme.
 */

import Blockly from 'blockly';

const blockStyles = {
  colour_blocks: {
    colourPrimary: '#CF63CF',
    colourSecondary: '#C94FC9',
    colourTertiary: '#BD42BD',
  },
  list_blocks: {
    colourPrimary: '#F9CC37',
    colourSecondary: '#855CD6',
    colourTertiary: '#C4A12B',
  },
  logic_blocks: {
    colourPrimary: '#68CDFF',
    colourSecondary: '#5eb8e4',
    colourTertiary: '#53A2C9',
  },
  loop_blocks: {
    colourPrimary: '#77D657',
    colourSecondary: '#0DA57A',
    colourTertiary: '#5AA142',
  },
  math_blocks: {
    colourPrimary: '#FEAE8A',
    colourSecondary: '#46B946',
    colourTertiary: '#C98A6D',
  },
  procedure_blocks: {
    colourPrimary: '#F88767',
    colourSecondary: '#de7a5c',
    colourTertiary: '#C26A51',
  },
  text_blocks: {
    colourPrimary: '#FFBF00',
    colourSecondary: '#E6AC00',
    colourTertiary: '#CC9900',
  },
  variable_blocks: {
    colourPrimary: '#FFBB55',
    colourSecondary: '#FF8000',
    colourTertiary: '#C99342',
  },
  variable_dynamic_blocks: {
    colourPrimary: '#FF8C1A',
    colourSecondary: '#FF8000',
    colourTertiary: '#DB6E00',
  },
  hat_blocks: {
    colourPrimary: '#4C97FF',
    colourSecondary: '#4280D7',
    colourTertiary: '#3373CC',
    hat: 'cap',
  },
};

const categoryStyles = {
  colour_category: { colour: '#CF63CF' },
  list_category: { colour: '#9966FF' },
  logic_category: { colour: '#4C97FF' },
  loop_category: { colour: '#0fBD8C' },
  math_category: { colour: '#59C059' },
  procedure_category: { colour: '#FF6680' },
  text_category: { colour: '#FFBF00' },
  variable_category: { colour: '#FF8C1A' },
  variable_dynamic_category: { colour: '#FF8C1A' },
};

Blockly.registry.unregister('theme', 'customTheme');

/**
 * custom theme.
 */
export default Blockly.Theme.defineTheme('customTheme', {
  blockStyles,
  categoryStyles,
});
