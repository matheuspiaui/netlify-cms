"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withWorkflow;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _publishModes = require("../../constants/publishModes");

var _reducers = require("../../reducers");

var _collections = require("../../reducers/collections");

var _editorialWorkflow = require("../../actions/editorialWorkflow");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mapStateToProps(state, ownProps) {
  const collections = state.collections;

  const isEditorialWorkflow = state.config.get('publish_mode') === _publishModes.EDITORIAL_WORKFLOW;

  const collection = collections.get(ownProps.match.params.name);
  const returnObj = {
    isEditorialWorkflow,
    showDelete: !ownProps.newEntry && (0, _collections.selectAllowDeletion)(collection)
  };

  if (isEditorialWorkflow) {
    const slug = ownProps.match.params.slug;
    const unpublishedEntry = (0, _reducers.selectUnpublishedEntry)(state, collection.get('name'), slug);

    if (unpublishedEntry) {
      returnObj.unpublishedEntry = true;
      returnObj.entry = unpublishedEntry;
    }
  }

  return returnObj;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const isEditorialWorkflow = stateProps.isEditorialWorkflow,
        unpublishedEntry = stateProps.unpublishedEntry;
  const dispatch = dispatchProps.dispatch;
  const returnObj = {};

  if (isEditorialWorkflow) {
    // Overwrite loadEntry to loadUnpublishedEntry
    returnObj.loadEntry = (collection, slug) => dispatch((0, _editorialWorkflow.loadUnpublishedEntry)(collection, slug)); // Overwrite persistEntry to persistUnpublishedEntry


    returnObj.persistEntry = collection => dispatch((0, _editorialWorkflow.persistUnpublishedEntry)(collection, unpublishedEntry));
  }

  return _objectSpread({}, ownProps, stateProps, returnObj);
}

function withWorkflow(Editor) {
  return (0, _reactRedux.connect)(mapStateToProps, null, mergeProps)(class WorkflowEditor extends _react.default.Component {
    render() {
      return _react.default.createElement(Editor, this.props);
    }

  });
}