"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _core = require("@emotion/core");

var _slateReact = require("slate-react");

var _slatePlainSerializer = _interopRequireDefault(require("slate-plain-serializer"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _styles = require("../styles");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styleStrings = {
  slateRaw: `
    position: relative;
    overflow: hidden;
    overflow-x: auto;
    min-height: ${_netlifyCmsUiDefault.lengths.richTextEditorMinHeight};
    font-family: ${_netlifyCmsUiDefault.fonts.mono};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0;
    margin-top: -${_styles.editorStyleVars.stickyDistanceBottom};
  `
};
const RawEditorContainer = (0, _styledBase.default)("div", {
  target: "er7tv020",
  label: "RawEditorContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "79elbk",
  styles: "position:relative;"
} : {
  name: "79elbk",
  styles: "position:relative;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvUmF3RWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBCcUMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9SYXdFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDbGFzc05hbWVzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgeyBFZGl0b3IgYXMgU2xhdGUgfSBmcm9tICdzbGF0ZS1yZWFjdCc7XG5pbXBvcnQgUGxhaW4gZnJvbSAnc2xhdGUtcGxhaW4tc2VyaWFsaXplcic7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBsZW5ndGhzLCBmb250cyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuaW1wb3J0IHsgZWRpdG9yU3R5bGVWYXJzLCBFZGl0b3JDb250cm9sQmFyIH0gZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCBUb29sYmFyIGZyb20gJy4vVG9vbGJhcic7XG5cbmNvbnN0IHN0eWxlU3RyaW5ncyA9IHtcbiAgc2xhdGVSYXc6IGBcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBvdmVyZmxvdy14OiBhdXRvO1xuICAgIG1pbi1oZWlnaHQ6ICR7bGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gICAgZm9udC1mYW1pbHk6ICR7Zm9udHMubW9ub307XG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcbiAgICBib3JkZXItdG9wOiAwO1xuICAgIG1hcmdpbi10b3A6IC0ke2VkaXRvclN0eWxlVmFycy5zdGlja3lEaXN0YW5jZUJvdHRvbX07XG4gIGAsXG59O1xuXG5jb25zdCBSYXdFZGl0b3JDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXdFZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IFBsYWluLmRlc2VyaWFsaXplKHRoaXMucHJvcHMudmFsdWUgfHwgJycpLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICByZXR1cm4gIXRoaXMuc3RhdGUudmFsdWUuZXF1YWxzKG5leHRTdGF0ZS52YWx1ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UgPSBjaGFuZ2UgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS52YWx1ZS5kb2N1bWVudC5lcXVhbHMoY2hhbmdlLnZhbHVlLmRvY3VtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVEb2N1bWVudENoYW5nZShjaGFuZ2UpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGNoYW5nZS52YWx1ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogV2hlbiB0aGUgZG9jdW1lbnQgdmFsdWUgY2hhbmdlcywgc2VyaWFsaXplIGZyb20gU2xhdGUncyBBU1QgYmFjayB0byBwbGFpblxuICAgKiB0ZXh0ICh3aGljaCBpcyBNYXJrZG93bikgYW5kIHBhc3MgdGhhdCB1cCBhcyB0aGUgbmV3IHZhbHVlLlxuICAgKi9cbiAgaGFuZGxlRG9jdW1lbnRDaGFuZ2UgPSBkZWJvdW5jZShjaGFuZ2UgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gUGxhaW4uc2VyaWFsaXplKGNoYW5nZS52YWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG4gIH0sIDE1MCk7XG5cbiAgLyoqXG4gICAqIElmIGEgcGFzdGUgY29udGFpbnMgcGxhaW4gdGV4dCwgZGVzZXJpYWxpemUgaXQgdG8gU2xhdGUncyBBU1QgYW5kIGluc2VydFxuICAgKiB0byB0aGUgZG9jdW1lbnQuIFNlbGVjdGlvbiBsb2dpYyAod2hlcmUgdG8gaW5zZXJ0LCB3aGV0aGVyIHRvIHJlcGxhY2UpIGlzXG4gICAqIGhhbmRsZWQgYnkgU2xhdGUuXG4gICAqL1xuICBoYW5kbGVQYXN0ZSA9IChlLCBkYXRhLCBjaGFuZ2UpID0+IHtcbiAgICBpZiAoZGF0YS50ZXh0KSB7XG4gICAgICBjb25zdCBmcmFnbWVudCA9IFBsYWluLmRlc2VyaWFsaXplKGRhdGEudGV4dCkuZG9jdW1lbnQ7XG4gICAgICByZXR1cm4gY2hhbmdlLmluc2VydEZyYWdtZW50KGZyYWdtZW50KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlVG9nZ2xlTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uTW9kZSgndmlzdWFsJyk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBmaWVsZCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFJhd0VkaXRvckNvbnRhaW5lcj5cbiAgICAgICAgPEVkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgIG9uVG9nZ2xlTW9kZT17dGhpcy5oYW5kbGVUb2dnbGVNb2RlfVxuICAgICAgICAgICAgYnV0dG9ucz17ZmllbGQuZ2V0KCdidXR0b25zJyl9XG4gICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgcmF3TW9kZVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRWRpdG9yQ29udHJvbEJhcj5cbiAgICAgICAgPENsYXNzTmFtZXM+XG4gICAgICAgICAgeyh7IGNzcywgY3ggfSkgPT4gKFxuICAgICAgICAgICAgPFNsYXRlXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNzc2BcbiAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLnNsYXRlUmF3fVxuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uUGFzdGU9e3RoaXMuaGFuZGxlUGFzdGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIDwvUmF3RWRpdG9yQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuUmF3RWRpdG9yLnByb3BUeXBlcyA9IHtcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTW9kZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZDogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxufTtcbiJdfQ== */"
});

class RawEditor extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", change => {
      if (!this.state.value.document.equals(change.value.document)) {
        this.handleDocumentChange(change);
      }

      this.setState({
        value: change.value
      });
    });

    _defineProperty(this, "handleDocumentChange", (0, _debounce2.default)(change => {
      const value = _slatePlainSerializer.default.serialize(change.value);

      this.props.onChange(value);
    }, 150));

    _defineProperty(this, "handlePaste", (e, data, change) => {
      if (data.text) {
        const fragment = _slatePlainSerializer.default.deserialize(data.text).document;

        return change.insertFragment(fragment);
      }
    });

    _defineProperty(this, "handleToggleMode", () => {
      this.props.onMode('visual');
    });

    this.state = {
      value: _slatePlainSerializer.default.deserialize(this.props.value || '')
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.value.equals(nextState.value);
  }

  render() {
    const _this$props = this.props,
          className = _this$props.className,
          field = _this$props.field;
    return _react.default.createElement(RawEditorContainer, null, _react.default.createElement(_styles.EditorControlBar, null, _react.default.createElement(_Toolbar.default, {
      onToggleMode: this.handleToggleMode,
      buttons: field.get('buttons'),
      disabled: true,
      rawMode: true
    })), _react.default.createElement(_core.ClassNames, null, (_ref) => {
      let css = _ref.css,
          cx = _ref.cx;
      return _react.default.createElement(_slateReact.Editor, {
        className: cx(className, css`
                  ${styleStrings.slateRaw}
                `),
        value: this.state.value,
        onChange: this.handleChange,
        onPaste: this.handlePaste
      });
    }));
  }

}

exports.default = RawEditor;
RawEditor.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  onMode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired
};