"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUnpublishedEntry = loadUnpublishedEntry;
exports.loadUnpublishedEntries = loadUnpublishedEntries;
exports.persistUnpublishedEntry = persistUnpublishedEntry;
exports.updateUnpublishedEntryStatus = updateUnpublishedEntryStatus;
exports.deleteUnpublishedEntry = deleteUnpublishedEntry;
exports.publishUnpublishedEntry = publishUnpublishedEntry;
exports.UNPUBLISHED_ENTRY_DELETE_FAILURE = exports.UNPUBLISHED_ENTRY_DELETE_SUCCESS = exports.UNPUBLISHED_ENTRY_DELETE_REQUEST = exports.UNPUBLISHED_ENTRY_PUBLISH_FAILURE = exports.UNPUBLISHED_ENTRY_PUBLISH_SUCCESS = exports.UNPUBLISHED_ENTRY_PUBLISH_REQUEST = exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE = exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS = exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST = exports.UNPUBLISHED_ENTRY_PERSIST_FAILURE = exports.UNPUBLISHED_ENTRY_PERSIST_SUCCESS = exports.UNPUBLISHED_ENTRY_PERSIST_REQUEST = exports.UNPUBLISHED_ENTRIES_FAILURE = exports.UNPUBLISHED_ENTRIES_SUCCESS = exports.UNPUBLISHED_ENTRIES_REQUEST = exports.UNPUBLISHED_ENTRY_REDIRECT = exports.UNPUBLISHED_ENTRY_SUCCESS = exports.UNPUBLISHED_ENTRY_REQUEST = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _reduxNotifications = require("redux-notifications");

var _reduxOptimist = require("redux-optimist");

var _serializeEntryValues = require("../lib/serializeEntryValues");

var _backend = require("../backend");

var _reducers = require("../reducers");

var _collections = require("../reducers/collections");

var _publishModes = require("../constants/publishModes");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _entries = require("./entries");

