import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

const createConfig = (output) => ({
  input: 'src/index.js',
  output: Object.assign.call({
    sourcemap: true,
  }, output),
  plugins: [
    external({
      includeDependencies: true,
    }),
    scss({
      modules: true,
      sourcemap: false,
    }),
    url(),
    svgr(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
  ],
});

export default [
  createConfig({
    file: pkg.main,
    format: 'cjs',
    exports: 'named',
  }),
  createConfig({
    file: pkg.module,
    format: 'esm',
    exports: 'named',
  }),
];
