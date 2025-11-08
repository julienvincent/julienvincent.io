import type { ReactElement } from 'react';
import PageMeta from '@/components/page-meta';
import type { RouteMetadata } from '@/types/routes';

type BlogComponent = (props: { title: string; date: string }) => ReactElement;
type ProjectComponent = (props: { title: string }) => ReactElement;

type Props = {
  Component: BlogComponent | React.LazyExoticComponent<BlogComponent>;
  title: string;
  description?: string;
  keywords?: string[];
  date: string;
  hidden?: boolean;
};
export function createBlogRoute(props: Props) {
  return {
    staticData: {
      meta: {
        type: 'post',
        title: props.title,
        date: props.date,
        hidden: props.hidden,
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
          <Component title={props.title} date={props.date} />
        </>
      );
    },
  };
}

type ProjectProps = {
  Component: ProjectComponent | React.LazyExoticComponent<ProjectComponent>;
  title: string;
  description: string;
  keywords?: string[];
  hidden?: boolean;
};
export function createProjectRoute(props: ProjectProps) {
  return {
    staticData: {
      meta: {
        type: 'project',
        title: props.title,
        description: props.description,
        hidden: props.hidden,
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
          <Component title={props.title} />
        </>
      );
    },
  };
}
