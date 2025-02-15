"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMediaLibrary = createMediaLibrary;
exports.clearMediaControl = clearMediaControl;
exports.removeMediaControl = removeMediaControl;
exports.openMediaLibrary = openMediaLibrary;
exports.closeMediaLibrary = closeMediaLibrary;
exports.insertMedia = insertMedia;
exports.removeInsertedMedia = removeInsertedMedia;
exports.loadMedia = loadMedia;
exports.persistMedia = persistMedia;
exports.deleteMedia = deleteMedia;
exports.loadMediaDisplayURL = loadMediaDisplayURL;
exports.mediaLoading = mediaLoading;
exports.mediaLoaded = mediaLoaded;
exports.mediaLoadFailed = mediaLoadFailed;
exports.mediaPersisting = mediaPersisting;
exports.mediaPersisted = mediaPersisted;
exports.mediaPersistFailed = mediaPersistFailed;
exports.mediaDeleting = mediaDeleting;
exports.mediaDeleted = mediaDeleted;
exports.mediaDeleteFailed = mediaDeleteFailed;
exports.mediaDisplayURLRequest = mediaDisplayURLRequest;
exports.mediaDisplayURLSuccess = mediaDisplayURLSuccess;
exports.mediaDisplayURLFailure = mediaDisplayURLFailure;
exports.MEDIA_DISPLAY_URL_FAILURE = exports.MEDIA_DISPLAY_URL_SUCCESS = exports.MEDIA_DISPLAY_URL_REQUEST = exports.MEDIA_DELETE_FAILURE = exports.MEDIA_DELETE_SUCCESS = exports.MEDIA_DELETE_REQUEST = exports.MEDIA_PERSIST_FAILURE = exports.MEDIA_PERSIST_SUCCESS = exports.MEDIA_PERSIST_REQUEST = exports.MEDIA_LOAD_FAILURE = exports.MEDIA_LOAD_SUCCESS = exports.MEDIA_LOAD_REQUEST = exports.MEDIA_REMOVE_INSERTED = exports.MEDIA_INSERT = exports.MEDIA_LIBRARY_CREATE = exports.MEDIA_LIBRARY_CLOSE = exports.MEDIA_LIBRARY_OPEN = void 0;

var _immutable = require("immutable");

var _reduxNotifications = require("redux-notifications");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _backend = require("../backend");

var _AssetProxy = require("../valueObjects/AssetProxy");

var _reducers = require("../reducers");

var _integrations = require("../integrations");

var _media = require("./media");

