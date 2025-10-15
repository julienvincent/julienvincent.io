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

prepare:
    #!/bin/sh
    rm -rf .tree-sitter
    mkdir -p .tree-sitter/grammars

    git clone --no-checkout --depth=1 --filter=tree:0 https://github.com/nvim-treesitter/nvim-treesitter .tree-sitter/nvim-treesitter
    cd .tree-sitter/nvim-treesitter
    git sparse-checkout set --no-cone /queries
    git checkout

    cd ../../

    git clone https://github.com/sogaiu/tree-sitter-clojure --depth 1 .tree-sitter/grammars/clojure
    git clone https://github.com/derekstride/tree-sitter-sql --revision gh-pages --depth 1 .tree-sitter/grammars/sql
    git clone https://github.com/tree-sitter/tree-sitter-javascript --depth 1 .tree-sitter/grammars/javascript
    git clone https://github.com/tree-sitter-grammars/tree-sitter-query --depth 1 .tree-sitter/grammars/query
    git clone https://github.com/tree-sitter/tree-sitter-regex --depth 1 .tree-sitter/grammars/regex
    git clone https://github.com/tree-sitter-grammars/tree-sitter-markdown --depth 1 .tree-sitter/grammars/markdown
