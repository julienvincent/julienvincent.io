import { createFileRoute } from '@tanstack/react-router';
import { createBlogRoute } from '@/lib/blog-entry';
import React from 'react';

export const Route = createFileRoute(
  '/posts/extending-clojure-test-with-functions',
)(
  createBlogRoute({
    Component: React.lazy(
      () => import('./_content/extending-clojure-test-with-functions.mdx'),
    ),
    title: 'Extending clojure.test with functions, not multimethods',
    keywords: ['clojure', 'programming', 'development'],
    date: '2026/04/04',
  }),
);
