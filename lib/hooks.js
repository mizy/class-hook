"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.find.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addHook;
exports.addState = addState;
exports.addEffect = addEffect;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var now = {
  current: undefined
};

function addHook(WrappedComponent) {
  var Helper = /*#__PURE__*/function (_React$Component) {
    _inherits(Helper, _React$Component);

    var _super = _createSuper(Helper);

    function Helper(props) {
      var _this;

      _classCallCheck(this, Helper);

      _this = _super.call(this);

      _defineProperty(_assertThisInitialized(_this), "states", []);

      _defineProperty(_assertThisInitialized(_this), "effects", []);

      _defineProperty(_assertThisInitialized(_this), "init", true);

      _defineProperty(_assertThisInitialized(_this), "statesIndex", 0);

      _defineProperty(_assertThisInitialized(_this), "effectsIndex", 0);

      return _this;
    }

    _createClass(Helper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.init = false;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.statesIndex = 0;
        this.effectsIndex = 0;
      }
    }, {
      key: "render",
      value: function render() {
        now.current = this;
        this.clear();

        var _this$props = this.props,
            forwardedRef = _this$props.forwardedRef,
            rest = _objectWithoutProperties(_this$props, ["forwardedRef"]);

        return /*#__PURE__*/_react.default.createElement(WrappedComponent, _extends({}, rest, {
          ref: forwardedRef
        }));
      }
    }]);

    return Helper;
  }(_react.default.Component);

  return /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
    return /*#__PURE__*/_react.default.createElement(Helper, _extends({}, props, {
      forwardedRef: ref
    }));
  });
}

function addState(initialValue) {
  var _now$current = now.current,
      states = _now$current.states,
      init = _now$current.init,
      statesIndex = _now$current.statesIndex;
  var nowComponent = now.current;
  var value = initialValue;
  var nowIndex = now.current.statesIndex;

  if (init) {
    states.push(initialValue);
  } else {
    value = states[statesIndex];
  }

  nowComponent.statesIndex++;
  return [value, function (v) {
    states[nowIndex] = v;
    nowComponent.setState(_toConsumableArray(states));
  }];
}

function addEffect(callback) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var _now$current2 = now.current,
      effects = _now$current2.effects,
      init = _now$current2.init;
  var nowComponent = now.current;
  var nowIndex = now.current.effectsIndex;

  if (init) {
    effects.push(args);
    nowComponent.effectsIndex++;

    if (args.length === 0) {
      callback();
    }
  } else {
    var values = effects[nowIndex];
    nowComponent.effectsIndex++;

    if (args.find(function (item, index) {
      return item !== values[index];
    })) {
      callback();
      effects[nowIndex] = args;
    }
  }
}

function addMemo(callback) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var _now$current3 = now.current,
      effects = _now$current3.effects,
      init = _now$current3.init;
  var nowComponent = now.current;
  var nowIndex = now.current.effectsIndex;

  if (init) {
    effects.push(args);
    nowComponent.effectsIndex++;

    if (args.length === 0) {
      return callback();
    }
  } else {
    var values = effects[nowIndex];
    nowComponent.effectsIndex++;

    if (args.find(function (item, index) {
      return item !== values[index];
    })) {
      effects[nowIndex] = args;
      return callback();
    }
  }
}
