#!/bin/sh

set -ex

npx tsc
npx terser ./out/index.js --compress --mangle --output ./lib/index.min.js