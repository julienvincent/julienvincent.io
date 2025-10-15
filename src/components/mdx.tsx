import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { FileIcon } from 'lucide-react';
import { Link as RouterLink } from '@tanstack/react-router';
import * as date from 'date-fns';
import TableOfContents from './table-of-contents';

const header_class =
  'scroll-m-20 mt-10 mb-5 font-semibold tracking-tight font-mono text-accent';

export function H1(props: ComponentProps<'h1'>) {
  return <h1 {...props} className={cn(header_class, 'text-6xl')} />;
}

export function H2(props: ComponentProps<'h1'>) {
  return <h2 {...props} className={cn(header_class, 'text-5xl')} />;
}

export function H3(props: ComponentProps<'h1'>) {
  return <h3 {...props} className={cn(header_class, 'text-4xl')} />;
}

export function H4(props: ComponentProps<'h1'>) {
  return <h4 {...props} className={cn(header_class, 'text-3xl')} />;
}

export function H5(props: ComponentProps<'h1'>) {
  return <h5 {...props} className={cn(header_class, 'text-2xl')} />;
}

export function H6(props: ComponentProps<'h1'>) {
  return <h6 {...props} className={cn(header_class, 'text-1xl')} />;
}

export function Ul(props: ComponentProps<'ul'>) {
  return <ul {...props} className="my-6 ml-6 list-disc [&>li]:mt-2" />;
}

export function P(props: ComponentProps<'p'>) {
  return <p {...props} className="mb-5" />;
}

export function Link(props: ComponentProps<'a'>) {
  return (
    <RouterLink
      {...props}
      to={props.href}
      className={cn(
        'font-semibold underline decoration-2 underline-offset-2',
        'rounded-sm px-0.5',
        'hover:text-primary hover:decoration-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        'selection:bg-accent selection:text-accent-foreground',
      )}
    />
  );
}

type PreProps = ComponentProps<'pre'> & {
  filename?: string;
  showLineNumbers?: any;
};
export function Pre(props: PreProps) {
  const { filename, className, children, showLineNumbers, ...rest } = props;

  if (!filename) {
    const { showLineNumbers, ...rest } = props;
    return (
      <pre
        {...rest}
        className={cn('rounded-md bg-code-background font-mono', className)}
      />
    );
  }

  return (
    <>
      <div className="rounded-t-md border-b-1 px-3 py-2 text-xs font-semibold text-code-foreground flex-row flex bg-code-background">
        <FileIcon size={15} className="mr-2" />
        {filename}
      </div>
      <pre
        {...rest}
        className={cn(
          'rounded-md rounded-t-none bg-code-background',
          className,
        )}
      >
        {children}
      </pre>
    </>
  );
}

export function Code(props: ComponentProps<'code'>) {
  return (
    <code
      {...props}
      className={cn(props.className, 'mb-5 font-mono overflow-x-scroll')}
    />
  );
}

const components: MDXComponents = {
  Date: (props: { date: string }) => {
    return (
      <p className="text-accent-secondary mt-5 mb-10 underline font-semibold underline-offset-5 decoration-dashed">
        {date.format(new Date(props.date), 'dd MMMM y')}
      </p>
    );
  },

  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  ul: Ul,

  p: P,

  a: Link,

  code: Code,
  pre: Pre,

  TableOfContents: TableOfContents,
};

export default components;
