import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="font-mono text-sm font-semibold tracking-wide">
          julienvincent.io
        </Link>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="icon"
            aria-label="GitHub profile"
          >
            <a
              href="https://github.com/julienvincent"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="h-[1.2rem] w-[1.2rem]" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
