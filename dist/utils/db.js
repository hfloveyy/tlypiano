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
  insertData: function insertData(title, res) {
    var tempFilePath = Array(res.tempFilePath);
    if (tempFilePath.length > 0) {
      var Diary = _bmob2.default.Object.extend("diary");
      var diary = new Diary();
      var name = title + ".mp4";
      var file = new _bmob2.default.File(name, tempFilePath);
      file.save().then(function (res) {
        diary.set("title", name);
        diary.set("src", String(res.url()));
        diary.save(null, {
          success: function success(result) {
            // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
            console.log("日记创建成功, objectId:" + result.id);
          },
          error: function error(result, _error2) {
            // 添加失败
            console.log('创建日记失败');
          }
        });
      });
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiLmpzIl0sIm5hbWVzIjpbImluaXRpYWxpemUiLCJnZXRMaXN0IiwiRGlhcnkiLCJPYmplY3QiLCJleHRlbmQiLCJxdWVyeSIsIlF1ZXJ5IiwibGltaXQiLCJkZXNjZW5kaW5nIiwicmVzdWx0cyIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJzdWNjZXNzIiwiZGF0YSIsImVycm9yIiwiaW5zZXJ0RGF0YSIsInRpdGxlIiwicmVzIiwidGVtcEZpbGVQYXRoIiwiQXJyYXkiLCJsZW5ndGgiLCJkaWFyeSIsIm5hbWUiLCJmaWxlIiwiRmlsZSIsInNhdmUiLCJ0aGVuIiwic2V0IiwiU3RyaW5nIiwidXJsIiwicmVzdWx0IiwiY29uc29sZSIsImxvZyIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUlBLGVBQUtBLFVBQUwsQ0FBZ0Isa0NBQWhCLEVBQW9ELGtDQUFwRDs7a0JBRWU7QUFDYkMsU0FEYSxxQkFDSDtBQUNSLFFBQUlDLFFBQVEsZUFBS0MsTUFBTCxDQUFZQyxNQUFaLENBQW1CLE9BQW5CLENBQVo7QUFDQSxRQUFJQyxRQUFRLElBQUksZUFBS0MsS0FBVCxDQUFlSixLQUFmLENBQVo7QUFDQUcsVUFBTUUsS0FBTixDQUFZLEVBQVo7QUFDQUYsVUFBTUcsVUFBTixDQUFpQixXQUFqQjtBQUNBLFFBQUlDLFVBQVUsRUFBZDtBQUNBLFFBQUlDLFVBQVUsSUFBSUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ2xEUixZQUFNUyxJQUFOLENBQVc7QUFDVEMsaUJBQVMsaUJBQVNOLE9BQVQsRUFBa0I7QUFDekJHLGtCQUFRO0FBQ05JLGtCQUFNUDtBQURBLFdBQVI7QUFHRCxTQUxRO0FBTVRRLGVBQU8sZUFBU0EsTUFBVCxFQUFnQjtBQUNyQjtBQUNBSixpQkFBT0ksTUFBUDtBQUNEO0FBVFEsT0FBWDtBQVdELEtBWmEsQ0FBZDtBQWFBO0FBQ0EsV0FBT1AsT0FBUDtBQUNELEdBdEJZO0FBeUJiUSxZQXpCYSxzQkF5QkZDLEtBekJFLEVBeUJJQyxHQXpCSixFQXlCUTtBQUNuQixRQUFJQyxlQUFlQyxNQUFNRixJQUFJQyxZQUFWLENBQW5CO0FBQ0EsUUFBSUEsYUFBYUUsTUFBYixHQUFzQixDQUExQixFQUE2QjtBQUMzQixVQUFJckIsUUFBUSxlQUFLQyxNQUFMLENBQVlDLE1BQVosQ0FBbUIsT0FBbkIsQ0FBWjtBQUNBLFVBQUlvQixRQUFRLElBQUl0QixLQUFKLEVBQVo7QUFDQSxVQUFJdUIsT0FBT04sUUFBTSxNQUFqQjtBQUNBLFVBQUlPLE9BQU8sSUFBSSxlQUFLQyxJQUFULENBQWNGLElBQWQsRUFBb0JKLFlBQXBCLENBQVg7QUFDQUssV0FBS0UsSUFBTCxHQUFZQyxJQUFaLENBQWlCLFVBQVNULEdBQVQsRUFBYTtBQUN0QkksY0FBTU0sR0FBTixDQUFVLE9BQVYsRUFBa0JMLElBQWxCO0FBQ0FELGNBQU1NLEdBQU4sQ0FBVSxLQUFWLEVBQWdCQyxPQUFPWCxJQUFJWSxHQUFKLEVBQVAsQ0FBaEI7QUFDQVIsY0FBTUksSUFBTixDQUFXLElBQVgsRUFBaUI7QUFDZmIsbUJBQVMsaUJBQVNrQixNQUFULEVBQWlCO0FBQ3hCO0FBQ0VDLG9CQUFRQyxHQUFSLENBQVksc0JBQW9CRixPQUFPRyxFQUF2QztBQUNILFdBSmM7QUFLZm5CLGlCQUFPLGVBQVNnQixNQUFULEVBQWlCaEIsT0FBakIsRUFBd0I7QUFDN0I7QUFDQWlCLG9CQUFRQyxHQUFSLENBQVksUUFBWjtBQUNEO0FBUmMsU0FBakI7QUFVUCxPQWJEO0FBY0Q7QUFDRjtBQS9DWSxDIiwiZmlsZSI6ImRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuaW1wb3J0IEJtb2IgZnJvbSAnLi9ibW9iLmpzJ1xyXG5pbXBvcnQgYm1vYlNvY2tldElvIGZyb20gJy4vYm1vYlNvY2tldElvLmpzJ1xyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuXHJcblxyXG5CbW9iLmluaXRpYWxpemUoXCI3YzcwODg0NzA3NDNhMjMyMmU0MGNjMDk4OGZlZjY2OVwiLCBcIjI1ZTc4NDJmODQ1NzhiZGE2YzRiZDk0NmJiNGI0Y2RjXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGdldExpc3QoKSB7XHJcbiAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgIGxldCBxdWVyeSA9IG5ldyBCbW9iLlF1ZXJ5KERpYXJ5KTtcclxuICAgIHF1ZXJ5LmxpbWl0KDEwKTtcclxuICAgIHF1ZXJ5LmRlc2NlbmRpbmcoJ3VwZGF0ZWRBdCcpXHJcbiAgICBsZXQgcmVzdWx0cyA9IFtdXHJcbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBxdWVyeS5maW5kKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgZGF0YTogcmVzdWx0c1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuafpeivouWksei0pTogXCIgKyBlcnJvci5jb2RlICsgXCIgXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIC8vIOafpeivouaJgOacieaVsOaNrlxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuLFxyXG4gIGluc2VydERhdGEodGl0bGUscmVzKXtcclxuICAgIGxldCB0ZW1wRmlsZVBhdGggPSBBcnJheShyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgIGlmICh0ZW1wRmlsZVBhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgRGlhcnkgPSBCbW9iLk9iamVjdC5leHRlbmQoXCJkaWFyeVwiKTtcclxuICAgICAgbGV0IGRpYXJ5ID0gbmV3IERpYXJ5KCk7XHJcbiAgICAgIGxldCBuYW1lID0gdGl0bGUrXCIubXA0XCI7XHJcbiAgICAgIGxldCBmaWxlID0gbmV3IEJtb2IuRmlsZShuYW1lLCB0ZW1wRmlsZVBhdGgpO1xyXG4gICAgICBmaWxlLnNhdmUoKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgZGlhcnkuc2V0KFwidGl0bGVcIixuYW1lKTtcclxuICAgICAgICAgICAgICBkaWFyeS5zZXQoXCJzcmNcIixTdHJpbmcocmVzLnVybCgpKSk7XHJcbiAgICAgICAgICAgICAgZGlhcnkuc2F2ZShudWxsLCB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgLy8g5re75Yqg5oiQ5Yqf77yM6L+U5Zue5oiQ5Yqf5LmL5ZCO55qEb2JqZWN0SWTvvIjms6jmhI/vvJrov5Tlm57nmoTlsZ7mgKflkI3lrZfmmK9pZO+8jOS4jeaYr29iamVjdElk77yJ77yM5L2g6L+Y5Y+v5Lul5ZyoQm1vYueahFdlYueuoeeQhuWQjuWPsOeci+WIsOWvueW6lOeahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pel6K6w5Yib5bu65oiQ5YqfLCBvYmplY3RJZDpcIityZXN1bHQuaWQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihyZXN1bHQsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIOa3u+WKoOWksei0pVxyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Yib5bu65pel6K6w5aSx6LSlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==