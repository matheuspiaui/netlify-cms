"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EditTableConfigured = exports.EditListConfigured = exports.BackspaceCloseBlockConfigured = exports.BreakToDefaultBlockConfigured = exports.ParagraphSoftBreakConfigured = exports.SoftBreakConfigured = void 0;

var _slate = require("slate");

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

var _slateEditList = _interopRequireDefault(require("slate-edit-list"));

var _slateEditTable = _interopRequireDefault(require("slate-edit-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SoftBreak = function SoftBreak() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    onKeyDown(event, change) {
      if (options.shift && !(0, _isHotkey.default)('shift+enter', event)) return;
      if (!options.shift && !(0, _isHotkey.default)('enter', event)) return;
      const onlyIn = options.onlyIn,
            ignoreIn = options.ignoreIn,
            _options$defaultBlock = options.defaultBlock,
            defaultBlock = _options$defaultBlock === void 0 ? 'paragraph' : _options$defaultBlock;
      const _change$value$startBl = change.value.startBlock,
            type = _change$value$startBl.type,
            text = _change$value$startBl.text;
      if (onlyIn && !onlyIn.includes(type)) return;
      if (ignoreIn && ignoreIn.includes(type)) return;
      const shouldClose = text.endsWith('\n');

      if (shouldClose) {
        return change.deleteBackward(1).insertBlock(defaultBlock);
      }

      const textNode = _slate.Text.create('\n');

      const breakNode = _slate.Inline.create({
        type: 'break',
        nodes: [textNode]
      });

      return change.insertInline(breakNode).insertText('').collapseToStartOfNextText();
    }

  };
};

const SoftBreakOpts = {
  onlyIn: ['quote', 'code']
};
const SoftBreakConfigured = SoftBreak(SoftBreakOpts);
exports.SoftBreakConfigured = SoftBreakConfigured;
const ParagraphSoftBreakConfigured = SoftBreak({
  onlyIn: ['paragraph'],
  shift: true
});
exports.ParagraphSoftBreakConfigured = ParagraphSoftBreakConfigured;

const BreakToDefaultBlock = (_ref) => {
  let _ref$onlyIn = _ref.onlyIn,
      onlyIn = _ref$onlyIn === void 0 ? [] : _ref$onlyIn,
      _ref$defaultBlock = _ref.defaultBlock,
      defaultBlock = _ref$defaultBlock === void 0 ? 'paragraph' : _ref$defaultBlock;
  return {
    onKeyDown(event, change) {
      const value = change.value;
      if (!(0, _isHotkey.default)('enter', event) || value.isExpanded) return;

      if (onlyIn.includes(value.startBlock.type)) {
        return change.insertBlock(defaultBlock);
      }
    }

  };
};

const BreakToDefaultBlockOpts = {
  onlyIn: ['heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six']
};
const BreakToDefaultBlockConfigured = BreakToDefaultBlock(BreakToDefaultBlockOpts);
exports.BreakToDefaultBlockConfigured = BreakToDefaultBlockConfigured;

const BackspaceCloseBlock = function BackspaceCloseBlock() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    onKeyDown(event, change) {
      if (event.key !== 'Backspace') return;
      const _options$defaultBlock2 = options.defaultBlock,
            defaultBlock = _options$defaultBlock2 === void 0 ? 'paragraph' : _options$defaultBlock2,
            ignoreIn = options.ignoreIn,
            onlyIn = options.onlyIn;
      const startBlock = change.value.startBlock;
      const type = startBlock.type;
      if (onlyIn && !onlyIn.includes(type)) return;
      if (ignoreIn && ignoreIn.includes(type)) return;

      if (startBlock.text === '') {
        return change.setBlocks(defaultBlock).focus();
      }
    }

  };
};

const BackspaceCloseBlockOpts = {
  ignoreIn: ['paragraph', 'list-item', 'bulleted-list', 'numbered-list', 'table', 'table-row', 'table-cell']
};
const BackspaceCloseBlockConfigured = BackspaceCloseBlock(BackspaceCloseBlockOpts);
exports.BackspaceCloseBlockConfigured = BackspaceCloseBlockConfigured;
const EditListOpts = {
  types: ['bulleted-list', 'numbered-list'],
  typeItem: 'list-item'
};
const EditListConfigured = (0, _slateEditList.default)(EditListOpts);
exports.EditListConfigured = EditListConfigured;
const EditTableOpts = {
  typeTable: 'table',
  typeRow: 'table-row',
  typeCell: 'table-cell'
};
const EditTableConfigured = (0, _slateEditTable.default)(EditTableOpts);
exports.EditTableConfigured = EditTableConfigured;
const plugins = [SoftBreakConfigured, ParagraphSoftBreakConfigured, BackspaceCloseBlockConfigured, BreakToDefaultBlockConfigured, EditListConfigured];
var _default = plugins;
exports.default = _default;