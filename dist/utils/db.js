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
  insertData: function insertData(title, player, age, studyage, res) {
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
          diary.save();
        });
      });
      return promise;
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwicmVzdWx0cyIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJzdWNjZXNzIiwiZGF0YSIsImVycm9yIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJyZXMiLCJ0ZW1wRmlsZVBhdGgiLCJBcnJheSIsImxlbmd0aCIsImRpYXJ5IiwibmFtZSIsImZpbGUiLCJGaWxlIiwic2F2ZSIsInRoZW4iLCJzZXQiLCJTdHJpbmciLCJ1cmwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSUEsZUFBS0EsVUFBTCxDQUFnQixrQ0FBaEIsRUFBb0Qsa0NBQXBEOztrQkFFZTtBQUNiQyxTQURhLHFCQUNIO0FBQ1IsUUFBSUMsUUFBUSxlQUFLQyxNQUFMLENBQVlDLE1BQVosQ0FBbUIsT0FBbkIsQ0FBWjtBQUNBLFFBQUlDLFFBQVEsSUFBSSxlQUFLQyxLQUFULENBQWVKLEtBQWYsQ0FBWjtBQUNBRyxVQUFNRSxLQUFOLENBQVksRUFBWjtBQUNBRixVQUFNRyxVQUFOLENBQWlCLFdBQWpCO0FBQ0EsUUFBSUMsVUFBVSxFQUFkO0FBQ0EsUUFBSUMsVUFBVSxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDbERSLFlBQU1TLElBQU4sQ0FBVztBQUNUQyxpQkFBUyxpQkFBU04sT0FBVCxFQUFrQjtBQUN6Qkcsa0JBQVE7QUFDTkksa0JBQU1QO0FBREEsV0FBUjtBQUdELFNBTFE7QUFNVFEsZUFBTyxlQUFTQSxNQUFULEVBQWdCO0FBQ3JCO0FBQ0FKLGlCQUFPSSxNQUFQO0FBQ0Q7QUFUUSxPQUFYO0FBV0QsS0FaYSxDQUFkO0FBYUE7QUFDQSxXQUFPUCxPQUFQO0FBQ0QsR0F0Qlk7QUF5QmJRLFlBekJhLHNCQXlCRkMsS0F6QkUsRUF5QktDLE1BekJMLEVBeUJhQyxHQXpCYixFQXlCa0JDLFFBekJsQixFQXlCNEJDLEdBekI1QixFQXlCZ0M7QUFDM0MsUUFBSUMsZUFBZUMsTUFBTUYsSUFBSUMsWUFBVixDQUFuQjtBQUNBLFFBQUlBLGFBQWFFLE1BQWIsR0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSXhCLFFBQVEsZUFBS0MsTUFBTCxDQUFZQyxNQUFaLENBQW1CLE9BQW5CLENBQVo7QUFDQSxVQUFJdUIsUUFBUSxJQUFJekIsS0FBSixFQUFaO0FBQ0EsVUFBSTBCLE9BQU9ULFFBQU0sTUFBakI7QUFDQSxVQUFJVSxPQUFPLElBQUksZUFBS0MsSUFBVCxDQUFjRixJQUFkLEVBQW9CSixZQUFwQixDQUFYO0FBQ0EsVUFBSWQsVUFBVSxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDbERnQixhQUFLRSxJQUFMLEdBQVlDLElBQVosQ0FBaUIsVUFBU1QsR0FBVCxFQUFhO0FBQzVCSSxnQkFBTU0sR0FBTixDQUFVLE9BQVYsRUFBbUJkLEtBQW5CO0FBQ0FRLGdCQUFNTSxHQUFOLENBQVUsUUFBVixFQUFvQmIsTUFBcEI7QUFDQU8sZ0JBQU1NLEdBQU4sQ0FBVSxLQUFWLEVBQWlCQyxPQUFPWCxJQUFJWSxHQUFKLEVBQVAsQ0FBakI7QUFDQVIsZ0JBQU1NLEdBQU4sQ0FBVSxLQUFWLEVBQWlCWixHQUFqQjtBQUNBTSxnQkFBTU0sR0FBTixDQUFVLFVBQVYsRUFBc0JYLFFBQXRCO0FBQ0FLLGdCQUFNSSxJQUFOO0FBQ0QsU0FQRDtBQVFELE9BVGEsQ0FBZDtBQVVBLGFBQU9yQixPQUFQO0FBQ0Q7QUFDRjtBQTVDWSxDIiwiZmlsZSI6ImRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuaW1wb3J0IEJtb2IgZnJvbSAnLi9ibW9iLmpzJ1xyXG5pbXBvcnQgYm1vYlNvY2tldElvIGZyb20gJy4vYm1vYlNvY2tldElvLmpzJ1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuXHJcblxyXG5CbW9iLmluaXRpYWxpemUoXCI3YzcwODg0NzA3NDNhMjMyMmU0MGNjMDk4OGZlZjY2OVwiLCBcIjI1ZTc4NDJmODQ1NzhiZGE2YzRiZDk0NmJiNGI0Y2RjXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldExpc3QoKSB7XHJcbiAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgIGxldCBxdWVyeSA9IG5ldyBCbW9iLlF1ZXJ5KERpYXJ5KTtcclxuICAgIHF1ZXJ5LmxpbWl0KDEwKTtcclxuICAgIHF1ZXJ5LmRlc2NlbmRpbmcoJ3VwZGF0ZWRBdCcpXHJcbiAgICBsZXQgcmVzdWx0cyA9IFtdXHJcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBxdWVyeS5maW5kKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0c1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuafpeivouWksei0pTogXCIgKyBlcnJvci5jb2RlICsgXCIgXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIC8vIOafpeivouaJgOacieaVsOaNrlxyXG4gICAgcmV0dXJuIHByb21pc2VcclxuICB9XHJcblxyXG4sXHJcbiAgaW5zZXJ0RGF0YSh0aXRsZSwgcGxheWVyLCBhZ2UsIHN0dWR5YWdlLCByZXMpe1xyXG4gICAgbGV0IHRlbXBGaWxlUGF0aCA9IEFycmF5KHJlcy50ZW1wRmlsZVBhdGgpO1xyXG4gICAgaWYgKHRlbXBGaWxlUGF0aC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgICBsZXQgZGlhcnkgPSBuZXcgRGlhcnkoKTtcclxuICAgICAgbGV0IG5hbWUgPSB0aXRsZStcIi5tcDRcIjtcclxuICAgICAgbGV0IGZpbGUgPSBuZXcgQm1vYi5GaWxlKG5hbWUsIHRlbXBGaWxlUGF0aCk7XHJcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZmlsZS5zYXZlKCkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwidGl0bGVcIiwgdGl0bGUpO1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwicGxheWVyXCIsIHBsYXllcilcclxuICAgICAgICAgIGRpYXJ5LnNldChcInNyY1wiLCBTdHJpbmcocmVzLnVybCgpKSk7XHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJhZ2VcIiwgYWdlKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwic3R1ZHlhZ2VcIiwgc3R1ZHlhZ2UpXHJcbiAgICAgICAgICBkaWFyeS5zYXZlKClcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==