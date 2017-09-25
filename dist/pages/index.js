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
    }, _this.$props = { "videolist": { "xmlns:v-bind": "", "v-bind:list.sync": "list", "v-bind:likearray.sync": "likearray" } }, _this.$events = {}, _this.components = {
      panel: _panel2.default,
      videolist: _videolist2.default
    }, _this.data = {
      list: [],
      userInfo: {},
      likearray: []
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      this.userInfo = this.$parent.getUserInfo();
      console.log('index onLoad');
    }
  }, {
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('index onShow');
                _context.next = 3;
                return _db2.default.getList();

              case 3:
                res = _context.sent;

                this.list = res.data;
                this.likearray = res.like_array;
                console.log(this.likearray);
                //console.log(this.list)
                this.$apply();

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onShow() {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: 'onPullDownRefresh',
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

                //console.log(res.data)
                this.list = res.data;
                this.likearray = res.like_array;
                console.log(this.likearray);
                this.$apply();
                console.log('刷新');

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onPullDownRefresh() {
        return _ref3.apply(this, arguments);
      }

      return onPullDownRefresh;
    }()
  }, {
    key: 'onReachBottom',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                //let res = await db.getList()
                //console.log(res.data)
                //this.list = res.data
                //this.$apply()
                console.log('下一页');

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onReachBottom() {
        return _ref4.apply(this, arguments);
      }

      return onReachBottom;
    }()
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGFuZWwiLCJ2aWRlb2xpc3QiLCJkYXRhIiwibGlzdCIsInVzZXJJbmZvIiwibGlrZWFycmF5IiwibWV0aG9kcyIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsImNvbnNvbGUiLCJsb2ciLCJnZXRMaXN0IiwicmVzIiwibGlrZV9hcnJheSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLFdBRGpCO0FBRVBDLDZCQUF1QjtBQUZoQixLLFFBSVZDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsTUFBdEMsRUFBNkMseUJBQXdCLFdBQXJFLEVBQWIsRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkMsNEJBRFE7QUFFUkM7QUFGUSxLLFFBSVZDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsZ0JBQVMsRUFGSjtBQUdMQyxpQkFBVztBQUhOLEssUUFLUEMsTyxHQUFVLEU7Ozs7OzZCQUVEO0FBQ1AsV0FBS0YsUUFBTCxHQUFnQixLQUFLRyxPQUFMLENBQWFDLFdBQWIsRUFBaEI7QUFDQUMsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7Ozs7Ozs7OztBQUdDRCx3QkFBUUMsR0FBUixDQUFZLGNBQVo7O3VCQUNnQixhQUFHQyxPQUFILEU7OztBQUFaQyxtQjs7QUFDSixxQkFBS1QsSUFBTCxHQUFXUyxJQUFJVixJQUFmO0FBQ0EscUJBQUtHLFNBQUwsR0FBaUJPLElBQUlDLFVBQXJCO0FBQ0FKLHdCQUFRQyxHQUFSLENBQVksS0FBS0wsU0FBakI7QUFDQTtBQUNBLHFCQUFLUyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFHZ0IsYUFBR0gsT0FBSCxFOzs7QUFBWkMsbUI7O0FBQ0o7QUFDQSxxQkFBS1QsSUFBTCxHQUFZUyxJQUFJVixJQUFoQjtBQUNBLHFCQUFLRyxTQUFMLEdBQWlCTyxJQUFJQyxVQUFyQjtBQUNBSix3QkFBUUMsR0FBUixDQUFZLEtBQUtMLFNBQWpCO0FBQ0EscUJBQUtTLE1BQUw7QUFDQUwsd0JBQVFDLEdBQVIsQ0FBWSxJQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRCx3QkFBUUMsR0FBUixDQUFZLEtBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEvQytCLGVBQUtLLEk7O2tCQUFuQnRCLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBWaWRlb0xpc3QgZnJvbSAnLi4vY29tcG9uZW50cy92aWRlb2xpc3QnXHJcbiAgaW1wb3J0IFBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnXHJcbiAgaW1wb3J0IGRiIGZyb20gJy4uL3V0aWxzL2RiJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wkqeexgemfs+mSoueQtOiJuuacr+aVmeWupCcsXHJcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gICAgfVxyXG4gICAkcHJvcHMgPSB7XCJ2aWRlb2xpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxpc3Quc3luY1wiOlwibGlzdFwiLFwidi1iaW5kOmxpa2VhcnJheS5zeW5jXCI6XCJsaWtlYXJyYXlcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBwYW5lbDogUGFuZWwsXHJcbiAgICAgIHZpZGVvbGlzdDogVmlkZW9MaXN0XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBsaXN0OiBbXSxcclxuICAgICAgdXNlckluZm86e30sXHJcbiAgICAgIGxpa2VhcnJheTogW11cclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKVxyXG4gICAgICBjb25zb2xlLmxvZygnaW5kZXggb25Mb2FkJylcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblNob3coKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdpbmRleCBvblNob3cnKVxyXG4gICAgICBsZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIHRoaXMubGlzdD0gcmVzLmRhdGFcclxuICAgICAgdGhpcy5saWtlYXJyYXkgPSByZXMubGlrZV9hcnJheVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxpa2VhcnJheSlcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxpc3QpXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuICAgIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgbGV0IHJlcyA9IGF3YWl0IGRiLmdldExpc3QoKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YVxyXG4gICAgICB0aGlzLmxpa2VhcnJheSA9IHJlcy5saWtlX2FycmF5XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlrZWFycmF5KVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCfliLfmlrAnKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICAvL2xldCByZXMgPSBhd2FpdCBkYi5nZXRMaXN0KClcclxuICAgICAgLy9jb25zb2xlLmxvZyhyZXMuZGF0YSlcclxuICAgICAgLy90aGlzLmxpc3QgPSByZXMuZGF0YVxyXG4gICAgICAvL3RoaXMuJGFwcGx5KClcclxuICAgICAgY29uc29sZS5sb2coJ+S4i+S4gOmhtScpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuIl19