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
      list: { twoWay: true },
      mylist: {}
    }, _this.data = {

      iszan: false,
      zan_num: 0
    }, _this.methods = {
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

                  //console.log(res.result)  
                  if (res.isLike) {}
                  _this2.list[index] = res.result;
                  console.log(_this2.list[index]);
                  _this2.$apply();

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }))();
      },
      mytap: function mytap(index, item) {
        console.log(this.mylist[index]);
        this.mylist[index]['title']['aa'] = 'hack it';
        console.log(this.mylist[index]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJwcm9wcyIsImxpc3QiLCJ0d29XYXkiLCJteWxpc3QiLCJkYXRhIiwiaXN6YW4iLCJ6YW5fbnVtIiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsInphbiIsIml0ZW0iLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJvYmplY3RJZCIsInJlcyIsImlzTGlrZSIsInJlc3VsdCIsIiRhcHBseSIsIm15dGFwIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsWUFBTSxFQUFDQyxRQUFPLElBQVIsRUFEQTtBQUVOQyxjQUFPO0FBRkQsSyxRQUtSQyxJLEdBQU87O0FBRUxDLGFBQU8sS0FGRjtBQUdMQyxlQUFRO0FBSEgsSyxRQU1QQyxPLEdBQVU7QUFDUkMsU0FEUSxlQUNIQyxHQURHLEVBQ0VDLEtBREYsRUFDU0MsTUFEVCxFQUNpQkMsR0FEakIsRUFDc0JDLFFBRHRCLEVBQ2dDQyxDQURoQyxFQUNtQztBQUN6Qyx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkTixlQUFLLGdCQUFnQkEsR0FBaEIsR0FBc0IsU0FBdEIsR0FBaUNDLEtBQWpDLEdBQXdDLFVBQXhDLEdBQW9EQyxNQUFwRCxHQUE0RCxPQUE1RCxHQUFxRUMsR0FBckUsR0FBMEUsWUFBMUUsR0FBd0ZDO0FBRC9FLFNBQWhCO0FBR0QsT0FMTztBQU1GRyxTQU5FLGVBTUdDLElBTkgsRUFNUUMsS0FOUixFQU1jSixDQU5kLEVBTWdCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3RCSywwQkFBUUMsR0FBUixDQUFZLElBQVo7QUFEc0I7QUFBQSx5QkFFTixhQUFHSixHQUFILENBQU9DLEtBQUtJLFFBQVosQ0FGTTs7QUFBQTtBQUVsQkMscUJBRmtCOztBQUd0QjtBQUNBLHNCQUFHQSxJQUFJQyxNQUFQLEVBQWMsQ0FFYjtBQUNELHlCQUFLdEIsSUFBTCxDQUFVaUIsS0FBVixJQUFtQkksSUFBSUUsTUFBdkI7QUFDQUwsMEJBQVFDLEdBQVIsQ0FBWSxPQUFLbkIsSUFBTCxDQUFVaUIsS0FBVixDQUFaO0FBQ0EseUJBQUtPLE1BQUw7O0FBVHNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVXZCLE9BaEJPO0FBaUJSQyxXQWpCUSxpQkFpQkZSLEtBakJFLEVBaUJJRCxJQWpCSixFQWlCUztBQUNmRSxnQkFBUUMsR0FBUixDQUFZLEtBQUtqQixNQUFMLENBQVllLEtBQVosQ0FBWjtBQUNBLGFBQUtmLE1BQUwsQ0FBWWUsS0FBWixFQUFtQixPQUFuQixFQUE0QixJQUE1QixJQUFvQyxTQUFwQztBQUNBQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtqQixNQUFMLENBQVllLEtBQVosQ0FBWjtBQUNEO0FBckJPLEs7Ozs7OzZCQXdCRDtBQUNQQyxjQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQTVDb0MsZUFBS08sUzs7a0JBQXZCNUIsUyIsImZpbGUiOiJ2aWRlb2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgbGlzdDoge3R3b1dheTp0cnVlfSxcclxuICAgICAgbXlsaXN0Ont9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgXHJcbiAgICAgIGlzemFuOiBmYWxzZSxcclxuICAgICAgemFuX251bTowXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRhcCAodXJsLCB0aXRsZSAscGxheWVyLCBhZ2UsIHN0dWR5YWdlLCBlKSB7XHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogJ2RldGFpbD9zcmM9JyArIHVybCArICcmdGl0bGU9JysgdGl0bGUgKycmcGxheWVyPScrIHBsYXllciArJyZhZ2U9JysgYWdlICsnJnN0dWR5YWdlPScrIHN0dWR5YWdlIFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIHphbiAoaXRlbSxpbmRleCxlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIueCuei1nlwiKSBcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgZGIuemFuKGl0ZW0ub2JqZWN0SWQpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMucmVzdWx0KSAgXHJcbiAgICAgICAgaWYocmVzLmlzTGlrZSl7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0W2luZGV4XSA9IHJlcy5yZXN1bHRcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3RbaW5kZXhdKVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuICAgICAgbXl0YXAoaW5kZXgsaXRlbSl7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5teWxpc3RbaW5kZXhdKVxyXG4gICAgICAgIHRoaXMubXlsaXN0W2luZGV4XVsndGl0bGUnXVsnYWEnXSA9ICdoYWNrIGl0J1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlsaXN0W2luZGV4XSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3ZpZGVvbGlzdCBvbkxvYWQnKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgICAgLy9sZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIC8vY29uc29sZS5sb2cocmVzLmRhdGEpXHJcbiAgICAgIC8vdGhpcy5saXN0ID0gcmVzLmRhdGFcclxuICAgICAgLy90aGlzLiRhcHBseSgpXHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5saXN0KVxyXG4gICAgfVxyXG4gIH1cclxuIl19