var _urlHelper = require("../lib/urlHelper");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const notifSend = _reduxNotifications.actions.notifSend;
const MEDIA_LIBRARY_OPEN = 'MEDIA_LIBRARY_OPEN';
exports.MEDIA_LIBRARY_OPEN = MEDIA_LIBRARY_OPEN;
const MEDIA_LIBRARY_CLOSE = 'MEDIA_LIBRARY_CLOSE';
exports.MEDIA_LIBRARY_CLOSE = MEDIA_LIBRARY_CLOSE;
const MEDIA_LIBRARY_CREATE = 'MEDIA_LIBRARY_CREATE';
exports.MEDIA_LIBRARY_CREATE = MEDIA_LIBRARY_CREATE;
const MEDIA_INSERT = 'MEDIA_INSERT';
exports.MEDIA_INSERT = MEDIA_INSERT;
const MEDIA_REMOVE_INSERTED = 'MEDIA_REMOVE_INSERTED';
exports.MEDIA_REMOVE_INSERTED = MEDIA_REMOVE_INSERTED;
const MEDIA_LOAD_REQUEST = 'MEDIA_LOAD_REQUEST';
exports.MEDIA_LOAD_REQUEST = MEDIA_LOAD_REQUEST;
const MEDIA_LOAD_SUCCESS = 'MEDIA_LOAD_SUCCESS';
exports.MEDIA_LOAD_SUCCESS = MEDIA_LOAD_SUCCESS;
const MEDIA_LOAD_FAILURE = 'MEDIA_LOAD_FAILURE';
exports.MEDIA_LOAD_FAILURE = MEDIA_LOAD_FAILURE;
const MEDIA_PERSIST_REQUEST = 'MEDIA_PERSIST_REQUEST';
exports.MEDIA_PERSIST_REQUEST = MEDIA_PERSIST_REQUEST;
const MEDIA_PERSIST_SUCCESS = 'MEDIA_PERSIST_SUCCESS';
exports.MEDIA_PERSIST_SUCCESS = MEDIA_PERSIST_SUCCESS;
const MEDIA_PERSIST_FAILURE = 'MEDIA_PERSIST_FAILURE';
exports.MEDIA_PERSIST_FAILURE = MEDIA_PERSIST_FAILURE;
const MEDIA_DELETE_REQUEST = 'MEDIA_DELETE_REQUEST';
exports.MEDIA_DELETE_REQUEST = MEDIA_DELETE_REQUEST;
const MEDIA_DELETE_SUCCESS = 'MEDIA_DELETE_SUCCESS';
exports.MEDIA_DELETE_SUCCESS = MEDIA_DELETE_SUCCESS;
const MEDIA_DELETE_FAILURE = 'MEDIA_DELETE_FAILURE';
exports.MEDIA_DELETE_FAILURE = MEDIA_DELETE_FAILURE;
const MEDIA_DISPLAY_URL_REQUEST = 'MEDIA_DISPLAY_URL_REQUEST';
exports.MEDIA_DISPLAY_URL_REQUEST = MEDIA_DISPLAY_URL_REQUEST;
const MEDIA_DISPLAY_URL_SUCCESS = 'MEDIA_DISPLAY_URL_SUCCESS';
exports.MEDIA_DISPLAY_URL_SUCCESS = MEDIA_DISPLAY_URL_SUCCESS;
const MEDIA_DISPLAY_URL_FAILURE = 'MEDIA_DISPLAY_URL_FAILURE';
exports.MEDIA_DISPLAY_URL_FAILURE = MEDIA_DISPLAY_URL_FAILURE;

function createMediaLibrary(instance) {
  const api = {
    show: instance.show || (() => {}),
    hide: instance.hide || (() => {}),
    onClearControl: instance.onClearControl || (() => {}),
    onRemoveControl: instance.onRemoveControl || (() => {}),
    enableStandalone: instance.enableStandalone || (() => {})
  };
  return {
    type: MEDIA_LIBRARY_CREATE,
    payload: api
  };
}

function clearMediaControl(id) {
  return (dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      mediaLibrary.onClearControl({
        id
      });
    }
  };
}

function removeMediaControl(id) {
  return (dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      mediaLibrary.onRemoveControl({
        id
      });
    }
  };
}

function openMediaLibrary() {
  let payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      const id = payload.controlID,
            value = payload.value,
            _payload$config = payload.config,
            config = _payload$config === void 0 ? (0, _immutable.Map)() : _payload$config,
            allowMultiple = payload.allowMultiple,
            forImage = payload.forImage;
      mediaLibrary.show({
        id,
        value,
        config: config.toJS(),
        allowMultiple,
        imagesOnly: forImage
      });
    }

    dispatch({
      type: MEDIA_LIBRARY_OPEN,
      payload
    });
  };
}

function closeMediaLibrary() {
  return (dispatch, getState) => {
    const state = getState();
    const mediaLibrary = state.mediaLibrary.get('externalLibrary');

    if (mediaLibrary) {
      mediaLibrary.hide();
    }

    dispatch({
      type: MEDIA_LIBRARY_CLOSE
    });
  };
}

function insertMedia(mediaPath) {
  return {
    type: MEDIA_INSERT,
    payload: {
      mediaPath
    }
  };
}

