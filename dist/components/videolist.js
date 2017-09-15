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
        // this.num = this.num + 1
        //console.log(this.$name + ' tap')
        //console.log('url:'+ url)
        //console.log('title:'+ title)
        _wepy2.default.navigateTo({
          url: 'detail?src=' + url + '&title=' + title + '&player=' + player + '&age=' + age + '&studyage=' + studyage
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJwcm9wcyIsImxpc3QiLCJkYXRhIiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsWUFBTTtBQURBLEssUUFJUkMsSSxHQUFPLEUsUUFNUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsR0FERyxFQUNFQyxLQURGLEVBQ1NDLE1BRFQsRUFDaUJDLEdBRGpCLEVBQ3NCQyxRQUR0QixFQUNnQ0MsQ0FEaEMsRUFDbUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkTixlQUFLLGdCQUFnQkEsR0FBaEIsR0FBc0IsU0FBdEIsR0FBaUNDLEtBQWpDLEdBQXdDLFVBQXhDLEdBQW9EQyxNQUFwRCxHQUE0RCxPQUE1RCxHQUFxRUMsR0FBckUsR0FBMEUsWUFBMUUsR0FBd0ZDO0FBRC9FLFNBQWhCO0FBR0Q7QUFUTyxLOzs7Ozs2QkFZRDtBQUNQRyxjQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs7RUE5Qm9DLGVBQUtDLFM7O2tCQUF2QmYsUyIsImZpbGUiOiJ2aWRlb2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgbGlzdDoge31cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRhcCAodXJsLCB0aXRsZSAscGxheWVyLCBhZ2UsIHN0dWR5YWdlLCBlKSB7XHJcbiAgICAgICAgLy8gdGhpcy5udW0gPSB0aGlzLm51bSArIDFcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHRhcCcpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygndXJsOicrIHVybClcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCd0aXRsZTonKyB0aXRsZSlcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiAnZGV0YWlsP3NyYz0nICsgdXJsICsgJyZ0aXRsZT0nKyB0aXRsZSArJyZwbGF5ZXI9JysgcGxheWVyICsnJmFnZT0nKyBhZ2UgKycmc3R1ZHlhZ2U9Jysgc3R1ZHlhZ2UgXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3ZpZGVvbGlzdCBvbkxvYWQnKVxyXG4gICAgICAvL2xldCByZXMgPSBhd2FpdCBkYi5nZXRMaXN0KClcclxuICAgICAgLy9jb25zb2xlLmxvZyhyZXMuZGF0YSlcclxuICAgICAgLy90aGlzLmxpc3QgPSByZXMuZGF0YVxyXG4gICAgICAvL3RoaXMuJGFwcGx5KClcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmxpc3QpXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbiJdfQ==