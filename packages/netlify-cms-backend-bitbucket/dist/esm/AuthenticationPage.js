"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _netlifyCmsLibAuth = require("netlify-cms-lib-auth");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const LoginButtonIcon = (
/*#__PURE__*/
0, _styledBase.default)(_netlifyCmsUiDefault.Icon, {
  target: "eu4xeqg0",
  label: "LoginButtonIcon"
})(process.env.NODE_ENV === "production" ? {
  name: "x0sdsu",
  styles: "margin-right:18px;"
} : {
  name: "x0sdsu",
  styles: "margin-right:18px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT29DIiwiZmlsZSI6Ii4uLy4uL3NyYy9BdXRoZW50aWNhdGlvblBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBOZXRsaWZ5QXV0aGVudGljYXRvciwgSW1wbGljaXRBdXRoZW50aWNhdG9yIH0gZnJvbSAnbmV0bGlmeS1jbXMtbGliLWF1dGgnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25QYWdlLCBJY29uIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IExvZ2luQnV0dG9uSWNvbiA9IHN0eWxlZChJY29uKWBcbiAgbWFyZ2luLXJpZ2h0OiAxOHB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQml0YnVja2V0QXV0aGVudGljYXRpb25QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkxvZ2luOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGluUHJvZ3Jlc3M6IFByb3BUeXBlcy5ib29sLFxuICAgIGJhc2VfdXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNpdGVJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRoRW5kcG9pbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29uZmlnOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLFxuICAgIGNsZWFySGFzaDogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGUgPSB7fTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBhdXRoVHlwZSA9IHRoaXMucHJvcHMuY29uZmlnLmdldEluKFsnYmFja2VuZCcsICdhdXRoX3R5cGUnXSk7XG4gICAgaWYgKGF1dGhUeXBlID09PSAnaW1wbGljaXQnKSB7XG4gICAgICB0aGlzLmF1dGggPSBuZXcgSW1wbGljaXRBdXRoZW50aWNhdG9yKHtcbiAgICAgICAgYmFzZV91cmw6IHRoaXMucHJvcHMuY29uZmlnLmdldEluKFsnYmFja2VuZCcsICdiYXNlX3VybCddLCAnaHR0cHM6Ly9iaXRidWNrZXQub3JnJyksXG4gICAgICAgIGF1dGhfZW5kcG9pbnQ6IHRoaXMucHJvcHMuY29uZmlnLmdldEluKFxuICAgICAgICAgIFsnYmFja2VuZCcsICdhdXRoX2VuZHBvaW50J10sXG4gICAgICAgICAgJ3NpdGUvb2F1dGgyL2F1dGhvcml6ZScsXG4gICAgICAgICksXG4gICAgICAgIGFwcF9pZDogdGhpcy5wcm9wcy5jb25maWcuZ2V0SW4oWydiYWNrZW5kJywgJ2FwcF9pZCddKSxcbiAgICAgICAgY2xlYXJIYXNoOiB0aGlzLnByb3BzLmNsZWFySGFzaCxcbiAgICAgIH0pO1xuICAgICAgLy8gQ29tcGxldGUgaW1wbGljaXQgYXV0aGVudGljYXRpb24gaWYgd2Ugd2VyZSByZWRpcmVjdGVkIGJhY2sgdG8gZnJvbSB0aGUgcHJvdmlkZXIuXG4gICAgICB0aGlzLmF1dGguY29tcGxldGVBdXRoKChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2dpbkVycm9yOiBlcnIudG9TdHJpbmcoKSB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vbkxvZ2luKGRhdGEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmF1dGhTZXR0aW5ncyA9IHsgc2NvcGU6ICdyZXBvc2l0b3J5OndyaXRlJyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF1dGggPSBuZXcgTmV0bGlmeUF1dGhlbnRpY2F0b3Ioe1xuICAgICAgICBiYXNlX3VybDogdGhpcy5wcm9wcy5iYXNlX3VybCxcbiAgICAgICAgc2l0ZV9pZDpcbiAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ob3N0LnNwbGl0KCc6JylbMF0gPT09ICdsb2NhbGhvc3QnXG4gICAgICAgICAgICA/ICdjbXMubmV0bGlmeS5jb20nXG4gICAgICAgICAgICA6IHRoaXMucHJvcHMuc2l0ZUlkLFxuICAgICAgICBhdXRoX2VuZHBvaW50OiB0aGlzLnByb3BzLmF1dGhFbmRwb2ludCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5hdXRoU2V0dGluZ3MgPSB7IHByb3ZpZGVyOiAnYml0YnVja2V0Jywgc2NvcGU6ICdyZXBvJyB9O1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUxvZ2luID0gZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuYXV0aC5hdXRoZW50aWNhdGUodGhpcy5hdXRoU2V0dGluZ3MsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvZ2luRXJyb3I6IGVyci50b1N0cmluZygpIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLm9uTG9naW4oZGF0YSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaW5Qcm9ncmVzcywgY29uZmlnIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxBdXRoZW50aWNhdGlvblBhZ2VcbiAgICAgICAgb25Mb2dpbj17dGhpcy5oYW5kbGVMb2dpbn1cbiAgICAgICAgbG9naW5EaXNhYmxlZD17aW5Qcm9ncmVzc31cbiAgICAgICAgbG9naW5FcnJvck1lc3NhZ2U9e3RoaXMuc3RhdGUubG9naW5FcnJvcn1cbiAgICAgICAgbG9nb1VybD17Y29uZmlnLmdldCgnbG9nb191cmwnKX1cbiAgICAgICAgcmVuZGVyQnV0dG9uQ29udGVudD17KCkgPT4gKFxuICAgICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgIDxMb2dpbkJ1dHRvbkljb24gdHlwZT1cImJpdGJ1Y2tldFwiIC8+XG4gICAgICAgICAgICB7aW5Qcm9ncmVzcyA/ICdMb2dnaW5nIGluLi4uJyA6ICdMb2dpbiB3aXRoIEJpdGJ1Y2tldCd9XG4gICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl19 */"
});

