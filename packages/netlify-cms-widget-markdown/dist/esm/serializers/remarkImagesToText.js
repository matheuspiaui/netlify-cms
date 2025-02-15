"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remarkImagesToText;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Images must be parsed as shortcodes for asset proxying. This plugin converts
 * MDAST image nodes back to text to allow shortcode pattern matching. Note that
 * this transformation only occurs for images that are the sole child of a top
 * level paragraph - any other image is left alone and treated as an inline
 * image.
 */
function remarkImagesToText() {
  return transform;

  function transform(node) {
    const children = node.children.map(child => {
      if (child.type === 'paragraph' && child.children.length === 1 && child.children[0].type === 'image') {
        const _child$children$ = child.children[0],
              alt = _child$children$.alt,
              url = _child$children$.url,
              title = _child$children$.title;
        const value = `![${alt || ''}](${url || ''}${title ? ` "${title}"` : ''})`;
        child.children = [{
          type: 'text',
          value
        }];
      }

      return child;
    });
    return _objectSpread({}, node, {
      children
    });
  }
}