"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = require("immutable");

var _trim = _interopRequireDefault(require("lodash/trim"));

var _trimEnd = _interopRequireDefault(require("lodash/trimEnd"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function createNonce() {
  const nonce = (0, _v.default)();
  window.sessionStorage.setItem('netlify-cms-auth', JSON.stringify({
    nonce
  }));
  return nonce;
}

function validateNonce(check) {
  const auth = window.sessionStorage.getItem('netlify-cms-auth');
  const valid = auth && JSON.parse(auth).nonce;
  window.localStorage.removeItem('netlify-cms-auth');
  return check === valid;
}

class ImplicitAuthenticator {
  constructor() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const baseURL = (0, _trimEnd.default)(config.base_url, '/');
    const authEndpoint = (0, _trim.default)(config.auth_endpoint, '/');
    this.auth_url = `${baseURL}/${authEndpoint}`;
    this.appID = config.app_id;
    this.clearHash = config.clearHash;
  }

  authenticate(options, cb) {
    if (document.location.protocol !== 'https:' && // TODO: Is insecure localhost a bad idea as well? I don't think it is, since you are not actually
    //       sending the token over the internet in this case, assuming the auth URL is secure.
    document.location.hostname !== 'localhost' && document.location.hostname !== '127.0.0.1') {
      return cb(new Error('Cannot authenticate over insecure protocol!'));
    }

    const authURL = new URL(this.auth_url);
    authURL.searchParams.set('client_id', this.appID);
    authURL.searchParams.set('redirect_uri', document.location.origin + document.location.pathname);
    authURL.searchParams.set('response_type', 'token');
    authURL.searchParams.set('scope', options.scope);
    authURL.searchParams.set('state', createNonce());
    document.location.assign(authURL.href);
  }
  /**
   * Complete authentication if we were redirected back to from the provider.
   */


  completeAuth(cb) {
    const hashParams = new URLSearchParams(document.location.hash.replace(/^#?\/?/, ''));

    if (!hashParams.has('access_token') && !hashParams.has('error')) {
      return;
    } // Remove tokens from hash so that token does not remain in browser history.


    this.clearHash();
    const params = (0, _immutable.Map)(hashParams.entries());
    const validNonce = validateNonce(params.get('state'));

    if (!validNonce) {
      return cb(new Error('Invalid nonce'));
    }

    if (params.has('error')) {
      return cb(new Error(`${params.get('error')}: ${params.get('error_description')}`));
    }

    if (params.has('access_token')) {
      const _params$toJS = params.toJS(),
            token = _params$toJS.access_token,
            data = _objectWithoutProperties(_params$toJS, ["access_token"]);

      cb(null, _objectSpread({
        token
      }, data));
    }
  }

}

exports.default = ImplicitAuthenticator;