import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.src.js",
  output: {
    sourcemap: false,
    format: "iife",
    file: "index.js"
  },
  plugins: [babel(), resolve(), commonjs(), terser()]
};