function removeInsertedMedia(controlID) {
  return {
    type: MEDIA_REMOVE_INSERTED,
    payload: {
      controlID
    }
  };
}

function loadMedia() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const _opts$delay = opts.delay,
        delay = _opts$delay === void 0 ? 0 : _opts$delay,
        _opts$query = opts.query,
        query = _opts$query === void 0 ? '' : _opts$query,
        _opts$page = opts.page,
        page = _opts$page === void 0 ? 1 : _opts$page,
        privateUpload = opts.privateUpload;
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, null, 'assetStore');

    if (integration) {
      const provider = (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration);
      dispatch(mediaLoading(page));

      try {
        const files = await provider.retrieve(query, page, privateUpload);
        const mediaLoadedOpts = {
          page,
          canPaginate: true,
          dynamicSearch: true,
          dynamicSearchQuery: query,
          privateUpload
        };
        return dispatch(mediaLoaded(files, mediaLoadedOpts));
      } catch (error) {
        return dispatch(mediaLoadFailed({
          privateUpload
        }));
      }
    }

    dispatch(mediaLoading(page));
    return new Promise(resolve => {
      setTimeout(() => resolve(backend.getMedia().then(files => dispatch(mediaLoaded(files))).catch(error => console.error(error) || dispatch(error.status === 404 ? mediaLoaded() : mediaLoadFailed()))));
    }, delay);
  };
}

function persistMedia(file) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const privateUpload = opts.privateUpload;
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, null, 'assetStore');
    const files = state.mediaLibrary.get('files');
    const fileName = (0, _urlHelper.sanitizeSlug)(file.name.toLowerCase(), state.config.get('slug'));
    const existingFile = files.find(existingFile => existingFile.name.toLowerCase() === fileName);
    /**
     * Check for existing files of the same name before persisting. If no asset
     * store integration is used, files are being stored in Git, so we can
     * expect file names to be unique. If an asset store is in use, file names
     * may not be unique, so we forego this check.
     */

    if (!integration && existingFile) {
      if (!window.confirm(`${existingFile.name} already exists. Do you want to replace it?`)) {
        return;
      } else {
        await dispatch(deleteMedia(existingFile, {
          privateUpload
        }));
      }
    }

    dispatch(mediaPersisting());

    try {
      const id = await (0, _netlifyCmsLibUtil.getBlobSHA)(file);
      const assetProxy = await (0, _AssetProxy.createAssetProxy)(fileName, file, false, privateUpload);
      dispatch((0, _media.addAsset)(assetProxy));

      if (!integration) {
        const asset = await backend.persistMedia(state.config, assetProxy);
        const displayURL = asset.displayURL || URL.createObjectURL(file);
        return dispatch(mediaPersisted(_objectSpread({
          id,
          displayURL
        }, asset)));
      }

      return dispatch(mediaPersisted(_objectSpread({
        id,
        displayURL: URL.createObjectURL(file)
      }, assetProxy.asset), {
        privateUpload
      }));
    } catch (error) {
      console.error(error);
      dispatch(notifSend({
        message: `Failed to persist media: ${error}`,
        kind: 'danger',
        dismissAfter: 8000
      }));
      return dispatch(mediaPersistFailed({
        privateUpload
      }));
    }
  };
}

function deleteMedia(file) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const privateUpload = opts.privateUpload;
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, null, 'assetStore');

    if (integration) {
      const provider = (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration);
      dispatch(mediaDeleting());
      return provider.delete(file.id).then(() => {
        return dispatch(mediaDeleted(file, {
          privateUpload
        }));
      }).catch(error => {
        console.error(error);
        dispatch(notifSend({
          message: `Failed to delete media: ${error.message}`,
          kind: 'danger',
          dismissAfter: 8000
        }));
        return dispatch(mediaDeleteFailed({
          privateUpload
        }));
      });
    }

    dispatch(mediaDeleting());
    return backend.deleteMedia(state.config, file.path).then(() => {
      return dispatch(mediaDeleted(file));
    }).catch(error => {
      console.error(error);
      dispatch(notifSend({
        message: `Failed to delete media: ${error.message}`,
        kind: 'danger',
        dismissAfter: 8000
      }));
      return dispatch(mediaDeleteFailed());
    });
  };
}

