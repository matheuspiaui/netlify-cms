"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _netlifyCmsWidgetDate = _interopRequireDefault(require("netlify-cms-widget-date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DateControl = _netlifyCmsWidgetDate.default.controlComponent;

class DateTimeControl extends _react.default.Component {
  render() {
    return _react.default.createElement(DateControl, _extends({}, this.props, {
      includeTime: true
    }));
  }

}

exports.default = DateTimeControl;