"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unzip2 = _interopRequireDefault(require("lodash/unzip"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _fromPairs2 = _interopRequireDefault(require("lodash/fromPairs"));

var _gotrueJs = _interopRequireDefault(require("gotrue-js"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _ini = _interopRequireDefault(require("ini"));

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _netlifyCmsBackendGithub = require("netlify-cms-backend-github");

var _netlifyCmsBackendGitlab = require("netlify-cms-backend-gitlab");

var _netlifyCmsBackendBitbucket = require("netlify-cms-backend-bitbucket");

var _GitHubAPI = _interopRequireDefault(require("./GitHubAPI"));

var _GitLabAPI = _interopRequireDefault(require("./GitLabAPI"));

var _AuthenticationPage = _interopRequireDefault(require("./AuthenticationPage"));

var _netlifyLfsClient = require("./netlify-lfs-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const localHosts = {
  localhost: true,
  '127.0.0.1': true,
  '0.0.0.0': true
};
const defaults = {
  identity: '/.netlify/identity',
  gateway: '/.netlify/git',
  largeMedia: '/.netlify/large-media'
};

function getEndpoint(endpoint, netlifySiteURL) {
  if (localHosts[document.location.host.split(':').shift()] && netlifySiteURL && endpoint.match(/^\/\.netlify\//)) {
    const parts = [];

    if (netlifySiteURL) {
      parts.push(netlifySiteURL);

      if (!netlifySiteURL.match(/\/$/)) {
        parts.push('/');
      }
    }

    parts.push(endpoint.replace(/^\//, ''));
    return parts.join('');
  }

  return endpoint;
}

class GitGateway {
  constructor(config) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _defineProperty(this, "requestFunction", req => this.tokenPromise().then(token => _netlifyCmsLibUtil.unsentRequest.withHeaders({
      Authorization: `Bearer ${token}`
    }, req)).then(_netlifyCmsLibUtil.unsentRequest.performRequest));

    this.options = _objectSpread({
      proxied: true,
      API: null
    }, options);
    this.config = config;
    this.branch = config.getIn(['backend', 'branch'], 'master').trim();
    this.squash_merges = config.getIn(['backend', 'squash_merges']);
    const netlifySiteURL = localStorage.getItem('netlifySiteURL');
    const APIUrl = getEndpoint(config.getIn(['backend', 'identity_url'], defaults.identity), netlifySiteURL);
    this.gatewayUrl = getEndpoint(config.getIn(['backend', 'gateway_url'], defaults.gateway), netlifySiteURL);
    this.netlifyLargeMediaURL = getEndpoint(config.getIn(['backend', 'large_media_url'], defaults.largeMedia), netlifySiteURL);
    const backendTypeRegex = /\/(github|gitlab|bitbucket)\/?$/;
    const backendTypeMatches = this.gatewayUrl.match(backendTypeRegex);

    if (backendTypeMatches) {
      this.backendType = backendTypeMatches[1];
      this.gatewayUrl = this.gatewayUrl.replace(backendTypeRegex, '');
    } else {
      this.backendType = null;
    }

    this.authClient = window.netlifyIdentity ? window.netlifyIdentity.gotrue : new _gotrueJs.default({
      APIUrl
    });
    _AuthenticationPage.default.authClient = this.authClient;
    this.backend = null;
  }

  authenticate(user) {
    this.tokenPromise = user.jwt.bind(user);
    return this.tokenPromise().then(async token => {
      if (!this.backendType) {
        const _ref = await fetch(`${this.gatewayUrl}/settings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(async res => {
          const contentType = res.headers.get('Content-Type');

          if (!contentType.includes('application/json') && !contentType.includes('text/json')) {
            throw new _netlifyCmsLibUtil.APIError(`Your Git Gateway backend is not returning valid settings. Please make sure it is enabled.`, res.status, 'Git Gateway');
          }

          const body = await res.json();

          if (!res.ok) {
            throw new _netlifyCmsLibUtil.APIError(`Git Gateway Error: ${body.message ? body.message : body}`, res.status, 'Git Gateway');
          }

          return body;
        }),
              github_enabled = _ref.github_enabled,
              gitlab_enabled = _ref.gitlab_enabled,
              bitbucket_enabled = _ref.bitbucket_enabled,
              roles = _ref.roles;

        this.acceptRoles = roles;

        if (github_enabled) {
          this.backendType = 'github';
        } else if (gitlab_enabled) {
          this.backendType = 'gitlab';
        } else if (bitbucket_enabled) {
          this.backendType = 'bitbucket';
        }
      }

      if (this.acceptRoles && this.acceptRoles.length > 0) {
        const userRoles = (0, _get2.default)((0, _jwtDecode.default)(token), 'app_metadata.roles', []);
        const validRole = (0, _intersection2.default)(userRoles, this.acceptRoles).length > 0;

        if (!validRole) {
          throw new Error("You don't have sufficient permissions to access Netlify CMS");
        }
      }

      const userData = {
        name: user.user_metadata.full_name || user.email.split('@').shift(),
        email: user.email,
        avatar_url: user.user_metadata.avatar_url,
        metadata: user.user_metadata
      };
      const apiConfig = {
        api_root: `${this.gatewayUrl}/${this.backendType}`,
        branch: this.branch,
        tokenPromise: this.tokenPromise,
        commitAuthor: (0, _pick2.default)(userData, ['name', 'email']),
        squash_merges: this.squash_merges,
        initialWorkflowStatus: this.options.initialWorkflowStatus
      };

      if (this.backendType === 'github') {
        this.api = new _GitHubAPI.default(apiConfig);
        this.backend = new _netlifyCmsBackendGithub.GitHubBackend(this.config, _objectSpread({}, this.options, {
          API: this.api
        }));
      } else if (this.backendType === 'gitlab') {
        this.api = new _GitLabAPI.default(apiConfig);
        this.backend = new _netlifyCmsBackendGitlab.GitLabBackend(this.config, _objectSpread({}, this.options, {
          API: this.api
        }));
      } else if (this.backendType === 'bitbucket') {
        this.api = new _netlifyCmsBackendBitbucket.API(_objectSpread({}, apiConfig, {
          requestFunction: this.requestFunction,
          hasWriteAccess: async () => true
        }));
        this.backend = new _netlifyCmsBackendBitbucket.BitbucketBackend(this.config, _objectSpread({}, this.options, {
          API: this.api
        }));
      }

      if (!(await this.api.hasWriteAccess())) {
        throw new Error("You don't have sufficient permissions to access Netlify CMS");
      }
    });
  }

  restoreUser() {
    const user = this.authClient && this.authClient.currentUser();
    if (!user) return Promise.reject();
    return this.authenticate(user);
  }

  authComponent() {
    return _AuthenticationPage.default;
  }

  logout() {
    if (window.netlifyIdentity) {
      return window.netlifyIdentity.logout();
    }

    const user = this.authClient.currentUser();
    return user && user.logout();
  }

  getToken() {
    return this.tokenPromise();
  }

  entriesByFolder(collection, extension) {
    return this.backend.entriesByFolder(collection, extension);
  }

  entriesByFiles(collection) {
    return this.backend.entriesByFiles(collection);
  }

  fetchFiles(files) {
    return this.backend.fetchFiles(files);
  }

  getEntry(collection, slug, path) {
    return this.backend.getEntry(collection, slug, path);
  }

  getMedia() {
    return Promise.all([this.backend.getMedia(), this.getLargeMediaClient()]).then(async (_ref2) => {
      let _ref3 = _slicedToArray(_ref2, 2),
          mediaFiles = _ref3[0],
          largeMediaClient = _ref3[1];

      if (!largeMediaClient.enabled) {
        return mediaFiles.map((_ref4) => {
          let displayURL = _ref4.displayURL,
              rest = _objectWithoutProperties(_ref4, ["displayURL"]);

          return _objectSpread({}, rest, {
            displayURL: {
              original: displayURL
            }
          });
        });
      }

      const largeMediaDisplayURLs = await this.getLargeMediaDisplayURLs(mediaFiles);
      return mediaFiles.map((_ref5) => {
        let id = _ref5.id,
            displayURL = _ref5.displayURL,
            path = _ref5.path,
            rest = _objectWithoutProperties(_ref5, ["id", "displayURL", "path"]);

        return _objectSpread({}, rest, {
          id,
          path,
          displayURL: {
            path,
            original: displayURL,
            largeMedia: largeMediaDisplayURLs[id]
          }
        });
      });
    });
  } // this method memoizes this._getLargeMediaClient so that there can
  // only be one client at a time


  getLargeMediaClient() {
    if (this._largeMediaClientPromise) {
      return this._largeMediaClientPromise;
    }

    this._largeMediaClientPromise = this._getLargeMediaClient();
    return this._largeMediaClientPromise;
  }

  _getLargeMediaClient() {
    const netlifyLargeMediaEnabledPromise = this.api.readFile('.lfsconfig').then(_ini.default.decode).then((_ref6) => {
      let url = _ref6.lfs.url;
      return new URL(url);
    }).then(lfsURL => ({
      enabled: lfsURL.hostname.endsWith('netlify.com')
    })).catch(err => ({
      enabled: false,
      err
    }));
    const lfsPatternsPromise = this.api.readFile('.gitattributes').then(_netlifyLfsClient.getLargeMediaPatternsFromGitAttributesFile).then(patterns => ({
      patterns
    })).catch(err => err.message.includes('404') ? [] : {
      err
    });
    return Promise.all([netlifyLargeMediaEnabledPromise, lfsPatternsPromise]).then((_ref7) => {
      let _ref8 = _slicedToArray(_ref7, 2),
          maybeEnabled = _ref8[0].enabled,
          _ref8$ = _ref8[1],
          patterns = _ref8$.patterns,
          patternsErr = _ref8$.err;

      const enabled = maybeEnabled && !patternsErr; // We expect LFS patterns to exist when the .lfsconfig states
      // that we're using Netlify Large Media

      if (maybeEnabled && patternsErr) {
        console.error(patternsErr);
      }

      return (0, _netlifyLfsClient.getClient)({
        enabled,
        rootURL: this.netlifyLargeMediaURL,
        makeAuthorizedRequest: this.requestFunction,
        patterns,
        transformImages: this.config.getIn(['backend', 'use_large_media_transforms_in_media_library'], true) ? {
          nf_resize: 'fit',
          w: 560,
          h: 320
        } : false
      });
    });
  }

  async getLargeMediaDisplayURLs(mediaFiles) {
    const client = await this.getLargeMediaClient();
    const largeMediaItems = mediaFiles.filter((_ref9) => {
      let path = _ref9.path;
      return client.matchPath(path);
    }).map((_ref10) => {
      let id = _ref10.id,
          path = _ref10.path;
      return {
        path,
        sha: id
      };
    });
    return this.backend.fetchFiles(largeMediaItems).then(items => items.map((_ref11) => {
      let sha = _ref11.file.sha,
          data = _ref11.data;
      const parsedPointerFile = (0, _netlifyLfsClient.parsePointerFile)(data);
      return [{
        pointerId: sha,
        resourceId: parsedPointerFile.sha
      }, parsedPointerFile];
    })).then(_unzip2.default).then((_ref12) => {
      let _ref13 = _slicedToArray(_ref12, 2),
          idMaps = _ref13[0],
          files = _ref13[1];

      return Promise.all([idMaps, client.getResourceDownloadURLArgs(files).then(_fromPairs2.default)]);
    }).then((_ref14) => {
      let _ref15 = _slicedToArray(_ref14, 2),
          idMaps = _ref15[0],
          resourceMap = _ref15[1];

      return idMaps.map((_ref16) => {
        let pointerId = _ref16.pointerId,
            resourceId = _ref16.resourceId;
        return [pointerId, resourceMap[resourceId]];
      });
    }).then(_fromPairs2.default);
  }

  getMediaDisplayURL(displayURL) {
    const path = displayURL.path,
          original = displayURL.original,
          largeMediaDisplayURL = displayURL.largeMedia;
    return this.getLargeMediaClient().then(client => {
      if (client.enabled && client.matchPath(path)) {
        return client.getDownloadURL(largeMediaDisplayURL);
      }

      if (typeof original === 'string') {
        return original;
      }

      if (this.backend.getMediaDisplayURL) {
        return this.backend.getMediaDisplayURL(original);
      }

      const err = new Error(`getMediaDisplayURL is not implemented by the ${this.backendType} backend, but the backend returned a displayURL which was not a string!`);
      err.displayURL = displayURL;
      return Promise.reject(err);
    });
  }

  async getPointerFileForMediaFileObj(fileObj) {
    const client = await this.getLargeMediaClient();
    const name = fileObj.name,
          size = fileObj.size;
    const sha = await (0, _netlifyCmsLibUtil.getBlobSHA)(fileObj);
    await client.uploadResource({
      sha,
      size
    }, fileObj);
    const pointerFileString = (0, _netlifyLfsClient.createPointerFile)({
      sha,
      size
    });
    const pointerFileBlob = new Blob([pointerFileString]);
    const pointerFile = new File([pointerFileBlob], name, {
      type: 'text/plain'
    });
    const pointerFileSHA = await (0, _netlifyCmsLibUtil.getBlobSHA)(pointerFile);
    return {
      file: pointerFile,
      blob: pointerFileBlob,
      sha: pointerFileSHA,
      raw: pointerFileString
    };
  }

  async persistEntry(entry, mediaFiles, options) {
    const client = await this.getLargeMediaClient();

    if (!client.enabled) {
      return this.backend.persistEntry(entry, mediaFiles, options);
    }

    const largeMediaFilteredMediaFiles = await Promise.all(mediaFiles.map(async mediaFile => {
      const fileObj = mediaFile.fileObj,
            path = mediaFile.path;
      const fixedPath = path.startsWith('/') ? path.slice(1) : path;

      if (!client.matchPath(fixedPath)) {
        return mediaFile;
      }

      const pointerFileDetails = await this.getPointerFileForMediaFileObj(fileObj);
      return _objectSpread({}, mediaFile, {
        fileObj: pointerFileDetails.file,
        size: pointerFileDetails.blob.size,
        sha: pointerFileDetails.sha,
        raw: pointerFileDetails.raw
      });
    }));
    return this.backend.persistEntry(entry, largeMediaFilteredMediaFiles, options);
  }

  async persistMedia(mediaFile, options) {
    const fileObj = mediaFile.fileObj,
          path = mediaFile.path,
          value = mediaFile.value;
    const displayURL = URL.createObjectURL(fileObj);
    const client = await this.getLargeMediaClient();
    const fixedPath = path.startsWith('/') ? path.slice(1) : path;

    if (!client.enabled || !client.matchPath(fixedPath)) {
      return this.backend.persistMedia(mediaFile, options);
    }

    const pointerFileDetails = await this.getPointerFileForMediaFileObj(fileObj);
    const persistMediaArgument = {
      fileObj: pointerFileDetails.file,
      size: pointerFileDetails.blob.size,
      path,
      sha: pointerFileDetails.sha,
      raw: pointerFileDetails.raw,
      value
    };
    return _objectSpread({}, (await this.backend.persistMedia(persistMediaArgument, options)), {
      displayURL
    });
  }

  deleteFile(path, commitMessage, options) {
    return this.backend.deleteFile(path, commitMessage, options);
  }

  getDeployPreview(collection, slug) {
    if (this.backend.getDeployPreview) {
      return this.backend.getDeployPreview(collection, slug);
    }
  }

  unpublishedEntries() {
    return this.backend.unpublishedEntries();
  }

  unpublishedEntry(collection, slug) {
    return this.backend.unpublishedEntry(collection, slug);
  }

  updateUnpublishedEntryStatus(collection, slug, newStatus) {
    return this.backend.updateUnpublishedEntryStatus(collection, slug, newStatus);
  }

  deleteUnpublishedEntry(collection, slug) {
    return this.backend.deleteUnpublishedEntry(collection, slug);
  }

  publishUnpublishedEntry(collection, slug) {
    return this.backend.publishUnpublishedEntry(collection, slug);
  }

  traverseCursor(cursor, action) {
    return this.backend.traverseCursor(cursor, action);
  }

}

exports.default = GitGateway;