"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactHotLoader = require("react-hot-loader");

var _reactPolyglot = require("react-polyglot");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reduxNotifications = require("redux-notifications");

var _reactTopbarProgressIndicator = _interopRequireDefault(require("react-topbar-progress-indicator"));

var _config = require("../../actions/config");

var _auth = require("../../actions/auth");

var _backend = require("../../backend");

var _collections = require("../../actions/collections");

var _mediaLibrary = require("../../actions/mediaLibrary");

var _MediaLibrary = _interopRequireDefault(require("../MediaLibrary/MediaLibrary"));

var _UI = require("../UI");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _history = _interopRequireDefault(require("../../routing/history"));

var _publishModes = require("../../constants/publishModes");

var _Collection = _interopRequireDefault(require("../Collection/Collection"));

var _Workflow = _interopRequireDefault(require("../Workflow/Workflow"));

var _Editor = _interopRequireDefault(require("../Editor/Editor"));

var _NotFoundPage = _interopRequireDefault(require("./NotFoundPage"));

var _Header = _interopRequireDefault(require("./Header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_reactTopbarProgressIndicator.default.config({
  barColors: {
    '0': _netlifyCmsUiDefault.colors.active,
    '1.0': _netlifyCmsUiDefault.colors.active
  },
  shadowBlur: 0,
  barThickness: 2
});

