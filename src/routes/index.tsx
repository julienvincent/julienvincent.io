import { createFileRoute } from '@tanstack/react-router';
import About from './about.mdx';

export const Route = createFileRoute('/')({
  component: () => {
    return <About />;
  },
});
