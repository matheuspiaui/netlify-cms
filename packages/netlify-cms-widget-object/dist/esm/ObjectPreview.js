"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectPreview = (_ref) => {
  let field = _ref.field;
  return _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, null, field && field.get('fields') || field.get('field') || null);
};

ObjectPreview.propTypes = {
  field: _propTypes.default.node
};
var _default = ObjectPreview;
exports.default = _default;