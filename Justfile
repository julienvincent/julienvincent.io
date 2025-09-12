default:
    just --list

run:
    pnpm vite --port 4444

build:
    pnpm tsc -b && pnpm vite build

preview:
    pnpm vite preview

deploy:
  cd deployment && pulumi up --stack julienvincent/root
