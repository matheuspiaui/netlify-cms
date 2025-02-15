"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remarkToSlate;

var _flatMap2 = _interopRequireDefault(require("lodash/flatMap"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A Remark plugin for converting an MDAST to Slate Raw AST. Remark plugins
 * return a `transform` function that receives the MDAST as it's first argument.
 */
function remarkToSlate() {
  return transform;
}

function transform(node) {
  /**
   * Call `transform` recursively on child nodes.
   *
   * If a node returns a falsey value, filter it out. Some nodes do not
   * translate from MDAST to Slate, such as definitions for link/image
   * references or footnotes.
   */
  const children = !['strong', 'emphasis', 'delete'].includes(node.type) && !(0, _isEmpty2.default)(node.children) && (0, _flatMap2.default)(node.children, transform).filter(val => val);
  /**
   * Run individual nodes through the conversion factory.
   */

  return convertNode(node, children);
}
/**
 * Map of MDAST node types to Slate node types.
 */


const typeMap = {
  root: 'root',
  paragraph: 'paragraph',
  blockquote: 'quote',
  code: 'code',
  listItem: 'list-item',
  table: 'table',
  tableRow: 'table-row',
  tableCell: 'table-cell',
  thematicBreak: 'thematic-break',
  link: 'link',
  image: 'image',
  shortcode: 'shortcode'
};
/**
 * Map of MDAST node types to Slate mark types.
 */

const markMap = {
  strong: 'bold',
  emphasis: 'italic',
  delete: 'strikethrough',
  inlineCode: 'code'
};
/**
 * Add nodes to a parent node only if `nodes` is truthy.
 */

function addNodes(parent, nodes) {
  return nodes ? _objectSpread({}, parent, {
    nodes
  }) : parent;
}
/**
 * Create a Slate Inline node.
 */


function createBlock(type, nodes) {
  let props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!(0, _isArray2.default)(nodes)) {
    props = nodes;
    nodes = undefined;
  }

  const node = _objectSpread({
    object: 'block',
    type
  }, props);

  return addNodes(node, nodes);
}
/**
 * Create a Slate Block node.
 */


function createInline(type) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let nodes = arguments.length > 2 ? arguments[2] : undefined;

  const node = _objectSpread({
    object: 'inline',
    type
  }, props);

  return addNodes(node, nodes);
}
/**
 * Create a Slate Raw text node.
 */


function createText(value, data) {
  const node = {
    object: 'text',
    data
  };
  const leaves = (0, _isArray2.default)(value) ? value : [{
    text: value
  }];
  return _objectSpread({}, node, {
    leaves
  });
}

function processMarkNode(node) {
  let parentMarks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  /**
   * Add the current node's mark type to the marks collected from parent
   * mark nodes, if any.
   */
  const markType = markMap[node.type];
  const marks = markType ? [...parentMarks, {
    type: markMap[node.type]
  }] : parentMarks;
  const children = (0, _flatMap2.default)(node.children, childNode => {
    switch (childNode.type) {
      /**
       * If a text node is a direct child of the current node, it should be
       * set aside as a leaf, and all marks that have been collected in the
       * `marks` array should apply to that specific leaf.
       */
      case 'html':
      case 'text':
        return {
          text: childNode.value,
          marks
        };

      /**
       * MDAST inline code nodes don't have children, just a text value, similar
       * to a text node, so it receives the same treatment as a text node, but we
       * first add the inline code mark to the marks array.
       */

      case 'inlineCode':
        {
          const childMarks = [...marks, {
            type: markMap['inlineCode']
          }];
          return {
            text: childNode.value,
            marks: childMarks
          };
        }

      /**
       * Process nested style nodes. The recursive results should be pushed into
       * the leaves array. This way, every MDAST nested text structure becomes a
       * flat array of leaves that can serve as the value of a single Slate Raw
       * text node.
       */

      case 'strong':
      case 'emphasis':
      case 'delete':
        return processMarkNode(childNode, marks);

      /**
       * Remaining nodes simply need mark data added to them, and to then be
       * added into the cumulative children array.
       */

      default:
        return _objectSpread({}, childNode, {
          data: {
            marks
          }
        });
    }
  });
  return children;
}

function convertMarkNode(node) {
  const slateNodes = processMarkNode(node);
  const convertedSlateNodes = slateNodes.reduce((acc, node) => {
    const lastConvertedNode = (0, _last2.default)(acc);

    if (node.text && lastConvertedNode && lastConvertedNode.leaves) {
      lastConvertedNode.leaves.push(node);
    } else if (node.text) {
      acc.push(createText([node]));
    } else {
      acc.push(transform(node));
    }

    return acc;
  }, []);
  return convertedSlateNodes;
}
/**
 * Convert a single MDAST node to a Slate Raw node. Uses local node factories
 * that mimic the unist-builder function utilized in the slateRemark
 * transformer.
 */


