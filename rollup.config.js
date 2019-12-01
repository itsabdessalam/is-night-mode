import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

const production = process.env.NODE_ENV === "production";
const excludedFiles = [
  "!**/node_modules",
  "!**/build.sh",
  "!**/deploy.sh",
  "!**/rollup.config.js",
  "!index.src.js"
];

export default {
  input: "index.src.js",
  output: {
    sourcemap: false,
    format: "iife",
    file: production ? "build/index.js" : "index.js"
  },
  plugins: [
    babel(),
    resolve(),
    commonjs(),
    terser(),
    production &&
      copy({
        targets: [
          {
            src: ["**/*", "**/.*", ...excludedFiles],
            dest: "build"
          }
        ]
      })
  ]
};
