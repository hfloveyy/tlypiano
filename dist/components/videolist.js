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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      list: {},
      likearray: {}
    }, _this.data = {}, _this.methods = {
      tap: function tap(url, title, player, age, studyage, e) {
        _wepy2.default.navigateTo({
          url: 'detail?src=' + url + '&title=' + title + '&player=' + player + '&age=' + age + '&studyage=' + studyage
        });
      },
      zan: function zan(item, index, e) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log("点赞");
                  _context.next = 3;
                  return _db2.default.zan(item.objectId);

                case 3:
                  res = _context.sent;

                  _this2.likearray = res.likearray;
                  console.log(_this2.likearray[index]);
                  if (res.isLike === true) {
                    wx.showToast({
                      title: '点过啦',
                      icon: 'success',
                      duration: 2000
                    });
                  } else {
                    _this2.list[index] = res.result;
                    wx.showToast({
                      title: '点赞成功',
                      icon: 'success',
                      duration: 2000
                    });
                  }
                  //console.log(this.list[index])
                  _this2.$apply();

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }))();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoList, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('videolist onLoad');
      //console.log(this.list)
      //let res = await db.getList()
      //console.log(res.data)
      //this.list = res.data
      //this.$apply()
      //console.log(this.list)
    }
  }]);

  return VideoList;
}(_wepy2.default.component);

exports.default = VideoList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJwcm9wcyIsImxpc3QiLCJsaWtlYXJyYXkiLCJkYXRhIiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsInphbiIsIml0ZW0iLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJvYmplY3RJZCIsInJlcyIsImlzTGlrZSIsInd4Iiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwicmVzdWx0IiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsWUFBTSxFQURBO0FBRU5DLGlCQUFVO0FBRkosSyxRQUtSQyxJLEdBQU8sRSxRQUdQQyxPLEdBQVU7QUFDUkMsU0FEUSxlQUNIQyxHQURHLEVBQ0VDLEtBREYsRUFDU0MsTUFEVCxFQUNpQkMsR0FEakIsRUFDc0JDLFFBRHRCLEVBQ2dDQyxDQURoQyxFQUNtQztBQUN6Qyx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkTixlQUFLLGdCQUFnQkEsR0FBaEIsR0FBc0IsU0FBdEIsR0FBaUNDLEtBQWpDLEdBQXdDLFVBQXhDLEdBQW9EQyxNQUFwRCxHQUE0RCxPQUE1RCxHQUFxRUMsR0FBckUsR0FBMEUsWUFBMUUsR0FBd0ZDO0FBRC9FLFNBQWhCO0FBR0QsT0FMTztBQU1GRyxTQU5FLGVBTUdDLElBTkgsRUFNUUMsS0FOUixFQU1jSixDQU5kLEVBTWdCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCSywwQkFBUUMsR0FBUixDQUFZLElBQVo7QUFEc0I7QUFBQSx5QkFFTixhQUFHSixHQUFILENBQU9DLEtBQUtJLFFBQVosQ0FGTTs7QUFBQTtBQUVsQkMscUJBRmtCOztBQUd0Qix5QkFBS2pCLFNBQUwsR0FBaUJpQixJQUFJakIsU0FBckI7QUFDQWMsMEJBQVFDLEdBQVIsQ0FBWSxPQUFLZixTQUFMLENBQWVhLEtBQWYsQ0FBWjtBQUNBLHNCQUFHSSxJQUFJQyxNQUFKLEtBQWEsSUFBaEIsRUFBcUI7QUFDbkJDLHVCQUFHQyxTQUFILENBQWE7QUFDWGYsNkJBQU8sS0FESTtBQUVYZ0IsNEJBQU0sU0FGSztBQUdYQyxnQ0FBVTtBQUhDLHFCQUFiO0FBS0QsbUJBTkQsTUFNSztBQUNILDJCQUFLdkIsSUFBTCxDQUFVYyxLQUFWLElBQW1CSSxJQUFJTSxNQUF2QjtBQUNBSix1QkFBR0MsU0FBSCxDQUFhO0FBQ1hmLDZCQUFPLE1BREk7QUFFWGdCLDRCQUFNLFNBRks7QUFHWEMsZ0NBQVU7QUFIQyxxQkFBYjtBQUtEO0FBQ0Q7QUFDQSx5QkFBS0UsTUFBTDs7QUFwQnNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0J2QjtBQTVCTyxLOzs7Ozs2QkErQkQ7QUFDUFYsY0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs7RUFoRG9DLGVBQUtVLFM7O2tCQUF2QjVCLFMiLCJmaWxlIjoidmlkZW9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgZGIgZnJvbSAnLi4vdXRpbHMvZGInXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW9MaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIGxpc3Q6IHt9LFxyXG4gICAgICBsaWtlYXJyYXk6e31cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0YXAgKHVybCwgdGl0bGUgLHBsYXllciwgYWdlLCBzdHVkeWFnZSwgZSkge1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6ICdkZXRhaWw/c3JjPScgKyB1cmwgKyAnJnRpdGxlPScrIHRpdGxlICsnJnBsYXllcj0nKyBwbGF5ZXIgKycmYWdlPScrIGFnZSArJyZzdHVkeWFnZT0nKyBzdHVkeWFnZSBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyB6YW4gKGl0ZW0saW5kZXgsZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLngrnotZ5cIikgXHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGRiLnphbihpdGVtLm9iamVjdElkKVxyXG4gICAgICAgIHRoaXMubGlrZWFycmF5ID0gcmVzLmxpa2VhcnJheVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlrZWFycmF5W2luZGV4XSkgIFxyXG4gICAgICAgIGlmKHJlcy5pc0xpa2U9PT10cnVlKXtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn54K56L+H5ZWmJyxcclxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHRoaXMubGlzdFtpbmRleF0gPSByZXMucmVzdWx0XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+eCuei1nuaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5saXN0W2luZGV4XSlcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd2aWRlb2xpc3Qgb25Mb2FkJylcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxpc3QpXHJcbiAgICAgIC8vbGV0IHJlcyA9IGF3YWl0IGRiLmdldExpc3QoKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICAvL3RoaXMubGlzdCA9IHJlcy5kYXRhXHJcbiAgICAgIC8vdGhpcy4kYXBwbHkoKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgIH1cclxuICB9XHJcbiJdfQ==