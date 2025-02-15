"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GitGatewayBackend", {
  enumerable: true,
  get: function get() {
    return _implementation.default;
  }
});
Object.defineProperty(exports, "AuthenticationPage", {
  enumerable: true,
  get: function get() {
    return _AuthenticationPage.default;
  }
});
exports.NetlifyCmsBackendGitGateway = void 0;

var _implementation = _interopRequireDefault(require("./implementation"));

var _AuthenticationPage = _interopRequireDefault(require("./AuthenticationPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NetlifyCmsBackendGitGateway = {
  GitGatewayBackend: _implementation.default,
  AuthenticationPage: _AuthenticationPage.default
};
exports.NetlifyCmsBackendGitGateway = NetlifyCmsBackendGitGateway;