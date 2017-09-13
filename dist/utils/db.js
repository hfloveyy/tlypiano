'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bmob = require('./bmob.js');

var _bmob2 = _interopRequireDefault(_bmob);

var _bmobSocketIo = require('./bmobSocketIo.js');

var _bmobSocketIo2 = _interopRequireDefault(_bmobSocketIo);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bmob2.default.initialize("7c7088470743a2322e40cc0988fef669", "25e7842f84578bda6c4bd946bb4b4cdc");

exports.default = {
  getList: function getList() {
    var Diary = _bmob2.default.Object.extend("diary");
    var query = new _bmob2.default.Query(Diary);
    query.limit(10);
    query.descending('updatedAt');
    var results = [];
    var promise = new Promise(function (resolve, reject) {
      query.find({
        success: function success(results) {
          resolve({
            data: results
          });
        },
        error: function error(_error) {
          //console.log("查询失败: " + error.code + " " + error.message);
          reject(_error);
        }
      });
    });
    // 查询所有数据
    return promise;
  },
  insertData: function insertData(title, player, age, studyage, nickName, url, res) {
    var tempFilePath = Array(res.tempFilePath);
    if (tempFilePath.length > 0) {
      var Diary = _bmob2.default.Object.extend("diary");
      var diary = new Diary();
      var name = title + ".mp4";
      var file = new _bmob2.default.File(name, tempFilePath);
      var promise = new Promise(function (resolve, reject) {
        file.save().then(function (res) {
          diary.set("title", title);
          diary.set("player", player);
          diary.set("src", String(res.url()));
          diary.set("age", age);
          diary.set("studyage", studyage);
          diary.set("nickName", nickName);
          diary.set("url", url);
          diary.save();
        });
      });
      return promise;
    }
  },
  Bmob: function Bmob() {
    return _bmob2.default;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwicmVzdWx0cyIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJzdWNjZXNzIiwiZGF0YSIsImVycm9yIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIkFycmF5IiwibGVuZ3RoIiwiZGlhcnkiLCJuYW1lIiwiZmlsZSIsIkZpbGUiLCJzYXZlIiwidGhlbiIsInNldCIsIlN0cmluZyIsIkJtb2IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSUEsZUFBS0EsVUFBTCxDQUFnQixrQ0FBaEIsRUFBb0Qsa0NBQXBEOztrQkFFZTtBQUNiQyxTQURhLHFCQUNIO0FBQ1IsUUFBSUMsUUFBUSxlQUFLQyxNQUFMLENBQVlDLE1BQVosQ0FBbUIsT0FBbkIsQ0FBWjtBQUNBLFFBQUlDLFFBQVEsSUFBSSxlQUFLQyxLQUFULENBQWVKLEtBQWYsQ0FBWjtBQUNBRyxVQUFNRSxLQUFOLENBQVksRUFBWjtBQUNBRixVQUFNRyxVQUFOLENBQWlCLFdBQWpCO0FBQ0EsUUFBSUMsVUFBVSxFQUFkO0FBQ0EsUUFBSUMsVUFBVSxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDbERSLFlBQU1TLElBQU4sQ0FBVztBQUNUQyxpQkFBUyxpQkFBU04sT0FBVCxFQUFrQjtBQUN6Qkcsa0JBQVE7QUFDTkksa0JBQU1QO0FBREEsV0FBUjtBQUdELFNBTFE7QUFNVFEsZUFBTyxlQUFTQSxNQUFULEVBQWdCO0FBQ3JCO0FBQ0FKLGlCQUFPSSxNQUFQO0FBQ0Q7QUFUUSxPQUFYO0FBV0QsS0FaYSxDQUFkO0FBYUE7QUFDQSxXQUFPUCxPQUFQO0FBQ0QsR0F0Qlk7QUF5QmJRLFlBekJhLHNCQXlCRkMsS0F6QkUsRUF5QktDLE1BekJMLEVBeUJhQyxHQXpCYixFQXlCa0JDLFFBekJsQixFQXlCNEJDLFFBekI1QixFQXlCc0NDLEdBekJ0QyxFQXlCMENDLEdBekIxQyxFQXlCOEM7QUFDekQsUUFBSUMsZUFBZUMsTUFBTUYsSUFBSUMsWUFBVixDQUFuQjtBQUNBLFFBQUlBLGFBQWFFLE1BQWIsR0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSTFCLFFBQVEsZUFBS0MsTUFBTCxDQUFZQyxNQUFaLENBQW1CLE9BQW5CLENBQVo7QUFDQSxVQUFJeUIsUUFBUSxJQUFJM0IsS0FBSixFQUFaO0FBQ0EsVUFBSTRCLE9BQU9YLFFBQU0sTUFBakI7QUFDQSxVQUFJWSxPQUFPLElBQUksZUFBS0MsSUFBVCxDQUFjRixJQUFkLEVBQW9CSixZQUFwQixDQUFYO0FBQ0EsVUFBSWhCLFVBQVUsSUFBSUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ2xEa0IsYUFBS0UsSUFBTCxHQUFZQyxJQUFaLENBQWlCLFVBQVNULEdBQVQsRUFBYTtBQUM1QkksZ0JBQU1NLEdBQU4sQ0FBVSxPQUFWLEVBQW1CaEIsS0FBbkI7QUFDQVUsZ0JBQU1NLEdBQU4sQ0FBVSxRQUFWLEVBQW9CZixNQUFwQjtBQUNBUyxnQkFBTU0sR0FBTixDQUFVLEtBQVYsRUFBaUJDLE9BQU9YLElBQUlELEdBQUosRUFBUCxDQUFqQjtBQUNBSyxnQkFBTU0sR0FBTixDQUFVLEtBQVYsRUFBaUJkLEdBQWpCO0FBQ0FRLGdCQUFNTSxHQUFOLENBQVUsVUFBVixFQUFzQmIsUUFBdEI7QUFDQU8sZ0JBQU1NLEdBQU4sQ0FBVSxVQUFWLEVBQXNCWixRQUF0QjtBQUNBTSxnQkFBTU0sR0FBTixDQUFVLEtBQVYsRUFBaUJYLEdBQWpCO0FBQ0FLLGdCQUFNSSxJQUFOO0FBQ0QsU0FURDtBQVVELE9BWGEsQ0FBZDtBQVlBLGFBQU92QixPQUFQO0FBQ0Q7QUFDRixHQTlDWTtBQWdEYjJCLE1BaERhLGtCQWdEUDtBQUNKO0FBQ0Q7QUFsRFksQyIsImZpbGUiOiJkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuXHJcbmltcG9ydCBCbW9iIGZyb20gJy4vYm1vYi5qcydcclxuaW1wb3J0IGJtb2JTb2NrZXRJbyBmcm9tICcuL2Jtb2JTb2NrZXRJby5qcydcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcblxyXG5cclxuQm1vYi5pbml0aWFsaXplKFwiN2M3MDg4NDcwNzQzYTIzMjJlNDBjYzA5ODhmZWY2NjlcIiwgXCIyNWU3ODQyZjg0NTc4YmRhNmM0YmQ5NDZiYjRiNGNkY1wiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXRMaXN0KCkge1xyXG4gICAgbGV0IERpYXJ5ID0gQm1vYi5PYmplY3QuZXh0ZW5kKFwiZGlhcnlcIik7XHJcbiAgICBsZXQgcXVlcnkgPSBuZXcgQm1vYi5RdWVyeShEaWFyeSk7XHJcbiAgICBxdWVyeS5saW1pdCgxMCk7XHJcbiAgICBxdWVyeS5kZXNjZW5kaW5nKCd1cGRhdGVkQXQnKVxyXG4gICAgbGV0IHJlc3VsdHMgPSBbXVxyXG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgcXVlcnkuZmluZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdHNcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCLmn6Xor6LlpLHotKU6IFwiICsgZXJyb3IuY29kZSArIFwiIFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICAvLyDmn6Xor6LmiYDmnInmlbDmja5cclxuICAgIHJldHVybiBwcm9taXNlXHJcbiAgfVxyXG5cclxuLFxyXG4gIGluc2VydERhdGEodGl0bGUsIHBsYXllciwgYWdlLCBzdHVkeWFnZSwgbmlja05hbWUsIHVybCxyZXMpe1xyXG4gICAgbGV0IHRlbXBGaWxlUGF0aCA9IEFycmF5KHJlcy50ZW1wRmlsZVBhdGgpO1xyXG4gICAgaWYgKHRlbXBGaWxlUGF0aC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgICBsZXQgZGlhcnkgPSBuZXcgRGlhcnkoKTtcclxuICAgICAgbGV0IG5hbWUgPSB0aXRsZStcIi5tcDRcIjtcclxuICAgICAgbGV0IGZpbGUgPSBuZXcgQm1vYi5GaWxlKG5hbWUsIHRlbXBGaWxlUGF0aCk7XHJcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZmlsZS5zYXZlKCkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwidGl0bGVcIiwgdGl0bGUpO1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwicGxheWVyXCIsIHBsYXllcilcclxuICAgICAgICAgIGRpYXJ5LnNldChcInNyY1wiLCBTdHJpbmcocmVzLnVybCgpKSk7XHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJhZ2VcIiwgYWdlKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwic3R1ZHlhZ2VcIiwgc3R1ZHlhZ2UpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJuaWNrTmFtZVwiLCBuaWNrTmFtZSlcclxuICAgICAgICAgIGRpYXJ5LnNldChcInVybFwiLCB1cmwpXHJcbiAgICAgICAgICBkaWFyeS5zYXZlKClcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG4gIH1cclxuLFxyXG4gIEJtb2IoKXtcclxuICAgIHJldHVybiBCbW9iXHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19