var _validationErrorTypes = _interopRequireDefault(require("../constants/validationErrorTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const notifSend = _reduxNotifications.actions.notifSend;
/*
 * Contant Declarations
 */

const UNPUBLISHED_ENTRY_REQUEST = 'UNPUBLISHED_ENTRY_REQUEST';
exports.UNPUBLISHED_ENTRY_REQUEST = UNPUBLISHED_ENTRY_REQUEST;
const UNPUBLISHED_ENTRY_SUCCESS = 'UNPUBLISHED_ENTRY_SUCCESS';
exports.UNPUBLISHED_ENTRY_SUCCESS = UNPUBLISHED_ENTRY_SUCCESS;
const UNPUBLISHED_ENTRY_REDIRECT = 'UNPUBLISHED_ENTRY_REDIRECT';
exports.UNPUBLISHED_ENTRY_REDIRECT = UNPUBLISHED_ENTRY_REDIRECT;
const UNPUBLISHED_ENTRIES_REQUEST = 'UNPUBLISHED_ENTRIES_REQUEST';
exports.UNPUBLISHED_ENTRIES_REQUEST = UNPUBLISHED_ENTRIES_REQUEST;
const UNPUBLISHED_ENTRIES_SUCCESS = 'UNPUBLISHED_ENTRIES_SUCCESS';
exports.UNPUBLISHED_ENTRIES_SUCCESS = UNPUBLISHED_ENTRIES_SUCCESS;
const UNPUBLISHED_ENTRIES_FAILURE = 'UNPUBLISHED_ENTRIES_FAILURE';
exports.UNPUBLISHED_ENTRIES_FAILURE = UNPUBLISHED_ENTRIES_FAILURE;
const UNPUBLISHED_ENTRY_PERSIST_REQUEST = 'UNPUBLISHED_ENTRY_PERSIST_REQUEST';
exports.UNPUBLISHED_ENTRY_PERSIST_REQUEST = UNPUBLISHED_ENTRY_PERSIST_REQUEST;
const UNPUBLISHED_ENTRY_PERSIST_SUCCESS = 'UNPUBLISHED_ENTRY_PERSIST_SUCCESS';
exports.UNPUBLISHED_ENTRY_PERSIST_SUCCESS = UNPUBLISHED_ENTRY_PERSIST_SUCCESS;
const UNPUBLISHED_ENTRY_PERSIST_FAILURE = 'UNPUBLISHED_ENTRY_PERSIST_FAILURE';
exports.UNPUBLISHED_ENTRY_PERSIST_FAILURE = UNPUBLISHED_ENTRY_PERSIST_FAILURE;
const UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST = 'UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST';
exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST = UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST;
const UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS = 'UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS';
exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS = UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS;
const UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE = 'UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE';
exports.UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE = UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE;
const UNPUBLISHED_ENTRY_PUBLISH_REQUEST = 'UNPUBLISHED_ENTRY_PUBLISH_REQUEST';
exports.UNPUBLISHED_ENTRY_PUBLISH_REQUEST = UNPUBLISHED_ENTRY_PUBLISH_REQUEST;
const UNPUBLISHED_ENTRY_PUBLISH_SUCCESS = 'UNPUBLISHED_ENTRY_PUBLISH_SUCCESS';
exports.UNPUBLISHED_ENTRY_PUBLISH_SUCCESS = UNPUBLISHED_ENTRY_PUBLISH_SUCCESS;
const UNPUBLISHED_ENTRY_PUBLISH_FAILURE = 'UNPUBLISHED_ENTRY_PUBLISH_FAILURE';
exports.UNPUBLISHED_ENTRY_PUBLISH_FAILURE = UNPUBLISHED_ENTRY_PUBLISH_FAILURE;
const UNPUBLISHED_ENTRY_DELETE_REQUEST = 'UNPUBLISHED_ENTRY_DELETE_REQUEST';
exports.UNPUBLISHED_ENTRY_DELETE_REQUEST = UNPUBLISHED_ENTRY_DELETE_REQUEST;
const UNPUBLISHED_ENTRY_DELETE_SUCCESS = 'UNPUBLISHED_ENTRY_DELETE_SUCCESS';
exports.UNPUBLISHED_ENTRY_DELETE_SUCCESS = UNPUBLISHED_ENTRY_DELETE_SUCCESS;
const UNPUBLISHED_ENTRY_DELETE_FAILURE = 'UNPUBLISHED_ENTRY_DELETE_FAILURE';
/*
 * Simple Action Creators (Internal)
 */

exports.UNPUBLISHED_ENTRY_DELETE_FAILURE = UNPUBLISHED_ENTRY_DELETE_FAILURE;

function unpublishedEntryLoading(collection, slug) {
  return {
    type: UNPUBLISHED_ENTRY_REQUEST,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}

function unpublishedEntryLoaded(collection, entry) {
  return {
    type: UNPUBLISHED_ENTRY_SUCCESS,
    payload: {
      collection: collection.get('name'),
      entry
    }
  };
}

function unpublishedEntryRedirected(collection, slug) {
  return {
    type: UNPUBLISHED_ENTRY_REDIRECT,
    payload: {
      collection: collection.get('name'),
      slug
    }
  };
}

function unpublishedEntriesLoading() {
  return {
    type: UNPUBLISHED_ENTRIES_REQUEST
  };
}

function unpublishedEntriesLoaded(entries, pagination) {
  return {
    type: UNPUBLISHED_ENTRIES_SUCCESS,
    payload: {
      entries,
      pages: pagination
    }
  };
}

function unpublishedEntriesFailed(error) {
  return {
    type: UNPUBLISHED_ENTRIES_FAILURE,
    error: 'Failed to load entries',
    payload: error
  };
}

function unpublishedEntryPersisting(collection, entry, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_REQUEST,
    payload: {
      collection: collection.get('name'),
      entry
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryPersisted(collection, entry, transactionID, slug) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_SUCCESS,
    payload: {
      collection: collection.get('name'),
      entry,
      slug
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryPersistedFail(error, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PERSIST_FAILURE,
    payload: {
      error
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    },
    error
  };
}

function unpublishedEntryStatusChangeRequest(collection, slug, oldStatus, newStatus, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_REQUEST,
    payload: {
      collection,
      slug,
      oldStatus,
      newStatus
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryStatusChangePersisted(collection, slug, oldStatus, newStatus, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_SUCCESS,
    payload: {
      collection,
      slug,
      oldStatus,
      newStatus
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryStatusChangeError(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_STATUS_CHANGE_FAILURE,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    }
  };
}

function unpublishedEntryPublishRequest(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_REQUEST,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryPublished(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_SUCCESS,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryPublishError(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_PUBLISH_FAILURE,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    }
  };
}

function unpublishedEntryDeleteRequest(collection, slug, transactionID) {
  // The reducer doesn't handle this action -- it is for `optimist`.
  return {
    type: UNPUBLISHED_ENTRY_DELETE_REQUEST,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.BEGIN,
      id: transactionID
    }
  };
}

function unpublishedEntryDeleted(collection, slug, transactionID) {
  return {
    type: UNPUBLISHED_ENTRY_DELETE_SUCCESS,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.COMMIT,
      id: transactionID
    }
  };
}

function unpublishedEntryDeleteError(collection, slug, transactionID) {
  // The reducer doesn't handle this action -- it is for `optimist`.
  return {
    type: UNPUBLISHED_ENTRY_DELETE_FAILURE,
    payload: {
      collection,
      slug
    },
    optimist: {
      type: _reduxOptimist.REVERT,
      id: transactionID
    }
  };
}
/*
 * Exported Thunk Action Creators
 */


function loadUnpublishedEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    dispatch(unpublishedEntryLoading(collection, slug));
    backend.unpublishedEntry(collection, slug).then(entry => dispatch(unpublishedEntryLoaded(collection, entry))).catch(error => {
      if (error.name === _netlifyCmsLibUtil.EDITORIAL_WORKFLOW_ERROR && error.notUnderEditorialWorkflow) {
        dispatch(unpublishedEntryRedirected(collection, slug));
        dispatch((0, _entries.loadEntry)(collection, slug));
      } else {
        dispatch(notifSend({
          message: {
            key: 'ui.toast.onFailToLoadEntries',
            details: error
          },
          kind: 'danger',
          dismissAfter: 8000
        }));
      }
    });
  };
}

function loadUnpublishedEntries(collections) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.config.get('publish_mode') !== _publishModes.EDITORIAL_WORKFLOW) return;
    const backend = (0, _backend.currentBackend)(state.config);
    dispatch(unpublishedEntriesLoading());
    backend.unpublishedEntries(collections).then(response => dispatch(unpublishedEntriesLoaded(response.entries, response.pagination))).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToLoadEntries',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntriesFailed(error));
      Promise.reject(error);
    });
  };
}

