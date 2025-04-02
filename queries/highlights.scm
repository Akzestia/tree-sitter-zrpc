
; Tree-sitter highlighting for zrpc
; Captures for syntax highlighting

; Keywords
(scheme_definition
  "scheme" @keyword)

; Types
(scheme_type) @type

; Variables/identifiers
(identifier) @variable

; Punctuation
"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket

; Block definition
(block) @punctuation.special

; Numbers
(number) @number

; Comments (once implemented)
;(comment) @comment

; Function/scheme definition
(scheme_definition
  (identifier) @function)
