import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { FileIcon } from 'lucide-react';
import { Link as RouterLink, useLocation } from '@tanstack/react-router';
import * as date from 'date-fns';
import TableOfContents from './table-of-contents';
import Carousel from './mdx/carousel.tsx';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import React from 'react';

const header_class =
  'scroll-m-20 mt-10 mb-2 font-semibold tracking-tight font-mono text-accent wrap-anywhere';

export function Anchor(
  props: ComponentProps<'h1'> & {
    anchor?: boolean;
  },
) {
  const location = useLocation();

  const hash = React.useMemo(() => {
    if (typeof props.children !== 'string') {
      return;
    }

    return props.children.toLowerCase().split(' ').join('-');
  }, [props.children]);

  if (props.anchor ?? (true && hash)) {
    return (
      <div className="flex" id={hash}>
        <RouterLink
          className="mdx-anchor"
          hashScrollIntoView
          hash={hash}
          to={location.pathname}
          activeOptions={{ includeHash: true }}
        />
        {props.children}
      </div>
    );
  }

  return props.children;
}

export type HeadingProps = ComponentProps<'h1'> & { anchor?: boolean };

export function H1(props: HeadingProps) {
  return (
    <h1 className={cn(header_class, 'text-6xl', props.className)}>
      <Anchor {...props} />
    </h1>
  );
}

export function H2(props: HeadingProps) {
  return (
    <h2
      className={cn(
        header_class,
        'text-5xl',
        props.className,
        (props.anchor ?? true) && 'ml-2',
      )}
    >
      <Anchor {...props} />
    </h2>
  );
}

export function H3(props: HeadingProps) {
  return (
    <h3 className={cn(header_class, 'text-4xl', props.className)}>
      <Anchor {...props} />
    </h3>
  );
}

export function H4(props: HeadingProps) {
  return (
    <h4 className={cn(header_class, 'text-3xl', props.className)}>
      <Anchor {...props} />
    </h4>
  );
}

export function H5(props: HeadingProps) {
  return (
    <h5 className={cn(header_class, 'text-2xl', props.className)}>
      <Anchor {...props} />
    </h5>
  );
}

export function H6(props: HeadingProps) {
  return (
    <h6 className={cn(header_class, 'text-1xl', props.className)}>
      <Anchor {...props} />
    </h6>
  );
}

export function Blockquote(props: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      {...props}
      style={{ borderStyle: 'solid' }}
      className={cn(
        'text-muted-foreground border-l-4 border-primary border-solid pl-4 ml-5',
      )}
    />
  );
}

export function Ul(props: ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className={cn(
        'mdx',
        'mb-10 pl-10',
        '[&>li]:mt-1 [&>li]:mb-3',
        '[&>li>*]:ml-0 [&>li>*]:pl-0 [&>li>*]:mb-3',
        props.className,
      )}
    />
  );
}

export function Ol(props: ComponentProps<'ol'>) {
  return (
    <ol
      {...props}
      className={cn(
        'mb-10 ml-8 list-decimal list-outside',
        '[&>li]:mt-1 [&>li]:mb-5 marker:text-muted-foreground',
        '[&>li>p]:mb-3 [&>li>p]:ml-2',
        props.className,
      )}
    />
  );
}

export function Li(props: ComponentProps<'li'>) {
  return <li {...props} />;
}

export function Hr(props: ComponentProps<'hr'>) {
  return <hr {...props} className="border-1 mb-7 my-7" />;
}

export function P(props: ComponentProps<'p'>) {
  return <p {...props} className="mb-5 text-base" />;
}

export function Link(props: ComponentProps<'a'>) {
  return (
    <RouterLink
      {...props}
      to={props.href}
      className={cn(
        'font-semibold underline decoration-2 underline-offset-4',
        'rounded-sm px-0.5',
        'hover:text-primary hover:decoration-primary',
        'active:text-primary active:decoration-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        'selection:bg-accent selection:text-accent-foreground',
        'wrap-break-word',
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

export function Img(props: ComponentProps<'img'>) {
  return (
    <img
      {...props}
      style={{ borderStyle: 'solid' }}
      className={cn(props.className, 'mb-10 mt-10 rounded-md border-2')}
    />
  );
}

export function Image(
  props: ComponentProps<'img'> & { ratio?: number; grayscale?: boolean },
) {
  return (
    <div className="mb-10 mt-10">
      <AspectRatio
        ratio={props.ratio ?? 1}
        className={cn('bg-muted rounded-lg')}
      >
        <img
          src={props.src}
          className={cn(
            'h-full w-full rounded-md object-cover',
            props.className,
            props.grayscale ? 'grayscale' : '',
          )}
        />
      </AspectRatio>
    </div>
  );
}

export function FormattedDate(props: { date: string }) {
  return (
    <p className="text-accent-secondary mt-2 mb-10 underline font-semibold underline-offset-5 decoration-dashed">
      {date.format(new Date(props.date), 'dd MMMM y')}
    </p>
  );
}

const components: MDXComponents = {
  Date: FormattedDate,

  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  ul: Ul,
  ol: Ol,
  li: Li,

  p: P,
  hr: Hr,

  a: Link,

  img: Img,
  Image: Image,

  Carousel: Carousel,

  code: Code,
  pre: Pre,

  TableOfContents: TableOfContents,

  blockquote: Blockquote,
};

export default components;
