


import Bmob from './bmob.js'
import bmobSocketIo from './bmobSocketIo.js'
import wepy from 'wepy'



Bmob.initialize("7c7088470743a2322e40cc0988fef669", "25e7842f84578bda6c4bd946bb4b4cdc");

export default {
  getList() {
    let Diary = Bmob.Object.extend("diary");
    let query = new Bmob.Query(Diary);
    query.limit(10);
    query.descending('updatedAt')
    let results = []
    let promise = new Promise(function(resolve, reject) {
      query.find({
        success: function(results) {
          resolve({
            data: results
          })
        },
        error: function(error) {
          //console.log("查询失败: " + error.code + " " + error.message);
          reject(error)
        }
      })
    });
    // 查询所有数据
    return promise
  }

,
  insertData(title, player, age, studyage, res){
    let tempFilePath = Array(res.tempFilePath);
    if (tempFilePath.length > 0) {
      let Diary = Bmob.Object.extend("diary");
      let diary = new Diary();
      let name = title+".mp4";
      let file = new Bmob.File(name, tempFilePath);
      let promise = new Promise(function(resolve, reject) {
        file.save().then(function(res){
          diary.set("title", title);
          diary.set("player", player)
          diary.set("src", String(res.url()));
          diary.set("age", age)
          diary.set("studyage", studyage)
          diary.save()
        })
      })
      return promise
    }
  }
}