const AppMainContainer = (0, _styledBase.default)("div", {
  target: "e1ghgnen0",
  label: "AppMainContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "123tny7",
  styles: "min-width:800px;max-width:1440px;margin:0 auto;"
} : {
  name: "123tny7",
  styles: "min-width:800px;max-width:1440px;margin:0 auto;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC9BcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUNtQyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ3JlYWN0LXBvbHlnbG90JztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCwgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IE5vdGlmcyB9IGZyb20gJ3JlZHV4LW5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IFRvcEJhclByb2dyZXNzIGZyb20gJ3JlYWN0LXRvcGJhci1wcm9ncmVzcy1pbmRpY2F0b3InO1xuaW1wb3J0IHsgbG9hZENvbmZpZyB9IGZyb20gJ0FjdGlvbnMvY29uZmlnJztcbmltcG9ydCB7IGxvZ2luVXNlciwgbG9nb3V0VXNlciB9IGZyb20gJ0FjdGlvbnMvYXV0aCc7XG5pbXBvcnQgeyBjdXJyZW50QmFja2VuZCB9IGZyb20gJ2NvcmVTcmMvYmFja2VuZCc7XG5pbXBvcnQgeyBjcmVhdGVOZXdFbnRyeSB9IGZyb20gJ0FjdGlvbnMvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgb3Blbk1lZGlhTGlicmFyeSB9IGZyb20gJ0FjdGlvbnMvbWVkaWFMaWJyYXJ5JztcbmltcG9ydCBNZWRpYUxpYnJhcnkgZnJvbSAnTWVkaWFMaWJyYXJ5L01lZGlhTGlicmFyeSc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJ1VJJztcbmltcG9ydCB7IExvYWRlciwgY29sb3JzIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgaGlzdG9yeSBmcm9tICdSb3V0aW5nL2hpc3RvcnknO1xuaW1wb3J0IHsgU0lNUExFLCBFRElUT1JJQUxfV09SS0ZMT1cgfSBmcm9tICdDb25zdGFudHMvcHVibGlzaE1vZGVzJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ0NvbGxlY3Rpb24vQ29sbGVjdGlvbic7XG5pbXBvcnQgV29ya2Zsb3cgZnJvbSAnV29ya2Zsb3cvV29ya2Zsb3cnO1xuaW1wb3J0IEVkaXRvciBmcm9tICdFZGl0b3IvRWRpdG9yJztcbmltcG9ydCBOb3RGb3VuZFBhZ2UgZnJvbSAnLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5cblRvcEJhclByb2dyZXNzLmNvbmZpZyh7XG4gIGJhckNvbG9yczoge1xuICAgICcwJzogY29sb3JzLmFjdGl2ZSxcbiAgICAnMS4wJzogY29sb3JzLmFjdGl2ZSxcbiAgfSxcbiAgc2hhZG93Qmx1cjogMCxcbiAgYmFyVGhpY2tuZXNzOiAyLFxufSk7XG5cbmNvbnN0IEFwcE1haW5Db250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtaW4td2lkdGg6IDgwMHB4O1xuICBtYXgtd2lkdGg6IDE0NDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG5gO1xuXG5jb25zdCBFcnJvckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbjogMjBweDtcbmA7XG5cbmNvbnN0IEVycm9yQ29kZUJsb2NrID0gc3R5bGVkLnByZWBcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbmA7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXV0aDogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcCxcbiAgICBjb25maWc6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAsXG4gICAgY29sbGVjdGlvbnM6IEltbXV0YWJsZVByb3BUeXBlcy5vcmRlcmVkTWFwLFxuICAgIGxvYWRDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbG9naW5Vc2VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGxvZ291dFVzZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlcjogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcCxcbiAgICBpc0ZldGNoaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHB1Ymxpc2hNb2RlOiBQcm9wVHlwZXMub25lT2YoW1NJTVBMRSwgRURJVE9SSUFMX1dPUktGTE9XXSksXG4gICAgc2l0ZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZU1lZGlhTGlicmFyeTogUHJvcFR5cGVzLmJvb2wsXG4gICAgb3Blbk1lZGlhTGlicmFyeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzaG93TWVkaWFCdXR0b246IFByb3BUeXBlcy5ib29sLFxuICAgIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uZmlnRXJyb3IoY29uZmlnKSB7XG4gICAgY29uc3QgdCA9IHRoaXMucHJvcHMudDtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yQ29udGFpbmVyPlxuICAgICAgICA8aDE+e3QoJ2FwcC5hcHAuZXJyb3JIZWFkZXInKX08L2gxPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdHJvbmc+e3QoJ2FwcC5hcHAuY29uZmlnRXJyb3JzJyl9Ojwvc3Ryb25nPlxuICAgICAgICAgIDxFcnJvckNvZGVCbG9jaz57Y29uZmlnLmdldCgnZXJyb3InKX08L0Vycm9yQ29kZUJsb2NrPlxuICAgICAgICAgIDxzcGFuPnt0KCdhcHAuYXBwLmNoZWNrQ29uZmlnWW1sJyl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRXJyb3JDb250YWluZXI+XG4gICAgKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgbG9hZENvbmZpZyB9ID0gdGhpcy5wcm9wcztcbiAgICBsb2FkQ29uZmlnKCk7XG4gIH1cblxuICBoYW5kbGVMb2dpbihjcmVkZW50aWFscykge1xuICAgIHRoaXMucHJvcHMubG9naW5Vc2VyKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIGF1dGhlbnRpY2F0aW5nKCkge1xuICAgIGNvbnN0IHsgYXV0aCwgdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBiYWNrZW5kID0gY3VycmVudEJhY2tlbmQodGhpcy5wcm9wcy5jb25maWcpO1xuXG4gICAgaWYgKGJhY2tlbmQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDE+e3QoJ2FwcC5hcHAud2FpdGluZ0JhY2tlbmQnKX08L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOb3RpZnMgQ3VzdG9tQ29tcG9uZW50PXtUb2FzdH0gLz5cbiAgICAgICAge1JlYWN0LmNyZWF0ZUVsZW1lbnQoYmFja2VuZC5hdXRoQ29tcG9uZW50KCksIHtcbiAgICAgICAgICBvbkxvZ2luOiB0aGlzLmhhbmRsZUxvZ2luLmJpbmQodGhpcyksXG4gICAgICAgICAgZXJyb3I6IGF1dGggJiYgYXV0aC5nZXQoJ2Vycm9yJyksXG4gICAgICAgICAgaXNGZXRjaGluZzogYXV0aCAmJiBhdXRoLmdldCgnaXNGZXRjaGluZycpLFxuICAgICAgICAgIGluUHJvZ3Jlc3M6IChhdXRoICYmIGF1dGguZ2V0KCdpc0ZldGNoaW5nJykpIHx8IGZhbHNlLFxuICAgICAgICAgIHNpdGVJZDogdGhpcy5wcm9wcy5jb25maWcuZ2V0SW4oWydiYWNrZW5kJywgJ3NpdGVfZG9tYWluJ10pLFxuICAgICAgICAgIGJhc2VfdXJsOiB0aGlzLnByb3BzLmNvbmZpZy5nZXRJbihbJ2JhY2tlbmQnLCAnYmFzZV91cmwnXSwgbnVsbCksXG4gICAgICAgICAgYXV0aEVuZHBvaW50OiB0aGlzLnByb3BzLmNvbmZpZy5nZXRJbihbJ2JhY2tlbmQnLCAnYXV0aF9lbmRwb2ludCddKSxcbiAgICAgICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLFxuICAgICAgICAgIGNsZWFySGFzaDogKCkgPT4gaGlzdG9yeS5yZXBsYWNlKCcvJyksXG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZUxpbmtDbGljayhldmVudCwgaGFuZGxlciwgLi4uYXJncykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlciguLi5hcmdzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB1c2VyLFxuICAgICAgY29uZmlnLFxuICAgICAgY29sbGVjdGlvbnMsXG4gICAgICBsb2dvdXRVc2VyLFxuICAgICAgaXNGZXRjaGluZyxcbiAgICAgIHB1Ymxpc2hNb2RlLFxuICAgICAgdXNlTWVkaWFMaWJyYXJ5LFxuICAgICAgb3Blbk1lZGlhTGlicmFyeSxcbiAgICAgIHQsXG4gICAgICBzaG93TWVkaWFCdXR0b24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY29uZmlnID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmdldCgnZXJyb3InKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnRXJyb3IoY29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmdldCgnaXNGZXRjaGluZycpKSB7XG4gICAgICByZXR1cm4gPExvYWRlciBhY3RpdmU+e3QoJ2FwcC5hcHAubG9hZGluZ0NvbmZpZycpfTwvTG9hZGVyPjtcbiAgICB9XG5cbiAgICBpZiAodXNlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoZW50aWNhdGluZyh0KTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0UGF0aCA9IGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ucy5maXJzdCgpLmdldCgnbmFtZScpfWA7XG4gICAgY29uc3QgaGFzV29ya2Zsb3cgPSBwdWJsaXNoTW9kZSA9PT0gRURJVE9SSUFMX1dPUktGTE9XO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxOb3RpZnMgQ3VzdG9tQ29tcG9uZW50PXtUb2FzdH0gLz5cbiAgICAgICAgPEhlYWRlclxuICAgICAgICAgIHVzZXI9e3VzZXJ9XG4gICAgICAgICAgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb25zfVxuICAgICAgICAgIG9uQ3JlYXRlRW50cnlDbGljaz17Y3JlYXRlTmV3RW50cnl9XG4gICAgICAgICAgb25Mb2dvdXRDbGljaz17bG9nb3V0VXNlcn1cbiAgICAgICAgICBvcGVuTWVkaWFMaWJyYXJ5PXtvcGVuTWVkaWFMaWJyYXJ5fVxuICAgICAgICAgIGhhc1dvcmtmbG93PXtoYXNXb3JrZmxvd31cbiAgICAgICAgICBkaXNwbGF5VXJsPXtjb25maWcuZ2V0KCdkaXNwbGF5X3VybCcpfVxuICAgICAgICAgIHNob3dNZWRpYUJ1dHRvbj17c2hvd01lZGlhQnV0dG9ufVxuICAgICAgICAvPlxuICAgICAgICA8QXBwTWFpbkNvbnRhaW5lcj5cbiAgICAgICAgICB7aXNGZXRjaGluZyAmJiA8VG9wQmFyUHJvZ3Jlc3MgLz59XG4gICAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSZWRpcmVjdCBleGFjdCBmcm9tPVwiL1wiIHRvPXtkZWZhdWx0UGF0aH0gLz5cbiAgICAgICAgICAgIDxSZWRpcmVjdCBleGFjdCBmcm9tPVwiL3NlYXJjaC9cIiB0bz17ZGVmYXVsdFBhdGh9IC8+XG4gICAgICAgICAgICB7aGFzV29ya2Zsb3cgPyA8Um91dGUgcGF0aD1cIi93b3JrZmxvd1wiIGNvbXBvbmVudD17V29ya2Zsb3d9IC8+IDogbnVsbH1cbiAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICBleGFjdFxuICAgICAgICAgICAgICBwYXRoPVwiL2NvbGxlY3Rpb25zLzpuYW1lXCJcbiAgICAgICAgICAgICAgcmVuZGVyPXtwcm9wcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbkV4aXN0cyA9IGNvbGxlY3Rpb25zLmdldChwcm9wcy5tYXRjaC5wYXJhbXMubmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25FeGlzdHMgPyA8Q29sbGVjdGlvbiB7Li4ucHJvcHN9IC8+IDogPFJlZGlyZWN0IHRvPXtkZWZhdWx0UGF0aH0gLz47XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdXRlXG4gICAgICAgICAgICAgIHBhdGg9XCIvY29sbGVjdGlvbnMvOm5hbWUvbmV3XCJcbiAgICAgICAgICAgICAgcmVuZGVyPXtwcm9wcyA9PiA8RWRpdG9yIHsuLi5wcm9wc30gbmV3UmVjb3JkIC8+fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2NvbGxlY3Rpb25zLzpuYW1lL2VudHJpZXMvOnNsdWdcIiBjb21wb25lbnQ9e0VkaXRvcn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICBwYXRoPVwiL3NlYXJjaC86c2VhcmNoVGVybVwiXG4gICAgICAgICAgICAgIHJlbmRlcj17cHJvcHMgPT4gPENvbGxlY3Rpb24gey4uLnByb3BzfSBpc1NlYXJjaFJlc3VsdHMgLz59XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdXRlIGNvbXBvbmVudD17Tm90Rm91bmRQYWdlfSAvPlxuICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICAgIHt1c2VNZWRpYUxpYnJhcnkgPyA8TWVkaWFMaWJyYXJ5IC8+IDogbnVsbH1cbiAgICAgICAgPC9BcHBNYWluQ29udGFpbmVyPlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgY29uc3QgeyBhdXRoLCBjb25maWcsIGNvbGxlY3Rpb25zLCBnbG9iYWxVSSwgbWVkaWFMaWJyYXJ5IH0gPSBzdGF0ZTtcbiAgY29uc3QgdXNlciA9IGF1dGggJiYgYXV0aC5nZXQoJ3VzZXInKTtcbiAgY29uc3QgaXNGZXRjaGluZyA9IGdsb2JhbFVJLmdldCgnaXNGZXRjaGluZycpO1xuICBjb25zdCBwdWJsaXNoTW9kZSA9IGNvbmZpZyAmJiBjb25maWcuZ2V0KCdwdWJsaXNoX21vZGUnKTtcbiAgY29uc3QgdXNlTWVkaWFMaWJyYXJ5ID0gIW1lZGlhTGlicmFyeS5nZXQoJ2V4dGVybmFsTGlicmFyeScpO1xuICBjb25zdCBzaG93TWVkaWFCdXR0b24gPSBtZWRpYUxpYnJhcnkuZ2V0KCdzaG93TWVkaWFCdXR0b24nKTtcbiAgcmV0dXJuIHtcbiAgICBhdXRoLFxuICAgIGNvbmZpZyxcbiAgICBjb2xsZWN0aW9ucyxcbiAgICB1c2VyLFxuICAgIGlzRmV0Y2hpbmcsXG4gICAgcHVibGlzaE1vZGUsXG4gICAgc2hvd01lZGlhQnV0dG9uLFxuICAgIHVzZU1lZGlhTGlicmFyeSxcbiAgfTtcbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvcGVuTWVkaWFMaWJyYXJ5LFxuICBsb2FkQ29uZmlnLFxuICBsb2dpblVzZXIsXG4gIGxvZ291dFVzZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBob3QobW9kdWxlKShcbiAgY29ubmVjdChcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuICApKHRyYW5zbGF0ZSgpKEFwcCkpLFxuKTtcbiJdfQ== */"
});
const ErrorContainer = (0, _styledBase.default)("div", {
  target: "e1ghgnen1",
  label: "ErrorContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "zwiamn",
  styles: "margin:20px;"
} : {
  name: "zwiamn",
  styles: "margin:20px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC9BcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUNpQyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ3JlYWN0LXBvbHlnbG90JztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCwgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IE5vdGlmcyB9IGZyb20gJ3JlZHV4LW5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IFRvcEJhclByb2dyZXNzIGZyb20gJ3JlYWN0LXRvcGJhci1wcm9ncmVzcy1pbmRpY2F0b3InO1xuaW1wb3J0IHsgbG9hZENvbmZpZyB9IGZyb20gJ0FjdGlvbnMvY29uZmlnJztcbmltcG9ydCB7IGxvZ2luVXNlciwgbG9nb3V0VXNlciB9IGZyb20gJ0FjdGlvbnMvYXV0aCc7XG5pbXBvcnQgeyBjdXJyZW50QmFja2VuZCB9IGZyb20gJ2NvcmVTcmMvYmFja2VuZCc7XG5pbXBvcnQgeyBjcmVhdGVOZXdFbnRyeSB9IGZyb20gJ0FjdGlvbnMvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgb3Blbk1lZGlhTGlicmFyeSB9IGZyb20gJ0FjdGlvbnMvbWVkaWFMaWJyYXJ5JztcbmltcG9ydCBNZWRpYUxpYnJhcnkgZnJvbSAnTWVkaWFMaWJyYXJ5L01lZGlhTGlicmFyeSc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJ1VJJztcbmltcG9ydCB7IExvYWRlciwgY29sb3JzIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgaGlzdG9yeSBmcm9tICdSb3V0aW5nL2hpc3RvcnknO1xuaW1wb3J0IHsgU0lNUExFLCBFRElUT1JJQUxfV09SS0ZMT1cgfSBmcm9tICdDb25zdGFudHMvcHVibGlzaE1vZGVzJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ0NvbGxlY3Rpb24vQ29sbGVjdGlvbic7XG5pbXBvcnQgV29ya2Zsb3cgZnJvbSAnV29ya2Zsb3cvV29ya2Zsb3cnO1xuaW1wb3J0IEVkaXRvciBmcm9tICdFZGl0b3IvRWRpdG9yJztcbmltcG9ydCBOb3RGb3VuZFBhZ2UgZnJvbSAnLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5cblRvcEJhclByb2dyZXNzLmNvbmZpZyh7XG4gIGJhckNvbG9yczoge1xuICAgICcwJzogY29sb3JzLmFjdGl2ZSxcbiAgICAnMS4wJzogY29sb3JzLmFjdGl2ZSxcbiAgfSxcbiAgc2hhZG93Qmx1cjogMCxcbiAgYmFyVGhpY2tuZXNzOiAyLFxufSk7XG5cbmNvbnN0IEFwcE1haW5Db250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtaW4td2lkdGg6IDgwMHB4O1xuICBtYXgtd2lkdGg6IDE0NDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG5gO1xuXG5jb25zdCBFcnJvckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbjogMjBweDtcbmA7XG5cbmNvbnN0IEVycm9yQ29kZUJsb2NrID0gc3R5bGVkLnByZWBcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbmA7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXV0aDogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcCxcbiAgICBjb25maWc6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAsXG4gICAgY29sbGVjdGlvbnM6IEltbXV0YWJsZVByb3BUeXBlcy5vcmRlcmVkTWFwLFxuICAgIGxvYWRDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbG9naW5Vc2VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGxvZ291dFVzZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlcjogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcCxcbiAgICBpc0ZldGNoaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHB1Ymxpc2hNb2RlOiBQcm9wVHlwZXMub25lT2YoW1NJTVBMRSwgRURJVE9SSUFMX1dPUktGTE9XXSksXG4gICAgc2l0ZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZU1lZGlhTGlicmFyeTogUHJvcFR5cGVzLmJvb2wsXG4gICAgb3Blbk1lZGlhTGlicmFyeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzaG93TWVkaWFCdXR0b246IFByb3BUeXBlcy5ib29sLFxuICAgIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uZmlnRXJyb3IoY29uZmlnKSB7XG4gICAgY29uc3QgdCA9IHRoaXMucHJvcHMudDtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yQ29udGFpbmVyPlxuICAgICAgICA8aDE+e3QoJ2FwcC5hcHAuZXJyb3JIZWFkZXInKX08L2gxPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdHJvbmc+e3QoJ2FwcC5hcHAuY29uZmlnRXJyb3JzJyl9Ojwvc3Ryb25nPlxuICAgICAgICAgIDxFcnJvckNvZGVCbG9jaz57Y29uZmlnLmdldCgnZXJyb3InKX08L0Vycm9yQ29kZUJsb2NrPlxuICAgICAgICAgIDxzcGFuPnt0KCdhcHAuYXBwLmNoZWNrQ29uZmlnWW1sJyl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRXJyb3JDb250YWluZXI+XG4gICAgKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgbG9hZENvbmZpZyB9ID0gdGhpcy5wcm9wcztcbiAgICBsb2FkQ29uZmlnKCk7XG4gIH1cblxuICBoYW5kbGVMb2dpbihjcmVkZW50aWFscykge1xuICAgIHRoaXMucHJvcHMubG9naW5Vc2VyKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIGF1dGhlbnRpY2F0aW5nKCkge1xuICAgIGNvbnN0IHsgYXV0aCwgdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBiYWNrZW5kID0gY3VycmVudEJhY2tlbmQodGhpcy5wcm9wcy5jb25maWcpO1xuXG4gICAgaWYgKGJhY2tlbmQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDE+e3QoJ2FwcC5hcHAud2FpdGluZ0JhY2tlbmQnKX08L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOb3RpZnMgQ3VzdG9tQ29tcG9uZW50PXtUb2FzdH0gLz5cbiAgICAgICAge1JlYWN0LmNyZWF0ZUVsZW1lbnQoYmFja2VuZC5hdXRoQ29tcG9uZW50KCksIHtcbiAgICAgICAgICBvbkxvZ2luOiB0aGlzLmhhbmRsZUxvZ2luLmJpbmQodGhpcyksXG4gICAgICAgICAgZXJyb3I6IGF1dGggJiYgYXV0aC5nZXQoJ2Vycm9yJyksXG4gICAgICAgICAgaXNGZXRjaGluZzogYXV0aCAmJiBhdXRoLmdldCgnaXNGZXRjaGluZycpLFxuICAgICAgICAgIGluUHJvZ3Jlc3M6IChhdXRoICYmIGF1dGguZ2V0KCdpc0ZldGNoaW5nJykpIHx8IGZhbHNlLFxuICAgICAgICAgIHNpdGVJZDogdGhpcy5wcm9wcy5jb25maWcuZ2V0SW4oWydiYWNrZW5kJywgJ3NpdGVfZG9tYWluJ10pLFxuICAgICAgICAgIGJhc2VfdXJsOiB0aGlzLnByb3BzLmNvbmZpZy5nZXRJbihbJ2JhY2tlbmQnLCAnYmFzZV91cmwnXSwgbnVsbCksXG4gICAgICAgICAgYXV0aEVuZHBvaW50OiB0aGlzLnByb3BzLmNvbmZpZy5nZXRJbihbJ2JhY2tlbmQnLCAnYXV0aF9lbmRwb2ludCddKSxcbiAgICAgICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLFxuICAgICAgICAgIGNsZWFySGFzaDogKCkgPT4gaGlzdG9yeS5yZXBsYWNlKCcvJyksXG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZUxpbmtDbGljayhldmVudCwgaGFuZGxlciwgLi4uYXJncykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlciguLi5hcmdzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB1c2VyLFxuICAgICAgY29uZmlnLFxuICAgICAgY29sbGVjdGlvbnMsXG4gICAgICBsb2dvdXRVc2VyLFxuICAgICAgaXNGZXRjaGluZyxcbiAgICAgIHB1Ymxpc2hNb2RlLFxuICAgICAgdXNlTWVkaWFMaWJyYXJ5LFxuICAgICAgb3Blbk1lZGlhTGlicmFyeSxcbiAgICAgIHQsXG4gICAgICBzaG93TWVkaWFCdXR0b24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY29uZmlnID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmdldCgnZXJyb3InKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnRXJyb3IoY29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmdldCgnaXNGZXRjaGluZycpKSB7XG4gICAgICByZXR1cm4gPExvYWRlciBhY3RpdmU+e3QoJ2FwcC5hcHAubG9hZGluZ0NvbmZpZycpfTwvTG9hZGVyPjtcbiAgICB9XG5cbiAgICBpZiAodXNlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoZW50aWNhdGluZyh0KTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0UGF0aCA9IGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ucy5maXJzdCgpLmdldCgnbmFtZScpfWA7XG4gICAgY29uc3QgaGFzV29ya2Zsb3cgPSBwdWJsaXNoTW9kZSA9PT0gRURJVE9SSUFMX1dPUktGTE9XO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxOb3RpZnMgQ3VzdG9tQ29tcG9uZW50PXtUb2FzdH0gLz5cbiAgICAgICAgPEhlYWRlclxuICAgICAgICAgIHVzZXI9e3VzZXJ9XG4gICAgICAgICAgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb25zfVxuICAgICAgICAgIG9uQ3JlYXRlRW50cnlDbGljaz17Y3JlYXRlTmV3RW50cnl9XG4gICAgICAgICAgb25Mb2dvdXRDbGljaz17bG9nb3V0VXNlcn1cbiAgICAgICAgICBvcGVuTWVkaWFMaWJyYXJ5PXtvcGVuTWVkaWFMaWJyYXJ5fVxuICAgICAgICAgIGhhc1dvcmtmbG93PXtoYXNXb3JrZmxvd31cbiAgICAgICAgICBkaXNwbGF5VXJsPXtjb25maWcuZ2V0KCdkaXNwbGF5X3VybCcpfVxuICAgICAgICAgIHNob3dNZWRpYUJ1dHRvbj17c2hvd01lZGlhQnV0dG9ufVxuICAgICAgICAvPlxuICAgICAgICA8QXBwTWFpbkNvbnRhaW5lcj5cbiAgICAgICAgICB7aXNGZXRjaGluZyAmJiA8VG9wQmFyUHJvZ3Jlc3MgLz59XG4gICAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSZWRpcmVjdCBleGFjdCBmcm9tPVwiL1wiIHRvPXtkZWZhdWx0UGF0aH0gLz5cbiAgICAgICAgICAgIDxSZWRpcmVjdCBleGFjdCBmcm9tPVwiL3NlYXJjaC9cIiB0bz17ZGVmYXVsdFBhdGh9IC8+XG4gICAgICAgICAgICB7aGFzV29ya2Zsb3cgPyA8Um91dGUgcGF0aD1cIi93b3JrZmxvd1wiIGNvbXBvbmVudD17V29ya2Zsb3d9IC8+IDogbnVsbH1cbiAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICBleGFjdFxuICAgICAgICAgICAgICBwYXRoPVwiL2NvbGxlY3Rpb25zLzpuYW1lXCJcbiAgICAgICAgICAgICAgcmVuZGVyPXtwcm9wcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbkV4aXN0cyA9IGNvbGxlY3Rpb25zLmdldChwcm9wcy5tYXRjaC5wYXJhbXMubmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25FeGlzdHMgPyA8Q29sbGVjdGlvbiB7Li4ucHJvcHN9IC8+IDogPFJlZGlyZWN0IHRvPXtkZWZhdWx0UGF0aH0gLz47XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdXRlXG4gICAgICAgICAgICAgIHBhdGg9XCIvY29sbGVjdGlvbnMvOm5hbWUvbmV3XCJcbiAgICAgICAgICAgICAgcmVuZGVyPXtwcm9wcyA9PiA8RWRpdG9yIHsuLi5wcm9wc30gbmV3UmVjb3JkIC8+fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2NvbGxlY3Rpb25zLzpuYW1lL2VudHJpZXMvOnNsdWdcIiBjb21wb25lbnQ9e0VkaXRvcn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICBwYXRoPVwiL3NlYXJjaC86c2VhcmNoVGVybVwiXG4gICAgICAgICAgICAgIHJlbmRlcj17cHJvcHMgPT4gPENvbGxlY3Rpb24gey4uLnByb3BzfSBpc1NlYXJjaFJlc3VsdHMgLz59XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdXRlIGNvbXBvbmVudD17Tm90Rm91bmRQYWdlfSAvPlxuICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICAgIHt1c2VNZWRpYUxpYnJhcnkgPyA8TWVkaWFMaWJyYXJ5IC8+IDogbnVsbH1cbiAgICAgICAgPC9BcHBNYWluQ29udGFpbmVyPlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgY29uc3QgeyBhdXRoLCBjb25maWcsIGNvbGxlY3Rpb25zLCBnbG9iYWxVSSwgbWVkaWFMaWJyYXJ5IH0gPSBzdGF0ZTtcbiAgY29uc3QgdXNlciA9IGF1dGggJiYgYXV0aC5nZXQoJ3VzZXInKTtcbiAgY29uc3QgaXNGZXRjaGluZyA9IGdsb2JhbFVJLmdldCgnaXNGZXRjaGluZycpO1xuICBjb25zdCBwdWJsaXNoTW9kZSA9IGNvbmZpZyAmJiBjb25maWcuZ2V0KCdwdWJsaXNoX21vZGUnKTtcbiAgY29uc3QgdXNlTWVkaWFMaWJyYXJ5ID0gIW1lZGlhTGlicmFyeS5nZXQoJ2V4dGVybmFsTGlicmFyeScpO1xuICBjb25zdCBzaG93TWVkaWFCdXR0b24gPSBtZWRpYUxpYnJhcnkuZ2V0KCdzaG93TWVkaWFCdXR0b24nKTtcbiAgcmV0dXJuIHtcbiAgICBhdXRoLFxuICAgIGNvbmZpZyxcbiAgICBjb2xsZWN0aW9ucyxcbiAgICB1c2VyLFxuICAgIGlzRmV0Y2hpbmcsXG4gICAgcHVibGlzaE1vZGUsXG4gICAgc2hvd01lZGlhQnV0dG9uLFxuICAgIHVzZU1lZGlhTGlicmFyeSxcbiAgfTtcbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvcGVuTWVkaWFMaWJyYXJ5LFxuICBsb2FkQ29uZmlnLFxuICBsb2dpblVzZXIsXG4gIGxvZ291dFVzZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBob3QobW9kdWxlKShcbiAgY29ubmVjdChcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuICApKHRyYW5zbGF0ZSgpKEFwcCkpLFxuKTtcbiJdfQ== */"
});
const ErrorCodeBlock = (0, _styledBase.default)("pre", {
  target: "e1ghgnen2",
  label: "ErrorCodeBlock"
})(process.env.NODE_ENV === "production" ? {
  name: "1v6y79z",
  styles: "margin-left:20px;font-size:15px;line-height:1.5;"
} : {
  name: "1v6y79z",
  styles: "margin-left:20px;font-size:15px;line-height:1.5;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FwcC9BcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkNpQyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ3JlYWN0LXBvbHlnbG90JztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCwgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IE5vdGlmcyB9IGZyb20gJ3JlZHV4LW5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IFRvcEJhclByb2dyZXNzIGZyb20gJ3JlYWN0LXRvcGJhci1wcm9ncmVzcy1pbmRpY2F0b3InO1xuaW1wb3J0IHsgbG9hZENvbmZpZyB9IGZyb20gJ0FjdGlvbnMvY29uZmlnJztcbmltcG9ydCB7IGxvZ2luVXNlciwgbG9nb3V0VXNlciB9IGZyb20gJ0FjdGlvbnMvYXV0aCc7XG5pbXBvcnQgeyBjdXJyZW50QmFja2VuZCB9IGZyb20gJ2NvcmVTcmMvYmFja2VuZCc7XG5pbXBvcnQgeyBjcmVhdGVOZXdFbnRyeSB9IGZyb20gJ0FjdGlvbnMvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgb3Blbk1lZGlhTGlicmFyeSB9IGZyb20gJ0FjdGlvbnMvbWVkaWFMaWJyYXJ5JztcbmltcG9ydCBNZWRpYUxpYnJhcnkgZnJvbSAnTWVkaWFMaWJyYXJ5L01lZGlhTGlicmFyeSc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJ1VJJztcbmltcG9ydCB7IExvYWRlciwgY29sb3JzIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5pbXBvcnQgaGlzdG9yeSBmcm9tICdSb3V0aW5nL2hpc3RvcnknO1xuaW1wb3J0IHsgU0lNUExFLCBFRElUT1JJQUxfV09SS0ZMT1cgfSBmcm9tICdDb25zdGFudHMvcHVibGlzaE1vZGVzJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ0NvbGxlY3Rpb24vQ29sbGVjdGlvbic7XG5pbXBvcnQgV29ya2Zsb3cgZnJvbSAnV29ya2Zsb3cvV29ya2Zsb3cnO1xuaW1wb3J0IEVkaXRvciBmcm9tICdFZGl0b3IvRWRpdG9yJztcbmltcG9ydCBOb3RGb3VuZFBhZ2UgZnJvbSAnLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5cblRvcEJhclByb2dyZXNzLmNvbmZpZyh7XG4gIGJhckNvbG9yczoge1xuICAgICcwJzogY29sb3JzLmFjdGl2ZSxcbiAgICAnMS4wJzogY29sb3JzLmFjdGl2ZSxcbiAgfSxcbiAgc2hhZG93Qmx1cjogMCxcbiAgYmFyVGhpY2tuZXNzOiAyLFxufSk7XG5cbmNvbnN0IEFwcE1haW5Db250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtaW4td2lkdGg6IDgwMHB4O1xuICBtYXgtd2lkdGg6IDE0NDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG5gO1xuXG5jb25zdCBFcnJvckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbjogMjBweDtcbmA7XG5cbmNvbnN0IEVycm9yQ29kZUJsb2NrID0gc3R5bGVkLnByZWBcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbmA7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYXV0aDogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcCxcbiAgICBjb25maWc6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAsXG4gICAgY29sbGVjdGlvbnM6IEltbXV0YWJsZVByb3BUeXBlcy5vcmRlcmVkTWFwLFxuICAgIGxvYWRDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbG9naW5Vc2VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGxvZ291dFVzZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXNlcjogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcCxcbiAgICBpc0ZldGNoaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHB1Ymxpc2hNb2RlOiBQcm9wVHlwZXMub25lT2YoW1NJTVBMRSwgRURJVE9SSUFMX1dPUktGTE9XXSksXG4gICAgc2l0ZUlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHVzZU1lZGlhTGlicmFyeTogUHJvcFR5cGVzLmJvb2wsXG4gICAgb3Blbk1lZGlhTGlicmFyeTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzaG93TWVkaWFCdXR0b246IFByb3BUeXBlcy5ib29sLFxuICAgIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29uZmlnRXJyb3IoY29uZmlnKSB7XG4gICAgY29uc3QgdCA9IHRoaXMucHJvcHMudDtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yQ29udGFpbmVyPlxuICAgICAgICA8aDE+e3QoJ2FwcC5hcHAuZXJyb3JIZWFkZXInKX08L2gxPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdHJvbmc+e3QoJ2FwcC5hcHAuY29uZmlnRXJyb3JzJyl9Ojwvc3Ryb25nPlxuICAgICAgICAgIDxFcnJvckNvZGVCbG9jaz57Y29uZmlnLmdldCgnZXJyb3InKX08L0Vycm9yQ29kZUJsb2NrPlxuICAgICAgICAgIDxzcGFuPnt0KCdhcHAuYXBwLmNoZWNrQ29uZmlnWW1sJyl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvRXJyb3JDb250YWluZXI+XG4gICAgKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgbG9hZENvbmZpZyB9ID0gdGhpcy5wcm9wcztcbiAgICBsb2FkQ29uZmlnKCk7XG4gIH1cblxuICBoYW5kbGVMb2dpbihjcmVkZW50aWFscykge1xuICAgIHRoaXMucHJvcHMubG9naW5Vc2VyKGNyZWRlbnRpYWxzKTtcbiAgfVxuXG4gIGF1dGhlbnRpY2F0aW5nKCkge1xuICAgIGNvbnN0IHsgYXV0aCwgdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBiYWNrZW5kID0gY3VycmVudEJhY2tlbmQodGhpcy5wcm9wcy5jb25maWcpO1xuXG4gICAgaWYgKGJhY2tlbmQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDE+e3QoJ2FwcC5hcHAud2FpdGluZ0JhY2tlbmQnKX08L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOb3RpZnMgQ3VzdG9tQ29tcG9uZW50PXtUb2FzdH0gLz5cbiAgICAgICAge1JlYWN0LmNyZWF0ZUVsZW1lbnQoYmFja2VuZC5hdXRoQ29tcG9uZW50KCksIHtcbiAgICAgICAgICBvbkxvZ2luOiB0aGlzLmhhbmRsZUxvZ2luLmJpbmQodGhpcyksXG4gICAgICAgICAgZXJyb3I6IGF1dGggJiYgYXV0aC5nZXQoJ2Vycm9yJyksXG4gICAgICAgICAgaXNGZXRjaGluZzogYXV0aCAmJiBhdXRoLmdldCgnaXNGZXRjaGluZycpLFxuICAgICAgICAgIGluUHJvZ3Jlc3M6IChhdXRoICYmIGF1dGguZ2V0KCdpc0ZldGNoaW5nJykpIHx8IGZhbHNlLFxuICAgICAgICAgIHNpdGVJZDogdGhpcy5wcm9wcy5jb25maWcuZ2V0SW4oWydiYWNrZW5kJywgJ3NpdGVfZG9tYWluJ10pLFxuICAgICAgICAgIGJhc2VfdXJsOiB0aGlzLnByb3BzLmNvbmZpZy5nZXRJbihbJ2JhY2tlbmQnLCAnYmFzZV91cmwnXSwgbnVsbCksXG4gICAgICAgICAgYXV0aEVuZHBvaW50OiB0aGlzLnByb3BzLmNvbmZpZy5nZXRJbihbJ2JhY2tlbmQnLCAnYXV0aF9lbmRwb2ludCddKSxcbiAgICAgICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLFxuICAgICAgICAgIGNsZWFySGFzaDogKCkgPT4gaGlzdG9yeS5yZXBsYWNlKCcvJyksXG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZUxpbmtDbGljayhldmVudCwgaGFuZGxlciwgLi4uYXJncykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlciguLi5hcmdzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB1c2VyLFxuICAgICAgY29uZmlnLFxuICAgICAgY29sbGVjdGlvbnMsXG4gICAgICBsb2dvdXRVc2VyLFxuICAgICAgaXNGZXRjaGluZyxcbiAgICAgIHB1Ymxpc2hNb2RlLFxuICAgICAgdXNlTWVkaWFMaWJyYXJ5LFxuICAgICAgb3Blbk1lZGlhTGlicmFyeSxcbiAgICAgIHQsXG4gICAgICBzaG93TWVkaWFCdXR0b24sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoY29uZmlnID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmdldCgnZXJyb3InKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnRXJyb3IoY29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmdldCgnaXNGZXRjaGluZycpKSB7XG4gICAgICByZXR1cm4gPExvYWRlciBhY3RpdmU+e3QoJ2FwcC5hcHAubG9hZGluZ0NvbmZpZycpfTwvTG9hZGVyPjtcbiAgICB9XG5cbiAgICBpZiAodXNlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoZW50aWNhdGluZyh0KTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0UGF0aCA9IGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ucy5maXJzdCgpLmdldCgnbmFtZScpfWA7XG4gICAgY29uc3QgaGFzV29ya2Zsb3cgPSBwdWJsaXNoTW9kZSA9PT0gRURJVE9SSUFMX1dPUktGTE9XO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxOb3RpZnMgQ3VzdG9tQ29tcG9uZW50PXtUb2FzdH0gLz5cbiAgICAgICAgPEhlYWRlclxuICAgICAgICAgIHVzZXI9e3VzZXJ9XG4gICAgICAgICAgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb25zfVxuICAgICAgICAgIG9uQ3JlYXRlRW50cnlDbGljaz17Y3JlYXRlTmV3RW50cnl9XG4gICAgICAgICAgb25Mb2dvdXRDbGljaz17bG9nb3V0VXNlcn1cbiAgICAgICAgICBvcGVuTWVkaWFMaWJyYXJ5PXtvcGVuTWVkaWFMaWJyYXJ5fVxuICAgICAgICAgIGhhc1dvcmtmbG93PXtoYXNXb3JrZmxvd31cbiAgICAgICAgICBkaXNwbGF5VXJsPXtjb25maWcuZ2V0KCdkaXNwbGF5X3VybCcpfVxuICAgICAgICAgIHNob3dNZWRpYUJ1dHRvbj17c2hvd01lZGlhQnV0dG9ufVxuICAgICAgICAvPlxuICAgICAgICA8QXBwTWFpbkNvbnRhaW5lcj5cbiAgICAgICAgICB7aXNGZXRjaGluZyAmJiA8VG9wQmFyUHJvZ3Jlc3MgLz59XG4gICAgICAgICAgPFN3aXRjaD5cbiAgICAgICAgICAgIDxSZWRpcmVjdCBleGFjdCBmcm9tPVwiL1wiIHRvPXtkZWZhdWx0UGF0aH0gLz5cbiAgICAgICAgICAgIDxSZWRpcmVjdCBleGFjdCBmcm9tPVwiL3NlYXJjaC9cIiB0bz17ZGVmYXVsdFBhdGh9IC8+XG4gICAgICAgICAgICB7aGFzV29ya2Zsb3cgPyA8Um91dGUgcGF0aD1cIi93b3JrZmxvd1wiIGNvbXBvbmVudD17V29ya2Zsb3d9IC8+IDogbnVsbH1cbiAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICBleGFjdFxuICAgICAgICAgICAgICBwYXRoPVwiL2NvbGxlY3Rpb25zLzpuYW1lXCJcbiAgICAgICAgICAgICAgcmVuZGVyPXtwcm9wcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbkV4aXN0cyA9IGNvbGxlY3Rpb25zLmdldChwcm9wcy5tYXRjaC5wYXJhbXMubmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25FeGlzdHMgPyA8Q29sbGVjdGlvbiB7Li4ucHJvcHN9IC8+IDogPFJlZGlyZWN0IHRvPXtkZWZhdWx0UGF0aH0gLz47XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdXRlXG4gICAgICAgICAgICAgIHBhdGg9XCIvY29sbGVjdGlvbnMvOm5hbWUvbmV3XCJcbiAgICAgICAgICAgICAgcmVuZGVyPXtwcm9wcyA9PiA8RWRpdG9yIHsuLi5wcm9wc30gbmV3UmVjb3JkIC8+fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2NvbGxlY3Rpb25zLzpuYW1lL2VudHJpZXMvOnNsdWdcIiBjb21wb25lbnQ9e0VkaXRvcn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZVxuICAgICAgICAgICAgICBwYXRoPVwiL3NlYXJjaC86c2VhcmNoVGVybVwiXG4gICAgICAgICAgICAgIHJlbmRlcj17cHJvcHMgPT4gPENvbGxlY3Rpb24gey4uLnByb3BzfSBpc1NlYXJjaFJlc3VsdHMgLz59XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFJvdXRlIGNvbXBvbmVudD17Tm90Rm91bmRQYWdlfSAvPlxuICAgICAgICAgIDwvU3dpdGNoPlxuICAgICAgICAgIHt1c2VNZWRpYUxpYnJhcnkgPyA8TWVkaWFMaWJyYXJ5IC8+IDogbnVsbH1cbiAgICAgICAgPC9BcHBNYWluQ29udGFpbmVyPlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgY29uc3QgeyBhdXRoLCBjb25maWcsIGNvbGxlY3Rpb25zLCBnbG9iYWxVSSwgbWVkaWFMaWJyYXJ5IH0gPSBzdGF0ZTtcbiAgY29uc3QgdXNlciA9IGF1dGggJiYgYXV0aC5nZXQoJ3VzZXInKTtcbiAgY29uc3QgaXNGZXRjaGluZyA9IGdsb2JhbFVJLmdldCgnaXNGZXRjaGluZycpO1xuICBjb25zdCBwdWJsaXNoTW9kZSA9IGNvbmZpZyAmJiBjb25maWcuZ2V0KCdwdWJsaXNoX21vZGUnKTtcbiAgY29uc3QgdXNlTWVkaWFMaWJyYXJ5ID0gIW1lZGlhTGlicmFyeS5nZXQoJ2V4dGVybmFsTGlicmFyeScpO1xuICBjb25zdCBzaG93TWVkaWFCdXR0b24gPSBtZWRpYUxpYnJhcnkuZ2V0KCdzaG93TWVkaWFCdXR0b24nKTtcbiAgcmV0dXJuIHtcbiAgICBhdXRoLFxuICAgIGNvbmZpZyxcbiAgICBjb2xsZWN0aW9ucyxcbiAgICB1c2VyLFxuICAgIGlzRmV0Y2hpbmcsXG4gICAgcHVibGlzaE1vZGUsXG4gICAgc2hvd01lZGlhQnV0dG9uLFxuICAgIHVzZU1lZGlhTGlicmFyeSxcbiAgfTtcbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvcGVuTWVkaWFMaWJyYXJ5LFxuICBsb2FkQ29uZmlnLFxuICBsb2dpblVzZXIsXG4gIGxvZ291dFVzZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBob3QobW9kdWxlKShcbiAgY29ubmVjdChcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzLFxuICApKHRyYW5zbGF0ZSgpKEFwcCkpLFxuKTtcbiJdfQ== */"
});

