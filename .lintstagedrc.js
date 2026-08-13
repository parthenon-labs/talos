module.exports = {
  '*.{tsx,ts,jsx,js}': ['eslint --fix'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
