import type { ReactElement } from 'react';
import Title from '@/components/title';

type Props = {
  Component: (props: { title: string; date: string }) => ReactElement;
  title: string;
  date: string;
};
export function createBlogRoute(props: Props) {
  return {
    staticData: {
      title: props.title,
      date: props.date,
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