class App extends _react.default.Component {
  configError(config) {
    const t = this.props.t;
    return _react.default.createElement(ErrorContainer, null, _react.default.createElement("h1", null, t('app.app.errorHeader')), _react.default.createElement("div", null, _react.default.createElement("strong", null, t('app.app.configErrors'), ":"), _react.default.createElement(ErrorCodeBlock, null, config.get('error')), _react.default.createElement("span", null, t('app.app.checkConfigYml'))));
  }

  componentDidMount() {
    const loadConfig = this.props.loadConfig;
    loadConfig();
  }

  handleLogin(credentials) {
    this.props.loginUser(credentials);
  }

  authenticating() {
    const _this$props = this.props,
          auth = _this$props.auth,
          t = _this$props.t;
    const backend = (0, _backend.currentBackend)(this.props.config);

    if (backend == null) {
      return _react.default.createElement("div", null, _react.default.createElement("h1", null, t('app.app.waitingBackend')));
    }

    return _react.default.createElement("div", null, _react.default.createElement(_reduxNotifications.Notifs, {
      CustomComponent: _UI.Toast
    }), _react.default.createElement(backend.authComponent(), {
      onLogin: this.handleLogin.bind(this),
      error: auth && auth.get('error'),
      isFetching: auth && auth.get('isFetching'),
      inProgress: auth && auth.get('isFetching') || false,
      siteId: this.props.config.getIn(['backend', 'site_domain']),
      base_url: this.props.config.getIn(['backend', 'base_url'], null),
      authEndpoint: this.props.config.getIn(['backend', 'auth_endpoint']),
      config: this.props.config,
      clearHash: () => _history.default.replace('/')
    }));
  }

