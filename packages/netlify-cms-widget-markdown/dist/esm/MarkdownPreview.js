"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _serializers = require("./serializers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MarkdownPreview = (_ref) => {
  let value = _ref.value,
      getAsset = _ref.getAsset;

  if (value === null) {
    return null;
  }

  const html = (0, _serializers.markdownToHtml)(value, getAsset);
  return _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, {
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
};

MarkdownPreview.propTypes = {
  getAsset: _propTypes.default.func.isRequired,
  value: _propTypes.default.string
};
var _default = MarkdownPreview;
exports.default = _default;