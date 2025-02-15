"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledAuthenticationPage = (0, _styledBase.default)("section", {
  target: "e4hp3ji0",
  label: "StyledAuthenticationPage"
})(process.env.NODE_ENV === "production" ? {
  name: "1ul3gz4",
  styles: "display:flex;flex-flow:column nowrap;align-items:center;justify-content:center;height:100vh;"
} : {
  name: "1ul3gz4",
  styles: "display:flex;flex-flow:column nowrap;align-items:center;justify-content:center;height:100vh;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTStDIiwiZmlsZSI6Ii4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbic7XG5pbXBvcnQgeyBidXR0b25zLCBzaGFkb3dzIH0gZnJvbSAnLi9zdHlsZXMnO1xuXG5jb25zdCBTdHlsZWRBdXRoZW50aWNhdGlvblBhZ2UgPSBzdHlsZWQuc2VjdGlvbmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDB2aDtcbmA7XG5cbmNvbnN0IEN1c3RvbUljb25XcmFwcGVyID0gc3R5bGVkLnNwYW5gXG4gIHdpZHRoOiAzMDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgbWFyZ2luLXRvcDogLTE1MHB4O1xuYDtcblxuY29uc3QgTmV0bGlmeUxvZ29JY29uID0gc3R5bGVkKEljb24pYFxuICBjb2xvcjogI2M0YzZkMjtcbiAgbWFyZ2luLXRvcDogLTMwMHB4O1xuYDtcblxuY29uc3QgTmV0bGlmeUNyZWRpdEljb24gPSBzdHlsZWQoSWNvbilgXG4gIGNvbG9yOiAjYzRjNmQyO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTBweDtcbmA7XG5cbmNvbnN0IEN1c3RvbUxvZ29JY29uID0gKHsgdXJsIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q3VzdG9tSWNvbldyYXBwZXI+XG4gICAgICA8aW1nIHNyYz17dXJsfSBhbHQ9XCJMb2dvXCIgLz5cbiAgICA8L0N1c3RvbUljb25XcmFwcGVyPlxuICApO1xufTtcblxuY29uc3QgcmVuZGVyUGFnZUxvZ28gPSBsb2dvVXJsID0+IHtcbiAgaWYgKGxvZ29VcmwpIHtcbiAgICByZXR1cm4gPEN1c3RvbUxvZ29JY29uIHVybD17bG9nb1VybH0gLz47XG4gIH1cbiAgcmV0dXJuIDxOZXRsaWZ5TG9nb0ljb24gc2l6ZT1cIjMwMHB4XCIgdHlwZT1cIm5ldGxpZnktY21zXCIgLz47XG59O1xuXG5jb25zdCBMb2dpbkJ1dHRvbiA9IHN0eWxlZC5idXR0b25gXG4gICR7YnV0dG9ucy5idXR0b259O1xuICAke3NoYWRvd3MuZHJvcERlZXB9O1xuICAke2J1dHRvbnMuZGVmYXVsdH07XG4gICR7YnV0dG9ucy5ncmF5fTtcbiAgJltkaXNhYmxlZF0ge1xuICAgICR7YnV0dG9ucy5kaXNhYmxlZH07XG4gIH1cblxuICBwYWRkaW5nOiAwIDEycHg7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5jb25zdCBBdXRoZW50aWNhdGlvblBhZ2UgPSAoe1xuICBvbkxvZ2luLFxuICBsb2dpbkRpc2FibGVkLFxuICBsb2dpbkVycm9yTWVzc2FnZSxcbiAgcmVuZGVyQnV0dG9uQ29udGVudCxcbiAgcmVuZGVyUGFnZUNvbnRlbnQsXG4gIGxvZ29VcmwsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEF1dGhlbnRpY2F0aW9uUGFnZT5cbiAgICAgIHtyZW5kZXJQYWdlTG9nbyhsb2dvVXJsKX1cbiAgICAgIHtsb2dpbkVycm9yTWVzc2FnZSA/IDxwPntsb2dpbkVycm9yTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIHshcmVuZGVyUGFnZUNvbnRlbnQgPyBudWxsIDogcmVuZGVyUGFnZUNvbnRlbnQoKX1cbiAgICAgIHshcmVuZGVyQnV0dG9uQ29udGVudCA/IG51bGwgOiAoXG4gICAgICAgIDxMb2dpbkJ1dHRvbiBkaXNhYmxlZD17bG9naW5EaXNhYmxlZH0gb25DbGljaz17b25Mb2dpbn0+XG4gICAgICAgICAge3JlbmRlckJ1dHRvbkNvbnRlbnQoKX1cbiAgICAgICAgPC9Mb2dpbkJ1dHRvbj5cbiAgICAgICl9XG4gICAgICB7bG9nb1VybCA/IDxOZXRsaWZ5Q3JlZGl0SWNvbiBzaXplPVwiMTAwcHhcIiB0eXBlPVwibmV0bGlmeS1jbXNcIiAvPiA6IG51bGx9XG4gICAgPC9TdHlsZWRBdXRoZW50aWNhdGlvblBhZ2U+XG4gICk7XG59O1xuXG5BdXRoZW50aWNhdGlvblBhZ2UucHJvcFR5cGVzID0ge1xuICBvbkxvZ2luOiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9nb1VybDogUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9naW5EaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGxvZ2luRXJyb3JNZXNzYWdlOiBQcm9wVHlwZXMubm9kZSxcbiAgcmVuZGVyQnV0dG9uQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gIHJlbmRlclBhZ2VDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF1dGhlbnRpY2F0aW9uUGFnZTtcbiJdfQ== */"
});
const CustomIconWrapper = (0, _styledBase.default)("span", {
  target: "e4hp3ji1",
  label: "CustomIconWrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "pxf9nc",
  styles: "width:300px;height:200px;margin-top:-150px;"
} : {
  name: "pxf9nc",
  styles: "width:300px;height:200px;margin-top:-150px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY3FDIiwiZmlsZSI6Ii4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbic7XG5pbXBvcnQgeyBidXR0b25zLCBzaGFkb3dzIH0gZnJvbSAnLi9zdHlsZXMnO1xuXG5jb25zdCBTdHlsZWRBdXRoZW50aWNhdGlvblBhZ2UgPSBzdHlsZWQuc2VjdGlvbmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDB2aDtcbmA7XG5cbmNvbnN0IEN1c3RvbUljb25XcmFwcGVyID0gc3R5bGVkLnNwYW5gXG4gIHdpZHRoOiAzMDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgbWFyZ2luLXRvcDogLTE1MHB4O1xuYDtcblxuY29uc3QgTmV0bGlmeUxvZ29JY29uID0gc3R5bGVkKEljb24pYFxuICBjb2xvcjogI2M0YzZkMjtcbiAgbWFyZ2luLXRvcDogLTMwMHB4O1xuYDtcblxuY29uc3QgTmV0bGlmeUNyZWRpdEljb24gPSBzdHlsZWQoSWNvbilgXG4gIGNvbG9yOiAjYzRjNmQyO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTBweDtcbmA7XG5cbmNvbnN0IEN1c3RvbUxvZ29JY29uID0gKHsgdXJsIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q3VzdG9tSWNvbldyYXBwZXI+XG4gICAgICA8aW1nIHNyYz17dXJsfSBhbHQ9XCJMb2dvXCIgLz5cbiAgICA8L0N1c3RvbUljb25XcmFwcGVyPlxuICApO1xufTtcblxuY29uc3QgcmVuZGVyUGFnZUxvZ28gPSBsb2dvVXJsID0+IHtcbiAgaWYgKGxvZ29VcmwpIHtcbiAgICByZXR1cm4gPEN1c3RvbUxvZ29JY29uIHVybD17bG9nb1VybH0gLz47XG4gIH1cbiAgcmV0dXJuIDxOZXRsaWZ5TG9nb0ljb24gc2l6ZT1cIjMwMHB4XCIgdHlwZT1cIm5ldGxpZnktY21zXCIgLz47XG59O1xuXG5jb25zdCBMb2dpbkJ1dHRvbiA9IHN0eWxlZC5idXR0b25gXG4gICR7YnV0dG9ucy5idXR0b259O1xuICAke3NoYWRvd3MuZHJvcERlZXB9O1xuICAke2J1dHRvbnMuZGVmYXVsdH07XG4gICR7YnV0dG9ucy5ncmF5fTtcbiAgJltkaXNhYmxlZF0ge1xuICAgICR7YnV0dG9ucy5kaXNhYmxlZH07XG4gIH1cblxuICBwYWRkaW5nOiAwIDEycHg7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5jb25zdCBBdXRoZW50aWNhdGlvblBhZ2UgPSAoe1xuICBvbkxvZ2luLFxuICBsb2dpbkRpc2FibGVkLFxuICBsb2dpbkVycm9yTWVzc2FnZSxcbiAgcmVuZGVyQnV0dG9uQ29udGVudCxcbiAgcmVuZGVyUGFnZUNvbnRlbnQsXG4gIGxvZ29VcmwsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEF1dGhlbnRpY2F0aW9uUGFnZT5cbiAgICAgIHtyZW5kZXJQYWdlTG9nbyhsb2dvVXJsKX1cbiAgICAgIHtsb2dpbkVycm9yTWVzc2FnZSA/IDxwPntsb2dpbkVycm9yTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIHshcmVuZGVyUGFnZUNvbnRlbnQgPyBudWxsIDogcmVuZGVyUGFnZUNvbnRlbnQoKX1cbiAgICAgIHshcmVuZGVyQnV0dG9uQ29udGVudCA/IG51bGwgOiAoXG4gICAgICAgIDxMb2dpbkJ1dHRvbiBkaXNhYmxlZD17bG9naW5EaXNhYmxlZH0gb25DbGljaz17b25Mb2dpbn0+XG4gICAgICAgICAge3JlbmRlckJ1dHRvbkNvbnRlbnQoKX1cbiAgICAgICAgPC9Mb2dpbkJ1dHRvbj5cbiAgICAgICl9XG4gICAgICB7bG9nb1VybCA/IDxOZXRsaWZ5Q3JlZGl0SWNvbiBzaXplPVwiMTAwcHhcIiB0eXBlPVwibmV0bGlmeS1jbXNcIiAvPiA6IG51bGx9XG4gICAgPC9TdHlsZWRBdXRoZW50aWNhdGlvblBhZ2U+XG4gICk7XG59O1xuXG5BdXRoZW50aWNhdGlvblBhZ2UucHJvcFR5cGVzID0ge1xuICBvbkxvZ2luOiBQcm9wVHlwZXMuZnVuYyxcbiAgbG9nb1VybDogUHJvcFR5cGVzLnN0cmluZyxcbiAgbG9naW5EaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGxvZ2luRXJyb3JNZXNzYWdlOiBQcm9wVHlwZXMubm9kZSxcbiAgcmVuZGVyQnV0dG9uQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG4gIHJlbmRlclBhZ2VDb250ZW50OiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF1dGhlbnRpY2F0aW9uUGFnZTtcbiJdfQ== */"
});
const NetlifyLogoIcon = (
/*#__PURE__*/
0, _styledBase.default)(_Icon.default, {
  target: "e4hp3ji2",
  label: "NetlifyLogoIcon"
})(process.env.NODE_ENV === "production" ? {
  name: "11nl61t",
  styles: "color:#c4c6d2;margin-top:-300px;"
} : {
  name: "11nl61t",
  styles: "color:#c4c6d2;margin-top:-300px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0JvQyIsImZpbGUiOiIuLi8uLi9zcmMvQXV0aGVudGljYXRpb25QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nO1xuaW1wb3J0IHsgYnV0dG9ucywgc2hhZG93cyB9IGZyb20gJy4vc3R5bGVzJztcblxuY29uc3QgU3R5bGVkQXV0aGVudGljYXRpb25QYWdlID0gc3R5bGVkLnNlY3Rpb25gXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwdmg7XG5gO1xuXG5jb25zdCBDdXN0b21JY29uV3JhcHBlciA9IHN0eWxlZC5zcGFuYFxuICB3aWR0aDogMzAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIG1hcmdpbi10b3A6IC0xNTBweDtcbmA7XG5cbmNvbnN0IE5ldGxpZnlMb2dvSWNvbiA9IHN0eWxlZChJY29uKWBcbiAgY29sb3I6ICNjNGM2ZDI7XG4gIG1hcmdpbi10b3A6IC0zMDBweDtcbmA7XG5cbmNvbnN0IE5ldGxpZnlDcmVkaXRJY29uID0gc3R5bGVkKEljb24pYFxuICBjb2xvcjogI2M0YzZkMjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDEwcHg7XG5gO1xuXG5jb25zdCBDdXN0b21Mb2dvSWNvbiA9ICh7IHVybCB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEN1c3RvbUljb25XcmFwcGVyPlxuICAgICAgPGltZyBzcmM9e3VybH0gYWx0PVwiTG9nb1wiIC8+XG4gICAgPC9DdXN0b21JY29uV3JhcHBlcj5cbiAgKTtcbn07XG5cbmNvbnN0IHJlbmRlclBhZ2VMb2dvID0gbG9nb1VybCA9PiB7XG4gIGlmIChsb2dvVXJsKSB7XG4gICAgcmV0dXJuIDxDdXN0b21Mb2dvSWNvbiB1cmw9e2xvZ29Vcmx9IC8+O1xuICB9XG4gIHJldHVybiA8TmV0bGlmeUxvZ29JY29uIHNpemU9XCIzMDBweFwiIHR5cGU9XCJuZXRsaWZ5LWNtc1wiIC8+O1xufTtcblxuY29uc3QgTG9naW5CdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgJHtzaGFkb3dzLmRyb3BEZWVwfTtcbiAgJHtidXR0b25zLmRlZmF1bHR9O1xuICAke2J1dHRvbnMuZ3JheX07XG4gICZbZGlzYWJsZWRdIHtcbiAgICAke2J1dHRvbnMuZGlzYWJsZWR9O1xuICB9XG5cbiAgcGFkZGluZzogMCAxMnB4O1xuICBtYXJnaW4tdG9wOiAtNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuYDtcblxuY29uc3QgQXV0aGVudGljYXRpb25QYWdlID0gKHtcbiAgb25Mb2dpbixcbiAgbG9naW5EaXNhYmxlZCxcbiAgbG9naW5FcnJvck1lc3NhZ2UsXG4gIHJlbmRlckJ1dHRvbkNvbnRlbnQsXG4gIHJlbmRlclBhZ2VDb250ZW50LFxuICBsb2dvVXJsLFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRBdXRoZW50aWNhdGlvblBhZ2U+XG4gICAgICB7cmVuZGVyUGFnZUxvZ28obG9nb1VybCl9XG4gICAgICB7bG9naW5FcnJvck1lc3NhZ2UgPyA8cD57bG9naW5FcnJvck1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IXJlbmRlclBhZ2VDb250ZW50ID8gbnVsbCA6IHJlbmRlclBhZ2VDb250ZW50KCl9XG4gICAgICB7IXJlbmRlckJ1dHRvbkNvbnRlbnQgPyBudWxsIDogKFxuICAgICAgICA8TG9naW5CdXR0b24gZGlzYWJsZWQ9e2xvZ2luRGlzYWJsZWR9IG9uQ2xpY2s9e29uTG9naW59PlxuICAgICAgICAgIHtyZW5kZXJCdXR0b25Db250ZW50KCl9XG4gICAgICAgIDwvTG9naW5CdXR0b24+XG4gICAgICApfVxuICAgICAge2xvZ29VcmwgPyA8TmV0bGlmeUNyZWRpdEljb24gc2l6ZT1cIjEwMHB4XCIgdHlwZT1cIm5ldGxpZnktY21zXCIgLz4gOiBudWxsfVxuICAgIDwvU3R5bGVkQXV0aGVudGljYXRpb25QYWdlPlxuICApO1xufTtcblxuQXV0aGVudGljYXRpb25QYWdlLnByb3BUeXBlcyA9IHtcbiAgb25Mb2dpbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvZ29Vcmw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZ2luRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBsb2dpbkVycm9yTWVzc2FnZTogUHJvcFR5cGVzLm5vZGUsXG4gIHJlbmRlckJ1dHRvbkNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICByZW5kZXJQYWdlQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBBdXRoZW50aWNhdGlvblBhZ2U7XG4iXX0= */"
});
const NetlifyCreditIcon = (
/*#__PURE__*/
0, _styledBase.default)(_Icon.default, {
  target: "e4hp3ji3",
  label: "NetlifyCreditIcon"
})(process.env.NODE_ENV === "production" ? {
  name: "dnh8wx",
  styles: "color:#c4c6d2;position:absolute;bottom:10px;"
} : {
  name: "dnh8wx",
  styles: "color:#c4c6d2;position:absolute;bottom:10px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJzQyIsImZpbGUiOiIuLi8uLi9zcmMvQXV0aGVudGljYXRpb25QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nO1xuaW1wb3J0IHsgYnV0dG9ucywgc2hhZG93cyB9IGZyb20gJy4vc3R5bGVzJztcblxuY29uc3QgU3R5bGVkQXV0aGVudGljYXRpb25QYWdlID0gc3R5bGVkLnNlY3Rpb25gXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwdmg7XG5gO1xuXG5jb25zdCBDdXN0b21JY29uV3JhcHBlciA9IHN0eWxlZC5zcGFuYFxuICB3aWR0aDogMzAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIG1hcmdpbi10b3A6IC0xNTBweDtcbmA7XG5cbmNvbnN0IE5ldGxpZnlMb2dvSWNvbiA9IHN0eWxlZChJY29uKWBcbiAgY29sb3I6ICNjNGM2ZDI7XG4gIG1hcmdpbi10b3A6IC0zMDBweDtcbmA7XG5cbmNvbnN0IE5ldGxpZnlDcmVkaXRJY29uID0gc3R5bGVkKEljb24pYFxuICBjb2xvcjogI2M0YzZkMjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDEwcHg7XG5gO1xuXG5jb25zdCBDdXN0b21Mb2dvSWNvbiA9ICh7IHVybCB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEN1c3RvbUljb25XcmFwcGVyPlxuICAgICAgPGltZyBzcmM9e3VybH0gYWx0PVwiTG9nb1wiIC8+XG4gICAgPC9DdXN0b21JY29uV3JhcHBlcj5cbiAgKTtcbn07XG5cbmNvbnN0IHJlbmRlclBhZ2VMb2dvID0gbG9nb1VybCA9PiB7XG4gIGlmIChsb2dvVXJsKSB7XG4gICAgcmV0dXJuIDxDdXN0b21Mb2dvSWNvbiB1cmw9e2xvZ29Vcmx9IC8+O1xuICB9XG4gIHJldHVybiA8TmV0bGlmeUxvZ29JY29uIHNpemU9XCIzMDBweFwiIHR5cGU9XCJuZXRsaWZ5LWNtc1wiIC8+O1xufTtcblxuY29uc3QgTG9naW5CdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgJHtzaGFkb3dzLmRyb3BEZWVwfTtcbiAgJHtidXR0b25zLmRlZmF1bHR9O1xuICAke2J1dHRvbnMuZ3JheX07XG4gICZbZGlzYWJsZWRdIHtcbiAgICAke2J1dHRvbnMuZGlzYWJsZWR9O1xuICB9XG5cbiAgcGFkZGluZzogMCAxMnB4O1xuICBtYXJnaW4tdG9wOiAtNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuYDtcblxuY29uc3QgQXV0aGVudGljYXRpb25QYWdlID0gKHtcbiAgb25Mb2dpbixcbiAgbG9naW5EaXNhYmxlZCxcbiAgbG9naW5FcnJvck1lc3NhZ2UsXG4gIHJlbmRlckJ1dHRvbkNvbnRlbnQsXG4gIHJlbmRlclBhZ2VDb250ZW50LFxuICBsb2dvVXJsLFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRBdXRoZW50aWNhdGlvblBhZ2U+XG4gICAgICB7cmVuZGVyUGFnZUxvZ28obG9nb1VybCl9XG4gICAgICB7bG9naW5FcnJvck1lc3NhZ2UgPyA8cD57bG9naW5FcnJvck1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IXJlbmRlclBhZ2VDb250ZW50ID8gbnVsbCA6IHJlbmRlclBhZ2VDb250ZW50KCl9XG4gICAgICB7IXJlbmRlckJ1dHRvbkNvbnRlbnQgPyBudWxsIDogKFxuICAgICAgICA8TG9naW5CdXR0b24gZGlzYWJsZWQ9e2xvZ2luRGlzYWJsZWR9IG9uQ2xpY2s9e29uTG9naW59PlxuICAgICAgICAgIHtyZW5kZXJCdXR0b25Db250ZW50KCl9XG4gICAgICAgIDwvTG9naW5CdXR0b24+XG4gICAgICApfVxuICAgICAge2xvZ29VcmwgPyA8TmV0bGlmeUNyZWRpdEljb24gc2l6ZT1cIjEwMHB4XCIgdHlwZT1cIm5ldGxpZnktY21zXCIgLz4gOiBudWxsfVxuICAgIDwvU3R5bGVkQXV0aGVudGljYXRpb25QYWdlPlxuICApO1xufTtcblxuQXV0aGVudGljYXRpb25QYWdlLnByb3BUeXBlcyA9IHtcbiAgb25Mb2dpbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvZ29Vcmw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZ2luRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBsb2dpbkVycm9yTWVzc2FnZTogUHJvcFR5cGVzLm5vZGUsXG4gIHJlbmRlckJ1dHRvbkNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICByZW5kZXJQYWdlQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBBdXRoZW50aWNhdGlvblBhZ2U7XG4iXX0= */"
});

