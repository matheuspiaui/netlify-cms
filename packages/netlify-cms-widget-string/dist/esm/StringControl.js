"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StringControl extends _react.default.Component {
  render() {
    const _this$props = this.props,
          forID = _this$props.forID,
          value = _this$props.value,
          _onChange = _this$props.onChange,
          classNameWrapper = _this$props.classNameWrapper,
          setActiveStyle = _this$props.setActiveStyle,
          setInactiveStyle = _this$props.setInactiveStyle;
    return _react.default.createElement("input", {
      type: "text",
      id: forID,
      className: classNameWrapper,
      value: value || '',
      onChange: e => _onChange(e.target.value),
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle
    });
  }

}

exports.default = StringControl;

_defineProperty(StringControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  forID: _propTypes.default.string,
  value: _propTypes.default.node,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired
});

_defineProperty(StringControl, "defaultProps", {
  value: ''
});