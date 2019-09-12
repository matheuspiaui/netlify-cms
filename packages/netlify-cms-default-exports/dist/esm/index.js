"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetlifyCmsDefaultExports = void 0;

var _styled2 = _interopRequireDefault(require("@emotion/styled"));

var _css2 = _interopRequireDefault(require("@emotion/css"));

var _core = require("@emotion/core");

var _immutable = _interopRequireDefault(require("immutable"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _lodash = _interopRequireDefault(require("lodash/lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var UUId = _interopRequireWildcard(require("uuid"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EmotionCore = {
  /*#__PURE__*/
  css: _css2.default,
  withEmotionCache: _core.withEmotionCache,
  CacheProvider: _core.CacheProvider,
  ThemeContext: _core.ThemeContext,
  jsx: _core.jsx,
  Global: _core.Global,
  keyframes: _core.keyframes,
  ClassNames: _core.ClassNames
};
const NetlifyCmsDefaultExports = {
  EmotionCore,
  EmotionStyled: _styled2.default,
  Immutable: _immutable.default,
  ImmutablePropTypes: _reactImmutableProptypes.default,
  Lodash: _lodash.default,
  Moment: _moment.default,
  PropTypes: _propTypes.default,
  React: _react.default,
  ReactDOM: _reactDom.default,
  UUId
};
exports.NetlifyCmsDefaultExports = NetlifyCmsDefaultExports;