function persistUnpublishedEntry(collection, existingUnpublishedEntry) {
  return async (dispatch, getState) => {
    const state = getState();
    const entryDraft = state.entryDraft;
    const fieldsErrors = entryDraft.get('fieldsErrors');
    const unpublishedSlugs = (0, _reducers.selectUnpublishedSlugs)(state, collection.get('name'));
    const publishedSlugs = (0, _reducers.selectPublishedSlugs)(state, collection.get('name'));
    const usedSlugs = publishedSlugs.concat(unpublishedSlugs); // Early return if draft contains validation errors

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
    const transactionID = (0, _v.default)();
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
    dispatch(unpublishedEntryPersisting(collection, serializedEntry, transactionID));
    const persistAction = existingUnpublishedEntry ? backend.persistUnpublishedEntry : backend.persistEntry;
    const persistCallArgs = [backend, state.config, collection, serializedEntryDraft, assetProxies.toJS(), state.integrations, usedSlugs];

    try {
      const newSlug = await persistAction.call(...persistCallArgs);
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entrySaved'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryPersisted(collection, serializedEntry, transactionID, newSlug));
    } catch (error) {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToPersist',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      return Promise.reject(dispatch(unpublishedEntryPersistedFail(error, transactionID)));
    }
  };
}

function updateUnpublishedEntryStatus(collection, slug, oldStatus, newStatus) {
  return (dispatch, getState) => {
    if (oldStatus === newStatus) return;
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const transactionID = (0, _v.default)();
    dispatch(unpublishedEntryStatusChangeRequest(collection, slug, oldStatus, newStatus, transactionID));
    backend.updateUnpublishedEntryStatus(collection, slug, newStatus).then(() => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entryUpdated'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryStatusChangePersisted(collection, slug, oldStatus, newStatus, transactionID));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToUpdateStatus',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntryStatusChangeError(collection, slug, transactionID));
    });
  };
}

function deleteUnpublishedEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const transactionID = (0, _v.default)();
    dispatch(unpublishedEntryDeleteRequest(collection, slug, transactionID));
    return backend.deleteUnpublishedEntry(collection, slug).then(() => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onDeleteUnpublishedChanges'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryDeleted(collection, slug, transactionID));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onDeleteUnpublishedChanges',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntryDeleteError(collection, slug, transactionID));
    });
  };
}

function publishUnpublishedEntry(collection, slug) {
  return (dispatch, getState) => {
    const state = getState();
    const collections = state.collections;
    const backend = (0, _backend.currentBackend)(state.config);
    const transactionID = (0, _v.default)();
    dispatch(unpublishedEntryPublishRequest(collection, slug, transactionID));
    return backend.publishUnpublishedEntry(collection, slug).then(() => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.entryPublished'
        },
        kind: 'success',
        dismissAfter: 4000
      }));
      dispatch(unpublishedEntryPublished(collection, slug, transactionID));
      dispatch((0, _entries.loadEntry)(collections.get(collection), slug));
    }).catch(error => {
      dispatch(notifSend({
        message: {
          key: 'ui.toast.onFailToPublishEntry',
          details: error
        },
        kind: 'danger',
        dismissAfter: 8000
      }));
      dispatch(unpublishedEntryPublishError(collection, slug, transactionID));
    });
  };
}