function loadMediaDisplayURL(file) {
  return async (dispatch, getState) => {
    const displayURL = file.displayURL,
          id = file.id,
          url = file.url;
    const state = getState();
    const displayURLState = state.mediaLibrary.getIn(['displayURLs', id], (0, _immutable.Map)());

    if (!id || // displayURL is used by most backends; url (like urlIsPublicPath) is used exclusively by the
    // assetStore integration. Only the assetStore uses URLs which can actually be inserted into
    // an entry - other backends create a domain-relative URL using the public_folder from the
    // config and the file's name.
    !displayURL && !url || displayURLState.get('url') || displayURLState.get('isFetching') || displayURLState.get('err')) {
      return Promise.resolve();
    }

    if (typeof url === 'string') {
      dispatch(mediaDisplayURLRequest(id));
      return dispatch(mediaDisplayURLSuccess(id, displayURL));
    }

    if (typeof displayURL === 'string') {
      dispatch(mediaDisplayURLRequest(id));
      return dispatch(mediaDisplayURLSuccess(id, displayURL));
    }

    try {
      const backend = (0, _backend.currentBackend)(state.config);
      dispatch(mediaDisplayURLRequest(id));
      const newURL = await backend.getMediaDisplayURL(displayURL);

      if (newURL) {
        return dispatch(mediaDisplayURLSuccess(id, newURL));
      } else {
        throw new Error('No display URL was returned!');
      }
    } catch (err) {
      return dispatch(mediaDisplayURLFailure(id, err));
    }
  };
}

function mediaLoading(page) {
  return {
    type: MEDIA_LOAD_REQUEST,
    payload: {
      page
    }
  };
}

function mediaLoaded(files) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: MEDIA_LOAD_SUCCESS,
    payload: _objectSpread({
      files
    }, opts)
  };
}

function mediaLoadFailed(error) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const privateUpload = opts.privateUpload;
  return {
    type: MEDIA_LOAD_FAILURE,
    payload: {
      privateUpload
    }
  };
}

function mediaPersisting() {
  return {
    type: MEDIA_PERSIST_REQUEST
  };
}

function mediaPersisted(asset) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const privateUpload = opts.privateUpload;
  return {
    type: MEDIA_PERSIST_SUCCESS,
    payload: {
      file: asset,
      privateUpload
    }
  };
}

function mediaPersistFailed(error) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const privateUpload = opts.privateUpload;
  return {
    type: MEDIA_PERSIST_FAILURE,
    payload: {
      privateUpload
    }
  };
}

function mediaDeleting() {
  return {
    type: MEDIA_DELETE_REQUEST
  };
}

function mediaDeleted(file) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const privateUpload = opts.privateUpload;
  return {
    type: MEDIA_DELETE_SUCCESS,
    payload: {
      file,
      privateUpload
    }
  };
}

function mediaDeleteFailed(error) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const privateUpload = opts.privateUpload;
  return {
    type: MEDIA_DELETE_FAILURE,
    payload: {
      privateUpload
    }
  };
}

function mediaDisplayURLRequest(key) {
  return {
    type: MEDIA_DISPLAY_URL_REQUEST,
    payload: {
      key
    }
  };
}

function mediaDisplayURLSuccess(key, url) {
  return {
    type: MEDIA_DISPLAY_URL_SUCCESS,
    payload: {
      key,
      url
    }
  };
}

function mediaDisplayURLFailure(key, err) {
  console.error(err);
  return {
    type: MEDIA_DISPLAY_URL_FAILURE,
    payload: {
      key,
      err
    }
  };
}