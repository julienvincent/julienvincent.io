import { ThemeProvider } from '@/components/theme-provider';
import { MDXProvider } from '@mdx-js/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import Header from '@/components/header';
import { Breadcrumbs } from '@/components/breadcrumbs';

import mdx_components from '@/components/mdx.tsx';

const RootLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MDXProvider components={mdx_components}>
        <Header />
        <Breadcrumbs />

        <main className="mx-auto max-w-4xl px-5">
          <Outlet />
        </main>
      </MDXProvider>
    </ThemeProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
