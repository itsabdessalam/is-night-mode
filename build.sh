#!/bin/bash
rm -f package-lock.json && npm install
npm run build
npm run test
