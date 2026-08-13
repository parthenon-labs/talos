module.exports = {
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: ['airbnb', 'airbnb-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 2,
    'prettier/prettier': 'warn',
    'react/require-default-props': 'off',
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'consistent-return': 0,
    'no-console': 'error',
    'no-bitwise': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'max-lines': [
      'error',
      {
        max: 400,
      },
    ],
    'max-lines-per-function': [
      'error',
      {
        max: 80,
      },
    ],
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        json: 'always',
        css: 'always',
        jpg: 'always',
        webp: 'always',
        png: 'always',
        svg: 'always',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
      },
    ],
    // 'import/no-cycle': 'off',
  },
  overrides: [
    {
      files: ['src/**/**.tsx', 'src/**/**.ts'],
      rules: {
        'import/no-commonjs': 'error',
        'max-lines-per-function': [
          'error',
          {
            max: 300,
          },
        ],
      },
    },
  ],
};
