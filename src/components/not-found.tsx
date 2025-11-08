import { Link as MdxLink, H1, P } from '@/components/mdx.tsx';

export default function NotFound() {
  return (
    <div className="space-y-5">
      <H1>404</H1>
      <P>Nothing here.</P>
      <P>
        Try the <MdxLink href="/">home page</MdxLink>, browse{' '}
        <MdxLink href="/posts/">posts</MdxLink>, or check out{' '}
        <MdxLink href="/projects/">projects</MdxLink>.
      </P>
    </div>
  );
}
