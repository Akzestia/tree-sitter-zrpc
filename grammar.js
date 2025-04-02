/**
 * @file Zrpc tree-sitter
 * @author アクゼスティア <akzestia@zurui.io>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "zrpc",

  rules: {
    source_file: ($) => repeat($._definition),

    _definition: ($) => choice($.scheme_definition),

    scheme_definition: ($) => seq("scheme", $.scheme_name, $.block),

    block: ($) => seq("{", repeat($._statement), "}"),

    _statement: ($) => seq($.field_name, ":", $.scheme_type),

    scheme_type: ($) => choice("u32_id", "uname"),

    field_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    scheme_name: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
  },
});
