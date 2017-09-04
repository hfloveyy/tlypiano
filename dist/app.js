'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/post', 'pages/about'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '天籁音钢琴艺术教室',
        navigationBarTextStyle: 'black'
      },
      'tabBar': {
        'list': [{
          'pagePath': 'pages/index',
          'iconPath': 'images/find.png',
          'selectedIconPath': 'images/find2.png',
          'text': '欣赏'
        }, {
          'pagePath': 'pages/post',
          'iconPath': 'images/upload.png',
          'selectedIconPath': 'images/upload2.png',
          'text': '上传'
        }, {
          'pagePath': 'pages/about',
          'iconPath': 'images/me.png',
          'selectedIconPath': 'images/me2.png',
          'text': '关于'
        }]
      }
    };
    _this.globalData = {
      userInfo: null
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      this.testAsync();
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(3);

              case 2:
                data = _context.sent;

                console.log(data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getUserInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.globalData.userInfo) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', this.globalData.userInfo);

              case 2:
                _context2.next = 4;
                return wx.login();

              case 4:
                _context2.next = 6;
                return wx.getUserInfo();

              case 6:
                res = _context2.sent;

                this.globalData.userInfo = res.userInfo;
                return _context2.abrupt('return', res.userInfo);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserInfo() {
        return _ref2.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJ0ZXN0QXN5bmMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInd4IiwibG9naW4iLCJnZXRVc2VySW5mbyIsInJlcyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBMkNFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUF4Q2ZBLE1Bd0NlLEdBeENOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsWUFGSyxFQUdMLGFBSEssQ0FEQTtBQU1QQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsV0FIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BTkQ7QUFZUCxnQkFBVTtBQUNSLGdCQUFRLENBQ047QUFDRSxzQkFBWSxhQURkO0FBRUUsc0JBQVksaUJBRmQ7QUFHRSw4QkFBb0Isa0JBSHRCO0FBSUUsa0JBQVE7QUFKVixTQURNLEVBT047QUFDRSxzQkFBWSxZQURkO0FBRUUsc0JBQVksbUJBRmQ7QUFHRSw4QkFBb0Isb0JBSHRCO0FBSUUsa0JBQVE7QUFKVixTQVBNLEVBYU47QUFDRSxzQkFBWSxhQURkO0FBRUUsc0JBQVksZUFGZDtBQUdFLDhCQUFvQixnQkFIdEI7QUFJRSxrQkFBUTtBQUpWLFNBYk07QUFEQTtBQVpILEtBd0NNO0FBQUEsVUFKZkMsVUFJZSxHQUpGO0FBQ1hDLGdCQUFVO0FBREMsS0FJRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZhO0FBR2Q7Ozs7K0JBRVU7QUFDVCxXQUFLQyxTQUFMO0FBQ0Q7OzswQkFFTUMsQyxFQUFHO0FBQ1IsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBVyxZQUFNO0FBQ2ZGLGtCQUFRLGtCQUFSO0FBQ0QsU0FGRCxFQUVHRixJQUFJLElBRlA7QUFHRCxPQUpNLENBQVA7QUFLRDs7Ozs7Ozs7Ozs7dUJBR29CLEtBQUtLLEtBQUwsQ0FBVyxDQUFYLEM7OztBQUFiQyxvQjs7QUFDTkMsd0JBQVFDLEdBQVIsQ0FBWUYsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFJUSxLQUFLVixVQUFMLENBQWdCQyxROzs7OztrREFDVCxLQUFLRCxVQUFMLENBQWdCQyxROzs7O3VCQUVyQlksR0FBR0MsS0FBSCxFOzs7O3VCQUNVRCxHQUFHRSxXQUFILEU7OztBQUFaQyxtQjs7QUFDSixxQkFBS2hCLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCZSxJQUFJZixRQUEvQjtrREFDT2UsSUFBSWYsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXRFVSxlQUFLZ0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3Bvc3QnLFxyXG4gICAgICAncGFnZXMvYWJvdXQnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wkqeexgemfs+mSoueQtOiJuuacr+aVmeWupCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICAndGFiQmFyJzoge1xyXG4gICAgICAnbGlzdCc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvaW5kZXgnLFxyXG4gICAgICAgICAgJ2ljb25QYXRoJzogJ2ltYWdlcy9maW5kLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdpbWFnZXMvZmluZDIucG5nJyxcclxuICAgICAgICAgICd0ZXh0JzogJ+aso+i1jydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9wb3N0JyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdpbWFnZXMvdXBsb2FkLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdpbWFnZXMvdXBsb2FkMi5wbmcnLFxyXG4gICAgICAgICAgJ3RleHQnOiAn5LiK5LygJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2Fib3V0JyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdpbWFnZXMvbWUucG5nJyxcclxuICAgICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ2ltYWdlcy9tZTIucG5nJyxcclxuICAgICAgICAgICd0ZXh0JzogJ+WFs+S6jidcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gIH1cclxuXHJcbiAgb25MYXVuY2goKSB7XHJcbiAgICB0aGlzLnRlc3RBc3luYygpXHJcbiAgfVxyXG5cclxuICBzbGVlcCAocykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXHJcbiAgICAgIH0sIHMgKiAxMDAwKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFzeW5jIHRlc3RBc3luYyAoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFVzZXJJbmZvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgd3gubG9naW4oKTtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgd3guZ2V0VXNlckluZm8oKTtcclxuICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgcmV0dXJuIHJlcy51c2VySW5mbztcclxuICAgIH0gIFxyXG59XHJcblxyXG4iXX0=