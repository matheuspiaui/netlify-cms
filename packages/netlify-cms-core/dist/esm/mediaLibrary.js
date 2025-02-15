"use strict";

var _once2 = _interopRequireDefault(require("lodash/once"));

var _registry = require("./lib/registry");

var _redux = _interopRequireDefault(require("./redux"));

var _mediaLibrary = require("./actions/mediaLibrary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initializeMediaLibrary = (0, _once2.default)(async function initializeMediaLibrary(name, options) {
  const lib = (0, _registry.getMediaLibrary)(name);

  const handleInsert = url => _redux.default.dispatch((0, _mediaLibrary.insertMedia)(url));

  const instance = await lib.init({
    options,
    handleInsert
  });

  _redux.default.dispatch((0, _mediaLibrary.createMediaLibrary)(instance));
});

_redux.default.subscribe(() => {
  const state = _redux.default.getState();

  const mediaLibraryName = state.config.getIn(['media_library', 'name']);

  if (mediaLibraryName && !state.mediaLibrary.get('externalLibrary')) {
    const mediaLibraryConfig = state.config.get('media_library').toJS();
    initializeMediaLibrary(mediaLibraryName, mediaLibraryConfig);
  }
});