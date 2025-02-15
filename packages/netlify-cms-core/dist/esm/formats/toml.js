"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tomlJ = _interopRequireDefault(require("toml-j0.4"));

var _tomlifyJ = _interopRequireDefault(require("tomlify-j0.4"));

var _moment = _interopRequireDefault(require("moment"));

var _AssetProxy = _interopRequireDefault(require("../valueObjects/AssetProxy"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const outputReplacer = (key, value) => {
  if (_moment.default.isMoment(value)) {
    return value.format(value._f);
  }

  if (value instanceof _AssetProxy.default) {
    return `${value.path}`;
  }

  if (Number.isInteger(value)) {
    // Return the string representation of integers so tomlify won't render with tenths (".0")
    return value.toString();
  } // Return `false` to use default (`undefined` would delete key).


  return false;
};

var _default = {
  fromFile(content) {
    return _tomlJ.default.parse(content);
  },

  toFile(data) {
    let sortedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return _tomlifyJ.default.toToml(data, {
      replace: outputReplacer,
      sort: (0, _helpers.sortKeys)(sortedKeys)
    });
  }

};
exports.default = _default;