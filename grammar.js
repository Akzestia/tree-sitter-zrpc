/**
 * @file Zrpc tree-sitter
 * @author アクゼスティア <akzestia@zurui.io>
 * @license MIT
 */

module.exports = grammar({
  name: "zrpc",

  extras: ($) => [/\s|\\\r?\n/, $.comment],

  word: ($) => $.identifier,

  inline: ($) => [$.semi_colon],

  rules: {
    source_file: ($) => choice($._statement, $.comment),
    _statement: ($) => choice($.zrpc_scheme),

    // ------- [COMMENT] -------

    comment: ($) => choice($.line_comment, $.block_comment),
    line_comment: ($) => token(seq(choice("--", "//"), /.*/)),
    block_comment: ($) => token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),

    // ------- [TYPES] -------

    // Int values
    _type_int16: ($) => "i16",
    _type_int32: ($) => "i32",
    _type_int64: ($) => "i64",

    // Unsigned Int values
    _type_uint16: ($) => "u16",
    _type_uint32: ($) => "u32",
    _type_uint64: ($) => "u64",

    // Uuid
    _type_uuid: ($) => "uuid",
    _type_timestamp: ($) => "timestamp",

    // QUIC specific
    _type_vl_integer: ($) => "vl_int",
    _type_vl_text: ($) => "vl_text",
    _type_vl_blob: ($) => "vl_blob",

    // Hashed types
    _type_hashed_32b: ($) => "hashed_32b",
    _type_hashed_64b: ($) => "hashed_64b",
    _type_hashed_128b: ($) => "hashed_128b",

    // Collections
    _type_map: ($) => "map",
    _type_list: ($) => "list",

    // Constructors
    _map_construct: ($) =>
      seq($._type_map, "<", $.construct_union, ",", $.construct_union, ">"),
    _list_construct: ($) => seq($._type_list, "<", $.construct_union, ">"),

    /*
      Nested Collection aren't supported
    */
    construct_union: ($) =>
      choice(
        $._type_int16,
        $._type_int32,
        $._type_int64,
        $._type_uint16,
        $._type_uint32,
        $._type_uint64,
        // --------------
        $._type_uuid,
        $._type_timestamp,
        // --------------
        $._type_vl_integer,
        $._type_vl_text,
        $._type_vl_blob,
        // --------------
        $._type_hashed_32b,
        $._type_hashed_64b,
        $._type_hashed_128b,
      ),

    type_union: ($) =>
      choice(
        $._type_int16,
        $._type_int32,
        $._type_int64,
        $._type_uint16,
        $._type_uint32,
        $._type_uint64,
        // --------------
        $._type_uuid,
        $._type_timestamp,
        // --------------
        $._type_vl_integer,
        $._type_vl_text,
        $._type_vl_blob,
        // --------------
        $._type_hashed_32b,
        $._type_hashed_64b,
        $._type_hashed_128b,
        // --------------
        $._type_map,
        $._type_list,
      ),

    // ------- [KEYWORDS] -------

    _kw_use: ($) => "use",
    _kw_as: ($) => "as",
    _kw_type: ($) => "type",

    // ------- [MACRO] -------

    // Macro types
    _macro_type_require_auth: ($) => "require_auth",

    _macro_type: ($) => choice(),

    // Macro namespace
    _space_auth: ($) => "auth",

    _macro_space: ($) => choice(),

    // Macro delimeters
    _macro_use: ($) => "::",

    // ------- [STATEMENTS] -------

    import_statement: ($) =>
      seq($._kw_use, $.string_literal, optional($.as_statement), $.semi_colon),
    as_statement: ($) => seq($._kw_as, $.identifier),
    _macro_statement: ($) =>
      seq("[", $._macro_space, $._macro_use, $._macro_type, "]"),

    // ------- [SCHEMA RULES] -------

    zrpc_scheme: ($) => choice(),

    // ------- [IDENTIFIERS] -------

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    string_literal: ($) => /'(?:[^'\\]|\\.)*'/,
    semi_colon: ($) => ";",
  },
});
