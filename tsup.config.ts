import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  clean: true,
  splitting: false,
  sourcemap: false,
  minify: false,
  dts: false,
});
