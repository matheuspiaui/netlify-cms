"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remarkSquashReferences;

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _unistBuilder = _interopRequireDefault(require("unist-builder"));

var _mdastUtilDefinitions = _interopRequireDefault(require("mdast-util-definitions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Raw markdown may contain image references or link references. Because there
 * is no way to maintain these references within the Slate AST, we convert image
 * and link references to standard images and links by putting their url's
 * inline. The definitions are then removed from the document.
 *
 * For example, the following markdown:
 *
 * ```
 * ![alpha][bravo]
 *
 * [bravo]: http://example.com/example.jpg
 * ```
 *
 * Yields:
 *
 * ```
 * ![alpha](http://example.com/example.jpg)
 * ```
 *
 */
function remarkSquashReferences() {
  return getTransform;

  function getTransform(node) {
    const getDefinition = (0, _mdastUtilDefinitions.default)(node);
    return transform.call(null, getDefinition, node);
  }

  function transform(getDefinition, node) {
    /**
     * Bind the `getDefinition` function to `transform` and recursively map all
     * nodes.
     */
    const boundTransform = transform.bind(null, getDefinition);
    const children = node.children ? node.children.map(boundTransform) : node.children;
    /**
     * Combine reference and definition nodes into standard image and link
     * nodes.
     */

    if (['imageReference', 'linkReference'].includes(node.type)) {
      const type = node.type === 'imageReference' ? 'image' : 'link';
      const definition = getDefinition(node.identifier);

      if (definition) {
        const title = definition.title,
              url = definition.url;
        return (0, _unistBuilder.default)(type, {
          title,
          url,
          alt: node.alt
        }, children);
      }

      const pre = (0, _unistBuilder.default)('text', node.type === 'imageReference' ? '![' : '[');
      const post = (0, _unistBuilder.default)('text', ']');
      const nodes = children || [(0, _unistBuilder.default)('text', node.alt)];
      return [pre, ...nodes, post];
    }
    /**
     * Remove definition nodes and filter the resulting null values from the
     * filtered children array.
     */


    if (node.type === 'definition') {
      return null;
    }

    const filteredChildren = (0, _without2.default)(children, null);
    return _objectSpread({}, node, {
      children: (0, _flatten2.default)(filteredChildren)
    });
  }
}