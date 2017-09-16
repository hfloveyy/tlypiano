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
              that.hidden = true;
              wx.switchTab({
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
      //console.log(this.userInfo)
    }
  }]);

  return Post;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Post , 'pages/post'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3QuanMiXSwibmFtZXMiOlsiUG9zdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwicGFuZWwiLCJ2aWRlb2xpc3QiLCJkYXRhIiwiaGlkZGVuIiwidXNlckluZm8iLCJtZXRob2RzIiwiYmluZFVwVmlkZW8iLCJlIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsImRldGFpbCIsInZhbHVlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsImF2YXRhclVybCIsImNob29zZVZpZGVvIiwic3VjY2VzcyIsInJlcyIsImluc2VydERhdGEiLCJ0aGVuIiwid3giLCJzd2l0Y2hUYWIiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsNEJBRFc7QUFFWEM7QUFGVyxLLFFBSWJDLEksR0FBTztBQUNMQyxjQUFRLElBREg7QUFFTEMsZ0JBQVM7QUFGSixLLFFBSVBDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDS0MsQ0FETCxFQUNRO0FBQ2QsWUFBSUMsT0FBTyxJQUFYO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVlILENBQVo7QUFDQSxZQUFJSSxRQUFRSixFQUFFSyxNQUFGLENBQVNDLEtBQVQsQ0FBZUYsS0FBM0I7QUFDQSxZQUFJRyxTQUFTUCxFQUFFSyxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsTUFBNUI7QUFDQSxZQUFJQyxNQUFNUixFQUFFSyxNQUFGLENBQVNDLEtBQVQsQ0FBZUUsR0FBekI7QUFDQSxZQUFJQyxXQUFXVCxFQUFFSyxNQUFGLENBQVNDLEtBQVQsQ0FBZUcsUUFBOUI7QUFDQSxZQUFJQyxXQUFXVCxLQUFLSixRQUFMLENBQWNhLFFBQTdCO0FBQ0EsWUFBSUMsTUFBTVYsS0FBS0osUUFBTCxDQUFjZSxTQUF4QjtBQUNBWCxhQUFLTCxNQUFMLEdBQWMsS0FBZDtBQUNBLHVCQUFLaUIsV0FBTCxDQUFpQjtBQUNmQyxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLHlCQUFHQyxVQUFILENBQWNaLEtBQWQsRUFBcUJHLE1BQXJCLEVBQTZCQyxHQUE3QixFQUFrQ0MsUUFBbEMsRUFBNENDLFFBQTVDLEVBQXNEQyxHQUF0RCxFQUEyREksR0FBM0QsRUFBZ0VFLElBQWhFLENBQXFFLFVBQVNGLEdBQVQsRUFBYTtBQUNoRmQsbUJBQUtMLE1BQUwsR0FBYyxJQUFkO0FBQ0FzQixpQkFBR0MsU0FBSCxDQUFhO0FBQ1hSLHFCQUFLO0FBRE0sZUFBYjtBQUdELGFBTEQ7QUFNRDtBQVJjLFNBQWpCO0FBVUQ7QUFyQk8sSzs7Ozs7NkJBdUJEO0FBQ1AsV0FBS2QsUUFBTCxHQUFnQixLQUFLdUIsT0FBTCxDQUFhQyxXQUFiLEVBQWhCO0FBQ0E7QUFDRDs7OztFQXRDK0IsZUFBS0MsSTs7a0JBQWxCakMsSSIsImZpbGUiOiJwb3N0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVmlkZW9MaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdmlkZW9saXN0J1xyXG4gIGltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4iuS8oOinhumikSdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIHBhbmVsOiBQYW5lbCxcclxuICAgICAgdmlkZW9saXN0OiBWaWRlb0xpc3RcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgdXNlckluZm86bnVsbFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgYmluZFVwVmlkZW8gKGUpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIGxldCB0aXRsZSA9IGUuZGV0YWlsLnZhbHVlLnRpdGxlXHJcbiAgICAgICAgbGV0IHBsYXllciA9IGUuZGV0YWlsLnZhbHVlLnBsYXllclxyXG4gICAgICAgIGxldCBhZ2UgPSBlLmRldGFpbC52YWx1ZS5hZ2VcclxuICAgICAgICBsZXQgc3R1ZHlhZ2UgPSBlLmRldGFpbC52YWx1ZS5zdHVkeWFnZVxyXG4gICAgICAgIGxldCBuaWNrTmFtZSA9IHRoYXQudXNlckluZm8ubmlja05hbWVcclxuICAgICAgICBsZXQgdXJsID0gdGhhdC51c2VySW5mby5hdmF0YXJVcmxcclxuICAgICAgICB0aGF0LmhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgd2VweS5jaG9vc2VWaWRlbyh7XHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGRiLmluc2VydERhdGEodGl0bGUsIHBsYXllciwgYWdlLCBzdHVkeWFnZSwgbmlja05hbWUsIHVybCwgcmVzKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgdGhhdC5oaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2luZGV4J1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKClcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnVzZXJJbmZvKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiJdfQ==