import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

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
    babel({
      exclude: ['node_modules/**'],
      presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        ['@babel/preset-env', { modules: false }]
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    terser()
  ]
};
