import {
  useRouter,
  type AnyRoute,
  type RegisteredRouter,
} from '@tanstack/react-router';
import { Link, Ul } from '@/components/mdx.tsx';
import * as date from 'date-fns';

function useChildren(router: RegisteredRouter, route: AnyRoute) {
  return router.flatRoutes.filter((child) => {
    return (
      child.parentRoute?.id == route.parentRoute?.id && child.id !== route.id
    );
  });
}

function findRoute(router: RegisteredRouter, id: string) {
  return router.flatRoutes.find((child) => {
    return child.id == id;
  });
}

function renderDate(date_string?: string) {
  if (date_string) {
    return date.format(new Date(date_string), 'dd MMMM Y');
  }
}

type Props = {
  routeId: string;
};
export default function TOC(props: Props) {
  const router = useRouter();
  const route = findRoute(router, props.routeId);
  const children = route ? useChildren(router, route) : [];
  return (
    <>
      {children.map((child) => {
        return (
          <Ul key={child.id}>
            <li>
              <p className="font-bold text-accent-secondary">
                {renderDate(child.options.staticData?.date)}
              </p>
              <Link href={child.fullPath}>
                {child.options.staticData?.title || child.path}
              </Link>
            </li>
          </Ul>
        );
      })}
    </>
  );
}
