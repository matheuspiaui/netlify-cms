"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _netlifyCmsBackendGitlab = require("netlify-cms-backend-gitlab");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class API extends _netlifyCmsBackendGitlab.API {
  constructor(config) {
    super(config);

    _defineProperty(this, "authenticateRequest", async req => _netlifyCmsLibUtil.unsentRequest.withHeaders({
      Authorization: `Bearer ${await this.tokenPromise()}`
    }, req));

    _defineProperty(this, "request", async req => (0, _flow2.default)([this.buildRequest, this.authenticateRequest, (0, _netlifyCmsLibUtil.then)(_netlifyCmsLibUtil.unsentRequest.performRequest)])(req));

    _defineProperty(this, "hasWriteAccess", () => Promise.resolve(true));

    this.tokenPromise = config.tokenPromise;
    this.commitAuthor = config.commitAuthor;
    this.repoURL = '';
  }

}

exports.default = API;