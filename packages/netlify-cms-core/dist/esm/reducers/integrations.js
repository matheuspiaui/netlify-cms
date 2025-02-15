"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectIntegration = void 0;

var _immutable = require("immutable");

var _config = require("../actions/config");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const integrations = function integrations() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _config.CONFIG_SUCCESS:
      {
        const integrations = action.payload.get('integrations', (0, _immutable.List)()).toJS() || [];
        const newState = integrations.reduce((acc, integration) => {
          const hooks = integration.hooks,
                collections = integration.collections,
                provider = integration.provider,
                providerData = _objectWithoutProperties(integration, ["hooks", "collections", "provider"]);

          acc.providers[provider] = _objectSpread({}, providerData);

          if (!collections) {
            hooks.forEach(hook => {
              acc.hooks[hook] = provider;
            });
            return acc;
          }

          const integrationCollections = collections === '*' ? action.payload.collections.map(collection => collection.name) : collections;
          integrationCollections.forEach(collection => {
            hooks.forEach(hook => {
              acc.hooks[collection] ? acc.hooks[collection][hook] = provider : acc.hooks[collection] = {
                [hook]: provider
              };
            });
          });
          return acc;
        }, {
          providers: {},
          hooks: {}
        });
        return (0, _immutable.fromJS)(newState);
      }

    default:
      return state;
  }
};

const selectIntegration = (state, collection, hook) => collection ? state.getIn(['hooks', collection, hook], false) : state.getIn(['hooks', hook], false);

exports.selectIntegration = selectIntegration;
var _default = integrations;
exports.default = _default;