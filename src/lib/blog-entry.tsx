import type { ReactElement } from 'react';
import PageMeta from '@/components/page-meta';
import type { RouteMetadata } from '@/types/routes';
import { H1, FormattedDate } from '@/components/mdx';

type Component = (props: {}) => ReactElement;

type CreateRouteProps = RouteMetadata & {
  Component: Component | React.LazyExoticComponent<Component>;
  anchors?: boolean;
};
function createRoute(props: CreateRouteProps) {
  return {
    staticData: {
      meta: {
        type: props.type,
        date: props.date,
        title: props.title,
        description: props.description,
        keywords: props.keywords,
        hidden: props.hidden,
        include_in_rss_feed: props.include_in_rss_feed,
      } as RouteMetadata,
    },
    component: () => {
      const Component = props.Component;

      return (
        <>
          <PageMeta
            title={props.title}
            description={props.description}
            keywords={props.keywords}
          />
          <H1>{props.title}</H1>
          {props.date ? <FormattedDate date={props.date} /> : null}

          <div className={(props.anchors ?? true) ? 'with-anchors' : ''}>
            <Component />
          </div>
        </>
      );
    },
  };
}

type Props = Omit<CreateRouteProps, 'type' | 'date'> & {
  title: string;
  date: string;
};
export function createBlogRoute(props: Props) {
  return createRoute({
    ...props,
    type: 'post',
    include_in_rss_feed: true,
  });
}

type ProjectProps = Omit<
  CreateRouteProps,
  'type' | 'date' | 'description' | 'anchors' | 'include_in_rss_feed'
> & {
  description: string;
};
export function createProjectRoute(props: ProjectProps) {
  return createRoute({
    ...props,
    type: 'project',
    anchors: false,
    include_in_rss_feed: false,
  });
}
