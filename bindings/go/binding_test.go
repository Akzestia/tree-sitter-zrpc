package tree_sitter_zrpc_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_zrpc "github.com/akzestia/tree-sitter-zrpc.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_zrpc.Language())
	if language == nil {
		t.Errorf("Error loading Zrpc grammar")
	}
}
