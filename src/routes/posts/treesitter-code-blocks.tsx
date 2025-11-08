import { createFileRoute } from '@tanstack/react-router';
import { createBlogRoute } from '@/lib/blog-entry';
import React from 'react';

export const Route = createFileRoute('/posts/treesitter-code-blocks')(
  createBlogRoute({
    Component: React.lazy(
      () => import('./_content/treesitter-code-blocks.mdx'),
    ),
    title: 'Compiling Markdown Code Blocks with Tree-Sitter',
    keywords: ['neovim', 'tree-sitter', 'programming', 'syntax highlighting'],
    date: '2025/10/23',
  }),
);
