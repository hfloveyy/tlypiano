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
          diary.save().then(function (res) {
            resolve("success");
          }, function (err) {
            reject("error");
          });
        });
      });
      return promise;
    }
  },
  zan: function zan(id) {
    var Diary = _bmob2.default.Object.extend("diary");
    var query = new _bmob2.default.Query(Diary);
    var user = _bmob2.default.User.current();

    var Zan_user = _bmob2.default.Object.extend("zan_user");
    var zan_user_query = new _bmob2.default.Query(Zan_user);
    zan_user_query.equalTo("userid", user.id);
    zan_user_query.equalTo("videoid", id);

    var promise = new Promise(function (resolve, reject) {
      zan_user_query.find({
        success: function success(results) {
          //console.log("共查询到 " + results.length + " 条记录");
          if (results.length) {
            resolve({
              isLike: true
            });
          } else {
            var object = new Zan_user();
            object.set("userid", user.id);
            object.set("videoid", id);
            object.save();
            query.get(id, {
              success: function success(result) {
                result.increment("isLike");
                result.save();
                console.log("点赞成功");
                resolve({
                  result: result,
                  isLike: result.get("isLike")
                });
              },
              error: function error(object, _error2) {
                // 查询失败
              }
            });
          }
        },
        error: function error(_error3) {
          console.log("查询失败: " + _error3.code + " " + _error3.message);
        }
      });
    });
    return promise;
  },
  isZan: function isZan() {},
  Bmob: function Bmob() {
    return _bmob2.default;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwicmVzdWx0cyIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJzdWNjZXNzIiwiZGF0YSIsImVycm9yIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIkFycmF5IiwibGVuZ3RoIiwiZGlhcnkiLCJuYW1lIiwiZmlsZSIsIkZpbGUiLCJzYXZlIiwidGhlbiIsInNldCIsIlN0cmluZyIsImVyciIsInphbiIsImlkIiwidXNlciIsIlVzZXIiLCJjdXJyZW50IiwiWmFuX3VzZXIiLCJ6YW5fdXNlcl9xdWVyeSIsImVxdWFsVG8iLCJpc0xpa2UiLCJvYmplY3QiLCJnZXQiLCJyZXN1bHQiLCJpbmNyZW1lbnQiLCJjb25zb2xlIiwibG9nIiwiY29kZSIsIm1lc3NhZ2UiLCJpc1phbiIsIkJtb2IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSUEsZUFBS0EsVUFBTCxDQUFnQixrQ0FBaEIsRUFBb0Qsa0NBQXBEOztrQkFFZTtBQUNiQyxTQURhLHFCQUNIO0FBQ1IsUUFBSUMsUUFBUSxlQUFLQyxNQUFMLENBQVlDLE1BQVosQ0FBbUIsT0FBbkIsQ0FBWjtBQUNBLFFBQUlDLFFBQVEsSUFBSSxlQUFLQyxLQUFULENBQWVKLEtBQWYsQ0FBWjtBQUNBRyxVQUFNRSxLQUFOLENBQVksRUFBWjtBQUNBRixVQUFNRyxVQUFOLENBQWlCLFdBQWpCO0FBQ0EsUUFBSUMsVUFBVSxFQUFkO0FBQ0EsUUFBSUMsVUFBVSxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDbERS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Z0JBQUlDLFNBQVMsSUFBSUosUUFBSixFQUFiO0FBQ0FJLG1CQUFPWixHQUFQLENBQVcsUUFBWCxFQUFxQkssS0FBS0QsRUFBMUI7QUFDQVEsbUJBQU9aLEdBQVAsQ0FBVyxTQUFYLEVBQXNCSSxFQUF0QjtBQUNBUSxtQkFBT2QsSUFBUDtBQUNBNUIsa0JBQU0yQyxHQUFOLENBQVVULEVBQVYsRUFBYztBQUNaeEIsdUJBQVMsaUJBQVNrQyxNQUFULEVBQWlCO0FBQ3hCQSx1QkFBT0MsU0FBUCxDQUFpQixRQUFqQjtBQUNBRCx1QkFBT2hCLElBQVA7QUFDQWtCLHdCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBeEMsd0JBQVE7QUFDUHFDLDBCQUFPQSxNQURBO0FBRVBILDBCQUFPRyxPQUFPRCxHQUFQLENBQVcsUUFBWDtBQUZBLGlCQUFSO0FBSUQsZUFUVztBQVVaL0IscUJBQU8sZUFBUzhCLE1BQVQsRUFBaUI5QixPQUFqQixFQUF3QjtBQUM3QjtBQUNEO0FBWlcsYUFBZDtBQWNEO0FBQ0YsU0EzQmlCO0FBNEJsQkEsZUFBTyxlQUFTQSxPQUFULEVBQWdCO0FBQ3JCa0Msa0JBQVFDLEdBQVIsQ0FBWSxXQUFXbkMsUUFBTW9DLElBQWpCLEdBQXdCLEdBQXhCLEdBQThCcEMsUUFBTXFDLE9BQWhEO0FBQ0Q7QUE5QmlCLE9BQXBCO0FBZ0NILEtBakNhLENBQWQ7QUFrQ0EsV0FBTzVDLE9BQVA7QUFDRixHQWpHWTtBQXNHYjZDLE9BdEdhLG1CQXNHTixDQUVOLENBeEdZO0FBMEdiQyxNQTFHYSxrQkEwR1A7QUFDSjtBQUNEO0FBNUdZLEMiLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG5pbXBvcnQgQm1vYiBmcm9tICcuL2Jtb2IuanMnXHJcbmltcG9ydCBibW9iU29ja2V0SW8gZnJvbSAnLi9ibW9iU29ja2V0SW8uanMnXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5cclxuXHJcbkJtb2IuaW5pdGlhbGl6ZShcIjdjNzA4ODQ3MDc0M2EyMzIyZTQwY2MwOTg4ZmVmNjY5XCIsIFwiMjVlNzg0MmY4NDU3OGJkYTZjNGJkOTQ2YmI0YjRjZGNcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0TGlzdCgpIHtcclxuICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgbGV0IHF1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoRGlhcnkpO1xyXG4gICAgcXVlcnkubGltaXQoMTApO1xyXG4gICAgcXVlcnkuZGVzY2VuZGluZygndXBkYXRlZEF0JylcclxuICAgIGxldCByZXN1bHRzID0gW11cclxuICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHF1ZXJ5LmZpbmQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHRzXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5p+l6K+i5aSx6LSlOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgLy8g5p+l6K+i5omA5pyJ5pWw5o2uXHJcbiAgICByZXR1cm4gcHJvbWlzZVxyXG4gIH1cclxuXHJcbixcclxuICBpbnNlcnREYXRhKHRpdGxlLCBwbGF5ZXIsIGFnZSwgc3R1ZHlhZ2UsIG5pY2tOYW1lLCB1cmwscmVzKXtcclxuICAgIGxldCB0ZW1wRmlsZVBhdGggPSBBcnJheShyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgIGlmICh0ZW1wRmlsZVBhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgICAgbGV0IGRpYXJ5ID0gbmV3IERpYXJ5KCk7XHJcbiAgICAgIGxldCBuYW1lID0gdGl0bGUrXCIubXA0XCI7XHJcbiAgICAgIGxldCBmaWxlID0gbmV3IEJtb2IuRmlsZShuYW1lLCB0ZW1wRmlsZVBhdGgpO1xyXG4gICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZpbGUuc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgIGRpYXJ5LnNldChcInRpdGxlXCIsIHRpdGxlKTtcclxuICAgICAgICAgIGRpYXJ5LnNldChcInBsYXllclwiLCBwbGF5ZXIpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJzcmNcIiwgU3RyaW5nKHJlcy51cmwoKSkpO1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwiYWdlXCIsIGFnZSlcclxuICAgICAgICAgIGRpYXJ5LnNldChcInN0dWR5YWdlXCIsIHN0dWR5YWdlKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwibmlja05hbWVcIiwgbmlja05hbWUpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJ1cmxcIiwgdXJsKVxyXG4gICAgICAgICAgZGlhcnkuc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIHJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG4gIH1cclxuLFxyXG4gIHphbihpZCkge1xyXG4gICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgIGxldCBxdWVyeSA9IG5ldyBCbW9iLlF1ZXJ5KERpYXJ5KTtcclxuICAgICBsZXQgdXNlciA9IEJtb2IuVXNlci5jdXJyZW50KCk7XHJcblxyXG4gICAgIGxldCBaYW5fdXNlciA9IEJtb2IuT2JqZWN0LmV4dGVuZChcInphbl91c2VyXCIpO1xyXG4gICAgIGxldCB6YW5fdXNlcl9xdWVyeSA9IG5ldyBCbW9iLlF1ZXJ5KFphbl91c2VyKTtcclxuICAgICB6YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidXNlcmlkXCIsIHVzZXIuaWQpO1xyXG4gICAgIHphbl91c2VyX3F1ZXJ5LmVxdWFsVG8oXCJ2aWRlb2lkXCIsIGlkKTtcclxuXHJcbiAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgemFuX3VzZXJfcXVlcnkuZmluZCh7XHJcbiAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuWFseafpeivouWIsCBcIiArIHJlc3VsdHMubGVuZ3RoICsgXCIg5p2h6K6w5b2VXCIpO1xyXG4gICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xpa2U6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBsZXQgb2JqZWN0ID0gbmV3IFphbl91c2VyKClcclxuICAgICAgICAgICAgICAgb2JqZWN0LnNldChcInVzZXJpZFwiLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICBvYmplY3Quc2V0KFwidmlkZW9pZFwiLCBpZClcclxuICAgICAgICAgICAgICAgb2JqZWN0LnNhdmUoKVxyXG4gICAgICAgICAgICAgICBxdWVyeS5nZXQoaWQsIHtcclxuICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbmNyZW1lbnQoXCJpc0xpa2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICByZXN1bHQuc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLngrnotZ7miJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6cmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTGlrZTpyZXN1bHQuZ2V0KFwiaXNMaWtlXCIpXHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihvYmplY3QsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAvLyDmn6Xor6LlpLHotKVcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuafpeivouWksei0pTogXCIgKyBlcnJvci5jb2RlICsgXCIgXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pXHJcbiAgICAgfSlcclxuICAgICByZXR1cm4gcHJvbWlzZVxyXG4gIH1cclxuXHJcblxyXG5cclxuLCAgXHJcbiAgaXNaYW4oKXtcclxuXHJcbiAgfVxyXG4sICBcclxuICBCbW9iKCl7XHJcbiAgICByZXR1cm4gQm1vYlxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==