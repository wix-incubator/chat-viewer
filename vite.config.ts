// https://vitejs.dev/config/

import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

const lib: UserConfig = {
  plugins: [
    react(),
    dts({
      include: ['lib'],
      outDir: 'dist/types',
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'ChatViewer',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
};

const demo: UserConfig = {
  base: '/demo',
  plugins: [
    react(),
  ],
  build: {
    outDir: 'website/demo',
  },
};

export default defineConfig(({ mode }) => {
  if (mode === 'demo') {
    return demo;
  }
  return lib;
})