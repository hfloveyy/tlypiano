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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwicmVzdWx0cyIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJzdWNjZXNzIiwiZGF0YSIsImVycm9yIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicGxheWVyIiwiYWdlIiwic3R1ZHlhZ2UiLCJuaWNrTmFtZSIsInVybCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIkFycmF5IiwibGVuZ3RoIiwiZGlhcnkiLCJuYW1lIiwiZmlsZSIsIkZpbGUiLCJzYXZlIiwidGhlbiIsInNldCIsIlN0cmluZyIsImVyciIsInphbiIsImlkIiwidXNlciIsIlVzZXIiLCJjdXJyZW50IiwiWmFuX3VzZXIiLCJ6YW5fdXNlciIsImdldCIsInJlc3VsdCIsImluY3JlbWVudCIsIm9iamVjdCIsImlzWmFuIiwiQm1vYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFJQSxlQUFLQSxVQUFMLENBQWdCLGtDQUFoQixFQUFvRCxrQ0FBcEQ7O2tCQUVlO0FBQ2JDLFNBRGEscUJBQ0g7QUFDUixRQUFJQyxRQUFRLGVBQUtDLE1BQUwsQ0FBWUMsTUFBWixDQUFtQixPQUFuQixDQUFaO0FBQ0EsUUFBSUMsUUFBUSxJQUFJLGVBQUtDLEtBQVQsQ0FBZUosS0FBZixDQUFaO0FBQ0FHLFVBQU1FLEtBQU4sQ0FBWSxFQUFaO0FBQ0FGLFVBQU1HLFVBQU4sQ0FBaUIsV0FBakI7QUFDQSxRQUFJQyxVQUFVLEVBQWQ7QUFDQSxRQUFJQyxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUNsRFIsWUFBTVMsSUFBTixDQUFXO0FBQ1RDLGlCQUFTLGlCQUFTTixPQUFULEVBQWtCO0FBQ3pCRyxrQkFB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cyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuXHJcbmltcG9ydCBCbW9iIGZyb20gJy4vYm1vYi5qcydcclxuaW1wb3J0IGJtb2JTb2NrZXRJbyBmcm9tICcuL2Jtb2JTb2NrZXRJby5qcydcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcblxyXG5cclxuQm1vYi5pbml0aWFsaXplKFwiN2M3MDg4NDcwNzQzYTIzMjJlNDBjYzA5ODhmZWY2NjlcIiwgXCIyNWU3ODQyZjg0NTc4YmRhNmM0YmQ5NDZiYjRiNGNkY1wiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBnZXRMaXN0KCkge1xyXG4gICAgbGV0IERpYXJ5ID0gQm1vYi5PYmplY3QuZXh0ZW5kKFwiZGlhcnlcIik7XHJcbiAgICBsZXQgcXVlcnkgPSBuZXcgQm1vYi5RdWVyeShEaWFyeSk7XHJcbiAgICBxdWVyeS5saW1pdCgxMCk7XHJcbiAgICBxdWVyeS5kZXNjZW5kaW5nKCd1cGRhdGVkQXQnKVxyXG4gICAgbGV0IHJlc3VsdHMgPSBbXVxyXG4gICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgcXVlcnkuZmluZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0cykge1xyXG4gICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHJlc3VsdHNcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCLmn6Xor6LlpLHotKU6IFwiICsgZXJyb3IuY29kZSArIFwiIFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICAvLyDmn6Xor6LmiYDmnInmlbDmja5cclxuICAgIHJldHVybiBwcm9taXNlXHJcbiAgfVxyXG5cclxuLFxyXG4gIGluc2VydERhdGEodGl0bGUsIHBsYXllciwgYWdlLCBzdHVkeWFnZSwgbmlja05hbWUsIHVybCxyZXMpe1xyXG4gICAgbGV0IHRlbXBGaWxlUGF0aCA9IEFycmF5KHJlcy50ZW1wRmlsZVBhdGgpO1xyXG4gICAgaWYgKHRlbXBGaWxlUGF0aC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgICBsZXQgZGlhcnkgPSBuZXcgRGlhcnkoKTtcclxuICAgICAgbGV0IG5hbWUgPSB0aXRsZStcIi5tcDRcIjtcclxuICAgICAgbGV0IGZpbGUgPSBuZXcgQm1vYi5GaWxlKG5hbWUsIHRlbXBGaWxlUGF0aCk7XHJcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZmlsZS5zYXZlKCkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwidGl0bGVcIiwgdGl0bGUpO1xyXG4gICAgICAgICAgZGlhcnkuc2V0KFwicGxheWVyXCIsIHBsYXllcilcclxuICAgICAgICAgIGRpYXJ5LnNldChcInNyY1wiLCBTdHJpbmcocmVzLnVybCgpKSk7XHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJhZ2VcIiwgYWdlKVxyXG4gICAgICAgICAgZGlhcnkuc2V0KFwic3R1ZHlhZ2VcIiwgc3R1ZHlhZ2UpXHJcbiAgICAgICAgICBkaWFyeS5zZXQoXCJuaWNrTmFtZVwiLCBuaWNrTmFtZSlcclxuICAgICAgICAgIGRpYXJ5LnNldChcInVybFwiLCB1cmwpXHJcbiAgICAgICAgICBkaWFyeS5zYXZlKCkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICByZXNvbHZlKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgcmVqZWN0KFwiZXJyb3JcIik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBwcm9taXNlXHJcbiAgICB9XHJcbiAgfVxyXG4sXHJcbiAgemFuKGlkKSB7XHJcbiAgICAgIGxldCBEaWFyeSA9IEJtb2IuT2JqZWN0LmV4dGVuZChcImRpYXJ5XCIpO1xyXG4gICAgICBsZXQgcXVlcnkgPSBuZXcgQm1vYi5RdWVyeShEaWFyeSk7XHJcbiAgICAgIGxldCB1c2VyID0gQm1vYi5Vc2VyLmN1cnJlbnQoKTtcclxuXHJcbiAgICAgIGxldCBaYW5fdXNlciA9IEJtb2IuT2JqZWN0LmV4dGVuZChcInphbl91c2VyXCIpO1xyXG4gICAgICBsZXQgemFuX3VzZXIgPSBuZXcgWmFuX3VzZXIoKVxyXG4gICAgICB6YW5fdXNlci5zZXQoXCJ1c2VyaWRcIix1c2VyLmlkKVxyXG4gICAgICB6YW5fdXNlci5zZXQoXCJ2aWRlb2lkXCIsaWQpXHJcbiAgICAgIHphbl91c2VyLnNhdmUoKVxyXG4gICAgICBxdWVyeS5nZXQoaWQsIHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgIHJlc3VsdC5pbmNyZW1lbnQoXCJpc0xpa2VcIik7XHJcbiAgICAgICAgICByZXN1bHQuc2F2ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKG9iamVjdCwgZXJyb3IpIHtcclxuICAgICAgICAgIC8vIOafpeivouWksei0pVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbn1cclxuXHJcbiwgIFxyXG4gIGlzWmFuKCl7XHJcblxyXG4gIH1cclxuLCAgXHJcbiAgQm1vYigpe1xyXG4gICAgcmV0dXJuIEJtb2JcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=