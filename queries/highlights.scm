; Keywords
(scheme_definition
  "scheme" @keyword)
(route_definition
  "route" @keyword)
(request_block
  "request" @keyword)
(response_block
  "response" @keyword)
(import_statement
  "import" @include)

; Types
(struct_name) @type.definition
(user_defined_type) @type
(scheme_type) @type.builtin

; Variables
(field_name) @variable
(identifier) @variable

; Strings
(string_literal) @string

; Punctuation
(scheme_block
  "{" @punctuation.bracket
  "}" @punctuation.bracket)
(route_block
  "{" @punctuation.bracket
  "}" @punctuation.bracket)
(request_block
  "{" @punctuation.bracket
  "}" @punctuation.bracket)
(response_block
  "{" @punctuation.bracket
  "}" @punctuation.bracket)
(_statement
  ":" @punctuation.delimiter)
