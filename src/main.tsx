import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import './css/code/lines.css';
import './css/code/highlight.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './tree.gen';

const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    title?: string;
    date?: string;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