const CustomLogoIcon = (_ref) => {
  let url = _ref.url;
  return _react.default.createElement(CustomIconWrapper, null, _react.default.createElement("img", {
    src: url,
    alt: "Logo"
  }));
};

const renderPageLogo = logoUrl => {
  if (logoUrl) {
    return _react.default.createElement(CustomLogoIcon, {
      url: logoUrl
    });
  }

  return _react.default.createElement(NetlifyLogoIcon, {
    size: "300px",
    type: "netlify-cms"
  });
};

const LoginButton = (0, _styledBase.default)("button", {
  target: "e4hp3ji4",
  label: "LoginButton"
})(_styles.buttons.button, ";", _styles.shadows.dropDeep, ";", _styles.buttons.default, ";", _styles.buttons.gray, ";&[disabled]{", _styles.buttons.disabled, ";}padding:0 12px;margin-top:-40px;display:flex;align-items:center;position:relative;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOENpQyIsImZpbGUiOiIuLi8uLi9zcmMvQXV0aGVudGljYXRpb25QYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nO1xuaW1wb3J0IHsgYnV0dG9ucywgc2hhZG93cyB9IGZyb20gJy4vc3R5bGVzJztcblxuY29uc3QgU3R5bGVkQXV0aGVudGljYXRpb25QYWdlID0gc3R5bGVkLnNlY3Rpb25gXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogMTAwdmg7XG5gO1xuXG5jb25zdCBDdXN0b21JY29uV3JhcHBlciA9IHN0eWxlZC5zcGFuYFxuICB3aWR0aDogMzAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIG1hcmdpbi10b3A6IC0xNTBweDtcbmA7XG5cbmNvbnN0IE5ldGxpZnlMb2dvSWNvbiA9IHN0eWxlZChJY29uKWBcbiAgY29sb3I6ICNjNGM2ZDI7XG4gIG1hcmdpbi10b3A6IC0zMDBweDtcbmA7XG5cbmNvbnN0IE5ldGxpZnlDcmVkaXRJY29uID0gc3R5bGVkKEljb24pYFxuICBjb2xvcjogI2M0YzZkMjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDEwcHg7XG5gO1xuXG5jb25zdCBDdXN0b21Mb2dvSWNvbiA9ICh7IHVybCB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEN1c3RvbUljb25XcmFwcGVyPlxuICAgICAgPGltZyBzcmM9e3VybH0gYWx0PVwiTG9nb1wiIC8+XG4gICAgPC9DdXN0b21JY29uV3JhcHBlcj5cbiAgKTtcbn07XG5cbmNvbnN0IHJlbmRlclBhZ2VMb2dvID0gbG9nb1VybCA9PiB7XG4gIGlmIChsb2dvVXJsKSB7XG4gICAgcmV0dXJuIDxDdXN0b21Mb2dvSWNvbiB1cmw9e2xvZ29Vcmx9IC8+O1xuICB9XG4gIHJldHVybiA8TmV0bGlmeUxvZ29JY29uIHNpemU9XCIzMDBweFwiIHR5cGU9XCJuZXRsaWZ5LWNtc1wiIC8+O1xufTtcblxuY29uc3QgTG9naW5CdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICAke2J1dHRvbnMuYnV0dG9ufTtcbiAgJHtzaGFkb3dzLmRyb3BEZWVwfTtcbiAgJHtidXR0b25zLmRlZmF1bHR9O1xuICAke2J1dHRvbnMuZ3JheX07XG4gICZbZGlzYWJsZWRdIHtcbiAgICAke2J1dHRvbnMuZGlzYWJsZWR9O1xuICB9XG5cbiAgcGFkZGluZzogMCAxMnB4O1xuICBtYXJnaW4tdG9wOiAtNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuYDtcblxuY29uc3QgQXV0aGVudGljYXRpb25QYWdlID0gKHtcbiAgb25Mb2dpbixcbiAgbG9naW5EaXNhYmxlZCxcbiAgbG9naW5FcnJvck1lc3NhZ2UsXG4gIHJlbmRlckJ1dHRvbkNvbnRlbnQsXG4gIHJlbmRlclBhZ2VDb250ZW50LFxuICBsb2dvVXJsLFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRBdXRoZW50aWNhdGlvblBhZ2U+XG4gICAgICB7cmVuZGVyUGFnZUxvZ28obG9nb1VybCl9XG4gICAgICB7bG9naW5FcnJvck1lc3NhZ2UgPyA8cD57bG9naW5FcnJvck1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IXJlbmRlclBhZ2VDb250ZW50ID8gbnVsbCA6IHJlbmRlclBhZ2VDb250ZW50KCl9XG4gICAgICB7IXJlbmRlckJ1dHRvbkNvbnRlbnQgPyBudWxsIDogKFxuICAgICAgICA8TG9naW5CdXR0b24gZGlzYWJsZWQ9e2xvZ2luRGlzYWJsZWR9IG9uQ2xpY2s9e29uTG9naW59PlxuICAgICAgICAgIHtyZW5kZXJCdXR0b25Db250ZW50KCl9XG4gICAgICAgIDwvTG9naW5CdXR0b24+XG4gICAgICApfVxuICAgICAge2xvZ29VcmwgPyA8TmV0bGlmeUNyZWRpdEljb24gc2l6ZT1cIjEwMHB4XCIgdHlwZT1cIm5ldGxpZnktY21zXCIgLz4gOiBudWxsfVxuICAgIDwvU3R5bGVkQXV0aGVudGljYXRpb25QYWdlPlxuICApO1xufTtcblxuQXV0aGVudGljYXRpb25QYWdlLnByb3BUeXBlcyA9IHtcbiAgb25Mb2dpbjogUHJvcFR5cGVzLmZ1bmMsXG4gIGxvZ29Vcmw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGxvZ2luRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBsb2dpbkVycm9yTWVzc2FnZTogUHJvcFR5cGVzLm5vZGUsXG4gIHJlbmRlckJ1dHRvbkNvbnRlbnQ6IFByb3BUeXBlcy5mdW5jLFxuICByZW5kZXJQYWdlQ29udGVudDogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBBdXRoZW50aWNhdGlvblBhZ2U7XG4iXX0= */"));

