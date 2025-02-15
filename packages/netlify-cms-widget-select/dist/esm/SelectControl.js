"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _immutable = require("immutable");

var _reactSelect = _interopRequireDefault(require("react-select"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function optionToString(option) {
  return option && option.value ? option.value : null;
}

function convertToOption(raw) {
  if (typeof raw === 'string') {
    return {
      label: raw,
      value: raw
    };
  }

  return _immutable.Map.isMap(raw) ? raw.toJS() : raw;
}

function getSelectedValue(_ref) {
  let value = _ref.value,
      options = _ref.options,
      isMultiple = _ref.isMultiple;

  if (isMultiple) {
    const selectedOptions = _immutable.List.isList(value) ? value.toJS() : value;

    if (!selectedOptions || !Array.isArray(selectedOptions)) {
      return null;
    }

    return selectedOptions.map(i => options.find(o => o.value === (i.value || i))).filter(Boolean).map(convertToOption);
  } else {
    return (0, _find2.default)(options, ['value', value]) || null;
  }
}

class SelectControl extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "handleChange", selectedOption => {
      const _this$props = this.props,
            onChange = _this$props.onChange,
            field = _this$props.field;
      const isMultiple = field.get('multiple', false);

      if (Array.isArray(selectedOption)) {
        if (!isMultiple && selectedOption.length === 0) {
          onChange(null);
        } else {
          onChange((0, _immutable.fromJS)(selectedOption.map(optionToString)));
        }
      } else {
        onChange(optionToString(selectedOption));
      }
    });
  }

  render() {
    const _this$props2 = this.props,
          field = _this$props2.field,
          value = _this$props2.value,
          forID = _this$props2.forID,
          classNameWrapper = _this$props2.classNameWrapper,
          setActiveStyle = _this$props2.setActiveStyle,
          setInactiveStyle = _this$props2.setInactiveStyle;
    const fieldOptions = field.get('options');
    const isMultiple = field.get('multiple', false);
    const isClearable = !field.get('required', true) || isMultiple;

    if (!fieldOptions) {
      return _react.default.createElement("div", null, "Error rendering select control for ", field.get('name'), ": No options");
    }

    const options = [...fieldOptions.map(convertToOption)];
    const selectedValue = getSelectedValue({
      options,
      value,
      isMultiple
    });
    return _react.default.createElement(_reactSelect.default, {
      inputId: forID,
      value: selectedValue,
      onChange: this.handleChange,
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      options: options,
      styles: _netlifyCmsUiDefault.reactSelectStyles,
      isMulti: isMultiple,
      isClearable: isClearable,
      placeholder: ""
    });
  }

}

exports.default = SelectControl;

_defineProperty(SelectControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.node,
  forID: _propTypes.default.string.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired,
  field: _reactImmutableProptypes.default.contains({
    options: _reactImmutableProptypes.default.listOf(_propTypes.default.oneOfType([_propTypes.default.string, _reactImmutableProptypes.default.contains({
      label: _propTypes.default.string.isRequired,
      value: _propTypes.default.string.isRequired
    })])).isRequired
  })
});