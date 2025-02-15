"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@emotion/core");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = process.env.NODE_ENV === "production" ? {
  name: "1mnv7s1-TextControl",
  styles: "font-family:inherit;label:TextControl;"
} : {
  name: "1mnv7s1-TextControl",
  styles: "font-family:inherit;label:TextControl;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXh0Q29udHJvbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpRFEiLCJmaWxlIjoiLi4vLi4vc3JjL1RleHRDb250cm9sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFRleHRhcmVhIGZyb20gJ3JlYWN0LXRleHRhcmVhLWF1dG9zaXplJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dENvbnRyb2wgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGZvcklEOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMubm9kZSxcbiAgICBjbGFzc05hbWVXcmFwcGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc2V0QWN0aXZlU3R5bGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2V0SW5hY3RpdmVTdHlsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHZhbHVlOiAnJyxcbiAgfTtcblxuICAvKipcbiAgICogQWx3YXlzIHVwZGF0ZSB0byBlbnN1cmUgYHJlYWN0LXRleHRhcmVhLWF1dG9zaXplYCBwcm9wZXJseSBjYWxjdWxhdGVzXG4gICAqIGhlaWdodC4gQ2VydGFpbiBzaXR1YXRpb25zLCBzdWNoIGFzIHRoaXMgd2lkZ2V0IGJlaW5nIG5lc3RlZCBpbiBhIGxpc3RcbiAgICogaXRlbSB0aGF0IGdldHMgcmVhcnJhbmdlZCwgY2FuIGxlYXZlIHRoZSB0ZXh0YXJlYSBpbiBhIG1pbmltYWwgaGVpZ2h0XG4gICAqIHN0YXRlLiBBbHdheXMgdXBkYXRpbmcgdGhpcyBwYXJ0aWN1bGFyIHdpZGdldCBzaG91bGQgZ2VuZXJhbGx5IGJlIGxvdyBjb3N0LFxuICAgKiBidXQgdGhpcyBzaG91bGQgYmUgb3B0aW1pemVkIGluIHRoZSBmdXR1cmUuXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZm9ySUQsXG4gICAgICB2YWx1ZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgY2xhc3NOYW1lV3JhcHBlcixcbiAgICAgIHNldEFjdGl2ZVN0eWxlLFxuICAgICAgc2V0SW5hY3RpdmVTdHlsZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8VGV4dGFyZWFcbiAgICAgICAgaWQ9e2ZvcklEfVxuICAgICAgICB2YWx1ZT17dmFsdWUgfHwgJyd9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lV3JhcHBlcn1cbiAgICAgICAgb25Gb2N1cz17c2V0QWN0aXZlU3R5bGV9XG4gICAgICAgIG9uQmx1cj17c2V0SW5hY3RpdmVTdHlsZX1cbiAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiAnMTQwcHgnIH19XG4gICAgICAgIGNzcz17eyBmb250RmFtaWx5OiAnaW5oZXJpdCcgfX1cbiAgICAgICAgb25DaGFuZ2U9e2UgPT4gb25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iXX0= */"
};

class TextControl extends _react.default.Component {
  /**
   * Always update to ensure `react-textarea-autosize` properly calculates
   * height. Certain situations, such as this widget being nested in a list
   * item that gets rearranged, can leave the textarea in a minimal height
   * state. Always updating this particular widget should generally be low cost,
   * but this should be optimized in the future.
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const _this$props = this.props,
          forID = _this$props.forID,
          value = _this$props.value,
          _onChange = _this$props.onChange,
          classNameWrapper = _this$props.classNameWrapper,
          setActiveStyle = _this$props.setActiveStyle,
          setInactiveStyle = _this$props.setInactiveStyle;
    return (0, _core.jsx)(_reactTextareaAutosize.default, {
      id: forID,
      value: value || '',
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      style: {
        minHeight: '140px'
      },
      css: _ref,
      onChange: e => _onChange(e.target.value)
    });
  }

}

exports.default = TextControl;

_defineProperty(TextControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  forID: _propTypes.default.string,
  value: _propTypes.default.node,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired
});

_defineProperty(TextControl, "defaultProps", {
  value: ''
});