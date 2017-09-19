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
    }, _this.data = {}, _this.methods = {
      tap: function tap(url, title, player, age, studyage, e) {
        _wepy2.default.navigateTo({
          url: 'detail?src=' + url + '&title=' + title + '&player=' + player + '&age=' + age + '&studyage=' + studyage
        });
      },
      zan: function zan(e) {
        console.log("点赞");
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoList, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('videolist onLoad');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJwcm9wcyIsImxpc3QiLCJkYXRhIiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsInphbiIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsWUFBTTtBQURBLEssUUFJUkMsSSxHQUFPLEUsUUFNUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsR0FERyxFQUNFQyxLQURGLEVBQ1NDLE1BRFQsRUFDaUJDLEdBRGpCLEVBQ3NCQyxRQUR0QixFQUNnQ0MsQ0FEaEMsRUFDbUM7QUFDekMsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZE4sZUFBSyxnQkFBZ0JBLEdBQWhCLEdBQXNCLFNBQXRCLEdBQWlDQyxLQUFqQyxHQUF3QyxVQUF4QyxHQUFvREMsTUFBcEQsR0FBNEQsT0FBNUQsR0FBcUVDLEdBQXJFLEdBQTBFLFlBQTFFLEdBQXdGQztBQUQvRSxTQUFoQjtBQUdELE9BTE87QUFNUkcsU0FOUSxlQU1IRixDQU5HLEVBTUQ7QUFDTEcsZ0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0Q7QUFSTyxLOzs7Ozs2QkFXRDtBQUNQRCxjQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs7RUE3Qm9DLGVBQUtDLFM7O2tCQUF2QmhCLFMiLCJmaWxlIjoidmlkZW9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgZGIgZnJvbSAnLi4vdXRpbHMvZGInXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW9MaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIGxpc3Q6IHt9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0YXAgKHVybCwgdGl0bGUgLHBsYXllciwgYWdlLCBzdHVkeWFnZSwgZSkge1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6ICdkZXRhaWw/c3JjPScgKyB1cmwgKyAnJnRpdGxlPScrIHRpdGxlICsnJnBsYXllcj0nKyBwbGF5ZXIgKycmYWdlPScrIGFnZSArJyZzdHVkeWFnZT0nKyBzdHVkeWFnZSBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICB6YW4gKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi54K56LWeXCIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd2aWRlb2xpc3Qgb25Mb2FkJylcclxuICAgICAgLy9sZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIC8vY29uc29sZS5sb2cocmVzLmRhdGEpXHJcbiAgICAgIC8vdGhpcy5saXN0ID0gcmVzLmRhdGFcclxuICAgICAgLy90aGlzLiRhcHBseSgpXHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5saXN0KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4iXX0=