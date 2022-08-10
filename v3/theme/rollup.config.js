import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  //entry point
  input: 'src/index.ts',
  preserveModules: true,

  //output directory
  output: [
    {
      dir: './dist/cjs/',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      dir: './dist/esm/',
      format: 'esm',
      sourcemap: true,
      exports: 'auto',
    },
  ],

  //plugins
  plugins: [
    peerDepsExternal(),
    babel({
      exclude: ['node_modules/**'],
      presets: [
        require.resolve('@babel/preset-typescript'),
        require.resolve('@babel/preset-react'),
        [require.resolve('@babel/preset-env'), { modules: false }],
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    terser(),
  ],
};
