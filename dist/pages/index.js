'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _videolist = require('./../components/videolist.js');

var _videolist2 = _interopRequireDefault(_videolist);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _db = require('./../utils/db.js');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '天籁音钢琴艺术教室'
    }, _this.components = {
      panel: _panel2.default,
      videolist: _videolist2.default
    }, _this.data = {}, _this.methods = {
      tap: function tap() {
        console.log(this.$name);
        _db2.default.insertData();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJwYW5lbCIsInZpZGVvbGlzdCIsImRhdGEiLCJtZXRob2RzIiwidGFwIiwiY29uc29sZSIsImxvZyIsIiRuYW1lIiwiaW5zZXJ0RGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYTtBQUNYQyw0QkFEVztBQUVYQztBQUZXLEssUUFJYkMsSSxHQUFPLEUsUUFHUEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTEMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLQyxLQUFqQjtBQUNBLHFCQUFHQyxVQUFIO0FBQ0Q7QUFKTyxLOzs7Ozs2QkFNRCxDQUFFOzs7O0VBakJzQixlQUFLQyxJOztrQkFBbkJiLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBWaWRlb0xpc3QgZnJvbSAnLi4vY29tcG9uZW50cy92aWRlb2xpc3QnXHJcbiAgaW1wb3J0IFBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnXHJcbiAgaW1wb3J0IGRiIGZyb20gJy4uL3V0aWxzL2RiJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wkqeexgemfs+mSoueQtOiJuuacr+aVmeWupCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIHBhbmVsOiBQYW5lbCxcclxuICAgICAgdmlkZW9saXN0OiBWaWRlb0xpc3RcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcblxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgdGFwICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRuYW1lKVxyXG4gICAgICAgIGRiLmluc2VydERhdGEoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7fVxyXG4gIH1cclxuXHJcbiJdfQ==