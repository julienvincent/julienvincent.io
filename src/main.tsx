import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './tree.gen';
import type { RouteMetadata } from './types/routes';
import NotFound from './components/not-found';

const router = createRouter({
  routeTree,
  trailingSlash: 'preserve',
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    meta?: RouteMetadata;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
