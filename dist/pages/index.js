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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      navigationBarTitleText: '天籁音钢琴艺术教室',
      enablePullDownRefresh: true
    }, _this.$props = { "videolist": { "xmlns:v-bind": "", "v-bind:list.sync": "{{list}}" } }, _this.$events = {}, _this.components = {
      panel: _panel2.default,
      videolist: _videolist2.default
    }, _this.data = {
      list: []
    }, _this.methods = {
      tap: function tap() {
        console.log(this.$name);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onPullDownRefresh',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _db2.default.getList();

              case 2:
                res = _context.sent;

                console.log(res.data);
                this.list = res.data;
                this.$apply();
                console.log('刷新');

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onPullDownRefresh() {
        return _ref2.apply(this, arguments);
      }

      return onPullDownRefresh;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _db2.default.getList();

              case 2:
                res = _context2.sent;

                console.log(res.data);
                this.list = res.data;
                this.$apply();
                console.log('circle 下一页');

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onReachBottom() {
        return _ref3.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGFuZWwiLCJ2aWRlb2xpc3QiLCJkYXRhIiwibGlzdCIsIm1ldGhvZHMiLCJ0YXAiLCJjb25zb2xlIiwibG9nIiwiJG5hbWUiLCJnZXRMaXN0IiwicmVzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsV0FEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFJVkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixVQUF0QyxFQUFiLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDLDRCQURRO0FBRVJDO0FBRlEsSyxRQUlWQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFHUEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTEMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLQyxLQUFqQjtBQUNEO0FBSE8sSzs7Ozs7NkJBS0QsQ0FBRTs7OzZCQUVGLENBRVI7Ozs7Ozs7Ozs7O3VCQUVpQixhQUFHQyxPQUFILEU7OztBQUFaQyxtQjs7QUFDSkosd0JBQVFDLEdBQVIsQ0FBWUcsSUFBSVIsSUFBaEI7QUFDQSxxQkFBS0MsSUFBTCxHQUFZTyxJQUFJUixJQUFoQjtBQUNBLHFCQUFLUyxNQUFMO0FBQ0NMLHdCQUFRQyxHQUFSLENBQVksSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBSWUsYUFBR0UsT0FBSCxFOzs7QUFBWkMsbUI7O0FBQ0pKLHdCQUFRQyxHQUFSLENBQVlHLElBQUlSLElBQWhCO0FBQ0EscUJBQUtDLElBQUwsR0FBWU8sSUFBSVIsSUFBaEI7QUFDQSxxQkFBS1MsTUFBTDtBQUNDTCx3QkFBUUMsR0FBUixDQUFZLFlBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFyQzhCLGVBQUtLLEk7O2tCQUFuQm5CLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBWaWRlb0xpc3QgZnJvbSAnLi4vY29tcG9uZW50cy92aWRlb2xpc3QnXHJcbiAgaW1wb3J0IFBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnXHJcbiAgaW1wb3J0IGRiIGZyb20gJy4uL3V0aWxzL2RiJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wkqeexgemfs+mSoueQtOiJuuacr+aVmeWupCcsXHJcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gICAgfVxyXG4gICAkcHJvcHMgPSB7XCJ2aWRlb2xpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwie3tsaXN0fX1cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBwYW5lbDogUGFuZWwsXHJcbiAgICAgIHZpZGVvbGlzdDogVmlkZW9MaXN0XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBsaXN0OiBbXVxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgdGFwICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRuYW1lKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7fVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuXHJcbiAgICB9XHJcbiAgICBhc3luYyBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgIGxldCByZXMgPSBhd2FpdCBkYi5nZXRMaXN0KClcclxuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXHJcbiAgICAgIHRoaXMubGlzdCA9IHJlcy5kYXRhXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgIGNvbnNvbGUubG9nKCfliLfmlrAnKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgbGV0IHJlcyA9IGF3YWl0IGRiLmdldExpc3QoKVxyXG4gICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcclxuICAgICAgdGhpcy5saXN0ID0gcmVzLmRhdGFcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgY29uc29sZS5sb2coJ2NpcmNsZSDkuIvkuIDpobUnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuIl19