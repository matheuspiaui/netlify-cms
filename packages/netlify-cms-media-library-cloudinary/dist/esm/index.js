"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsMediaLibraryCloudinary = void 0;

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const defaultOptions = {
  use_secure_url: true,
  use_transformations: true,
  output_filename_only: false
};
/**
 * This configuration hash cannot be overriden, as the values here are required
 * for the integration to work properly.
 */

const enforcedConfig = {
  button_class: undefined,
  inline_container: undefined,
  insert_transformation: false,
  z_index: '99999'
};
const defaultConfig = {
  multiple: false
};

function getAssetUrl(asset, _ref) {
  let use_secure_url = _ref.use_secure_url,
      use_transformations = _ref.use_transformations,
      output_filename_only = _ref.output_filename_only;

  /**
   * Allow output of the file name only, in which case the rest of the url (including)
   * transformations) can be handled by the static site generator.
   */
  if (output_filename_only) {
    return `${asset.public_id}.${asset.format}`;
  }
  /**
   * Get url from `derived` property if it exists. This property contains the
   * transformed version of image if transformations have been applied.
   */


  const urlObject = asset.derived && use_transformations ? asset.derived[0] : asset;
  /**
   * Retrieve the `https` variant of the image url if the `useSecureUrl` option
   * is set to `true` (this is the default setting).
   */

  const urlKey = use_secure_url ? 'secure_url' : 'url';
  return urlObject[urlKey];
}

async function init() {
  let _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? {} : _ref2$options,
      handleInsert = _ref2.handleInsert;

  /**
   * Configuration is specific to Cloudinary, while options are specific to this
   * integration.
   */
  const _options$config = options.config,
        providedConfig = _options$config === void 0 ? {} : _options$config,
        integrationOptions = _objectWithoutProperties(options, ["config"]);

  const resolvedOptions = _objectSpread({}, defaultOptions, integrationOptions);

  const cloudinaryConfig = _objectSpread({}, defaultConfig, providedConfig, enforcedConfig);

  const cloudinaryBehaviorConfigKeys = ['default_transformations', 'max_files', 'multiple'];
  const cloudinaryBehaviorConfig = (0, _pick2.default)(cloudinaryConfig, cloudinaryBehaviorConfigKeys);
  await (0, _netlifyCmsLibUtil.loadScript)('https://media-library.cloudinary.com/global/all.js');

  const insertHandler = data => {
    const assets = data.assets.map(asset => getAssetUrl(asset, resolvedOptions));
    handleInsert(assets.length > 1 ? assets : assets[0]);
  };

  const mediaLibrary = window.cloudinary.createMediaLibrary(cloudinaryConfig, {
    insertHandler
  });
  return {
    show: function show() {
      let _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$config = _ref3.config,
          instanceConfig = _ref3$config === void 0 ? {} : _ref3$config,
          allowMultiple = _ref3.allowMultiple;

      /**
       * Ensure multiple selection is not available if the field is configured
       * to disallow it.
       */
      if (allowMultiple === false) {
        instanceConfig.multiple = false;
      }

      return mediaLibrary.show(_objectSpread({}, cloudinaryBehaviorConfig, instanceConfig));
    },
    hide: () => mediaLibrary.hide(),
    enableStandalone: () => true
  };
}

const cloudinaryMediaLibrary = {
  name: 'cloudinary',
  init
};
const NetlifyCmsMediaLibraryCloudinary = cloudinaryMediaLibrary;
exports.NetlifyCmsMediaLibraryCloudinary = NetlifyCmsMediaLibraryCloudinary;
var _default = cloudinaryMediaLibrary;
exports.default = _default;