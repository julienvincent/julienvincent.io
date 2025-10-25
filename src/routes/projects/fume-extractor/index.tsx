import { createProjectRoute } from '@/lib/blog-entry';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/projects/fume-extractor/')(
  createProjectRoute({
    Component: React.lazy(() => import('./index.mdx')),
    title: 'Fume Extractor',
    description: 'A little fan-powered fume extractor for soldering',
  }),
);
