"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SelectPreview = (_ref) => {
  let value = _ref.value;
  return _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, null, value ? value.toString() : null);
};

SelectPreview.propTypes = {
  value: _propTypes.default.string
};
var _default = SelectPreview;
exports.default = _default;