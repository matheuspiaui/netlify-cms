"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withMapControl;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _ol = _interopRequireDefault(require("ol/ol.css"));

var _Map = _interopRequireDefault(require("ol/Map.js"));

var _View = _interopRequireDefault(require("ol/View.js"));

var _GeoJSON = _interopRequireDefault(require("ol/format/GeoJSON"));

var _Draw = _interopRequireDefault(require("ol/interaction/Draw.js"));

var _Tile = _interopRequireDefault(require("ol/layer/Tile.js"));

var _Vector = _interopRequireDefault(require("ol/layer/Vector.js"));

var _OSM = _interopRequireDefault(require("ol/source/OSM.js"));

var _Vector2 = _interopRequireDefault(require("ol/source/Vector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const formatOptions = {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857'
};

const getDefaultFormat = () => new _GeoJSON.default(formatOptions);

const getDefaultMap = (target, featuresLayer) => new _Map.default({
  target,
  layers: [new _Tile.default({
    source: new _OSM.default()
  }), featuresLayer],
  view: new _View.default({
    center: [0, 0],
    zoom: 2
  })
});

function withMapControl() {
  var _class, _temp;

  let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      getFormat = _ref.getFormat,
      getMap = _ref.getMap;

  return _temp = _class = class MapControl extends _react.default.Component {
    constructor(props) {
      super(props);
      this.mapContainer = _react.default.createRef();
    }

    componentDidMount() {
      const _this$props = this.props,
            field = _this$props.field,
            onChange = _this$props.onChange,
            value = _this$props.value;
      const format = getFormat ? getFormat(field) : getDefaultFormat(field);
      const features = value ? [format.readFeature(value)] : [];
      const featuresSource = new _Vector2.default({
        features,
        wrapX: false
      });
      const featuresLayer = new _Vector.default({
        source: featuresSource
      });
      const target = this.mapContainer.current;
      const map = getMap ? getMap(target, featuresLayer) : getDefaultMap(target, featuresLayer);

      if (features.length > 0) {
        map.getView().fit(featuresSource.getExtent(), {
          maxZoom: 16,
          padding: [80, 80, 80, 80]
        });
      }

      const draw = new _Draw.default({
        source: featuresSource,
        type: field.get('type', 'Point')
      });
      map.addInteraction(draw);
      const writeOptions = {
        decimals: field.get('decimals', 7)
      };
      draw.on('drawend', (_ref2) => {
        let feature = _ref2.feature;
        featuresSource.clear();
        onChange(format.writeGeometry(feature.getGeometry(), writeOptions));
      });
    }

    render() {
      return _react.default.createElement(_core.ClassNames, null, (_ref3) => {
        let cx = _ref3.cx,
            css = _ref3.css;
        return _react.default.createElement("div", {
          className: cx(this.props.classNameWrapper, css`
                  ${_ol.default};
                  padding: 0;
                  overflow: hidden;
                `),
          ref: this.mapContainer
        });
      });
    }

  }, _defineProperty(_class, "propTypes", {
    onChange: _propTypes.default.func.isRequired,
    field: _propTypes.default.object.isRequired,
    value: _propTypes.default.node
  }), _defineProperty(_class, "defaultProps", {
    value: ''
  }), _temp;
}