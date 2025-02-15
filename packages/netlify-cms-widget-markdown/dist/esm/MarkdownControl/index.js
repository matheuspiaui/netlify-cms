"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getEditorComponents = exports.getEditorControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _RawEditor = _interopRequireDefault(require("./RawEditor"));

var _VisualEditor = _interopRequireDefault(require("./VisualEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MODE_STORAGE_KEY = 'cms.md-mode';
let editorControl;

let _getEditorComponents = () => [];

const getEditorControl = () => editorControl;

exports.getEditorControl = getEditorControl;

const getEditorComponents = () => _getEditorComponents();

exports.getEditorComponents = getEditorComponents;

class MarkdownControl extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleMode", mode => {
      this.setState({
        mode
      });
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    });

    _defineProperty(this, "processRef", ref => this.ref = ref);

    editorControl = props.editorControl;
    _getEditorComponents = props.getEditorComponents;
    this.state = {
      mode: localStorage.getItem(MODE_STORAGE_KEY) || 'visual'
    };
  }

  render() {
    const _this$props = this.props,
          onChange = _this$props.onChange,
          onAddAsset = _this$props.onAddAsset,
          getAsset = _this$props.getAsset,
          value = _this$props.value,
          classNameWrapper = _this$props.classNameWrapper,
          field = _this$props.field,
          getEditorComponents = _this$props.getEditorComponents;
    const mode = this.state.mode;

    const visualEditor = _react.default.createElement("div", {
      className: "cms-editor-visual",
      ref: this.processRef
    }, _react.default.createElement(_VisualEditor.default, {
      onChange: onChange,
      onAddAsset: onAddAsset,
      onMode: this.handleMode,
      getAsset: getAsset,
      className: classNameWrapper,
      value: value,
      field: field,
      getEditorComponents: getEditorComponents
    }));

    const rawEditor = _react.default.createElement("div", {
      className: "cms-editor-raw",
      ref: this.processRef
    }, _react.default.createElement(_RawEditor.default, {
      onChange: onChange,
      onAddAsset: onAddAsset,
      onMode: this.handleMode,
      getAsset: getAsset,
      className: classNameWrapper,
      value: value,
      field: field
    }));

    return mode === 'visual' ? visualEditor : rawEditor;
  }

}

exports.default = MarkdownControl;

_defineProperty(MarkdownControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  onAddAsset: _propTypes.default.func.isRequired,
  getAsset: _propTypes.default.func.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  editorControl: _propTypes.default.func.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired,
  getEditorComponents: _propTypes.default.func
});

_defineProperty(MarkdownControl, "defaultProps", {
  value: ''
});