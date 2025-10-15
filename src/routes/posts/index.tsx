import { createFileRoute } from '@tanstack/react-router';
import { H1 } from '@/components/mdx.tsx';
import TableOfContents from '@/components/table-of-contents';

export const Route = createFileRoute('/posts/')({
  component: () => {
    return (
      <>
        <H1>Posts</H1>
        <TableOfContents routeId="/posts/" />
      </>
    );
  },
});
