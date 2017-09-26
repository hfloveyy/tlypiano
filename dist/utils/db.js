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
      /*
      query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            //console.log(object.id);
            let Zan_user = Bmob.Object.extend("zan_user");
            let zan_user_query = new Bmob.Query(Zan_user);
            zan_user_query.equalTo("userid", user.id);
            zan_user_query.equalTo("videoid", object.id);
            zan_user_query.find({
              success: function(results){
                console.log("results");
                console.log(results);
                if(results.length){
                  like_array["1"] = 1
                }else{
                  like_array["0"] = 0
                }
              },
              error: function(object, error){
              }
            })
          }
          console.log("like_array");
          console.log(like_array);
          resolve({
            data: results,
            like_array: like_array
          })
        },
        error: function(error) {
          //console.log("查询失败: " + error.code + " " + error.message);
          reject(error)
        }
      })*/
      query.find().then(function (results) {

        return results;
      }).then(function (results) {
        resolve({
          data: results,
          like_array: like_array
        });
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
          var likearray = {};
          //console.log("共查询到 " + results.length + " 条记录");
          if (results.length) {
            resolve({
              isLike: true,
              result: results[0],
              likearray: {}
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
              error: function error(object, _error) {
                // 查询失败
              }
            });
          }
        },
        error: function error(_error2) {
          console.log("查询失败: " + _error2.code + " " + _error2.message);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwidXNlciIsIlVzZXIiLCJjdXJyZW50IiwibGlrZV9hcnJheSIsImlzWmFuIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsInRoZW4iLCJyZXN1bHRzIiwiZGF0YSIsImluc2VydERhdGEiLCJ0aXRsZSIsInBsYXllciIsImFnZSIsInN0dWR5YWdlIiwibmlja05hbWUiLCJ1cmwiLCJyZXMiLCJ0ZW1wRmlsZVBhdGgiLCJBcnJheSIsImxlbmd0aCIsImRpYXJ5IiwibmFtZSIsImZpbGUiLCJGaWxlIiwic2F2ZSIsInNldCIsIlN0cmluZyIsImVyciIsInphbiIsImlkIiwiWmFuX3VzZXIiLCJ6YW5fdXNlcl9xdWVyeSIsImVxdWFsVG8iLCJzdWNjZXNzIiwibGlrZWFycmF5IiwiaXNMaWtlIiwicmVzdWx0Iiwib2JqZWN0IiwiZ2V0IiwiaW5jcmVtZW50IiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiY29kZSIsIm1lc3NhZ2UiLCJCbW9iIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUlBLGVBQUtBLFVBQUwsQ0FBZ0Isa0NBQWhCLEVBQW9ELGtDQUFwRDs7a0JBRWU7QUFDYkMsU0FEYSxxQkFDSDtBQUNSLFFBQUlDLFFBQVEsZUFBS0MsTUFBTCxDQUFZQyxNQUFaLENBQW1CLE9BQW5CLENBQVo7QUFDQSxRQUFJQyxRQUFRLElBQUksZUFBS0MsS0FBVCxDQUFlSixLQUFmLENBQVo7QUFDQUcsVUFBTUUsS0FBTixDQUFZLEVBQVo7QUFDQUYsVUFBTUcsVUFBTixDQUFpQixVQUFqQjs7QUFFQSxRQUFJQyxPQUFPLGVBQUtDLElBQUwsQ0FBVUMsT0FBVixFQUFYOztBQUdBO0FBQ0EsUUFBSUMsYUFB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YkQsT0FwSmEsbUJBb0pOLENBRU4sQ0F0Slk7QUF3SmI2QyxNQXhKYSxrQkF3SlA7QUFDSjtBQUNEO0FBMUpZLEMiLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG5pbXBvcnQgQm1vYiBmcm9tICcuL2Jtb2IuanMnXHJcbmltcG9ydCBibW9iU29ja2V0SW8gZnJvbSAnLi9ibW9iU29ja2V0SW8uanMnXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5cclxuXHJcbkJtb2IuaW5pdGlhbGl6ZShcIjdjNzA4ODQ3MDc0M2EyMzIyZTQwY2MwOTg4ZmVmNjY5XCIsIFwiMjVlNzg0MmY4NDU3OGJkYTZjNGJkOTQ2YmI0YjRjZGNcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0TGlzdCgpIHtcclxuICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgbGV0IHF1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoRGlhcnkpO1xyXG4gICAgcXVlcnkubGltaXQoMTApO1xyXG4gICAgcXVlcnkuZGVzY2VuZGluZygnb2JqZWN0SWQnKVxyXG5cclxuICAgIGxldCB1c2VyID0gQm1vYi5Vc2VyLmN1cnJlbnQoKTtcclxuXHJcbiAgICBcclxuICAgIC8vemFuX3VzZXJfcXVlcnkuZXF1YWxUbyhcInZpZGVvaWRcIiwgaWQpO1xyXG4gICAgbGV0IGxpa2VfYXJyYXkgPSB7fVxyXG4gICAgbGV0IGlzWmFuID0gZmFsc2VcclxuICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIC8qXHJcbiAgICAgIHF1ZXJ5LmZpbmQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gcmVzdWx0c1tpXTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICBsZXQgWmFuX3VzZXIgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJ6YW5fdXNlclwiKTtcclxuICAgICAgICAgICAgbGV0IHphbl91c2VyX3F1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoWmFuX3VzZXIpO1xyXG4gICAgICAgICAgICB6YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidXNlcmlkXCIsIHVzZXIuaWQpO1xyXG4gICAgICAgICAgICB6YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidmlkZW9pZFwiLCBvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICB6YW5fdXNlcl9xdWVyeS5maW5kKHtcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHRzKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0c1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzdWx0cy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICBsaWtlX2FycmF5W1wiMVwiXSA9IDFcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBsaWtlX2FycmF5W1wiMFwiXSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihvYmplY3QsIGVycm9yKXtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxpa2VfYXJyYXlcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhsaWtlX2FycmF5KTtcclxuICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHRzLFxyXG4gICAgICAgICAgICBsaWtlX2FycmF5OiBsaWtlX2FycmF5XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5p+l6K+i5aSx6LSlOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgfSkqL1xyXG4gICAgICBxdWVyeS5maW5kKCkudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcmVzdWx0c1xyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG4gICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgZGF0YTogcmVzdWx0cyxcclxuICAgICAgICAgIGxpa2VfYXJyYXk6IGxpa2VfYXJyYXlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICAvLyDmn6Xor6LmiYDmnInmlbDmja5cclxuICAgIHJldHVybiBwcm9taXNlXHJcbiAgfVxyXG5cclxuLFxyXG4gIGluc2VydERhdGEodGl0bGUsIHBsYXllciwgYWdlLCBzdHVkeWFnZSwgbmlja05hbWUsIHVybCxyZXMpe1xyXG4gICAgbGV0IHRlbXBGaWxlUGF0aCA9IEFycmF5KHJlcy50ZW1wRmlsZVBhdGgpO1xyXG4gICAgaWYgKHRlbXBGaWxlUGF0aC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgICBsZXQgZGlhcnkgPSBuZXcgRGlhcnkoKTtcclxuICAgICAgbGV0IG5hbWUgPSB0aXRsZStcIi5tcDRcIjtcclxuICAgICAgbGV0IGZpbGUgPSBuZXcgQm1vYi5GaWxlKG5hbWUsIHRlbXBGaWxlUGF0aCk7XHJcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZmlsZS5zYXZlKCkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwidGl0bGVcIiwgdGl0bGUpO1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwicGxheWVyXCIsIHBsYXllcilcclxuICAgICAgICAgIGRpYXJ5LnNldChcInNyY1wiLCBTdHJpbmcocmVzLnVybCgpKSk7XHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJhZ2VcIiwgYWdlKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwic3R1ZHlhZ2VcIiwgc3R1ZHlhZ2UpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJuaWNrTmFtZVwiLCBuaWNrTmFtZSlcclxuICAgICAgICAgIGRpYXJ5LnNldChcInVybFwiLCB1cmwpXHJcbiAgICAgICAgICBkaWFyeS5zYXZlKCkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICByZXNvbHZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgcmVqZWN0KFwiZXJyb3JcIik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcbiAgfVxyXG4sXHJcbiAgemFuKGlkKSB7XHJcbiAgICAgbGV0IERpYXJ5ID0gQm1vYi5PYmplY3QuZXh0ZW5kKFwiZGlhcnlcIik7XHJcbiAgICAgbGV0IHF1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoRGlhcnkpO1xyXG4gICAgIGxldCB1c2VyID0gQm1vYi5Vc2VyLmN1cnJlbnQoKTtcclxuXHJcbiAgICAgbGV0IFphbl91c2VyID0gQm1vYi5PYmplY3QuZXh0ZW5kKFwiemFuX3VzZXJcIik7XHJcbiAgICAgbGV0IHphbl91c2VyX3F1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoWmFuX3VzZXIpO1xyXG4gICAgIHphbl91c2VyX3F1ZXJ5LmVxdWFsVG8oXCJ1c2VyaWRcIiwgdXNlci5pZCk7XHJcbiAgICAgemFuX3VzZXJfcXVlcnkuZXF1YWxUbyhcInZpZGVvaWRcIiwgaWQpO1xyXG5cclxuICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICB6YW5fdXNlcl9xdWVyeS5maW5kKHtcclxuICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgbGV0IGxpa2VhcnJheSA9e31cclxuICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCLlhbHmn6Xor6LliLAgXCIgKyByZXN1bHRzLmxlbmd0aCArIFwiIOadoeiusOW9lVwiKTtcclxuICAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMaWtlOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OnJlc3VsdHNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGlrZWFycmF5Ont9XHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIGxldCBvYmplY3QgPSBuZXcgWmFuX3VzZXIoKVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgb2JqZWN0LnNldChcInVzZXJpZFwiLCB1c2VyLmlkKVxyXG4gICAgICAgICAgICAgICBvYmplY3Quc2V0KFwidmlkZW9pZFwiLCBpZClcclxuICAgICAgICAgICAgICAgb2JqZWN0LnNhdmUoKVxyXG4gICAgICAgICAgICAgICBxdWVyeS5nZXQoaWQsIHtcclxuICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgIGxpa2VhcnJheVtyZXN1bHQuaWRdID0gMVxyXG4gICAgICAgICAgICAgICAgICAgcmVzdWx0LmluY3JlbWVudChcImlzTGlrZVwiKTtcclxuICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueCuei1nuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDpyZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMaWtlOnJlc3VsdC5nZXQoXCJpc0xpa2VcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbGlrZWFycmF5Omxpa2VhcnJheVxyXG4gICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24ob2JqZWN0LCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgLy8g5p+l6K+i5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCLmn6Xor6LlpLHotKU6IFwiICsgZXJyb3IuY29kZSArIFwiIFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICB9KVxyXG4gICAgIH0pXHJcbiAgICAgcmV0dXJuIHByb21pc2VcclxuICB9XHJcblxyXG5cclxuXHJcbiwgIFxyXG4gIGlzWmFuKCl7XHJcblxyXG4gIH1cclxuLCAgXHJcbiAgQm1vYigpe1xyXG4gICAgcmV0dXJuIEJtb2JcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=