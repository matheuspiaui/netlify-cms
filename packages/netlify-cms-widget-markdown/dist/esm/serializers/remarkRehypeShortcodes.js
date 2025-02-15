"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remarkToRehypeShortcodes;

var _has2 = _interopRequireDefault(require("lodash/has"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _server = require("react-dom/server");

var _unistBuilder = _interopRequireDefault(require("unist-builder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This plugin doesn't actually transform Remark (MDAST) nodes to Rehype
 * (HAST) nodes, but rather, it prepares an MDAST shortcode node for HAST
 * conversion by replacing the shortcode text with stringified HTML for
 * previewing the shortcode output.
 */
function remarkToRehypeShortcodes(_ref) {
  let plugins = _ref.plugins,
      getAsset = _ref.getAsset;
  return transform;

  function transform(root) {
    const transformedChildren = (0, _map2.default)(root.children, processShortcodes);
    return _objectSpread({}, root, {
      children: transformedChildren
    });
  }
  /**
   * Mapping function to transform nodes that contain shortcodes.
   */


  function processShortcodes(node) {
    /**
     * If the node doesn't contain shortcode data, return the original node.
     */
    if (!(0, _has2.default)(node, ['data', 'shortcode'])) return node;
    /**
     * Get shortcode data from the node, and retrieve the matching plugin by
     * key.
     */

    const _node$data = node.data,
          shortcode = _node$data.shortcode,
          shortcodeData = _node$data.shortcodeData;
    const plugin = plugins.get(shortcode);
    /**
     * Run the shortcode plugin's `toPreview` method, which will return either
     * an HTML string or a React component. If a React component is returned,
     * render it to an HTML string.
     */

    const value = plugin.toPreview(shortcodeData, getAsset);
    const valueHtml = typeof value === 'string' ? value : (0, _server.renderToString)(value);
    /**
     * Return a new 'html' type node containing the shortcode preview markup.
     */

    const textNode = (0, _unistBuilder.default)('html', valueHtml);
    const children = [textNode];
    return _objectSpread({}, node, {
      children
    });
  }
}