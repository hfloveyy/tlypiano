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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '天籁音钢琴艺术教室'
    }, _this.components = {
      panel: _panel2.default,
      videolist: _videolist2.default
    }, _this.data = {
      item: { src: '', title: '' }
    }, _this.methods = {
      tap: function tap() {
        console.log(this.$name);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var src = options.src;
      var title = options.title;
      var player = options.player;
      var age = options.age;
      var studyage = options.studyage;
      console.log('detail src:' + src);
      console.log('title: ' + title);
      this.item.src = src;
      this.item.title = title;
      this.item.player = player;
      this.item.age = age;
      this.item.studyage = studyage;
      this.$apply();
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwicGFuZWwiLCJ2aWRlb2xpc3QiLCJkYXRhIiwiaXRlbSIsInNyYyIsInRpdGxlIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCIkbmFtZSIsIm9wdGlvbnMiLCJwbGF5ZXIiLCJhZ2UiLCJzdHVkeWFnZSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsNEJBRFc7QUFFWEM7QUFGVyxLLFFBSWJDLEksR0FBTztBQUNMQyxZQUFNLEVBQUNDLEtBQUssRUFBTixFQUFVQyxPQUFPLEVBQWpCO0FBREQsSyxRQUdQQyxPLEdBQVU7QUFDUkMsU0FEUSxpQkFDRDtBQUNMQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtDLEtBQWpCO0FBQ0Q7QUFITyxLOzs7OzsyQkFLSEMsTyxFQUFTO0FBQ2QsVUFBSVAsTUFBTU8sUUFBUVAsR0FBbEI7QUFDQSxVQUFJQyxRQUFRTSxRQUFRTixLQUFwQjtBQUNBLFVBQUlPLFNBQVNELFFBQVFDLE1BQXJCO0FBQ0EsVUFBSUMsTUFBTUYsUUFBUUUsR0FBbEI7QUFDQSxVQUFJQyxXQUFXSCxRQUFRRyxRQUF2QjtBQUNBTixjQUFRQyxHQUFSLENBQVksZ0JBQWdCTCxHQUE1QjtBQUNBSSxjQUFRQyxHQUFSLENBQVksWUFBWUosS0FBeEI7QUFDQSxXQUFLRixJQUFMLENBQVVDLEdBQVYsR0FBZ0JBLEdBQWhCO0FBQ0EsV0FBS0QsSUFBTCxDQUFVRSxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBLFdBQUtGLElBQUwsQ0FBVVMsTUFBVixHQUFtQkEsTUFBbkI7QUFDQSxXQUFLVCxJQUFMLENBQVVVLEdBQVYsR0FBZ0JBLEdBQWhCO0FBQ0EsV0FBS1YsSUFBTCxDQUFVVyxRQUFWLEdBQXFCQSxRQUFyQjtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7O3dDQUNtQixDQUNuQjs7OztFQWhDZ0MsZUFBS0MsSTs7a0JBQW5CcEIsSyIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBWaWRlb0xpc3QgZnJvbSAnLi4vY29tcG9uZW50cy92aWRlb2xpc3QnXHJcbiAgaW1wb3J0IFBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aSp57GB6Z+z6ZKi55C06Im65pyv5pWZ5a6kJ1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgcGFuZWw6IFBhbmVsLFxyXG4gICAgICB2aWRlb2xpc3Q6IFZpZGVvTGlzdFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgaXRlbToge3NyYzogJycsIHRpdGxlOiAnJ31cclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRhcCAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgbGV0IHNyYyA9IG9wdGlvbnMuc3JjXHJcbiAgICAgIGxldCB0aXRsZSA9IG9wdGlvbnMudGl0bGVcclxuICAgICAgbGV0IHBsYXllciA9IG9wdGlvbnMucGxheWVyXHJcbiAgICAgIGxldCBhZ2UgPSBvcHRpb25zLmFnZVxyXG4gICAgICBsZXQgc3R1ZHlhZ2UgPSBvcHRpb25zLnN0dWR5YWdlXHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZXRhaWwgc3JjOicgKyBzcmMpXHJcbiAgICAgIGNvbnNvbGUubG9nKCd0aXRsZTogJyArIHRpdGxlKVxyXG4gICAgICB0aGlzLml0ZW0uc3JjID0gc3JjXHJcbiAgICAgIHRoaXMuaXRlbS50aXRsZSA9IHRpdGxlXHJcbiAgICAgIHRoaXMuaXRlbS5wbGF5ZXIgPSBwbGF5ZXJcclxuICAgICAgdGhpcy5pdGVtLmFnZSA9IGFnZVxyXG4gICAgICB0aGlzLml0ZW0uc3R1ZHlhZ2UgPSBzdHVkeWFnZVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgIH1cclxuICB9XHJcblxyXG4iXX0=