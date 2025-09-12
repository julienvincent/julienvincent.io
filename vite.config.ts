import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightLines from 'rehype-highlight-code-lines';
import rehypeCodeProps from 'rehype-mdx-code-props';
import path from 'node:path';

import clojure from 'highlight.js/lib/languages/clojure';
import { common } from 'lowlight';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        rehypePlugins: [
          [rehypeHighlight, { languages: { ...common, clojure: clojure } }],
          rehypeHighlightLines,
          rehypeCodeProps,
        ],
      }),
    },
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/tree.gen.ts',
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
      enableRouteGeneration: true
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: true,
  },
});
