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
// If you prefer esm module instead of commonjs, but also this style:

import { foo, bar } from './my-module'

// instead of
// import { foo, bar } from './my-module.js'
// import { foo, bar } from './my-module.ts'
```
Use this as a node.js loader parameter:
```
node --loader bye-esm-ext your-app.js
```
