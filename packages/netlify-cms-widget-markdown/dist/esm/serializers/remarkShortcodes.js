"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remarkParseShortcodes = remarkParseShortcodes;
exports.createRemarkShortcodeStringifier = createRemarkShortcodeStringifier;

function remarkParseShortcodes(_ref) {
  let plugins = _ref.plugins;
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;
  tokenizers.shortcode = createShortcodeTokenizer({
    plugins
  });
  methods.unshift('shortcode');
}

function createShortcodeTokenizer(_ref2) {
  let plugins = _ref2.plugins;
  return function tokenizeShortcode(eat, value, silent) {
    const potentialMatchValue = value.split('\n\n')[0];
    let match;
    const plugin = plugins.find(plugin => {
      match = potentialMatchValue.trim().match(plugin.pattern);
      return !!match;
    });

    if (match) {
      if (silent) {
        return true;
      }

      const shortcodeData = plugin.fromBlock(match);
      return eat(match[0])({
        type: 'shortcode',
        data: {
          shortcode: plugin.id,
          shortcodeData
        }
      });
    }
  };
}

function createRemarkShortcodeStringifier(_ref3) {
  let plugins = _ref3.plugins;
  return function remarkStringifyShortcodes() {
    const Compiler = this.Compiler;
    const visitors = Compiler.prototype.visitors;
    visitors.shortcode = shortcode;

    function shortcode(node) {
      const data = node.data;
      const plugin = plugins.find(plugin => data.shortcode === plugin.id);
      return plugin.toBlock(data.shortcodeData);
    }
  };
}