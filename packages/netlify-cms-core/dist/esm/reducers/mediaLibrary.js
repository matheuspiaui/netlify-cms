"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = require("immutable");

var _v = _interopRequireDefault(require("uuid/v4"));

var _mediaLibrary = require("../actions/mediaLibrary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultState = {
  isVisible: false,
  showMediaButton: true,
  controlMedia: (0, _immutable.Map)(),
  displayURLs: (0, _immutable.Map)()
};

const mediaLibrary = function mediaLibrary() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)(defaultState);
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _mediaLibrary.MEDIA_LIBRARY_CREATE:
      return state.withMutations(map => {
        map.set('externalLibrary', action.payload);
        map.set('showMediaButton', action.payload.enableStandalone());
      });

    case _mediaLibrary.MEDIA_LIBRARY_OPEN:
      {
        const _action$payload = action.payload,
              controlID = _action$payload.controlID,
              forImage = _action$payload.forImage,
              privateUpload = _action$payload.privateUpload;
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return (0, _immutable.Map)({
            isVisible: true,
            forImage,
            controlID,
            canInsert: !!controlID,
            privateUpload,
            controlMedia: (0, _immutable.Map)()
          });
        }

        return state.withMutations(map => {
          map.set('isVisible', true);
          map.set('forImage', forImage);
          map.set('controlID', controlID);
          map.set('canInsert', !!controlID);
          map.set('privateUpload', privateUpload);
        });
      }

    case _mediaLibrary.MEDIA_LIBRARY_CLOSE:
      return state.set('isVisible', false);

    case _mediaLibrary.MEDIA_INSERT:
      {
        const mediaPath = action.payload.mediaPath;
        const controlID = state.get('controlID');
        return state.withMutations(map => {
          map.setIn(['controlMedia', controlID], mediaPath);
        });
      }

    case _mediaLibrary.MEDIA_REMOVE_INSERTED:
      {
        const controlID = action.payload.controlID;
        return state.setIn(['controlMedia', controlID], '');
      }

    case _mediaLibrary.MEDIA_LOAD_REQUEST:
      return state.withMutations(map => {
        map.set('isLoading', true);
        map.set('isPaginating', action.payload.page > 1);
      });

    case _mediaLibrary.MEDIA_LOAD_SUCCESS:
      {
        const _action$payload2 = action.payload,
              _action$payload2$file = _action$payload2.files,
              files = _action$payload2$file === void 0 ? [] : _action$payload2$file,
              page = _action$payload2.page,
              canPaginate = _action$payload2.canPaginate,
              dynamicSearch = _action$payload2.dynamicSearch,
              dynamicSearchQuery = _action$payload2.dynamicSearchQuery,
              privateUpload = _action$payload2.privateUpload;
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        const filesWithKeys = files.map(file => _objectSpread({}, file, {
          key: (0, _v.default)()
        }));
        return state.withMutations(map => {
          map.set('isLoading', false);
          map.set('isPaginating', false);
          map.set('page', page);
          map.set('hasNextPage', canPaginate && files.length > 0);
          map.set('dynamicSearch', dynamicSearch);
          map.set('dynamicSearchQuery', dynamicSearchQuery);
          map.set('dynamicSearchActive', !!dynamicSearchQuery);

          if (page && page > 1) {
            const updatedFiles = map.get('files').concat(filesWithKeys);
            map.set('files', updatedFiles);
          } else {
            map.set('files', filesWithKeys);
          }
        });
      }

    case _mediaLibrary.MEDIA_LOAD_FAILURE:
      {
        const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.set('isLoading', false);
      }

    case _mediaLibrary.MEDIA_PERSIST_REQUEST:
      return state.set('isPersisting', true);

    case _mediaLibrary.MEDIA_PERSIST_SUCCESS:
      {
        const _action$payload3 = action.payload,
              file = _action$payload3.file,
              privateUpload = _action$payload3.privateUpload;
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.withMutations(map => {
          const fileWithKey = _objectSpread({}, file, {
            key: (0, _v.default)()
          });

          const updatedFiles = [fileWithKey, ...map.get('files')];
          map.set('files', updatedFiles);
          map.set('isPersisting', false);
        });
      }

    case _mediaLibrary.MEDIA_PERSIST_FAILURE:
      {
        const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.set('isPersisting', false);
      }

    case _mediaLibrary.MEDIA_DELETE_REQUEST:
      return state.set('isDeleting', true);

    case _mediaLibrary.MEDIA_DELETE_SUCCESS:
      {
        const _action$payload$file = action.payload.file,
              id = _action$payload$file.id,
              key = _action$payload$file.key,
              privateUpload = _action$payload$file.privateUpload;
        const privateUploadChanged = state.get('privateUpload') !== privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.withMutations(map => {
          const updatedFiles = map.get('files').filter(file => file.key !== key);
          map.set('files', updatedFiles);
          map.deleteIn(['displayURLs', id]);
          map.set('isDeleting', false);
        });
      }

    case _mediaLibrary.MEDIA_DELETE_FAILURE:
      {
        const privateUploadChanged = state.get('privateUpload') !== action.payload.privateUpload;

        if (privateUploadChanged) {
          return state;
        }

        return state.set('isDeleting', false);
      }

    case _mediaLibrary.MEDIA_DISPLAY_URL_REQUEST:
      return state.setIn(['displayURLs', action.payload.key, 'isFetching'], true);

    case _mediaLibrary.MEDIA_DISPLAY_URL_SUCCESS:
      {
        const displayURLPath = ['displayURLs', action.payload.key];
        return state.setIn([...displayURLPath, 'isFetching'], false).setIn([...displayURLPath, 'url'], action.payload.url);
      }

    case _mediaLibrary.MEDIA_DISPLAY_URL_FAILURE:
      {
        const displayURLPath = ['displayURLs', action.payload.key];
        return state.setIn([...displayURLPath, 'isFetching'], false) // make sure that err is set so the CMS won't attempt to load
        // the image again
        .setIn([...displayURLPath, 'err'], action.payload.err || true).deleteIn([...displayURLPath, 'url']);
      }

    default:
      return state;
  }
};

var _default = mediaLibrary;
exports.default = _default;