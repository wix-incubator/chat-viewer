// https://vitejs.dev/config/
/// <reference types="vite/client" />

import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ mode, command }) => {
  const isDev = command === 'serve';

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
    base: isDev ? '/demo' : '/chat-viewer/demo',
    plugins: [
      react(),
    ],
    build: {
      outDir: 'website/demo',
    },
  };

  if (mode === 'demo') {
    return demo;
  }

  return lib;
})