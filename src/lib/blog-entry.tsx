import type { ReactElement } from 'react';
import Title from '@/components/title';
import type { RouteMetadata } from '@/types/routes';

type Component = (props: { title: string; date: string }) => ReactElement;

type Props = {
  Component: Component | React.LazyExoticComponent<Component>;
  title: string;
  date: string;
};
export function createBlogRoute(props: Props) {
  return {
    staticData: {
      meta: {
        type: 'post',
        title: props.title,
        date: props.date,
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
