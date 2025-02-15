"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _styles = require("../styles");

var _default = `
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  min-height: ${_netlifyCmsUiDefault.lengths.richTextEditorMinHeight};
  font-family: ${_netlifyCmsUiDefault.fonts.primary};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  margin-top: -${_styles.editorStyleVars.stickyDistanceBottom};

  h1 {
    font-size: 32px;
    margin-top: 16px;
  }

  h2 {
    font-size: 24px;
    margin-top: 12px;
  }

  h3 {
    font-size: 20px;
    margin-top: 8px;
  }

  h4 {
    font-size: 18px;
    margin-top: 8px;
  }

  h5,
  h6 {
    font-size: 16px;
    margin-top: 8px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: 1;
  }

  p,
  pre,
  blockquote,
  ul,
  ol {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  a {
    text-decoration: underline;
  }

  hr {
    border: 1px solid;
    margin-bottom: 16px;
  }

  li > p {
    margin: 0;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  pre {
    white-space: pre-wrap;
  }

  code {
    background-color: ${_netlifyCmsUiDefault.colors.background};
    border-radius: ${_netlifyCmsUiDefault.lengths.borderRadius};
    padding: 0 2px;
    font-size: 85%;
  }

  pre > code {
    display: block;
    width: 100%;
    overflow-y: auto;
    background-color: #000;
    color: #ccc;
    border-radius: ${_netlifyCmsUiDefault.lengths.borderRadius};
    padding: 10px;
  }

  blockquote {
    padding-left: 16px;
    border-left: 3px solid ${_netlifyCmsUiDefault.colors.background};
    margin-left: 0;
    margin-right: 0;
  }

  table {
    border-collapse: collapse;
  }

  td,
  th {
    border: 2px solid black;
    padding: 8px;
    text-align: left;
  }
`;
exports.default = _default;