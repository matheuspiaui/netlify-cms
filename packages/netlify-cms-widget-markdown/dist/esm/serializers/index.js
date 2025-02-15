"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slateToMarkdown = exports.markdownToSlate = exports.htmlToSlate = exports.markdownToHtml = exports.remarkToMarkdown = exports.markdownToRemark = void 0;

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _unified = _interopRequireDefault(require("unified"));

var _unistBuilder = _interopRequireDefault(require("unist-builder"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

var _remarkStringify = _interopRequireDefault(require("remark-stringify"));

var _remarkRehype = _interopRequireDefault(require("remark-rehype"));

var _rehypeStringify = _interopRequireDefault(require("rehype-stringify"));

var _rehypeParse = _interopRequireDefault(require("rehype-parse"));

var _rehypeRemark = _interopRequireDefault(require("rehype-remark"));

var _remarkRehypeShortcodes = _interopRequireDefault(require("./remarkRehypeShortcodes"));

var _rehypePaperEmoji = _interopRequireDefault(require("./rehypePaperEmoji"));

var _remarkAssertParents = _interopRequireDefault(require("./remarkAssertParents"));

var _remarkPaddedLinks = _interopRequireDefault(require("./remarkPaddedLinks"));

var _remarkWrapHtml = _interopRequireDefault(require("./remarkWrapHtml"));

var _remarkSlate = _interopRequireDefault(require("./remarkSlate"));

var _remarkSquashReferences = _interopRequireDefault(require("./remarkSquashReferences"));

var _remarkShortcodes = require("./remarkShortcodes");

var _remarkEscapeMarkdownEntities = _interopRequireDefault(require("./remarkEscapeMarkdownEntities"));

var _remarkStripTrailingBreaks = _interopRequireDefault(require("./remarkStripTrailingBreaks"));

var _remarkAllowHtmlEntities = _interopRequireDefault(require("./remarkAllowHtmlEntities"));

var _slateRemark = _interopRequireDefault(require("./slateRemark"));

var _MarkdownControl = require("../MarkdownControl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This module contains all serializers for the Markdown widget.
 *
 * The value of a Markdown widget is transformed to various formats during
 * editing, and these formats are referenced throughout serializer source
 * documentation. Below is brief glossary of the formats used.
 *
 * - Markdown {string}
 *   The stringified Markdown value. The value of the field is persisted
 *   (stored) in this format, and the stringified value is also used when the
 *   editor is in "raw" Markdown mode.
 *
 * - MDAST {object}
 *   Also loosely referred to as "Remark". MDAST stands for MarkDown AST
 *   (Abstract Syntax Tree), and is an object representation of a Markdown
 *   document. Underneath, it's a Unist tree with a Markdown-specific schema.
 *   MDAST syntax is a part of the Unified ecosystem, and powers the Remark
 *   processor, so Remark plugins may be used.
 *
 * - HAST {object}
 *   Also loosely referred to as "Rehype". HAST, similar to MDAST, is an object
 *   representation of an HTML document.  The field value takes this format
 *   temporarily before the document is stringified to HTML.
 *
 * - HTML {string}
 *   The field value is stringifed to HTML for preview purposes - the HTML value
 *   is never parsed, it is output only.
 *
 * - Slate Raw AST {object}
 *   Slate's Raw AST is a very simple and unopinionated object representation of
 *   a document in a Slate editor. We define our own Markdown-specific schema
 *   for serialization to/from Slate's Raw AST and MDAST.
 */

/**
 * Deserialize a Markdown string to an MDAST.
 */
const markdownToRemark = markdown => {
  /**
   * Parse the Markdown string input to an MDAST.
   */
  const parsed = (0, _unified.default)().use(_remarkParse.default, {
    fences: true,
    commonmark: true
  }).use(markdownToRemarkRemoveTokenizers, {
    inlineTokenizers: ['url']
  }).use(_remarkShortcodes.remarkParseShortcodes, {
    plugins: (0, _MarkdownControl.getEditorComponents)()
  }).use(_remarkAllowHtmlEntities.default).parse(markdown);
  /**
   * Further transform the MDAST with plugins.
   */

  const result = (0, _unified.default)().use(_remarkSquashReferences.default).runSync(parsed);
  return result;
};
/**
 * Remove named tokenizers from the parser, effectively deactivating them.
 */


exports.markdownToRemark = markdownToRemark;

function markdownToRemarkRemoveTokenizers(_ref) {
  let inlineTokenizers = _ref.inlineTokenizers;
  inlineTokenizers && inlineTokenizers.forEach(tokenizer => {
    delete this.Parser.prototype.inlineTokenizers[tokenizer];
  });
}
/**
 * Serialize an MDAST to a Markdown string.
 */


const remarkToMarkdown = obj => {
  /**
   * Rewrite the remark-stringify text visitor to simply return the text value,
   * without encoding or escaping any characters. This means we're completely
   * trusting the markdown that we receive.
   */
  function remarkAllowAllText() {
    const Compiler = this.Compiler;
    const visitors = Compiler.prototype.visitors;

    visitors.text = node => node.value;
  }
  /**
   * Provide an empty MDAST if no value is provided.
   */


  const mdast = obj || (0, _unistBuilder.default)('root', [(0, _unistBuilder.default)('paragraph', [(0, _unistBuilder.default)('text', '')])]);
  const remarkToMarkdownPluginOpts = {
    commonmark: true,
    fences: true,
    listItemIndent: '1',

    /**
     * Settings to emulate the defaults from the Prosemirror editor, not
     * necessarily optimal. Should eventually be configurable.
     */
    bullet: '*',
    strong: '*',
    rule: '-'
  };
  /**
   * Transform the MDAST with plugins.
   */

  const processedMdast = (0, _unified.default)().use(_remarkEscapeMarkdownEntities.default).use(_remarkStripTrailingBreaks.default).runSync(mdast);
  const markdown = (0, _unified.default)().use(_remarkStringify.default, remarkToMarkdownPluginOpts).use(remarkAllowAllText).use((0, _remarkShortcodes.createRemarkShortcodeStringifier)({
    plugins: (0, _MarkdownControl.getEditorComponents)()
  })).stringify(processedMdast);
  /**
   * Return markdown with trailing whitespace removed.
   */

  return (0, _trimEnd2.default)(markdown);
};
/**
 * Convert Markdown to HTML.
 */


exports.remarkToMarkdown = remarkToMarkdown;

const markdownToHtml = (markdown, getAsset) => {
  const mdast = markdownToRemark(markdown);
  const hast = (0, _unified.default)().use(_remarkRehypeShortcodes.default, {
    plugins: (0, _MarkdownControl.getEditorComponents)(),
    getAsset
  }).use(_remarkRehype.default, {
    allowDangerousHTML: true
  }).runSync(mdast);
  const html = (0, _unified.default)().use(_rehypeStringify.default, {
    allowDangerousHTML: true,
    allowDangerousCharacters: true
  }).stringify(hast);
  return html;
};
/**
 * Deserialize an HTML string to Slate's Raw AST. Currently used for HTML
 * pastes.
 */


exports.markdownToHtml = markdownToHtml;

const htmlToSlate = html => {
  const hast = (0, _unified.default)().use(_rehypeParse.default, {
    fragment: true
  }).parse(html);
  const mdast = (0, _unified.default)().use(_rehypePaperEmoji.default).use(_rehypeRemark.default, {
    minify: false
  }).runSync(hast);
  const slateRaw = (0, _unified.default)().use(_remarkAssertParents.default).use(_remarkPaddedLinks.default).use(_remarkWrapHtml.default).use(_remarkSlate.default).runSync(mdast);
  return slateRaw;
};
/**
 * Convert Markdown to Slate's Raw AST.
 */


exports.htmlToSlate = htmlToSlate;

const markdownToSlate = markdown => {
  const mdast = markdownToRemark(markdown);
  const slateRaw = (0, _unified.default)().use(_remarkWrapHtml.default).use(_remarkSlate.default).runSync(mdast);
  return slateRaw;
};
/**
 * Convert a Slate Raw AST to Markdown.
 *
 * Requires shortcode plugins to parse shortcode nodes back to text.
 *
 * Note that Unified is not utilized for the conversion from Slate's Raw AST to
 * MDAST. The conversion is manual because Unified can only operate on Unist
 * trees.
 */


exports.markdownToSlate = markdownToSlate;

const slateToMarkdown = raw => {
  const mdast = (0, _slateRemark.default)(raw, {
    shortcodePlugins: (0, _MarkdownControl.getEditorComponents)()
  });
  const markdown = remarkToMarkdown(mdast);
  return markdown;
};

exports.slateToMarkdown = slateToMarkdown;