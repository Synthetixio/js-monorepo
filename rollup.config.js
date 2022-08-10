import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
  //entry point
  input: 'src/index.js',
  preserveModules: true,

  //output directory
  output: [
    {
      dir: './dist/cjs/',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto'
    },
    {
      dir: './dist/esm/',
      format: 'esm',
      sourcemap: true,
      exports: 'auto'
    }
  ],

  //plugins
  plugins: [
    peerDepsExternal(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-typescript',
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react'
      ]
    }),
    commonjs(),
    terser()
  ]
};
