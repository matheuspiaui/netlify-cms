"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsMediaLibraryUploadcare = void 0;

var _uploadcareWidget = _interopRequireDefault(require("uploadcare-widget"));

var _uploadcareWidgetTabEffects = _interopRequireDefault(require("uploadcare-widget-tab-effects"));

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

window.UPLOADCARE_LIVE = false;
window.UPLOADCARE_MANUAL_START = true;
const USER_AGENT = 'NetlifyCMS-Uploadcare-MediaLibrary';
const CDN_BASE_URL = 'https://ucarecdn.com';
/**
 * Default Uploadcare widget configuration, can be overriden via config.yml.
 */

const defaultConfig = {
  previewStep: true,
  integration: USER_AGENT
};
/**
 * Determine whether an array of urls represents an unaltered set of Uploadcare
 * group urls. If they've been changed or any are missing, a new group will need
 * to be created to represent the current values.
 */

function isFileGroup(files) {
  const basePatternString = `~${files.length}/nth/`;

  const mapExpression = (val, idx) => new RegExp(`${basePatternString}${idx}/$`);

  const expressions = Array.from({
    length: files.length
  }, mapExpression);
  return expressions.every(exp => files.some(url => exp.test(url)));
}
/**
 * Returns a fileGroupInfo object wrapped in a promise-like object.
 */


function getFileGroup(files) {
  /**
   * Capture the group id from the first file in the files array.
   */
  const groupId = new RegExp(`^.+/([^/]+~${files.length})/nth/`).exec(files[0])[1];
  /**
   * The `openDialog` method handles the jQuery promise object returned by
   * `fileFrom`, but requires the promise returned by `loadFileGroup` to provide
   * the result of it's `done` method.
   */

  return new Promise(resolve => _uploadcareWidget.default.loadFileGroup(groupId).done(group => resolve(group)));
}
/**
 * Convert a url or array/List of urls to Uploadcare file objects wrapped in
 * promises, or Uploadcare groups when possible. Output is wrapped in a promise
 * because the value we're returning may be a promise that we created.
 */


function getFiles(value) {
  if (Array.isArray(value) || _immutable.Iterable.isIterable(value)) {
    const arr = Array.isArray(value) ? value : value.toJS();
    return isFileGroup(arr) ? getFileGroup(arr) : Promise.all(arr.map(val => getFile(val)));
  }

  return value && typeof value === 'string' ? getFile(value) : null;
}
/**
 * Convert a single url to an Uploadcare file object wrapped in a promise-like
 * object. Group urls that get passed here were not a part of a complete and
 * untouched group, so they'll be uploaded as new images (only way to do it).
 */


function getFile(url) {
  const groupPattern = /~\d+\/nth\/\d+\//;
  const uploaded = url.startsWith(CDN_BASE_URL) && !groupPattern.test(url);
  return _uploadcareWidget.default.fileFrom(uploaded ? 'uploaded' : 'url', url);
}
/**
 * Open the standalone dialog. A single instance is created and destroyed for
 * each use.
 */


function openDialog(files, config, handleInsert) {
  _uploadcareWidget.default.openDialog(files, config).done((_ref) => {
    let promise = _ref.promise;
    return promise().then((_ref2) => {
      let cdnUrl = _ref2.cdnUrl,
          count = _ref2.count;

      if (config.multiple) {
        const urls = Array.from({
          length: count
        }, (val, idx) => `${cdnUrl}nth/${idx}/`);
        handleInsert(urls);
      } else {
        handleInsert(cdnUrl);
      }
    });
  });
}
/**
 * Initialization function will only run once, returns an API object for Netlify
 * CMS to call methods on.
 */


async function init() {
  let _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$options = _ref3.options,
      options = _ref3$options === void 0 ? {
    config: {}
  } : _ref3$options,
      handleInsert = _ref3.handleInsert;

  const _options$config = options.config,
        publicKey = _options$config.publicKey,
        globalConfig = _objectWithoutProperties(_options$config, ["publicKey"]);

  const baseConfig = _objectSpread({}, defaultConfig, globalConfig);

  window.UPLOADCARE_PUBLIC_KEY = publicKey;
  /**
   * Register the effects tab by default because the effects tab is awesome. Can
   * be disabled via config.
   */

  _uploadcareWidget.default.registerTab('preview', _uploadcareWidgetTabEffects.default);

  return {
    /**
     * On show, create a new widget, cache it in the widgets object, and open.
     * No hide method is provided because the widget doesn't provide it.
     */
    show: function show() {
      let _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          value = _ref4.value,
          _ref4$config = _ref4.config,
          instanceConfig = _ref4$config === void 0 ? {} : _ref4$config,
          allowMultiple = _ref4.allowMultiple,
          _ref4$imagesOnly = _ref4.imagesOnly,
          imagesOnly = _ref4$imagesOnly === void 0 ? false : _ref4$imagesOnly;

      const config = _objectSpread({}, baseConfig, {
        imagesOnly
      }, instanceConfig);

      const multiple = allowMultiple === false ? false : !!config.multiple;

      const resolvedConfig = _objectSpread({}, config, {
        multiple
      });

      const files = getFiles(value);
      /**
       * Resolve the promise only if it's ours. Only the jQuery promise objects
       * from the Uploadcare library will have a `state` method.
       */

      if (files && !files.state) {
        return files.then(result => openDialog(result, resolvedConfig, handleInsert));
      } else {
        return openDialog(files, resolvedConfig, handleInsert);
      }
    },

    /**
     * Uploadcare doesn't provide a "media library" widget for viewing and
     * selecting existing files, so we return `false` here so Netlify CMS only
     * opens the Uploadcare widget when called from an editor control. This
     * results in the "Media" button in the global nav being hidden.
     */
    enableStandalone: () => false
  };
}
/**
 * The object that will be registered only needs a (default) name and `init`
 * method. The `init` method returns the API object.
 */


const uploadcareMediaLibrary = {
  name: 'uploadcare',
  init
};
const NetlifyCmsMediaLibraryUploadcare = uploadcareMediaLibrary;
exports.NetlifyCmsMediaLibraryUploadcare = NetlifyCmsMediaLibraryUploadcare;
var _default = uploadcareMediaLibrary;
exports.default = _default;