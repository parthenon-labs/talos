export default {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      type: '',
      name: 'Character',
      icon: 'juese',
      bgColor: '#F06359',
      categorystyle: 'logic_category',
      blockxml: null,
      gap: null,
      disabled: false,
      contents: [
        {
          kind: 'block',
          type: 'import_control',
        },
        {
          kind: 'block',
          type: 'moveForward',
        },
        {
          kind: 'block',
          type: 'turnLeft',
        },
        {
          kind: 'block',
          type: 'turnRight',
        },
        {
          kind: 'block',
          type: 'collectCoin',
        },
        {
          kind: 'block',
          type: 'isCoin',
        },
        {
          kind: 'block',
          type: 'isBlocked',
        },
        {
          kind: 'block',
          type: 'isRightBlocked',
        },
      ],
    },
    {
      kind: 'category',
      type: '',
      name: 'Logic',
      icon: 'kongzhi',
      bgColor: '#01ADFF',
      categorystyle: 'logic_category',
      blockxml: null,
      gap: null,
      disabled: false,
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
        {
          kind: 'block',
          type: 'logic_boolean',
        },
      ],
    },
    {
      kind: 'category',
      type: '',
      name: 'Loops',
      icon: 'zence',
      bgColor: '#5AB45B',
      categorystyle: 'loop_category',
      blockxml: null,
      gap: null,
      disabled: false,
      contents: [
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
        {
          kind: 'block',
          type: 'controls_repeat_ext',
        },
        {
          kind: 'block',
          type: 'controls_for',
          inputs: {
            FROM: {
              block: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              block: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
            BY: {
              block: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_forEach',
        },
        {
          kind: 'block',
          type: 'controls_flow_statements',
        },
      ],
    },
    {
      kind: 'category',
      type: '',
      name: 'Variables',
      icon: 'bianliang',
      bgColor: '#FFBB55',
      categorystyle: 'variable_category',
      blockxml: null,
      gap: null,
      disabled: false,
      contents: [
        {
          kind: 'block',
          type: 'variables_get',
        },
        {
          kind: 'block',
          type: 'variables_set',
        },
      ],
    },
    {
      kind: 'category',
      type: '',
      name: 'Math',
      icon: 'yunsuan',
      bgColor: '#F0AA8B',
      categorystyle: 'math_category',
      blockxml: null,
      gap: null,
      disabled: false,
      contents: [
        {
          kind: 'block',
          type: 'math_number',
          gap: '32',
          fields: {
            NUM: 123,
          },
        },
        {
          kind: 'block',
          type: 'math_single',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 9,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_trig',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 45,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_constant',
        },
        {
          kind: 'block',
          type: 'math_number_property',
          inputs: {
            NUMBER_TO_CHECK: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_round',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 3.1,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_on_list',
        },
        {
          kind: 'block',
          type: 'math_modulo',
          inputs: {
            DIVIDEND: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 64,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          fields: {
            OP: 'ADD',
          },
          inputs: {
            A: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            B: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'category',
      type: '',
      name: 'Lists',
      icon: 'liebiao',
      bgColor: '#F9CC37',
      categorystyle: 'list_category',
      blockxml: null,
      gap: null,
      disabled: false,
      contents: [
        {
          kind: 'block',
          type: 'lists_create_with',
          mutation: {
            items: '0',
          },
        },
        {
          kind: 'block',
          type: 'lists_create_with',
        },
        {
          kind: 'block',
          type: 'lists_length',
        },
        {
          kind: 'block',
          type: 'lists_isEmpty',
        },
        {
          kind: 'block',
          type: 'lists_sort',
        },
        {
          kind: 'block',
          type: 'lists_reverse',
        },
      ],
    },
    {
      kind: 'category',
      type: '',
      name: 'Functions',
      categorystyle: 'procedure_category',
      custom: 'PROCEDURE',
      blockxml: null,
      gap: null,
      disabled: false,
    },
  ],
};