class BitbucketAuthenticationPage extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {});

    _defineProperty(this, "handleLogin", e => {
      e.preventDefault();
      this.auth.authenticate(this.authSettings, (err, data) => {
        if (err) {
          this.setState({
            loginError: err.toString()
          });
          return;
        }

        this.props.onLogin(data);
      });
    });
  }

  componentDidMount() {
    const authType = this.props.config.getIn(['backend', 'auth_type']);

    if (authType === 'implicit') {
      this.auth = new _netlifyCmsLibAuth.ImplicitAuthenticator({
        base_url: this.props.config.getIn(['backend', 'base_url'], 'https://bitbucket.org'),
        auth_endpoint: this.props.config.getIn(['backend', 'auth_endpoint'], 'site/oauth2/authorize'),
        app_id: this.props.config.getIn(['backend', 'app_id']),
        clearHash: this.props.clearHash
      }); // Complete implicit authentication if we were redirected back to from the provider.

      this.auth.completeAuth((err, data) => {
        if (err) {
          this.setState({
            loginError: err.toString()
          });
          return;
        }

        this.props.onLogin(data);
      });
      this.authSettings = {
        scope: 'repository:write'
      };
    } else {
      this.auth = new _netlifyCmsLibAuth.NetlifyAuthenticator({
        base_url: this.props.base_url,
        site_id: document.location.host.split(':')[0] === 'localhost' ? 'cms.netlify.com' : this.props.siteId,
        auth_endpoint: this.props.authEndpoint
      });
      this.authSettings = {
        provider: 'bitbucket',
        scope: 'repo'
      };
    }
  }

  render() {
    const _this$props = this.props,
          inProgress = _this$props.inProgress,
          config = _this$props.config;
    return _react.default.createElement(_netlifyCmsUiDefault.AuthenticationPage, {
      onLogin: this.handleLogin,
      loginDisabled: inProgress,
      loginErrorMessage: this.state.loginError,
      logoUrl: config.get('logo_url'),
      renderButtonContent: () => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(LoginButtonIcon, {
        type: "bitbucket"
      }), inProgress ? 'Logging in...' : 'Login with Bitbucket')
    });
  }

}

exports.default = BitbucketAuthenticationPage;

_defineProperty(BitbucketAuthenticationPage, "propTypes", {
  onLogin: _propTypes.default.func.isRequired,
  inProgress: _propTypes.default.bool,
  base_url: _propTypes.default.string,
  siteId: _propTypes.default.string,
  authEndpoint: _propTypes.default.string,
  config: _reactImmutableProptypes.default.map,
  clearHash: _propTypes.default.func
});