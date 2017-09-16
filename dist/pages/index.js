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
    }, _this.$props = { "videolist": { "xmlns:v-bind": "", "v-bind:list.sync": "list" } }, _this.$events = {}, _this.components = {
      panel: _panel2.default,
      videolist: _videolist2.default
    }, _this.data = {
      list: [],
      userInfo: {}
    }, _this.methods = {
      tap: function tap() {
        console.log(this.$name);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
                this.$apply();
                console.log("this.list");
                console.log(this.list);

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

                console.log(res.data);
                this.list = res.data;
                this.$apply();
                console.log('刷新');

              case 7:
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
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _db2.default.getList();

              case 2:
                res = _context3.sent;

                console.log(res.data);
                this.list = res.data;
                this.$apply();
                console.log('circle 下一页');

              case 7:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGFuZWwiLCJ2aWRlb2xpc3QiLCJkYXRhIiwibGlzdCIsInVzZXJJbmZvIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCIkbmFtZSIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsImdldExpc3QiLCJyZXMiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixXQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxRQUlWQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLE1BQXRDLEVBQWIsRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkMsNEJBRFE7QUFFUkM7QUFGUSxLLFFBSVZDLEksR0FBTztBQUNMQyxZQUFNLEVBREQ7QUFFTEMsZ0JBQVM7QUFGSixLLFFBSVBDLE8sR0FBVTtBQUNSQyxTQURRLGlCQUNEO0FBQ0xDLGdCQUFRQyxHQUFSLENBQVksS0FBS0MsS0FBakI7QUFDRDtBQUhPLEs7Ozs7OzZCQUtEO0FBQ1AsV0FBS0wsUUFBTCxHQUFnQixLQUFLTSxPQUFMLENBQWFDLFdBQWIsRUFBaEI7QUFDQUosY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7Ozs7Ozs7OztBQUdDRCx3QkFBUUMsR0FBUixDQUFZLGNBQVo7O3VCQUNnQixhQUFHSSxPQUFILEU7OztBQUFaQyxtQjs7QUFDSixxQkFBS1YsSUFBTCxHQUFXVSxJQUFJWCxJQUFmO0FBQ0EscUJBQUtZLE1BQUw7QUFDQVAsd0JBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0FELHdCQUFRQyxHQUFSLENBQVksS0FBS0wsSUFBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUdnQixhQUFHUyxPQUFILEU7OztBQUFaQyxtQjs7QUFDSk4sd0JBQVFDLEdBQVIsQ0FBWUssSUFBSVgsSUFBaEI7QUFDQSxxQkFBS0MsSUFBTCxHQUFZVSxJQUFJWCxJQUFoQjtBQUNBLHFCQUFLWSxNQUFMO0FBQ0FQLHdCQUFRQyxHQUFSLENBQVksSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBSWdCLGFBQUdJLE9BQUgsRTs7O0FBQVpDLG1COztBQUNKTix3QkFBUUMsR0FBUixDQUFZSyxJQUFJWCxJQUFoQjtBQUNBLHFCQUFLQyxJQUFMLEdBQVlVLElBQUlYLElBQWhCO0FBQ0EscUJBQUtZLE1BQUw7QUFDQVAsd0JBQVFDLEdBQVIsQ0FBWSxZQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOUMrQixlQUFLTyxJOztrQkFBbkJ0QixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVmlkZW9MaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdmlkZW9saXN0J1xyXG4gIGltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpKnnsYHpn7PpkqLnkLToibrmnK/mlZnlrqQnLFxyXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcclxuICAgIH1cclxuICAgJHByb3BzID0ge1widmlkZW9saXN0XCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsaXN0LnN5bmNcIjpcImxpc3RcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBwYW5lbDogUGFuZWwsXHJcbiAgICAgIHZpZGVvbGlzdDogVmlkZW9MaXN0XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBsaXN0OiBbXSxcclxuICAgICAgdXNlckluZm86e31cclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRhcCAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKClcclxuICAgICAgY29uc29sZS5sb2coJ2luZGV4IG9uTG9hZCcpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25TaG93KCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnaW5kZXggb25TaG93JylcclxuICAgICAgbGV0IHJlcyA9IGF3YWl0IGRiLmdldExpc3QoKVxyXG4gICAgICB0aGlzLmxpc3Q9IHJlcy5kYXRhXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmxpc3RcIilcclxuICAgICAgY29uc29sZS5sb2codGhpcy5saXN0KVxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICBsZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCfliLfmlrAnKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICBsZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdjaXJjbGUg5LiL5LiA6aG1JylcclxuICAgIH1cclxuICB9XHJcblxyXG4iXX0=