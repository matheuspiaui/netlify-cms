"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _reactModal = _interopRequireDefault(require("react-modal"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = process.env.NODE_ENV === "production" ? {
  name: "10pkfx2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;}label:ReactModalGlobalStyles;"
} : {
  name: "10pkfx2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;}label:ReactModalGlobalStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL01vZGFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFlIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL01vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCwgQ2xhc3NOYW1lcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IFJlYWN0TW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xuaW1wb3J0IHsgdHJhbnNpdGlvbnMsIHNoYWRvd3MsIGxlbmd0aHMgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuY29uc3QgUmVhY3RNb2RhbEdsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgLlJlYWN0TW9kYWxfX0JvZHktLW9wZW4ge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZVN0cmluZ3MgPSB7XG4gIG1vZGFsQm9keTogYFxuICAgICR7c2hhZG93cy5kcm9wRGVlcH07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAke2xlbmd0aHMuYm9yZGVyUmFkaXVzfTtcbiAgICBoZWlnaHQ6IDgwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWF4LXdpZHRoOiAyMjAwcHg7XG4gICAgcGFkZGluZzogMjBweDtcblxuICAgICY6Zm9jdXMge1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG4gIGAsXG4gIG92ZXJsYXk6IGBcbiAgICB6LWluZGV4OiA5OTk5OTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAke3RyYW5zaXRpb25zLm1haW59LCBvcGFjaXR5ICR7dHJhbnNpdGlvbnMubWFpbn07XG4gIGAsXG4gIG92ZXJsYXlBZnRlck9wZW46IGBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgb3BhY2l0eTogMTtcbiAgYCxcbiAgb3ZlcmxheUJlZm9yZUNsb3NlOiBgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgICBvcGFjaXR5OiAwO1xuICBgLFxufTtcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICBpc09wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgUmVhY3RNb2RhbC5zZXRBcHBFbGVtZW50KCcjbmMtcm9vdCcpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNPcGVuLCBjaGlsZHJlbiwgY2xhc3NOYW1lLCBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8UmVhY3RNb2RhbEdsb2JhbFN0eWxlcyAvPlxuICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICB7KHsgY3NzLCBjeCB9KSA9PiAoXG4gICAgICAgICAgICA8UmVhY3RNb2RhbFxuICAgICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsb3NlVGltZW91dE1TPXszMDB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17e1xuICAgICAgICAgICAgICAgIGJhc2U6IGN4KFxuICAgICAgICAgICAgICAgICAgY3NzYFxuICAgICAgICAgICAgICAgICAgICAke3N0eWxlU3RyaW5ncy5tb2RhbEJvZHl9O1xuICAgICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGFmdGVyT3BlbjogJycsXG4gICAgICAgICAgICAgICAgYmVmb3JlQ2xvc2U6ICcnLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBvdmVybGF5Q2xhc3NOYW1lPXt7XG4gICAgICAgICAgICAgICAgYmFzZTogY3NzYFxuICAgICAgICAgICAgICAgICAgJHtzdHlsZVN0cmluZ3Mub3ZlcmxheX07XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICBhZnRlck9wZW46IGNzc2BcbiAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLm92ZXJsYXlBZnRlck9wZW59O1xuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICAgYmVmb3JlQ2xvc2U6IGNzc2BcbiAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLm92ZXJsYXlCZWZvcmVDbG9zZX07XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgPC9SZWFjdE1vZGFsPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */"
};

const ReactModalGlobalStyles = () => _react.default.createElement(_core.Global, {
  styles: _ref
});

const styleStrings = {
  modalBody: `
    ${_netlifyCmsUiDefault.shadows.dropDeep};
    background-color: #fff;
    border-radius: ${_netlifyCmsUiDefault.lengths.borderRadius};
    height: 80%;
    text-align: center;
    max-width: 2200px;
    padding: 20px;

    &:focus {
      outline: none;
    }
  `,
  overlay: `
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color ${_netlifyCmsUiDefault.transitions.main}, opacity ${_netlifyCmsUiDefault.transitions.main};
  `,
  overlayAfterOpen: `
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
  `,
  overlayBeforeClose: `
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
  `
};

class Modal extends _react.default.Component {
  componentDidMount() {
    _reactModal.default.setAppElement('#nc-root');
  }

  render() {
    const _this$props = this.props,
          isOpen = _this$props.isOpen,
          children = _this$props.children,
          className = _this$props.className,
          onClose = _this$props.onClose;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ReactModalGlobalStyles, null), _react.default.createElement(_core.ClassNames, null, (_ref2) => {
      let css = _ref2.css,
          cx = _ref2.cx;
      return _react.default.createElement(_reactModal.default, {
        isOpen: isOpen,
        onRequestClose: onClose,
        closeTimeoutMS: 300,
        className: {
          base: cx(css`
                    ${styleStrings.modalBody};
                  `, className),
          afterOpen: '',
          beforeClose: ''
        },
        overlayClassName: {
          base: css`
                  ${styleStrings.overlay};
                `,
          afterOpen: css`
                  ${styleStrings.overlayAfterOpen};
                `,
          beforeClose: css`
                  ${styleStrings.overlayBeforeClose};
                `
        }
      }, children);
    }));
  }

}

exports.Modal = Modal;

_defineProperty(Modal, "propTypes", {
  children: _propTypes.default.node.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  className: _propTypes.default.string,
  onClose: _propTypes.default.func.isRequired
});