  handleLinkClick(event, handler) {
    event.preventDefault();

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    handler(...args);
  }

  render() {
    const _this$props2 = this.props,
          user = _this$props2.user,
          config = _this$props2.config,
          collections = _this$props2.collections,
          logoutUser = _this$props2.logoutUser,
          isFetching = _this$props2.isFetching,
          publishMode = _this$props2.publishMode,
          useMediaLibrary = _this$props2.useMediaLibrary,
          openMediaLibrary = _this$props2.openMediaLibrary,
          t = _this$props2.t,
          showMediaButton = _this$props2.showMediaButton;

    if (config === null) {
      return null;
    }

    if (config.get('error')) {
      return this.configError(config);
    }

    if (config.get('isFetching')) {
      return _react.default.createElement(_netlifyCmsUiDefault.Loader, {
        active: true
      }, t('app.app.loadingConfig'));
    }

    if (user == null) {
      return this.authenticating(t);
    }

    const defaultPath = `/collections/${collections.first().get('name')}`;
    const hasWorkflow = publishMode === _publishModes.EDITORIAL_WORKFLOW;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reduxNotifications.Notifs, {
      CustomComponent: _UI.Toast
    }), _react.default.createElement(_Header.default, {
      user: user,
      collections: collections,
      onCreateEntryClick: _collections.createNewEntry,
      onLogoutClick: logoutUser,
      openMediaLibrary: openMediaLibrary,
      hasWorkflow: hasWorkflow,
      displayUrl: config.get('display_url'),
      showMediaButton: showMediaButton
    }), _react.default.createElement(AppMainContainer, null, isFetching && _react.default.createElement(_reactTopbarProgressIndicator.default, null), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Redirect, {
      exact: true,
      from: "/",
      to: defaultPath
    }), _react.default.createElement(_reactRouterDom.Redirect, {
      exact: true,
      from: "/search/",
      to: defaultPath
    }), hasWorkflow ? _react.default.createElement(_reactRouterDom.Route, {
      path: "/workflow",
      component: _Workflow.default
    }) : null, _react.default.createElement(_reactRouterDom.Route, {
      exact: true,
      path: "/collections/:name",
      render: props => {
        const collectionExists = collections.get(props.match.params.name);
        return collectionExists ? _react.default.createElement(_Collection.default, props) : _react.default.createElement(_reactRouterDom.Redirect, {
          to: defaultPath
        });
      }
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/collections/:name/new",
      render: props => _react.default.createElement(_Editor.default, _extends({}, props, {
        newRecord: true
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/collections/:name/entries/:slug",
      component: _Editor.default
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/search/:searchTerm",
      render: props => _react.default.createElement(_Collection.default, _extends({}, props, {
        isSearchResults: true
      }))
    }), _react.default.createElement(_reactRouterDom.Route, {
      component: _NotFoundPage.default
    })), useMediaLibrary ? _react.default.createElement(_MediaLibrary.default, null) : null));
  }

}

