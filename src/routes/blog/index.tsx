import { createFileRoute } from '@tanstack/react-router';
import { H1 } from '@/components/mdx.tsx';
import TOC from '@/components/toc';

export const Route = createFileRoute('/blog/')({
  component: () => {
    return (
      <>
        <H1>Index</H1>

        <TOC routeId="/blog/" />
      </>
    );
  },
});
