"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _uniq2 = _interopRequireDefault(require("lodash/uniq"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _core = require("@emotion/core");

var _immutable = require("immutable");

var _slate = require("slate");

var _slateReact = require("slate-react");

var _serializers = require("../serializers");

var _Toolbar = _interopRequireDefault(require("../MarkdownControl/Toolbar"));

var _renderers = require("./renderers");

var _validators = require("./validators");

var _plugins = _interopRequireWildcard(require("./plugins"));

var _keys = _interopRequireDefault(require("./keys"));

var _visualEditorStyles = _interopRequireDefault(require("./visualEditorStyles"));

var _styles = require("../styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const VisualEditorContainer = (0, _styledBase.default)("div", {
  target: "evezps90",
  label: "VisualEditorContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "79elbk",
  styles: "position:relative;"
} : {
  name: "79elbk",
  styles: "position:relative;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVmlzdWFsRWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCd0MiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9WaXN1YWxFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDbGFzc05hbWVzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgeyBnZXQsIGlzRW1wdHksIGRlYm91bmNlLCB1bmlxIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgVmFsdWUsIERvY3VtZW50LCBCbG9jaywgVGV4dCB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRvciBhcyBTbGF0ZSB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCB7IHNsYXRlVG9NYXJrZG93biwgbWFya2Rvd25Ub1NsYXRlLCBodG1sVG9TbGF0ZSB9IGZyb20gJy4uL3NlcmlhbGl6ZXJzJztcbmltcG9ydCBUb29sYmFyIGZyb20gJy4uL01hcmtkb3duQ29udHJvbC9Ub29sYmFyJztcbmltcG9ydCB7IHJlbmRlck5vZGUsIHJlbmRlck1hcmsgfSBmcm9tICcuL3JlbmRlcmVycyc7XG5pbXBvcnQgeyB2YWxpZGF0ZU5vZGUgfSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHBsdWdpbnMsIHsgRWRpdExpc3RDb25maWd1cmVkIH0gZnJvbSAnLi9wbHVnaW5zJztcbmltcG9ydCBvbktleURvd24gZnJvbSAnLi9rZXlzJztcbmltcG9ydCB2aXN1YWxFZGl0b3JTdHlsZXMgZnJvbSAnLi92aXN1YWxFZGl0b3JTdHlsZXMnO1xuaW1wb3J0IHsgRWRpdG9yQ29udHJvbEJhciB9IGZyb20gJy4uL3N0eWxlcyc7XG5cbmNvbnN0IFZpc3VhbEVkaXRvckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbmA7XG5cbmNvbnN0IGNyZWF0ZUVtcHR5UmF3RG9jID0gKCkgPT4ge1xuICBjb25zdCBlbXB0eVRleHQgPSBUZXh0LmNyZWF0ZSgnJyk7XG4gIGNvbnN0IGVtcHR5QmxvY2sgPSBCbG9jay5jcmVhdGUoeyBvYmplY3Q6ICdibG9jaycsIHR5cGU6ICdwYXJhZ3JhcGgnLCBub2RlczogW2VtcHR5VGV4dF0gfSk7XG4gIHJldHVybiB7IG5vZGVzOiBbZW1wdHlCbG9ja10gfTtcbn07XG5cbmNvbnN0IGNyZWF0ZVNsYXRlVmFsdWUgPSByYXdWYWx1ZSA9PiB7XG4gIGNvbnN0IHJhd0RvYyA9IHJhd1ZhbHVlICYmIG1hcmtkb3duVG9TbGF0ZShyYXdWYWx1ZSk7XG4gIGNvbnN0IHJhd0RvY0hhc05vZGVzID0gIWlzRW1wdHkoZ2V0KHJhd0RvYywgJ25vZGVzJykpO1xuICBjb25zdCBkb2N1bWVudCA9IERvY3VtZW50LmZyb21KU09OKHJhd0RvY0hhc05vZGVzID8gcmF3RG9jIDogY3JlYXRlRW1wdHlSYXdEb2MoKSk7XG4gIHJldHVybiBWYWx1ZS5jcmVhdGUoeyBkb2N1bWVudCB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25BZGRBc3NldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBnZXRBc3NldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbk1vZGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZmllbGQ6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgICBnZXRFZGl0b3JDb21wb25lbnRzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogY3JlYXRlU2xhdGVWYWx1ZShwcm9wcy52YWx1ZSksXG4gICAgICBsYXN0UmF3VmFsdWU6IHByb3BzLnZhbHVlLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBjb25zdCBmb3JjZVByb3BzVmFsdWUgPSB0aGlzLnNob3VsZEZvcmNlUHJvcHNWYWx1ZShcbiAgICAgIHRoaXMucHJvcHMudmFsdWUsXG4gICAgICB0aGlzLnN0YXRlLmxhc3RSYXdWYWx1ZSxcbiAgICAgIG5leHRQcm9wcy52YWx1ZSxcbiAgICAgIG5leHRTdGF0ZS5sYXN0UmF3VmFsdWUsXG4gICAgKTtcbiAgICByZXR1cm4gIXRoaXMuc3RhdGUudmFsdWUuZXF1YWxzKG5leHRTdGF0ZS52YWx1ZSkgfHwgZm9yY2VQcm9wc1ZhbHVlO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgY29uc3QgZm9yY2VQcm9wc1ZhbHVlID0gdGhpcy5zaG91bGRGb3JjZVByb3BzVmFsdWUoXG4gICAgICBwcmV2UHJvcHMudmFsdWUsXG4gICAgICBwcmV2U3RhdGUubGFzdFJhd1ZhbHVlLFxuICAgICAgdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgIHRoaXMuc3RhdGUubGFzdFJhd1ZhbHVlLFxuICAgICk7XG5cbiAgICBpZiAoZm9yY2VQcm9wc1ZhbHVlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IGNyZWF0ZVNsYXRlVmFsdWUodGhpcy5wcm9wcy52YWx1ZSksXG4gICAgICAgIGxhc3RSYXdWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoZSBvbGQgcHJvcHMvc3RhdGUgdmFsdWVzIGFuZCBuZXcgc3RhdGUgdmFsdWUgYXJlIGFsbCB0aGUgc2FtZSwgYW5kXG4gIC8vIHRoZSBuZXcgcHJvcHMgdmFsdWUgZG9lcyBub3QgbWF0Y2ggdGhlIG90aGVycywgdGhlIG5ldyBwcm9wcyB2YWx1ZVxuICAvLyBvcmlnaW5hdGVkIGZyb20gb3V0c2lkZSBvZiB0aGlzIHdpZGdldCBhbmQgc2hvdWxkIGJlIHVzZWQuXG4gIHNob3VsZEZvcmNlUHJvcHNWYWx1ZShvbGRQcm9wc1ZhbHVlLCBvbGRTdGF0ZVZhbHVlLCBuZXdQcm9wc1ZhbHVlLCBuZXdTdGF0ZVZhbHVlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHVuaXEoW29sZFByb3BzVmFsdWUsIG9sZFN0YXRlVmFsdWUsIG5ld1N0YXRlVmFsdWVdKS5sZW5ndGggPT09IDEgJiZcbiAgICAgIG9sZFByb3BzVmFsdWUgIT09IG5ld1Byb3BzVmFsdWVcbiAgICApO1xuICB9XG5cbiAgaGFuZGxlUGFzdGUgPSAoZSwgZGF0YSwgY2hhbmdlKSA9PiB7XG4gICAgaWYgKGRhdGEudHlwZSAhPT0gJ2h0bWwnIHx8IGRhdGEuaXNTaGlmdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhc3QgPSBodG1sVG9TbGF0ZShkYXRhLmh0bWwpO1xuICAgIGNvbnN0IGRvYyA9IERvY3VtZW50LmZyb21KU09OKGFzdCk7XG4gICAgcmV0dXJuIGNoYW5nZS5pbnNlcnRGcmFnbWVudChkb2MpO1xuICB9O1xuXG4gIHNlbGVjdGlvbkhhc01hcmsgPSB0eXBlID0+IHRoaXMuc3RhdGUudmFsdWUuYWN0aXZlTWFya3Muc29tZShtYXJrID0+IG1hcmsudHlwZSA9PT0gdHlwZSk7XG4gIHNlbGVjdGlvbkhhc0Jsb2NrID0gdHlwZSA9PiB0aGlzLnN0YXRlLnZhbHVlLmJsb2Nrcy5zb21lKG5vZGUgPT4gbm9kZS50eXBlID09PSB0eXBlKTtcblxuICBoYW5kbGVNYXJrQ2xpY2sgPSAoZXZlbnQsIHR5cGUpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHJlc29sdmVkQ2hhbmdlID0gdGhpcy5zdGF0ZS52YWx1ZVxuICAgICAgLmNoYW5nZSgpXG4gICAgICAuZm9jdXMoKVxuICAgICAgLnRvZ2dsZU1hcmsodHlwZSk7XG4gICAgdGhpcy5yZWYub25DaGFuZ2UocmVzb2x2ZWRDaGFuZ2UpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogcmVzb2x2ZWRDaGFuZ2UudmFsdWUgfSk7XG4gIH07XG5cbiAgaGFuZGxlQmxvY2tDbGljayA9IChldmVudCwgdHlwZSkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBkb2N1bWVudDogZG9jIH0gPSB2YWx1ZTtcbiAgICBjb25zdCB7IHVud3JhcExpc3QsIHdyYXBJbkxpc3QgfSA9IEVkaXRMaXN0Q29uZmlndXJlZC5jaGFuZ2VzO1xuICAgIGxldCBjaGFuZ2UgPSB2YWx1ZS5jaGFuZ2UoKTtcblxuICAgIC8vIEhhbmRsZSBldmVyeXRoaW5nIGV4Y2VwdCBsaXN0IGJ1dHRvbnMuXG4gICAgaWYgKCFbJ2J1bGxldGVkLWxpc3QnLCAnbnVtYmVyZWQtbGlzdCddLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICBjb25zdCBpc0FjdGl2ZSA9IHRoaXMuc2VsZWN0aW9uSGFzQmxvY2sodHlwZSk7XG4gICAgICBjaGFuZ2UgPSBjaGFuZ2Uuc2V0QmxvY2tzKGlzQWN0aXZlID8gJ3BhcmFncmFwaCcgOiB0eXBlKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIGV4dHJhIHdyYXBwaW5nIHJlcXVpcmVkIGZvciBsaXN0IGJ1dHRvbnMuXG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBpc1NhbWVMaXN0VHlwZSA9IHZhbHVlLmJsb2Nrcy5zb21lKGJsb2NrID0+IHtcbiAgICAgICAgcmV0dXJuICEhZG9jLmdldENsb3Nlc3QoYmxvY2sua2V5LCBwYXJlbnQgPT4gcGFyZW50LnR5cGUgPT09IHR5cGUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBpc0luTGlzdCA9IEVkaXRMaXN0Q29uZmlndXJlZC51dGlscy5pc1NlbGVjdGlvbkluTGlzdCh2YWx1ZSk7XG5cbiAgICAgIGlmIChpc0luTGlzdCAmJiBpc1NhbWVMaXN0VHlwZSkge1xuICAgICAgICBjaGFuZ2UgPSBjaGFuZ2UuY2FsbCh1bndyYXBMaXN0LCB0eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNJbkxpc3QpIHtcbiAgICAgICAgY29uc3QgY3VycmVudExpc3RUeXBlID0gdHlwZSA9PT0gJ2J1bGxldGVkLWxpc3QnID8gJ251bWJlcmVkLWxpc3QnIDogJ2J1bGxldGVkLWxpc3QnO1xuICAgICAgICBjaGFuZ2UgPSBjaGFuZ2UuY2FsbCh1bndyYXBMaXN0LCBjdXJyZW50TGlzdFR5cGUpLmNhbGwod3JhcEluTGlzdCwgdHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGFuZ2UgPSBjaGFuZ2UuY2FsbCh3cmFwSW5MaXN0LCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXNvbHZlZENoYW5nZSA9IGNoYW5nZS5mb2N1cygpO1xuICAgIHRoaXMucmVmLm9uQ2hhbmdlKHJlc29sdmVkQ2hhbmdlKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IHJlc29sdmVkQ2hhbmdlLnZhbHVlIH0pO1xuICB9O1xuXG4gIGhhc0xpbmtzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlLmlubGluZXMuc29tZShpbmxpbmUgPT4gaW5saW5lLnR5cGUgPT09ICdsaW5rJyk7XG4gIH07XG5cbiAgaGFuZGxlTGluayA9ICgpID0+IHtcbiAgICBsZXQgY2hhbmdlID0gdGhpcy5zdGF0ZS52YWx1ZS5jaGFuZ2UoKTtcblxuICAgIC8vIElmIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBjb250YWlucyBsaW5rcywgY2xpY2tpbmcgdGhlIFwibGlua1wiIGJ1dHRvblxuICAgIC8vIHNob3VsZCBzaW1wbHkgdW5saW5rIHRoZW0uXG4gICAgaWYgKHRoaXMuaGFzTGlua3MoKSkge1xuICAgICAgY2hhbmdlID0gY2hhbmdlLnVud3JhcElubGluZSgnbGluaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cmwgPSB3aW5kb3cucHJvbXB0KCdFbnRlciB0aGUgVVJMIG9mIHRoZSBsaW5rJyk7XG5cbiAgICAgIC8vIElmIG5vdGhpbmcgaXMgZW50ZXJlZCBpbiB0aGUgVVJMIHByb21wdCwgZG8gbm90aGluZy5cbiAgICAgIGlmICghdXJsKSByZXR1cm47XG5cbiAgICAgIC8vIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQsIHVzZSB0aGUgZW50ZXJlZCBVUkwgYXMgdGV4dC5cbiAgICAgIGlmIChjaGFuZ2UudmFsdWUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgY2hhbmdlID0gY2hhbmdlLmluc2VydFRleHQodXJsKS5leHRlbmQoMCAtIHVybC5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBjaGFuZ2UgPSBjaGFuZ2Uud3JhcElubGluZSh7IHR5cGU6ICdsaW5rJywgZGF0YTogeyB1cmwgfSB9KS5jb2xsYXBzZVRvRW5kKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWYub25DaGFuZ2UoY2hhbmdlKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGNoYW5nZS52YWx1ZSB9KTtcbiAgfTtcblxuICBoYW5kbGVQbHVnaW5BZGQgPSBwbHVnaW5JZCA9PiB7XG4gICAgY29uc3QgeyBnZXRFZGl0b3JDb21wb25lbnRzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qgbm9kZXMgPSBbVGV4dC5jcmVhdGUoJycpXTtcblxuICAgIC8qKlxuICAgICAqIEdldCBkZWZhdWx0IHZhbHVlcyBmb3IgcGx1Z2luIGZpZWxkcy5cbiAgICAgKi9cbiAgICBjb25zdCBwbHVnaW5GaWVsZHMgPSBnZXRFZGl0b3JDb21wb25lbnRzKCkuZ2V0SW4oW3BsdWdpbklkLCAnZmllbGRzJ10sIExpc3QoKSk7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlcyA9IHBsdWdpbkZpZWxkc1xuICAgICAgLnRvTWFwKClcbiAgICAgIC5tYXBLZXlzKChfLCBmaWVsZCkgPT4gZmllbGQuZ2V0KCduYW1lJykpXG4gICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLmhhcygnZGVmYXVsdCcpKVxuICAgICAgLm1hcChmaWVsZCA9PiBmaWVsZC5nZXQoJ2RlZmF1bHQnKSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IHNob3J0Y29kZSBibG9jayB3aXRoIGRlZmF1bHQgdmFsdWVzIHNldC5cbiAgICAgKi9cbiAgICBjb25zdCBibG9jayA9IHtcbiAgICAgIG9iamVjdDogJ2Jsb2NrJyxcbiAgICAgIHR5cGU6ICdzaG9ydGNvZGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBzaG9ydGNvZGU6IHBsdWdpbklkLFxuICAgICAgICBzaG9ydGNvZGVOZXc6IHRydWUsXG4gICAgICAgIHNob3J0Y29kZURhdGE6IGRlZmF1bHRWYWx1ZXMsXG4gICAgICB9LFxuICAgICAgaXNWb2lkOiB0cnVlLFxuICAgICAgbm9kZXMsXG4gICAgfTtcblxuICAgIGxldCBjaGFuZ2UgPSB2YWx1ZS5jaGFuZ2UoKTtcbiAgICBjb25zdCB7IGZvY3VzQmxvY2sgfSA9IGNoYW5nZS52YWx1ZTtcblxuICAgIGlmIChmb2N1c0Jsb2NrLnRleHQgPT09ICcnICYmIGZvY3VzQmxvY2sudHlwZSA9PT0gJ3BhcmFncmFwaCcpIHtcbiAgICAgIGNoYW5nZSA9IGNoYW5nZS5zZXROb2RlQnlLZXkoZm9jdXNCbG9jay5rZXksIGJsb2NrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlID0gY2hhbmdlLmluc2VydEJsb2NrKGJsb2NrKTtcbiAgICB9XG5cbiAgICBjaGFuZ2UgPSBjaGFuZ2UuZm9jdXMoKTtcblxuICAgIHRoaXMucmVmLm9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBjaGFuZ2UudmFsdWUgfSk7XG4gIH07XG5cbiAgaGFuZGxlVG9nZ2xlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25Nb2RlKCdyYXcnKTtcbiAgfTtcblxuICBoYW5kbGVEb2N1bWVudENoYW5nZSA9IGRlYm91bmNlKGNoYW5nZSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCByYXcgPSBjaGFuZ2UudmFsdWUuZG9jdW1lbnQudG9KU09OKCk7XG4gICAgY29uc3QgbWFya2Rvd24gPSBzbGF0ZVRvTWFya2Rvd24ocmF3KTtcbiAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFJhd1ZhbHVlOiBtYXJrZG93biB9LCAoKSA9PiBvbkNoYW5nZShtYXJrZG93bikpO1xuICB9LCAxNTApO1xuXG4gIGhhbmRsZUNoYW5nZSA9IGNoYW5nZSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnZhbHVlLmRvY3VtZW50LmVxdWFscyhjaGFuZ2UudmFsdWUuZG9jdW1lbnQpKSB7XG4gICAgICB0aGlzLmhhbmRsZURvY3VtZW50Q2hhbmdlKGNoYW5nZSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogY2hhbmdlLnZhbHVlIH0pO1xuICB9O1xuXG4gIHByb2Nlc3NSZWYgPSByZWYgPT4ge1xuICAgIHRoaXMucmVmID0gcmVmO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9uQWRkQXNzZXQsIGdldEFzc2V0LCBjbGFzc05hbWUsIGZpZWxkLCBnZXRFZGl0b3JDb21wb25lbnRzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxWaXN1YWxFZGl0b3JDb250YWluZXI+XG4gICAgICAgIDxFZGl0b3JDb250cm9sQmFyPlxuICAgICAgICAgIDxUb29sYmFyXG4gICAgICAgICAgICBvbk1hcmtDbGljaz17dGhpcy5oYW5kbGVNYXJrQ2xpY2t9XG4gICAgICAgICAgICBvbkJsb2NrQ2xpY2s9e3RoaXMuaGFuZGxlQmxvY2tDbGlja31cbiAgICAgICAgICAgIG9uTGlua0NsaWNrPXt0aGlzLmhhbmRsZUxpbmt9XG4gICAgICAgICAgICBzZWxlY3Rpb25IYXNNYXJrPXt0aGlzLnNlbGVjdGlvbkhhc01hcmt9XG4gICAgICAgICAgICBzZWxlY3Rpb25IYXNCbG9jaz17dGhpcy5zZWxlY3Rpb25IYXNCbG9ja31cbiAgICAgICAgICAgIHNlbGVjdGlvbkhhc0xpbms9e3RoaXMuaGFzTGlua3N9XG4gICAgICAgICAgICBvblRvZ2dsZU1vZGU9e3RoaXMuaGFuZGxlVG9nZ2xlfVxuICAgICAgICAgICAgcGx1Z2lucz17Z2V0RWRpdG9yQ29tcG9uZW50cygpfVxuICAgICAgICAgICAgb25TdWJtaXQ9e3RoaXMuaGFuZGxlUGx1Z2luQWRkfVxuICAgICAgICAgICAgb25BZGRBc3NldD17b25BZGRBc3NldH1cbiAgICAgICAgICAgIGdldEFzc2V0PXtnZXRBc3NldH1cbiAgICAgICAgICAgIGJ1dHRvbnM9e2ZpZWxkLmdldCgnYnV0dG9ucycpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRWRpdG9yQ29udHJvbEJhcj5cbiAgICAgICAgPENsYXNzTmFtZXM+XG4gICAgICAgICAgeyh7IGNzcywgY3ggfSkgPT4gKFxuICAgICAgICAgICAgPFNsYXRlXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNzc2BcbiAgICAgICAgICAgICAgICAgICR7dmlzdWFsRWRpdG9yU3R5bGVzfVxuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgICByZW5kZXJOb2RlPXtyZW5kZXJOb2RlfVxuICAgICAgICAgICAgICByZW5kZXJNYXJrPXtyZW5kZXJNYXJrfVxuICAgICAgICAgICAgICB2YWxpZGF0ZU5vZGU9e3ZhbGlkYXRlTm9kZX1cbiAgICAgICAgICAgICAgcGx1Z2lucz17cGx1Z2luc31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBvbktleURvd249e29uS2V5RG93bn1cbiAgICAgICAgICAgICAgb25QYXN0ZT17dGhpcy5oYW5kbGVQYXN0ZX1cbiAgICAgICAgICAgICAgcmVmPXt0aGlzLnByb2Nlc3NSZWZ9XG4gICAgICAgICAgICAgIHNwZWxsQ2hlY2tcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DbGFzc05hbWVzPlxuICAgICAgPC9WaXN1YWxFZGl0b3JDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuIl19 */"
});

