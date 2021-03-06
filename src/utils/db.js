


import Bmob from './bmob.js'
import bmobSocketIo from './bmobSocketIo.js'
import wepy from 'wepy'



Bmob.initialize("7c7088470743a2322e40cc0988fef669", "25e7842f84578bda6c4bd946bb4b4cdc");

export default {
  getList() {
    let Diary = Bmob.Object.extend("diary");
    let query = new Bmob.Query(Diary);
    query.limit(10);
    query.descending('objectId')

    let user = Bmob.User.current();

    
    //zan_user_query.equalTo("videoid", id);
    let like_array = {}
    let isZan = false
    let promise = new Promise(function(resolve, reject) {
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
      query.find().then(function(results){
        
        return results
      }).then(function(results){
        resolve({
          data: results,
          like_array: like_array
        })
      })
    });
    // 查询所有数据
    return promise
  }

,
  insertData(title, player, age, studyage, nickName, url,res){
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
          diary.set("nickName", nickName)
          diary.set("url", url)
          diary.save().then(function(res){
            resolve("success");
          },function(err){
            reject("error");
          })
        })
      })
      return promise
    }
  }
,
  zan(id) {
     let Diary = Bmob.Object.extend("diary");
     let query = new Bmob.Query(Diary);
     let user = Bmob.User.current();

     let Zan_user = Bmob.Object.extend("zan_user");
     let zan_user_query = new Bmob.Query(Zan_user);
     zan_user_query.equalTo("userid", user.id);
     zan_user_query.equalTo("videoid", id);

     let promise = new Promise(function(resolve, reject) {
         zan_user_query.find({
           success: function(results) {
              let likearray ={}
             //console.log("共查询到 " + results.length + " 条记录");
             if (results.length) {
                resolve({
                    isLike:true,
                    result:results[0],
                    likearray:{}
                   });
             } else {
               let object = new Zan_user()
               
               object.set("userid", user.id)
               object.set("videoid", id)
               object.save()
               query.get(id, {
                 success: function(result) {
                   likearray[result.id] = 1
                   result.increment("isLike");
                   result.save();
                   console.log("点赞成功");
                   resolve({
                    result:result,
                    isLike:result.get("isLike"),
                    likearray:likearray
                   });
                 },
                 error: function(object, error) {
                   // 查询失败
                 }
               });
             }
           },
           error: function(error) {
             console.log("查询失败: " + error.code + " " + error.message);
           }
         })
     })
     return promise
  }



,  
  isZan(){

  }
,  
  Bmob(){
    return Bmob
  }
}





