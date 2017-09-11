'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _db = require('./../utils/db.js');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoList = function (_wepy$component) {
  _inherits(VideoList, _wepy$component);

  function VideoList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      list: []
    }, _this.methods = {
      tap: function tap(url, title, player, age, studyage, e) {
        // this.num = this.num + 1
        console.log(this.$name + ' tap');
        console.log('url:' + url);
        console.log('title:' + title);
        _wepy2.default.navigateTo({
          url: 'detail?src=' + url + '&title=' + title + '&player=' + player + '&age=' + age + '&studyage=' + studyage
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoList, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('onLoad');

                _context.next = 3;
                return _db2.default.getList();

              case 3:
                res = _context.sent;

                console.log(res.data);
                this.list = res.data;
                this.$apply();
                console.log(this.list);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShow',
    value: function onShow() {
      console.log('onShow');
    }
  }]);

  return VideoList;
}(_wepy2.default.component);

exports.default = VideoList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJkYXRhIiwibGlzdCIsIm1ldGhvZHMiLCJ0YXAiLCJ1cmwiLCJ0aXRsZSIsInBsYXllciIsImFnZSIsInN0dWR5YWdlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCIkbmFtZSIsIm5hdmlnYXRlVG8iLCJnZXRMaXN0IiwicmVzIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFJUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsR0FERyxFQUNFQyxLQURGLEVBQ1NDLE1BRFQsRUFDaUJDLEdBRGpCLEVBQ3NCQyxRQUR0QixFQUNnQ0MsQ0FEaEMsRUFDbUM7QUFDekM7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLQyxLQUFMLEdBQWEsTUFBekI7QUFDQUYsZ0JBQVFDLEdBQVIsQ0FBWSxTQUFRUCxHQUFwQjtBQUNBTSxnQkFBUUMsR0FBUixDQUFZLFdBQVVOLEtBQXRCO0FBQ0EsdUJBQUtRLFVBQUwsQ0FBZ0I7QUFDZFQsZUFBSyxnQkFBZ0JBLEdBQWhCLEdBQXNCLFNBQXRCLEdBQWlDQyxLQUFqQyxHQUF3QyxVQUF4QyxHQUFvREMsTUFBcEQsR0FBNEQsT0FBNUQsR0FBcUVDLEdBQXJFLEdBQTBFLFlBQTFFLEdBQXdGQztBQUQvRSxTQUFoQjtBQUdEO0FBVE8sSzs7Ozs7Ozs7Ozs7O0FBYVJFLHdCQUFRQyxHQUFSLENBQVksUUFBWjs7O3VCQUVnQixhQUFHRyxPQUFILEU7OztBQUFaQyxtQjs7QUFDSkwsd0JBQVFDLEdBQVIsQ0FBWUksSUFBSWYsSUFBaEI7QUFDQSxxQkFBS0MsSUFBTCxHQUFZYyxJQUFJZixJQUFoQjtBQUNBLHFCQUFLZ0IsTUFBTDtBQUNBTix3QkFBUUMsR0FBUixDQUFZLEtBQUtWLElBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRVE7QUFDUlMsY0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDs7OztFQTVCb0MsZUFBS00sUzs7a0JBQXZCbEIsUyIsImZpbGUiOiJ2aWRlb2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBsaXN0OiBbXVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRhcCAodXJsLCB0aXRsZSAscGxheWVyLCBhZ2UsIHN0dWR5YWdlLCBlKSB7XHJcbiAgICAgICAgLy8gdGhpcy5udW0gPSB0aGlzLm51bSArIDFcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRuYW1lICsgJyB0YXAnKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1cmw6JysgdXJsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aXRsZTonKyB0aXRsZSlcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiAnZGV0YWlsP3NyYz0nICsgdXJsICsgJyZ0aXRsZT0nKyB0aXRsZSArJyZwbGF5ZXI9JysgcGxheWVyICsnJmFnZT0nKyBhZ2UgKycmc3R1ZHlhZ2U9Jysgc3R1ZHlhZ2UgXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpXHJcblxyXG4gICAgICBsZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgIH1cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdvblNob3cnKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4iXX0=