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
  zan: function zan(id, nickName, url) {
    var Diary = _bmob2.default.Object.extend("diary");
    var query = new _bmob2.default.Query(Diary);
    var user = _bmob2.default.User.current();

    var Zan_user = _bmob2.default.Object.extend("zan_user");
    var zan_user = new Zan_user();
    zan_user.set("userid", user.id);
    zan_user.set("videoid", id);
    zan_user.save();
    query.get(id, {
      success: function success(result) {
        result.increment("isLike");
        result.save();
      },
      error: function error(object, _error2) {
        // 查询失败
      }
    });
  },
  isZan: function isZan() {},
  Bmob: function Bmob() {
    return _bmob2.default;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwicmVzdWx0cyIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJzdWNjZXNzIiwiZGF0YSIsImVycm9yIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIkFycmF5IiwibGVuZ3RoIiwiZGlhcnkiLCJuYW1lIiwiZmlsZSIsIkZpbGUiLCJzYXZlIiwidGhlbiIsInNldCIsIlN0cmluZyIsImVyciIsInphbiIsImlkIiwidXNlciIsIlVzZXIiLCJjdXJyZW50IiwiWmFuX3VzZXIiLCJ6YW5fdXNlciIsImdldCIsInJlc3VsdCIsImluY3JlbWVudCIsIm9iamVjdCIsImlzWmFuIiwiQm1vYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFJQSxlQUFLQSxVQUFMLENBQWdCLGtDQUFoQixFQUFvRCxrQ0FBcEQ7O2tCQUVlO0FBQ2JDLFNBRGEscUJBQ0g7QUFDUixRQUFJQyxRQUFRLGVBQUtDLE1BQUwsQ0FBWUMsTUFBWixDQUFtQixPQUFuQixDQUFaO0FBQ0EsUUFBSUMsUUFBUSxJQUFJLGVBQUtDLEtBQVQsQ0FBZUosS0FBZixDQUFaO0FBQ0FHLFVBQU1FLEtBQU4sQ0FBWSxFQUFaO0FBQ0FGLFVBQU1HLFVBQU4sQ0FBaUIsV0FBakI7QUFDQSxRQUFJQyxVQUFVLEVBQWQ7QUFDQSxRQUFJQyxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUNsRFIsWUFBTVMsSUFBTixDQUFXO0FBQ1RDLGlCQUFTLGlCQUFTTixPQUFULEVBQWtCO0FBQ3pCRyxrQkFB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SjtBQUNEO0FBaEZZLEMiLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG5pbXBvcnQgQm1vYiBmcm9tICcuL2Jtb2IuanMnXHJcbmltcG9ydCBibW9iU29ja2V0SW8gZnJvbSAnLi9ibW9iU29ja2V0SW8uanMnXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5cclxuXHJcbkJtb2IuaW5pdGlhbGl6ZShcIjdjNzA4ODQ3MDc0M2EyMzIyZTQwY2MwOTg4ZmVmNjY5XCIsIFwiMjVlNzg0MmY4NDU3OGJkYTZjNGJkOTQ2YmI0YjRjZGNcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0TGlzdCgpIHtcclxuICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgbGV0IHF1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoRGlhcnkpO1xyXG4gICAgcXVlcnkubGltaXQoMTApO1xyXG4gICAgcXVlcnkuZGVzY2VuZGluZygndXBkYXRlZEF0JylcclxuICAgIGxldCByZXN1bHRzID0gW11cclxuICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHF1ZXJ5LmZpbmQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICBkYXRhOiByZXN1bHRzXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5p+l6K+i5aSx6LSlOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgLy8g5p+l6K+i5omA5pyJ5pWw5o2uXHJcbiAgICByZXR1cm4gcHJvbWlzZVxyXG4gIH1cclxuXHJcbixcclxuICBpbnNlcnREYXRhKHRpdGxlLCBwbGF5ZXIsIGFnZSwgc3R1ZHlhZ2UsIG5pY2tOYW1lLCB1cmwscmVzKXtcclxuICAgIGxldCB0ZW1wRmlsZVBhdGggPSBBcnJheShyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgIGlmICh0ZW1wRmlsZVBhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgICAgbGV0IGRpYXJ5ID0gbmV3IERpYXJ5KCk7XHJcbiAgICAgIGxldCBuYW1lID0gdGl0bGUrXCIubXA0XCI7XHJcbiAgICAgIGxldCBmaWxlID0gbmV3IEJtb2IuRmlsZShuYW1lLCB0ZW1wRmlsZVBhdGgpO1xyXG4gICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZpbGUuc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgIGRpYXJ5LnNldChcInRpdGxlXCIsIHRpdGxlKTtcclxuICAgICAgICAgIGRpYXJ5LnNldChcInBsYXllclwiLCBwbGF5ZXIpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJzcmNcIiwgU3RyaW5nKHJlcy51cmwoKSkpO1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwiYWdlXCIsIGFnZSlcclxuICAgICAgICAgIGRpYXJ5LnNldChcInN0dWR5YWdlXCIsIHN0dWR5YWdlKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwibmlja05hbWVcIiwgbmlja05hbWUpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJ1cmxcIiwgdXJsKVxyXG4gICAgICAgICAgZGlhcnkuc2F2ZSgpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgcmVzb2x2ZShcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIHJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gcHJvbWlzZVxyXG4gICAgfVxyXG4gIH1cclxuLFxyXG4gIHphbihpZCwgbmlja05hbWUsIHVybCkge1xyXG4gICAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgICAgbGV0IHF1ZXJ5ID0gbmV3IEJtb2IuUXVlcnkoRGlhcnkpO1xyXG4gICAgICBsZXQgdXNlciA9IEJtb2IuVXNlci5jdXJyZW50KCk7XHJcblxyXG4gICAgICBsZXQgWmFuX3VzZXIgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJ6YW5fdXNlclwiKTtcclxuICAgICAgbGV0IHphbl91c2VyID0gbmV3IFphbl91c2VyKClcclxuICAgICAgemFuX3VzZXIuc2V0KFwidXNlcmlkXCIsdXNlci5pZClcclxuICAgICAgemFuX3VzZXIuc2V0KFwidmlkZW9pZFwiLGlkKVxyXG4gICAgICB6YW5fdXNlci5zYXZlKClcclxuICAgICAgcXVlcnkuZ2V0KGlkLCB7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICByZXN1bHQuaW5jcmVtZW50KFwiaXNMaWtlXCIpO1xyXG4gICAgICAgICAgcmVzdWx0LnNhdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihvYmplY3QsIGVycm9yKSB7XHJcbiAgICAgICAgICAvLyDmn6Xor6LlpLHotKVcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG59XHJcblxyXG4sICBcclxuICBpc1phbigpe1xyXG5cclxuICB9XHJcbiwgIFxyXG4gIEJtb2IoKXtcclxuICAgIHJldHVybiBCbW9iXHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19