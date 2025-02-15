"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reactRouterRedux = require("react-router-redux");

var _history = _interopRequireDefault(require("./routing/history"));

var _redux = _interopRequireDefault(require("./redux"));

var _config = require("./actions/config");

var _defaultPhrases = require("./constants/defaultPhrases");

var _reactPolyglot = require("react-polyglot");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _UI = require("./components/UI");

var _App = _interopRequireDefault(require("./components/App/App"));

require("./components/EditorWidgets");

require("./mediaLibrary");

require("what-input");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ROOT_ID = 'nc-root';

function bootstrap() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const config = opts.config;
  /**
   * Log the version number.
   */

  if (typeof "2.11.1-beta.1" === 'string') {
    console.log(`netlify-cms-core ${"2.11.1-beta.1"}`);
  }
  /**
   * Get DOM element where app will mount.
   */


  function getRoot() {
    /**
     * Return existing root if found.
     */
    const existingRoot = document.getElementById(ROOT_ID);

    if (existingRoot) {
      return existingRoot;
    }
    /**
     * If no existing root, create and return a new root.
     */


    const newRoot = document.createElement('div');
    newRoot.id = ROOT_ID;
    document.body.appendChild(newRoot);
    return newRoot;
  }
  /**
   * Dispatch config to store if received. This config will be merged into
   * config.yml if it exists, and any portion that produces a conflict will be
   * overwritten.
   */


  if (config) {
    _redux.default.dispatch((0, _config.mergeConfig)(config));
  }
  /**
   * Create connected root component.
   */


  const Root = () => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_netlifyCmsUiDefault.GlobalStyles, null), _react.default.createElement(_reactPolyglot.I18n, {
    locale: 'en',
    messages: (0, _defaultPhrases.getPhrases)()
  }, _react.default.createElement(_UI.ErrorBoundary, {
    showBackup: true
  }, _react.default.createElement(_reactRedux.Provider, {
    store: _redux.default
  }, _react.default.createElement(_reactRouterRedux.ConnectedRouter, {
    history: _history.default
  }, _react.default.createElement(_reactRouterDom.Route, {
    component: _App.default
  }))))));
  /**
   * Render application root.
   */


  (0, _reactDom.render)(_react.default.createElement(Root, null), getRoot());
}

var _default = bootstrap;
exports.default = _default;