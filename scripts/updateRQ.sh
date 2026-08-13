npx jscodeshift ./src/
  --extensions=ts,tsx
  --parser=tsx
  --transform=./node_modules/@tanstack/react-query/codemods/v4/replace-import-specifier.js

  