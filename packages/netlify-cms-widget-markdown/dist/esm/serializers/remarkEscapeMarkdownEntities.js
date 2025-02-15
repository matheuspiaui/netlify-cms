"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remarkEscapeMarkdownEntities;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _partial2 = _interopRequireDefault(require("lodash/partial"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _regexHelper = require("../regexHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Reusable regular expressions segments.
 */
const patternSegments = {
  /**
   * Matches zero or more HTML attributes followed by the tag close bracket,
   * which may be prepended by zero or more spaces.  The attributes can use
   * single or double quotes and may be prepended by zero or more spaces.
   */
  htmlOpeningTagEnd: /(?: *\w+=(?:(?:"[^"]*")|(?:'[^']*')))* *>/
};
/**
 * Patterns matching substrings that should not be escaped. Array values must be
 * joined before use.
 */

const nonEscapePatterns = {
  /**
   * HTML Tags
   *
   * Matches HTML opening tags and any attributes. Does not check for contents
   * between tags or closing tags.
   */
  htmlTags: [
  /**
   * Matches the beginning of an HTML tag, excluding preformatted tag types.
   */
  /<(?!pre|style|script)[\w]+/,
  /**
   * Matches attributes.
   */
  patternSegments.htmlOpeningTagEnd],

  /**
   * Preformatted HTML Blocks
   *
   * Matches HTML blocks with preformatted content. The content of these blocks,
   * including the tags and attributes, should not be escaped at all.
   */
  preformattedHtmlBlocks: [
  /**
   * Matches the names of tags known to have preformatted content. The capture
   * group is reused when matching the closing tag.
   *
   * NOTE: this pattern reuses a capture group, and could break if combined with
   * other expressions using capture groups.
   */
  /<(pre|style|script)/,
  /**
   * Matches attributes.
   */
  patternSegments.htmlOpeningTagEnd,
  /**
   * Allow zero or more of any character (including line breaks) between the
   * tags. Match lazily in case of subsequent blocks.
   */
  /(.|[\n\r])*?/,
  /**
   * Match closing tag via first capture group.
   */
  /<\/\1>/]
};
/**
 * Escape patterns
 *
 * Each escape pattern matches a markdown entity and captures up to two
 * groups. These patterns must use one of the following formulas:
 *
 * - Single capture group followed by match content - /(...).../
 *   The captured characters should be escaped and the remaining match should
 *   remain unchanged.
 *
 * - Two capture groups surrounding matched content - /(...)...(...)/
 *   The captured characters in both groups should be escaped and the matched
 *   characters in between should remain unchanged.
 */

const escapePatterns = [
/**
 * Emphasis/Bold - Asterisk
 *
 * Match strings surrounded by one or more asterisks on both sides.
 */
/(\*+)[^*]*(\1)/g,
/**
 * Emphasis - Underscore
 *
 * Match strings surrounded by a single underscore on both sides followed by
 * a word boundary. Remark disregards whether a word boundary exists at the
 * beginning of an emphasis node.
 */
/(_)[^_]+(_)\b/g,
/**
 * Bold - Underscore
 *
 * Match strings surrounded by multiple underscores on both sides. Remark
 * disregards the absence of word boundaries on either side of a bold node.
 */
/(_{2,})[^_]*(\1)/g,
/**
 * Strikethrough
 *
 * Match strings surrounded by multiple tildes on both sides.
 */
/(~+)[^~]*(\1)/g,
/**
 * Inline Code
 *
 * Match strings surrounded by backticks.
 */
/(`+)[^`]*(\1)/g,
/**
 * Links, Images, References, and Footnotes
 *
 * Match strings surrounded by brackets. This could be improved to
 * specifically match only the exact syntax of each covered entity, but
 * doing so through current approach would incur a considerable performance
 * penalty.
 */
/(\[)[^\]]*]/g];
/**
 * Generate new non-escape expression. The non-escape expression matches
 * substrings whose contents should not be processed for escaping.
 */

const joinedNonEscapePatterns = (0, _map2.default)(nonEscapePatterns, pattern => {
  return new RegExp((0, _regexHelper.joinPatternSegments)(pattern));
});
const nonEscapePattern = (0, _regexHelper.combinePatterns)(joinedNonEscapePatterns);
/**
 * Create chain of successive escape functions for various markdown entities.
 */

const escapeFunctions = escapePatterns.map(pattern => (0, _partial2.default)(escapeDelimiters, pattern));
const escapeAll = (0, _flow2.default)(escapeFunctions);
/**
 * Executes both the `escapeCommonChars` and `escapeLeadingChars` functions.
 */

function escapeAllChars(text) {
  const partiallyEscapedMarkdown = escapeCommonChars(text);
  return escapeLeadingChars(partiallyEscapedMarkdown);
}
/**
 * escapeLeadingChars
 *
 * Handles escaping for characters that must be positioned at the beginning of
 * the string, such as headers and list items.
 *
 * Escapes '#', '*', '-', '>', '=', '|', and sequences of 3+ backticks or 4+
 * spaces when found at the beginning of a string, preceded by zero or more
 * whitespace characters.
 */


function escapeLeadingChars(text) {
  return text.replace(/^\s*([-#*>=|]| {4,}|`{3,})/, '$`\\$1');
}
/**
 * escapeCommonChars
 *
 * Escapes active markdown entities. See escape pattern groups for details on
 * which entities are replaced.
 */


function escapeCommonChars(text) {
  /**
   * Generate new non-escape expression (must happen at execution time because
   * we use `RegExp.exec`, which tracks it's own state internally).
   */
  const nonEscapeExpression = new RegExp(nonEscapePattern, 'gm');
  /**
   * Use `replaceWhen` to escape markdown entities only within substrings that
   * are eligible for escaping.
   */

  return (0, _regexHelper.replaceWhen)(nonEscapeExpression, escapeAll, text, true);
}
/**
 * escapeDelimiters
 *
 * Executes `String.replace` for a given pattern, but only on the first two
 * capture groups. Specifically intended for escaping opening (and optionally
 * closing) markdown entities without escaping the content in between.
 */


function escapeDelimiters(pattern, text) {
  return text.replace(pattern, (match, start, end) => {
    const hasEnd = typeof end === 'string';
    const matchSliceEnd = hasEnd ? match.length - end.length : match.length;
    const content = match.slice(start.length, matchSliceEnd);
    return `${escape(start)}${content}${hasEnd ? escape(end) : ''}`;
  });
}
/**
 * escape
 *
 * Simple replacement function for escaping markdown entities. Prepends every
 * character in the received string with a backslash.
 */


function escape(delim) {
  let result = '';

  for (const char of delim) {
    result += `\\${char}`;
  }

  return result;
}
/**
 * A Remark plugin for escaping markdown entities.
 *
 * When markdown entities are entered in raw markdown, they don't appear as
 * characters in the resulting AST; for example, dashes surrounding a piece of
 * text cause the text to be inserted in a special node type, but the asterisks
 * themselves aren't present as text. Therefore, we generally don't expect to
 * encounter markdown characters in text nodes.
 *
 * However, the CMS visual editor does not interpret markdown characters, and
 * users will expect these characters to be represented literally. In that case,
 * we need to escape them, otherwise they'll be interpreted during
 * stringification.
 */


function remarkEscapeMarkdownEntities() {
  const transform = (node, index) => {
    /**
     * Shortcode nodes will intentionally inject markdown entities in text node
     * children not be escaped.
     */
    if ((0, _has2.default)(node.data, 'shortcode')) return node;
    const children = node.children && node.children.map(transform);
    /**
     * Escape characters in text and html nodes only. We store a lot of normal
     * text in html nodes to keep Remark from escaping html entities.
     */

    if (['text', 'html'].includes(node.type)) {
      /**
       * Escape all characters if this is the first child node, otherwise only
       * common characters.
       */
      const value = index === 0 ? escapeAllChars(node.value) : escapeCommonChars(node.value);
      return _objectSpread({}, node, {
        value,
        children
      });
    }
    /**
     * Always return nodes with recursively mapped children.
     */


    return _objectSpread({}, node, {
      children
    });
  };

  return transform;
}