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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      list: []
    }, _this.methods = {
      tap: function tap() {
        // this.num = this.num + 1
        console.log(this.$name + ' tap');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoList, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('onLoad');

                _context.next = 3;
                return _db2.default.getList();

              case 3:
                res = _context.sent;

                console.log(res.data);
                this.list = res.data;
                this.$apply();
                console.log(this.list);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShow',
    value: function onShow() {
      console.log('onShow');
    }
  }]);

  return VideoList;
}(_wepy2.default.component);

exports.default = VideoList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvbGlzdC5qcyJdLCJuYW1lcyI6WyJWaWRlb0xpc3QiLCJkYXRhIiwibGlzdCIsIm1ldGhvZHMiLCJ0YXAiLCJjb25zb2xlIiwibG9nIiwiJG5hbWUiLCJnZXRMaXN0IiwicmVzIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFJUEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLEtBQUtDLEtBQUwsR0FBYSxNQUF6QjtBQUNEO0FBSk8sSzs7Ozs7Ozs7Ozs7O0FBUVJGLHdCQUFRQyxHQUFSLENBQVksUUFBWjs7O3VCQUVnQixhQUFHRSxPQUFILEU7OztBQUFaQyxtQjs7QUFDSkosd0JBQVFDLEdBQVIsQ0FBWUcsSUFBSVIsSUFBaEI7QUFDQSxxQkFBS0MsSUFBTCxHQUFZTyxJQUFJUixJQUFoQjtBQUNBLHFCQUFLUyxNQUFMO0FBQ0FMLHdCQUFRQyxHQUFSLENBQVksS0FBS0osSUFBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFFUTtBQUNSRyxjQUFRQyxHQUFSLENBQVksUUFBWjtBQUNEOzs7O0VBdkJvQyxlQUFLSyxTOztrQkFBdkJYLFMiLCJmaWxlIjoidmlkZW9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgZGIgZnJvbSAnLi4vdXRpbHMvZGInXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW9MaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgbGlzdDogW11cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0YXAgKCkge1xyXG4gICAgICAgIC8vIHRoaXMubnVtID0gdGhpcy5udW0gKyAxXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kbmFtZSArICcgdGFwJylcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpXHJcblxyXG4gICAgICBsZXQgcmVzID0gYXdhaXQgZGIuZ2V0TGlzdCgpXHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxyXG4gICAgICB0aGlzLmxpc3QgPSByZXMuZGF0YVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMubGlzdClcclxuICAgIH1cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdvblNob3cnKVxyXG4gICAgfVxyXG4gIH1cclxuIl19