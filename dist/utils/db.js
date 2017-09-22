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
              isLike: results[0].get("isLike")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwicmVzdWx0cyIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJzdWNjZXNzIiwiZGF0YSIsImVycm9yIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIkFycmF5IiwibGVuZ3RoIiwiZGlhcnkiLCJuYW1lIiwiZmlsZSIsIkZpbGUiLCJzYXZlIiwidGhlbiIsInNldCIsIlN0cmluZyIsImVyciIsInphbiIsImlkIiwidXNlciIsIlVzZXIiLCJjdXJyZW50IiwiWmFuX3VzZXIiLCJ6YW5fdXNlcl9xdWVyeSIsImVxdWFsVG8iLCJpc0xpa2UiLCJnZXQiLCJvYmplY3QiLCJyZXN1bHQiLCJpbmNyZW1lbnQiLCJjb25zb2xlIiwibG9nIiwiY29kZSIsIm1lc3NhZ2UiLCJpc1phbiIsIkJtb2IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSUEsZUFBS0EsVUFBTCxDQUFnQixrQ0FBaEIsRUFBb0Qsa0NBQXBEOztrQkFFZTtBQUNiQyxTQURhLHFCQUNIO0FBQ1IsUUFBSUMsUUFBUSxlQUFLQyxNQUFMLENBQVlDLE1BQVosQ0FBbUIsT0FBbkIsQ0FBWjtBQUNBLFFBQUlDLFFBQVEsSUFBSSxlQUFLQyxLQUFULENBQWVKLEtBQWYsQ0FBWjtBQUNBRyxVQUFNRSxLQUFOLENBQVksRUFBWjtBQUNBRixVQUFNRyxVQUFOLENBQWlCLFdBQWpCO0FBQ0EsUUFBSUMsVUFBVSxFQUFkO0FBQ0EsUUFBSUMsVUFBVSxJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDbERS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QUFmO0FBREgsYUFBUjtBQUdGLFdBSkQsTUFJTztBQUNMLGdCQUFJQyxTQUFTLElBQUlMLFFBQUosRUFBYjtBQUNBSyxtQkFBT2IsR0FBUCxDQUFXLFFBQVgsRUFBcUJLLEtBQUtELEVBQTFCO0FBQ0FTLG1CQUFPYixHQUFQLENBQVcsU0FBWCxFQUFzQkksRUFBdEI7QUFDQVMsbUJBQU9mLElBQVA7QUFDQTVCLGtCQUFNMEMsR0FBTixDQUFVUixFQUFWLEVBQWM7QUFDWnhCLHVCQUFTLGlCQUFTa0MsTUFBVCxFQUFpQjtBQUN4QkEsdUJBQU9DLFNBQVAsQ0FBaUIsUUFBakI7QUFDQUQsdUJBQU9oQixJQUFQO0FBQ0FrQix3QkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQXhDLHdCQUFRO0FBQ1BxQywwQkFBT0EsTUFEQTtBQUVQSCwwQkFBT0csT0FBT0YsR0FBUCxDQUFXLFFBQVg7QUFGQSxpQkFBUjtBQUlELGVBVFc7QUFVWjlCLHFCQUFPLGVBQVMrQixNQUFULEVBQWlCL0IsT0FBakIsRUFBd0I7QUFDN0I7QUFDRDtBQVpXLGFBQWQ7QUFjRDtBQUNGLFNBM0JpQjtBQTRCbEJBLGVBQU8sZUFBU0EsT0FBVCxFQUFnQjtBQUNyQmtDLGtCQUFRQyxHQUFSLENBQVksV0FBV25DLFFBQU1vQyxJQUFqQixHQUF3QixHQUF4QixHQUE4QnBDLFFBQU1xQyxPQUFoRDtBQUNEO0FBOUJpQixPQUFwQjtBQWdDSCxLQWpDYSxDQUFkO0FBa0NBLFdBQU81QyxPQUFQO0FBQ0YsR0FqR1k7QUFzR2I2QyxPQXRHYSxtQkFzR04sQ0FFTixDQXhHWTtBQTBHYkMsTUExR2Esa0JBMEdQO0FBQ0o7QUFDRDtBQTVHWSxDIiwiZmlsZSI6ImRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuaW1wb3J0IEJtb2IgZnJvbSAnLi9ibW9iLmpzJ1xyXG5pbXBvcnQgYm1vYlNvY2tldElvIGZyb20gJy4vYm1vYlNvY2tldElvLmpzJ1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuXHJcblxyXG5CbW9iLmluaXRpYWxpemUoXCI3YzcwODg0NzA3NDNhMjMyMmU0MGNjMDk4OGZlZjY2OVwiLCBcIjI1ZTc4NDJmODQ1NzhiZGE2YzRiZDk0NmJiNGI0Y2RjXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldExpc3QoKSB7XHJcbiAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgIGxldCBxdWVyeSA9IG5ldyBCbW9iLlF1ZXJ5KERpYXJ5KTtcclxuICAgIHF1ZXJ5LmxpbWl0KDEwKTtcclxuICAgIHF1ZXJ5LmRlc2NlbmRpbmcoJ3VwZGF0ZWRBdCcpXHJcbiAgICBsZXQgcmVzdWx0cyA9IFtdXHJcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBxdWVyeS5maW5kKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0c1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuafpeivouWksei0pTogXCIgKyBlcnJvci5jb2RlICsgXCIgXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIC8vIOafpeivouaJgOacieaVsOaNrlxyXG4gICAgcmV0dXJuIHByb21pc2VcclxuICB9XHJcblxyXG4sXHJcbiAgaW5zZXJ0RGF0YSh0aXRsZSwgcGxheWVyLCBhZ2UsIHN0dWR5YWdlLCBuaWNrTmFtZSwgdXJsLHJlcyl7XHJcbiAgICBsZXQgdGVtcEZpbGVQYXRoID0gQXJyYXkocmVzLnRlbXBGaWxlUGF0aCk7XHJcbiAgICBpZiAodGVtcEZpbGVQYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgbGV0IERpYXJ5ID0gQm1vYi5PYmplY3QuZXh0ZW5kKFwiZGlhcnlcIik7XHJcbiAgICAgIGxldCBkaWFyeSA9IG5ldyBEaWFyeSgpO1xyXG4gICAgICBsZXQgbmFtZSA9IHRpdGxlK1wiLm1wNFwiO1xyXG4gICAgICBsZXQgZmlsZSA9IG5ldyBCbW9iLkZpbGUobmFtZSwgdGVtcEZpbGVQYXRoKTtcclxuICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmaWxlLnNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJ0aXRsZVwiLCB0aXRsZSk7XHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJwbGF5ZXJcIiwgcGxheWVyKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwic3JjXCIsIFN0cmluZyhyZXMudXJsKCkpKTtcclxuICAgICAgICAgIGRpYXJ5LnNldChcImFnZVwiLCBhZ2UpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJzdHVkeWFnZVwiLCBzdHVkeWFnZSlcclxuICAgICAgICAgIGRpYXJ5LnNldChcIm5pY2tOYW1lXCIsIG5pY2tOYW1lKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwidXJsXCIsIHVybClcclxuICAgICAgICAgIGRpYXJ5LnNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgIHJlc29sdmUoXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICByZWplY3QoXCJlcnJvclwiKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIHByb21pc2VcclxuICAgIH1cclxuICB9XHJcbixcclxuICB6YW4oaWQpIHtcclxuICAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgICBsZXQgcXVlcnkgPSBuZXcgQm1vYi5RdWVyeShEaWFyeSk7XHJcbiAgICAgbGV0IHVzZXIgPSBCbW9iLlVzZXIuY3VycmVudCgpO1xyXG5cclxuICAgICBsZXQgWmFuX3VzZXIgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJ6YW5fdXNlclwiKTtcclxuICAgICBsZXQgemFuX3VzZXJfcXVlcnkgPSBuZXcgQm1vYi5RdWVyeShaYW5fdXNlcik7XHJcbiAgICAgemFuX3VzZXJfcXVlcnkuZXF1YWxUbyhcInVzZXJpZFwiLCB1c2VyLmlkKTtcclxuICAgICB6YW5fdXNlcl9xdWVyeS5lcXVhbFRvKFwidmlkZW9pZFwiLCBpZCk7XHJcblxyXG4gICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgIHphbl91c2VyX3F1ZXJ5LmZpbmQoe1xyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCLlhbHmn6Xor6LliLAgXCIgKyByZXN1bHRzLmxlbmd0aCArIFwiIOadoeiusOW9lVwiKTtcclxuICAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMaWtlOnJlc3VsdHNbMF0uZ2V0KFwiaXNMaWtlXCIpXHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgIGxldCBvYmplY3QgPSBuZXcgWmFuX3VzZXIoKVxyXG4gICAgICAgICAgICAgICBvYmplY3Quc2V0KFwidXNlcmlkXCIsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgICAgIG9iamVjdC5zZXQoXCJ2aWRlb2lkXCIsIGlkKVxyXG4gICAgICAgICAgICAgICBvYmplY3Quc2F2ZSgpXHJcbiAgICAgICAgICAgICAgIHF1ZXJ5LmdldChpZCwge1xyXG4gICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgcmVzdWx0LmluY3JlbWVudChcImlzTGlrZVwiKTtcclxuICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueCuei1nuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDpyZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMaWtlOnJlc3VsdC5nZXQoXCJpc0xpa2VcIilcclxuICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKG9iamVjdCwgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgIC8vIOafpeivouWksei0pVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5p+l6K+i5aSx6LSlOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSlcclxuICAgICB9KVxyXG4gICAgIHJldHVybiBwcm9taXNlXHJcbiAgfVxyXG5cclxuXHJcblxyXG4sICBcclxuICBpc1phbigpe1xyXG5cclxuICB9XHJcbiwgIFxyXG4gIEJtb2IoKXtcclxuICAgIHJldHVybiBCbW9iXHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19