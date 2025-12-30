import {
  useRouter,
  type AnyRoute,
  type RegisteredRouter,
} from '@tanstack/react-router';
import { Link, Ul } from '@/components/mdx.tsx';
import * as date from 'date-fns';

function findRoute(router: RegisteredRouter, id: string) {
  return router.flatRoutes.find((child) => {
    return child.id == id;
  });
}

function normalizePath(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

function getPathDepth(path: string) {
  return path.split('/').filter(Boolean).length;
}

function renderDate(date_string?: string) {
  if (date_string) {
    return date.format(new Date(date_string), 'dd MMMM y');
  }
}

function RouteEntry({ route }: { route: AnyRoute }) {
  const meta = route.options.staticData?.meta;

  if (meta?.type === 'post') {
    return (
      <>
        <Link href={route.fullPath}>{meta.title}</Link>
        <p className="text-accent-secondary">{renderDate(meta.date)}</p>
        {meta.description ? (
          <p className="text-muted-foreground -mt-3">{meta.description}</p>
        ) : null}
      </>
    );
  }

  if (meta?.type === 'project') {
    return (
      <>
        <Link href={route.fullPath}>{meta.title}</Link>
        <p className="text-muted-foreground">{meta.description}</p>
      </>
    );
  }
}

type Props = {
  routeId: string;
  filter_prefix?: string;
  type?: 'post' | 'project';
};
export default function TableOfContents(props: Props) {
  const router = useRouter();
  const route = findRoute(router, props.routeId);
  const all_children = router.flatRoutes;
  const base_path = normalizePath(route?.fullPath ?? props.routeId);
  const depth_base = normalizePath(props.filter_prefix ?? base_path);
  const children = all_children.filter((child) => {
    if (child.options.staticData?.meta?.hidden) {
      return false;
    }

    if (props.filter_prefix) {
      if (
        !(
          child.fullPath?.startsWith(props.filter_prefix) &&
          child.fullPath !== props.filter_prefix
        )
      ) {
        return false;
      }
    }

    if (props.type) {
      if (child.options.staticData?.meta?.type !== props.type) {
        return false;
      }
    }

    if (!child.fullPath) {
      return false;
    }

    const child_path = normalizePath(child.fullPath);
    if (!child_path.startsWith(depth_base) || child_path === depth_base) {
      return false;
    }

    const base_depth = getPathDepth(depth_base);
    const child_depth = getPathDepth(child_path);
    if (child_depth - base_depth !== 1) {
      return false;
    }
    return true;
  });

  children.sort((a, b) => {
    const meta_a = a.options.staticData?.meta;
    const meta_b = b.options.staticData?.meta;
    if (!meta_a?.date && meta_b?.date) {
      return -1;
    }
    if (meta_a?.date && !meta_b?.date) {
      return 1;
    }
    if (!meta_a?.date || !meta_b?.date) {
      return 0;
    }
    return new Date(meta_b.date).getTime() - new Date(meta_a.date).getTime();
  });

  return (
    <Ul>
      {children.map((child) => {
        return (
          <li key={child.id}>
            <RouteEntry route={child}></RouteEntry>
          </li>
        );
      })}
    </Ul>
  );
}
