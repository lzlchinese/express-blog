// routes/upload.js
var express = require("express");
var router = express.Router();
const multer = require("multer");
var File = require("../models/File");
var dbData = require("../config/mongoose");
var path = require('path');
const fs = require('fs')

const dirPath = path.join(__dirname, '../public/upload')

const storage = multer.diskStorage({
  //存储的位置
  destination(req, file, cb) {
    cb(null, "public/upload/");
  },
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
router.post("/", upload.single("file"), (req, res) => {
  //给客户端返回图片的访问地址 域名 + 文件名字
  //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹 upload
  const url = "http://localhost:3002/upload/" + req.file.filename;
  const file = new File({
    fieldname: req.file.fieldname,
    encoding: req.file.encoding,
    originalname: req.file.originalname,
    encodefilename: req.body.filename,
    mimetype: req.file.mimetype,
    destination: req.file.destination,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    identity: req.file.identity,
    date: new Date(),
    username: req.body.username,
  });
  file.save((err, docs) => {
    if (err) {
      res.send({ code: 1, errorMsg: "新增失败", url });
    } else {
      res.send({ code: 0, errorMsg: "新增成功" });
    }
  });
});

router.post("/uploadimg", upload.single("imgFile"), (req, res) => {
  console.log(1111, req.file)
  // res.sendFile( __dirname + "/" + req.url);
  const url = req.file.originalname
  res.send({ code: 1, errorMsg: "success", url });
});

router.get("/getfile", function (req, res, next) {
  dbData.selectall("file111", function (result) {
    res.send(result);
  });
});

router.post('/download',function(req,res){
  console.log(1111, req.body)
	res.download(req.body.path, req.body.encodefilename,err=>{
		if(err){
			res.send("上传失败！");
		}else{
			console.log("上传成功！");
		}
	});
});

// 删除文件
router.post('/delete', (req, res) => {
  const filename = req.body.filename;
  const id = req.body.id;
  // 根据自动分配的 _id 进行删除
  const whereid = { _id: id };
  fs.unlink(path.join(dirPath, filename), (err) => {
    if (err) {
      res.send({
        status: 1,
        Msg: '没有该文件，请检查！'
      })
      return
    }
  })
  File.deleteMany(whereid, (err, docs) => {
    if (err) {
      res.send({ code: 1, Msg: "删除失败" });
    } else {
      res.send({ code: 0, Msg: "删除成功" });
    }
  });
})

module.exports = router;
