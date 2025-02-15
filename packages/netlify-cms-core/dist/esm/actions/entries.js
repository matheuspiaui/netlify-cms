"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entryLoading = entryLoading;
exports.entryLoaded = entryLoaded;
exports.entryLoadError = entryLoadError;
exports.entriesLoading = entriesLoading;
exports.entriesLoaded = entriesLoaded;
exports.entriesFailed = entriesFailed;
exports.entryPersisting = entryPersisting;
exports.entryPersisted = entryPersisted;
exports.entryPersistFail = entryPersistFail;
exports.entryDeleting = entryDeleting;
exports.entryDeleted = entryDeleted;
exports.entryDeleteFail = entryDeleteFail;
exports.emptyDraftCreated = emptyDraftCreated;
exports.createDraftFromEntry = createDraftFromEntry;
exports.discardDraft = discardDraft;
exports.changeDraft = changeDraft;
exports.changeDraftField = changeDraftField;
exports.changeDraftFieldValidation = changeDraftFieldValidation;
exports.clearFieldErrors = clearFieldErrors;
exports.localBackupRetrieved = localBackupRetrieved;
exports.loadLocalBackup = loadLocalBackup;
exports.persistLocalBackup = persistLocalBackup;
exports.retrieveLocalBackup = retrieveLocalBackup;
exports.deleteLocalBackup = deleteLocalBackup;
exports.loadEntry = loadEntry;
exports.loadEntries = loadEntries;
exports.traverseCollectionCursor = traverseCollectionCursor;
exports.createEmptyDraft = createEmptyDraft;
exports.persistEntry = persistEntry;
exports.deleteEntry = deleteEntry;
exports.ENTRY_DELETE_FAILURE = exports.ENTRY_DELETE_SUCCESS = exports.ENTRY_DELETE_REQUEST = exports.ENTRY_PERSIST_FAILURE = exports.ENTRY_PERSIST_SUCCESS = exports.ENTRY_PERSIST_REQUEST = exports.DRAFT_CREATE_FROM_LOCAL_BACKUP = exports.DRAFT_LOCAL_BACKUP_RETRIEVED = exports.DRAFT_CLEAR_ERRORS = exports.DRAFT_VALIDATION_ERRORS = exports.DRAFT_CHANGE_FIELD = exports.DRAFT_CHANGE = exports.DRAFT_DISCARD = exports.DRAFT_CREATE_EMPTY = exports.DRAFT_CREATE_FROM_ENTRY = exports.ENTRIES_FAILURE = exports.ENTRIES_SUCCESS = exports.ENTRIES_REQUEST = exports.ENTRY_FAILURE = exports.ENTRY_SUCCESS = exports.ENTRY_REQUEST = void 0;

var _immutable = require("immutable");

var _reduxNotifications = require("redux-notifications");

var _serializeEntryValues = require("../lib/serializeEntryValues");

var _backend = require("../backend");

var _integrations = require("../integrations");

var _reducers = require("../reducers");

var _collections = require("../reducers/collections");

var _cursors = require("../reducers/cursors");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _Entry = require("../valueObjects/Entry");

