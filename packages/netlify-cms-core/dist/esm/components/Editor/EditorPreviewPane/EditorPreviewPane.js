"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactFrameComponent = _interopRequireDefault(require("react-frame-component"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _registry = require("../../../lib/registry");

var _UI = require("../../UI");

var _collections = require("../../../reducers/collections");

var _fieldInference = require("../../../constants/fieldInference");

var _EditorPreviewContent = _interopRequireDefault(require("./EditorPreviewContent.js"));

var _PreviewHOC = _interopRequireDefault(require("./PreviewHOC"));

var _EditorPreview = _interopRequireDefault(require("./EditorPreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PreviewPaneFrame = (
/*#__PURE__*/
0, _styledBase.default)(_reactFrameComponent.default, {
  target: "e6emspu0",
  label: "PreviewPaneFrame"
})("width:100%;height:100%;border:none;background:#fff;border-radius:", _netlifyCmsUiDefault.lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlc0MiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yL0VkaXRvclByZXZpZXdQYW5lL0VkaXRvclByZXZpZXdQYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCBGcmFtZSBmcm9tICdyZWFjdC1mcmFtZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuaW1wb3J0IHsgcmVzb2x2ZVdpZGdldCwgZ2V0UHJldmlld1RlbXBsYXRlLCBnZXRQcmV2aWV3U3R5bGVzIH0gZnJvbSAnTGliL3JlZ2lzdHJ5JztcbmltcG9ydCB7IEVycm9yQm91bmRhcnkgfSBmcm9tICdVSSc7XG5pbXBvcnQgeyBzZWxlY3RUZW1wbGF0ZU5hbWUsIHNlbGVjdEluZmVyZWRGaWVsZCB9IGZyb20gJ1JlZHVjZXJzL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IElORkVSQUJMRV9GSUVMRFMgfSBmcm9tICdDb25zdGFudHMvZmllbGRJbmZlcmVuY2UnO1xuaW1wb3J0IEVkaXRvclByZXZpZXdDb250ZW50IGZyb20gJy4vRWRpdG9yUHJldmlld0NvbnRlbnQuanMnO1xuaW1wb3J0IFByZXZpZXdIT0MgZnJvbSAnLi9QcmV2aWV3SE9DJztcbmltcG9ydCBFZGl0b3JQcmV2aWV3IGZyb20gJy4vRWRpdG9yUHJldmlldyc7XG5cbmNvbnN0IFByZXZpZXdQYW5lRnJhbWUgPSBzdHlsZWQoRnJhbWUpYFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlld1BhbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBnZXRXaWRnZXQgPSAoZmllbGQsIHZhbHVlLCBtZXRhZGF0YSwgcHJvcHMsIGlkeCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGdldEFzc2V0LCBlbnRyeSB9ID0gcHJvcHM7XG4gICAgY29uc3Qgd2lkZ2V0ID0gcmVzb2x2ZVdpZGdldChmaWVsZC5nZXQoJ3dpZGdldCcpKTtcbiAgICBjb25zdCBrZXkgPSBpZHggPyBmaWVsZC5nZXQoJ25hbWUnKSArICdfJyArIGlkeCA6IGZpZWxkLmdldCgnbmFtZScpO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGFuIEhPQyB0byBwcm92aWRlIGNvbmRpdGlvbmFsIHVwZGF0ZXMgZm9yIGFsbCBwcmV2aWV3cy5cbiAgICAgKi9cbiAgICByZXR1cm4gIXdpZGdldC5wcmV2aWV3ID8gbnVsbCA6IChcbiAgICAgIDxQcmV2aWV3SE9DXG4gICAgICAgIHByZXZpZXdDb21wb25lbnQ9e3dpZGdldC5wcmV2aWV3fVxuICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgZmllbGQ9e2ZpZWxkfVxuICAgICAgICBnZXRBc3NldD17Z2V0QXNzZXR9XG4gICAgICAgIHZhbHVlPXt2YWx1ZSAmJiBNYXAuaXNNYXAodmFsdWUpID8gdmFsdWUuZ2V0KGZpZWxkLmdldCgnbmFtZScpKSA6IHZhbHVlfVxuICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgIGZpZWxkc01ldGFEYXRhPXttZXRhZGF0YX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBpbmZlcmVkRmllbGRzID0ge307XG5cbiAgaW5mZXJGaWVsZHMoKSB7XG4gICAgY29uc3QgdGl0bGVGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICd0aXRsZScpO1xuICAgIGNvbnN0IHNob3J0VGl0bGVGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICdzaG9ydFRpdGxlJyk7XG4gICAgY29uc3QgYXV0aG9yRmllbGQgPSBzZWxlY3RJbmZlcmVkRmllbGQodGhpcy5wcm9wcy5jb2xsZWN0aW9uLCAnYXV0aG9yJyk7XG5cbiAgICB0aGlzLmluZmVyZWRGaWVsZHMgPSB7fTtcbiAgICBpZiAodGl0bGVGaWVsZCkgdGhpcy5pbmZlcmVkRmllbGRzW3RpdGxlRmllbGRdID0gSU5GRVJBQkxFX0ZJRUxEUy50aXRsZTtcbiAgICBpZiAoc2hvcnRUaXRsZUZpZWxkKSB0aGlzLmluZmVyZWRGaWVsZHNbc2hvcnRUaXRsZUZpZWxkXSA9IElORkVSQUJMRV9GSUVMRFMuc2hvcnRUaXRsZTtcbiAgICBpZiAoYXV0aG9yRmllbGQpIHRoaXMuaW5mZXJlZEZpZWxkc1thdXRob3JGaWVsZF0gPSBJTkZFUkFCTEVfRklFTERTLmF1dGhvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWRnZXQgY29tcG9uZW50IGZvciBhIG5hbWVkIGZpZWxkLCBhbmQgbWFrZXMgcmVjdXJzaXZlIGNhbGxzXG4gICAqIHRvIHJldHJpZXZlIGNvbXBvbmVudHMgZm9yIG5lc3RlZCBhbmQgZGVlcGx5IG5lc3RlZCBmaWVsZHMsIHdoaWNoIG9jY3VyIGluXG4gICAqIG9iamVjdCBhbmQgbGlzdCB0eXBlIGZpZWxkcy4gVXNlZCBpbnRlcm5hbGx5IHRvIHJldHJpZXZlIHdpZGdldHMsIGFuZCBhbHNvXG4gICAqIGV4cG9zZWQgZm9yIHVzZSBpbiBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMuXG4gICAqL1xuICB3aWRnZXRGb3IgPSAoXG4gICAgbmFtZSxcbiAgICBmaWVsZHMgPSB0aGlzLnByb3BzLmZpZWxkcyxcbiAgICB2YWx1ZXMgPSB0aGlzLnByb3BzLmVudHJ5LmdldCgnZGF0YScpLFxuICAgIGZpZWxkc01ldGFEYXRhID0gdGhpcy5wcm9wcy5maWVsZHNNZXRhRGF0YSxcbiAgKSA9PiB7XG4gICAgLy8gV2UgcmV0cmlldmUgdGhlIGZpZWxkIGJ5IG5hbWUgc28gdGhhdCB0aGlzIGZ1bmN0aW9uIGNhbiBhbHNvIGJlIHVzZWQgaW5cbiAgICAvLyBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMsIHdoZXJlIHRoZSBmaWVsZCBvYmplY3QgY2FuJ3QgYmUgcGFzc2VkIGluLlxuICAgIGxldCBmaWVsZCA9IGZpZWxkcyAmJiBmaWVsZHMuZmluZChmID0+IGYuZ2V0KCduYW1lJykgPT09IG5hbWUpO1xuICAgIGxldCB2YWx1ZSA9IHZhbHVlcyAmJiB2YWx1ZXMuZ2V0KGZpZWxkLmdldCgnbmFtZScpKTtcbiAgICBsZXQgbmVzdGVkRmllbGRzID0gZmllbGQuZ2V0KCdmaWVsZHMnKTtcbiAgICBsZXQgc2luZ2xlRmllbGQgPSBmaWVsZC5nZXQoJ2ZpZWxkJyk7XG4gICAgbGV0IG1ldGFkYXRhID0gZmllbGRzTWV0YURhdGEgJiYgZmllbGRzTWV0YURhdGEuZ2V0KGZpZWxkLmdldCgnbmFtZScpLCBNYXAoKSk7XG5cbiAgICBpZiAobmVzdGVkRmllbGRzKSB7XG4gICAgICBmaWVsZCA9IGZpZWxkLnNldCgnZmllbGRzJywgdGhpcy5nZXROZXN0ZWRXaWRnZXRzKG5lc3RlZEZpZWxkcywgdmFsdWUsIG1ldGFkYXRhKSk7XG4gICAgfVxuXG4gICAgaWYgKHNpbmdsZUZpZWxkKSB7XG4gICAgICBmaWVsZCA9IGZpZWxkLnNldCgnZmllbGQnLCB0aGlzLmdldFNpbmdsZU5lc3RlZChzaW5nbGVGaWVsZCwgdmFsdWUsIG1ldGFkYXRhKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbGFiZWxsZWRXaWRnZXRzID0gWydzdHJpbmcnLCAndGV4dCcsICdudW1iZXInXTtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5pbmZlcmVkRmllbGRzKS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgdmFsdWUgPSB0aGlzLmluZmVyZWRGaWVsZHNbbmFtZV0uZGVmYXVsdFByZXZpZXcodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB2YWx1ZSAmJlxuICAgICAgbGFiZWxsZWRXaWRnZXRzLmluZGV4T2YoZmllbGQuZ2V0KCd3aWRnZXQnKSkgIT09IC0xICYmXG4gICAgICB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IDUwXG4gICAgKSB7XG4gICAgICB2YWx1ZSA9IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3Ryb25nPntmaWVsZC5nZXQoJ2xhYmVsJywgZmllbGQuZ2V0KCduYW1lJykpfTo8L3N0cm9uZz4ge3ZhbHVlfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlID8gdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlLCBtZXRhZGF0YSwgdGhpcy5wcm9wcykgOiBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgd2lkZ2V0cyBmb3IgbmVzdGVkIGZpZWxkcyAoY2hpbGRyZW4gb2Ygb2JqZWN0L2xpc3QgZmllbGRzKVxuICAgKi9cbiAgZ2V0TmVzdGVkV2lkZ2V0cyA9IChmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpID0+IHtcbiAgICAvLyBGaWVsZHMgbmVzdGVkIHdpdGhpbiBhIGxpc3QgZmllbGQgd2lsbCBiZSBwYWlyZWQgd2l0aCBhIExpc3Qgb2YgdmFsdWUgTWFwcy5cbiAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWVzKSkge1xuICAgICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsdWUgPT4gdGhpcy53aWRnZXRzRm9yTmVzdGVkRmllbGRzKGZpZWxkcywgdmFsdWUsIGZpZWxkc01ldGFEYXRhKSk7XG4gICAgfVxuICAgIC8vIEZpZWxkcyBuZXN0ZWQgd2l0aGluIGFuIG9iamVjdCBmaWVsZCB3aWxsIGJlIHBhaXJlZCB3aXRoIGEgc2luZ2xlIE1hcCBvZiB2YWx1ZXMuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0c0Zvck5lc3RlZEZpZWxkcyhmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpO1xuICB9O1xuXG4gIGdldFNpbmdsZU5lc3RlZCA9IChmaWVsZCwgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkgPT4ge1xuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZXMpKSB7XG4gICAgICByZXR1cm4gdmFsdWVzLm1hcCgodmFsdWUsIGlkeCkgPT5cbiAgICAgICAgdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlLCBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzLCBpZHgpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0V2lkZ2V0KGZpZWxkLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVc2Ugd2lkZ2V0Rm9yIGFzIGEgbWFwcGluZyBmdW5jdGlvbiBmb3IgcmVjdXJzaXZlIHdpZGdldCByZXRyaWV2YWxcbiAgICovXG4gIHdpZGdldHNGb3JOZXN0ZWRGaWVsZHMgPSAoZmllbGRzLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSA9PiB7XG4gICAgcmV0dXJuIGZpZWxkcy5tYXAoZmllbGQgPT4gdGhpcy53aWRnZXRGb3IoZmllbGQuZ2V0KCduYW1lJyksIGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGV4aXN0cyBlbnRpcmVseSB0byBleHBvc2UgbmVzdGVkIHdpZGdldHMgZm9yIG9iamVjdCBhbmQgbGlzdFxuICAgKiBmaWVsZHMgdG8gY3VzdG9tIHByZXZpZXcgdGVtcGxhdGVzLlxuICAgKlxuICAgKiBUT0RPOiBzZWUgaWYgd2lkZ2V0Rm9yIGNhbiBub3cgcHJvdmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkgZm9yIHByZXZpZXcgdGVtcGxhdGVzXG4gICAqL1xuICB3aWRnZXRzRm9yID0gbmFtZSA9PiB7XG4gICAgY29uc3QgeyBmaWVsZHMsIGVudHJ5LCBmaWVsZHNNZXRhRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5maW5kKGYgPT4gZi5nZXQoJ25hbWUnKSA9PT0gbmFtZSk7XG4gICAgY29uc3QgbmVzdGVkRmllbGRzID0gZmllbGQgJiYgZmllbGQuZ2V0KCdmaWVsZHMnKTtcbiAgICBjb25zdCB2YWx1ZSA9IGVudHJ5LmdldEluKFsnZGF0YScsIGZpZWxkLmdldCgnbmFtZScpXSk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJyksIE1hcCgpKTtcblxuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5tYXAodmFsID0+IHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9XG4gICAgICAgICAgbmVzdGVkRmllbGRzICYmXG4gICAgICAgICAgTWFwKFxuICAgICAgICAgICAgbmVzdGVkRmllbGRzLm1hcCgoZiwgaSkgPT4gW1xuICAgICAgICAgICAgICBmLmdldCgnbmFtZScpLFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aX0+e3RoaXMuZ2V0V2lkZ2V0KGYsIHZhbCwgbWV0YWRhdGEuZ2V0KGYuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzKX08L2Rpdj4sXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gTWFwKHsgZGF0YTogdmFsLCB3aWRnZXRzIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hcCh7XG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgIHdpZGdldHM6XG4gICAgICAgIG5lc3RlZEZpZWxkcyAmJlxuICAgICAgICBNYXAoXG4gICAgICAgICAgbmVzdGVkRmllbGRzLm1hcChmID0+IFtcbiAgICAgICAgICAgIGYuZ2V0KCduYW1lJyksXG4gICAgICAgICAgICB0aGlzLmdldFdpZGdldChmLCB2YWx1ZSwgbWV0YWRhdGEuZ2V0KGYuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgKSxcbiAgICB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlbnRyeSwgY29sbGVjdGlvbiB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghZW50cnkgfHwgIWVudHJ5LmdldCgnZGF0YScpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aWV3Q29tcG9uZW50ID1cbiAgICAgIGdldFByZXZpZXdUZW1wbGF0ZShzZWxlY3RUZW1wbGF0ZU5hbWUoY29sbGVjdGlvbiwgZW50cnkuZ2V0KCdzbHVnJykpKSB8fCBFZGl0b3JQcmV2aWV3O1xuXG4gICAgdGhpcy5pbmZlckZpZWxkcygpO1xuXG4gICAgY29uc3QgcHJldmlld1Byb3BzID0ge1xuICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgIHdpZGdldEZvcjogdGhpcy53aWRnZXRGb3IsXG4gICAgICB3aWRnZXRzRm9yOiB0aGlzLndpZGdldHNGb3IsXG4gICAgfTtcblxuICAgIGNvbnN0IHN0eWxlRWxzID0gZ2V0UHJldmlld1N0eWxlcygpLm1hcCgoc3R5bGUsIGkpID0+IHtcbiAgICAgIGlmIChzdHlsZS5yYXcpIHtcbiAgICAgICAgcmV0dXJuIDxzdHlsZSBrZXk9e2l9PntzdHlsZS52YWx1ZX08L3N0eWxlPjtcbiAgICAgIH1cbiAgICAgIHJldHVybiA8bGluayBrZXk9e2l9IGhyZWY9e3N0eWxlLnZhbHVlfSB0eXBlPVwidGV4dC9jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz47XG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgIDxQcmV2aWV3UGFuZUZyYW1lIGhlYWQ9e3N0eWxlRWxzfSAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsQ29udGVudCA9IGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPjxiYXNlIHRhcmdldD1cIl9ibGFua1wiLz48L2hlYWQ+XG4gIDxib2R5PjxkaXY+PC9kaXY+PC9ib2R5PlxuPC9odG1sPlxuYDtcblxuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JCb3VuZGFyeT5cbiAgICAgICAgPFByZXZpZXdQYW5lRnJhbWUgaGVhZD17c3R5bGVFbHN9IGluaXRpYWxDb250ZW50PXtpbml0aWFsQ29udGVudH0+XG4gICAgICAgICAgPEVkaXRvclByZXZpZXdDb250ZW50IHsuLi57IHByZXZpZXdDb21wb25lbnQsIHByZXZpZXdQcm9wcyB9fSAvPlxuICAgICAgICA8L1ByZXZpZXdQYW5lRnJhbWU+XG4gICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgKTtcbiAgfVxufVxuXG5QcmV2aWV3UGFuZS5wcm9wVHlwZXMgPSB7XG4gIGNvbGxlY3Rpb246IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZmllbGRzOiBJbW11dGFibGVQcm9wVHlwZXMubGlzdC5pc1JlcXVpcmVkLFxuICBlbnRyeTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICBmaWVsZHNNZXRhRGF0YTogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICBnZXRBc3NldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG4iXX0= */"));

class PreviewPane extends _react.default.Component {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    _defineProperty(this, "getWidget", function (field, value, metadata, props) {
      let idx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      const getAsset = props.getAsset,
            entry = props.entry;
      const widget = (0, _registry.resolveWidget)(field.get('widget'));
      const key = idx ? field.get('name') + '_' + idx : field.get('name');
      /**
       * Use an HOC to provide conditional updates for all previews.
       */

      return !widget.preview ? null : _react.default.createElement(_PreviewHOC.default, {
        previewComponent: widget.preview,
        key: key,
        field: field,
        getAsset: getAsset,
        value: value && _immutable.Map.isMap(value) ? value.get(field.get('name')) : value,
        entry: entry,
        fieldsMetaData: metadata
      });
    });

    _defineProperty(this, "inferedFields", {});

    _defineProperty(this, "widgetFor", function (name) {
      let fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.fields;
      let values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.entry.get('data');
      let fieldsMetaData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.props.fieldsMetaData;
      // We retrieve the field by name so that this function can also be used in
      // custom preview templates, where the field object can't be passed in.
      let field = fields && fields.find(f => f.get('name') === name);
      let value = values && values.get(field.get('name'));
      let nestedFields = field.get('fields');
      let singleField = field.get('field');
      let metadata = fieldsMetaData && fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (nestedFields) {
        field = field.set('fields', _this.getNestedWidgets(nestedFields, value, metadata));
      }

      if (singleField) {
        field = field.set('field', _this.getSingleNested(singleField, value, metadata));
      }

      const labelledWidgets = ['string', 'text', 'number'];

      if (Object.keys(_this.inferedFields).indexOf(name) !== -1) {
        value = _this.inferedFields[name].defaultPreview(value);
      } else if (value && labelledWidgets.indexOf(field.get('widget')) !== -1 && value.toString().length < 50) {
        value = _react.default.createElement("div", null, _react.default.createElement("strong", null, field.get('label', field.get('name')), ":"), " ", value);
      }

      return value ? _this.getWidget(field, value, metadata, _this.props) : null;
    });

    _defineProperty(this, "getNestedWidgets", (fields, values, fieldsMetaData) => {
      // Fields nested within a list field will be paired with a List of value Maps.
      if (_immutable.List.isList(values)) {
        return values.map(value => this.widgetsForNestedFields(fields, value, fieldsMetaData));
      } // Fields nested within an object field will be paired with a single Map of values.


      return this.widgetsForNestedFields(fields, values, fieldsMetaData);
    });

    _defineProperty(this, "getSingleNested", (field, values, fieldsMetaData) => {
      if (_immutable.List.isList(values)) {
        return values.map((value, idx) => this.getWidget(field, value, fieldsMetaData.get(field.get('name')), this.props, idx));
      }

      return this.getWidget(field, values, fieldsMetaData.get(field.get('name')), this.props);
    });

    _defineProperty(this, "widgetsForNestedFields", (fields, values, fieldsMetaData) => {
      return fields.map(field => this.widgetFor(field.get('name'), fields, values, fieldsMetaData));
    });

    _defineProperty(this, "widgetsFor", name => {
      const _this$props = this.props,
            fields = _this$props.fields,
            entry = _this$props.entry,
            fieldsMetaData = _this$props.fieldsMetaData;
      const field = fields.find(f => f.get('name') === name);
      const nestedFields = field && field.get('fields');
      const value = entry.getIn(['data', field.get('name')]);
      const metadata = fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (_immutable.List.isList(value)) {
        return value.map(val => {
          const widgets = nestedFields && (0, _immutable.Map)(nestedFields.map((f, i) => [f.get('name'), _react.default.createElement("div", {
            key: i
          }, this.getWidget(f, val, metadata.get(f.get('name')), this.props))]));
          return (0, _immutable.Map)({
            data: val,
            widgets
          });
        });
      }

      return (0, _immutable.Map)({
        data: value,
        widgets: nestedFields && (0, _immutable.Map)(nestedFields.map(f => [f.get('name'), this.getWidget(f, value, metadata.get(f.get('name')), this.props)]))
      });
    });
  }

  inferFields() {
    const titleField = (0, _collections.selectInferedField)(this.props.collection, 'title');
    const shortTitleField = (0, _collections.selectInferedField)(this.props.collection, 'shortTitle');
    const authorField = (0, _collections.selectInferedField)(this.props.collection, 'author');
    this.inferedFields = {};
    if (titleField) this.inferedFields[titleField] = _fieldInference.INFERABLE_FIELDS.title;
    if (shortTitleField) this.inferedFields[shortTitleField] = _fieldInference.INFERABLE_FIELDS.shortTitle;
    if (authorField) this.inferedFields[authorField] = _fieldInference.INFERABLE_FIELDS.author;
  }
  /**
   * Returns the widget component for a named field, and makes recursive calls
   * to retrieve components for nested and deeply nested fields, which occur in
   * object and list type fields. Used internally to retrieve widgets, and also
   * exposed for use in custom preview templates.
   */


  render() {
    const _this$props2 = this.props,
          entry = _this$props2.entry,
          collection = _this$props2.collection;

    if (!entry || !entry.get('data')) {
      return null;
    }

    const previewComponent = (0, _registry.getPreviewTemplate)((0, _collections.selectTemplateName)(collection, entry.get('slug'))) || _EditorPreview.default;

    this.inferFields();

    const previewProps = _objectSpread({}, this.props, {
      widgetFor: this.widgetFor,
      widgetsFor: this.widgetsFor
    });

    const styleEls = (0, _registry.getPreviewStyles)().map((style, i) => {
      if (style.raw) {
        return _react.default.createElement("style", {
          key: i
        }, style.value);
      }

      return _react.default.createElement("link", {
        key: i,
        href: style.value,
        type: "text/css",
        rel: "stylesheet"
      });
    });

    if (!collection) {
      _react.default.createElement(PreviewPaneFrame, {
        head: styleEls
      });
    }

    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;
    return _react.default.createElement(_UI.ErrorBoundary, null, _react.default.createElement(PreviewPaneFrame, {
      head: styleEls,
      initialContent: initialContent
    }, _react.default.createElement(_EditorPreviewContent.default, {
      previewComponent,
      previewProps
    })));
  }

}

exports.default = PreviewPane;
PreviewPane.propTypes = {
  collection: _reactImmutableProptypes.default.map.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  entry: _reactImmutableProptypes.default.map.isRequired,
  fieldsMetaData: _reactImmutableProptypes.default.map.isRequired,
  getAsset: _propTypes.default.func.isRequired
};