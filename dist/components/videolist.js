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
      list: { twoWay: true }
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
                  console.log(index);
                  console.log(_this2.list[index]['attributes']['title']);
                  _context.next = 5;
                  return _db2.default.zan(item.objectId);

                case 5:
                  res = _context.sent;

                  //console.log(res.result)  
                  //console.log(res.isLike)
                  if (res.isLike !== true) {
                    //this.list[index] = res.result
                    //this.list[index]['attributes']['isLike'] = res.isLike
                    _this2.list[index]['attributes']['isLike'] + 1;
                    _this2.$apply();
                  }
                  //console.log(this.list[index]['isLike'] )
                  /*db.zan(item.objectId).then(function (res){
                    //console.log(res.result)  
                    console.log(that.list[index]['attributes']['isLike'])
                    that.list[index]['attributes']['isLike'] = res.isLike
                    console.log(that.list[index]['attributes'])
                    that.$apply()
                    //console.log(that.list[index]['isLike'])
                  })*/

                case 7:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJwcm9wcyIsImxpc3QiLCJ0d29XYXkiLCJkYXRhIiwiaXN6YW4iLCJ6YW5fbnVtIiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsInphbiIsIml0ZW0iLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJvYmplY3RJZCIsInJlcyIsImlzTGlrZSIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU0sRUFBQ0MsUUFBTyxJQUFSO0FBREEsSyxRQUlSQyxJLEdBQU87QUFDTEMsYUFBTyxLQURGO0FBRUxDLGVBQVE7QUFGSCxLLFFBUVBDLE8sR0FBVTtBQUNSQyxTQURRLGVBQ0hDLEdBREcsRUFDRUMsS0FERixFQUNTQyxNQURULEVBQ2lCQyxHQURqQixFQUNzQkMsUUFEdEIsRUFDZ0NDLENBRGhDLEVBQ21DO0FBQ3pDLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2ROLGVBQUssZ0JBQWdCQSxHQUFoQixHQUFzQixTQUF0QixHQUFpQ0MsS0FBakMsR0FBd0MsVUFBeEMsR0FBb0RDLE1BQXBELEdBQTRELE9BQTVELEdBQXFFQyxHQUFyRSxHQUEwRSxZQUExRSxHQUF3RkM7QUFEL0UsU0FBaEI7QUFHRCxPQUxPO0FBTUZHLFNBTkUsZUFNR0MsSUFOSCxFQU1RQyxLQU5SLEVBTWNKLENBTmQsRUFNZ0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDdEJLLDBCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBRCwwQkFBUUMsR0FBUixDQUFZRixLQUFaO0FBQ0FDLDBCQUFRQyxHQUFSLENBQVksT0FBS2xCLElBQUwsQ0FBVWdCLEtBQVYsRUFBaUIsWUFBakIsRUFBK0IsT0FBL0IsQ0FBWjtBQUhzQjtBQUFBLHlCQUlOLGFBQUdGLEdBQUgsQ0FBT0MsS0FBS0ksUUFBWixDQUpNOztBQUFBO0FBSWxCQyxxQkFKa0I7O0FBS3RCO0FBQ0E7QUFDQSxzQkFBR0EsSUFBSUMsTUFBSixLQUFhLElBQWhCLEVBQXFCO0FBQ25CO0FBQ0E7QUFDQSwyQkFBS3JCLElBQUwsQ0FBVWdCLEtBQVYsRUFBaUIsWUFBakIsRUFBK0IsUUFBL0IsSUFBMkMsQ0FBM0M7QUFDQSwyQkFBS00sTUFBTDtBQUNEO0FBQ0Q7QUFDQTs7Ozs7Ozs7O0FBZHNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0J2QjtBQTVCTyxLOzs7Ozs2QkErQkQ7QUFDUEwsY0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs7RUFwRG9DLGVBQUtLLFM7O2tCQUF2QnpCLFMiLCJmaWxlIjoidmlkZW9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgZGIgZnJvbSAnLi4vdXRpbHMvZGInXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW9MaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIGxpc3Q6IHt0d29XYXk6dHJ1ZX1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpc3phbjogZmFsc2UsXHJcbiAgICAgIHphbl9udW06MFxyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0YXAgKHVybCwgdGl0bGUgLHBsYXllciwgYWdlLCBzdHVkeWFnZSwgZSkge1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6ICdkZXRhaWw/c3JjPScgKyB1cmwgKyAnJnRpdGxlPScrIHRpdGxlICsnJnBsYXllcj0nKyBwbGF5ZXIgKycmYWdlPScrIGFnZSArJyZzdHVkeWFnZT0nKyBzdHVkeWFnZSBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyB6YW4gKGl0ZW0saW5kZXgsZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLngrnotZ5cIikgXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5saXN0W2luZGV4XVsnYXR0cmlidXRlcyddWyd0aXRsZSddKVxyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBkYi56YW4oaXRlbS5vYmplY3RJZClcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5yZXN1bHQpICBcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5pc0xpa2UpXHJcbiAgICAgICAgaWYocmVzLmlzTGlrZSE9PXRydWUpe1xyXG4gICAgICAgICAgLy90aGlzLmxpc3RbaW5kZXhdID0gcmVzLnJlc3VsdFxyXG4gICAgICAgICAgLy90aGlzLmxpc3RbaW5kZXhdWydhdHRyaWJ1dGVzJ11bJ2lzTGlrZSddID0gcmVzLmlzTGlrZVxyXG4gICAgICAgICAgdGhpcy5saXN0W2luZGV4XVsnYXR0cmlidXRlcyddWydpc0xpa2UnXSArIDFcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxpc3RbaW5kZXhdWydpc0xpa2UnXSApXHJcbiAgICAgICAgLypkYi56YW4oaXRlbS5vYmplY3RJZCkudGhlbihmdW5jdGlvbiAocmVzKXtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzLnJlc3VsdCkgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhhdC5saXN0W2luZGV4XVsnYXR0cmlidXRlcyddWydpc0xpa2UnXSlcclxuICAgICAgICAgIHRoYXQubGlzdFtpbmRleF1bJ2F0dHJpYnV0ZXMnXVsnaXNMaWtlJ10gPSByZXMuaXNMaWtlXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0Lmxpc3RbaW5kZXhdWydhdHRyaWJ1dGVzJ10pXHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoYXQubGlzdFtpbmRleF1bJ2lzTGlrZSddKVxyXG4gICAgICAgIH0pKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3ZpZGVvbGlzdCBvbkxvYWQnKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgICAgLy9sZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIC8vY29uc29sZS5sb2cocmVzLmRhdGEpXHJcbiAgICAgIC8vdGhpcy5saXN0ID0gcmVzLmRhdGFcclxuICAgICAgLy90aGlzLiRhcHBseSgpXHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5saXN0KVxyXG4gICAgfVxyXG4gIH1cclxuIl19