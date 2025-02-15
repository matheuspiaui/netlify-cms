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

const EditorToggleButton = (0, _styledBase.default)("button", {
  target: "e1drdo790",
  label: "EditorToggleButton"
})(_netlifyCmsUiDefault.buttons.button, ";", _netlifyCmsUiDefault.shadows.dropMiddle, ";background-color:", _netlifyCmsUiDefault.colorsRaw.white, ";color:", props => _netlifyCmsUiDefault.colors[props.isActive ? `active` : `inactive`], ";border-radius:32px;display:flex;justify-content:center;align-items:center;width:40px;height:40px;padding:0;margin-bottom:12px;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JUb2dnbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS3dDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JUb2dnbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IEljb24sIGNvbG9ycywgY29sb3JzUmF3LCBzaGFkb3dzLCBidXR0b25zIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IEVkaXRvclRvZ2dsZUJ1dHRvbiA9IHN0eWxlZC5idXR0b25gXG4gICR7YnV0dG9ucy5idXR0b259O1xuICAke3NoYWRvd3MuZHJvcE1pZGRsZX07XG4gIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzUmF3LndoaXRlfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gY29sb3JzW3Byb3BzLmlzQWN0aXZlID8gYGFjdGl2ZWAgOiBgaW5hY3RpdmVgXX07XG4gIGJvcmRlci1yYWRpdXM6IDMycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuYDtcblxuY29uc3QgRWRpdG9yVG9nZ2xlID0gKHsgZW5hYmxlZCwgYWN0aXZlLCBvbkNsaWNrLCBpY29uIH0pID0+XG4gICFlbmFibGVkID8gbnVsbCA6IChcbiAgICA8RWRpdG9yVG9nZ2xlQnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2t9IGlzQWN0aXZlPXthY3RpdmV9PlxuICAgICAgPEljb24gdHlwZT17aWNvbn0gc2l6ZT1cImxhcmdlXCIgLz5cbiAgICA8L0VkaXRvclRvZ2dsZUJ1dHRvbj5cbiAgKTtcblxuRWRpdG9yVG9nZ2xlLnByb3BUeXBlcyA9IHtcbiAgZW5hYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGljb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvclRvZ2dsZTtcbiJdfQ== */"));

const EditorToggle = (_ref) => {
  let enabled = _ref.enabled,
      active = _ref.active,
      onClick = _ref.onClick,
      icon = _ref.icon;
  return !enabled ? null : _react.default.createElement(EditorToggleButton, {
    onClick: onClick,
    isActive: active
  }, _react.default.createElement(_netlifyCmsUiDefault.Icon, {
    type: icon,
    size: "large"
  }));
};

EditorToggle.propTypes = {
  enabled: _propTypes.default.bool,
  active: _propTypes.default.bool,
  onClick: _propTypes.default.func.isRequired,
  icon: _propTypes.default.string.isRequired
};
var _default = EditorToggle;
exports.default = _default;