"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPreviewStyle = registerPreviewStyle;
exports.getPreviewStyles = getPreviewStyles;
exports.registerPreviewTemplate = registerPreviewTemplate;
exports.getPreviewTemplate = getPreviewTemplate;
exports.registerWidget = registerWidget;
exports.getWidget = getWidget;
exports.resolveWidget = resolveWidget;
exports.registerEditorComponent = registerEditorComponent;
exports.getEditorComponents = getEditorComponents;
exports.registerWidgetValueSerializer = registerWidgetValueSerializer;
exports.getWidgetValueSerializer = getWidgetValueSerializer;
exports.registerBackend = registerBackend;
exports.getBackend = getBackend;
exports.registerMediaLibrary = registerMediaLibrary;
exports.getMediaLibrary = getMediaLibrary;
exports.default = void 0;

var _immutable = require("immutable");

var _commonTags = require("common-tags");

var _EditorComponent = _interopRequireDefault(require("../valueObjects/EditorComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Global Registry Object
 */
const registry = {
  backends: {},
  templates: {},
  previewStyles: [],
  widgets: {},
  editorComponents: (0, _immutable.Map)(),
  widgetValueSerializers: {},
  mediaLibraries: []
};
var _default = {
  registerPreviewStyle,
  getPreviewStyles,
  registerPreviewTemplate,
  getPreviewTemplate,
  registerWidget,
  getWidget,
  resolveWidget,
  registerEditorComponent,
  getEditorComponents,
  registerWidgetValueSerializer,
  getWidgetValueSerializer,
  registerBackend,
  getBackend,
  registerMediaLibrary,
  getMediaLibrary
};
/**
 * Preview Styles
 *
 * Valid options:
 *  - raw {boolean} if `true`, `style` value is expected to be a CSS string
 */

exports.default = _default;

function registerPreviewStyle(style, opts) {
  registry.previewStyles.push(_objectSpread({}, opts, {
    value: style
  }));
}

function getPreviewStyles() {
  return registry.previewStyles;
}
/**
 * Preview Templates
 */


function registerPreviewTemplate(name, component) {
  registry.templates[name] = component;
}

function getPreviewTemplate(name) {
  return registry.templates[name];
}
/**
 * Editor Widgets
 */


function registerWidget(name, control, preview) {
  if (Array.isArray(name)) {
    name.forEach(widget => {
      if (typeof widget !== 'object') {
        console.error(`Cannot register widget: ${widget}`);
      } else {
        registerWidget(widget);
      }
    });
  } else if (typeof name === 'string') {
    // A registered widget control can be reused by a new widget, allowing
    // multiple copies with different previews.
    const newControl = typeof control === 'string' ? registry.widgets[control].control : control;
    registry.widgets[name] = {
      control: newControl,
      preview
    };
  } else if (typeof name === 'object') {
    const widgetName = name.name,
          control = name.controlComponent,
          preview = name.previewComponent,
          globalStyles = name.globalStyles;

    if (registry.widgets[widgetName]) {
      console.error(_commonTags.oneLine`
        Multiple widgets registered with name "${widgetName}". Only the last widget registered with
        this name will be used.
      `);
    }

    if (!control) {
      throw Error(`Widget "${widgetName}" registered without \`controlComponent\`.`);
    }

    registry.widgets[widgetName] = {
      control,
      preview,
      globalStyles
    };
  } else {
    console.error('`registerWidget` failed, called with incorrect arguments.');
  }
}

function getWidget(name) {
  return registry.widgets[name];
}

function resolveWidget(name) {
  return getWidget(name || 'string') || getWidget('unknown');
}
/**
 * Markdown Editor Custom Components
 */


function registerEditorComponent(component) {
  const plugin = (0, _EditorComponent.default)(component);
  registry.editorComponents = registry.editorComponents.set(plugin.get('id'), plugin);
}

function getEditorComponents() {
  return registry.editorComponents;
}
/**
 * Widget Serializers
 */


function registerWidgetValueSerializer(widgetName, serializer) {
  registry.widgetValueSerializers[widgetName] = serializer;
}

function getWidgetValueSerializer(widgetName) {
  return registry.widgetValueSerializers[widgetName];
}
/**
 * Backend API
 */


function registerBackend(name, BackendClass) {
  if (!name || !BackendClass) {
    console.error("Backend parameters invalid. example: CMS.registerBackend('myBackend', BackendClass)");
  } else if (registry.backends[name]) {
    console.error(`Backend [${name}] already registered. Please choose a different name.`);
  } else {
    registry.backends[name] = {
      init: function init() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return new BackendClass(...args);
      }
    };
  }
}

function getBackend(name) {
  return registry.backends[name];
}
/**
 * Media Libraries
 */


function registerMediaLibrary(mediaLibrary, options) {
  if (registry.mediaLibraries.find(ml => mediaLibrary.name === ml.name)) {
    throw new Error(`A media library named ${mediaLibrary.name} has already been registered.`);
  }

  registry.mediaLibraries.push(_objectSpread({}, mediaLibrary, {
    options
  }));
}

function getMediaLibrary(name) {
  return registry.mediaLibraries.find(ml => ml.name === name);
}