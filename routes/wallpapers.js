var express = require('express');
var path= require('path')
var router = express.Router();


router.get('/', function(req, res) {
  var itr= parseInt(req.query.itr);
  itr++;
  console.log("in get wallpapaer"+ JSON.stringify(itr));
  var db= req.db;
  var wallpapers=db.get("wallpapers");
  wallpapers.find({"itr":itr},{},function(error,data){
    if(error)
      res.send("damn Man");
    else {
      if(data.length==0) {
        wallpapers.find({"itr": 0}, {}, function (error, data) {
          if (error)
            res.send("error");
          else {

            console.log(JSON.stringify(data))
            res.send(data[0]);
          }
        });
      }
      else {
        console.log(JSON.stringify(data))
        res.send(data[0]);
      }
    }
  });
});
router.post('/', function (req, res) {
  console.log("in Post of /wallpapers")
  var reqBody= req.body;

  if(reqBody.password== "The Bomb")
  {
    var db= req.db;
    console.log("in Post of /wallpapers");
    var wallpapers= db.get("wallpapers");
    wallpapers.find({},{},function (error,count) {
      reqBody.wallpaper.itr=count.length;
      wallpapers.insert(reqBody.wallpaper,function (error,data) {
        console.log(reqBody.wallpaper.count);
        if(error){
          console.log(error);
          res.send("Something Bad happended while saving");
        }else
          res.send(req.body.wallpaper.title);
      });
    });

  }else
    res.send("Incorrect Password");
})

module.exports = router;