const AuthenticationPage = (_ref2) => {
  let onLogin = _ref2.onLogin,
      loginDisabled = _ref2.loginDisabled,
      loginErrorMessage = _ref2.loginErrorMessage,
      renderButtonContent = _ref2.renderButtonContent,
      renderPageContent = _ref2.renderPageContent,
      logoUrl = _ref2.logoUrl;
  return _react.default.createElement(StyledAuthenticationPage, null, renderPageLogo(logoUrl), loginErrorMessage ? _react.default.createElement("p", null, loginErrorMessage) : null, !renderPageContent ? null : renderPageContent(), !renderButtonContent ? null : _react.default.createElement(LoginButton, {
    disabled: loginDisabled,
    onClick: onLogin
  }, renderButtonContent()), logoUrl ? _react.default.createElement(NetlifyCreditIcon, {
    size: "100px",
    type: "netlify-cms"
  }) : null);
};

AuthenticationPage.propTypes = {
  onLogin: _propTypes.default.func,
  logoUrl: _propTypes.default.string,
  loginDisabled: _propTypes.default.bool,
  loginErrorMessage: _propTypes.default.node,
  renderButtonContent: _propTypes.default.func,
  renderPageContent: _propTypes.default.func
};
var _default = AuthenticationPage;
exports.default = _default;