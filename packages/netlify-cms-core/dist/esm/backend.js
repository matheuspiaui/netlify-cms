"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveBackend = resolveBackend;
exports.currentBackend = void 0;

var _uniq2 = _interopRequireDefault(require("lodash/uniq"));

var _partialRight2 = _interopRequireDefault(require("lodash/partialRight"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _trimEnd2 = _interopRequireDefault(require("lodash/trimEnd"));

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _isError2 = _interopRequireDefault(require("lodash/isError"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _attempt2 = _interopRequireDefault(require("lodash/attempt"));

var _immutable = require("immutable");

var _commonTags = require("common-tags");

var _fuzzy = _interopRequireDefault(require("fuzzy"));

var _formats = require("./formats/formats");

var _integrations = require("./reducers/integrations");

var _collections = require("./reducers/collections");

var _Entry = require("./valueObjects/Entry");

var _urlHelper = require("./lib/urlHelper");

var _registry = require("./lib/registry");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _publishModes = require("./constants/publishModes");

var _stringTemplate = require("./lib/stringTemplate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LocalStorageAuthStore {
  constructor() {
    _defineProperty(this, "storageKey", 'netlify-cms-user');
  }

  retrieve() {
    const data = window.localStorage.getItem(this.storageKey);
    return data && JSON.parse(data);
  }

  store(userData) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  logout() {
    window.localStorage.removeItem(this.storageKey);
  }

}

function prepareSlug(slug) {
  return slug.trim() // Convert slug to lower-case
  .toLocaleLowerCase() // Remove single quotes.
  .replace(/[']/g, '') // Replace periods with dashes.
  .replace(/[.]/g, '-');
}

function getEntryBackupKey(collectionName, slug) {
  const baseKey = 'backup';

  if (!collectionName) {
    return baseKey;
  }

  const suffix = slug ? `.${slug}` : '';
  return `${baseKey}.${collectionName}${suffix}`;
}

function getLabelForFileCollectionEntry(collection, path) {
  const files = collection.get('files');
  return files && files.find(f => f.get('file') === path).get('label');
}

function slugFormatter(collection, entryData, slugConfig) {
  const template = collection.get('slug') || '{{slug}}';
  const identifier = entryData.get((0, _collections.selectIdentifier)(collection));

  if (!identifier) {
    throw new Error('Collection must have a field name that is a valid entry identifier, or must have `identifier_field` set');
  } // Pass entire slug through `prepareSlug` and `sanitizeSlug`.
  // TODO: only pass slug replacements through sanitizers, static portions of
  // the slug template should not be sanitized. (breaking change)


  const processSlug = (0, _flow2.default)([_stringTemplate.compileStringTemplate, prepareSlug, (0, _partialRight2.default)(_urlHelper.sanitizeSlug, slugConfig)]);
  return processSlug(template, new Date(), identifier, entryData);
}

const commitMessageTemplates = (0, _immutable.Map)({
  create: 'Create {{collection}} “{{slug}}”',
  update: 'Update {{collection}} “{{slug}}”',
  delete: 'Delete {{collection}} “{{slug}}”',
  uploadMedia: 'Upload “{{path}}”',
  deleteMedia: 'Delete “{{path}}”'
});

const commitMessageFormatter = (type, config, _ref) => {
  let slug = _ref.slug,
      path = _ref.path,
      collection = _ref.collection;
  const templates = commitMessageTemplates.merge(config.getIn(['backend', 'commit_messages'], (0, _immutable.Map)()));
  const messageTemplate = templates.get(type);
  return messageTemplate.replace(/\{\{([^}]+)\}\}/g, (_, variable) => {
    switch (variable) {
      case 'slug':
        return slug;

      case 'path':
        return path;

      case 'collection':
        return collection.get('label_singular') || collection.get('label');

      default:
        console.warn(`Ignoring unknown variable “${variable}” in commit message template.`);
        return '';
    }
  });
};

const extractSearchFields = searchFields => entry => searchFields.reduce((acc, field) => {
  const f = entry.data[field];
  return f ? `${acc} ${f}` : acc;
}, '');

const sortByScore = (a, b) => {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0;
};

function createPreviewUrl(baseUrl, collection, slug, slugConfig, entry) {
  /**
   * Preview URL can't be created without `baseUrl`. This makes preview URLs
   * optional for backends that don't support them.
   */
  if (!baseUrl) {
    return;
  }
  /**
   * Without a `previewPath` for the collection (via config), the preview URL
   * will be the URL provided by the backend.
   */


  if (!collection.get('preview_path')) {
    return baseUrl;
  }
  /**
   * If a `previewPath` is provided for the collection, use it to construct the
   * URL path.
   */


  const basePath = (0, _trimEnd2.default)(baseUrl, '/');
  const pathTemplate = collection.get('preview_path');
  const fields = entry.get('data');
  const date = (0, _stringTemplate.parseDateFromEntry)(entry, collection, collection.get('preview_path_date_field')); // Prepare and sanitize slug variables only, leave the rest of the
  // `preview_path` template as is.

  const processSegment = (0, _flow2.default)([value => String(value), prepareSlug, (0, _partialRight2.default)(_urlHelper.sanitizeSlug, slugConfig)]);
  let compiledPath;

  try {
    compiledPath = (0, _stringTemplate.compileStringTemplate)(pathTemplate, date, slug, fields, processSegment);
  } catch (err) {
    // Print an error and ignore `preview_path` if both:
    //   1. Date is invalid (according to Moment), and
    //   2. A date expression (eg. `{{year}}`) is used in `preview_path`
    if (err.name === _stringTemplate.SLUG_MISSING_REQUIRED_DATE) {
      console.error(_commonTags.stripIndent`
        Collection "${collection.get('name')}" configuration error:
          \`preview_path_date_field\` must be a field with a valid date. Ignoring \`preview_path\`.
      `);
      return basePath;
    }

    throw err;
  }

  const previewPath = (0, _trimStart2.default)(compiledPath, ' /');
  return `${basePath}/${previewPath}`;
}

class Backend {
  constructor(implementation) {
    let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        backendName = _ref2.backendName,
        _ref2$authStore = _ref2.authStore,
        authStore = _ref2$authStore === void 0 ? null : _ref2$authStore,
        config = _ref2.config;

    _defineProperty(this, "updateUserCredentials", updatedCredentials => {
      const storedUser = this.authStore && this.authStore.retrieve();

      if (storedUser && storedUser.backendName === this.backendName) {
        const newUser = _objectSpread({}, storedUser, updatedCredentials);

        this.authStore.store(newUser);
        return newUser;
      }
    });

    _defineProperty(this, "getToken", () => this.implementation.getToken());

    // We can't reliably run this on exit, so we do cleanup on load.
    this.deleteAnonymousBackup();
    this.config = config;
    this.implementation = implementation.init(config, {
      useWorkflow: config.getIn(['publish_mode']) === _publishModes.EDITORIAL_WORKFLOW,
      updateUserCredentials: this.updateUserCredentials,
      initialWorkflowStatus: _publishModes.status.first()
    });
    this.backendName = backendName;
    this.authStore = authStore;

    if (this.implementation === null) {
      throw new Error('Cannot instantiate a Backend with no implementation');
    }
  }

  currentUser() {
    if (this.user) {
      return this.user;
    }

    const stored = this.authStore && this.authStore.retrieve();

    if (stored && stored.backendName === this.backendName) {
      return Promise.resolve(this.implementation.restoreUser(stored)).then(user => {
        const newUser = _objectSpread({}, user, {
          backendName: this.backendName
        }); // return confirmed/rehydrated user object instead of stored


        this.authStore.store(newUser);
        return newUser;
      });
    }

    return Promise.resolve(null);
  }

  authComponent() {
    return this.implementation.authComponent();
  }

  authenticate(credentials) {
    return this.implementation.authenticate(credentials).then(user => {
      const newUser = _objectSpread({}, user, {
        backendName: this.backendName
      });

      if (this.authStore) {
        this.authStore.store(newUser);
      }

      return newUser;
    });
  }

  logout() {
    return Promise.resolve(this.implementation.logout()).then(() => {
      if (this.authStore) {
        this.authStore.logout();
      }
    });
  }

  async entryExist(collection, path, slug) {
    const unpublishedEntry = this.implementation.unpublishedEntry && (await this.implementation.unpublishedEntry(collection, slug).catch(error => {
      if (error instanceof _netlifyCmsLibUtil.EditorialWorkflowError && error.notUnderEditorialWorkflow) {
        return Promise.resolve(false);
      }

      return Promise.reject(error);
    }));
    if (unpublishedEntry) return unpublishedEntry;
    const publishedEntry = await this.implementation.getEntry(collection, slug, path).then((_ref3) => {
      let data = _ref3.data;
      return data;
    }).catch(error => {
      if (error.status === 404 || error.message.includes(404)) {
        return Promise.resolve(false);
      }

      return Promise.reject(error);
    });
    return publishedEntry;
  }

  async generateUniqueSlug(collection, entryData, slugConfig, usedSlugs) {
    const slug = slugFormatter(collection, entryData, slugConfig);
    const sanitizeEntrySlug = (0, _partialRight2.default)(_urlHelper.sanitizeSlug, slugConfig);
    let i = 1;
    let sanitizedSlug = slug;
    let uniqueSlug = sanitizedSlug; // Check for duplicate slug in loaded entities store first before repo

    while (usedSlugs.includes(uniqueSlug) || (await this.entryExist(collection, (0, _collections.selectEntryPath)(collection, uniqueSlug), uniqueSlug))) {
      uniqueSlug = sanitizeEntrySlug(`${sanitizedSlug} ${i++}`);
    }

    return uniqueSlug;
  }

  processEntries(loadedEntries, collection) {
    const collectionFilter = collection.get('filter');
    const entries = loadedEntries.map(loadedEntry => (0, _Entry.createEntry)(collection.get('name'), (0, _collections.selectEntrySlug)(collection, loadedEntry.file.path), loadedEntry.file.path, {
      raw: loadedEntry.data || '',
      label: loadedEntry.file.label
    }));
    const formattedEntries = entries.map(this.entryWithFormat(collection)); // If this collection has a "filter" property, filter entries accordingly

    const filteredEntries = collectionFilter ? this.filterEntries({
      entries: formattedEntries
    }, collectionFilter) : formattedEntries;
    return filteredEntries;
  }

  listEntries(collection) {
    const listMethod = this.implementation[(0, _collections.selectListMethod)(collection)];
    const extension = (0, _collections.selectFolderEntryExtension)(collection);
    return listMethod.call(this.implementation, collection, extension).then(loadedEntries => ({
      entries: this.processEntries(loadedEntries, collection),

      /*
          Wrap cursors so we can tell which collection the cursor is
          from. This is done to prevent traverseCursor from requiring a
          `collection` argument.
        */
      cursor: _netlifyCmsLibUtil.Cursor.create(loadedEntries[_netlifyCmsLibUtil.CURSOR_COMPATIBILITY_SYMBOL]).wrapData({
        cursorType: 'collectionEntries',
        collection
      })
    }));
  } // The same as listEntries, except that if a cursor with the "next"
  // action available is returned, it calls "next" on the cursor and
  // repeats the process. Once there is no available "next" action, it
  // returns all the collected entries. Used to retrieve all entries
  // for local searches and queries.


  async listAllEntries(collection) {
    if (collection.get('folder') && this.implementation.allEntriesByFolder) {
      const extension = (0, _collections.selectFolderEntryExtension)(collection);
      return this.implementation.allEntriesByFolder(collection, extension).then(entries => this.processEntries(entries, collection));
    }

    const response = await this.listEntries(collection);
    const entries = response.entries;
    let cursor = response.cursor;

    while (cursor && cursor.actions.includes('next')) {
      const _ref4 = await this.traverseCursor(cursor, 'next'),
            newEntries = _ref4.entries,
            newCursor = _ref4.cursor;

      entries.push(...newEntries);
      cursor = newCursor;
    }

    return entries;
  }

  async search(collections, searchTerm) {
    // Perform a local search by requesting all entries. For each
    // collection, load it, search, and call onCollectionResults with
    // its results.
    const errors = [];
    const collectionEntriesRequests = collections.map(async collection => {
      const summary = collection.get('summary', '');
      const summaryFields = (0, _stringTemplate.extractTemplateVars)(summary); // TODO: pass search fields in as an argument

      const searchFields = [(0, _collections.selectInferedField)(collection, 'title'), (0, _collections.selectInferedField)(collection, 'shortTitle'), (0, _collections.selectInferedField)(collection, 'author'), ...summaryFields.map(elem => {
        if (_stringTemplate.dateParsers[elem]) {
          return (0, _collections.selectInferedField)(collection, 'date');
        }

        return elem;
      })];
      const collectionEntries = await this.listAllEntries(collection);
      return _fuzzy.default.filter(searchTerm, collectionEntries, {
        extract: extractSearchFields((0, _uniq2.default)(searchFields))
      });
    }).map(p => p.catch(err => errors.push(err) && []));
    const entries = await Promise.all(collectionEntriesRequests).then(arrs => (0, _flatten2.default)(arrs));

    if (errors.length > 0) {
      throw new Error({
        message: 'Errors ocurred while searching entries locally!',
        errors
      });
    }

    const hits = entries.filter((_ref5) => {
      let score = _ref5.score;
      return score > 5;
    }).sort(sortByScore).map(f => f.original);
    return {
      entries: hits
    };
  }

  async query(collection, searchFields, searchTerm) {
    const entries = await this.listAllEntries(collection);

    const hits = _fuzzy.default.filter(searchTerm, entries, {
      extract: extractSearchFields(searchFields)
    }).sort(sortByScore).map(f => f.original);

    return {
      query: searchTerm,
      hits
    };
  }

  traverseCursor(cursor, action) {
    const _cursor$unwrapData = cursor.unwrapData(),
          _cursor$unwrapData2 = _slicedToArray(_cursor$unwrapData, 2),
          data = _cursor$unwrapData2[0],
          unwrappedCursor = _cursor$unwrapData2[1]; // TODO: stop assuming all cursors are for collections


    const collection = data.get('collection');
    return this.implementation.traverseCursor(unwrappedCursor, action).then(async (_ref6) => {
      let entries = _ref6.entries,
          newCursor = _ref6.cursor;
      return {
        entries: this.processEntries(entries, collection),
        cursor: _netlifyCmsLibUtil.Cursor.create(newCursor).wrapData({
          cursorType: 'collectionEntries',
          collection
        })
      };
    });
  }

  async getLocalDraftBackup(collection, slug) {
    const key = getEntryBackupKey(collection.get('name'), slug);
    const backup = await _netlifyCmsLibUtil.localForage.getItem(key);

    if (!backup || !backup.raw.trim()) {
      return;
    }

    const raw = backup.raw,
          path = backup.path;
    const label = getLabelForFileCollectionEntry(collection, path);
    return this.entryWithFormat(collection, slug)((0, _Entry.createEntry)(collection.get('name'), slug, path, {
      raw,
      label
    }));
  }

  async persistLocalDraftBackup(entry, collection) {
    const key = getEntryBackupKey(collection.get('name'), entry.get('slug'));
    const raw = this.entryToRaw(collection, entry);

    if (!raw.trim()) {
      return;
    }

    await _netlifyCmsLibUtil.localForage.setItem(key, {
      raw,
      path: entry.get('path')
    });
    return _netlifyCmsLibUtil.localForage.setItem(getEntryBackupKey(), raw);
  }

  async deleteLocalDraftBackup(collection, slug) {
    const key = getEntryBackupKey(collection.get('name'), slug);
    await _netlifyCmsLibUtil.localForage.removeItem(key);
    return this.deleteAnonymousBackup();
  } // Unnamed backup for use in the global error boundary, should always be
  // deleted on cms load.


  deleteAnonymousBackup() {
    return _netlifyCmsLibUtil.localForage.removeItem(getEntryBackupKey());
  }

  getEntry(collection, slug) {
    const path = (0, _collections.selectEntryPath)(collection, slug);
    const label = getLabelForFileCollectionEntry(collection, path);
    return this.implementation.getEntry(collection, slug, path).then(loadedEntry => this.entryWithFormat(collection, slug)((0, _Entry.createEntry)(collection.get('name'), slug, loadedEntry.file.path, {
      raw: loadedEntry.data,
      label
    })));
  }

  getMedia() {
    return this.implementation.getMedia();
  }

  getMediaDisplayURL(displayURL) {
    if (this.implementation.getMediaDisplayURL) {
      return this.implementation.getMediaDisplayURL(displayURL);
    }

    const err = new Error('getMediaDisplayURL is not implemented by the current backend, but the backend returned a displayURL which was not a string!');
    err.displayURL = displayURL;
    return Promise.reject(err);
  }

  entryWithFormat(collectionOrEntity) {
    return entry => {
      const format = (0, _formats.resolveFormat)(collectionOrEntity, entry);

      if (entry && entry.raw !== undefined) {
        const data = format && (0, _attempt2.default)(format.fromFile.bind(format, entry.raw)) || {};
        if ((0, _isError2.default)(data)) console.error(data);
        return Object.assign(entry, {
          data: (0, _isError2.default)(data) ? {} : data
        });
      }

      return format.fromFile(entry);
    };
  }

  unpublishedEntries(collections) {
    return this.implementation.unpublishedEntries().then(loadedEntries => loadedEntries.filter(entry => entry !== null)).then(entries => entries.map(loadedEntry => {
      const entry = (0, _Entry.createEntry)(loadedEntry.metaData.collection, loadedEntry.slug, loadedEntry.file.path, {
        raw: loadedEntry.data,
        isModification: loadedEntry.isModification
      });
      entry.metaData = loadedEntry.metaData;
      return entry;
    })).then(entries => ({
      pagination: 0,
      entries: entries.reduce((acc, entry) => {
        const collection = collections.get(entry.collection);

        if (collection) {
          acc.push(this.entryWithFormat(collection)(entry));
        }

        return acc;
      }, [])
    }));
  }

  unpublishedEntry(collection, slug) {
    return this.implementation.unpublishedEntry(collection, slug).then(loadedEntry => {
      const entry = (0, _Entry.createEntry)('draft', loadedEntry.slug, loadedEntry.file.path, {
        raw: loadedEntry.data,
        isModification: loadedEntry.isModification
      });
      entry.metaData = loadedEntry.metaData;
      return entry;
    }).then(this.entryWithFormat(collection, slug));
  }
  /**
   * Creates a URL using `site_url` from the config and `preview_path` from the
   * entry's collection. Does not currently make a request through the backend,
   * but likely will in the future.
   */


  getDeploy(collection, slug, entry) {
    /**
     * If `site_url` is undefiend or `show_preview_links` in the config is set to false, do nothing.
     */
    const baseUrl = this.config.get('site_url');

    if (!baseUrl || this.config.get('show_preview_links') === false) {
      return;
    }

    return {
      url: createPreviewUrl(baseUrl, collection, slug, this.config.get('slug'), entry),
      status: 'SUCCESS'
    };
  }
  /**
   * Requests a base URL from the backend for previewing a specific entry.
   * Supports polling via `maxAttempts` and `interval` options, as there is
   * often a delay before a preview URL is available.
   */


  async getDeployPreview(collection, slug, entry) {
    let _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref7$maxAttempts = _ref7.maxAttempts,
        maxAttempts = _ref7$maxAttempts === void 0 ? 1 : _ref7$maxAttempts,
        _ref7$interval = _ref7.interval,
        interval = _ref7$interval === void 0 ? 5000 : _ref7$interval;

    /**
     * If the registered backend does not provide a `getDeployPreview` method, or
     * `show_preview_links` in the config is set to false, do nothing.
     */
    if (!this.implementation.getDeployPreview || this.config.get('show_preview_links') === false) {
      return;
    }
    /**
     * Poll for the deploy preview URL (defaults to 1 attempt, so no polling by
     * default).
     */


    let deployPreview,
        count = 0;

    while (!deployPreview && count < maxAttempts) {
      count++;
      deployPreview = await this.implementation.getDeployPreview(collection, slug);

      if (!deployPreview) {
        await new Promise(resolve => setTimeout(() => resolve(), interval));
      }
    }
    /**
     * If there's no deploy preview, do nothing.
     */


    if (!deployPreview) {
      return;
    }

    return {
      /**
       * Create a URL using the collection `preview_path`, if provided.
       */
      url: createPreviewUrl(deployPreview.url, collection, slug, this.config.get('slug'), entry),

      /**
       * Always capitalize the status for consistency.
       */
      status: deployPreview.status ? deployPreview.status.toUpperCase() : ''
    };
  }

  async persistEntry(config, collection, entryDraft, MediaFiles, integrations, usedSlugs) {
    let options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
    const newEntry = entryDraft.getIn(['entry', 'newRecord']) || false;
    const parsedData = {
      title: entryDraft.getIn(['entry', 'data', 'title'], 'No Title'),
      description: entryDraft.getIn(['entry', 'data', 'description'], 'No Description!')
    };
    let entryObj;

    if (newEntry) {
      if (!(0, _collections.selectAllowNewEntries)(collection)) {
        throw new Error('Not allowed to create new entries in this collection');
      }

      const slug = await this.generateUniqueSlug(collection, entryDraft.getIn(['entry', 'data']), config.get('slug'), usedSlugs);
      const path = (0, _collections.selectEntryPath)(collection, slug);
      entryObj = {
        path,
        slug,
        raw: this.entryToRaw(collection, entryDraft.get('entry'))
      };
    } else {
      const path = entryDraft.getIn(['entry', 'path']);
      const slug = entryDraft.getIn(['entry', 'slug']);
      entryObj = {
        path,
        slug,
        raw: this.entryToRaw(collection, entryDraft.get('entry'))
      };
    }

    const commitMessage = commitMessageFormatter(newEntry ? 'create' : 'update', config, {
      collection,
      slug: entryObj.slug,
      path: entryObj.path
    });

    const useWorkflow = config.getIn(['publish_mode']) === _publishModes.EDITORIAL_WORKFLOW;

    const collectionName = collection.get('name');
    /**
     * Determine whether an asset store integration is in use.
     */

    const hasAssetStore = integrations && !!(0, _integrations.selectIntegration)(integrations, null, 'assetStore');

    const updatedOptions = _objectSpread({}, options, {
      hasAssetStore
    });

    const opts = _objectSpread({
      newEntry,
      parsedData,
      commitMessage,
      collectionName,
      useWorkflow
    }, updatedOptions);

    return this.implementation.persistEntry(entryObj, MediaFiles, opts).then(() => entryObj.slug);
  }

  persistMedia(config, file) {
    const options = {
      commitMessage: commitMessageFormatter('uploadMedia', config, {
        path: file.path
      })
    };
    return this.implementation.persistMedia(file, options);
  }

  deleteEntry(config, collection, slug) {
    const path = (0, _collections.selectEntryPath)(collection, slug);

    if (!(0, _collections.selectAllowDeletion)(collection)) {
      throw new Error('Not allowed to delete entries in this collection');
    }

    const commitMessage = commitMessageFormatter('delete', config, {
      collection,
      slug,
      path
    });
    return this.implementation.deleteFile(path, commitMessage, {
      collection,
      slug
    });
  }

  deleteMedia(config, path) {
    const commitMessage = commitMessageFormatter('deleteMedia', config, {
      path
    });
    return this.implementation.deleteFile(path, commitMessage);
  }

  persistUnpublishedEntry() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.persistEntry(...args, {
      unpublished: true
    });
  }

  updateUnpublishedEntryStatus(collection, slug, newStatus) {
    return this.implementation.updateUnpublishedEntryStatus(collection, slug, newStatus);
  }

  publishUnpublishedEntry(collection, slug) {
    return this.implementation.publishUnpublishedEntry(collection, slug);
  }

  deleteUnpublishedEntry(collection, slug) {
    return this.implementation.deleteUnpublishedEntry(collection, slug);
  }

  entryToRaw(collection, entry) {
    const format = (0, _formats.resolveFormat)(collection, entry.toJS());
    const fieldsOrder = this.fieldsOrder(collection, entry);
    return format && format.toFile(entry.get('data').toJS(), fieldsOrder);
  }

  fieldsOrder(collection, entry) {
    const fields = collection.get('fields');

    if (fields) {
      return collection.get('fields').map(f => f.get('name')).toArray();
    }

    const files = collection.get('files');
    const file = (files || []).filter(f => f.get('name') === entry.get('slug')).get(0);

    if (file == null) {
      throw new Error(`No file found for ${entry.get('slug')} in ${collection.get('name')}`);
    }

    return file.get('fields').map(f => f.get('name')).toArray();
  }

  filterEntries(collection, filterRule) {
    return collection.entries.filter(entry => {
      const fieldValue = entry.data[filterRule.get('field')];

      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(filterRule.get('value'));
      }

      return fieldValue === filterRule.get('value');
    });
  }

}

function resolveBackend(config) {
  const name = config.getIn(['backend', 'name']);

  if (name == null) {
    throw new Error('No backend defined in configuration');
  }

  const authStore = new LocalStorageAuthStore();

  if (!(0, _registry.getBackend)(name)) {
    throw new Error(`Backend not found: ${name}`);
  } else {
    return new Backend((0, _registry.getBackend)(name), {
      backendName: name,
      authStore,
      config
    });
  }
}

const currentBackend = function () {
  let backend = null;
  return config => {
    if (backend) {
      return backend;
    }

    if (config.get('backend')) {
      return backend = resolveBackend(config);
    }
  };
}();

exports.currentBackend = currentBackend;