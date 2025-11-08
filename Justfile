default:
    just --list

run:
    pnpm vite --port 4444

build:
    pnpm tsc -b && pnpm vite build

preview:
    pnpm vite preview

deploy *args:
    cd deployment && pulumi up --stack julienvincent/root {{args}}

prepare:
    #!/bin/sh
  
    set -e pipefail

    rm -rf .tree-sitter
    mkdir -p .tree-sitter/grammars

    git clone --no-checkout --depth=1 --revision master --filter=tree:0 https://github.com/nvim-treesitter/nvim-treesitter .tree-sitter/nvim-treesitter
    cd .tree-sitter/nvim-treesitter
    git sparse-checkout set --no-cone /queries
    git checkout

    cd ../../

    git clone https://github.com/sogaiu/tree-sitter-clojure --revision e43eff80d17cf34852dcd92ca5e6986d23a7040f --depth 1 .tree-sitter/grammars/clojure
    git clone https://github.com/derekstride/tree-sitter-sql --revision d71f2bd7f0e3dba84df7025fc9314738d180e71e --depth 1 .tree-sitter/grammars/sql
    git clone https://github.com/tree-sitter/tree-sitter-javascript --revision 58404d8cf191d69f2674a8fd507bd5776f46cb11 --depth 1 .tree-sitter/grammars/javascript
    git clone https://github.com/tree-sitter-grammars/tree-sitter-query --revision 60e253d3c9d6b1131a0f75c85e4bdcc9a48d5b42 --depth 1 .tree-sitter/grammars/query
    git clone https://github.com/tree-sitter/tree-sitter-regex --revision b2ac15e27fce703d2f37a79ccd94a5c0cbe9720b --depth 1 .tree-sitter/grammars/regex
    git clone https://github.com/tree-sitter-grammars/tree-sitter-markdown --revision 2dfd57f547f06ca5631a80f601e129d73fc8e9f0 --depth 1 .tree-sitter/grammars/markdown
    git clone https://github.com/tree-sitter-grammars/tree-sitter-lua --revision d76023017f7485eae629cb60d406c7a1ca0f40c9 --depth 1 .tree-sitter/grammars/lua
    git clone https://github.com/tree-sitter/tree-sitter-bash --revision a06c2e4415e9bc0346c6b86d401879ffb44058f7 --depth 1 .tree-sitter/grammars/bash
    git clone https://github.com/ram02z/tree-sitter-fish --revision aa074a0bacde8b5823c592574d7138f156a95776 --depth 1 .tree-sitter/grammars/fish
