"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledToolbarButton = (0, _styledBase.default)("button", {
  target: "ejt81md0",
  label: "StyledToolbarButton"
})(_netlifyCmsUiDefault.buttons.button, ";display:inline-block;padding:6px;border:none;background-color:transparent;font-size:16px;color:", props => props.isActive ? '#1e2532' : 'inherit', ";cursor:pointer;&:disabled{cursor:auto;opacity:0.5;}", _netlifyCmsUiDefault.Icon, "{display:block;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVG9vbGJhckJ1dHRvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLeUMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9Ub29sYmFyQnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBJY29uLCBidXR0b25zIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFN0eWxlZFRvb2xiYXJCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiA2cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gKHByb3BzLmlzQWN0aXZlID8gJyMxZTI1MzInIDogJ2luaGVyaXQnKX07XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmRpc2FibGVkIHtcbiAgICBjdXJzb3I6IGF1dG87XG4gICAgb3BhY2l0eTogMC41O1xuICB9XG5cbiAgJHtJY29ufSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbmA7XG5cbmNvbnN0IFRvb2xiYXJCdXR0b24gPSAoeyB0eXBlLCBsYWJlbCwgaWNvbiwgb25DbGljaywgaXNBY3RpdmUsIGlzSGlkZGVuLCBkaXNhYmxlZCB9KSA9PiB7XG4gIGlmIChpc0hpZGRlbikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkVG9vbGJhckJ1dHRvblxuICAgICAgaXNBY3RpdmU9e2lzQWN0aXZlICYmIHR5cGUgJiYgaXNBY3RpdmUodHlwZSl9XG4gICAgICBvbkNsaWNrPXtlID0+IG9uQ2xpY2sgJiYgb25DbGljayhlLCB0eXBlKX1cbiAgICAgIHRpdGxlPXtsYWJlbH1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICA+XG4gICAgICB7aWNvbiA/IDxJY29uIHR5cGU9e2ljb259IC8+IDogbGFiZWx9XG4gICAgPC9TdHlsZWRUb29sYmFyQnV0dG9uPlxuICApO1xufTtcblxuVG9vbGJhckJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGljb246IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICBpc0FjdGl2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGlzSGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9vbGJhckJ1dHRvbjtcbiJdfQ== */"));

const ToolbarButton = (_ref) => {
  let type = _ref.type,
      label = _ref.label,
      icon = _ref.icon,
      _onClick = _ref.onClick,
      isActive = _ref.isActive,
      isHidden = _ref.isHidden,
      disabled = _ref.disabled;

  if (isHidden) {
    return null;
  }

  return _react.default.createElement(StyledToolbarButton, {
    isActive: isActive && type && isActive(type),
    onClick: e => _onClick && _onClick(e, type),
    title: label,
    disabled: disabled
  }, icon ? _react.default.createElement(_netlifyCmsUiDefault.Icon, {
    type: icon
  }) : label);
};

ToolbarButton.propTypes = {
  type: _propTypes.default.string,
  label: _propTypes.default.string.isRequired,
  icon: _propTypes.default.string,
  onClick: _propTypes.default.func,
  isActive: _propTypes.default.func,
  isHidden: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
var _default = ToolbarButton;
exports.default = _default;