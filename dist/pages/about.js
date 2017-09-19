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

var About = function (_wepy$page) {
  _inherits(About, _wepy$page);

  function About() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, About);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = About.__proto__ || Object.getPrototypeOf(About)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '天籁音钢琴艺术教室'
    }, _this.components = {
      panel: _panel2.default,
      videolist: _videolist2.default
    }, _this.data = {
      imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(About, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return About;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(About , 'pages/about'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0LmpzIl0sIm5hbWVzIjpbIkFib3V0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJwYW5lbCIsInZpZGVvbGlzdCIsImRhdGEiLCJpbWdVcmxzIiwiaW5kaWNhdG9yRG90cyIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsIm1ldGhvZHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDLDRCQURXO0FBRVhDO0FBRlcsSyxRQUliQyxJLEdBQU87QUFDTEMsZUFBUSxDQUNSLHNFQURRLEVBRVIsc0VBRlEsRUFHUixzRUFIUSxDQURIO0FBTUxDLHFCQUFlLEtBTlY7QUFPTEMsZ0JBQVUsSUFQTDtBQVFMQyxnQkFBVSxJQVJMO0FBU0xDLGdCQUFVO0FBVEwsSyxRQVdQQyxPLEdBQVUsRTs7Ozs7NkJBR0QsQ0FBRTs7OztFQXRCc0IsZUFBS0MsSTs7a0JBQW5CYixLIiwiZmlsZSI6ImFib3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgVmlkZW9MaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdmlkZW9saXN0J1xyXG4gIGltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFib3V0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wkqeexgemfs+mSoueQtOiJuuacr+aVmeWupCdcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIHBhbmVsOiBQYW5lbCxcclxuICAgICAgdmlkZW9saXN0OiBWaWRlb0xpc3RcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGltZ1VybHM6W1xyXG4gICAgICAnaHR0cDovL2ltZzAyLnRvb29wZW4uY29tL2ltYWdlcy8yMDE1MDkyOC90b29vcGVuX3N5XzE0MzkxMjc1NTcyNi5qcGcnLFxyXG4gICAgICAnaHR0cDovL2ltZzA2LnRvb29wZW4uY29tL2ltYWdlcy8yMDE2MDgxOC90b29vcGVuX3N5XzE3NTg2NjQzNDI5Ni5qcGcnLFxyXG4gICAgICAnaHR0cDovL2ltZzA2LnRvb29wZW4uY29tL2ltYWdlcy8yMDE2MDgxOC90b29vcGVuX3N5XzE3NTgzMzA0NzcxNS5qcGcnXHJcbiAgICAgIF0sXHJcbiAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxyXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXHJcbiAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG5cclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHt9XHJcbiAgfVxyXG5cclxuIl19