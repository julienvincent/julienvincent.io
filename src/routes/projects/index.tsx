import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/projects/')({
  component: React.lazy(() => import('./index.mdx')),
});
