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
      iszan: true,
      zan_num: 1000
    }, _this.methods = {
      tap: function tap(url, title, player, age, studyage, e) {
        _wepy2.default.navigateTo({
          url: 'detail?src=' + url + '&title=' + title + '&player=' + player + '&age=' + age + '&studyage=' + studyage
        });
      },
      zan: function zan(id, e) {
        console.log("点赞");
        var nickName = this.$parent.userInfo.nickName;
        var url = this.$parent.userInfo.avatarUrl;
        _db2.default.zan(id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJwcm9wcyIsImxpc3QiLCJkYXRhIiwiaXN6YW4iLCJ6YW5fbnVtIiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsInphbiIsImlkIiwiY29uc29sZSIsImxvZyIsIm5pY2tOYW1lIiwiJHBhcmVudCIsInVzZXJJbmZvIiwiYXZhdGFyVXJsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFEQSxLLFFBSVJDLEksR0FBTztBQUNMQyxhQUFPLElBREY7QUFFTEMsZUFBUTtBQUZILEssUUFPUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsR0FERyxFQUNFQyxLQURGLEVBQ1NDLE1BRFQsRUFDaUJDLEdBRGpCLEVBQ3NCQyxRQUR0QixFQUNnQ0MsQ0FEaEMsRUFDbUM7QUFDekMsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZE4sZUFBSyxnQkFBZ0JBLEdBQWhCLEdBQXNCLFNBQXRCLEdBQWlDQyxLQUFqQyxHQUF3QyxVQUF4QyxHQUFvREMsTUFBcEQsR0FBNEQsT0FBNUQsR0FBcUVDLEdBQXJFLEdBQTBFLFlBQTFFLEdBQXdGQztBQUQvRSxTQUFoQjtBQUdELE9BTE87QUFNUkcsU0FOUSxlQU1IQyxFQU5HLEVBTUFILENBTkEsRUFNRTtBQUNSSSxnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDQSxZQUFJQyxXQUFXLEtBQUtDLE9BQUwsQ0FBYUMsUUFBYixDQUFzQkYsUUFBckM7QUFDQSxZQUFJWCxNQUFNLEtBQUtZLE9BQUwsQ0FBYUMsUUFBYixDQUFzQkMsU0FBaEM7QUFDQSxxQkFBR1AsR0FBSCxDQUFPQyxFQUFQO0FBQ0Q7QUFYTyxLOzs7Ozs2QkFjRDtBQUNQQyxjQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQWxDb0MsZUFBS0ssUzs7a0JBQXZCdkIsUyIsImZpbGUiOiJ2aWRlb2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgbGlzdDoge31cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBpc3phbjogdHJ1ZSxcclxuICAgICAgemFuX251bToxMDAwXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0YXAgKHVybCwgdGl0bGUgLHBsYXllciwgYWdlLCBzdHVkeWFnZSwgZSkge1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6ICdkZXRhaWw/c3JjPScgKyB1cmwgKyAnJnRpdGxlPScrIHRpdGxlICsnJnBsYXllcj0nKyBwbGF5ZXIgKycmYWdlPScrIGFnZSArJyZzdHVkeWFnZT0nKyBzdHVkeWFnZSBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICB6YW4gKGlkLGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi54K56LWeXCIpXHJcbiAgICAgICAgbGV0IG5pY2tOYW1lID0gdGhpcy4kcGFyZW50LnVzZXJJbmZvLm5pY2tOYW1lXHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuJHBhcmVudC51c2VySW5mby5hdmF0YXJVcmxcclxuICAgICAgICBkYi56YW4oaWQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd2aWRlb2xpc3Qgb25Mb2FkJylcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxpc3QpXHJcbiAgICAgIC8vbGV0IHJlcyA9IGF3YWl0IGRiLmdldExpc3QoKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICAvL3RoaXMubGlzdCA9IHJlcy5kYXRhXHJcbiAgICAgIC8vdGhpcy4kYXBwbHkoKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgIH1cclxuICB9XHJcbiJdfQ==