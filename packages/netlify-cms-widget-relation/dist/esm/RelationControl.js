"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _Async = _interopRequireDefault(require("react-select/lib/Async"));

var _immutable = require("immutable");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function optionToString(option) {
  return option && option.value ? option.value : '';
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

class RelationControl extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "didInitialSearch", false);

    _defineProperty(this, "handleChange", selectedOption => {
      const _this$props = this.props,
            onChange = _this$props.onChange,
            field = _this$props.field;
      let value;
      let metadata;

      if (Array.isArray(selectedOption)) {
        value = selectedOption.map(optionToString);
        metadata = !(0, _isEmpty2.default)(selectedOption) && {
          [field.get('name')]: {
            [field.get('collection')]: {
              [(0, _last2.default)(value)]: (0, _last2.default)(selectedOption).data
            }
          }
        } || {};
        onChange((0, _immutable.fromJS)(value), metadata);
      } else {
        value = optionToString(selectedOption);
        metadata = selectedOption && {
          [field.get('name')]: {
            [field.get('collection')]: {
              [value]: selectedOption.data
            }
          }
        };
        onChange(value, metadata);
      }
    });

    _defineProperty(this, "parseHitOptions", hits => {
      const field = this.props.field;
      const valueField = field.get('valueField');
      const displayField = field.get('displayFields') || field.get('valueField');
      return hits.map(hit => {
        return {
          data: hit.data,
          value: hit.data[valueField],
          label: _immutable.List.isList(displayField) ? displayField.toJS().map(key => hit.data[key]).join(' ') : hit.data[displayField]
        };
      });
    });

    _defineProperty(this, "loadOptions", (0, _debounce2.default)((term, callback) => {
      const _this$props2 = this.props,
            field = _this$props2.field,
            query = _this$props2.query,
            forID = _this$props2.forID;
      const collection = field.get('collection');
      const searchFields = field.get('searchFields');
      const searchFieldsArray = _immutable.List.isList(searchFields) ? searchFields.toJS() : [searchFields];
      query(forID, collection, searchFieldsArray, term).then((_ref2) => {
        let payload = _ref2.payload;
        let options = this.parseHitOptions(payload.response.hits);

        if (!this.allOptions && !term) {
          this.allOptions = options;
        }

        if (!term) {
          options = options.slice(0, 20);
        }

        callback(options);
      });
    }, 500));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value || this.props.hasActiveStyle !== nextProps.hasActiveStyle || this.props.queryHits !== nextProps.queryHits;
  }

  componentDidUpdate(prevProps) {
    /**
     * Load extra post data into the store after first query.
     */
    if (this.didInitialSearch) return;
    const _this$props3 = this.props,
          value = _this$props3.value,
          field = _this$props3.field,
          forID = _this$props3.forID,
          queryHits = _this$props3.queryHits,
          onChange = _this$props3.onChange;

    if (queryHits !== prevProps.queryHits && queryHits.get(forID)) {
      this.didInitialSearch = true;
      const valueField = field.get('valueField');
      const hits = queryHits.get(forID);

      if (value) {
        const listValue = _immutable.List.isList(value) ? value : (0, _immutable.List)([value]);
        listValue.forEach(val => {
          const hit = hits.find(i => i.data[valueField] === val);

          if (hit) {
            onChange(value, {
              [field.get('name')]: {
                [field.get('collection')]: {
                  [val]: hit.data
                }
              }
            });
          }
        });
      }
    }
  }

  render() {
    const _this$props4 = this.props,
          value = _this$props4.value,
          field = _this$props4.field,
          forID = _this$props4.forID,
          classNameWrapper = _this$props4.classNameWrapper,
          setActiveStyle = _this$props4.setActiveStyle,
          setInactiveStyle = _this$props4.setInactiveStyle,
          queryHits = _this$props4.queryHits;
    const isMultiple = field.get('multiple', false);
    const isClearable = !field.get('required', true) || isMultiple;
    const hits = queryHits.get(forID, []);
    const options = this.allOptions || this.parseHitOptions(hits);
    const selectedValue = getSelectedValue({
      options,
      value,
      isMultiple
    });
    return _react.default.createElement(_Async.default, {
      value: selectedValue,
      inputId: forID,
      defaultOptions: true,
      loadOptions: this.loadOptions,
      onChange: this.handleChange,
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      styles: _netlifyCmsUiDefault.reactSelectStyles,
      isMulti: isMultiple,
      isClearable: isClearable,
      placeholder: ""
    });
  }

}

exports.default = RelationControl;

_defineProperty(RelationControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  forID: _propTypes.default.string.isRequired,
  value: _propTypes.default.node,
  field: _reactImmutableProptypes.default.map,
  fetchID: _propTypes.default.string,
  query: _propTypes.default.func.isRequired,
  queryHits: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired
});