import { createBlogRoute } from '@/lib/blog-entry';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/projects/fume-extractor/')(
  createBlogRoute({
    Component: React.lazy(() => import('./index.mdx')),
    title: 'Fume Extractor',
    date: '2025-10-25',
    description: 'A little fan-powered fume extractor for soldering',
  }),
);
