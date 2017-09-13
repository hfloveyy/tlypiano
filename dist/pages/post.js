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
      hidden: true,
      userInfo: null
    }, _this.methods = {
      bindUpVideo: function bindUpVideo(e) {
        var that = this;
        console.log(e);
        var title = e.detail.value.title;
        var player = e.detail.value.player;
        var age = e.detail.value.age;
        var studyage = e.detail.value.studyage;
        var nickName = that.userInfo.nickName;
        var url = that.userInfo.avatarUrl;
        that.hidden = false;
        _wepy2.default.chooseVideo({
          success: function success(res) {
            _db2.default.insertData(title, player, age, studyage, nickName, url, res).then(function (res) {
              console.log('success');
              that.hidden = true;
              this.$apply();
              _wepy2.default.switchTab({
                url: 'index'
              });
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Post, [{
    key: 'onLoad',
    value: function onLoad() {
      this.userInfo = this.$parent.getUserInfo();
      console.log(this.userInfo);
    }
  }]);

  return Post;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Post , 'pages/post'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3QuanMiXSwibmFtZXMiOlsiUG9zdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwicGFuZWwiLCJ2aWRlb2xpc3QiLCJkYXRhIiwiaGlkZGVuIiwidXNlckluZm8iLCJtZXRob2RzIiwiYmluZFVwVmlkZW8iLCJlIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsImRldGFpbCIsInZhbHVlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsImF2YXRhclVybCIsImNob29zZVZpZGVvIiwic3VjY2VzcyIsInJlcyIsImluc2VydERhdGEiLCJ0aGVuIiwiJGFwcGx5Iiwic3dpdGNoVGFiIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDLDRCQURXO0FBRVhDO0FBRlcsSyxRQUliQyxJLEdBQU87QUFDTEMsY0FBUSxJQURIO0FBRUxDLGdCQUFTO0FBRkosSyxRQUlQQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0tDLENBREwsRUFDUTtBQUNkLFlBQUlDLE9BQU8sSUFBWDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZSCxDQUFaO0FBQ0EsWUFBSUksUUFBUUosRUFBRUssTUFBRixDQUFTQyxLQUFULENBQWVGLEtBQTNCO0FBQ0EsWUFBSUcsU0FBU1AsRUFBRUssTUFBRixDQUFTQyxLQUFULENBQWVDLE1BQTVCO0FBQ0EsWUFBSUMsTUFBTVIsRUFBRUssTUFBRixDQUFTQyxLQUFULENBQWVFLEdBQXpCO0FBQ0EsWUFBSUMsV0FBV1QsRUFBRUssTUFBRixDQUFTQyxLQUFULENBQWVHLFFBQTlCO0FBQ0EsWUFBSUMsV0FBV1QsS0FBS0osUUFBTCxDQUFjYSxRQUE3QjtBQUNBLFlBQUlDLE1BQU1WLEtBQUtKLFFBQUwsQ0FBY2UsU0FBeEI7QUFDQVgsYUFBS0wsTUFBTCxHQUFjLEtBQWQ7QUFDQSx1QkFBS2lCLFdBQUwsQ0FBaUI7QUFDZkMsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0Qix5QkFBR0MsVUFBSCxDQUFjWixLQUFkLEVBQXFCRyxNQUFyQixFQUE2QkMsR0FBN0IsRUFBa0NDLFFBQWxDLEVBQTRDQyxRQUE1QyxFQUFzREMsR0FBdEQsRUFBMkRJLEdBQTNELEVBQWdFRSxJQUFoRSxDQUFxRSxVQUFTRixHQUFULEVBQWE7QUFDaEZiLHNCQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBRixtQkFBS0wsTUFBTCxHQUFjLElBQWQ7QUFDQSxtQkFBS3NCLE1BQUw7QUFDQSw2QkFBS0MsU0FBTCxDQUFlO0FBQ2JSLHFCQUFLO0FBRFEsZUFBZjtBQUdELGFBUEQ7QUFRRDtBQVZjLFNBQWpCO0FBWUQ7QUF2Qk8sSzs7Ozs7NkJBeUJEO0FBQ1AsV0FBS2QsUUFBTCxHQUFnQixLQUFLdUIsT0FBTCxDQUFhQyxXQUFiLEVBQWhCO0FBQ0FuQixjQUFRQyxHQUFSLENBQVksS0FBS04sUUFBakI7QUFDRDs7OztFQXhDK0IsZUFBS3lCLEk7O2tCQUFsQmpDLEkiLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IFZpZGVvTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL3ZpZGVvbGlzdCdcclxuICBpbXBvcnQgUGFuZWwgZnJvbSAnLi4vY29tcG9uZW50cy9wYW5lbCdcclxuICBpbXBvcnQgZGIgZnJvbSAnLi4vdXRpbHMvZGInXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuIrkvKDop4bpopEnXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBwYW5lbDogUGFuZWwsXHJcbiAgICAgIHZpZGVvbGlzdDogVmlkZW9MaXN0XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgIHVzZXJJbmZvOm51bGxcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGJpbmRVcFZpZGVvIChlKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICBsZXQgdGl0bGUgPSBlLmRldGFpbC52YWx1ZS50aXRsZVxyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBlLmRldGFpbC52YWx1ZS5wbGF5ZXJcclxuICAgICAgICBsZXQgYWdlID0gZS5kZXRhaWwudmFsdWUuYWdlXHJcbiAgICAgICAgbGV0IHN0dWR5YWdlID0gZS5kZXRhaWwudmFsdWUuc3R1ZHlhZ2VcclxuICAgICAgICBsZXQgbmlja05hbWUgPSB0aGF0LnVzZXJJbmZvLm5pY2tOYW1lXHJcbiAgICAgICAgbGV0IHVybCA9IHRoYXQudXNlckluZm8uYXZhdGFyVXJsXHJcbiAgICAgICAgdGhhdC5oaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIHdlcHkuY2hvb3NlVmlkZW8oe1xyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBkYi5pbnNlcnREYXRhKHRpdGxlLCBwbGF5ZXIsIGFnZSwgc3R1ZHlhZ2UsIG5pY2tOYW1lLCB1cmwsIHJlcykudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcclxuICAgICAgICAgICAgICB0aGF0LmhpZGRlbiA9IHRydWVcclxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnaW5kZXgnXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJJbmZvKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiJdfQ==