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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.props = {
      list: []
    }, _this.methods = {
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
      console.log(this.list);
      console.log(this.$parent.list);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJkYXRhIiwicHJvcHMiLCJsaXN0IiwibWV0aG9kcyIsInRhcCIsInVybCIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJlIiwibmF2aWdhdGVUbyIsImNvbnNvbGUiLCJsb2ciLCIkcGFyZW50IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPLEUsUUFJUEMsSyxHQUFRO0FBQ05DLFlBQU07QUFEQSxLLFFBSVJDLE8sR0FBVTtBQUNSQyxTQURRLGVBQ0hDLEdBREcsRUFDRUMsS0FERixFQUNTQyxNQURULEVBQ2lCQyxHQURqQixFQUNzQkMsUUFEdEIsRUFDZ0NDLENBRGhDLEVBQ21DO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZE4sZUFBSyxnQkFBZ0JBLEdBQWhCLEdBQXNCLFNBQXRCLEdBQWlDQyxLQUFqQyxHQUF3QyxVQUF4QyxHQUFvREMsTUFBcEQsR0FBNEQsT0FBNUQsR0FBcUVDLEdBQXJFLEdBQTBFLFlBQTFFLEdBQXdGQztBQUQvRSxTQUFoQjtBQUdEO0FBVE8sSzs7Ozs7NkJBWUQ7QUFDUEcsY0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0FELGNBQVFDLEdBQVIsQ0FBWSxLQUFLWCxJQUFqQjtBQUNBVSxjQUFRQyxHQUFSLENBQVksS0FBS0MsT0FBTCxDQUFhWixJQUF6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQTlCb0MsZUFBS2EsUzs7a0JBQXZCaEIsUyIsImZpbGUiOiJ2aWRlb2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBkYiBmcm9tICcuLi91dGlscy9kYidcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgbGlzdDogW11cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0YXAgKHVybCwgdGl0bGUgLHBsYXllciwgYWdlLCBzdHVkeWFnZSwgZSkge1xyXG4gICAgICAgIC8vIHRoaXMubnVtID0gdGhpcy5udW0gKyAxXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLiRuYW1lICsgJyB0YXAnKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3VybDonKyB1cmwpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygndGl0bGU6JysgdGl0bGUpXHJcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogJ2RldGFpbD9zcmM9JyArIHVybCArICcmdGl0bGU9JysgdGl0bGUgKycmcGxheWVyPScrIHBsYXllciArJyZhZ2U9JysgYWdlICsnJnN0dWR5YWdlPScrIHN0dWR5YWdlIFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd2aWRlb2xpc3Qgb25Mb2FkJylcclxuICAgICAgY29uc29sZS5sb2codGhpcy5saXN0KVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQubGlzdCk7XHJcbiAgICAgIC8vbGV0IHJlcyA9IGF3YWl0IGRiLmdldExpc3QoKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICAvL3RoaXMubGlzdCA9IHJlcy5kYXRhXHJcbiAgICAgIC8vdGhpcy4kYXBwbHkoKVxyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuIl19