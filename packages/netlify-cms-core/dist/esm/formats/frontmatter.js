"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frontmatterJSON = exports.frontmatterTOML = exports.frontmatterYAML = exports.FrontmatterInfer = exports.getFormatOpts = void 0;

var _grayMatter = _interopRequireDefault(require("gray-matter"));

var _toml = _interopRequireDefault(require("./toml"));

var _yaml = _interopRequireDefault(require("./yaml"));

var _json = _interopRequireDefault(require("./json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const parsers = {
  toml: {
    parse: input => _toml.default.fromFile(input),
    stringify: (metadata, _ref) => {
      let sortedKeys = _ref.sortedKeys;
      return _toml.default.toFile(metadata, sortedKeys);
    }
  },
  json: {
    parse: input => {
      let JSONinput = input.trim(); // Fix JSON if leading and trailing brackets were trimmed.

      if (JSONinput.substr(0, 1) !== '{') {
        JSONinput = '{' + JSONinput;
      }

      if (JSONinput.substr(-1) !== '}') {
        JSONinput = JSONinput + '}';
      }

      return _json.default.fromFile(JSONinput);
    },
    stringify: (metadata, _ref2) => {
      let sortedKeys = _ref2.sortedKeys;

      let JSONoutput = _json.default.toFile(metadata, sortedKeys).trim(); // Trim leading and trailing brackets.


      if (JSONoutput.substr(0, 1) === '{' && JSONoutput.substr(-1) === '}') {
        JSONoutput = JSONoutput.substring(1, JSONoutput.length - 1);
      }

      return JSONoutput;
    }
  },
  yaml: {
    parse: input => _yaml.default.fromFile(input),
    stringify: (metadata, _ref3) => {
      let sortedKeys = _ref3.sortedKeys;
      return _yaml.default.toFile(metadata, sortedKeys);
    }
  }
};

function inferFrontmatterFormat(str) {
  const firstLine = str.substr(0, str.indexOf('\n')).trim();

  if (firstLine.length > 3 && firstLine.substr(0, 3) === '---') {
    // No need to infer, `gray-matter` will handle things like `---toml` for us.
    return;
  }

  switch (firstLine) {
    case '---':
      return getFormatOpts('yaml');

    case '+++':
      return getFormatOpts('toml');

    case '{':
      return getFormatOpts('json');

    default:
      console.warn('Unrecognized front-matter format.');
  }
}

const getFormatOpts = format => ({
  yaml: {
    language: 'yaml',
    delimiters: '---'
  },
  toml: {
    language: 'toml',
    delimiters: '+++'
  },
  json: {
    language: 'json',
    delimiters: ['{', '}']
  }
})[format];

exports.getFormatOpts = getFormatOpts;

class FrontmatterFormatter {
  constructor(format, customDelimiter) {
    this.format = getFormatOpts(format);
    this.customDelimiter = customDelimiter;
  }

  fromFile(content) {
    const format = this.format || inferFrontmatterFormat(content);
    if (this.customDelimiter) this.format.delimiters = this.customDelimiter;
    const result = (0, _grayMatter.default)(content, _objectSpread({
      engines: parsers
    }, format));
    return _objectSpread({}, result.data, {
      body: result.content
    });
  }

  toFile(data, sortedKeys) {
    const _data$body = data.body,
          body = _data$body === void 0 ? '' : _data$body,
          meta = _objectWithoutProperties(data, ["body"]); // Stringify to YAML if the format was not set


    const format = this.format || getFormatOpts('yaml');
    if (this.customDelimiter) this.format.delimiters = this.customDelimiter; // `sortedKeys` is not recognized by gray-matter, so it gets passed through to the parser

    return _grayMatter.default.stringify(body, meta, _objectSpread({
      engines: parsers,
      sortedKeys
    }, format));
  }

}

const FrontmatterInfer = new FrontmatterFormatter();
exports.FrontmatterInfer = FrontmatterInfer;

const frontmatterYAML = customDelimiter => new FrontmatterFormatter('yaml', customDelimiter);

exports.frontmatterYAML = frontmatterYAML;

const frontmatterTOML = customDelimiter => new FrontmatterFormatter('toml', customDelimiter);

exports.frontmatterTOML = frontmatterTOML;

const frontmatterJSON = customDelimiter => new FrontmatterFormatter('json', customDelimiter);

exports.frontmatterJSON = frontmatterJSON;