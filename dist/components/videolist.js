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
      list: {}
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
        console.log("点赞");
        var that = this;
        console.log(index);
        console.log(this.list[index]['url']);
        //let res = await db.zan(item.objectId)
        //console.log(res.result)  
        //console.log(res.isLike)
        //this.list[index]['isLike'] = res.isLike
        //this.$apply()
        //console.log(this.list[index]['isLike'] )
        _db2.default.zan(item.objectId).then(function (res) {
          //console.log(res.result)  
          //console.log(res.isLike)
          that.list[index]['isLike'] = res.isLike;
          that.$apply();
          console.log(that.list[index]['isLike']);
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJwcm9wcyIsImxpc3QiLCJkYXRhIiwiaXN6YW4iLCJ6YW5fbnVtIiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsInphbiIsIml0ZW0iLCJpbmRleCIsImNvbnNvbGUiLCJsb2ciLCJ0aGF0Iiwib2JqZWN0SWQiLCJ0aGVuIiwicmVzIiwiaXNMaWtlIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFEQSxLLFFBSVJDLEksR0FBTztBQUNMQyxhQUFPLEtBREY7QUFFTEMsZUFBUTtBQUZILEssUUFRUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsR0FERyxFQUNFQyxLQURGLEVBQ1NDLE1BRFQsRUFDaUJDLEdBRGpCLEVBQ3NCQyxRQUR0QixFQUNnQ0MsQ0FEaEMsRUFDbUM7QUFDekMsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZE4sZUFBSyxnQkFBZ0JBLEdBQWhCLEdBQXNCLFNBQXRCLEdBQWlDQyxLQUFqQyxHQUF3QyxVQUF4QyxHQUFvREMsTUFBcEQsR0FBNEQsT0FBNUQsR0FBcUVDLEdBQXJFLEdBQTBFLFlBQTFFLEdBQXdGQztBQUQvRSxTQUFoQjtBQUdELE9BTE87QUFNUkcsU0FOUSxlQU1IQyxJQU5HLEVBTUVDLEtBTkYsRUFNUUosQ0FOUixFQU1VO0FBQ2hCSyxnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDQSxZQUFJQyxPQUFPLElBQVg7QUFDQUYsZ0JBQVFDLEdBQVIsQ0FBWUYsS0FBWjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtqQixJQUFMLENBQVVlLEtBQVYsRUFBaUIsS0FBakIsQ0FBWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFHRixHQUFILENBQU9DLEtBQUtLLFFBQVosRUFBc0JDLElBQXRCLENBQTJCLFVBQVVDLEdBQVYsRUFBYztBQUN2QztBQUNBO0FBQ0FILGVBQUtsQixJQUFMLENBQVVlLEtBQVYsRUFBaUIsUUFBakIsSUFBNkJNLElBQUlDLE1BQWpDO0FBQ0FKLGVBQUtLLE1BQUw7QUFDQVAsa0JBQVFDLEdBQVIsQ0FBWUMsS0FBS2xCLElBQUwsQ0FBVWUsS0FBVixFQUFpQixRQUFqQixDQUFaO0FBQ0QsU0FORDtBQU9EO0FBeEJPLEs7Ozs7OzZCQTJCRDtBQUNQQyxjQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQWhEb0MsZUFBS08sUzs7a0JBQXZCMUIsUyIsImZpbGUiOiJ2aWRlb2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgbGlzdDoge31cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpc3phbjogZmFsc2UsXHJcbiAgICAgIHphbl9udW06MFxyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0YXAgKHVybCwgdGl0bGUgLHBsYXllciwgYWdlLCBzdHVkeWFnZSwgZSkge1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6ICdkZXRhaWw/c3JjPScgKyB1cmwgKyAnJnRpdGxlPScrIHRpdGxlICsnJnBsYXllcj0nKyBwbGF5ZXIgKycmYWdlPScrIGFnZSArJyZzdHVkeWFnZT0nKyBzdHVkeWFnZSBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICB6YW4gKGl0ZW0saW5kZXgsZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLngrnotZ5cIikgXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5saXN0W2luZGV4XVsndXJsJ10pXHJcbiAgICAgICAgLy9sZXQgcmVzID0gYXdhaXQgZGIuemFuKGl0ZW0ub2JqZWN0SWQpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMucmVzdWx0KSAgXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMuaXNMaWtlKVxyXG4gICAgICAgIC8vdGhpcy5saXN0W2luZGV4XVsnaXNMaWtlJ10gPSByZXMuaXNMaWtlXHJcbiAgICAgICAgLy90aGlzLiRhcHBseSgpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxpc3RbaW5kZXhdWydpc0xpa2UnXSApXHJcbiAgICAgICAgZGIuemFuKGl0ZW0ub2JqZWN0SWQpLnRoZW4oZnVuY3Rpb24gKHJlcyl7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5yZXN1bHQpICBcclxuICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzLmlzTGlrZSlcclxuICAgICAgICAgIHRoYXQubGlzdFtpbmRleF1bJ2lzTGlrZSddID0gcmVzLmlzTGlrZVxyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhhdC5saXN0W2luZGV4XVsnaXNMaWtlJ10pXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3ZpZGVvbGlzdCBvbkxvYWQnKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgICAgLy9sZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIC8vY29uc29sZS5sb2cocmVzLmRhdGEpXHJcbiAgICAgIC8vdGhpcy5saXN0ID0gcmVzLmRhdGFcclxuICAgICAgLy90aGlzLiRhcHBseSgpXHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5saXN0KVxyXG4gICAgfVxyXG4gIH1cclxuIl19