import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import rehypeHighlightLines from 'rehype-highlight-code-lines';
import rehypeCodeProps from 'rehype-mdx-code-props';
import path from 'node:path';
import rehypeTreeSitterHighlight, {
  type HighlighterOptions,
} from '@julienvincent/rehype-tree-sitter-highlight';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        rehypePlugins: [
          [
            rehypeTreeSitterHighlight,
            {
              enter: (node) => {
                const meta = node.data?.meta;
                if (meta && meta.includes('no-tree-sitter')) {
                  return false;
                }
                return true;
              },
              leave: (node) => {
                if (node.data?.meta) {
                  node.data.meta = node.data.meta.replace('no-tree-sitter', '');
                }

                (node.properties.className as string[]).push(
                  // The `hljs` class is required for rehypeHighlightLines to work
                  'hljs',
                  'tree-sitter',
                );
              },
              grammar_paths: [
                path.join(process.cwd(), '.tree-sitter/grammars'),
              ],
              query_paths: [path.join(process.cwd(), 'queries/default/')],
              resolveQueryPath: (query) => {
                return path.join(process.cwd(), 'queries', query);
              },
            } as HighlighterOptions,
          ],

          [
            rehypeHighlightLines,
            {
              showLineNumbers: true,
            },
          ],

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
    }),
    // This include string is to get HMR working for mdx files
    react({ include: [/\.([jt]sx|mdx)$/] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
  },
});
