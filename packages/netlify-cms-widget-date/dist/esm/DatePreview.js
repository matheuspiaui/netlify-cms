"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DatePreview = (_ref) => {
  let value = _ref.value;
  return _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, null, value ? value.toString() : null);
};

DatePreview.propTypes = {
  value: _propTypes.default.object
};
var _default = DatePreview;
exports.default = _default;