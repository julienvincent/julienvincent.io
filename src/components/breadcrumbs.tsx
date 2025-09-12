import { Link, useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';

type Crumb = {
  label: string;
  href: string;
};

function toTitleCase(input: string) {
  return input
    .split(' ')
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function buildCrumbs(pathname: string): Crumb[] {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: Crumb[] = [];
  let acc = '';
  for (const part of parts) {
    acc += `/${part}`;
    const label = toTitleCase(decodeURIComponent(part.replace(/-/g, ' ')));
    crumbs.push({ label, href: acc });
  }
  return crumbs;
}

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = useMemo(() => buildCrumbs(pathname), [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-background/70">
      <ol className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-2 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
        </li>

        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            <span className="text-foreground/30">/</span>
            {i === crumbs.length - 1 ? (
              <span className="text-foreground">{c.label}</span>
            ) : (
              <Link to={c.href} className="hover:text-foreground">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
