import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import generateDeclarations from "rollup-plugin-generate-declarations";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "esm" }
  ],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    }),
    typescript(),
    generateDeclarations(),
    postcss({
      config: {
        path: "./postcss.config.js"
      },
      inject: {
        insertAt: "top"
      },
      minimize: true,
      extract: false,
      autoModules: true
    }),
    copy({
      targets: [{ src: "src/styles/fonts", dest: "dist" }]
    })
  ],
  external: Object.keys(pkg.peerDependencies || {})
};
