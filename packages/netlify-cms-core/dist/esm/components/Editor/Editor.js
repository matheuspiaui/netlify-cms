"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactRedux = require("react-redux");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _reactPolyglot = require("react-polyglot");

var _history = _interopRequireDefault(require("../../routing/history"));

var _auth = require("../../actions/auth");

var _entries = require("../../actions/entries");

var _editorialWorkflow = require("../../actions/editorialWorkflow");

var _deploys = require("../../actions/deploys");

var _serializeEntryValues = require("../../lib/serializeEntryValues");

var _reducers = require("../../reducers");

var _collections = require("../../reducers/collections");

var _publishModes = require("../../constants/publishModes");

var _EditorInterface = _interopRequireDefault(require("./EditorInterface"));

var _withWorkflow = _interopRequireDefault(require("./withWorkflow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const navigateCollection = collectionPath => _history.default.push(`/collections/${collectionPath}`);

const navigateToCollection = collectionName => navigateCollection(collectionName);

const navigateToNewEntry = collectionName => navigateCollection(`${collectionName}/new`);

const navigateToEntry = (collectionName, slug) => navigateCollection(`${collectionName}/entries/${slug}`);

class Editor extends _react.default.Component {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    _defineProperty(this, "createBackup", (0, _debounce2.default)(function (entry, collection) {
      this.props.persistLocalBackup(entry, collection);
    }, 2000));

    _defineProperty(this, "createDraft", (entry, metadata) => {
      if (entry) this.props.createDraftFromEntry(entry, metadata);
    });

    _defineProperty(this, "handleChangeStatus", newStatusName => {
      const _this$props = this.props,
            entryDraft = _this$props.entryDraft,
            updateUnpublishedEntryStatus = _this$props.updateUnpublishedEntryStatus,
            collection = _this$props.collection,
            slug = _this$props.slug,
            currentStatus = _this$props.currentStatus,
            t = _this$props.t;

      if (entryDraft.get('hasChanged')) {
        window.alert(t('editor.editor.onUpdatingWithUnsavedChanges'));
        return;
      }

      const newStatus = _publishModes.status.get(newStatusName);

      updateUnpublishedEntryStatus(collection.get('name'), slug, currentStatus, newStatus);
    });

    _defineProperty(this, "handlePersistEntry", async function () {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const _opts$createNew = opts.createNew,
            createNew = _opts$createNew === void 0 ? false : _opts$createNew;
      const _this$props2 = _this.props,
            persistEntry = _this$props2.persistEntry,
            collection = _this$props2.collection,
            currentStatus = _this$props2.currentStatus,
            hasWorkflow = _this$props2.hasWorkflow,
            loadEntry = _this$props2.loadEntry,
            slug = _this$props2.slug,
            createEmptyDraft = _this$props2.createEmptyDraft;
      await persistEntry(collection);

      _this.deleteBackup(collection, slug);

      if (createNew) {
        navigateToNewEntry(collection.get('name'));
        createEmptyDraft(collection);
      } else if (slug && hasWorkflow && !currentStatus) {
        loadEntry(collection, slug);
      }
    });

    _defineProperty(this, "handlePublishEntry", async function () {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const _opts$createNew2 = opts.createNew,
            createNew = _opts$createNew2 === void 0 ? false : _opts$createNew2;
      const _this$props3 = _this.props,
            publishUnpublishedEntry = _this$props3.publishUnpublishedEntry,
            entryDraft = _this$props3.entryDraft,
            collection = _this$props3.collection,
            slug = _this$props3.slug,
            currentStatus = _this$props3.currentStatus,
            t = _this$props3.t;

      if (currentStatus !== _publishModes.status.last()) {
        window.alert(t('editor.editor.onPublishingNotReady'));
        return;
      } else if (entryDraft.get('hasChanged')) {
        window.alert(t('editor.editor.onPublishingWithUnsavedChanges'));
        return;
      } else if (!window.confirm(t('editor.editor.onPublishing'))) {
        return;
      }

      await publishUnpublishedEntry(collection.get('name'), slug);

      _this.deleteBackup();

      if (createNew) {
        navigateToNewEntry(collection.get('name'));
      }
    });

    _defineProperty(this, "handleDeleteEntry", () => {
      const _this$props4 = this.props,
            entryDraft = _this$props4.entryDraft,
            newEntry = _this$props4.newEntry,
            collection = _this$props4.collection,
            deleteEntry = _this$props4.deleteEntry,
            slug = _this$props4.slug,
            t = _this$props4.t;

      if (entryDraft.get('hasChanged')) {
        if (!window.confirm(t('editor.editor.onDeleteWithUnsavedChanges'))) {
          return;
        }
      } else if (!window.confirm(t('editor.editor.onDeletePublishedEntry'))) {
        return;
      }

      if (newEntry) {
        return navigateToCollection(collection.get('name'));
      }

      setTimeout(async () => {
        await deleteEntry(collection, slug);
        this.deleteBackup();
        return navigateToCollection(collection.get('name'));
      }, 0);
    });

    _defineProperty(this, "handleDeleteUnpublishedChanges", async () => {
      const _this$props5 = this.props,
            entryDraft = _this$props5.entryDraft,
            collection = _this$props5.collection,
            slug = _this$props5.slug,
            deleteUnpublishedEntry = _this$props5.deleteUnpublishedEntry,
            loadEntry = _this$props5.loadEntry,
            isModification = _this$props5.isModification,
            t = _this$props5.t;

      if (entryDraft.get('hasChanged') && !window.confirm(t('editor.editor.onDeleteUnpublishedChangesWithUnsavedChanges'))) {
        return;
      } else if (!window.confirm(t('editor.editor.onDeleteUnpublishedChanges'))) {
        return;
      }

      await deleteUnpublishedEntry(collection.get('name'), slug);
      this.deleteBackup();

      if (isModification) {
        loadEntry(collection, slug);
      } else {
        navigateToCollection(collection.get('name'));
      }
    });
  }

  componentDidMount() {
    const _this$props6 = this.props,
          newEntry = _this$props6.newEntry,
          collection = _this$props6.collection,
          slug = _this$props6.slug,
          loadEntry = _this$props6.loadEntry,
          createEmptyDraft = _this$props6.createEmptyDraft,
          loadEntries = _this$props6.loadEntries,
          retrieveLocalBackup = _this$props6.retrieveLocalBackup,
          collectionEntriesLoaded = _this$props6.collectionEntriesLoaded,
          t = _this$props6.t;
    retrieveLocalBackup(collection, slug);

    if (newEntry) {
      createEmptyDraft(collection);
    } else {
      loadEntry(collection, slug);
    }

    const leaveMessage = t('editor.editor.onLeavePage');

    this.exitBlocker = event => {
      if (this.props.entryDraft.get('hasChanged')) {
        // This message is ignored in most browsers, but its presence
        // triggers the confirmation dialog
        event.returnValue = leaveMessage;
        return leaveMessage;
      }
    };

    window.addEventListener('beforeunload', this.exitBlocker);

    const navigationBlocker = (location, action) => {
      /**
       * New entry being saved and redirected to it's new slug based url.
       */
      const isPersisting = this.props.entryDraft.getIn(['entry', 'isPersisting']);
      const newRecord = this.props.entryDraft.getIn(['entry', 'newRecord']);
      const newEntryPath = `/collections/${collection.get('name')}/new`;

      if (isPersisting && newRecord && this.props.location.pathname === newEntryPath && action === 'PUSH') {
        return;
      }

      if (this.props.hasChanged) {
        return leaveMessage;
      }
    };

    const unblock = _history.default.block(navigationBlocker);
    /**
     * This will run as soon as the location actually changes, unless creating
     * a new post. The confirmation above will run first.
     */


    this.unlisten = _history.default.listen((location, action) => {
      const newEntryPath = `/collections/${collection.get('name')}/new`;
      const entriesPath = `/collections/${collection.get('name')}/entries/`;
      const pathname = location.pathname;

      if (pathname.startsWith(newEntryPath) || pathname.startsWith(entriesPath) && action === 'PUSH') {
        return;
      }

      this.deleteBackup();
      unblock();
      this.unlisten();
    });

    if (!collectionEntriesLoaded) {
      loadEntries(collection);
    }
  }

  componentDidUpdate(prevProps) {
    /**
     * If the old slug is empty and the new slug is not, a new entry was just
     * saved, and we need to update navigation to the correct url using the
     * slug.
     */
    const newSlug = this.props.entryDraft && this.props.entryDraft.getIn(['entry', 'slug']);

    if (!prevProps.slug && newSlug && this.props.newEntry) {
      navigateToEntry(prevProps.collection.get('name'), newSlug);
      this.props.loadEntry(this.props.collection, newSlug);
    }

    if (!prevProps.localBackup && this.props.localBackup) {
      const confirmLoadBackup = window.confirm(this.props.t('editor.editor.confirmLoadBackup'));

      if (confirmLoadBackup) {
        this.props.loadLocalBackup();
      } else {
        this.deleteBackup();
      }
    }

    if (this.props.hasChanged) {
      this.createBackup(this.props.entryDraft.get('entry'), this.props.collection);
    }

    if (prevProps.entry === this.props.entry) return;
    const _this$props7 = this.props,
          entry = _this$props7.entry,
          newEntry = _this$props7.newEntry,
          fields = _this$props7.fields,
          collection = _this$props7.collection;

    if (entry && !entry.get('isFetching') && !entry.get('error')) {
      /**
       * Deserialize entry values for widgets with registered serializers before
       * creating the entry draft.
       */
      const values = (0, _serializeEntryValues.deserializeValues)(entry.get('data'), fields);
      const deserializedEntry = entry.set('data', values);
      const fieldsMetaData = this.props.entryDraft && this.props.entryDraft.get('fieldsMetaData');
      this.createDraft(deserializedEntry, fieldsMetaData);
    } else if (newEntry) {
      prevProps.createEmptyDraft(collection);
    }
  }

  componentWillUnmount() {
    this.createBackup.flush();
    this.props.discardDraft();
    window.removeEventListener('beforeunload', this.exitBlocker);
  }

  deleteBackup() {
    const _this$props8 = this.props,
          deleteLocalBackup = _this$props8.deleteLocalBackup,
          collection = _this$props8.collection,
          slug = _this$props8.slug,
          newEntry = _this$props8.newEntry;
    this.createBackup.cancel();
    deleteLocalBackup(collection, !newEntry && slug);
  }

  render() {
    const _this$props9 = this.props,
          entry = _this$props9.entry,
          entryDraft = _this$props9.entryDraft,
          fields = _this$props9.fields,
          boundGetAsset = _this$props9.boundGetAsset,
          collection = _this$props9.collection,
          changeDraftField = _this$props9.changeDraftField,
          changeDraftFieldValidation = _this$props9.changeDraftFieldValidation,
          user = _this$props9.user,
          hasChanged = _this$props9.hasChanged,
          displayUrl = _this$props9.displayUrl,
          hasWorkflow = _this$props9.hasWorkflow,
          unpublishedEntry = _this$props9.unpublishedEntry,
          newEntry = _this$props9.newEntry,
          isModification = _this$props9.isModification,
          currentStatus = _this$props9.currentStatus,
          logoutUser = _this$props9.logoutUser,
          deployPreview = _this$props9.deployPreview,
          _loadDeployPreview = _this$props9.loadDeployPreview,
          slug = _this$props9.slug,
          t = _this$props9.t;
    const isPublished = !newEntry && !unpublishedEntry;

    if (entry && entry.get('error')) {
      return _react.default.createElement("div", null, _react.default.createElement("h3", null, entry.get('error')));
    } else if (entryDraft == null || entryDraft.get('entry') === undefined || entry && entry.get('isFetching')) {
      return _react.default.createElement(_netlifyCmsUiDefault.Loader, {
        active: true
      }, t('editor.editor.loadingEntry'));
    }

    return _react.default.createElement(_EditorInterface.default, {
      entry: entryDraft.get('entry'),
      getAsset: boundGetAsset,
      collection: collection,
      fields: fields,
      fieldsMetaData: entryDraft.get('fieldsMetaData'),
      fieldsErrors: entryDraft.get('fieldsErrors'),
      onChange: changeDraftField,
      onValidate: changeDraftFieldValidation,
      onPersist: this.handlePersistEntry,
      onDelete: this.handleDeleteEntry,
      onDeleteUnpublishedChanges: this.handleDeleteUnpublishedChanges,
      onChangeStatus: this.handleChangeStatus,
      onPublish: this.handlePublishEntry,
      showDelete: this.props.showDelete,
      user: user,
      hasChanged: hasChanged,
      displayUrl: displayUrl,
      hasWorkflow: hasWorkflow,
      hasUnpublishedChanges: unpublishedEntry,
      isNewEntry: newEntry,
      isModification: isModification,
      currentStatus: currentStatus,
      onLogoutClick: logoutUser,
      deployPreview: deployPreview,
      loadDeployPreview: opts => _loadDeployPreview(collection, slug, entry, isPublished, opts)
    });
  }

}

_defineProperty(Editor, "propTypes", {
  boundGetAsset: _propTypes.default.func.isRequired,
  changeDraftField: _propTypes.default.func.isRequired,
  changeDraftFieldValidation: _propTypes.default.func.isRequired,
  collection: _reactImmutableProptypes.default.map.isRequired,
  createDraftFromEntry: _propTypes.default.func.isRequired,
  createEmptyDraft: _propTypes.default.func.isRequired,
  discardDraft: _propTypes.default.func.isRequired,
  entry: _reactImmutableProptypes.default.map,
  entryDraft: _reactImmutableProptypes.default.map.isRequired,
  loadEntry: _propTypes.default.func.isRequired,
  persistEntry: _propTypes.default.func.isRequired,
  deleteEntry: _propTypes.default.func.isRequired,
  showDelete: _propTypes.default.bool.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  slug: _propTypes.default.string,
  newEntry: _propTypes.default.bool.isRequired,
  displayUrl: _propTypes.default.string,
  hasWorkflow: _propTypes.default.bool,
  unpublishedEntry: _propTypes.default.bool,
  isModification: _propTypes.default.bool,
  collectionEntriesLoaded: _propTypes.default.bool,
  updateUnpublishedEntryStatus: _propTypes.default.func.isRequired,
  publishUnpublishedEntry: _propTypes.default.func.isRequired,
  deleteUnpublishedEntry: _propTypes.default.func.isRequired,
  logoutUser: _propTypes.default.func.isRequired,
  loadEntries: _propTypes.default.func.isRequired,
  deployPreview: _reactImmutableProptypes.default.map,
  loadDeployPreview: _propTypes.default.func.isRequired,
  currentStatus: _propTypes.default.string,
  user: _reactImmutableProptypes.default.map.isRequired,
  location: _propTypes.default.shape({
    pathname: _propTypes.default.string
  }),
  hasChanged: _propTypes.default.bool,
  t: _propTypes.default.func.isRequired
});

function mapStateToProps(state, ownProps) {
  const collections = state.collections,
        entryDraft = state.entryDraft,
        auth = state.auth,
        config = state.config,
        entries = state.entries;
  const slug = ownProps.match.params.slug;
  const collection = collections.get(ownProps.match.params.name);
  const collectionName = collection.get('name');
  const newEntry = ownProps.newRecord === true;
  const fields = (0, _collections.selectFields)(collection, slug);
  const entry = newEntry ? null : (0, _reducers.selectEntry)(state, collectionName, slug);

  const boundGetAsset = _reducers.getAsset.bind(null, state);

  const user = auth && auth.get('user');
  const hasChanged = entryDraft.get('hasChanged');
  const displayUrl = config.get('display_url');

  const hasWorkflow = config.get('publish_mode') === _publishModes.EDITORIAL_WORKFLOW;

  const isModification = entryDraft.getIn(['entry', 'isModification']);
  const collectionEntriesLoaded = !!entries.getIn(['pages', collectionName]);
  const unpublishedEntry = (0, _reducers.selectUnpublishedEntry)(state, collectionName, slug);
  const currentStatus = unpublishedEntry && unpublishedEntry.getIn(['metaData', 'status']);
  const deployPreview = (0, _reducers.selectDeployPreview)(state, collectionName, slug);
  const localBackup = entryDraft.get('localBackup');
  return {
    collection,
    collections,
    newEntry,
    entryDraft,
    boundGetAsset,
    fields,
    slug,
    entry,
    user,
    hasChanged,
    displayUrl,
    hasWorkflow,
    isModification,
    collectionEntriesLoaded,
    currentStatus,
    deployPreview,
    localBackup
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  changeDraftField: _entries.changeDraftField,
  changeDraftFieldValidation: _entries.changeDraftFieldValidation,
  loadEntry: _entries.loadEntry,
  loadEntries: _entries.loadEntries,
  loadDeployPreview: _deploys.loadDeployPreview,
  loadLocalBackup: _entries.loadLocalBackup,
  retrieveLocalBackup: _entries.retrieveLocalBackup,
  persistLocalBackup: _entries.persistLocalBackup,
  deleteLocalBackup: _entries.deleteLocalBackup,
  createDraftFromEntry: _entries.createDraftFromEntry,
  createEmptyDraft: _entries.createEmptyDraft,
  discardDraft: _entries.discardDraft,
  persistEntry: _entries.persistEntry,
  deleteEntry: _entries.deleteEntry,
  updateUnpublishedEntryStatus: _editorialWorkflow.updateUnpublishedEntryStatus,
  publishUnpublishedEntry: _editorialWorkflow.publishUnpublishedEntry,
  deleteUnpublishedEntry: _editorialWorkflow.deleteUnpublishedEntry,
  logoutUser: _auth.logoutUser
})((0, _withWorkflow.default)((0, _reactPolyglot.translate)()(Editor)));

exports.default = _default;