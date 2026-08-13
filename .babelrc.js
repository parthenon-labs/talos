module.exports = api => {
  const inDevelopment = api.cache(() => process.env.NODE_ENV === 'development');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: {
            version: '3.20.2',
            proposals: true,
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-typescript',
        {
          allowDeclareFields: true,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
      inDevelopment && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