var _validationErrorTypes = _interopRequireDefault(require("../constants/validationErrorTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const notifSend = _reduxNotifications.actions.notifSend;
/*
 * Contant Declarations
 */

const ENTRY_REQUEST = 'ENTRY_REQUEST';
exports.ENTRY_REQUEST = ENTRY_REQUEST;
const ENTRY_SUCCESS = 'ENTRY_SUCCESS';
exports.ENTRY_SUCCESS = ENTRY_SUCCESS;
const ENTRY_FAILURE = 'ENTRY_FAILURE';
exports.ENTRY_FAILURE = ENTRY_FAILURE;
const ENTRIES_REQUEST = 'ENTRIES_REQUEST';
exports.ENTRIES_REQUEST = ENTRIES_REQUEST;
const ENTRIES_SUCCESS = 'ENTRIES_SUCCESS';
exports.ENTRIES_SUCCESS = ENTRIES_SUCCESS;
const ENTRIES_FAILURE = 'ENTRIES_FAILURE';
exports.ENTRIES_FAILURE = ENTRIES_FAILURE;
const DRAFT_CREATE_FROM_ENTRY = 'DRAFT_CREATE_FROM_ENTRY';
exports.DRAFT_CREATE_FROM_ENTRY = DRAFT_CREATE_FROM_ENTRY;
const DRAFT_CREATE_EMPTY = 'DRAFT_CREATE_EMPTY';
exports.DRAFT_CREATE_EMPTY = DRAFT_CREATE_EMPTY;
const DRAFT_DISCARD = 'DRAFT_DISCARD';
exports.DRAFT_DISCARD = DRAFT_DISCARD;
const DRAFT_CHANGE = 'DRAFT_CHANGE';
exports.DRAFT_CHANGE = DRAFT_CHANGE;
const DRAFT_CHANGE_FIELD = 'DRAFT_CHANGE_FIELD';
exports.DRAFT_CHANGE_FIELD = DRAFT_CHANGE_FIELD;
const DRAFT_VALIDATION_ERRORS = 'DRAFT_VALIDATION_ERRORS';
exports.DRAFT_VALIDATION_ERRORS = DRAFT_VALIDATION_ERRORS;
const DRAFT_CLEAR_ERRORS = 'DRAFT_CLEAR_ERRORS';
exports.DRAFT_CLEAR_ERRORS = DRAFT_CLEAR_ERRORS;
const DRAFT_LOCAL_BACKUP_RETRIEVED = 'DRAFT_LOCAL_BACKUP_RETRIEVED';
exports.DRAFT_LOCAL_BACKUP_RETRIEVED = DRAFT_LOCAL_BACKUP_RETRIEVED;
const DRAFT_CREATE_FROM_LOCAL_BACKUP = 'DRAFT_CREATE_FROM_LOCAL_BACKUP';
exports.DRAFT_CREATE_FROM_LOCAL_BACKUP = DRAFT_CREATE_FROM_LOCAL_BACKUP;
const ENTRY_PERSIST_REQUEST = 'ENTRY_PERSIST_REQUEST';
exports.ENTRY_PERSIST_REQUEST = ENTRY_PERSIST_REQUEST;
const ENTRY_PERSIST_SUCCESS = 'ENTRY_PERSIST_SUCCESS';
exports.ENTRY_PERSIST_SUCCESS = ENTRY_PERSIST_SUCCESS;
const ENTRY_PERSIST_FAILURE = 'ENTRY_PERSIST_FAILURE';
exports.ENTRY_PERSIST_FAILURE = ENTRY_PERSIST_FAILURE;
const ENTRY_DELETE_REQUEST = 'ENTRY_DELETE_REQUEST';
exports.ENTRY_DELETE_REQUEST = ENTRY_DELETE_REQUEST;
const ENTRY_DELETE_SUCCESS = 'ENTRY_DELETE_SUCCESS';
exports.ENTRY_DELETE_SUCCESS = ENTRY_DELETE_SUCCESS;
const ENTRY_DELETE_FAILURE = 'ENTRY_DELETE_FAILURE';
/*
 * Simple Action Creators (Internal)
 * We still need to export them for tests
 */

exports.ENTRY_DELETE_FAILURE = ENTRY_DELETE_FAILURE;

function entryLoading(collection, slug) {
  return {
    type: ENTRY_REQUEST,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}

function entryLoaded(collection, entry) {
  return {
    type: ENTRY_SUCCESS,
    payload: {
      collection: collection.get('name'),
      entry
    }
  };
}

function entryLoadError(error, collection, slug) {
  return {
    type: ENTRY_FAILURE,
    payload: {
      error,
      collection: collection.get('name'),
      slug
    }
  };
}

function entriesLoading(collection) {
  return {
    type: ENTRIES_REQUEST,
    payload: {
      collection: collection.get('name')
    }
  };
}

function entriesLoaded(collection, entries, pagination, cursor) {
  let append = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  return {
    type: ENTRIES_SUCCESS,
    payload: {
      collection: collection.get('name'),
      entries,
      page: pagination,
      cursor: _netlifyCmsLibUtil.Cursor.create(cursor),
      append
    }
  };
}

function entriesFailed(collection, error) {
  return {
    type: ENTRIES_FAILURE,
    error: 'Failed to load entries',
    payload: error.toString(),
    meta: {
      collection: collection.get('name')
    }
  };
}

function entryPersisting(collection, entry) {
  return {
    type: ENTRY_PERSIST_REQUEST,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: entry.get('slug')
    }
  };
}

function entryPersisted(collection, entry, slug) {
  return {
    type: ENTRY_PERSIST_SUCCESS,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: entry.get('slug'),

      /**
       * Pass slug from backend for newly created entries.
       */
      slug
    }
  };
}

function entryPersistFail(collection, entry, error) {
  return {
    type: ENTRY_PERSIST_FAILURE,
    error: 'Failed to persist entry',
    payload: {
      collectionName: collection.get('name'),
      entrySlug: entry.get('slug'),
      error: error.toString()
    }
  };
}

function entryDeleting(collection, slug) {
  return {
    type: ENTRY_DELETE_REQUEST,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: slug
    }
  };
}

