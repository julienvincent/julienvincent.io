import { createFileRoute } from '@tanstack/react-router';
import { createBlogRoute } from '@/lib/blog-entry';
import React from 'react';

export const Route = createFileRoute(
  '/projects/plant-ops/moisture-sensor-hardware/',
)(
  createBlogRoute({
    Component: React.lazy(() => import('./index.mdx')),
    title: 'Building A Battery Powered Moisture Sensor - Hardware',
    date: '2025-12-30',
  }),
);
