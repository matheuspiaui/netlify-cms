"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _netlifyCmsBackendGithub = require("netlify-cms-backend-github");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class API extends _netlifyCmsBackendGithub.API {
  constructor(config) {
    super(config);
    this.api_root = config.api_root;
    this.tokenPromise = config.tokenPromise;
    this.commitAuthor = config.commitAuthor;
    this.repoURL = '';
  }

  hasWriteAccess() {
    return this.getBranch().then(() => true).catch(error => {
      if (error.status === 401) {
        if (error.message === 'Bad credentials') {
          throw new _netlifyCmsLibUtil.APIError('Git Gateway Error: Please ask your site administrator to reissue the Git Gateway token.', error.status, 'Git Gateway');
        } else {
          return false;
        }
      } else if (error.status === 404 && (error.message === undefined || error.message === 'Unable to locate site configuration')) {
        throw new _netlifyCmsLibUtil.APIError(`Git Gateway Error: Please make sure Git Gateway is enabled on your site.`, error.status, 'Git Gateway');
      } else {
        console.error('Problem fetching repo data from Git Gateway');
        throw error;
      }
    });
  }

  getRequestHeaders() {
    let headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this.tokenPromise().then(jwtToken => {
      const baseHeader = _objectSpread({
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }, headers);

      return baseHeader;
    });
  }

  urlFor(path, options) {
    const cacheBuster = new Date().getTime();
    const params = [`ts=${cacheBuster}`];

    if (options.params) {
      for (const key in options.params) {
        params.push(`${key}=${encodeURIComponent(options.params[key])}`);
      }
    }

    if (params.length) {
      path += `?${params.join('&')}`;
    }

    return this.api_root + path;
  }

  user() {
    return Promise.resolve(this.commitAuthor);
  }

  request(path) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const url = this.urlFor(path, options);
    let responseStatus;
    return this.getRequestHeaders(options.headers || {}).then(headers => fetch(url, _objectSpread({}, options, {
      headers
    }))).then(response => {
      responseStatus = response.status;
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.match(/json/)) {
        return this.parseJsonResponse(response);
      }

      const text = response.text();

      if (!response.ok) {
        return Promise.reject(text);
      }

      return text;
    }).catch(error => {
      throw new _netlifyCmsLibUtil.APIError(error.message || error.msg, responseStatus, 'Git Gateway');
    });
  }

  commit(message, changeTree) {
    const commitParams = {
      message,
      tree: changeTree.sha,
      parents: changeTree.parentSha ? [changeTree.parentSha] : []
    };

    if (this.commitAuthor) {
      commitParams.author = _objectSpread({}, this.commitAuthor, {
        date: new Date().toISOString()
      });
    }

    return this.request('/git/commits', {
      method: 'POST',
      body: JSON.stringify(commitParams)
    });
  }

}

exports.default = API;