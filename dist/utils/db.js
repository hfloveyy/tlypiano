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
    query.descending('objectId');

    var user = _bmob2.default.User.current();

    //zan_user_query.equalTo("videoid", id);
    var like_array = {};
    var isZan = false;
    var promise = new Promise(function (resolve, reject) {
      query.find({
        success: function success(results) {
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            console.log(object.id);
            var Zan_user = _bmob2.default.Object.extend("zan_user");
            var zan_user_query = new _bmob2.default.Query(Zan_user);
            zan_user_query.equalTo("userid", user.id);
            zan_user_query.equalTo("videoid", object.id);
            zan_user_query.find({
              success: function success(results) {
                console.log(object.id);
                if (results.length) {
                  like_array[object.id] = 1;
                } else {
                  like_array[object.id] = 0;
                }
              },
              error: function error(object, _error) {}
            });
          }
          //console.log(like_array);
          resolve({
            data: results,
            like_array: like_array
          });
        },
        error: function error(_error2) {
          //console.log("查询失败: " + error.code + " " + error.message);
          reject(_error2);
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
              isLike: true,
              result: results[0]
            });
          } else {
            var object = new Zan_user();
            object.set("userid", user.id);
            object.set("videoid", id);
            object.save();
            query.get(id, {
              success: function success(result) {
                likearray[result.id] = 1;
                result.increment("isLike");
                result.save();
                console.log("点赞成功");
                resolve({
                  result: result,
                  isLike: result.get("isLike"),
                  likearray: likearray
                });
              },
              error: function error(object, _error3) {
                // 查询失败
              }
            });
          }
        },
        error: function error(_error4) {
          console.log("查询失败: " + _error4.code + " " + _error4.message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwidXNlciIsIlVzZXIiLCJjdXJyZW50IiwibGlrZV9hcnJheSIsImlzWmFuIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsInN1Y2Nlc3MiLCJyZXN1bHRzIiwiaSIsImxlbmd0aCIsIm9iamVjdCIsImNvbnNvbGUiLCJsb2ciLCJpZCIsIlphbl91c2VyIiwiemFuX3VzZXJfcXVlcnkiLCJlcXVhbFRvIiwiZXJyb3IiLCJkYXRhIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIkFycmF5IiwiZGlhcnkiLCJuYW1lIiwiZmlsZSIsIkZpbGUiLCJzYXZlIiwidGhlbiIsInNldCIsIlN0cmluZyIsImVyciIsInphbiIsImlzTGlrZSIsInJlc3VsdCIsImdldCIsImxpa2VhcnJheSIsImluY3JlbWVudCIsImNvZGUiLCJtZXNzYWdlIiwiQm1vYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFJQSxlQUFLQSxVQUFMLENBQWdCLGtDQUFoQixFQUFvRCxrQ0FBcEQ7O2tCQUVlO0FBQ2JDLFNBRGEscUJBQ0g7QUFDUixRQUFJQyxRQUFRLGVBQUtDLE1BQUwsQ0FBWUMsTUFBWixDQUFtQixPQUFuQixDQUFaO0FBQ0EsUUFBSUMsUUFBUSxJQUFJLGVBQUtDLEtBQVQsQ0FBZUosS0FBZixDQUFaO0FBQ0FHLFVBQU1FLEtBQU4sQ0FBWSxFQUFaO0FBQ0FGLFVBQU1HLFVBQU4sQ0FBaUIsVUFBakI7O0FBRUEsUUFBSUMsT0FBTyxlQUFLQyxJQUFMLENBQVVDLE9BQVYsRUFBWDs7QUFHQTtBQUNBLFFBQUlD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R0FBUCxDQUFXLFNBQVgsRUFBc0J0QixFQUF0QjtBQUNBSCxtQkFBT3VCLElBQVA7QUFDQXpDLGtCQUFNaUQsR0FBTixDQUFVNUIsRUFBVixFQUFjO0FBQ1pQLHVCQUFTLGlCQUFTa0MsTUFBVCxFQUFpQjtBQUN4QkUsMEJBQVVGLE9BQU8zQixFQUFqQixJQUF1QixDQUF2QjtBQUNBMkIsdUJBQU9HLFNBQVAsQ0FBaUIsUUFBakI7QUFDQUgsdUJBQU9QLElBQVA7QUFDQXRCLHdCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBVCx3QkFBUTtBQUNQcUMsMEJBQU9BLE1BREE7QUFFUEQsMEJBQU9DLE9BQU9DLEdBQVAsQ0FBVyxRQUFYLENBRkE7QUFHUEMsNkJBQVVBO0FBSEgsaUJBQVI7QUFLRCxlQVhXO0FBWVp6QixxQkFBTyxlQUFTUCxNQUFULEVBQWlCTyxPQUFqQixFQUF3QjtBQUM3QjtBQUNEO0FBZFcsYUFBZDtBQWdCRDtBQUNGLFNBOUJpQjtBQStCbEJBLGVBQU8sZUFBU0EsT0FBVCxFQUFnQjtBQUNyQk4sa0JBQVFDLEdBQVIsQ0FBWSxXQUFXSyxRQUFNMkIsSUFBakIsR0FBd0IsR0FBeEIsR0FBOEIzQixRQUFNNEIsT0FBaEQ7QUFDRDtBQWpDaUIsT0FBcEI7QUFtQ0gsS0FwQ2EsQ0FBZDtBQXFDQSxXQUFPNUMsT0FBUDtBQUNGLEdBaElZO0FBcUliRCxPQXJJYSxtQkFxSU4sQ0FFTixDQXZJWTtBQXlJYjhDLE1BeklhLGtCQXlJUDtBQUNKO0FBQ0Q7QUEzSVksQyIsImZpbGUiOiJkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuXHJcbmltcG9ydCBCbW9iIGZyb20gJy4vYm1vYi5qcydcclxuaW1wb3J0IGJtb2JTb2NrZXRJbyBmcm9tICcuL2Jtb2JTb2NrZXRJby5qcydcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcblxyXG5cclxuQm1vYi5pbml0aWFsaXplKFwiN2M3MDg4NDcwNzQzYTIzMjJlNDBjYzA5ODhmZWY2NjlcIiwgXCIyNWU3ODQyZjg0NTc4YmRhNmM0YmQ5NDZiYjRiNGNkY1wiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXRMaXN0KCkge1xyXG4gICAgbGV0IERpYXJ5ID0gQm1vYi5PYmplY3QuZXh0ZW5kKFwiZGlhcnlcIik7XHJcbiAgICBsZXQgcXVlcnkgPSBuZXcgQm1vYi5RdWVyeShEaWFyeSk7XHJcbiAgICBxdWVyeS5saW1pdCgxMCk7XHJcbiAgICBxdWVyeS5kZXNjZW5kaW5nKCdvYmplY3RJZCcpXHJcblxyXG4gICAgbGV0IHVzZXIgPSBCbW9iLlVzZXIuY3VycmVudCgpO1xyXG5cclxuICAgIFxyXG4gICAgLy96YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidmlkZW9pZFwiLCBpZCk7XHJcbiAgICBsZXQgbGlrZV9hcnJheSA9IHt9XHJcbiAgICBsZXQgaXNaYW4gPSBmYWxzZVxyXG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgcXVlcnkuZmluZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSByZXN1bHRzW2ldO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICBsZXQgWmFuX3VzZXIgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJ6YW5fdXNlclwiKTtcclxuICAgICAgICAgICAgbGV0IHphbl91c2VyX3F1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoWmFuX3VzZXIpO1xyXG4gICAgICAgICAgICB6YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidXNlcmlkXCIsIHVzZXIuaWQpO1xyXG4gICAgICAgICAgICB6YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidmlkZW9pZFwiLCBvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICB6YW5fdXNlcl9xdWVyeS5maW5kKHtcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHRzKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iamVjdC5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgIGxpa2VfYXJyYXlbb2JqZWN0LmlkXSA9IDFcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBsaWtlX2FycmF5W29iamVjdC5pZF0gPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24ob2JqZWN0LCBlcnJvcil7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhsaWtlX2FycmF5KTtcclxuICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHRzLFxyXG4gICAgICAgICAgICBsaWtlX2FycmF5OiBsaWtlX2FycmF5XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5p+l6K+i5aSx6LSlOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgLy8g5p+l6K+i5omA5pyJ5pWw5o2uXHJcbiAgICByZXR1cm4gcHJvbWlzZVxyXG4gIH1cclxuXHJcbixcclxuICBpbnNlcnREYXRhKHRpdGxlLCBwbGF5ZXIsIGFnZSwgc3R1ZHlhZ2UsIG5pY2tOYW1lLCB1cmwscmVzKXtcclxuICAgIGxldCB0ZW1wRmlsZVBhdGggPSBBcnJheShyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgIGlmICh0ZW1wRmlsZVBhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgICAgbGV0IGRpYXJ5ID0gbmV3IERpYXJ5KCk7XHJcbiAgICAgIGxldCBuYW1lID0gdGl0bGUrXCIubXA0XCI7XHJcbiAgICAgIGxldCBmaWxlID0gbmV3IEJtb2IuRmlsZShuYW1lLCB0ZW1wRmlsZVBhdGgpO1xyXG4gICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZpbGUuc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgIGRpYXJ5LnNldChcInRpdGxlXCIsIHRpdGxlKTtcclxuICAgICAgICAgIGRpYXJ5LnNldChcInBsYXllclwiLCBwbGF5ZXIpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJzcmNcIiwgU3RyaW5nKHJlcy51cmwoKSkpO1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwiYWdlXCIsIGFnZSlcclxuICAgICAgICAgIGRpYXJ5LnNldChcInN0dWR5YWdlXCIsIHN0dWR5YWdlKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwibmlja05hbWVcIiwgbmlja05hbWUpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJ1cmxcIiwgdXJsKVxyXG4gICAgICAgICAgZGlhcnkuc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIHJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG4gIH1cclxuLFxyXG4gIHphbihpZCkge1xyXG4gICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgIGxldCBxdWVyeSA9IG5ldyBCbW9iLlF1ZXJ5KERpYXJ5KTtcclxuICAgICBsZXQgdXNlciA9IEJtb2IuVXNlci5jdXJyZW50KCk7XHJcblxyXG4gICAgIGxldCBaYW5fdXNlciA9IEJtb2IuT2JqZWN0LmV4dGVuZChcInphbl91c2VyXCIpO1xyXG4gICAgIGxldCB6YW5fdXNlcl9xdWVyeSA9IG5ldyBCbW9iLlF1ZXJ5KFphbl91c2VyKTtcclxuICAgICB6YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidXNlcmlkXCIsIHVzZXIuaWQpO1xyXG4gICAgIHphbl91c2VyX3F1ZXJ5LmVxdWFsVG8oXCJ2aWRlb2lkXCIsIGlkKTtcclxuXHJcbiAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgemFuX3VzZXJfcXVlcnkuZmluZCh7XHJcbiAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuWFseafpeivouWIsCBcIiArIHJlc3VsdHMubGVuZ3RoICsgXCIg5p2h6K6w5b2VXCIpO1xyXG4gICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xpa2U6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6cmVzdWx0c1swXVxyXG4gICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICBsZXQgb2JqZWN0ID0gbmV3IFphbl91c2VyKClcclxuICAgICAgICAgICAgICAgb2JqZWN0LnNldChcInVzZXJpZFwiLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICBvYmplY3Quc2V0KFwidmlkZW9pZFwiLCBpZClcclxuICAgICAgICAgICAgICAgb2JqZWN0LnNhdmUoKVxyXG4gICAgICAgICAgICAgICBxdWVyeS5nZXQoaWQsIHtcclxuICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgIGxpa2VhcnJheVtyZXN1bHQuaWRdID0gMVxyXG4gICAgICAgICAgICAgICAgICAgcmVzdWx0LmluY3JlbWVudChcImlzTGlrZVwiKTtcclxuICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueCuei1nuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDpyZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMaWtlOnJlc3VsdC5nZXQoXCJpc0xpa2VcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbGlrZWFycmF5Omxpa2VhcnJheVxyXG4gICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24ob2JqZWN0LCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgLy8g5p+l6K+i5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCLmn6Xor6LlpLHotKU6IFwiICsgZXJyb3IuY29kZSArIFwiIFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KVxyXG4gICAgIH0pXHJcbiAgICAgcmV0dXJuIHByb21pc2VcclxuICB9XHJcblxyXG5cclxuXHJcbiwgIFxyXG4gIGlzWmFuKCl7XHJcblxyXG4gIH1cclxuLCAgXHJcbiAgQm1vYigpe1xyXG4gICAgcmV0dXJuIEJtb2JcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=