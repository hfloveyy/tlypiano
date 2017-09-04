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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_wepy$page) {
  _inherits(Post, _wepy$page);

  function Post() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Post);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Post.__proto__ || Object.getPrototypeOf(Post)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '上传视频'
    }, _this.components = {
      panel: _panel2.default,
      videolist: _videolist2.default
    }, _this.data = {
      hidden: true
    }, _this.methods = {
      bindUpVideo: function bindUpVideo(e) {
        var that = this;
        console.log(e);
        var title = e.detail.value.title;
        that.hidden = false;
        _wepy2.default.chooseVideo({
          success: function success(res) {
            console.log(res.tempFilePath);
            _db2.default.insertData(title, res);
            that.hidden = true;
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Post, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Post;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Post , 'pages/post'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3QuanMiXSwibmFtZXMiOlsiUG9zdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwicGFuZWwiLCJ2aWRlb2xpc3QiLCJkYXRhIiwiaGlkZGVuIiwibWV0aG9kcyIsImJpbmRVcFZpZGVvIiwiZSIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNob29zZVZpZGVvIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aCIsImluc2VydERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsNEJBRFc7QUFFWEM7QUFGVyxLLFFBSWJDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUdQQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0tDLENBREwsRUFDUTtBQUNkLFlBQUlDLE9BQU8sSUFBWDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZSCxDQUFaO0FBQ0EsWUFBSUksUUFBUUosRUFBRUssTUFBRixDQUFTQyxLQUFULENBQWVGLEtBQTNCO0FBQ0FILGFBQUtKLE1BQUwsR0FBYyxLQUFkO0FBQ0EsdUJBQUtVLFdBQUwsQ0FBaUI7QUFDZkMsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QlAsb0JBQVFDLEdBQVIsQ0FBWU0sSUFBSUMsWUFBaEI7QUFDQSx5QkFBR0MsVUFBSCxDQUFjUCxLQUFkLEVBQXFCSyxHQUFyQjtBQUNBUixpQkFBS0osTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUxjLFNBQWpCO0FBT0Q7QUFiTyxLOzs7Ozs2QkFlRCxDQUNSOzs7O0VBM0IrQixlQUFLZSxJOztrQkFBbEJ0QixJIiwiZmlsZSI6InBvc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBWaWRlb0xpc3QgZnJvbSAnLi4vY29tcG9uZW50cy92aWRlb2xpc3QnXHJcbiAgaW1wb3J0IFBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnXHJcbiAgaW1wb3J0IGRiIGZyb20gJy4uL3V0aWxzL2RiJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LiK5Lyg6KeG6aKRJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgcGFuZWw6IFBhbmVsLFxyXG4gICAgICB2aWRlb2xpc3Q6IFZpZGVvTGlzdFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgYmluZFVwVmlkZW8gKGUpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIGxldCB0aXRsZSA9IGUuZGV0YWlsLnZhbHVlLnRpdGxlXHJcbiAgICAgICAgdGhhdC5oaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIHdlcHkuY2hvb3NlVmlkZW8oe1xyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGVtcEZpbGVQYXRoKVxyXG4gICAgICAgICAgICBkYi5pbnNlcnREYXRhKHRpdGxlLCByZXMpXHJcbiAgICAgICAgICAgIHRoYXQuaGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgIH1cclxuICB9XHJcblxyXG4iXX0=