# bye-esm-ext
[![bye-esm-ext npm version](https://img.shields.io/npm/v/bye-esm-ext.svg?style=popout&color=blue&label=bye-esm-ext)](https://www.npmjs.com/package/bye-esm-ext)

Help you run esm modules with commonjs style import.

## Install
install as a dev dependency
```sh
npm install --save-dev bye-esm-ext
```

# Usage
```ts
// If you prefer not only esm module instead of commonjs, but also:

import { foo, bar } from './my-module'

// instead of
// import { foo, bar } from './my-module.js'
// import { foo, bar } from './my-module.ts'
```

Use this as a node.js loader parameter:
```sh
node --import bye-esm-ext your-app.js
```

## Special case
In certain special cases, the imports in your .js files within the output directory may resolve filenames back to the source directory.

For example, when debugging a module, you might use a file: link in your dependencies to point a package to a .ts file in your source directory. bye-esm-ext can help you resolve it to the corresponding compiled .js file in the output directory.

To do this, you need to provide two parameters from your tsconfig.json: `rootDir` and `outDir`, link them with `:` and assign it to an environment variable BYE_ESM_EXT_MAP_ROOT_TO.

Pass the variable as follows:
```sh
BYE_ESM_EXT_MAP_ROOT_TO=./src:./dist node --import=bye-esm-ext your-app.js
```
