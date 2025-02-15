"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.selectEntries = exports.selectPublishedSlugs = exports.selectEntry = void 0;

var _immutable = require("immutable");

var _entries = require("../actions/entries");

var _search = require("../actions/search");

let collection;
let loadedEntries;
let append;
let page;
let slug;

const entries = function entries() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)({
    entities: (0, _immutable.Map)(),
    pages: (0, _immutable.Map)()
  });
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _entries.ENTRY_REQUEST:
      return state.setIn(['entities', `${action.payload.collection}.${action.payload.slug}`, 'isFetching'], true);

    case _entries.ENTRY_SUCCESS:
      collection = action.payload.collection;
      slug = action.payload.entry.slug;
      return state.withMutations(map => {
        map.setIn(['entities', `${collection}.${slug}`], (0, _immutable.fromJS)(action.payload.entry));
        const ids = map.getIn(['pages', collection, 'ids'], (0, _immutable.List)());

        if (!ids.includes(slug)) {
          map.setIn(['pages', collection, 'ids'], ids.unshift(slug));
        }
      });

    case _entries.ENTRIES_REQUEST:
      return state.setIn(['pages', action.payload.collection, 'isFetching'], true);

    case _entries.ENTRIES_SUCCESS:
      collection = action.payload.collection;
      loadedEntries = action.payload.entries;
      append = action.payload.append;
      page = action.payload.page;
      return state.withMutations(map => {
        loadedEntries.forEach(entry => map.setIn(['entities', `${collection}.${entry.slug}`], (0, _immutable.fromJS)(entry).set('isFetching', false)));
        const ids = (0, _immutable.List)(loadedEntries.map(entry => entry.slug));
        map.setIn(['pages', collection], (0, _immutable.Map)({
          page,
          ids: append ? map.getIn(['pages', collection, 'ids'], (0, _immutable.List)()).concat(ids) : ids
        }));
      });

    case _entries.ENTRIES_FAILURE:
      return state.setIn(['pages', action.meta.collection, 'isFetching'], false);

    case _entries.ENTRY_FAILURE:
      return state.withMutations(map => {
        map.setIn(['entities', `${action.payload.collection}.${action.payload.slug}`, 'isFetching'], false);
        map.setIn(['entities', `${action.payload.collection}.${action.payload.slug}`, 'error'], action.payload.error.message);
      });

    case _search.SEARCH_ENTRIES_SUCCESS:
      loadedEntries = action.payload.entries;
      return state.withMutations(map => {
        loadedEntries.forEach(entry => map.setIn(['entities', `${entry.collection}.${entry.slug}`], (0, _immutable.fromJS)(entry).set('isFetching', false)));
      });

    case _entries.ENTRY_DELETE_SUCCESS:
      return state.withMutations(map => {
        map.deleteIn(['entities', `${action.payload.collectionName}.${action.payload.entrySlug}`]);
        map.updateIn(['pages', action.payload.collectionName, 'ids'], ids => ids.filter(id => id !== action.payload.entrySlug));
      });

    default:
      return state;
  }
};

const selectEntry = (state, collection, slug) => state.getIn(['entities', `${collection}.${slug}`]);

exports.selectEntry = selectEntry;

const selectPublishedSlugs = (state, collection) => state.getIn(['pages', collection, 'ids'], (0, _immutable.List)());

exports.selectPublishedSlugs = selectPublishedSlugs;

const selectEntries = (state, collection) => {
  const slugs = selectPublishedSlugs(state, collection);
  return slugs && slugs.map(slug => selectEntry(state, collection, slug));
};

exports.selectEntries = selectEntries;
var _default = entries;
exports.default = _default;