import {
  createFileRoute,
  useLocation,
  useRouter,
} from '@tanstack/react-router';

import TableOfContents from '@/components/table-of-contents';
import { H1, Link as MdxLink, P } from '@/components/mdx.tsx';

function toTitleCase(input: string) {
  return input
    .split(' ')
    .map((word) => (word ? word[0]!.toUpperCase() + word.slice(1) : word))
    .join(' ');
}

const ProjectsDirectory = () => {
  const { pathname } = useLocation();
  const router = useRouter();
  const has_trailing_slash = pathname.endsWith('/');

  if (!has_trailing_slash) {
    return (
      <div className="space-y-5">
        <H1>Post Not Found</H1>
        <P>
          This is not the post you are looking for. Maybe you will find it in
          the <MdxLink href="/posts/">index</MdxLink>.
        </P>
      </div>
    );
  }

  const filter_prefix = pathname;
  const matching_routes = router.flatRoutes.filter((child) => {
    return (
      child.parentRoute?.id === '/posts' &&
      child.fullPath?.startsWith(filter_prefix) &&
      child.fullPath !== filter_prefix
    );
  });

  const section_segments = filter_prefix
    .split('/')
    .filter(Boolean)
    .slice(1)
    .map((segment) => toTitleCase(segment.replace(/-/g, ' ')));
  const section_label = section_segments.join('/');

  if (matching_routes.length === 0) {
    return (
      <div className="space-y-5">
        <H1>Index {section_label}</H1>
        <P>
          These are not the posts you are looking for. Maybe you will find them
          in the <MdxLink href="/posts/">index</MdxLink>.
        </P>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <H1>Index {section_label}</H1>
      <P>Are these the posts you are looking for?</P>
      <TableOfContents routeId="/posts/" filter_prefix={filter_prefix} />
    </div>
  );
};

export const Route = createFileRoute('/projects')({
  notFoundComponent: ProjectsDirectory,
});
