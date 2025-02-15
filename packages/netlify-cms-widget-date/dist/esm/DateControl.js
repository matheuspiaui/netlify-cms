"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _reactDatetime = _interopRequireDefault(require("react-datetime/css/react-datetime.css"));

var _reactDatetime2 = _interopRequireDefault(require("react-datetime"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DateControl extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "formats", this.getFormats());

    _defineProperty(this, "isValidDate", datetime => _moment.default.isMoment(datetime) || datetime instanceof Date || datetime === '');

    _defineProperty(this, "handleChange", datetime => {
      /**
       * Set the date only if it is valid.
       */
      if (!this.isValidDate(datetime)) {
        return;
      }

      const onChange = this.props.onChange;
      const format = this.formats.format;
      /**
       * Produce a formatted string only if a format is set in the config.
       * Otherwise produce a date object.
       */

      if (format) {
        const formattedValue = (0, _moment.default)(datetime).format(format);
        onChange(formattedValue);
      } else {
        const value = _moment.default.isMoment(datetime) ? datetime.toDate() : datetime;
        onChange(value);
      }
    });

    _defineProperty(this, "onBlur", datetime => {
      const setInactiveStyle = this.props.setInactiveStyle;

      if (!this.isValidDate(datetime)) {
        const parsedDate = (0, _moment.default)(datetime);

        if (parsedDate.isValid()) {
          this.handleChange(datetime);
        } else {
          window.alert('The date you entered is invalid.');
        }
      }

      setInactiveStyle();
    });
  }

  getFormats() {
    const _this$props = this.props,
          field = _this$props.field,
          includeTime = _this$props.includeTime;
    const format = field.get('format'); // dateFormat and timeFormat are strictly for modifying
    // input field with the date/time pickers

    const dateFormat = field.get('dateFormat'); // show time-picker? false hides it, true shows it using default format

    let timeFormat = field.get('timeFormat');

    if (typeof timeFormat === 'undefined') {
      timeFormat = !!includeTime;
    }

    return {
      format,
      dateFormat,
      timeFormat
    };
  }

  componentDidMount() {
    const value = this.props.value;
    /**
     * Set the current date as default value if no default value is provided. An
     * empty string means the value is intentionally blank.
     */

    if (!value && value !== '') {
      setTimeout(() => {
        this.handleChange(new Date());
      }, 0);
    }
  } // Date is valid if datetime is a moment or Date object otherwise it's a string.
  // Handle the empty case, if the user wants to empty the field.


  render() {
    const _this$props2 = this.props,
          forID = _this$props2.forID,
          value = _this$props2.value,
          classNameWrapper = _this$props2.classNameWrapper,
          setActiveStyle = _this$props2.setActiveStyle;
    const _this$formats = this.formats,
          format = _this$formats.format,
          dateFormat = _this$formats.dateFormat,
          timeFormat = _this$formats.timeFormat;
    return (0, _core.jsx)("div", {
      css:
      /*#__PURE__*/
      (0, _core.css)(_reactDatetime.default, ";label:DateControl;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlQ29udHJvbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwR2dCIiwiZmlsZSI6Ii4uLy4uL3NyYy9EYXRlQ29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBqc3gsIGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHJlYWN0RGF0ZVRpbWVTdHlsZXMgZnJvbSAncmVhY3QtZGF0ZXRpbWUvY3NzL3JlYWN0LWRhdGV0aW1lLmNzcyc7XG5pbXBvcnQgRGF0ZVRpbWUgZnJvbSAncmVhY3QtZGF0ZXRpbWUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlQ29udHJvbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZmllbGQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBmb3JJRDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWVXcmFwcGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc2V0QWN0aXZlU3R5bGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2V0SW5hY3RpdmVTdHlsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm9iamVjdCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIGluY2x1ZGVUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBnZXRGb3JtYXRzKCkge1xuICAgIGNvbnN0IHsgZmllbGQsIGluY2x1ZGVUaW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZvcm1hdCA9IGZpZWxkLmdldCgnZm9ybWF0Jyk7XG5cbiAgICAvLyBkYXRlRm9ybWF0IGFuZCB0aW1lRm9ybWF0IGFyZSBzdHJpY3RseSBmb3IgbW9kaWZ5aW5nXG4gICAgLy8gaW5wdXQgZmllbGQgd2l0aCB0aGUgZGF0ZS90aW1lIHBpY2tlcnNcbiAgICBjb25zdCBkYXRlRm9ybWF0ID0gZmllbGQuZ2V0KCdkYXRlRm9ybWF0Jyk7XG4gICAgLy8gc2hvdyB0aW1lLXBpY2tlcj8gZmFsc2UgaGlkZXMgaXQsIHRydWUgc2hvd3MgaXQgdXNpbmcgZGVmYXVsdCBmb3JtYXRcbiAgICBsZXQgdGltZUZvcm1hdCA9IGZpZWxkLmdldCgndGltZUZvcm1hdCcpO1xuICAgIGlmICh0eXBlb2YgdGltZUZvcm1hdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRpbWVGb3JtYXQgPSAhIWluY2x1ZGVUaW1lO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBmb3JtYXQsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGltZUZvcm1hdCxcbiAgICB9O1xuICB9XG5cbiAgZm9ybWF0cyA9IHRoaXMuZ2V0Rm9ybWF0cygpO1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnQgZGF0ZSBhcyBkZWZhdWx0IHZhbHVlIGlmIG5vIGRlZmF1bHQgdmFsdWUgaXMgcHJvdmlkZWQuIEFuXG4gICAgICogZW1wdHkgc3RyaW5nIG1lYW5zIHRoZSB2YWx1ZSBpcyBpbnRlbnRpb25hbGx5IGJsYW5rLlxuICAgICAqL1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UobmV3IERhdGUoKSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICAvLyBEYXRlIGlzIHZhbGlkIGlmIGRhdGV0aW1lIGlzIGEgbW9tZW50IG9yIERhdGUgb2JqZWN0IG90aGVyd2lzZSBpdCdzIGEgc3RyaW5nLlxuICAvLyBIYW5kbGUgdGhlIGVtcHR5IGNhc2UsIGlmIHRoZSB1c2VyIHdhbnRzIHRvIGVtcHR5IHRoZSBmaWVsZC5cbiAgaXNWYWxpZERhdGUgPSBkYXRldGltZSA9PlxuICAgIG1vbWVudC5pc01vbWVudChkYXRldGltZSkgfHwgZGF0ZXRpbWUgaW5zdGFuY2VvZiBEYXRlIHx8IGRhdGV0aW1lID09PSAnJztcblxuICBoYW5kbGVDaGFuZ2UgPSBkYXRldGltZSA9PiB7XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkYXRlIG9ubHkgaWYgaXQgaXMgdmFsaWQuXG4gICAgICovXG4gICAgaWYgKCF0aGlzLmlzVmFsaWREYXRlKGRhdGV0aW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBmb3JtYXQgfSA9IHRoaXMuZm9ybWF0cztcblxuICAgIC8qKlxuICAgICAqIFByb2R1Y2UgYSBmb3JtYXR0ZWQgc3RyaW5nIG9ubHkgaWYgYSBmb3JtYXQgaXMgc2V0IGluIHRoZSBjb25maWcuXG4gICAgICogT3RoZXJ3aXNlIHByb2R1Y2UgYSBkYXRlIG9iamVjdC5cbiAgICAgKi9cbiAgICBpZiAoZm9ybWF0KSB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IG1vbWVudChkYXRldGltZSkuZm9ybWF0KGZvcm1hdCk7XG4gICAgICBvbkNoYW5nZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gbW9tZW50LmlzTW9tZW50KGRhdGV0aW1lKSA/IGRhdGV0aW1lLnRvRGF0ZSgpIDogZGF0ZXRpbWU7XG4gICAgICBvbkNoYW5nZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIG9uQmx1ciA9IGRhdGV0aW1lID0+IHtcbiAgICBjb25zdCB7IHNldEluYWN0aXZlU3R5bGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXRoaXMuaXNWYWxpZERhdGUoZGF0ZXRpbWUpKSB7XG4gICAgICBjb25zdCBwYXJzZWREYXRlID0gbW9tZW50KGRhdGV0aW1lKTtcblxuICAgICAgaWYgKHBhcnNlZERhdGUuaXNWYWxpZCgpKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKGRhdGV0aW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hbGVydCgnVGhlIGRhdGUgeW91IGVudGVyZWQgaXMgaW52YWxpZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmFjdGl2ZVN0eWxlKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZm9ySUQsIHZhbHVlLCBjbGFzc05hbWVXcmFwcGVyLCBzZXRBY3RpdmVTdHlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGZvcm1hdCwgZGF0ZUZvcm1hdCwgdGltZUZvcm1hdCB9ID0gdGhpcy5mb3JtYXRzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICR7cmVhY3REYXRlVGltZVN0eWxlc307XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxEYXRlVGltZVxuICAgICAgICAgIGRhdGVGb3JtYXQ9e2RhdGVGb3JtYXR9XG4gICAgICAgICAgdGltZUZvcm1hdD17dGltZUZvcm1hdH1cbiAgICAgICAgICB2YWx1ZT17bW9tZW50KHZhbHVlLCBmb3JtYXQpfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICBvbkZvY3VzPXtzZXRBY3RpdmVTdHlsZX1cbiAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyfVxuICAgICAgICAgIGlucHV0UHJvcHM9e3sgY2xhc3NOYW1lOiBjbGFzc05hbWVXcmFwcGVyLCBpZDogZm9ySUQgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */"))
    }, (0, _core.jsx)(_reactDatetime2.default, {
      dateFormat: dateFormat,
      timeFormat: timeFormat,
      value: (0, _moment.default)(value, format),
      onChange: this.handleChange,
      onFocus: setActiveStyle,
      onBlur: this.onBlur,
      inputProps: {
        className: classNameWrapper,
        id: forID
      }
    }));
  }

}

exports.default = DateControl;

_defineProperty(DateControl, "propTypes", {
  field: _propTypes.default.object.isRequired,
  forID: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  includeTime: _propTypes.default.bool
});