"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectInferedField = exports.selectIdentifier = exports.selectTemplateName = exports.selectAllowDeletion = exports.selectAllowNewEntries = exports.selectListMethod = exports.selectEntrySlug = exports.selectEntryPath = exports.selectFolderEntryExtension = exports.selectFields = void 0;

var _escapeRegExp2 = _interopRequireDefault(require("lodash/escapeRegExp"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _immutable = require("immutable");

var _consoleError = _interopRequireDefault(require("../lib/consoleError"));

var _config = require("../actions/config");

var _collectionTypes = require("../constants/collectionTypes");

var _fieldInference = require("../constants/fieldInference");

var _formats = require("../formats/formats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const collections = function collections() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _config.CONFIG_SUCCESS:
      {
        const configCollections = action.payload ? action.payload.get('collections') : (0, _immutable.List)();
        return configCollections.toOrderedMap().map(collection => {
          if (collection.has('folder')) {
            return collection.set('type', _collectionTypes.FOLDER);
          }

          if (collection.has('files')) {
            return collection.set('type', _collectionTypes.FILES);
          }
        }).mapKeys((key, collection) => collection.get('name'));
      }

    default:
      return state;
  }
};

const selectors = {
  [_collectionTypes.FOLDER]: {
    entryExtension(collection) {
      return (collection.get('extension') || (0, _get2.default)(_formats.formatExtensions, collection.get('format') || 'frontmatter')).replace(/^\./, '');
    },

    fields(collection) {
      return collection.get('fields');
    },

    entryPath(collection, slug) {
      return `${collection.get('folder').replace(/\/$/, '')}/${slug}.${this.entryExtension(collection)}`;
    },

    entrySlug(collection, path) {
      return path.split('/').pop().replace(new RegExp(`\\.${(0, _escapeRegExp2.default)(this.entryExtension(collection))}$`), '');
    },

    listMethod() {
      return 'entriesByFolder';
    },

    allowNewEntries(collection) {
      return collection.get('create');
    },

    allowDeletion(collection) {
      return collection.get('delete', true);
    },

    templateName(collection) {
      return collection.get('name');
    }

  },
  [_collectionTypes.FILES]: {
    fileForEntry(collection, slug) {
      const files = collection.get('files');
      return files.filter(f => f.get('name') === slug).get(0);
    },

    fields(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('fields');
    },

    entryPath(collection, slug) {
      const file = this.fileForEntry(collection, slug);
      return file && file.get('file');
    },

    entrySlug(collection, path) {
      const file = collection.get('files').filter(f => f.get('file') === path).get(0);
      return file && file.get('name');
    },

    listMethod() {
      return 'entriesByFiles';
    },

    allowNewEntries() {
      return false;
    },

    allowDeletion(collection) {
      return collection.get('delete', true);
    },

    templateName(collection, slug) {
      return slug;
    }

  }
};

const selectFields = (collection, slug) => selectors[collection.get('type')].fields(collection, slug);

exports.selectFields = selectFields;

const selectFolderEntryExtension = collection => selectors[_collectionTypes.FOLDER].entryExtension(collection);

exports.selectFolderEntryExtension = selectFolderEntryExtension;

const selectEntryPath = (collection, slug) => selectors[collection.get('type')].entryPath(collection, slug);

exports.selectEntryPath = selectEntryPath;

const selectEntrySlug = (collection, path) => selectors[collection.get('type')].entrySlug(collection, path);

exports.selectEntrySlug = selectEntrySlug;

const selectListMethod = collection => selectors[collection.get('type')].listMethod();

exports.selectListMethod = selectListMethod;

const selectAllowNewEntries = collection => selectors[collection.get('type')].allowNewEntries(collection);

exports.selectAllowNewEntries = selectAllowNewEntries;

const selectAllowDeletion = collection => selectors[collection.get('type')].allowDeletion(collection);

exports.selectAllowDeletion = selectAllowDeletion;

const selectTemplateName = (collection, slug) => selectors[collection.get('type')].templateName(collection, slug);

exports.selectTemplateName = selectTemplateName;

const selectIdentifier = collection => {
  const identifier = collection.get('identifier_field');
  const identifierFields = identifier ? [identifier, ..._fieldInference.IDENTIFIER_FIELDS] : _fieldInference.IDENTIFIER_FIELDS;
  const fieldNames = collection.get('fields', []).map(field => field.get('name'));
  return identifierFields.find(id => fieldNames.find(name => name.toLowerCase().trim() === id.toLowerCase().trim()));
};

exports.selectIdentifier = selectIdentifier;

const selectInferedField = (collection, fieldName) => {
  if (fieldName === 'title' && collection.get('identifier_field')) {
    return selectIdentifier(collection);
  }

  const inferableField = _fieldInference.INFERABLE_FIELDS[fieldName];
  const fields = collection.get('fields');
  let field; // If collection has no fields or fieldName is not defined within inferables list, return null

  if (!fields || !inferableField) return null; // Try to return a field of the specified type with one of the synonyms

  const mainTypeFields = fields.filter(f => f.get('widget', 'string') === inferableField.type).map(f => f.get('name'));
  field = mainTypeFields.filter(f => inferableField.synonyms.indexOf(f) !== -1);
  if (field && field.size > 0) return field.first(); // Try to return a field for each of the specified secondary types

  const secondaryTypeFields = fields.filter(f => inferableField.secondaryTypes.indexOf(f.get('widget', 'string')) !== -1).map(f => f.get('name'));
  field = secondaryTypeFields.filter(f => inferableField.synonyms.indexOf(f) !== -1);
  if (field && field.size > 0) return field.first(); // Try to return the first field of the specified type

  if (inferableField.fallbackToFirstField && mainTypeFields.size > 0) return mainTypeFields.first(); // Coundn't infer the field. Show error and return null.

  if (inferableField.showError) {
    (0, _consoleError.default)(`The Field ${fieldName} is missing for the collection “${collection.get('name')}”`, `Netlify CMS tries to infer the entry ${fieldName} automatically, but one couldn't be found for entries of the collection “${collection.get('name')}”. Please check your site configuration.`);
  }

  return null;
};

exports.selectInferedField = selectInferedField;
var _default = collections;
exports.default = _default;