import { createProjectRoute } from '@/lib/blog-entry';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/projects/cartographer/')(
  createProjectRoute({
    Component: React.lazy(() => import('./index.mdx')),
    title: 'Cartographer: A Minecraft Map Art Generator',
    description: 'A tool for converting images into Minecraft map art',
  }),
);
