import { createProjectRoute } from '@/lib/blog-entry';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/projects/plant-ops/')(
  createProjectRoute({
    Component: React.lazy(() => import('./index.mdx')),
    title: 'Plant Ops',
    description:
      'A long running project of mine to automate the care of my indoor plants',
    keywords: ['electronics', 'plant irrigation', 'diy'],
  }),
);
