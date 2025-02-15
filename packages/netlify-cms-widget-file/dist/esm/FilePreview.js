"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FileLink = (
/*#__PURE__*/
0, _styledBase.default)((_ref) => {
  let value = _ref.value,
      getAsset = _ref.getAsset;
  return _react.default.createElement("a", {
    href: getAsset(value),
    rel: "noopener noreferrer",
    target: "_blank"
  }, value);
}, {
  target: "e1sxjo0z0",
  label: "FileLink"
})(process.env.NODE_ENV === "production" ? {
  name: "13o7eu2",
  styles: "display:block;"
} : {
  name: "13o7eu2",
  styles: "display:block;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9GaWxlUHJldmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVRSIsImZpbGUiOiIuLi8uLi9zcmMvRmlsZVByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgV2lkZ2V0UHJldmlld0NvbnRhaW5lciB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5jb25zdCBGaWxlTGluayA9IHN0eWxlZCgoeyB2YWx1ZSwgZ2V0QXNzZXQgfSkgPT4gKFxuICA8YSBocmVmPXtnZXRBc3NldCh2YWx1ZSl9IHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICB7dmFsdWV9XG4gIDwvYT5cbikpYFxuICBkaXNwbGF5OiBibG9jaztcbmA7XG5cbmZ1bmN0aW9uIEZpbGVMaW5rTGlzdCh7IHZhbHVlcywgZ2V0QXNzZXQgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICB7dmFsdWVzLm1hcCh2YWx1ZSA9PiAoXG4gICAgICAgIDxGaWxlTGluayBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9IGdldEFzc2V0PXtnZXRBc3NldH0gLz5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGaWxlQ29udGVudCh7IHZhbHVlLCBnZXRBc3NldCB9KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBMaXN0LmlzTGlzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gPEZpbGVMaW5rTGlzdCB2YWx1ZXM9e3ZhbHVlfSBnZXRBc3NldD17Z2V0QXNzZXR9IC8+O1xuICB9XG4gIHJldHVybiA8RmlsZUxpbmsgdmFsdWU9e3ZhbHVlfSBnZXRBc3NldD17Z2V0QXNzZXR9IC8+O1xufVxuXG5jb25zdCBGaWxlUHJldmlldyA9IHByb3BzID0+IChcbiAgPFdpZGdldFByZXZpZXdDb250YWluZXI+e3Byb3BzLnZhbHVlID8gPEZpbGVDb250ZW50IHsuLi5wcm9wc30gLz4gOiBudWxsfTwvV2lkZ2V0UHJldmlld0NvbnRhaW5lcj5cbik7XG5cbkZpbGVQcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHZhbHVlOiBQcm9wVHlwZXMubm9kZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVQcmV2aWV3O1xuIl19 */"
});

function FileLinkList(_ref2) {
  let values = _ref2.values,
      getAsset = _ref2.getAsset;
  return _react.default.createElement("div", null, values.map(value => _react.default.createElement(FileLink, {
    key: value,
    value: value,
    getAsset: getAsset
  })));
}

function FileContent(_ref3) {
  let value = _ref3.value,
      getAsset = _ref3.getAsset;

  if (Array.isArray(value) || _immutable.List.isList(value)) {
    return _react.default.createElement(FileLinkList, {
      values: value,
      getAsset: getAsset
    });
  }

  return _react.default.createElement(FileLink, {
    value: value,
    getAsset: getAsset
  });
}

const FilePreview = props => _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, null, props.value ? _react.default.createElement(FileContent, props) : null);

FilePreview.propTypes = {
  getAsset: _propTypes.default.func.isRequired,
  value: _propTypes.default.node
};
var _default = FilePreview;
exports.default = _default;