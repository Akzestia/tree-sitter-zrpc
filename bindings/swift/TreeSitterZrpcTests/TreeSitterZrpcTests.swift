import XCTest
import SwiftTreeSitter
import TreeSitterZrpc

final class TreeSitterZrpcTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_zrpc())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Zrpc grammar")
    }
}