function entryDeleted(collection, slug) {
  return {
    type: ENTRY_DELETE_SUCCESS,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: slug
    }
  };
}

function entryDeleteFail(collection, slug, error) {
  return {
    type: ENTRY_DELETE_FAILURE,
    payload: {
      collectionName: collection.get('name'),
      entrySlug: slug,
      error: error.toString()
    }
  };
}

function emptyDraftCreated(entry) {
  return {
    type: DRAFT_CREATE_EMPTY,
    payload: entry
  };
}
/*
 * Exported simple Action Creators
 */


function createDraftFromEntry(entry, metadata) {
  return {
    type: DRAFT_CREATE_FROM_ENTRY,
    payload: {
      entry,
      metadata
    }
  };
}

function discardDraft() {
  return {
    type: DRAFT_DISCARD
  };
}

function changeDraft(entry) {
  return {
    type: DRAFT_CHANGE,
    payload: entry
  };
}

function changeDraftField(field, value, metadata) {
  return {
    type: DRAFT_CHANGE_FIELD,
    payload: {
      field,
      value,
      metadata
    }
  };
}

function changeDraftFieldValidation(uniquefieldId, errors) {
  return {
    type: DRAFT_VALIDATION_ERRORS,
    payload: {
      uniquefieldId,
      errors
    }
  };
}

function clearFieldErrors() {
  return {
    type: DRAFT_CLEAR_ERRORS
  };
}

function localBackupRetrieved(entry) {
  return {
    type: DRAFT_LOCAL_BACKUP_RETRIEVED,
    payload: {
      entry
    }
  };
}

function loadLocalBackup() {
  return {
    type: DRAFT_CREATE_FROM_LOCAL_BACKUP
  };
}

function persistLocalBackup(entry, collection) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    return backend.persistLocalDraftBackup(entry, collection);
  };
}

function retrieveLocalBackup(collection, slug) {
  return async (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const entry = await backend.getLocalDraftBackup(collection, slug);

    if (entry) {
      return dispatch(localBackupRetrieved(entry));
    }
  };
}

function deleteLocalBackup(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    return backend.deleteLocalDraftBackup(collection, slug);
  };
}
/*
 * Exported Thunk Action Creators
 */


function loadEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    dispatch(entryLoading(collection, slug));
    return backend.getEntry(collection, slug).then(loadedEntry => {
      return dispatch(entryLoaded(collection, loadedEntry));
    }).catch(error => {
      console.error(error);
      dispatch(notifSend({
        message: {
          details: error.message,
          key: 'ui.toast.onFailToLoadEntries'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(entryLoadError(error, collection, slug));
    });
  };
}

const appendActions = (0, _immutable.fromJS)({
  ['append_next']: {
    action: 'next',
    append: true
  }
});

const addAppendActionsToCursor = cursor => _netlifyCmsLibUtil.Cursor.create(cursor).updateStore('actions', actions => actions.union(appendActions.filter(v => actions.has(v.get('action'))).keySeq()));

function loadEntries(collection) {
  let page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return (dispatch, getState) => {
    if (collection.get('isFetching')) {
      return;
    }

    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, collection.get('name'), 'listEntries');
    const provider = integration ? (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration) : backend;
    const append = !!(page && !isNaN(page) && page > 0);
    dispatch(entriesLoading(collection));
    provider.listEntries(collection, page).then(response => _objectSpread({}, response, {
      // The only existing backend using the pagination system is the
      // Algolia integration, which is also the only integration used
      // to list entries. Thus, this checking for an integration can
      // determine whether or not this is using the old integer-based
      // pagination API. Other backends will simply store an empty
      // cursor, which behaves identically to no cursor at all.
      cursor: integration ? _netlifyCmsLibUtil.Cursor.create({
        actions: ['next'],
        meta: {
          usingOldPaginationAPI: true
        },
        data: {
          nextPage: page + 1
        }
      }) : _netlifyCmsLibUtil.Cursor.create(response.cursor)
    })).then(response => dispatch(entriesLoaded(collection, response.cursor.meta.get('usingOldPaginationAPI') ? response.entries.reverse() : response.entries, response.pagination, addAppendActionsToCursor(response.cursor), append))).catch(err => {
      dispatch(notifSend({
        message: {
          details: err,
          key: 'ui.toast.onFailToLoadEntries'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(entriesFailed(collection, err)));
    });
  };
}

function traverseCursor(backend, cursor, action) {
  if (!cursor.actions.has(action)) {
    throw new Error(`The current cursor does not support the pagination action "${action}".`);
  }

  return backend.traverseCursor(cursor, action);
}

function traverseCollectionCursor(collection, action) {
  return async (dispatch, getState) => {
    const state = getState();

    if (state.entries.getIn(['pages', `${collection.get('name')}`, 'isFetching'])) {
      return;
    }

    const backend = (0, _backend.currentBackend)(state.config);

    const _ref = appendActions.has(action) ? appendActions.get(action).toJS() : {
      action,
      append: false
    },
          realAction = _ref.action,
          append = _ref.append;

    const cursor = (0, _cursors.selectCollectionEntriesCursor)(state.cursors, collection.get('name')); // Handle cursors representing pages in the old, integer-based
    // pagination API

    if (cursor.meta.get('usingOldPaginationAPI', false)) {
      return dispatch(loadEntries(collection, cursor.data.get('nextPage')));
    }

    try {
      dispatch(entriesLoading(collection));

      const _ref2 = await traverseCursor(backend, cursor, realAction),
            entries = _ref2.entries,
            newCursor = _ref2.cursor; // Pass null for the old pagination argument - this will
      // eventually be removed.


      return dispatch(entriesLoaded(collection, entries, null, addAppendActionsToCursor(newCursor), append));
    } catch (err) {
      console.error(err);
      dispatch(notifSend({
        message: {
          details: err,
          key: 'ui.toast.onFailToPersist'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(entriesFailed(collection, err)));
    }
  };
}

function createEmptyDraft(collection) {
  return dispatch => {
    const dataFields = createEmptyDraftData(collection.get('fields', (0, _immutable.List)()));
    const newEntry = (0, _Entry.createEntry)(collection.get('name'), '', '', {
      data: dataFields
    });
    dispatch(emptyDraftCreated(newEntry));
  };
}

function createEmptyDraftData(fields) {
  return fields.reduce((acc, item) => {
    const subfields = item.get('field') || item.get('fields');
    const list = item.get('widget') == 'list';
    const name = item.get('name');
    const defaultValue = item.get('default', null);

    if (_immutable.List.isList(subfields)) {
      acc[name] = list ? [createEmptyDraftData(subfields)] : createEmptyDraftData(subfields);
      return acc;
    }

    if (_immutable.Map.isMap(subfields)) {
      acc[name] = list ? [createEmptyDraftData([subfields])] : createEmptyDraftData([subfields]);
      return acc;
    }

    if (defaultValue !== null) {
      acc[name] = defaultValue;
    }

    return acc;
  }, {});
}

function persistEntry(collection) {
  return (dispatch, getState) => {
    const state = getState();
    const entryDraft = state.entryDraft;
    const fieldsErrors = entryDraft.get('fieldsErrors');
    const usedSlugs = (0, _reducers.selectPublishedSlugs)(state, collection.get('name')); // Early return if draft contains validation errors

    if (!fieldsErrors.isEmpty()) {
      const hasPresenceErrors = fieldsErrors.some(errors => errors.some(error => error.type && error.type === _validationErrorTypes.default.PRESENCE));

      if (hasPresenceErrors) {
        dispatch(notifSend({
          message: {
            key: 'ui.toast.missingRequiredField'
          },
          kind: 'danger',
          dismissAfter: 8000
        }));
      }

      return Promise.reject();
    }

    const backend = (0, _backend.currentBackend)(state.config);
    const assetProxies = entryDraft.get('mediaFiles').map(path => (0, _reducers.getAsset)(state, path));
    const entry = entryDraft.get('entry');
    /**
     * Serialize the values of any fields with registered serializers, and
     * update the entry and entryDraft with the serialized values.
     */

    const fields = (0, _collections.selectFields)(collection, entry.get('slug'));
    const serializedData = (0, _serializeEntryValues.serializeValues)(entryDraft.getIn(['entry', 'data']), fields);
    const serializedEntry = entry.set('data', serializedData);
    const serializedEntryDraft = entryDraft.set('entry', serializedEntry);
    dispatch(entryPersisting(collection, serializedEntry));
    return backend.persistEntry(state.config, collection, serializedEntryDraft, assetProxies.toJS(), state.integrations, usedSlugs).then(slug => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entrySaved'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(entryPersisted(collection, serializedEntry, slug));
    }).catch(error => {
      console.error(error);
      dispatch(notifSend({
        message: {
          details: error,
          key: 'ui.toast.onFailToPersist'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(entryPersistFail(collection, serializedEntry, error)));
    });
  };
}

function deleteEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    dispatch(entryDeleting(collection, slug));
    return backend.deleteEntry(state.config, collection, slug).then(() => {
      return dispatch(entryDeleted(collection, slug));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          details: error,
          key: 'ui.toast.onFailToDelete'
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      console.error(error);
      return Promise.reject(dispatch(entryDeleteFail(collection, slug, error)));
    });
  };
}