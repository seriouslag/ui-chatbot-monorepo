/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';

// load the package.json file
import pkg from './package.json';

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});

const external = [...deps, ...peerDeps];

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/chatbot-react',

  plugins: [
    react(),
    dts({
      aliasesExclude: [/^@seriouslag\/chatbot.*/],
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    emptyOutDir: true,
    outDir: '../../dist/packages/chatbot-react',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'chatbot-react',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external,
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/chatbot-react',
      provider: 'v8',
    },
  },
});
