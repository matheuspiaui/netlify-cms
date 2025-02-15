"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slateToRemark;

var _sortBy2 = _interopRequireDefault(require("lodash/sortBy"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _flatMap2 = _interopRequireDefault(require("lodash/flatMap"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _get5 = _interopRequireDefault(require("lodash/get"));

var _unistBuilder = _interopRequireDefault(require("unist-builder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Map of Slate node types to MDAST/Remark node types.
 */
const typeMap = {
  root: 'root',
  paragraph: 'paragraph',
  'heading-one': 'heading',
  'heading-two': 'heading',
  'heading-three': 'heading',
  'heading-four': 'heading',
  'heading-five': 'heading',
  'heading-six': 'heading',
  quote: 'blockquote',
  code: 'code',
  'numbered-list': 'list',
  'bulleted-list': 'list',
  'list-item': 'listItem',
  table: 'table',
  'table-row': 'tableRow',
  'table-cell': 'tableCell',
  break: 'break',
  'thematic-break': 'thematicBreak',
  link: 'link',
  image: 'image',
  shortcode: 'shortcode'
};
/**
 * Map of Slate mark types to MDAST/Remark node types.
 */

const markMap = {
  bold: 'strong',
  italic: 'emphasis',
  strikethrough: 'delete',
  code: 'inlineCode'
};

function slateToRemark(raw) {
  /**
   * The Slate Raw AST generally won't have a top level type, so we set it to
   * "root" for clarity.
   */
  raw.type = 'root';
  return transform(raw);
}
/**
 * The transform function mimics the approach of a Remark plugin for
 * conformity with the other serialization functions. This function converts
 * Slate nodes to MDAST nodes, and recursively calls itself to process child
 * nodes to arbitrary depth.
 */


function transform(node) {
  /**
   * Combine adjacent text and inline nodes before processing so they can
   * share marks.
   */
  const combinedChildren = node.nodes && combineTextAndInline(node.nodes);
  /**
   * Call `transform` recursively on child nodes, and flatten the resulting
   * array.
   */

  const children = !(0, _isEmpty2.default)(combinedChildren) && (0, _flatMap2.default)(combinedChildren, transform);
  /**
   * Run individual nodes through conversion factories.
   */

  return ['text'].includes(node.object) ? convertTextNode(node) : convertNode(node, children);
}
/**
 * Includes inline nodes as leaves in adjacent text nodes where appropriate, so
 * that mark node combining logic can apply to both text and inline nodes. This
 * is necessary because Slate doesn't allow inline nodes to have marks while
 * inline nodes in MDAST may be nested within mark nodes. Treating them as if
 * they were text is a bit of a necessary hack.
 */


function combineTextAndInline(nodes) {
  return nodes.reduce((acc, node) => {
    const prevNode = (0, _last2.default)(acc);
    const prevNodeLeaves = (0, _get5.default)(prevNode, 'leaves');
    const data = node.data || {};
    /**
     * If the previous node has leaves and the current node has marks in data
     * (only happens when we place them on inline nodes here in the parser), or
     * the current node also has leaves (because the previous node was
     * originally an inline node that we've already squashed into a leaf)
     * combine the current node into the previous.
     */

    if (!(0, _isEmpty2.default)(prevNodeLeaves) && !(0, _isEmpty2.default)(data.marks)) {
      prevNodeLeaves.push({
        node,
        marks: data.marks
      });
      return acc;
    }

    if (!(0, _isEmpty2.default)(prevNodeLeaves) && !(0, _isEmpty2.default)(node.leaves)) {
      prevNode.leaves = prevNodeLeaves.concat(node.leaves);
      return acc;
    }
    /**
     * Break nodes contain a single child text node with a newline character
     * for visual purposes in the editor, but Remark break nodes have no
     * children, so we remove the child node here.
     */


    if (node.type === 'break') {
      acc.push({
        object: 'inline',
        type: 'break'
      });
      return acc;
    }
    /**
     * Convert remaining inline nodes to standalone text nodes with leaves.
     */


    if (node.object === 'inline') {
      acc.push({
        object: 'text',
        leaves: [{
          node,
          marks: data.marks
        }]
      });
      return acc;
    }
    /**
     * Only remaining case is an actual text node, can be pushed as is.
     */


    acc.push(node);
    return acc;
  }, []);
}
/**
 * Slate treats inline code decoration as a standard mark, but MDAST does
 * not allow inline code nodes to contain children, only a single text
 * value. An MDAST inline code node can be nested within mark nodes such
 * as "emphasis" and "strong", but it cannot contain them.
 *
 * Because of this, if a "code" mark (translated to MDAST "inlineCode") is
 * in the markTypes array, we make the base text node an "inlineCode" type
 * instead of a standard text node.
 */


function processCodeMark(markTypes) {
  const isInlineCode = markTypes.includes('inlineCode');
  const filteredMarkTypes = isInlineCode ? (0, _without2.default)(markTypes, 'inlineCode') : markTypes;
  const textNodeType = isInlineCode ? 'inlineCode' : 'html';
  return {
    filteredMarkTypes,
    textNodeType
  };
}
/**
 * Converts a Slate Raw text node to an MDAST text node.
 *
 * Slate text nodes without marks often simply have a "text" property with
 * the value. In this case the conversion to MDAST is simple. If a Slate
 * text node does not have a "text" property, it will instead have a
 * "leaves" property containing an array of objects, each with an array of
 * marks, such as "bold" or "italic", along with a "text" property.
 *
 * MDAST instead expresses such marks in a nested structure, with individual
 * nodes for each mark type nested until the deepest mark node, which will
 * contain the text node.
 *
 * To convert a Slate text node's marks to MDAST, we treat each "leaf" as a
 * separate text node, convert the text node itself to an MDAST text node,
 * and then recursively wrap the text node for each mark, collecting the results
 * of each leaf in a single array of child nodes.
 *
 * For example, this Slate text node:
 *
 * {
 *   object: 'text',
 *   leaves: [
 *     {
 *       text: 'test',
 *       marks: ['bold', 'italic']
 *     },
 *     {
 *       text: 'test two'
 *     }
 *   ]
 * }
 *
 * ...would be converted to this MDAST nested structure:
 *
 * [
 *   {
 *     type: 'strong',
 *     children: [{
 *       type: 'emphasis',
 *       children: [{
 *         type: 'text',
 *         value: 'test'
 *       }]
 *     }]
 *   },
 *   {
 *     type: 'text',
 *     value: 'test two'
 *   }
 * ]
 *
 * This example also demonstrates how a single Slate node may need to be
 * replaced with multiple MDAST nodes, so the resulting array must be flattened.
 */


function convertTextNode(node) {
  /**
   * If the Slate text node has a "leaves" property, translate the Slate AST to
   * a nested MDAST structure. Otherwise, just return an equivalent MDAST text
   * node.
   */
  if (node.leaves) {
    const processedLeaves = node.leaves.map(processLeaves); // Compensate for Slate including leading and trailing whitespace in styled text nodes, which
    // cannot be represented in markdown (https://github.com/netlify/netlify-cms/issues/1448)

    for (let i = 0; i < processedLeaves.length; i += 1) {
      const leaf = processedLeaves[i];

      if (leaf.marks.length > 0 && leaf.text && leaf.text.trim() !== leaf.text) {
        const _leaf$text$match = leaf.text.match(/^(\s*).*?(\s*)$/),
              _leaf$text$match2 = _slicedToArray(_leaf$text$match, 3),
              leadingWhitespace = _leaf$text$match2[1],
              trailingWhitespace = _leaf$text$match2[2]; // Move the leading whitespace to a separate unstyled leaf, unless the current leaf
        // is preceded by another one with (at least) the same marks applied:


        if (leadingWhitespace.length > 0 && (i === 0 || !leaf.marks.every(mark => processedLeaves[i - 1].marks && processedLeaves[i - 1].marks.includes(mark)))) {
          processedLeaves.splice(i, 0, {
            text: leadingWhitespace,
            marks: [],
            textNodeType: leaf.textNodeType
          });
          i += 1;
          leaf.text = leaf.text.replace(/^\s+/, '');
        } // Move the trailing whitespace to a separate unstyled leaf, unless the current leaf
        // is followed by another one with (at least) the same marks applied:


        if (trailingWhitespace.length > 0 && (i === processedLeaves.length - 1 || !leaf.marks.every(mark => processedLeaves[i + 1].marks && processedLeaves[i + 1].marks.includes(mark)))) {
          processedLeaves.splice(i + 1, 0, {
            text: trailingWhitespace,
            marks: [],
            textNodeType: leaf.textNodeType
          });
          i += 1;
          leaf.text = leaf.text.replace(/\s+$/, '');
        }
      }
    }

    const condensedNodes = processedLeaves.reduce(condenseNodesReducer, {
      nodes: []
    });
    return condensedNodes.nodes;
  }

  if (node.object === 'inline') {
    return transform(node);
  }

  return (0, _unistBuilder.default)('html', node.text);
}
/**
 * Process Slate node leaves in preparation for MDAST transformation.
 */


function processLeaves(leaf) {
  /**
   * Get an array of the mark types, converted to their MDAST equivalent
   * types.
   */
  const _leaf$marks = leaf.marks,
        marks = _leaf$marks === void 0 ? [] : _leaf$marks,
        text = leaf.text;
  const markTypes = marks.map(mark => markMap[mark.type]);

  if (typeof leaf.text === 'string') {
    /**
     * Code marks must be removed from the marks array, and the presence of a
     * code mark changes the text node type that should be used.
     */
    const _processCodeMark = processCodeMark(markTypes),
          filteredMarkTypes = _processCodeMark.filteredMarkTypes,
          textNodeType = _processCodeMark.textNodeType;

    return {
      text,
      marks: filteredMarkTypes,
      textNodeType
    };
  }

  return {
    node: leaf.node,
    marks: markTypes
  };
}
/**
 * Slate's AST doesn't group adjacent text nodes with the same marks - a
 * change in marks from letter to letter, even if some are in common, results
 * in a separate leaf. For example, given "**a_b_**", transformation to and
 * from Slate's AST will result in "**a****_b_**".
 *
 * MDAST treats styling entities as distinct nodes that contain children, so a
 * "strong" node can contain a plain text node with a sibling "emphasis" node,
 * which contains more text. This reducer serves to create an optimized nested
 * MDAST without the typical redundancies that Slate's AST would produce if
 * transformed as-is. The reducer can be called recursively to produce nested
 * structures.
 */


function condenseNodesReducer(acc, node, idx, nodes) {
  /**
   * Skip any nodes that are being processed as children of an MDAST node
   * through recursive calls.
   */
  if (typeof acc.nextIndex === 'number' && acc.nextIndex > idx) {
    return acc;
  }
  /**
   * Processing for nodes with marks.
   */


  if (node.marks && node.marks.length > 0) {
    /**
     * For each mark on the current node, get the number of consecutive nodes
     * (starting with this one) that have the mark. Whichever mark covers the
     * most nodes is used as the parent node, and the nodes with that mark are
     * processed as children. If the greatest number of consecutive nodes is
     * tied between multiple marks, there is no priority as to which goes
     * first.
     */
    const markLengths = node.marks.map(mark => getMarkLength(mark, nodes.slice(idx)));
    const parentMarkLength = (0, _last2.default)((0, _sortBy2.default)(markLengths, 'length'));
    const parentType = parentMarkLength.markType,
          parentLength = parentMarkLength.length;
    /**
     * Since this and any consecutive nodes with the parent mark are going to
     * be processed as children of the parent mark, this reducer should simply
     * return the accumulator until after the last node to be covered by the
     * new parent node. Here we set the next index that should be processed,
     * if any.
     */

    const newNextIndex = idx + parentLength;
    /**
     * Get the set of nodes that should be processed as children of the new
     * parent mark node, run each through the reducer as children of the
     * parent node, and create the parent MDAST node with the resulting
     * children.
     */

    const children = nodes.slice(idx, newNextIndex);
    const denestedChildren = children.map(child => _objectSpread({}, child, {
      marks: (0, _without2.default)(child.marks, parentType)
    }));
    const mdastChildren = denestedChildren.reduce(condenseNodesReducer, {
      nodes: [],
      parentType
    }).nodes;
    const mdastNode = (0, _unistBuilder.default)(parentType, mdastChildren);
    return _objectSpread({}, acc, {
      nodes: [...acc.nodes, mdastNode],
      nextIndex: newNextIndex
    });
  }
  /**
   * Create the base text node, and pass in the array of mark types as data
   * (helpful when optimizing/condensing the final structure).
   */


  const baseNode = typeof node.text === 'string' ? (0, _unistBuilder.default)(node.textNodeType, {
    marks: node.marks
  }, node.text) : transform(node.node);
  /**
   * Recursively wrap the base text node in the individual mark nodes, if
   * any exist.
   */

  return _objectSpread({}, acc, {
    nodes: [...acc.nodes, baseNode]
  });
}
/**
 * Get the number of consecutive Slate nodes containing a given mark beginning
 * from the first received node.
 */


function getMarkLength(markType, nodes) {
  let length = 0;

  while (nodes[length] && nodes[length].marks.includes(markType)) {
    ++length;
  }

  return {
    markType,
    length
  };
}
/**
 * Convert a single Slate Raw node to an MDAST node. Uses the unist-builder `u`
 * function to create MDAST nodes.
 */


function convertNode(node, children) {
  switch (node.type) {
    /**
     * General
     *
     * Convert simple cases that only require a type and children, with no
     * additional properties.
     */
    case 'root':
    case 'paragraph':
    case 'quote':
    case 'list-item':
    case 'table':
    case 'table-row':
    case 'table-cell':
      {
        return (0, _unistBuilder.default)(typeMap[node.type], children);
      }

    /**
     * Shortcodes
     *
     * Shortcode nodes only exist in Slate's Raw AST if they were inserted
     * via the plugin toolbar in memory, so they should always have
     * shortcode data attached. The "shortcode" data property contains the
     * name of the registered shortcode plugin, and the "shortcodeData" data
     * property contains the data received from the shortcode plugin's
     * `fromBlock` method when the shortcode node was created.
     *
     * Here we create a `shortcode` MDAST node that contains only the shortcode
     * data.
     */

    case 'shortcode':
      {
        const data = node.data;
        return (0, _unistBuilder.default)(typeMap[node.type], {
          data
        });
      }

    /**
     * Headings
     *
     * Slate schemas don't usually infer basic type info from data, so each
     * level of heading is a separately named type. The MDAST schema just
     * has a single "heading" type with the depth stored in a "depth"
     * property on the node. Here we derive the depth from the Slate node
     * type - e.g., for "heading-two", we need a depth value of "2".
     */

    case 'heading-one':
    case 'heading-two':
    case 'heading-three':
    case 'heading-four':
    case 'heading-five':
    case 'heading-six':
      {
        const depthMap = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6
        };
        const depthText = node.type.split('-')[1];
        const depth = depthMap[depthText];
        return (0, _unistBuilder.default)(typeMap[node.type], {
          depth
        }, children);
      }

    /**
     * Code Blocks
     *
     * Code block nodes have a single text child, and may have a code language
     * stored in the "lang" data property. Here we transfer both the node
     * value and the "lang" data property to the new MDAST node.
     */

    case 'code':
      {
        const value = (0, _flatMap2.default)(node.nodes, child => {
          return (0, _flatMap2.default)(child.leaves, 'text');
        }).join('');

        const _get2 = (0, _get5.default)(node, 'data', {}),
              lang = _get2.lang,
              data = _objectWithoutProperties(_get2, ["lang"]);

        return (0, _unistBuilder.default)(typeMap[node.type], {
          lang,
          data
        }, value);
      }

    /**
     * Lists
     *
     * Our Slate schema has separate node types for ordered and unordered
     * lists, but the MDAST spec uses a single type with a boolean "ordered"
     * property to indicate whether the list is numbered. The MDAST spec also
     * allows for a "start" property to indicate the first number used for an
     * ordered list. Here we translate both values to our Slate schema.
     */

    case 'numbered-list':
    case 'bulleted-list':
      {
        const ordered = node.type === 'numbered-list';
        const props = {
          ordered,
          start: (0, _get5.default)(node.data, 'start') || 1
        };
        return (0, _unistBuilder.default)(typeMap[node.type], props, children);
      }

    /**
     * Breaks
     *
     * Breaks don't have children. We parse them separately for clarity.
     */

    case 'break':
    case 'thematic-break':
      {
        return (0, _unistBuilder.default)(typeMap[node.type]);
      }

    /**
     * Links
     *
     * The url and title attributes of link nodes are stored in properties on
     * the node for both Slate and Remark schemas.
     */

    case 'link':
      {
        const _get3 = (0, _get5.default)(node, 'data', {}),
              url = _get3.url,
              title = _get3.title,
              data = _objectWithoutProperties(_get3, ["url", "title"]);

        return (0, _unistBuilder.default)(typeMap[node.type], {
          url,
          title,
          data
        }, children);
      }

    /**
     * Images
     *
     * This transformation is almost identical to that of links, except for the
     * lack of child nodes and addition of `alt` attribute data.
     */

    case 'image':
      {
        const _get4 = (0, _get5.default)(node, 'data', {}),
              url = _get4.url,
              title = _get4.title,
              alt = _get4.alt,
              data = _objectWithoutProperties(_get4, ["url", "title", "alt"]);

        return (0, _unistBuilder.default)(typeMap[node.type], {
          url,
          title,
          alt,
          data
        });
      }

    /**
     * No default case is supplied because an unhandled case should never
     * occur. In the event that it does, let the error throw (for now).
     */
  }
}