const createEmptyRawDoc = () => {
  const emptyText = _slate.Text.create('');

  const emptyBlock = _slate.Block.create({
    object: 'block',
    type: 'paragraph',
    nodes: [emptyText]
  });

  return {
    nodes: [emptyBlock]
  };
};

const createSlateValue = rawValue => {
  const rawDoc = rawValue && (0, _serializers.markdownToSlate)(rawValue);
  const rawDocHasNodes = !(0, _isEmpty2.default)((0, _get2.default)(rawDoc, 'nodes'));

  const document = _slate.Document.fromJSON(rawDocHasNodes ? rawDoc : createEmptyRawDoc());

  return _slate.Value.create({
    document
  });
};

class Editor extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handlePaste", (e, data, change) => {
      if (data.type !== 'html' || data.isShift) {
        return;
      }

      const ast = (0, _serializers.htmlToSlate)(data.html);

      const doc = _slate.Document.fromJSON(ast);

      return change.insertFragment(doc);
    });

    _defineProperty(this, "selectionHasMark", type => this.state.value.activeMarks.some(mark => mark.type === type));

    _defineProperty(this, "selectionHasBlock", type => this.state.value.blocks.some(node => node.type === type));

    _defineProperty(this, "handleMarkClick", (event, type) => {
      event.preventDefault();
      const resolvedChange = this.state.value.change().focus().toggleMark(type);
      this.ref.onChange(resolvedChange);
      this.setState({
        value: resolvedChange.value
      });
    });

    _defineProperty(this, "handleBlockClick", (event, type) => {
      event.preventDefault();
      let value = this.state.value;
      const doc = value.document;
      const _EditListConfigured$c = _plugins.EditListConfigured.changes,
            unwrapList = _EditListConfigured$c.unwrapList,
            wrapInList = _EditListConfigured$c.wrapInList;
      let change = value.change(); // Handle everything except list buttons.

      if (!['bulleted-list', 'numbered-list'].includes(type)) {
        const isActive = this.selectionHasBlock(type);
        change = change.setBlocks(isActive ? 'paragraph' : type);
      } // Handle the extra wrapping required for list buttons.
      else {
          const isSameListType = value.blocks.some(block => {
            return !!doc.getClosest(block.key, parent => parent.type === type);
          });

          const isInList = _plugins.EditListConfigured.utils.isSelectionInList(value);

          if (isInList && isSameListType) {
            change = change.call(unwrapList, type);
          } else if (isInList) {
            const currentListType = type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list';
            change = change.call(unwrapList, currentListType).call(wrapInList, type);
          } else {
            change = change.call(wrapInList, type);
          }
        }

      const resolvedChange = change.focus();
      this.ref.onChange(resolvedChange);
      this.setState({
        value: resolvedChange.value
      });
    });

    _defineProperty(this, "hasLinks", () => {
      return this.state.value.inlines.some(inline => inline.type === 'link');
    });

    _defineProperty(this, "handleLink", () => {
      let change = this.state.value.change(); // If the current selection contains links, clicking the "link" button
      // should simply unlink them.

      if (this.hasLinks()) {
        change = change.unwrapInline('link');
      } else {
        const url = window.prompt('Enter the URL of the link'); // If nothing is entered in the URL prompt, do nothing.

        if (!url) return; // If no text is selected, use the entered URL as text.

        if (change.value.isCollapsed) {
          change = change.insertText(url).extend(0 - url.length);
        }

        change = change.wrapInline({
          type: 'link',
          data: {
            url
          }
        }).collapseToEnd();
      }

      this.ref.onChange(change);
      this.setState({
        value: change.value
      });
    });

    _defineProperty(this, "handlePluginAdd", pluginId => {
      const getEditorComponents = this.props.getEditorComponents;
      const value = this.state.value;
      const nodes = [_slate.Text.create('')];
      /**
       * Get default values for plugin fields.
       */

      const pluginFields = getEditorComponents().getIn([pluginId, 'fields'], (0, _immutable.List)());
      const defaultValues = pluginFields.toMap().mapKeys((_, field) => field.get('name')).filter(field => field.has('default')).map(field => field.get('default'));
      /**
       * Create new shortcode block with default values set.
       */

      const block = {
        object: 'block',
        type: 'shortcode',
        data: {
          shortcode: pluginId,
          shortcodeNew: true,
          shortcodeData: defaultValues
        },
        isVoid: true,
        nodes
      };
      let change = value.change();
      const focusBlock = change.value.focusBlock;

      if (focusBlock.text === '' && focusBlock.type === 'paragraph') {
        change = change.setNodeByKey(focusBlock.key, block);
      } else {
        change = change.insertBlock(block);
      }

      change = change.focus();
      this.ref.onChange(change);
      this.setState({
        value: change.value
      });
    });

    _defineProperty(this, "handleToggle", () => {
      this.props.onMode('raw');
    });

    _defineProperty(this, "handleDocumentChange", (0, _debounce2.default)(change => {
      const onChange = this.props.onChange;
      const raw = change.value.document.toJSON();
      const markdown = (0, _serializers.slateToMarkdown)(raw);
      this.setState({
        lastRawValue: markdown
      }, () => onChange(markdown));
    }, 150));

    _defineProperty(this, "handleChange", change => {
      if (!this.state.value.document.equals(change.value.document)) {
        this.handleDocumentChange(change);
      }

      this.setState({
        value: change.value
      });
    });

    _defineProperty(this, "processRef", ref => {
      this.ref = ref;
    });

    this.state = {
      value: createSlateValue(props.value),
      lastRawValue: props.value
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const forcePropsValue = this.shouldForcePropsValue(this.props.value, this.state.lastRawValue, nextProps.value, nextState.lastRawValue);
    return !this.state.value.equals(nextState.value) || forcePropsValue;
  }

  componentDidUpdate(prevProps, prevState) {
    const forcePropsValue = this.shouldForcePropsValue(prevProps.value, prevState.lastRawValue, this.props.value, this.state.lastRawValue);

    if (forcePropsValue) {
      this.setState({
        value: createSlateValue(this.props.value),
        lastRawValue: this.props.value
      });
    }
  } // If the old props/state values and new state value are all the same, and
  // the new props value does not match the others, the new props value
  // originated from outside of this widget and should be used.


  shouldForcePropsValue(oldPropsValue, oldStateValue, newPropsValue, newStateValue) {
    return (0, _uniq2.default)([oldPropsValue, oldStateValue, newStateValue]).length === 1 && oldPropsValue !== newPropsValue;
  }

  render() {
    const _this$props = this.props,
          onAddAsset = _this$props.onAddAsset,
          getAsset = _this$props.getAsset,
          className = _this$props.className,
          field = _this$props.field,
          getEditorComponents = _this$props.getEditorComponents;
    return _react.default.createElement(VisualEditorContainer, null, _react.default.createElement(_styles.EditorControlBar, null, _react.default.createElement(_Toolbar.default, {
      onMarkClick: this.handleMarkClick,
      onBlockClick: this.handleBlockClick,
      onLinkClick: this.handleLink,
      selectionHasMark: this.selectionHasMark,
      selectionHasBlock: this.selectionHasBlock,
      selectionHasLink: this.hasLinks,
      onToggleMode: this.handleToggle,
      plugins: getEditorComponents(),
      onSubmit: this.handlePluginAdd,
      onAddAsset: onAddAsset,
      getAsset: getAsset,
      buttons: field.get('buttons')
    })), _react.default.createElement(_core.ClassNames, null, (_ref) => {
      let css = _ref.css,
          cx = _ref.cx;
      return _react.default.createElement(_slateReact.Editor, {
        className: cx(className, css`
                  ${_visualEditorStyles.default}
                `),
        value: this.state.value,
        renderNode: _renderers.renderNode,
        renderMark: _renderers.renderMark,
        validateNode: _validators.validateNode,
        plugins: _plugins.default,
        onChange: this.handleChange,
        onKeyDown: _keys.default,
        onPaste: this.handlePaste,
        ref: this.processRef,
        spellCheck: true
      });
    }));
  }

}

exports.default = Editor;

_defineProperty(Editor, "propTypes", {
  onAddAsset: _propTypes.default.func.isRequired,
  getAsset: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onMode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired,
  getEditorComponents: _propTypes.default.func.isRequired
});