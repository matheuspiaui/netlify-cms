"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsSha = _interopRequireDefault(require("js-sha256"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = blob => new Promise((resolve, reject) => {
  const fr = new FileReader();

  fr.onload = (_ref) => {
    let result = _ref.target.result;
    return resolve((0, _jsSha.default)(result));
  };

  fr.onerror = err => {
    fr.abort();
    reject(err);
  };

  fr.readAsArrayBuffer(blob);
});

exports.default = _default;