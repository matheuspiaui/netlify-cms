"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remarkUnwrapInvalidNest;

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _nth2 = _interopRequireDefault(require("lodash/nth"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _unistUtilVisitParents = _interopRequireDefault(require("unist-util-visit-parents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * remarkUnwrapInvalidNest
 *
 * Some MDAST node types can only be nested within specific node types - for
 * example, a paragraph can't be nested within another paragraph, and a heading
 * can't be nested in a "strong" type node. This kind of invalid MDAST can be
 * generated by rehype-remark from invalid HTML.
 *
 * This plugin finds instances of invalid nesting, and unwraps the invalidly
 * nested nodes as far up the parental line as necessary, splitting parent nodes
 * along the way. The resulting node has no invalidly nested nodes, and all
 * validly nested nodes retain their ancestry. Nodes that are emptied as a
 * result of unnesting nodes are removed from the tree.
 */
function remarkUnwrapInvalidNest() {
  return transform;

  function transform(tree) {
    const invalidNest = findInvalidNest(tree);
    if (!invalidNest) return tree;
    splitTreeAtNest(tree, invalidNest);
    return transform(tree);
  }
  /**
   * visitParents uses unist-util-visit-parent to check every node in the
   * tree while having access to every ancestor of the node. This is ideal
   * for determining whether a block node has an ancestor that should not
   * contain a block node. Note that it operates in a mutable fashion.
   */


  function findInvalidNest(tree) {
    /**
     * Node types that are considered "blocks".
     */
    const blocks = ['paragraph', 'heading', 'code', 'blockquote', 'list', 'table', 'thematicBreak'];
    /**
     * Node types that can contain "block" nodes as direct children. We check
     */

    const canContainBlocks = ['root', 'blockquote', 'listItem', 'tableCell'];
    let invalidNest;
    (0, _unistUtilVisitParents.default)(tree, (node, parents) => {
      const parentType = !(0, _isEmpty2.default)(parents) && (0, _last2.default)(parents).type;
      const isInvalidNest = blocks.includes(node.type) && !canContainBlocks.includes(parentType);

      if (isInvalidNest) {
        invalidNest = (0, _concat2.default)(parents, node);
        return false;
      }
    });
    return invalidNest;
  }

  function splitTreeAtNest(tree, nest) {
    const grandparent = (0, _nth2.default)(nest, -3) || tree;
    const parent = (0, _nth2.default)(nest, -2);
    const node = (0, _last2.default)(nest);
    const splitIndex = grandparent.children.indexOf(parent);
    const splitChildren = grandparent.children;
    const splitChildIndex = parent.children.indexOf(node);
    const childrenBefore = parent.children.slice(0, splitChildIndex);
    const childrenAfter = parent.children.slice(splitChildIndex + 1);

    const nodeBefore = !(0, _isEmpty2.default)(childrenBefore) && _objectSpread({}, parent, {
      children: childrenBefore
    });

    const nodeAfter = !(0, _isEmpty2.default)(childrenAfter) && _objectSpread({}, parent, {
      children: childrenAfter
    });

    const childrenToInsert = [nodeBefore, node, nodeAfter].filter(val => !(0, _isEmpty2.default)(val));
    const beforeChildren = splitChildren.slice(0, splitIndex);
    const afterChildren = splitChildren.slice(splitIndex + 1);
    const newChildren = (0, _concat2.default)(beforeChildren, childrenToInsert, afterChildren);
    grandparent.children = newChildren;
  }
}