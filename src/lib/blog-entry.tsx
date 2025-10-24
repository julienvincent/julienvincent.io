import type { ReactElement } from 'react';
import Title from '@/components/title';
import type { RouteMetadata } from '@/types/routes';

type BlogComponent = (props: { title: string; date: string }) => ReactElement;
type ProjectComponent = (props: { title: string }) => ReactElement;

type Props = {
  Component: BlogComponent | React.LazyExoticComponent<BlogComponent>;
  title: string;
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
          <Title title={props.title}></Title>
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
          <Title title={props.title}></Title>
          <Component title={props.title} />
        </>
      );
    },
  };
}