_defineProperty(App, "propTypes", {
  auth: _reactImmutableProptypes.default.map,
  config: _reactImmutableProptypes.default.map,
  collections: _reactImmutableProptypes.default.orderedMap,
  loadConfig: _propTypes.default.func.isRequired,
  loginUser: _propTypes.default.func.isRequired,
  logoutUser: _propTypes.default.func.isRequired,
  user: _reactImmutableProptypes.default.map,
  isFetching: _propTypes.default.bool.isRequired,
  publishMode: _propTypes.default.oneOf([_publishModes.SIMPLE, _publishModes.EDITORIAL_WORKFLOW]),
  siteId: _propTypes.default.string,
  useMediaLibrary: _propTypes.default.bool,
  openMediaLibrary: _propTypes.default.func.isRequired,
  showMediaButton: _propTypes.default.bool,
  t: _propTypes.default.func.isRequired
});

function mapStateToProps(state) {
  const auth = state.auth,
        config = state.config,
        collections = state.collections,
        globalUI = state.globalUI,
        mediaLibrary = state.mediaLibrary;
  const user = auth && auth.get('user');
  const isFetching = globalUI.get('isFetching');
  const publishMode = config && config.get('publish_mode');
  const useMediaLibrary = !mediaLibrary.get('externalLibrary');
  const showMediaButton = mediaLibrary.get('showMediaButton');
  return {
    auth,
    config,
    collections,
    user,
    isFetching,
    publishMode,
    showMediaButton,
    useMediaLibrary
  };
}

const mapDispatchToProps = {
  openMediaLibrary: _mediaLibrary.openMediaLibrary,
  loadConfig: _config.loadConfig,
  loginUser: _auth.loginUser,
  logoutUser: _auth.logoutUser
};

var _default = (0, _reactHotLoader.hot)(module)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactPolyglot.translate)()(App)));

exports.default = _default;