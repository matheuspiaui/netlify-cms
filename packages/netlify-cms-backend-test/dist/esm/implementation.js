"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _take2 = _interopRequireDefault(require("lodash/take"));

var _isError2 = _interopRequireDefault(require("lodash/isError"));

var _attempt2 = _interopRequireDefault(require("lodash/attempt"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _AuthenticationPage = _interopRequireDefault(require("./AuthenticationPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.repoFiles = window.repoFiles || {};
window.repoFilesUnpublished = window.repoFilesUnpublished || [];

function getFile(path) {
  const segments = path.split('/');
  let obj = window.repoFiles;

  while (obj && segments.length) {
    obj = obj[segments.shift()];
  }

  return obj || {};
}

const pageSize = 10;

const getCursor = (collection, extension, entries, index) => {
  const count = entries.length;
  const pageCount = Math.floor(count / pageSize);
  return _netlifyCmsLibUtil.Cursor.create({
    actions: [...(index < pageCount ? ['next', 'last'] : []), ...(index > 0 ? ['prev', 'first'] : [])],
    meta: {
      index,
      count,
      pageSize,
      pageCount
    },
    data: {
      collection,
      extension,
      index,
      pageCount
    }
  });
};

const getFolderEntries = (folder, extension) => {
  return Object.keys(window.repoFiles[folder] || {}).filter(path => path.endsWith(`.${extension}`)).map(path => ({
    file: {
      path: `${folder}/${path}`
    },
    data: window.repoFiles[folder][path].content
  })).reverse();
};

class TestBackend {
  constructor(config) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.config = config;
    this.assets = [];
    this.options = options;
  }

  authComponent() {
    return _AuthenticationPage.default;
  }

  restoreUser(user) {
    return this.authenticate(user);
  }

  authenticate() {
    return Promise.resolve();
  }

  logout() {
    return null;
  }

  getToken() {
    return Promise.resolve('');
  }

  traverseCursor(cursor, action) {
    const _cursor$data$toObject = cursor.data.toObject(),
          collection = _cursor$data$toObject.collection,
          extension = _cursor$data$toObject.extension,
          index = _cursor$data$toObject.index,
          pageCount = _cursor$data$toObject.pageCount;

    const newIndex = (() => {
      if (action === 'next') {
        return index + 1;
      }

      if (action === 'prev') {
        return index - 1;
      }

      if (action === 'first') {
        return 0;
      }

      if (action === 'last') {
        return pageCount;
      }
    })(); // TODO: stop assuming cursors are for collections


    const allEntries = getFolderEntries(collection.get('folder'), extension);
    const entries = allEntries.slice(newIndex * pageSize, newIndex * pageSize + pageSize);
    const newCursor = getCursor(collection, extension, allEntries, newIndex);
    return Promise.resolve({
      entries,
      cursor: newCursor
    });
  }

  entriesByFolder(collection, extension) {
    const folder = collection.get('folder');
    const entries = folder ? getFolderEntries(folder, extension) : [];
    const cursor = getCursor(collection, extension, entries, 0);
    const ret = (0, _take2.default)(entries, pageSize);
    ret[_netlifyCmsLibUtil.CURSOR_COMPATIBILITY_SYMBOL] = cursor;
    return Promise.resolve(ret);
  }

  entriesByFiles(collection) {
    const files = collection.get('files').map(collectionFile => ({
      path: collectionFile.get('file'),
      label: collectionFile.get('label')
    }));
    return Promise.all(files.map(file => ({
      file,
      data: getFile(file.path).content
    })));
  }

  getEntry(collection, slug, path) {
    return Promise.resolve({
      file: {
        path
      },
      data: getFile(path).content
    });
  }

  unpublishedEntries() {
    return Promise.resolve(window.repoFilesUnpublished);
  }

  unpublishedEntry(collection, slug) {
    const entry = window.repoFilesUnpublished.find(e => e.metaData.collection === collection.get('name') && e.slug === slug);

    if (!entry) {
      return Promise.reject(new _netlifyCmsLibUtil.EditorialWorkflowError('content is not under editorial workflow', true));
    }

    return Promise.resolve(entry);
  }

  deleteUnpublishedEntry(collection, slug) {
    const unpubStore = window.repoFilesUnpublished;
    const existingEntryIndex = unpubStore.findIndex(e => e.metaData.collection === collection && e.slug === slug);
    unpubStore.splice(existingEntryIndex, 1);
    return Promise.resolve();
  }

  persistEntry(_ref, mediaFiles) {
    let path = _ref.path,
        raw = _ref.raw,
        slug = _ref.slug;
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (options.useWorkflow) {
      const unpubStore = window.repoFilesUnpublished;
      const existingEntryIndex = unpubStore.findIndex(e => e.file.path === path);

      if (existingEntryIndex >= 0) {
        const unpubEntry = _objectSpread({}, unpubStore[existingEntryIndex], {
          data: raw
        });

        unpubEntry.title = options.parsedData && options.parsedData.title;
        unpubEntry.description = options.parsedData && options.parsedData.description;
        unpubStore.splice(existingEntryIndex, 1, unpubEntry);
      } else {
        const unpubEntry = {
          data: raw,
          file: {
            path
          },
          metaData: {
            collection: options.collectionName,
            status: this.options.initialWorkflowStatus,
            title: options.parsedData && options.parsedData.title,
            description: options.parsedData && options.parsedData.description
          },
          slug
        };
        unpubStore.push(unpubEntry);
      }

      return Promise.resolve();
    }

    const newEntry = options.newEntry || false;
    const folder = path.substring(0, path.lastIndexOf('/'));
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    window.repoFiles[folder] = window.repoFiles[folder] || {};
    window.repoFiles[folder][fileName] = window.repoFiles[folder][fileName] || {};

    if (newEntry) {
      window.repoFiles[folder][fileName] = {
        content: raw
      };
    } else {
      window.repoFiles[folder][fileName].content = raw;
    }

    return Promise.resolve();
  }

  updateUnpublishedEntryStatus(collection, slug, newStatus) {
    const unpubStore = window.repoFilesUnpublished;
    const entryIndex = unpubStore.findIndex(e => e.metaData.collection === collection && e.slug === slug);
    unpubStore[entryIndex].metaData.status = newStatus;
    return Promise.resolve();
  }

  publishUnpublishedEntry(collection, slug) {
    const unpubStore = window.repoFilesUnpublished;
    const unpubEntryIndex = unpubStore.findIndex(e => e.metaData.collection === collection && e.slug === slug);
    const unpubEntry = unpubStore[unpubEntryIndex];
    const entry = {
      raw: unpubEntry.data,
      slug: unpubEntry.slug,
      path: unpubEntry.file.path
    };
    unpubStore.splice(unpubEntryIndex, 1);
    return this.persistEntry(entry);
  }

  getMedia() {
    return Promise.resolve(this.assets);
  }

  persistMedia(_ref2) {
    let fileObj = _ref2.fileObj;
    const name = fileObj.name,
          size = fileObj.size;
    const objectUrl = (0, _attempt2.default)(window.URL.createObjectURL, fileObj);
    const url = (0, _isError2.default)(objectUrl) ? '' : objectUrl;
    const normalizedAsset = {
      id: (0, _v.default)(),
      name,
      size,
      path: url,
      url
    };
    this.assets.push(normalizedAsset);
    return Promise.resolve(normalizedAsset);
  }

  deleteFile(path) {
    const assetIndex = this.assets.findIndex(asset => asset.path === path);

    if (assetIndex > -1) {
      this.assets.splice(assetIndex, 1);
    } else {
      const folder = path.substring(0, path.lastIndexOf('/'));
      const fileName = path.substring(path.lastIndexOf('/') + 1);
      delete window.repoFiles[folder][fileName];
    }

    return Promise.resolve();
  }

}

exports.default = TestBackend;