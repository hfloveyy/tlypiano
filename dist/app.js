'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _db = require('./utils/db.js');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bmob = _db2.default.Bmob();

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/post', 'pages/detail', 'pages/about'],
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
      console.log('onLaunch');
      this.getUserInfo();
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
    value: function getUserInfo() {
      var that = this;
      var user = new Bmob.User();
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.login({
        success: function success(res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);
            wx.setStorageSync('openid', openid);
          }, function (err) {
            console.log('here');
            console.log(err, 'errr');
          });
        }
      });
      wx.getUserInfo({
        success: function success(res) {
          //console.log(res.userInfo);
          that.globalData.userInfo = res.userInfo;
        }
      });

      return this.globalData.userInfo;
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJCbW9iIiwiY29uZmlnIiwicGFnZXMiLCJ3aW5kb3ciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlIiwiY29uc29sZSIsImxvZyIsImdldFVzZXJJbmZvIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiZGF0YSIsInRoYXQiLCJ1c2VyIiwiVXNlciIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsImxvZ2luV2l0aFdlYXBwIiwiY29kZSIsInRoZW4iLCJvcGVuaWQiLCJnZXQiLCJ3ZWFwcCIsImlkIiwid3giLCJzZXRTdG9yYWdlU3luYyIsImVyciIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxPQUFPLGFBQUdBLElBQUgsRUFBWDs7Ozs7QUE0Q0Usc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQXpDZkMsTUF5Q2UsR0F6Q047QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxZQUZLLEVBR0wsY0FISyxFQUlMLGFBSkssQ0FEQTtBQU9QQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsV0FIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BUEQ7QUFhUCxnQkFBVTtBQUNSLGdCQUFRLENBQ047QUFDRSxzQkFBWSxhQURkO0FBRUUsc0JBQVksaUJBRmQ7QUFHRSw4QkFBb0Isa0JBSHRCO0FBSUUsa0JBQVE7QUFKVixTQURNLEVBT047QUFDRSxzQkFBWSxZQURkO0FBRUUsc0JBQVksbUJBRmQ7QUFHRSw4QkFBb0Isb0JBSHRCO0FBSUUsa0JBQVE7QUFKVixTQVBNLEVBYU47QUFDRSxzQkFBWSxhQURkO0FBRUUsc0JBQVksZUFGZDtBQUdFLDhCQUFvQixnQkFIdEI7QUFJRSxrQkFBUTtBQUpWLFNBYk07QUFEQTtBQWJILEtBeUNNO0FBQUEsVUFKZkMsVUFJZSxHQUpGO0FBQ1hDLGdCQUFVO0FBREMsS0FJRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZhO0FBR2Q7Ozs7K0JBRVU7QUFDVEMsY0FBUUMsR0FBUixDQUFZLFVBQVo7QUFDQSxXQUFLQyxXQUFMO0FBQ0Q7OzswQkFFTUMsQyxFQUFHO0FBQ1IsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBVyxZQUFNO0FBQ2ZGLGtCQUFRLGtCQUFSO0FBQ0QsU0FGRCxFQUVHRixJQUFJLElBRlA7QUFHRCxPQUpNLENBQVA7QUFLRDs7Ozs7Ozs7Ozs7dUJBR29CLEtBQUtLLEtBQUwsQ0FBVyxDQUFYLEM7OztBQUFiQyxvQjs7QUFDTlQsd0JBQVFDLEdBQVIsQ0FBWVEsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUdZO0FBQ1osVUFBSUMsT0FBTyxJQUFYO0FBQ0EsVUFBSUMsT0FBTyxJQUFJdEIsS0FBS3VCLElBQVQsRUFBWDtBQUNBLFVBQUksS0FBS2YsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0QscUJBQUtlLEtBQUwsQ0FBVztBQUNQQyxlQURPLG1CQUNFQyxHQURGLEVBQ087QUFDVkosZUFBS0ssY0FBTCxDQUFvQkQsSUFBSUUsSUFBeEIsRUFBOEJDLElBQTlCLENBQW1DLFVBQVVQLElBQVYsRUFBZ0I7QUFDbkQsZ0JBQUlRLFNBQVNSLEtBQUtTLEdBQUwsQ0FBUyxVQUFULEVBQXFCQyxLQUFyQixDQUEyQkYsTUFBeEM7QUFDQW5CLG9CQUFRQyxHQUFSLENBQVlVLElBQVosRUFBa0IsTUFBbEIsRUFBMEJBLEtBQUtXLEVBQS9CLEVBQW1DUCxHQUFuQztBQUNBUSxlQUFHQyxjQUFILENBQWtCLFFBQWxCLEVBQTRCTCxNQUE1QjtBQUNDLFdBSkQsRUFJRyxVQUFVTSxHQUFWLEVBQWU7QUFDZHpCLG9CQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBRCxvQkFBUUMsR0FBUixDQUFZd0IsR0FBWixFQUFpQixNQUFqQjtBQUNILFdBUEQ7QUFRSDtBQVZNLE9BQVg7QUFZQUYsU0FBR3JCLFdBQUgsQ0FBZTtBQUNYWSxlQURXLG1CQUNGQyxHQURFLEVBQ0c7QUFDWjtBQUNBTCxlQUFLYixVQUFMLENBQWdCQyxRQUFoQixHQUEyQmlCLElBQUlqQixRQUEvQjtBQUNEO0FBSlUsT0FBZjs7QUFPQSxhQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7Ozs7RUEzRjBCLGVBQUs0QixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXHJcbmltcG9ydCBkYiBmcm9tICcuLi9zcmMvdXRpbHMvZGInXHJcblxyXG52YXIgQm1vYiA9IGRiLkJtb2IoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3Bvc3QnLFxyXG4gICAgICAncGFnZXMvZGV0YWlsJyxcclxuICAgICAgJ3BhZ2VzL2Fib3V0J1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpKnnsYHpn7PpkqLnkLToibrmnK/mlZnlrqQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snXHJcbiAgICB9LFxyXG4gICAgJ3RhYkJhcic6IHtcclxuICAgICAgJ2xpc3QnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICAgICdpY29uUGF0aCc6ICdpbWFnZXMvZmluZC5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnaW1hZ2VzL2ZpbmQyLnBuZycsXHJcbiAgICAgICAgICAndGV4dCc6ICfmrKPotY8nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAncGFnZVBhdGgnOiAncGFnZXMvcG9zdCcsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAnaW1hZ2VzL3VwbG9hZC5wbmcnLFxyXG4gICAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnaW1hZ2VzL3VwbG9hZDIucG5nJyxcclxuICAgICAgICAgICd0ZXh0JzogJ+S4iuS8oCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9hYm91dCcsXHJcbiAgICAgICAgICAnaWNvblBhdGgnOiAnaW1hZ2VzL21lLnBuZycsXHJcbiAgICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdpbWFnZXMvbWUyLnBuZycsXHJcbiAgICAgICAgICAndGV4dCc6ICflhbPkuo4nXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG4gICAgY29uc29sZS5sb2coJ29uTGF1bmNoJylcclxuICAgIHRoaXMuZ2V0VXNlckluZm8oKVxyXG4gIH1cclxuXHJcbiAgc2xlZXAgKHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoJ3Byb21pc2UgcmVzb2x2ZWQnKVxyXG4gICAgICB9LCBzICogMTAwMClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMylcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbygpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgbGV0IHVzZXIgPSBuZXcgQm1vYi5Vc2VyKClcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgIH1cclxuICAgIHdlcHkubG9naW4oe1xyXG4gICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICB1c2VyLmxvZ2luV2l0aFdlYXBwKHJlcy5jb2RlKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgICAgICAgIHZhciBvcGVuaWQgPSB1c2VyLmdldChcImF1dGhEYXRhXCIpLndlYXBwLm9wZW5pZDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codXNlciwgJ3VzZXInLCB1c2VyLmlkLCByZXMpO1xyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnb3BlbmlkJywgb3BlbmlkKVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGVyZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLCAnZXJycicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzLnVzZXJJbmZvKTtcclxuICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gIH0gIFxyXG59XHJcblxyXG4iXX0=