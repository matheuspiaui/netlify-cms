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

const StyledImage = (
/*#__PURE__*/
0, _styledBase.default)((_ref) => {
  let getAsset = _ref.getAsset,
      value = _ref.value;
  return _react.default.createElement("img", {
    src: getAsset(value),
    role: "presentation"
  });
}, {
  target: "e1ksx8c40",
  label: "StyledImage"
})(process.env.NODE_ENV === "production" ? {
  name: "6b4u1g",
  styles: "display:block;max-width:100%;height:auto;"
} : {
  name: "6b4u1g",
  styles: "display:block;max-width:100%;height:auto;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9JbWFnZVByZXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUUiLCJmaWxlIjoiLi4vLi4vc3JjL0ltYWdlUHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBXaWRnZXRQcmV2aWV3Q29udGFpbmVyIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFN0eWxlZEltYWdlID0gc3R5bGVkKCh7IGdldEFzc2V0LCB2YWx1ZSB9KSA9PiAoXG4gIDxpbWcgc3JjPXtnZXRBc3NldCh2YWx1ZSl9IHJvbGU9XCJwcmVzZW50YXRpb25cIiAvPlxuKSlgXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbmA7XG5cbmNvbnN0IEltYWdlUHJldmlld0NvbnRlbnQgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgdmFsdWUsIGdldEFzc2V0IH0gPSBwcm9wcztcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IExpc3QuaXNMaXN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAodmFsID0+IDxTdHlsZWRJbWFnZSBrZXk9e3ZhbH0gdmFsdWU9e3ZhbH0gZ2V0QXNzZXQ9e2dldEFzc2V0fSAvPik7XG4gIH1cbiAgcmV0dXJuIDxTdHlsZWRJbWFnZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuY29uc3QgSW1hZ2VQcmV2aWV3ID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDxXaWRnZXRQcmV2aWV3Q29udGFpbmVyPlxuICAgICAge3Byb3BzLnZhbHVlID8gPEltYWdlUHJldmlld0NvbnRlbnQgey4uLnByb3BzfSAvPiA6IG51bGx9XG4gICAgPC9XaWRnZXRQcmV2aWV3Q29udGFpbmVyPlxuICApO1xufTtcblxuSW1hZ2VQcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHZhbHVlOiBQcm9wVHlwZXMubm9kZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlUHJldmlldztcbiJdfQ== */"
});

const ImagePreviewContent = props => {
  const value = props.value,
        getAsset = props.getAsset;

  if (Array.isArray(value) || _immutable.List.isList(value)) {
    return value.map(val => _react.default.createElement(StyledImage, {
      key: val,
      value: val,
      getAsset: getAsset
    }));
  }

  return _react.default.createElement(StyledImage, props);
};

const ImagePreview = props => {
  return _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, null, props.value ? _react.default.createElement(ImagePreviewContent, props) : null);
};

ImagePreview.propTypes = {
  getAsset: _propTypes.default.func.isRequired,
  value: _propTypes.default.node
};
var _default = ImagePreview;
exports.default = _default;