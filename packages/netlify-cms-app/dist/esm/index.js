"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsApp = void 0;

var _netlifyCmsCore = require("netlify-cms-core");

require("./backends");

require("./widgets");

require("./editor-components");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (typeof window !== 'undefined') {
  /**
   * Log the version number.
   */
  if (typeof "2.9.2-beta.2" === 'string') {
    console.log(`netlify-cms-app ${"2.9.2-beta.2"}`);
  }
}

const NetlifyCmsApp = _objectSpread({}, _netlifyCmsCore.NetlifyCmsCore);

exports.NetlifyCmsApp = NetlifyCmsApp;
var _default = _netlifyCmsCore.NetlifyCmsCore;
exports.default = _default;