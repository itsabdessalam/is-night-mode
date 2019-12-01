#!/usr/bin/env sh

set -e

rm -f package-lock.json && npm install
npm run build-dev
npm run test
