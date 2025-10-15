;; extends

((str_lit) @injection.content
  (#match? @injection.content
    "^\"(SET|TRUNCATE|SELECT|CREATE|DELETE|ALTER|UPDATE|DROP|INSERT|WITH)")
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.language "sql"))

((list_lit
  (sym_lit) @def-type

  (sym_lit
    (meta_lit 
      (kwd_lit
        (kwd_name) @var.meta)))

  (str_lit) @injection.content)

  (#eq? @def-type "def")
  (#eq? @var.meta "sql")
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.language "sql"))
