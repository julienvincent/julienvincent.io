import { createFileRoute } from '@tanstack/react-router';
import { createBlogRoute } from '@/lib/blog-entry';
import React from 'react';

export const Route = createFileRoute('/posts/treesitter-language-injections')(
  createBlogRoute({
    Component: React.lazy(
      () => import('./_content/treesitter-language-injections.mdx'),
    ),
    title: 'Casually Using Language Injections in Neovim',
    date: '2025/10/23',
  }),
);
