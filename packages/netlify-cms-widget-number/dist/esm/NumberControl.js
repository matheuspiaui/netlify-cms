"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ValidationErrorTypes = {
  PRESENCE: 'PRESENCE',
  PATTERN: 'PATTERN',
  RANGE: 'RANGE',
  CUSTOM: 'CUSTOM'
};

class NumberControl extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "handleChange", e => {
      const valueType = this.props.field.get('valueType');
      const onChange = this.props.onChange;
      const value = valueType === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value, 10);

      if (!isNaN(value)) {
        onChange(value);
      } else {
        onChange('');
      }
    });

    _defineProperty(this, "isValid", () => {
      const _this$props = this.props,
            field = _this$props.field,
            value = _this$props.value,
            t = _this$props.t;
      const hasPattern = !!field.get('pattern', false);
      const min = field.get('min', false);
      const max = field.get('max', false);
      let error; // Pattern overrides min/max logic always:

      if (hasPattern) {
        return true;
      }

      switch (true) {
        case min !== false && max !== false && (value < min || value > max):
          error = {
            type: ValidationErrorTypes.RANGE,
            message: t('editor.editorControlPane.widget.range', {
              fieldLabel: field.get('label', field.get('name')),
              minValue: min,
              maxValue: max
            })
          };
          break;

        case min !== false && value < min:
          error = {
            type: ValidationErrorTypes.RANGE,
            message: t('editor.editorControlPane.widget.min', {
              fieldLabel: field.get('label', field.get('name')),
              minValue: min
            })
          };
          break;

        case max !== false && value > max:
          error = {
            type: ValidationErrorTypes.RANGE,
            message: t('editor.editorControlPane.widget.max', {
              fieldLabel: field.get('label', field.get('name')),
              maxValue: max
            })
          };
          break;

        default:
          return true;
      }

      return {
        error
      };
    });
  }

  render() {
    const _this$props2 = this.props,
          field = _this$props2.field,
          value = _this$props2.value,
          classNameWrapper = _this$props2.classNameWrapper,
          forID = _this$props2.forID,
          setActiveStyle = _this$props2.setActiveStyle,
          setInactiveStyle = _this$props2.setInactiveStyle;
    const min = field.get('min', '');
    const max = field.get('max', '');
    const step = field.get('step', field.get('valueType') === 'int' ? 1 : '');
    return _react.default.createElement("input", {
      type: "number",
      id: forID,
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      value: value || (value === 0 ? value : ''),
      step: step,
      min: min,
      max: max,
      onChange: this.handleChange
    });
  }

}

exports.default = NumberControl;

_defineProperty(NumberControl, "propTypes", {
  field: _reactImmutableProptypes.default.map.isRequired,
  onChange: _propTypes.default.func.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired,
  value: _propTypes.default.node,
  forID: _propTypes.default.string,
  valueType: _propTypes.default.string,
  step: _propTypes.default.number,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  t: _propTypes.default.func.isRequired
});

_defineProperty(NumberControl, "defaultProps", {
  value: ''
});