function convertNode(node, nodes) {
  switch (node.type) {
    /**
     * General
     *
     * Convert simple cases that only require a type and children, with no
     * additional properties.
     */
    case 'root':
    case 'paragraph':
    case 'listItem':
    case 'blockquote':
    case 'tableRow':
    case 'tableCell':
      {
        return createBlock(typeMap[node.type], nodes);
      }

    /**
     * Shortcodes
     *
     * Shortcode nodes are represented as "void" blocks in the Slate AST. They
     * maintain the same data as MDAST shortcode nodes. Slate void blocks must
     * contain a blank text node.
     */

    case 'shortcode':
      {
        const data = node.data;
        const nodes = [createText('')];
        return createBlock(typeMap[node.type], nodes, {
          data,
          isVoid: true
        });
      }

    /**
     * Text
     *
     * Text and HTML nodes are both used to render text, and should be treated
     * the same. HTML is treated as text because we never want to escape or
     * encode it.
     */

    case 'text':
    case 'html':
      {
        return createText(node.value, node.data);
      }

    /**
     * Inline Code
     *
     * Inline code nodes from an MDAST are represented in our Slate schema as
     * text nodes with a "code" mark. We manually create the "leaf" containing
     * the inline code value and a "code" mark, and place it in an array for use
     * as a Slate text node's children array.
     */

    case 'inlineCode':
      {
        const leaf = {
          text: node.value,
          marks: [{
            type: 'code'
          }]
        };
        return createText([leaf]);
      }

    /**
     * Marks
     *
     * Marks are typically decorative sub-types that apply to text nodes. In an
     * MDAST, marks are nodes that can contain other nodes. This nested
     * hierarchy has to be flattened and split into distinct text nodes with
     * their own set of marks.
     */

    case 'strong':
    case 'emphasis':
    case 'delete':
      {
        return convertMarkNode(node);
      }

    /**
     * Headings
     *
     * MDAST headings use a single type with a separate "depth" property to
     * indicate the heading level, while the Slate schema uses a separate node
     * type for each heading level. Here we get the proper Slate node name based
     * on the MDAST node depth.
     */

    case 'heading':
      {
        const depthMap = {
          1: 'one',
          2: 'two',
          3: 'three',
          4: 'four',
          5: 'five',
          6: 'six'
        };
        const slateType = `heading-${depthMap[node.depth]}`;
        return createBlock(slateType, nodes);
      }

    /**
     * Code Blocks
     *
     * MDAST code blocks are a distinct node type with a simple text value. We
     * convert that value into a nested child text node for Slate. We also carry
     * over the "lang" data property if it's defined.
     */

    case 'code':
      {
        const data = {
          lang: node.lang
        };
        const text = createText(node.value);
        const nodes = [text];
        return createBlock(typeMap[node.type], nodes, {
          data
        });
      }

    /**
     * Lists
     *
     * MDAST has a single list type and an "ordered" property. We derive that
     * information into the Slate schema's distinct list node types. We also
     * include the "start" property, which indicates the number an ordered list
     * starts at, if defined.
     */

    case 'list':
      {
        const slateType = node.ordered ? 'numbered-list' : 'bulleted-list';
        const data = {
          start: node.start
        };
        return createBlock(slateType, nodes, {
          data
        });
      }

    /**
     * Breaks
     *
     * MDAST soft break nodes represent a trailing double space or trailing
     * slash from a Markdown document. In Slate, these are simply transformed to
     * line breaks within a text node.
     */

    case 'break':
      {
        const textNode = createText('\n');
        return createInline('break', {}, [textNode]);
      }

    /**
     * Thematic Breaks
     *
     * Thematic breaks are void nodes in the Slate schema.
     */

    case 'thematicBreak':
      {
        return createBlock(typeMap[node.type], {
          isVoid: true
        });
      }

    /**
     * Links
     *
     * MDAST stores the link attributes directly on the node, while our Slate
     * schema references them in the data object.
     */

    case 'link':
      {
        const title = node.title,
              url = node.url,
              data = node.data;

        const newData = _objectSpread({}, data, {
          title,
          url
        });

        return createInline(typeMap[node.type], {
          data: newData
        }, nodes);
      }

    /**
     * Images
     *
     * Identical to link nodes except for the lack of child nodes and addition
     * of alt attribute data MDAST stores the link attributes directly on the
     * node, while our Slate schema references them in the data object.
     */

    case 'image':
      {
        const title = node.title,
              url = node.url,
              alt = node.alt,
              data = node.data;

        const newData = _objectSpread({}, data, {
          title,
          alt,
          url
        });

        return createInline(typeMap[node.type], {
          isVoid: true,
          data: newData
        });
      }

    /**
     * Tables
     *
     * Tables are parsed separately because they may include an "align"
     * property, which should be passed to the Slate node.
     */

    case 'table':
      {
        const data = {
          align: node.align
        };
        return createBlock(typeMap[node.type], nodes, {
          data
        });
      }
  }
}