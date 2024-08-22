import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    terser()
  ],
  external: ['react', 'preact', 'vue', 'svelte']
};
