"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDefaults = applyDefaults;
exports.configLoaded = configLoaded;
exports.configLoading = configLoading;
exports.configFailed = configFailed;
exports.configDidLoad = configDidLoad;
exports.mergeConfig = mergeConfig;
exports.loadConfig = loadConfig;
exports.CONFIG_MERGE = exports.CONFIG_FAILURE = exports.CONFIG_SUCCESS = exports.CONFIG_REQUEST = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _immutable = require("immutable");

var _auth = require("./auth");

var publishModes = _interopRequireWildcard(require("../constants/publishModes"));

var _configSchema = require("../constants/configSchema");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG_REQUEST = 'CONFIG_REQUEST';
exports.CONFIG_REQUEST = CONFIG_REQUEST;
const CONFIG_SUCCESS = 'CONFIG_SUCCESS';
exports.CONFIG_SUCCESS = CONFIG_SUCCESS;
const CONFIG_FAILURE = 'CONFIG_FAILURE';
exports.CONFIG_FAILURE = CONFIG_FAILURE;
const CONFIG_MERGE = 'CONFIG_MERGE';
exports.CONFIG_MERGE = CONFIG_MERGE;

const getConfigUrl = () => {
  const validTypes = {
    'text/yaml': 'yaml',
    'application/x-yaml': 'yaml'
  };
  const configLinkEl = document.querySelector('link[rel="cms-config-url"]');
  const isValidLink = configLinkEl && validTypes[configLinkEl.type] && (0, _get2.default)(configLinkEl, 'href');

  if (isValidLink) {
    const link = (0, _get2.default)(configLinkEl, 'href');
    console.log(`Using config file path: "${link}"`);
    return link;
  }

  return 'config.yml';
};

const defaults = {
  publish_mode: publishModes.SIMPLE
};

function applyDefaults(config) {
  return (0, _immutable.Map)(defaults).mergeDeep(config).withMutations(map => {
    // Use `site_url` as default `display_url`.
    if (!map.get('display_url') && map.get('site_url')) {
      map.set('display_url', map.get('site_url'));
    } // Use media_folder as default public_folder.


    const defaultPublicFolder = `/${(0, _trimStart2.default)(map.get('media_folder'), '/')}`;

    if (!map.get('public_folder')) {
      map.set('public_folder', defaultPublicFolder);
    } // Strip leading slash from collection folders and files


    map.set('collections', map.get('collections').map(collection => {
      const folder = collection.get('folder');

      if (folder) {
        return collection.set('folder', (0, _trimStart2.default)(folder, '/'));
      }

      const files = collection.get('files');

      if (files) {
        return collection.set('files', files.map(file => {
          return file.set('file', (0, _trimStart2.default)(file.get('file'), '/'));
        }));
      }
    }));
  });
}

function mergePreloadedConfig(preloadedConfig, loadedConfig) {
  const map = (0, _immutable.fromJS)(loadedConfig) || (0, _immutable.Map)();
  return preloadedConfig ? preloadedConfig.mergeDeep(map) : map;
}

function parseConfig(data) {
  const config = _jsYaml.default.safeLoad(data);

  if (typeof CMS_ENV === 'string' && config[CMS_ENV]) {
    Object.keys(config[CMS_ENV]).forEach(key => {
      config[key] = config[CMS_ENV][key];
    });
  }

  return config;
}

async function getConfig(file, isPreloaded) {
  const response = await fetch(file, {
    credentials: 'same-origin'
  }).catch(err => err);

  if (response instanceof Error || response.status !== 200) {
    if (isPreloaded) return parseConfig('');
    throw new Error(`Failed to load config.yml (${response.status || response})`);
  }

  const contentType = response.headers.get('Content-Type') || 'Not-Found';
  const isYaml = contentType.indexOf('yaml') !== -1;

  if (!isYaml) {
    console.log(`Response for ${file} was not yaml. (Content-Type: ${contentType})`);
    if (isPreloaded) return parseConfig('');
  }

  return parseConfig((await response.text()));
}

function configLoaded(config) {
  return {
    type: CONFIG_SUCCESS,
    payload: config
  };
}

function configLoading() {
  return {
    type: CONFIG_REQUEST
  };
}

function configFailed(err) {
  return {
    type: CONFIG_FAILURE,
    error: 'Error loading config',
    payload: err
  };
}

function configDidLoad(config) {
  return dispatch => {
    dispatch(configLoaded(config));
  };
}

function mergeConfig(config) {
  return {
    type: CONFIG_MERGE,
    payload: config
  };
}

function loadConfig() {
  if (window.CMS_CONFIG) {
    return configDidLoad((0, _immutable.fromJS)(window.CMS_CONFIG));
  }

  return async (dispatch, getState) => {
    dispatch(configLoading());

    try {
      const preloadedConfig = getState().config;
      const configUrl = getConfigUrl();
      const loadedConfig = preloadedConfig && preloadedConfig.get('load_config_file') === false ? {} : await getConfig(configUrl, preloadedConfig && preloadedConfig.size > 1);
      /**
       * Merge any existing configuration so the result can be validated.
       */

      const mergedConfig = mergePreloadedConfig(preloadedConfig, loadedConfig);
      (0, _configSchema.validateConfig)(mergedConfig.toJS());
      const config = applyDefaults(mergedConfig);
      dispatch(configDidLoad(config));
      dispatch((0, _auth.authenticateUser)());
    } catch (err) {
      dispatch(configFailed(err));
      throw err;
    }
  };
}