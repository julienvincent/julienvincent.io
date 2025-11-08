import { createFileRoute } from '@tanstack/react-router';
import { createBlogRoute } from '@/lib/blog-entry';
import React from 'react';

export const Route = createFileRoute('/posts/viewing-jujutsu-diffs-in-neovim')(
  createBlogRoute({
    Component: React.lazy(
      () => import('./_content/jujutsu-diffs-in-neovim.mdx'),
    ),
    title: 'Viewing Jujutsu Diffs In Neovim',
    keywords: ['neovim', 'tree-sitter', 'programming', 'syntax highlighting'],
    date: '2025/12/21 ',
  }),
);
