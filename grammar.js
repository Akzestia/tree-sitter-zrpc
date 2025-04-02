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
    source_file: ($) =>
      seq(optional(repeat($.import_statement)), repeat($._definition)),

    import_statement: ($) => seq("import", $.string_literal),

    string_literal: ($) => seq("'", /[^']*/, "'"),

    _definition: ($) => choice($.scheme_definition, $.route_definition),

    scheme_definition: ($) => seq($.struct_type, $.struct_name, $.scheme_block),

    scheme_block: ($) => seq("{", repeat($._statement), "}"),

    route_definition: ($) => seq($.struct_type, $.struct_name, $.route_block),

    route_block: ($) => seq("{", $.request_block, $.response_block, "}"),

    request_block: ($) => seq($.struct_type, "{", repeat($._statement), "}"),

    response_block: ($) => seq($.struct_type, "{", repeat($._statement), "}"),

    _statement: ($) => seq($.field_name, ":", $.type),

    struct_type: ($) => choice("scheme", "route", "request", "response"),

    type: ($) => choice($.scheme_type, $.user_defined_type),

    user_defined_type: ($) => $.identifier,

    scheme_type: ($) =>
      choice(
        "u32_id",
        "u64_id",
        "uname",
        "uemail",
        "upassword",
        "uavatar",
        "ubanner",
        "time",
        "lang",
        "text",
        "bytes",
      ),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    field_name: ($) => $.identifier,
    struct_name: ($) => $.identifier,
  },
});
