import { createFileRoute } from '@tanstack/react-router';
import Content from './_content/index.mdx';

export const Route = createFileRoute('/')({
  component: () => {
    return <Content />;
  },
});
